// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec3        u_camera;
uniform vec3        u_light;
uniform vec3        u_lightColor;

uniform vec2        u_resolution;

#define LOOK_AT_RIGHT_HANDED
#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         vec3(0.95, 0.65, 0.5)

#define RAYMARCH_BACKGROUND vec3(0.7, 0.9, 1.0)

#define SAMPLE2DCUBE_FLIP_Y
#define SAMPLE2DCUBE_FNC(TEX, UV) sampleBicubic(TEX, UV, vec2(512.0))
// #define SAMPLE2DCUBE_FNC(TEX, UV) sampleSmooth(TEX, UV, vec2(512.0))
// #define SAMPLE2DCUBE_FNC(TEX, UV) sampleNearest(TEX, UV, vec2(512.0))

#include "lygia/math/cubic.glsl"
#include "lygia/math/quartic.glsl"
#include "lygia/math/quintic.glsl"
#include "lygia/sdf.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/sample/bicubic.glsl"
#include "lygia/sample/smooth.glsl"
#include "lygia/sample/nearest.glsl"
#include "lygia/sample/3DSdf.glsl"
#include "lygia/math/saturate.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/color/space/linear2gamma.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

Material raymarchMap( in vec3 pos ) {
    float check = 0.5 + checkBoard(pos.xz, vec2(1.0, 1.0)) * 0.5;
    Material res = materialNew(vec3(check), 0.0, 0.5, planeSDF(pos + 1.0));
    res = opUnion(res, materialNew(vec3(1.0), 0.0, 1.0, sample3DSdf(u_tex0, pos)));
    return res;
}

void main() {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_resolution);

    vec3 cam = u_camera * 0.11;
    color = raymarch(cam, vec3(0.0, 0.0, 0.0), uv).rgb;
    color = linear2gamma( color );

    gl_FragColor = vec4( color, 1.0 );
}