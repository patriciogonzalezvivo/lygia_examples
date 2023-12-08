
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/draw/colorChecker.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.5), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_resolution);
    uv = scale(uv, 1.1);

    vec4 cc = colorCheckerSpyder(uv);
    // cc = colorCheckerMacbeth(uv);
    
    color.rgb = mix(color.rgb, cc.rgb, cc.a);

    gl_FragColor = color;
}
