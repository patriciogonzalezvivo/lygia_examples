uniform sampler2D   u_tex0; // /imgs/danny.png

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

// #define PINCUSHION_OCT_1 
#include "lygia/distort/pincushion.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0 / u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    vec2 mouse = u_mouse * pixel;
    float amount = mouse.x - 0.5;

    color.rgb = pincushion(u_tex0, st, pixel, sin(u_time) * 0.5);
    gl_FragColor = color;
}