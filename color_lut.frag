
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0; // /imgs/danny.png
uniform sampler2D   u_tex1; // /imgs/aquare_01.png

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#define LUT_SQUARE
#include "lygia/color/lut.glsl"

void main(void) {
    vec4 color = vec4(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    color = texture2D(u_tex0, st);

    color = lut(u_tex1, color);

    gl_FragColor = color;
}
