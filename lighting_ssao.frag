// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;
uniform sampler2D   u_sceneNormal;
uniform sampler2D   u_scenePosition;

uniform mat4        u_projectionMatrix;

uniform vec3        u_camera;
uniform float       u_cameraNearClip;
uniform float       u_cameraFarClip;

uniform vec3        u_light;
uniform vec2        u_resolution;

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

#ifdef LIGHT_SHADOWMAP
uniform sampler2D   u_lightShadowMap;
uniform mat4        u_lightMatrix;
varying vec4        v_lightCoord;
#endif

#define CAMERA_NEAR_CLIP    u_cameraNearClip
#define CAMERA_FAR_CLIP     u_cameraFarClip

#include "lygia/generative/random.glsl"

// #define SSAO_SAMPLES_NUM 16
// #define SSAO_NOISE2_FNC(ST) random2(ST * 53.4)
// #define SSAO_NOISE3_FNC(POS) random3(POS)

#include "lygia/lighting/ssao.glsl"
#include "lygia/sample/shadowPCF.glsl"

uniform vec3        u_SH[9];

#include "lygia/lighting/sphericalHarmonics.glsl"
#include "lygia/color/tonemap.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#if defined(POSTPROCESSING)
    color = texture2D(u_scene, st);

    // SSAO
    float ssao1 = ssao(u_scenePosition, u_sceneNormal, st, 0.5);
    float ssao2 = ssao(u_sceneDepth, st, pixel, 0.5);
    
    color.rgb *= mix(ssao1, ssao2, step(0.5, st.x));

#else

    // Vertex Color
    #ifdef MODEL_VERTEX_COLOR
    color = v_color;
    #endif

    // Floor pattern
    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    color.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    #ifdef MODEL_VERTEX_NORMAL
    vec3 n = normalize(v_normal);
    vec3 l = normalize(u_light);
    vec3 v = normalize(u_camera - v_position.xyz);

    // Diffuse Shading
    color.rgb *= (dot(n, l) + 1.0 ) * 0.5;

    // Spherical Harmonics
    color.rgb *= tonemapUnreal( sphericalHarmonics(v_normal) );
    #endif

    // Shadow
    #if defined(LIGHT_SHADOWMAP) && defined(LIGHT_SHADOWMAP_SIZE)
    color.rgb *= sampleShadowPCF(u_lightShadowMap, vec2(LIGHT_SHADOWMAP_SIZE), v_lightCoord.xy, v_lightCoord.z - 0.005) * 0.8 + 0.2;
    #endif


#endif

    gl_FragColor = color;
}

