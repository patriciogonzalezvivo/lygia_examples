
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/math/const.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/space/rotate.glsl"
#include "lygia/draw/colorChecker.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.5), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_resolution);
    uv = scale(uv, 1.1);

    vec4 spyderA = colorCheckerSpyderA(uv * 2.0);
    vec4 spyderB = colorCheckerSpyderB(uv * 2.0 + vec2(0.0, -1.0));
    vec4 macbeth = colorCheckerMacbeth(rotate(uv * 1.5, HALF_PI) + vec2(-0.25, 0.68) );
    
    color.rgb = mix(color.rgb, spyderA.rgb, spyderA.a);
    color.rgb = mix(color.rgb, spyderB.rgb, spyderB.a);
    color.rgb = mix(color.rgb, macbeth.rgb, macbeth.a);

    gl_FragColor = color;
}
