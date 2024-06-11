#version 120

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#define PALETTE_LERP_SIZE 8
// #define PALETTE_LERP_SRGB

// #define PALETTE_LERP_MIX_FNC(A, B, T) mixSpectral(A, B, T)
// #include "lygia/color/mixSpectral.glsl"

// #define PALETTE_LERP_MIX_FNC(A, B, T) mixOklab(A, B, T)
// #include "lygia/color/mixOklab.glsl"

// #define PALETTE_LERP_MIX_FNC(A, B, T) mixRYB(A, B, T)
// #include "lygia/color/mixRYB.glsl"

#include "lygia/color/palette/pigments.glsl"
#include "lygia/color/palette/pigments/winsor_oil.glsl"
#include "lygia/color/palette/pigments/winsor_acrylic.glsl"
#include "lygia/color/palette/pigments/winsor_gouache.glsl"
#include "lygia/color/palette/pigments/rembrandt_oil.glsl"
#include "lygia/color/palette/pigments/liquitex_acrylic.glsl"
#include "lygia/color/palette/pigments/golden_acrylic.glsl"
#include "lygia/color/palette/pigments/gamblin_oil.glsl"
#include "lygia/color/palette/lerp.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    st.y = 1.0 - st.y;
    int brand = int(st.x * 4.);

    vec3 pigments[PALETTE_LERP_SIZE];
    pigments[0] = TITANIUM_WHITE;
    pigments[1] = CADMIUM_YELLOW;
    pigments[2] = YELLOW_OCHRE;
    pigments[3] = CADMIUM_ORANGE;
    pigments[4] = CADMIUM_RED;
    pigments[5] = COBALT_BLUE;
    pigments[6] = BURNT_SIENNA;
    pigments[7] = IVORY_BLACK;

    vec3 windsor_oil[PALETTE_LERP_SIZE];
    windsor_oil[0] = WINDSOR_OIL_TITANIUM_WHITE;
    windsor_oil[1] = WINDSOR_OIL_CADMIUM_YELLOW;
    windsor_oil[2] = WINDSOR_OIL_YELLOW_OCHRE;
    windsor_oil[3] = WINDSOR_OIL_CADMIUM_ORANGE;
    windsor_oil[4] = WINDSOR_OIL_CADMIUM_RED;
    windsor_oil[5] = WINDSOR_OIL_COBALT_BLUE;
    windsor_oil[6] = WINDSOR_OIL_BURNT_SIENNA;
    windsor_oil[7] = WINDSOR_OIL_IVORY_BLACK;

    vec3 rembrandt_oil[PALETTE_LERP_SIZE];
    rembrandt_oil[0] = REMBRANDT_OIL_TITANIUM_WHITE;
    rembrandt_oil[1] = REMBRANDT_OIL_CADMIUM_YELLOW;
    rembrandt_oil[2] = REMBRANDT_OIL_YELLOW_OCHRE;
    rembrandt_oil[3] = REMBRANDT_OIL_CADMIUM_ORANGE;
    rembrandt_oil[4] = REMBRANDT_OIL_CADMIUM_RED;
    rembrandt_oil[5] = REMBRANDT_OIL_COBALT_BLUE;
    rembrandt_oil[6] = REMBRANDT_OIL_BURNT_SIENNA;
    rembrandt_oil[7] = REMBRANDT_OIL_IVORY_BLACK;

    vec3 gamblin_oil[PALETTE_LERP_SIZE];
    gamblin_oil[0] = GAMBLIN_OIL_TITANIUM_WHITE;
    gamblin_oil[1] = GAMBLIN_OIL_CADMIUM_YELLOW;
    gamblin_oil[2] = GAMBLIN_OIL_YELLOW_OCHRE;
    gamblin_oil[3] = GAMBLIN_OIL_CADMIUM_ORANGE;
    gamblin_oil[4] = GAMBLIN_OIL_CADMIUM_RED;
    gamblin_oil[5] = GAMBLIN_OIL_COBALT_BLUE;
    gamblin_oil[6] = GAMBLIN_OIL_BURNT_SIENNA;
    gamblin_oil[7] = GAMBLIN_OIL_IVORY_BLACK;

    // Default
    if (brand == 0)
        color.rgb = paletteLerp(pigments, st.y);

    // Oils
    else if (brand == 1)
        color.rgb = paletteLerp(windsor_oil, st.y);
    else if (brand == 2)
        color.rgb = paletteLerp(rembrandt_oil, st.y);
    else if (brand == 3)
        color.rgb = paletteLerp(gamblin_oil, st.y);
    
    gl_FragColor = color;
}
