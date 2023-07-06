#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_camera;
uniform samplerCube u_cubeMap;
uniform vec3 u_SH[9];
uniform vec3 u_light;
uniform vec3 u_lightColor;
uniform float u_time;

varying vec2 v_texcoord;

// Defines
#define LIGHT_DIRECTION             u_light
#define RESOLUTION                  u_resolution
#define LIGHT_COLOR               vec3(.9294,.9294,.9294)

#define RAYMARCH_SAMPLES            256
#define RAYMARCH_MULTISAMPLE        4

/*
    Uncomment Defines below to see more options results
*/
// #define RAYMARCH_GLASS_WAVELENGTH
// #define RAYMARCH_GLASS_EDGE_SHARPNESS .07
// #define RAYMARCH_GLASS_CHROMATIC_ABBERATION .052
// #define RAYMARCH_GLASS_ENABLE_FRESNEL
// #define RAYMARCH_GLASS_DENSITY .1
// #define RAYMARCH_GLASS_FRESNEL_STRENGTH 1.5
// #define RAYMARCH_GLASS_COLOR vec3 (1., 0., 0.)
#define RAYMARCH_MATERIAL_FNC       raymarchGlassRender
vec3 raymarchGlassRender(vec3 ray,vec3 pos,vec3 nor,vec3 map);

/*
    Uncomment Defines & functions below to see custom chromatic abberation
*/
// #define RAYMARCH_GLASS_MAP_FNC myOwnChromaticAbberation
// void myOwnChromaticAbberation(inout vec3 res, in vec3 rdIn, in vec3 rdOut, in vec3 pEnter, in vec3 pExit, in vec3 nEnter, in vec3 nExit, in float ior, in float roughness);

/*
    COMMON IMPORT
*/
#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"
#include "lygia/color/space/linear2gamma.glsl"

/*
    RAYMARCH IMPORTS
*/
#include "lygia/lighting/raymarch.glsl"
#include "lygia/lighting/ior.glsl"
#include "../lygia-glass-march/lighting/raymarch/glass.glsl"

void myOwnChromaticAbberation(inout vec3 res,in vec3 rdIn,in vec3 rdOut,in vec3 pEnter,in vec3 pExit,in vec3 nEnter,in vec3 nExit,in float ior,in float roughness){
    rdOut = refract(rdIn, nExit, ior + RAYMARCH_GLASS_CHROMATIC_ABBERATION);

    if(dot(rdOut, rdOut) == 0.)
        rdOut = reflect(rdIn, nExit);

    res.r = envMap(rdOut, roughness).r;

    // Green
    rdOut = refract(rdIn, nExit, ior);

    if(dot(rdOut, rdOut) == 0.)
        rdOut = reflect(rdIn, nExit);

    res.g = envMap(rdOut, roughness).g;

    // Blue
    rdOut = refract(rdIn, nExit, ior - RAYMARCH_GLASS_CHROMATIC_ABBERATION);

    if(dot(rdOut, rdOut) == 0.)
        rdOut = reflect(rdIn, nExit);

    res.b = envMap(rdOut, roughness).b;
}

vec4 raymarchMap(in vec3 pos) {
    vec4 res = vec4(vec3(1.), 1.);

    float roughness = 1.;
    vec3 logoColor = vec3(roughness, 1., 1.);

    pos += 1.5;
    pos = opRepeat(pos, vec3(-1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0), 3.);
    pos -= 1.5;

    res = opUnion(
        res,
        vec4(
            logoColor,
            // icosahedronSDF(pos - vec3(0., 0. ,0.), 2.)
            cubeSDF(pos - vec3(0., 0. ,0.), 1.)
        )
    );

    return res;
}

vec3 raymarchGlassRender(vec3 ray, vec3 pos, vec3 nor, vec3 map) {
    if ( map.r + map.g + map.b <= 0.0 ) 
        return tonemapReinhard( envMap(ray, 0.).rgb );

    float roughness = 0.;

    vec3 color = vec3(0.0);

    vec3 glass = raymarchGlass(ray, pos, IOR_GLASS, roughness);

    color += glass;

    return color;
}

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    uv = ratio(uv, u_resolution);

    vec4 marchRay = raymarch(u_camera, uv);

    color.rgb += marchRay.rgb;

    float t = marchRay.RAYMARCH_MAP_DISTANCE;

    if(t > RAYMARCH_MAX_DIST)
        // color.rgb = vec3(0.); // Background

    color = linear2gamma(color);
    
    gl_FragColor = color;
}
