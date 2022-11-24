// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform float       u_time;

#include "lygia/math/const.glsl"
#include "lygia/sample/repeat.glsl"
#include "lygia/sample/clamp2edge.glsl"

void main (void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float time = TAU + u_time * 0.7;
    float s = smoothstep( 0.4, 0.6, sin(time*0.5) );
    vec2 st1 = (2.0 + 1.0*s) * (st-0.5) + vec2(sin(time * 0.08), cos(time * 0.16));

    color = mix(sampleClamp2edge(u_tex0, st1),
                sampleRepeat(u_tex0, st1),
                step(0.5, st.x) );

    gl_FragColor = color;
}
