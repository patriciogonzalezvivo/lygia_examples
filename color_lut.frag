
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform sampler2D   u_tex1;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#define LUT_SQUARE
#define LUT_FLIP_Y
#define LUT_CELL_SIZE 64.0
#define LUT_CELLS_PER_SIDE 8.0
#include "lygia/color/lut.glsl"

void main(void) {
    vec4 color = vec4(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    color = texture2D(u_tex0, st);

    color = lut(u_tex1, color);

    gl_FragColor = color;
}
