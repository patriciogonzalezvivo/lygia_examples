// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

#ifdef GL_ES
precision highp float;
#endif

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

uniform vec3        u_camera;
uniform vec3        u_light;
uniform vec3        u_lightColor;
uniform float       u_lightIntensity;
uniform float       u_lightFalloff;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec2        v_texcoord;

#include "lygia/math/const.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/tonemap.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/rotateX.glsl"
#include "lygia/space/rotateY.glsl"
#include "lygia/space/rotateZ.glsl"
#include "lygia/generative/fbm.glsl"

#include "lygia/sdf/boxFrameSDF.glsl"

#define LIGHT_COLOR vec3(1.0, 0.7, 0.9)
#define RAYMARCH_RENDER_FNC(RO, RD) raymarchVolume(RO, RD)
vec4 raymarchVolume( in vec3 ro, in vec3 rd );
#include "lygia/lighting/raymarch.glsl"
#undef LIGHT_POSITION
#include "lygia/lighting/raymarch/volume.glsl"

vec4 raymarchMap(in vec3 pos) {
    vec4 res = vec4(1.);
    vec3 p = pos.xzy;
    
    p = rotateZ(p, u_time);

    res.a = boxFrameSDF(p, vec3(1.0), 0.01);
    res.a *= (fbm(p * 2.) * 0.5 + 0.5);

    return res;  
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
  
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);
    color.rgb += raymarch(u_camera, uv).rgb;

    gl_FragColor = vec4(color, 1.0);
}
