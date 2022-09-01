
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

#include "lygia/generative/worley.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float d2 = worley(vec2(st*10. + u_time));
    float d3 = worley(vec3(st*10., u_time));
    
    color += mix(d2, d3, step(0.5, st.x));

    gl_FragColor = color;
}
