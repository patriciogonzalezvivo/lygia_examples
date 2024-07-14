#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

// #define WORLEY_DIST_FNC distEuclidean
// #define WORLEY_DIST_FNC distManhattan
// #define WORLEY_DIST_FNC distChebychev
// #define WORLEY_DIST_FNC distMinkowski
// #define DIST_MINKOWSKI_P 2.0
#define WORLEY_JITTER (sin(u_time) * 0.5 + 0.5)

#include "lygia/generative/worley.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec2 d2 = worley2(vec2(st*10.0 + u_time));
    vec2 d3 = worley2(vec3(st*10.0, u_time));
    
    color += mix(d2.x, d3.x, step(0.5, st.x));

    gl_FragColor = color;
}
