
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform float       u_time;

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

#include "lygia/sample/clamp2edge.glsl"
#define EDGE_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV).r
#include "lygia/filter/edge.glsl"

#include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    float ix = floor(st.x * 5.0);
    float radius = max(0.1, ix * 0.5);

    if (st.y < 0.5)
        color += edgePrewitt(u_tex0, st, pixel * radius);
    else
        color += edgeSobel(u_tex0, st, pixel * radius);

    color -= step(st.y, 0.05) * 0.5;
    color = clamp(color, vec3(0.), vec3(1.));
    color += digits(st - vec2(ix/5.0 + 0.01, 0.01), radius);
    color -= step(.98, fract(st.x * 5.0));

    gl_FragColor = vec4(color,1.0);
}
