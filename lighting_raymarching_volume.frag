// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision highp float;
#endif

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

uniform vec3        u_camera;
uniform vec3        u_light;
uniform vec3        u_lightColor;

uniform vec2        u_resolution;

varying vec2        v_texcoord;

#include "lygia/math/saturate.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/generative/fbm.glsl"
#include "lygia/color/space/linear2gamma.glsl"

#include "lygia/sdf/boxFrameSDF.glsl"

#define LIGHT_COLOR vec3(0.5, 0.8, 0.9)
#define RAYMARCH_RENDER_FNC raymarchVolume
vec4 raymarchVolume( in vec3 rayOrigin, in vec3 rayDirection, vec3 cameraForward,
                    out float eyeDepth, out vec3 worldPos, out vec3 worldNormal);
#include "lygia/lighting/raymarch.glsl"
#include "lygia/lighting/raymarch/volume.glsl"

vec4 raymarchMap(in vec3 pos) {
    vec4 res = vec4(1.);
    vec3 p = pos.xzy;
    
    res.a = boxFrameSDF(pos, vec3(1.0), 0.1);
    res.a *= (fbm(pos * 2.0) * 0.5 + 0.5);
    res.a *= 2.0;

    return saturate(res);  
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
  
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);
    vec3 cam = u_camera * 0.11;
    cam.x = 1.0 - cam.x;

    color.rgb += raymarch(cam, vec3(0.0), uv).rgb;
    color = linear2gamma(color);

    gl_FragColor = vec4(color, 1.0);
}
