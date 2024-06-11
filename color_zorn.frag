#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/math/saturate.glsl"

// #define RYB_FAST
#include "lygia/color/mixRYB.glsl"

#include "lygia/color/palette/pigments/winsor_oil.glsl"
// #include "lygia/color/palette/pigments/winsor_acrylic.glsl"
// #include "lygia/color/palette/pigments/winsor_gouache.glsl"
// #include "lygia/color/palette/pigments/rembrandt_oil.glsl"
// #include "lygia/color/palette/pigments/liquitex_acrylic.glsl"
// #include "lygia/color/palette/pigments/golden_acrylic.glsl"
// #include "lygia/color/palette/pigments/gamblin_oil.glsl"
#include "lygia/color/palette/zorn.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec4 amounts = vec4(0.0);
    amounts.x = saturate(1.0 - length(st - vec2(1.0, 1.0)));
    amounts.y = saturate(1.0 - length(st - vec2(0.0, 0.0)));
    amounts.z = saturate(1.0 - length(st - vec2(0.0, 1.0)));
    amounts.w = saturate(1.0 - length(st - vec2(1.0, 0.0)));

    color = mixRYB(zorn(0), zorn(1), zorn(2), zorn(3), amounts);

    gl_FragColor = vec4(color, 1.0);
}
