// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform float       u_time;

#include "lygia/math/const.glsl"
#include "lygia/sample/zero.glsl"

void main (void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float time = TAU + u_time * 0.7;
    float s = sin(time*0.5) * 0.5 + 0.5;
    color = sampleZero(u_tex0, st, s * 0.2);

    gl_FragColor = color;
}
