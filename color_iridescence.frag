
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

varying vec2    v_texcoord;

#include "lygia/math/const.glsl"
#include "lygia/color/space.glsl"
#include "lygia/lighting/iridescence.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    color.rgb = iridescence( cos(uv.x*HALF_PI) ,1.0-uv.y);
	color = linear2gamma(color);
    
    gl_FragColor = color;
}
