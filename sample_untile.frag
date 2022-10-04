
#ifdef GL_ES
precision mediump float;
#endif


uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec2        v_texcoord;

// #define SAMPLEUNTILE_FAST
#include "lygia/sample/untile.glsl"

void main (void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

	float f = smoothstep( 0.4, 0.6, sin(u_time    ) );
    float s = smoothstep( 0.4, 0.6, sin(u_time*0.5) );

    color = sampleUntile(u_tex0, (2.0 + 1.0*s)*st + u_time*0.1, f );

    gl_FragColor = color;
}
