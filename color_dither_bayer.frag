#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_resolution;
uniform vec2        u_time;

// #define PLATFORM_WEBGL
// #define DITHER_BAKER_LINEAR_PATTERN

#include "lygia/math/decimate.glsl"
#include "lygia/math/nearest.glsl"
#include "lygia/sample/dither.glsl"
#include "lygia/color/space/gamma2linear.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "../../color/space/rgb2srgb.glsl"
#include "../../color/space/srgb2rgb.glsl"

void main() {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    
    float d = 4.0;
    float s = 1.0/2.0;

    
    color = texture2D(u_tex0, st);
    // color.rgb = gamma2linear(color.rgb);
    // color.rgb = srgb2rgb(color.rgb);

    st = nearest(st, u_resolution * s);
    color.rgb = ditherBayer(color.rgb, st * u_resolution * s);

    // color.rgb = rgb2srgb(color.rgb);
    // color.rgb = linear2gamma(color.rgb);
    // color.rgb = saturate(color.rgb);


    // color.rgb = vec3(luma(color.rgb));

    gl_FragColor = color;
}