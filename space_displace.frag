
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;
uniform sampler2D   u_tex0Depth;
uniform vec2        u_tex0DepthResolution;

uniform vec3        u_camera;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#include "lygia/color/luma.glsl"
#define EDGE_SAMPLER_FNC(POS_UV) luma(texture2D(tex, clamp(POS_UV, vec2(0.001), vec2(0.999))))
#define EDGE_FNC edgePrewitt
#include "lygia/filter/edge.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/displace.glsl"

void main() {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_tex0Resolution.yx);

    // the raymarching
    vec3 rm = displace(u_tex0Depth, u_camera, uv);
    float e = 1.0-edge(u_tex0Depth, rm.xy, pixel * 5.0);

    color.rgb = texture2D(u_tex0, rm.xy).rgb;

    color.rgb *=    step(0.0, rm.x) * step(rm.x, 1.0) *
                    step(0.0, rm.y) * step(rm.y, 1.0) * 
                    step(rm.z, .9999) * 
                    e;

    gl_FragColor = color;
}
