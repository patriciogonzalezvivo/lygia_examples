#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_doubleBuffer0;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/generative/random.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/draw/stroke.glsl"
#include "lygia/simulate/ripple.glsl"

void main() {
    vec3 color = vec3(0.0);
   	vec2 pixel = 1.0/u_resolution.xy;
    vec2 mouse = u_mouse * pixel;
    vec2 st = gl_FragCoord.xy * pixel;

#ifdef DOUBLE_BUFFER_0
    color = ripple(u_doubleBuffer0, st, pixel);
    color.r += stroke(circleSDF(st - mouse + 0.5), 0.01 * random(st + u_time), 0.01) * 0.1;

#else
    color += texture2D(u_doubleBuffer0, st).r;

#endif

    gl_FragColor = vec4(color, 1.0);
}
