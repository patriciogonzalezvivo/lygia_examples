// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneNormal;
uniform sampler2D   u_scenePosition;
uniform sampler2D   u_sceneBuffer0; // specular

uniform mat4        u_viewMatrix;
uniform mat4        u_projectionMatrix;
uniform mat4        u_inverseProjectionMatrix;

uniform vec3        u_camera;
uniform float       u_cameraFarClip;
uniform float       u_cameraNearClip;

uniform vec3        u_light;
uniform vec3        u_lightColor;
uniform float       u_lightFalloff;
uniform float       u_lightIntensity;

uniform float       u_iblLuminance;

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

#ifdef LIGHT_SHADOWMAP
uniform sampler2D   u_lightShadowMap;
uniform mat4        u_lightMatrix;
varying vec4        v_lightCoord;
#endif

uniform vec2        u_resolution;
uniform float       u_time;

varying vec4        v_position;

#ifdef MODEL_VERTEX_COLOR
varying vec4        v_color;
#endif

#ifdef MODEL_VERTEX_NORMAL
varying vec3        v_normal;
#endif

#ifdef MODEL_VERTEX_TEXCOORD
varying vec2        v_texcoord;
#endif

#ifdef MODEL_VERTEX_TANGENT
varying vec4        v_tangent;
varying mat3        v_tangentToWorld;
#endif

#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define LIGHT_POSITION      u_light
#define LIGHT_COLOR         u_lightColor
#define LIGHT_COORD         v_lightCoord

#include "lygia/math/saturate.glsl"
#include "lygia/math/powFast.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbrLittle.glsl"
#include "lygia/lighting/material/new.glsl"
#include "lygia/lighting/toShininess.glsl"

#define SSR_FRESNEL
#include "lygia/lighting/ssr.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#if defined(POSTPROCESSING)
    color = texture2D(u_scene, st);
    vec3 n = texture2D(u_sceneNormal, st).xyz;
    float mask = texture2D(u_sceneBuffer0, st).r; 
    float opacity = 1.0;
    float dist = 1.0;
    vec2 uv = ssr(u_scenePosition, u_sceneNormal, st, pixel, opacity, dist);
    color.rgb = mix(color.rgb, texture2D(u_scene, uv).rgb, mask * opacity * saturate(1.0-dist));

#else
    
    vec2 uv = st;
    #if defined(MODEL_VERTEX_TEXCOORD)
    uv = v_texcoord;
    #endif

    Material material = materialNew();

    material.metallic = 0.01;
    material.roughness = 0.1;

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.baseColor.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    material.metallic = 0.8;
    material.roughness = 0.5 + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    #if defined(SCENE_BUFFER_0)
    // SPECULAR BUFFER
    vec3 L = normalize(LIGHT_POSITION - (SURFACE_POSITION).xyz);
    vec3 N = normalize(material.normal);
    vec3 V = normalize(CAMERA_POSITION - (SURFACE_POSITION).xyz);
    color += saturate(specular(L, N, V, material.roughness));
    float spec =  saturate(.95 - material.roughness * 0.5);
    color.rgb *= 1.0-saturate( (powFast(spec, 4.) * 0.8 + 1.6 * (1.0-material.metallic)) );

    #else
    // REGULAR PASS
    color = pbrLittle(material);
    color = linear2gamma(color);
    #endif

#endif

    gl_FragColor = color;
}
