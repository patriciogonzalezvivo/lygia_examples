// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif


uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec2        v_texcoord;


// #define SAMPLEUNTILE_FAST
#include "lygia/sample/untile.glsl"
#include "lygia/math/const.glsl"

void main (void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float time = TAU + u_time * 0.7;
    float s = smoothstep( 0.4, 0.6, sin(time*0.5) );
    vec2 st1 = (2.0 + 1.0*s) * (st-0.5) + vec2(sin(time * 0.08), cos(time * 0.16));

    color = mix(texture2D(u_tex0, st1),
                sampleUntile(u_tex0, st1),
                step(0.5, st.x) );

    // color = sampleRepeat(u_tex0, st1);
    // color = sampleMirror(u_tex0, st1);
    // color = sampleClamp2edge(u_tex0, st1);
    
    gl_FragColor = color;
}
