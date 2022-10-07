
#ifdef GL_ES
precision highp float;
#endif

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/draw/circle.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/animation/easing.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float pct = fract(u_time * 0.25);
    st = scale(st, 1.1);

    float rows = 10.0;
    float row = floor(st.y * rows);

    st.x += 0.5;

    if (row == 0.0)
        pct = pct < 0.5 ? linearOut(pct * 2.0) : linearIn( (1.0-pct) * 2.0 );
    else if (row == 1.0)
        pct = pct < 0.5 ? exponentialOut(pct * 2.0) : exponentialIn( (1.0-pct) * 2.0 );
    else if (row == 2.0)
        pct = pct < 0.5 ? quarticOut(pct * 2.0) : quarticIn( (1.0-pct) * 2.0 );
    else if (row == 3.0)
        pct = pct < 0.5 ? cubicOut(pct * 2.0) : cubicIn( (1.0-pct) * 2.0 );
    else if (row == 4.0)
        pct = pct < 0.5 ? circularOut(pct * 2.0) : circularIn( (1.0-pct) * 2.0 );
    else if (row == 5.0)
        pct = pct < 0.5 ? quadraticOut(pct * 2.0) : quadraticIn( (1.0-pct) * 2.0 );
    else if (row == 6.0)
        pct = pct < 0.5 ? sineOut(pct * 2.0) : sineIn( (1.0-pct) * 2.0 );
    else if (row == 7.0)
        pct = pct < 0.5 ? elasticOut(pct * 2.0) : elasticIn( (1.0-pct) * 2.0 );
    else if (row == 8.0)
        pct = pct < 0.5 ? bounceOut(pct * 2.0) : bounceIn( (1.0-pct) * 2.0 );
    else if (row == 9.0)
        pct = pct < 0.5 ? backOut(pct * 2.0) : backIn( (1.0-pct) * 2.0 );
    
    st.x -= pct;

    st.y = fract(st.y * rows);
    st = ratio(st, u_resolution);
    st = ratio(st, vec2(rows, 1.0));

    color += circle(st, 0.2) * step(0.0, row) * step(row, 9.);
    color *= step(0.1, st.y) * step(st.y, 0.9);
    
    
    gl_FragColor = vec4(color, 1.0);
}
