
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;

#include "lygia/math/const.glsl"
#include "lygia/generative/snoise.glsl"
#include "lygia/generative/gnoise.glsl"
#include "lygia/generative/wavelet.glsl"

float gyroid (vec3 p) { return dot(sin(p),cos(p.yzx)); }

#define ROT 5
float ang = TAU / float(ROT);
mat2 m = mat2(  cos(ang), sin(ang),
                -sin(ang), cos(ang));

float turb(vec3 p) {
    float result = 0.0, a = 0.5;
    p *= 2.0;
    for (int i = 0; i < ROT; ++i) {
        result += gyroid(p/a)*a;
        p.xy = m * p.xy * 0.75 + result * 0.1;
        p.z += u_time * 0.05;
        a *= 0.5;
    }
    return result;
}

// #define CURL_FNC(P) turb(P)
// #define CURL_FNC(P) snoise(vec3((P).xy, (P).z + u_time * 0.5))
#include "lygia/generative/curl.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec2 d2 = curl(vec2(st * 5.0)) * 0.5 + 0.5;
    vec3 d3 = curl(vec3(st * 5.0, u_time * 0.5)) * 0.5 + 0.5;
    
    color.rgb += mix(vec3(d2, 0.0), d3, step(0.5, st.x));

    gl_FragColor = color;
}
