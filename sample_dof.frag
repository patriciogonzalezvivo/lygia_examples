// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;

uniform vec3        u_camera;
uniform float       u_cameraFarClip;
uniform float       u_cameraNearClip;

uniform vec3        u_light;
uniform vec3        u_lightColor;

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

#define RESOLUTION          u_resolution
#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define IBL_LUMINANCE       u_iblLuminance

// #define LIGHT_POSITION      u_light
#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         u_lightColor
#define LIGHT_COORD         v_lightCoord

#include "lygia/sample/clamp2edge.glsl"
// #define SAMPLEDOF_DEBUG
#define SAMPLEDOF_BLUR_SIZE 12.
#define SAMPLEDOF_COLOR_SAMPLE_FNC(TEX, UV) sampleClamp2edge(TEX, UV).rgb
#define SAMPLEDOF_DEPTH_SAMPLE_FNC(TEX, UV) linearizeDepth( sampleClamp2edge(TEX, UV).r, u_cameraNearClip, u_cameraFarClip)
#include "lygia/space/linearizeDepth.glsl"
#include "lygia/sample/dof.glsl"
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

#if defined(POSTPROCESSING)
    color.rgb = sampleDoF(u_scene, u_sceneDepth, st, 1.9, 2.).rgb;

#else
    Material material = materialNew();
    material.roughness = 0.1;

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.albedo.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    color.rgb = pbr(material).rgb;

#endif

    gl_FragColor = color;
}
