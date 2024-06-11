#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/math/saturate.glsl"

// #define RYB_FAST
// #define RYB_LERP(A, B, t) mix(A, B, t)
#include "lygia/color/palette/pigments/winsor_oil.glsl"
#include "lygia/color/palette/pigments.glsl"
#include "lygia/color/mixRYB.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 A = vec3(1.0, 0.0, 0.0); 
    // A = CADMIUM_RED;
    // A = CADMIUM_ORANGE;
    // A = QUINACRIDONE_MAGENTA;
    // A = VIRIDIAN;
    // A = BURNT_SIENNA;

    vec3 B = vec3(1.0, 1.0, 0.0);
    // B = CADMIUM_YELLOW;
    // B = HANSA_YELLOW;
    // B = CADMIUM_LEMON;
    // B = YELLOW_OCHRE;

    vec3 C = vec3(0.0, 0.0, 1.0);
    // C = COBALTE_BLUE;
    // C = ULTRAMARINE_BLUE;
    // C = PHTHALO_BLUE;
    // C = PHTHALO_GREEN;
    // C = PERMANENT_GREEN;
    // C = SAP_GREEN;
    // C = IVORY_BLACK; 

    vec3 t = vec3(0.0);
    t.x = saturate(1.0 - length(st - vec2(0.5, 1.0)));
    t.y = saturate(1.0 - length(st - vec2(0.0, 0.0)));
    t.z = saturate(1.0 - length(st - vec2(1.0, 0.0)));
    // t = normalize(t);
    color = mixRYB(A, B, C, t);

    gl_FragColor = vec4(color, 1.0);
}
