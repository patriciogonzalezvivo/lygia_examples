

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3    u_camera;
uniform vec2    u_resolution;
uniform float    u_time;

varying vec4    v_position;
varying vec3    v_normal;
varying vec2    v_texcoord;

#include "lygia/generative/psrdnoise.glsl"

void main(void) {
    vec4 color = vec4( vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    vec3 g = vec3(0.0);
    // color += psrdnoise(uv * 100., vec2(1.0), 1.0, g);
    // color += psrdnoise( uv * 12., vec2(12.0), u_time) * 0.5 + 0.5;

    color += psrdnoise( v_position.xyz * 5., vec3(5.0), u_time, g) * 0.5 + 0.5;
    color.rgb = g * 0.5 + 0.5;
    
    gl_FragColor = color;
}

