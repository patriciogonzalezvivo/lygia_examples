// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;
uniform sampler2D   u_sceneNormal;
uniform sampler2D   u_scenePosition;
uniform sampler2D   u_sceneBuffer0;

uniform mat4        u_viewMatrix;
uniform mat4        u_projectionMatrix;
uniform mat4        u_inverseViewMatrix;
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
#include "lygia/generative/random.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbrLittle.glsl"
#include "lygia/lighting/material/new.glsl"

#define INVERSE_CAMERA_PROJECTION_MATRIX u_inverseProjectionMatrix
// #define SSR_FRESNEL
#include "lygia/lighting/ssr.glsl"

#define INVERSE_CAMERA_VIEW_MATRIX u_inverseViewMatrix
#define VOLUMETRICLIGHTSCATTERING_FACTOR 0.013
#define VOLUMETRICLIGHTSCATTERING_STEPS 40
#define VOLUMETRICLIGHTSCATTERING_NOISE_FNC random(vec3(st, u_time*0.0001)) * 0.2
#include "lygia/lighting/volumetricLightScattering.glsl"

#define SSAO_SAMPLES_NUM 16
// #define SSAO_NOISE2_FNC(ST) random2(ST * 53.4)
// #define SSAO_NOISE3_FNC(POS) random3(POS)
#include "lygia/lighting/ssao.glsl"

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
    color.a = 1.0;

    vec3 n = texture2D(u_sceneNormal, st).xyz;
    float mask = texture2D(u_sceneBuffer0, st).r; 
    float opacity = 1.0;
    float dist = 1.0;
    vec2 uv = ssr(u_scenePosition, u_sceneNormal, st, pixel, opacity, dist);
    color.rgb = mix(color.rgb, texture2D(u_scene, uv).rgb, mask * saturate(1.0-dist));

    // SSAO
    float ssao1 = ssao(u_scenePosition, u_sceneNormal, st, 0.5);
    float ssao2 = ssao(u_sceneDepth, st, pixel, 0.5);
    color.rgb *= ssao1;

    color.rgb += volumetricLightScattering(u_sceneDepth, st) * 2.0;


#elif defined(SCENE_BUFFER_0)

    color.rgb = vec3(0.0, 1.0, 0.0);
    #if defined(FLOOR)
    color.rgb = vec3(1.0, 0.0, 0.0);
    #endif

#else
    
    vec2 uv = st;
    float alpha = 1.0;
    #if defined(MODEL_VERTEX_TEXCOORD)
    uv = v_texcoord;
    #endif

    Material material = materialNew();

    material.metallic = 0.;
    material.roughness = 0.01;

    #if defined(FLOOR)
    material.baseColor.rgb = vec3(0.001);
    alpha = 0.1;
    #endif

    color = pbrLittle(material);
    color.a = alpha;

#endif

    gl_FragColor = color;
}
