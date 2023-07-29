
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/draw/fill.glsl"
#include "lygia/sdf/superShapeSDF.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float sdf = superShapeSDF( st, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 5.0);
    color.rgb += fill(sdf, 0.01);
    
    gl_FragColor = color;
}
