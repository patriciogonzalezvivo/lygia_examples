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


// #define SCENE_CUBEMAP           u_cubeMap
// #define SCENE_SH_ARRAY          u_SH

#define LIGHT_DIRECTION         u_light
#define RESOLUTION              u_resolution
#define RAYMARCH_SAMPLES        100
#define RAYMARCH_MULTISAMPLE    4
#define RAYMARCH_BACKGROUND     vec3(1.0)
#define RAYMARCH_MATERIAL_FNC   raymarchGlassRender
vec4 raymarchGlassRender(vec3 ray, vec3 pos, vec3 nor, vec3 map);

#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/tonemap/reinhard.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/sdf/sphereSDF.glsl"
#include "lygia/sdf/opRepeat.glsl"
#include "lygia/lighting/ior.glsl"
#include "lygia/lighting/ior/2f0.glsl"
#include "lygia/lighting/ior/2eta.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/lighting/envMap.glsl"
#include "lygia/lighting/specular.glsl"
#include "lygia/lighting/fresnelReflection.glsl"
#include "lygia/lighting/reflection.glsl"

vec4 raymarchMap(in vec3 pos ) {
    vec4 res = vec4(1.);

    float roughness = 0.001 + (floor(pos.x + 0.5) * 0.25) + 0.5;
    pos.x += 0.3;

    pos += 0.5;
    pos = opRepeat(pos, vec3(-2.0, 0.0, 0.0), vec3(2.0, 0.0, 0.0), 1.0);
    pos -= 0.5;

    res = vec4( vec3(roughness, 0.0, 1.0), sphereSDF(pos, 0.3 ) );

    return res;  
}

vec4 raymarchGlassRender(vec3 ray, vec3 pos, vec3 nor, vec3 map) {
    if ( map.r + map.g + map.b <= 0.0 ) 
        return vec4( tonemapReinhard( envMap(ray, 0.).rgb ), 1.0);

    float roughness = 0.05 + map.x * 0.3;

    vec3  vie = normalize( ray );
    float occ = raymarchAO( pos, nor );

    vec3  ior = IOR_GLASS_RGB;
    vec3  eta = ior2eta(ior);
    vec3   f0 = ior2f0(ior);
    float NoV = dot(nor, vie);
    vec3   Re = reflection(-vie, nor, roughness);
    float dom = raymarchSoftShadow( pos, Re, 1., 1. ) * occ;

    vec3 color = vec3(0.0);
    #if defined(LIGHT_DIRECTION)
    color += specular(normalize(LIGHT_DIRECTION), nor, -vie, roughness);
    #elif defined(LIGHT_POSITION)
    color += specular(normalize(LIGHT_POSITION - pos), nor, -vie, roughness);
    #endif

    vec3 refractG = refract(-vie, nor, eta.g);
    #if !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI)
    vec3 refractR = refract(-vie, nor, eta.r);
    vec3 refractB = refract(-vie, nor, eta.b);
    #endif

    vec3 refractColor = vec3(0.0);
    refractColor.rgb = envMap(refractG, roughness).rgb;
    #if !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI)
    refractColor.r = envMap(refractR, roughness).r;
    refractColor.b = envMap(refractB, roughness).b;
    #endif
    refractColor = tonemapReinhard( refractColor );

    color += tonemapReinhard( fresnelReflection(Re, f0, NoV) ) * (map.x*0.5) * dom;
    color += refractColor;// * dom;

    return vec4(color, 1.0);
}


void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
  
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);
    vec3 cam = u_camera * 0.11;
    cam.x = 1.0 - cam.x;
    color.rgb += raymarch(cam, uv).rgb;
    color = linear2gamma(color);

    gl_FragColor = color;
}
