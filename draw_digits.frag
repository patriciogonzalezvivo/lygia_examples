
#ifdef GL_ES
precision highp float;
#endif

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/sdf/circleSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/draw/stroke.glsl"
#include "lygia/draw/digits.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 xy = gl_FragCoord.xy/u_resolution.xy;

    float sdf = circleSDF(xy);
    
    // External ring
    float size1 = 0.5;
    float width = 0.1 + (sin(u_time) * 0.5 + 0.5) * 0.1;
    color += stroke(sdf, size1, width);

    // Inside circle
    float size2 = (size1 - width) * (sin(u_time * 0.1) * 0.5 + 0.5);
    color += fill(sdf, size2);

    // Debug
    color += digits(xy, width);
    color += digits(xy - vec2(0.5, 0.0), size2);
    
    gl_FragColor = vec4(color, 1.0);
}
