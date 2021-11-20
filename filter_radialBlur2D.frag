
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform float       u_time;

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

#define RADIALBLUR_SAMPLER_FNC(POS_UV) texture2D(tex, clamp(POS_UV, vec2(0.01), vec2(0.99)))
#include "lygia/filter/radialBlur.glsl"

#include "lygia/math/decimation.glsl"
#include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    vec2 center = vec2(0.5);

    float cols = 5.0;

    float x = st.x * cols;
    float xi = floor(x);
    float xf = fract(x);
    float strength = max(1.0, xi * 10.0);

    vec2 dir = st - center;
    float angle = atan(dir.y, dir.x);
    angle += u_time;
    dir = vec2(cos(angle), sin(angle));

    color += radialBlur(u_tex0, st, pixel * dir, strength).rgb;

    vec2 uv = vec2(fract(st.x * cols), st.y * cols) - 0.05;
    uv *= 0.3;

    color += digits(uv, strength, 0.0);
    color -= step(.99, xf);

    gl_FragColor = vec4(color,1.0);
}
