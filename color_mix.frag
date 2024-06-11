#version 120

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/color/palette/pigments.glsl"

// #define MIXOKLAB_SRGB
#include "lygia/color/mixOklab.glsl"

// #define MIXSPECTRAL_SRGB
#include "lygia/color/mixSpectral.glsl"

// #define RYB_FAST
// #define RYB_LERP(A, B, t) mix(A, B, t)
#include "lygia/color/mixRYB.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float i = floor((1.0-st.y) * 4.0);
    
    vec3 A = vec3(0.0, 0.07, 0.16);
    // A = PHTHALO_BLUE;
    // A = COBALTE_BLUE;
    // A = ULTRAMARINE_BLUE;
    // A = PHTHALO_GREEN;
    // A = QUINACRIDONE_MAGENTA;

    vec3 B = vec3(0.8431372549, 0.6, 0.0);
    // B = CADMIUM_YELLOW;
    // B = CADMIUM_ORANGE;
    // B = CADMIUM_RED;
    // B = COBALT_VIOLET;

    if (i == 0.0) 
        color = mix(A, B, st.x);
    else if (i == 1.0)
        color = mixOklab(A, B, st.x);
    else if (i == 2.0)
        color = mixSpectral(A, B, st.x);
    else if (i == 3.0)
        color = mixRYB(A, B, st.x);

    gl_FragColor = vec4(color, 1.0);
}
