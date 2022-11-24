// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform float       u_time;

#include "lygia/sample/bicubic.glsl"

void main (void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st * 0.01;

    color.rgb = mix(texture2D(u_tex0, uv).rgb, 
                    sampleBicubic(u_tex0, uv, u_tex0Resolution).rgb, 
                    step(0.5, st.x) );
        
    gl_FragColor = color;
}
