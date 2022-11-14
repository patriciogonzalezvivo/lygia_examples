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
uniform float       u_iblLuminance;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec4        v_position;
varying vec4        v_color;
varying vec3        v_normal;
varying vec2        v_texcoord;

#define RESOLUTION          u_resolution
#define SCENE_BACK_SURFACE  u_sceneBuffer0
#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         u_lightColor
#define IBL_LUMINANCE       u_iblLuminance

// #include "lygia/lighting/atmosphere.glsl"
// #ifndef SCENE_CUBEMAP
// #define ENVMAP_FNC(NORM, ROUGHNESS, METALLIC) atmosphere(NORM, normalize(u_light))
// #endif
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/glass.glsl"
#include "lygia/lighting/material/new.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#if defined(SCENE_BUFFER_0)
    vec3 normal = (u_viewMatrix * vec4(v_normal, 0.0)).xyz; 
    float front = dot(normal, vec3(0.0, 0.0, 1.0));

    if (front > 0.0)
        discard;

    color.rgb += v_normal;
    color.a = gl_FragCoord.z;
    
#else
    Material mat = materialNew();
    mat.roughness = 0.1;

    color = glass(mat);
    color = linear2gamma(color);

#endif

    gl_FragColor = color;
}
