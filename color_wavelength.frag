#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#define W2RGB_FNC spectral_zucconi6
#define W2RGB_ITERATIONS 20.

#include "lygia/math/map.glsl"
#include "lygia/color/space.glsl"
#include "lygia/color/palette/spectral.glsl"

#include "lygia/draw/digits.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float x = st.x;
    float w = mix(400., 700., st.x);

    if (st.y > 0.8)
        color.rgb = spectral( x );
    else if (st.y > 0.7)
        color.rgb = spectral( x, map(st.y, 0.8, 0.7, 0.0, 1.0) );
    else if (st.y > 0.6)
        color.rgb = spectral_geoffrey( x );
    else if (st.y > 0.5)
        color.rgb = spectral_zucconi( x );
    else if (st.y > 0.4)
        color.rgb = spectral_zucconi6( x );
    else if (st.y > 0.3)
        color.rgb = spectral_gems( x );
    else if (st.y > 0.2)
        color.rgb = spectral_soft( x );
    else
        color.rgb = w2rgb( w );

    vec2 uv = vec2(st.y, 1.0-st.x);
    uv.x = fract( uv.x * 3.) * 0.25 - 0.01;
    color += digits(uv - vec2(0.06, 0.97), 300., 0.);
    color += digits(uv - vec2(0.06, 0.), 700., 0.);
    
    gl_FragColor = color;
}
