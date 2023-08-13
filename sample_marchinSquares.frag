
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0; // /imgs/danny.png
uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/space/ratio.glsl"
#include "lygia/generative/pnoise.glsl"

// #define SAMPLEMARCHINGSQUARES_SAMPLE_FNC(TEX, UV) pnoise(UV * 5.0, vec2(0.0));

#include "lygia/sample/marchingSquares.glsl";

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution);

    vec2 mouse = u_mouse.xy * pixel;

    vec2 ms = sampleMarchinSquares(u_tex0, st, u_resolution, mouse.x * 60.0, mouse.y);
    color.rgb += ms.r;
    
    gl_FragColor = color;
}
