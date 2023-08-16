#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform sampler2D   u_pyramid0;
uniform sampler2D   u_pyramidTex0;
uniform sampler2D   u_pyramidTex1;
uniform int         u_pyramidDepth;
uniform int         u_pyramidTotalDepth;
uniform bool        u_pyramidUpscaling;

uniform vec2        u_resolution;
uniform int         u_frame;
uniform float       u_time;


vec3 heatmap(float v) {
    vec3 r = v * 2.1 - vec3(1.8, 1.14, 0.3);
    return 1.0 - r * r;
}

float rectSDF(in vec2 st, in vec2 s) {
    st = st * 2. - 1.;
    return max( abs(st.x / s.x),
                abs(st.y / s.y) );
}

const vec3  h1      = vec3(1.0334, 0.6836, 0.1507);
const float h2      = 0.0270;
const vec2  g       = vec2(0.7753, 0.0312);

#define saturate(x) clamp(x, 0.0, 1.0)
#define absi(x)     ( (x < 0)? x * -1 : x )
#define modi(a,b)   ( a - (b * int(a/b)))

#include "lygia/morphological/poissonFill/upscale.glsl"
#include "lygia/morphological/poissonFill/downscale.glsl"

void main (void) {
    vec4 color = vec4(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 pixel = 1.0/u_resolution;
    float sdf = rectSDF(st, vec2(1.0));

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