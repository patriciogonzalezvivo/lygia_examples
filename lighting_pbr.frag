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

// #define DIFFUSE_FNC diffuseOrenNayar
// #define DIFFUSE_FNC diffuseBurley
// #define DIFFUSE_FNC diffuseLambert
// #define SPECULAR_FNC specularGaussian
// #define SPECULAR_FNC specularBeckmann
// #define SPECULAR_FNC specularPhongRoughness
// #define SPECULAR_FNC specularBlinnPhongRoughnes 
// #define SPECULAR_FNC specularCookTorrance
// #define SPECULAR_FNC specularGGX
#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define LIGHT_POSITION      u_light
#define LIGHT_COLOR         u_lightColor
#define LIGHT_COORD         v_lightCoord

#include "lygia/color/space/linear2gamma.glsl"

// #include "lygia/generative/random.glsl"

// #define SSAO_SAMPLES_NUM 16
// #define SSAO_NOISE2_FNC(ST) random2(ST * 53.4)

// #define CAMERA_NEAR_CLIP    u_cameraNearClip
// #define CAMERA_FAR_CLIP     u_cameraFarClip
// #define SCENE_DEPTH         u_sceneDepth
// #define RESOLUTION          u_resolution
// #include "lygia/lighting/ssao.glsl"
#include "lygia/lighting/pbr.glsl"

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

    Material material = materialNew();

    material.metallic = 0.01 + step(0.5, st.y) * 0.99;
    material.roughness = 0.01 + step(0.5, st.x);

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.baseColor.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    color = pbr(material);

    gl_FragColor = linear2gamma(color);
}
