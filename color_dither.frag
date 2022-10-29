
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_noise;
uniform vec2        u_noiseResolution;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

// #define DITHER_FNC ditherShift
// #define DITHER_FNC ditherVlachos
// #define DITHER_FNC ditherBlueNoise
// #define DITHER_FNC ditherInterleavedGradientNoise
// #define DITHER_FNC ditherTriangleNoise
// #define DITHER_ANIMATED
// #define DITHER_CHROMA
#define BLUENOISE_TEXTURE u_noise
#define TIME_SECS   u_time
#include "lygia/color/dither.glsl"
#include "lygia/math/mirror.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    
    // compress
    const float c0 = 32.0;    
    vec2 its = mix( vec2(0.0), vec2(1.0) / c0, st );

    color.rgb = mix(vec3(its.x), vec3(its.xy, 0.0),  mirror(u_time * 0.025));
    
    color.rgb = mix(color.rgb, dither(color.rgb), vec3(step(mirror(u_time * 0.13), (st.y + st.x) * 0.5)) );

    // compress
    color.rgb = floor( color.rgb * 255.0 ) / 255.0;
    color.rgb *= c0;
    
    gl_FragColor = color;
}
