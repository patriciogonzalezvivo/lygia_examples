// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_sceneBuffer0;

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

uniform mat4        u_viewMatrix;

uniform vec3        u_camera;

uniform vec3        u_light;
uniform vec3        u_lightColor;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec4        v_position;
varying vec4        v_color;
varying vec3        v_normal;
varying vec2        v_texcoord;

#define RESOLUTION          u_resolution
#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         u_lightColor

// #include "lygia/lighting/atmosphere.glsl"
// #ifndef SCENE_CUBEMAP
// #define ENVMAP_FNC(NORM, ROUGHNESS, METALLIC) atmosphere(NORM, normalize(u_light))
// #endif
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/glass.glsl"
#include "lygia/lighting/material/new.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    Material mat = materialNew();
    mat.roughness = 0.1;

    color = glass(mat);
    color = linear2gamma(color);

    gl_FragColor = color;
}
