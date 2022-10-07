
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

// #define DITHER_FNC ditherShift
// #define DITHER_FNC ditherVlachos
// #define DITHER_FNC ditherBlueNoise
// #define DITHER_FNC ditherInterleavedGradientNoise
// #define DITHER_FNC ditherTriangleNoise
// #define DITHER_ANIMATED
// #define DITHER_CHROMA
#define BLUENOISE_TEXTURE u_tex0
#include "lygia/color/dither.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    
    // compress
    const float c0 = 32.0;    
    vec2 its = mix( vec2(0.0), vec2(1.0) / c0, st );
    color.rgb += mix(vec3(its.x), vec3(its.xy, 0.0), step(1.0+cos(u_time * 0.1), st.y + st.x) );

    // color.rgb = dither(color.rgb);

    // compress
    color.rgb = floor( color.rgb * 255.0 ) / 255.0;
    color.rgb *= c0;
    
    gl_FragColor = color;
}
