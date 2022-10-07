
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#include "lygia/math/decimation.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/sample/sprite.glsl"
#include "lygia/animation/spriteLoop.glsl"

void main (void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    vec2 grid = vec2(10., 7.0);

    color = texture2D(u_tex0, st);
    st = decimation(st, u_tex0Resolution * 0.15);
    st = scale(st, 0.8);

    // color = sampleSprite(u_tex0, st, grid, 41.);

    // float time = u_time * 6.0;
    float time = mod(u_time * 6.0, 48.0);
    if (time < 6.0)
        color = spriteLoop(u_tex0, st, grid, 0., 2., time);
    else if (time < 12.0)
        color = spriteLoop(u_tex0, st, grid, 3., 6., time);
    else if (time < 18.0)
        color = spriteLoop(u_tex0, st, grid, 13., 16., time);
    else if (time < 24.0)
        color = spriteLoop(u_tex0, st, grid, 23., 26., time);
    else if (time < 30.0)
        color = spriteLoop(u_tex0, st, grid, 33., 36., time);
    else if (time < 36.0)
        color = spriteLoop(u_tex0, st, grid, 43., 46., time);
    else if (time < 42.0)
        color = spriteLoop(u_tex0, st, grid, 50., 53., time);
    else
        color = spriteLoop(u_tex0, st, grid, 60., 65., time);
    
    gl_FragColor = color;
}
