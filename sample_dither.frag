#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_resolution;
uniform vec2        u_time;

// #define PLATFORM_WEBGL

#define DITHER_PRECISION 4
// #define SAMPLEDITHER_FNC ditherBayer
// #define SAMPLEDITHER_FNC ditherBlueNoise
// #define SAMPLEDITHER_FNC ditherTriangleNoise

// #define SAMPLEDITHER_FNC ditherShift
// #define SAMPLEDITHER_FNC ditherVlachos
// #define SAMPLEDITHER_FNC ditherInterleavedGradientNoise
// #define DITHER_TIME u_time
// #define DITHER_CHROMA

#include "lygia/math/decimate.glsl"

#include "lygia/sample/dither.glsl"

void main() {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    
    float s = 1.0/2.0;

    color = texture2D(u_tex0, st);
    color = sampleDither(u_tex0, st, u_resolution * s);

    // color.rgb = vec3(luma(color.rgb));

    gl_FragColor = color;
}