// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_buffer0;

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;

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
#include "lygia/math/mirror.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/generative/worley.glsl"
#include "lygia/generative/snoise.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbrLittle.glsl"
#include "lygia/lighting/material/new.glsl"

const mat3 rot = mat3( -2.0, -1.0, 2.0, 
                        3.0, -2.0, 1.0, 
                        1.0,  2.0, 2.0);
const vec3 s = vec3(.32,.28,.26);

vec3 caustic(vec2 st) {

    //***imaging an axis-aligned plane in space
    float t = u_time * 0.5;
    vec3 pos = vec3(st * u_resolution + t*1e2, t*2e2);
    vec3 dist = vec3(1.0);
    
    //***rotate the plane&&calc distance to cell center then get minimum of three
    for(int i = 0; i < 3; i++) {
        pos *= rot * s[i];
        dist.r = min(dist.r, length( 0.5 - fract(pos * 0.005 + vec3(0.02, 0.01, -0.02))));
        dist.g = min(dist.g, length( 0.5 - fract(pos * 0.005)));
        dist.b = min(dist.b, length( 0.5 - fract(pos * 0.005 + vec3(-0.02, 0.01, 0.02))));
    }
    
    vec3 color = pow(dist, vec3(7.0)) * 25.0 + vec3(0.1, 0.35, 0.5);
    return pow(color.rgb, vec3(2.2));
    // return texture2D(u_buffer0, st).rgb;
}

#define VOLUMETRICLIGHTSCATTERING_TYPE vec3
#define VOLUMETRICLIGHTSCATTERING_MASK_FNC(COORD) caustic(COORD.xy)

#define INVERSE_CAMERA_VIEW_MATRIX u_inverseViewMatrix
#define INVERSE_CAMERA_PROJECTION_MATRIX u_inverseProjectionMatrix
#define VOLUMETRICLIGHTSCATTERING_FACTOR 0.013
#define VOLUMETRICLIGHTSCATTERING_STEPS 60
#define VOLUMETRICLIGHTSCATTERING_NOISE_FNC random(vec3(st, u_time*0.0001)) * 0.02
#include "lygia/lighting/volumetricLightScattering.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st;

#if defined(POSTPROCESSING)
    color.rgb = texture2D(u_scene, st).rgb;
    color.rgb += volumetricLightScattering(u_sceneDepth, st) * 10.;

#else
    
        // Vertex Color
    #ifdef MODEL_VERTEX_COLOR
    color = v_color;
    #endif

    #if defined(FLOOR)
    #endif

    #ifdef MODEL_VERTEX_NORMAL
    vec3 n = normalize(v_normal);
    vec3 l = normalize(u_light);
    vec3 v = normalize(u_camera - v_position.xyz);

    // Diffuse Shading
    color.rgb *= (dot(n, l) + 1.0 ) * 0.5;
    #endif

    // Shadow
    #if defined(LIGHT_SHADOWMAP) && defined(LIGHT_SHADOWMAP_SIZE)
    color.rgb *= sampleShadowPCF(u_lightShadowMap, vec2(LIGHT_SHADOWMAP_SIZE), v_lightCoord.xy, v_lightCoord.z - 0.005) * 0.8 + 0.2;
    color.rgb *= VOLUMETRICLIGHTSCATTERING_MASK_FNC(v_lightCoord.xy);
    #endif

#endif

    gl_FragColor = color;
}
