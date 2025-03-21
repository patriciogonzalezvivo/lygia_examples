#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

#include "lygia/color/luma.glsl"
#include "lygia/color/palette/wada/value.glsl"
#include "lygia/draw/digits.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float x1 = st.y * 4.0 + u_time * 0.7;
    float x1f = fract(x1);
    float x1i = mod(floor(x1), float(WADA_TOTAL));
    vec3 color1 = wada(int(x1i));

    float x2 = st.y * 3.0 - u_time * 0.5;
    float x2f = fract(x2);
    float x2i = mod(floor(x2), float(WADA_TOTAL));
    vec3 color2 = wada(int(x2i));

    color.rgb = mix(color1, color2, step(0.5, st.x));
    float l = luma(color);

    color.rgb = mix(color.rgb, vec3(step(l,0.01)), digits(vec2(st.x, x1f) * vec2(1.,.2) - 0.01, x1i + 1.0, 0.));
    color.rgb = mix(color.rgb, vec3(step(l,0.01)), digits(vec2(st.x, x2f) * vec2(1.,.3) - vec2(0.51, 0.01), abs(x2i) + 1.0, 0.));

    gl_FragColor = color;
}
