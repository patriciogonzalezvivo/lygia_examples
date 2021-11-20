
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform float       u_time;

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

#include "lygia/filter/sharpen.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    float radius = fract(st.x * 3.0) * 5.0;

    if (st.x < .33)
        color = sharpenAdaptive(u_tex0, st, pixel * max(1.0, radius)).rgb;

    else if (st.x < .66)
        color = sharpenContrastAdaptive(u_tex0, st, pixel * max(1.0, radius)).rgb;

    else 
        color = sharpenFast(u_tex0, st, pixel).rgb;

        
    color -= step(.95, fract(radius) ) * 0.1;
    color -= step(.98, fract(st.x * 3.0));

    gl_FragColor = vec4(color,1.0);
}
