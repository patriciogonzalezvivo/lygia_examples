// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;

uniform vec3        u_light;
uniform vec3        u_lightColor;

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
varying vec2        v_texcoord;
varying vec4        v_tangent;

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
#include "lygia/lighting/pbrLittle.glsl"

#include "lygia/lighting/material/baseColor.glsl"
#include "lygia/lighting/material/normal.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 uv = v_texcoord;

    vec4 baseColor = materialBaseColor();
    float metallic = step(0.5, st.y);
    float roughness = step(0.5, st.x);

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    baseColor.rgb = vec3(0.5) + checkBoard(uv, vec2(8.0)) * 0.5;
    #endif

    gl_FragColor = pbrLittle(baseColor, materialNormal(), 0.001 + roughness, metallic);
}
