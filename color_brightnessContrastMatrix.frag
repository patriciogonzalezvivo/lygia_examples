
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0; // /imgs/danny.png
uniform vec2        u_tex0Resolution;
uniform vec2        u_resolution;

#include "lygia/color/brightnessMatrix.glsl"
#include "lygia/color/contrastMatrix.glsl"

void main (void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec4 tex0 = texture2D(u_tex0, st);
    mat4 brightness = brightnessMatrix(0.5 * step(0.5, st.x));
    mat4 contrast = contrastMatrix(1.0 + 1.0 * step(0.5, st.y));
    color = brightness * contrast * tex0;

    gl_FragColor = color;
}
