
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;

#define DILATION_TYPE vec4
#define DILATION_SAMPLE_FNC(TEX, UV) SAMPLER_FNC(TEX, UV)
#include "lygia/morphological/dilation.glsl"

void main (void) {
    vec4 color = vec4(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    color = mix(texture2D(u_tex0, st),
                dilation(u_tex0, st, pixel, 32),
                step(0.5, st.x));

    color.a = 1.0;
    gl_FragColor = color;
}
