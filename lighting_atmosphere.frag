// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

varying vec2    v_texcoord;

// Projection modes:
//     0 - equirectangular
//     1 - fisheye
//     3 - view space

#ifndef PROJECTION_MODE
#define PROJECTION_MODE 0
#endif
#include "lygia/space/fisheye2xyz.glsl"
#include "lygia/space/equirect2xyz.glsl"

// #define ATMOSPHERE_FAST
#include "lygia/lighting/atmosphere.glsl"

#ifndef TONEMAP_FNC
#define TONEMAP_FNC tonemapLinear
// #define TONEMAP_FNC tonemapDebug
// #define TONEMAP_FNC tonemapAces
// #define TONEMAP_FNC tonemapFilmic
// #define TONEMAP_FNC tonemapReinhard
// #define TONEMAP_FNC tonemapReinhardJodie
// #define TONEMAP_FNC tonemapUncharted
// #define TONEMAP_FNC tonemapUncharted2
// #define TONEMAP_FNC tonemapUnreal
#endif
#include "lygia/color/tonemap.glsl"

vec3 cart2viewSpace(vec2 uv) {
    float HalfFovV = PI / 6.0;
    float AspRatio = u_resolution.x / u_resolution.y;

    vec2 scale = vec2(cos(HalfFovV) / sin(HalfFovV));
    scale.x = scale.y / AspRatio;

    vec3 dir = vec3(0.0);
    dir.z = 0.01;// 10.0 / ATMOSPHERE_KM2M; // 10.0 / 1000.0
    dir.xy = (uv * 2.0 - 1.0) / scale * dir.z;
    dir = normalize(dir);
    // clamp cosine of zenith angle
    dir.xz /= sqrt(1.0 - dir.y * dir.y);
    // dir.y   = clamp(dir.y, MinCos, 1.0);
    dir.xz *= sqrt(1.0 - dir.y * dir.y);
    return dir;
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;
    vec2 mouse = u_mouse * pixel;

    if (mouse.x <= 0.1 && mouse.y <= 0.1)
        mouse = vec2(fract(0.5+u_time*0.25), sin(u_time*0.25) * 0.25 + 0.75);
        
#if PROJECTION_MODE == 0
    vec3 eye_dir = equirect2xyz(uv);
    vec3 sun_dir = equirect2xyz(mouse);
#elif PROJECTION_MODE == 1
    vec3 eye_dir = fisheye2xyz(uv);
    vec3 sun_dir = fisheye2xyz(mouse);
#else
    vec3 eye_dir = cart2viewSpace(uv);
    vec3 sun_dir = cart2viewSpace(mouse);
#endif

    color = atmosphere(eye_dir, sun_dir);

    color = tonemap(color);

    gl_FragColor = vec4(color, 1.0);
}
