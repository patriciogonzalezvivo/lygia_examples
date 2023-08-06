#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//#define PLATFORM_WEBGL

#include "lygia/lighting/raymarch.glsl"
#include "lygia/sdf/opUnion.glsl"
#include "lygia/sdf/mandelbulbSDF.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/color/space/linear2gamma.glsl"

vec4 raymarchMap( in vec3 pos ) {
    vec4 res = vec4(1.0);
    res = opUnion( res, vec4(0.2, 0.2, 0.8, mandelbulbSDF(pos).x));
    return res;
}

void main() {
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    uv = ratio(uv, u_resolution);
    vec2 mo = u_mouse / u_resolution;
	float time = 32.0 + u_time * 1.5;

    // camera	
    vec3 ro = vec3( 4.5*cos(0.1*time + 7.0*mo.x), 2.2, 4.5*sin(0.1*time + 7.0*mo.x) ) * 5.0;

    color.rgb = raymarch(ro, uv * 2.0 + 0.5).rgb;
    color = linear2gamma(color);
    gl_FragColor = color;
}