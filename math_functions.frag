
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

varying vec2    v_texcoord;

#include "lygia/draw/stroke.glsl"

#include "lygia/math/gain.glsl"
#include "lygia/math/bump.glsl"
#include "lygia/math/saturate.glsl"
#include "lygia/math/parabola.glsl"
#include "lygia/math/gaussian.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    float f = st.x;
    f = bump( (f - 0.5) * 2.0, 0.0);
    // f = gain(f, 0.7);
    // f = parabola(f, 0.99);
    // f = gaussian(f, 0.9);
    color += stroke(st.y, f, pixel.y * 2.0);
    
    gl_FragColor = color;
}
