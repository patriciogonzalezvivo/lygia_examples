
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;

#include "lygia/draw/stroke.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/color/palette/hue.glsl"

#include "lygia/math/gain.glsl"
#include "lygia/math/bump.glsl"
#include "lygia/math/parabola.glsl"
#include "lygia/math/gaussian.glsl"
#include "lygia/math/permute.glsl"

#include "lygia/math/cubic.glsl"
#include "lygia/math/invCubic.glsl"

#include "lygia/math/quartic.glsl"
#include "lygia/math/invQuartic.glsl"

#include "lygia/math/quintic.glsl"

#include "lygia/math/saturate.glsl"
#include "lygia/math/decimate.glsl"
#include "lygia/math/mirror.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = scale(ratio(gl_FragCoord.xy * pixel, u_resolution), 1.5);

    float x = st.x;
    float w = pixel.y * 5.0;

    color += stroke(st.y, bump(x * 2.0 - 1.0, 0.0), w) * hue(0.0);
    color += stroke(st.y, parabola(x, 0.7), w) * hue(0.25);
    color += stroke(st.y, gaussian(x * 2.0 - 1.0, 0.7), w) * hue(0.6);
    color += stroke(st.y, permute(x * 2.0 - 1.0), w) * hue(0.75);
    
    color += stroke(st.y, gain(x, 0.7), w) * hue(0.1);
    color += stroke(st.y, cubic(x), w) * hue(0.2);
    color += stroke(st.y, invCubic(x), w) * hue(0.3);
    color += stroke(st.y, quartic(x), w) * hue(0.4);
    color += stroke(st.y, invQuartic(x), w) * hue(0.5);
    color += stroke(st.y, quintic(x), w) * hue(0.6);

    color += stroke(st.y, saturate(x), w) * hue(0.7);
    color += stroke(st.y, mirror(x), w) * hue(0.8);
    color += stroke(st.y, decimate(x, 10.0), w) * hue(0.9);
    
    // draw grid
    color += stroke(fract(st.y), 0.01, pixel.y * 2.0) * 0.25;
    color += stroke(fract(st.x), 0.01, pixel.x * 2.0) * 0.25;
    color += stroke(fract(st.y * 10.0), 0.1, pixel.y * 10.) * 0.2;
    color += stroke(fract(st.x * 10.0), 0.1, pixel.x * 10.) * 0.2;

    gl_FragColor = vec4(color, 1.0);
}
