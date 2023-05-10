
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

varying vec2    v_texcoord;

#include "lygia/draw/stroke.glsl"

#include "lygia/math/gaussian.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    float x = st.x;

    float kernelSizef = 1.0 / 5.0;
    x = gaussian(x - 0.5, kernelSizef);
    color += stroke(st.y, x, pixel.y * 2.0);

    color.r += gaussian(st - vec2(0.5), kernelSizef);
    
    gl_FragColor = color;
}
