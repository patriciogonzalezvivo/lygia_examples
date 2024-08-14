#ifdef GL_ES
precision highp float;
#endif

uniform vec3 u_camera;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define RAYMARCH_BACKGROUND vec3(0.0)

// #define PLATFORM_WEBGL

#include "lygia/lighting/raymarch.glsl"
#include "lygia/sdf/opUnion.glsl"
#include "lygia/sdf/mandelbulbSDF.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/color/space/linear2gamma.glsl"

Material raymarchMap( in vec3 pos ) {
    return materialNew(vec3(0.2, 0.2, 0.8), mandelbulbSDF(pos).x);
}

void main() {
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    uv = ratio(uv, u_resolution);
    vec2 mo = u_mouse / u_resolution;
	float time = 32.0 + u_time * 1.5;

    // camera	
    vec3 ro = vec3(cos(0.1*time + 7.0*mo.x), 0.6, sin(0.1*time + 7.0*mo.x)) * 1.5;

    color.rgb = raymarch(ro, vec3(0.0, 0.0, 0.0), uv * 2.0 + 0.5).rgb;
    color = linear2gamma(color);

    gl_FragColor = color;
}