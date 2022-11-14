// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform float       u_time;

#include "lygia/math/mirror.glsl"
#include "lygia/sample/nearest.glsl"

#define SAMPLESMOOTH_POLYNOMIAL cubic
#include "lygia/sample/smooth.glsl"

void main (void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st * 0.01;

    color.rgb = texture2D(u_tex0, uv).rgb;

    vec3 near = sampleNearest(u_tex0, uv, u_tex0Resolution).rgb;
    vec3 smooth = sampleSmooth(u_tex0, uv, u_tex0Resolution).rgb;

    float pct = mirror(u_time * 0.2);
    
    if ( st.y > 0.5)
        color.rgb = mix(color.rgb, near, vec3( step(st.x, pct) ) );
    else
        color.rgb = mix(color.rgb, smooth, vec3( step(st.x, pct) ) );
        
    gl_FragColor = color;
}
