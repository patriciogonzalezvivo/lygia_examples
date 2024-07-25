// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;

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
#define IBL_LUMINANCE       u_iblLuminance

#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         u_lightColor
#define LIGHT_FALLOFF       u_lightFalloff
#define LIGHT_INTENSITY     u_lightIntensity
#define LIGHT_COORD         v_lightCoord
#define LIGHT_MATRIX        u_lightMatrix

// #define SHADING_MODEL_IRIDESCENCE
#define SHADING_MODEL_SUBSURFACE

#include "lygia/math/mirror.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/generative/fbm.glsl"
#include "lygia/draw/stroke.glsl"

#include "lygia/lighting/material/new.glsl"
#include "lygia/lighting/pbr.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st;
    #if defined(MODEL_VERTEX_TEXCOORD)
    uv = v_texcoord;
    #endif

    Material material = materialNew();

    material.albedo = vec4(0.0, 0.1, 0.05, 1.0);
    material.roughness = 0.2;

    #ifdef SHADING_MODEL_SUBSURFACE
    material.subsurfaceColor = vec3(2.0, 3.5, 0.0);
    material.subsurfaceThickness += stroke(mirror(fbm(v_position.xyz * vec3(1.0, 3.0, 10.0)) * 5.0), 0.5,  0.1, 0.75);
    material.subsurfacePower = 12.234;
    #endif

    color = pbr(material);

    color.rgb = linear2gamma(color.rgb);
    gl_FragColor = color;
}

