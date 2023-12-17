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
#define IBL_LUMINANCE       0.0

// #define LIGHT_DIRECTION     u_light
// #define LIGHT_COLOR         u_lightColor
// #define LIGHT_FALLOFF       u_lightFalloff
// #define LIGHT_INTENSITY     u_lightIntensity
// #define LIGHT_COORD         v_lightCoord

#include "lygia/lighting/material/new.glsl"
#include "lygia/lighting/light/point.glsl"

#define LIGHT_POINTS_TOTAL  3
#define LIGHT_POINTS        pointLights
LightPoint pointLights[LIGHT_POINTS_TOTAL];

#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbr.glsl"

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

    pointLights[0] = LightPoint(vec3(cos(u_time), sin(u_time), 0.0) * 2.0, vec3(1.0, 0.0, 0.0), 1.0, 0.0);
    pointLights[1] = LightPoint(vec3(0.0, cos(u_time * 0.2), sin(u_time * 0.1)), vec3(0.0, 1.0, 0.0), 1.0, 1.0);
    pointLights[2] = LightPoint(vec3(sin(u_time * 0.2), 0.0, cos(u_time * 0.3)), vec3(0.0, 0.0, 1.0), 1.0, 2.0);

    Material material = materialNew();
    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.albedo.rgb = vec3(0.5) + checkBoard(uv, vec2(8.0)) * 0.5;
    #endif

    color = pbr(material);
    color = linear2gamma(color);

    gl_FragColor = color;
}