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
#include "lygia/space/ratio.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbrLittle.glsl"
#include "lygia/lighting/material/new.glsl"

#define INVERSE_CAMERA_VIEW_MATRIX u_inverseViewMatrix
#define INVERSE_CAMERA_PROJECTION_MATRIX u_inverseProjectionMatrix
#define VOLUMETRICLIGHTSCATTERING_FACTOR 0.013
#define VOLUMETRICLIGHTSCATTERING_STEPS 40
#define VOLUMETRICLIGHTSCATTERING_NOISE_FNC random(vec3(st, u_time*0.0001)) * 0.2
#include "lygia/lighting/volumetricLightScattering.glsl"

#include "lygia/space/linearizeDepth.glsl"

// #define TEXTUREDOF_DEBUG
#define TEXTUREDOF_DEPTH_FNC(UV) linearizeDepth(texture2D(texDepth,UV).r, u_cameraNearClip, u_cameraFarClip * 0.002)
#include "lygia/sample/dof.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

float getSun(vec2 uv){ return length(uv) < 0.009 ? 1.0 : 0.0; }

//from: https://www.shadertoy.com/view/XdfXRX
vec3 lensflares(vec2 uv, vec2 pos, out vec3 sunflare, out vec3 lensflare) {
    vec2 main = uv-pos;
    vec2 uvd = uv*(length(uv));

    float ang = atan(main.y, main.x);
    float dist = length(main);
    dist = pow(dist, 0.1);

    float f0 = 1.0/(length(uv-pos)*25.0+1.0);
    f0 = pow(f0, 2.0);

    f0 = f0+f0*(sin((ang+1.0/18.0)*12.0)*.1+dist*.1+.8);

    float f2 = max(1.0/(1.0+32.0*pow(length(uvd+0.8*pos),2.0)),.0)*00.25;
    float f22 = max(1.0/(1.0+32.0*pow(length(uvd+0.85*pos),2.0)),.0)*00.23;
    float f23 = max(1.0/(1.0+32.0*pow(length(uvd+0.9*pos),2.0)),.0)*00.21;

    vec2 uvx = mix(uv,uvd,-0.5);

    float f4 = max(0.01-pow(length(uvx+0.4*pos),2.4),.0)*6.0;
    float f42 = max(0.01-pow(length(uvx+0.45*pos),2.4),.0)*5.0;
    float f43 = max(0.01-pow(length(uvx+0.5*pos),2.4),.0)*3.0;

    uvx = mix(uv,uvd,-.4);

    float f5 = max(0.01-pow(length(uvx+0.2*pos),5.5),.0)*2.0;
    float f52 = max(0.01-pow(length(uvx+0.4*pos),5.5),.0)*2.0;
    float f53 = max(0.01-pow(length(uvx+0.6*pos),5.5),.0)*2.0;

    uvx = mix(uv,uvd,-0.5);

    float f6 = max(0.01-pow(length(uvx-0.3*pos),1.6),.0)*6.0;
    float f62 = max(0.01-pow(length(uvx-0.325*pos),1.6),.0)*3.0;
    float f63 = max(0.01-pow(length(uvx-0.35*pos),1.6),.0)*5.0;

    sunflare = vec3(f0);
    lensflare = vec3(f2+f4+f5+f6, f22+f42+f52+f62, f23+f43+f53+f63);

    return sunflare+lensflare;
}

vec3 anflares(vec2 uv, float threshold, float intensity, float stretch, float brightness) {
    threshold = 1.0 - threshold;

    vec3 hdr = vec3(getSun(uv));
    hdr = vec3(floor(threshold+pow(hdr.r, 1.0)));

    float d = intensity;
    float c = intensity*stretch;

    for (float i=c; i>-1.0; i--){
        float texL = getSun(uv+vec2(i/d, 0.0));
        float texR = getSun(uv-vec2(i/d, 0.0));
        
        hdr += floor(threshold+pow(max(texL,texR), 4.0))*(1.0-i/c);
    }
    
    return hdr*brightness;
}

vec3 anflares(vec2 uv, float intensity, float stretch, float brightness) {
    uv.x *= 1.0/(intensity*stretch);
    uv.y *= 0.5;
    return vec3(smoothstep(0.009, 0.0, length(uv)))*brightness;
}


void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st;

#if defined(POSTPROCESSING)
    // color.rgb = texture2D(u_scene, st).rgb;
    color.rgb = sampleDoF(u_scene, u_sceneDepth, st, .5, 2.).rgb;

    vec3 sunColor = u_lightColor;

    vec4 light = u_projectionMatrix * u_viewMatrix * vec4(u_light, 1.0);
    light.xy /= light.w;
    light.xy = light.xy * 0.5 + 0.5;

    vec3 sunFlare = vec3(0.0);
    vec3 lensFlare = vec3(0.0);
    vec3 flare = lensflares(uv - 0.5, light.xy - 0.5, sunFlare, lensFlare);
    vec3 anflare = pow(anflares(uv-light.xy, 0.5, 200.0, 0.0, 0.1), sunColor);

    sunColor *= 8.0;
    vec3 scatter = vec3(0.0);
    scatter.r += volumetricLightScattering(u_sceneDepth, st + vec2(10.0, 0.0) * pixel) * sunColor.r;
    scatter.g += volumetricLightScattering(u_sceneDepth, st) * sunColor.g; 
    scatter.b += volumetricLightScattering(u_sceneDepth, st - vec2(0.0, -10.0) * pixel) * sunColor.b;
    
    color.rgb += pow(scatter, vec3(2.2));
    color.rgb += getSun(uv-light.xy) + (flare + anflare) * sunColor * 0.25 * step(.0, light.z);

#else
    Material material = materialNew();
    material.roughness = 0.1;

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.baseColor.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    color = pbrLittle(material);
    // color = linear2gamma(color);

#endif

    gl_FragColor = color;
}
