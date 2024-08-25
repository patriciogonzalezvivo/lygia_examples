// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision highp float;
#endif

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

uniform vec3        u_camera;
uniform vec3        u_light;

uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;


#define RESOLUTION              u_resolution
#define CAMERA_POSITION         u_camera
#define LIGHT_COLOR             vec3(1.0)
#define LIGHT_DIRECTION         u_light
#define LOOK_AT_RIGHT_HANDED

#define RAYMARCH_MULTISAMPLE    4

// #define SCENE_CUBEMAP           u_cubeMap
// #include "lygia/lighting/atmosphere.glsl"
// #define ENVMAP_FNC(N, R, M) atmosphere(normalize(N), normalize(u_light))
#define RAYMARCH_BACKGROUND envMap(rayDirection, 0.0, 0.0).rgb
#define RAYMARCH_AMBIENT envMap(worldNormal, 0.0, 0.0).rgb
#define RAYMARCH_SHADING_FNC pbr
#define SHADING_MODEL_IRIDESCENCE

#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"
#include "lygia/lighting/envMap.glsl"
#include "lygia/lighting/raymarch/softShadow.glsl"
#include "lygia/lighting/pbr.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/generative/fbm.glsl"
#include "lygia/color/space/linear2gamma.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

Material raymarchMap( in vec3 pos ) {
    float check = 0.5 + checkBoard(pos.xz, vec2(1.0, 1.0)) * 0.5;
    Material res = materialNew(vec3(check), 0.0, 0.5, planeSDF(pos));

    float roughness = 0.0001 + (floor(pos.x + 0.5) * 0.25) + 0.5;
    float metallic = 0.0 + (floor(pos.z + 0.5) * 0.25) + 0.4;
    pos = opRepeat(pos + vec3(0.5, 0.2, 0.5), vec3(-2.0, 0.0, -2.0), vec3(2.0, 0.0, 2.0), 1.0) - 0.5;
    
    Material pearl = materialNew( vec3(0.5), roughness, metallic, sphereSDF(pos, 0.3 ) );
    float n = fbm(pos * 0.25) * 0.5 + 0.5;
    pearl.ior = vec3(IOR_GLASS);
    pearl.thickness = mix(300.0, 1000.0, n);

    res = opUnion( res, pearl );
    return res;  
}

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);
    vec3 cam = u_camera * 0.11;
    color.rgb += raymarch(cam, vec3(0.0), uv).rgb;
    color = linear2gamma(color);

    gl_FragColor = color;
}
