
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/math/saturate.glsl"
#include "lygia/color/mixOklab.glsl"
#include "lygia/color/mixBox.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec3 A = vec3(1.0, 1.0, 0.0);
    vec3 B = vec3(0.0353, 0.1608, 0.502);
    float pct = st.x;

    if (st.y < 0.33) 
        color = mix(A, B, pct);
    else if (st.y < 0.66)
        color = mixOklab(A, B, pct);
    else
        color = mixBox(A, B, st.x);

    gl_FragColor = vec4(color, 1.0);
}
