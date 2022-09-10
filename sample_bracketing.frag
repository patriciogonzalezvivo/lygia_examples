
#ifdef GL_ES
precision mediump float;
#endif


uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec2        v_texcoord;

#include "lygia/math/const.glsl"
#include "lygia/math/decimation.glsl"
#include "lygia/generative/noised.glsl"

#define ARROWS_LINE_STYLE
#include "lygia/draw/arrows.glsl"

#define TEXTUREBRACKETING_REPLACE_DIVERGENCE
#include "lygia/sample/bracketing.glsl"

void main (void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec2 mouse = u_mouse * pixel;
    vec2 dir = ( noised( vec3(st, u_time * 0.1) ).yz );

    float scale = 1.;

    if (st.x > mouse.x)
        color = sampleBracketing(u_tex0, st, dir, scale);
    else
        color = texture2D(u_tex0, scale * rotate(st, dir));
    
    // // Output vector field directly
    // color = max(0.8*color, 
    //             0.9*arrows(st, dir*70., u_resolution));
    
    gl_FragColor = color;
}
