
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/math/const.glsl"
#include "lygia/math/decimate.glsl"
#include "lygia/math/cubicMix.glsl"
#include "lygia/draw/circle.glsl"

// #define RYB_FAST
#define RYB_LERP(A, B, T) cubicMix(A, B, T)
#include "lygia/color/hueShiftRYB.glsl"
// #define HSV2RYB_FAST
#include "lygia/color/space/hsv2ryb.glsl"


void main(void) {
    vec4 color = vec4(1.);
    vec2 pixel = 1./u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    // Color Wheel
    vec2 p = st * 2.0 - 1.0;
    p *= 1.1;
    float a = atan(p.y, -p.x);
    a = decimate(a, 3.0);
    float l = saturate(length(p));
    vec3 w = hsv2ryb(vec3(a/TAU + 0.5, 1.0, decimate( l, 6.0) ));
    color.rgb = mix(color.rgb, w, aastep(l, 1.0));

    // Mouse Pointer
    vec2 p_mouse = (u_mouse * pixel) * 2.0 - 1.0;
    float a_mouse = atan(p_mouse.y, -p_mouse.x);
    float l_mouse = length(p_mouse);
    vec3 c_mouse = hsv2ryb(vec3(a_mouse/TAU + 0.5, 1.0, l));
    color.rgb = mix(color.rgb, c_mouse, circle( (p - p_mouse) + 0.5, 0.3));
    color.rgb = mix(color.rgb, vec3(0.0), circle( (p - p_mouse) + 0.5, 0.3, pixel.x * 5.0));

    // Complementary
    float a_comp = a_mouse + PI;
    vec2 p_comp = (vec2(cos(a_mouse), -sin(a_mouse))) * l_mouse;
    vec3 c_comp = hueShiftRYB(c_mouse, PI);
    // vec3 c_comp = hsv2ryb(vec3(a_comp/TAU + 0.5, 1.0, l));
    color.rgb = mix(color.rgb, c_comp, circle( (p - p_comp) + 0.5, 0.2));
    color.rgb = mix(color.rgb, vec3(0.0), circle( (p - p_comp) + 0.5, 0.2, pixel.x * 5.0));

    gl_FragColor = color;
}
