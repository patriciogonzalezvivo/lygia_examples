// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;
uniform sampler2D   u_sceneNormal;
uniform sampler2D   u_scenePosition;


uniform mat4        u_viewMatrix;
uniform mat4        u_modelMatrix;
uniform mat3        u_normalMatrix;
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

#ifndef SSAO_SAMPLES_NUM
#define SSAO_SAMPLES_NUM 16
#endif

#ifndef SSAO_NOISE_NUM
#define SSAO_NOISE_NUM 4
#endif

uniform vec3 u_ssaoSamples[SSAO_SAMPLES_NUM];
uniform vec3 u_ssaoNoise[SSAO_NOISE_NUM];

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
#define LIGHT_MATRIX        u_lightMatrix

#include "lygia/math/const.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbrLittle.glsl"
#include "lygia/lighting/material/new.glsl"

#define INVERSE_CAMERA_VIEW_MATRIX u_inverseViewMatrix
#define INVERSE_CAMERA_PROJECTION_MATRIX u_inverseProjectionMatrix
#define VOLUMETRICLIGHTSCATTERING_STEPS 60
#define VOLUMETRICLIGHTSCATTERING_NOISE_FNC random(vec3(st, u_time*0.0001)) * 0.1
#include "lygia/lighting/volumetricLightScattering.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#if defined(POSTPROCESSING)
    color.rgb = texture2D(u_scene, st).rgb;

    color.rgb += volumetricLightScattering(u_sceneDepth, st) * 5. * u_lightColor;

#else
    Material material = materialNew();
    material.roughness = 0.1;

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.baseColor.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    color = pbrLittle(material);
    color = linear2gamma(color);

#endif

    gl_FragColor = color;
}
