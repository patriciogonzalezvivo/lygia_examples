// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif


uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#include "lygia/math/const.glsl"
#include "lygia/generative/noised.glsl"

#define ARROWS_STYLE_LINE
#include "lygia/draw/arrows.glsl"

#define SAMPLEBRACKETING_REPLACE_DIVERGENCE
#include "lygia/sample/bracketing.glsl"

void main (void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec2 dir = noised( vec3(st, u_time * 0.1) ).yz ;

    float scale = 1.;
    color = mix(texture2D(u_tex0, rotate(st, atan(dir.y, dir.x))),
                sampleBracketing(u_tex0, st, dir),
                step(0.5, st.x) );

    // // Output vector field directly
    color = max(color, 
                arrows(st, dir, u_resolution * 0.5));
    
    gl_FragColor = color;
}
