
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;

uniform float       u_cameraEv100;
uniform float       u_cameraExposure;
uniform float       u_cameraAperture;
uniform float       u_cameraSensitivity;
uniform float       u_cameraShutterSpeed;

uniform float       u_cameraFarClip;
uniform float       u_cameraNearClip;
uniform float       u_cameraDistance;

uniform vec3        u_light;
uniform vec3        u_lightColor;
uniform float       u_lightFalloff;
uniform float       u_lightIntensity;

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];
uniform float       u_iblLuminance;

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
varying mat3        v_tangentToWorld;
varying vec4        v_tangent;
#endif

// #define IBL_LUMINANCE u_iblLuminance

// #define DIFFUSE_FNC diffuseOrenNayar
// #define DIFFUSE_FNC diffuseBurley
// #define DIFFUSE_FNC diffuseLambert
// #define SPECULAR_FNC specularGaussian
// #define SPECULAR_FNC specularBeckmann
// #define SPECULAR_FNC specularCookTorrance
// #define SPECULAR_FNC specularPhongRoughness
// #define SPECULAR_FNC specularBlinnPhongRoughnes 

#ifndef LIGHT_COORD
#define LIGHT_COORD  v_lightCoord
#endif

#ifndef SURFACE_POSITION
#define SURFACE_POSITION v_position
#endif

#ifndef CAMERA_POSITION
#define CAMERA_POSITION u_camera
#endif

#ifndef SCENE_IBL_LUMINANCE
#define SCENE_IBL_LUMINANCE u_iblLuminance
#endif

#include "../lygia/lighting/material/new.glsl"
#include "../lygia/lighting/pbr.glsl"

float checkBoard(vec2 _scale) {
#ifdef MODEL_VERTEX_TEXCOORD
    vec2 uv = v_texcoord;
#else
    vec2 uv = gl_FragCoord.xy/u_resolution;
#endif
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    Material mat = materialNew();
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // mat.metallic = step(cos(u_time * 0.8) * 0.5 + 0.5, st.y);
    // mat.roughness = step(sin(u_time * 0.9) * 0.5 + 0.5, st.x);
    mat.metallic = step(0.5, st.y);
    mat.roughness = 0.000001 + step(0.5, st.x) * 0.9;

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    mat.baseColor.rgb = vec3(0.5) + checkBoard(vec2(8.0)) * 0.5;
    // mat.metallic = 0.0;
    // mat.roughness = (checkBoard(vec2(16.0))) * 0.1;
    #endif

    #ifdef MODEL_VERTEX_COLOR
    mat.ambientOcclusion = v_color.r;
    #endif
    
    gl_FragColor = pbr(mat);
}
