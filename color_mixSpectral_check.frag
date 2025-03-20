#version 120

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_buffer0;
uniform sampler2D u_buffer1;

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;
uniform int     u_frame;

// #define CIE_D50

#include "lygia/math/const.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"

#include "lygia/draw/colorChecker.glsl"

// #define MIXSPECTRAL_SRGB
#include "lygia/color/mixSpectral.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.5), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_resolution);
    uv = scale(uv, 1.1);

    #if defined(BUFFER_0)

    vec4 macbeth = colorCheckerMacbeth(uv);

    if (u_frame <= 1) {
        color.rgb = macbeth.rgb;
    }
    else {
        vec4 prevColor = texture2D(u_buffer1, st);

        color.rgb = mixSpectral(prevColor.rgb, macbeth.rgb, 0.01);
    }

    #elif defined(BUFFER_1)
        color = texture2D(u_buffer0, st);
    #else

        color = texture2D(u_buffer0, st);
        
    #endif

    gl_FragColor = color;
}
