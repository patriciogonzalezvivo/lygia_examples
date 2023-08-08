#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/math/const.glsl"
#include "lygia/math/aastep.glsl"
#include "lygia/math/aafloor.glsl"
#include "lygia/math/aafract.glsl"
#include "lygia/space/cart2polar.glsl"
#include "lygia/color/space/linear2gamma.glsl"

// Example based on https://www.shadertoy.com/view/wtjGzt
// by FabriceNeyret2

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st * 2.0 - 1.0;

    vec2 p = cart2polar(uv);
    float v = 20.0 * p.x/ TAU + 10.0/p.y + u_time; // + sin(10.*l), // some fancy field
        // v = 100.0*exp(-3.0*abs(0.8*uv.x+0.2*uv.y)),           // linear gradient
        // v = 200.0*p.x/TAU,                                // radial gradient

    // top: spiral displayed with ramps, using fract
    v = uv.x < 0.0 ? fract( v ) : aafract( v );

    // bottom: spiral displayed with bars, using step(fract)
    v = uv.y > 0.0 ? v : uv.x < 0.0 ? step(0.5, v) : aastep(0.5, v);

    // final conversion to sRGB ( NB: sqrt(v) would be a good approx )
    color.rgb += linear2gamma(v);

    gl_FragColor = color;
}
