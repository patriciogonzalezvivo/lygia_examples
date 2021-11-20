
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform float       u_time;

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

#define KUWAHARA_SAMPLER_FNC(POS_UV) texture2D(tex, clamp(POS_UV, vec2(0.01), vec2(0.99)))
#include "lygia/filter/kuwahara.glsl"

#include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    float ix = floor(st.x * 5.0);
    float kernel_size = max(1.0, ix * 3.0);;

    color += kuwahara(u_tex0, st, pixel, int(kernel_size)).rgb;

    color += digits(st - vec2(ix/5.0 + 0.01, 0.01), kernel_size, 0.0);
    color -= step(.99, fract(st.x * 5.0));

    gl_FragColor = vec4(color,1.0);
}
