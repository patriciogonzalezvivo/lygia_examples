
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0; // /imgs/danny.png
uniform vec2        u_tex0Resolution;
uniform vec2        u_resolution;

#include "lygia/color/brightnessContrast.glsl"

void main (void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec4 tex0 = texture2D(u_tex0, st);
    float brightness = 0.5 * step(0.5, st.x);
    float contrast = 1.0 + 1.0 * step(0.5, st.y);

    color = brightnessContrast(tex0, brightness, contrast);

    gl_FragColor = color;
}
