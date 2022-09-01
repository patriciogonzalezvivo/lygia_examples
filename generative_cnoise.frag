
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

#include "lygia/generative/cnoise.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float d2 = cnoise(vec2(st * 5. + u_time)) * 0.5 + 0.5;
    float d3 = cnoise(vec3(st * 5., u_time)) * 0.5 + 0.5;
    
    color += mix(d2, d3, step(0.5, st.x));

    gl_FragColor = color;
}
