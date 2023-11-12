// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;

uniform mat4        u_projectionMatrix;

uniform vec3        u_camera;
uniform float       u_cameraNearClip;
uniform float       u_cameraFarClip;

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
varying vec4        v_color;
varying vec3        v_normal;

#ifdef MODEL_VERTEX_TEXCOORD
varying vec2        v_texcoord;
#endif

#ifdef MODEL_VERTEX_TANGENT
varying vec4        v_tangent;
varying mat3        v_tangentToWorld;
#endif

#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define IBL_LUMINANCE       u_iblLuminance

// #define LIGHT_POSITION      u_light
#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         u_lightColor
#define LIGHT_FALLOFF       u_lightFalloff
#define LIGHT_INTENSITY     u_lightIntensity
#define LIGHT_COORD         v_lightCoord

#include "lygia/math/bump.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/space/gamma2linear.glsl"

#include "lygia/color/palette/hue.glsl"

#include "lygia/lighting/pbrClearCoat.glsl"
#include "lygia/lighting/pbr.glsl"
#include "lygia/lighting/pbrGlass.glsl"
#include "lygia/lighting/wavelength.glsl"
#include "lygia/lighting/iridescence.glsl"
#include "lygia/lighting/material/new.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st;
    #if defined(MODEL_VERTEX_TEXCOORD)
    uv = v_texcoord;
    #endif

    Material mat = materialNew();
    mat.albedo.rgb = vec3(0.35);
    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    mat.albedo.rgb = vec3(0.25) + checkBoard(uv, vec2(8.0)) * 0.25;
    #endif

#if defined(MODEL_NAME_SUZANNE1)
    mat.clearCoat = 2.0;
    color = pbrClearCoat(mat);
#elif defined(MODEL_NAME_SUZANNE3)
    // mat.roughness = 0.1;
    color = pbrGlass(mat);
#else
    color = pbr(mat);
#endif

    vec3 L = normalize(LIGHT_DIRECTION);
    vec3 V = normalize(CAMERA_POSITION - (SURFACE_POSITION).xyz);
    vec3 N = normalize(mat.normal);
    // color.rgb += iridescence( 1.0-abs(dot(N, V)), 1.0);
    color.rgb += iridescence(V, N, L, 320.0);

    color = linear2gamma(color);

    gl_FragColor = color;
}