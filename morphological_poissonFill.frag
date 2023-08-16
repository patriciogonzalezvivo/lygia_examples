#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform sampler2D   u_pyramid0;
uniform sampler2D   u_pyramidTex0;
uniform sampler2D   u_pyramidTex1;
uniform int         u_pyramidDepth;
uniform int         u_pyramidTotalDepth;
uniform bool        u_pyramidUpscaling;

uniform vec2        u_resolution;
uniform int         u_frame;
uniform float       u_time;

#define modi(a,b)   (a - (b * int(a/b)))

#include "lygia/morphological/poissonFill/upscale.glsl"
#include "lygia/morphological/poissonFill/downscale.glsl"

void main (void) {
    vec4 color = vec4(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 pixel = 1.0/u_resolution;

#if defined(CONVOLUTION_PYRAMID_0)
    color = texture2D(u_tex0, st);
    color.rgb *= step(0.001, color.a);

#elif defined(CONVOLUTION_PYRAMID_ALGORITHM)

    // Downscale the image to the pyramid
    if (!u_pyramidUpscaling)
        color = poissonFillDownscale(u_pyramidTex0, st, pixel);
    
    // Visualize the pyramid by stepping through the levels
    //  Comment this next to lines to see the actual result
    else if (modi(int(u_time),u_pyramidTotalDepth) == u_pyramidDepth)
        color = texture2D(u_pyramidTex0, st);
    
    // Upscale the image from the pyramid
    else
        color = poissonFillUpscale(u_pyramidTex0, u_pyramidTex1, st, pixel);
    
    color = (color.a == 0.0)? color : vec4(color.rgb/color.a, 1.0);

#else
    color = texture2D(u_pyramid0, st);

#endif

    gl_FragColor = color;
}