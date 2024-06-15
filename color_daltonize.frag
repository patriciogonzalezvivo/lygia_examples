
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;
uniform vec2        u_resolution;

// #define DALTONIZE_FNC daltonizeProtanope
// #define DALTONIZE_FNC daltonizeProtanopia
// #define DALTONIZE_FNC daltonizeProtanomaly
// #define DALTONIZE_FNC daltonizeDeuteranope
// #define DALTONIZE_FNC daltonizeDeuteranopia
#define DALTONIZE_FNC daltonizeDeuteranomaly
// #define DALTONIZE_FNC daltonizeTritanope
// #define DALTONIZE_FNC daltonizeTritanopia
// #define DALTONIZE_FNC daltonizeTritanomaly
// #define DALTONIZE_FNC daltonizeAchromatopsia
// #define DALTONIZE_FNC daltonizeAchromatomaly
#include "lygia/color/daltonize.glsl"

void main (void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec4 tex0 = texture2D(u_tex0, st);
    color = daltonize(tex0);

    gl_FragColor = color;
}
