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

#include "lygia/space/ratio.glsl"
#include "lygia/color/space/linear2gamma.glsl"

#include "lygia/sdf/planeSDF.glsl"
#include "lygia/sdf/sphereSDF.glsl"
#include "lygia/sdf/opUnion.glsl"
#include "lygia/sdf/opRepite.glsl"

#define LIGHT_COLOR vec3(0.5)
#define LIGHT_POSITION u_light
#define LIGHT_DIRECTION LIGHT_POSITION
#define RAYMARCH_BACKGROUND vec3(1.0)
#define RAYMARCH_MATERIAL_FNC raymarchPbrRender

#include "lygia/lighting/atmosphere.glsl"
// #define ENVMAP_FNC(NORM, ROUGHNESS, METALLIC) atmosphere(NORM, normalize(LIGHT_POSITION))

vec3 raymarchPbrRender(vec3 ray, vec3 pos, vec3 nor, vec3 map);
#include "lygia/lighting/raymarch.glsl"
#include "lygia/lighting/diffuse.glsl"
#include "lygia/lighting/specular.glsl"
#include "lygia/lighting/envMap.glsl"
#include "lygia/lighting/sphericalHarmonics.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

vec4 raymarchMap(in vec3 pos ) {
    vec4 res = vec4(1.);

    float check = checkBoard(pos.xz, vec2(1.0));
    res = opUnion( res, vec4( vec3(1., 0.0, 0.5 + check * 0.5), planeSDF(pos) ) );

    pos.y -= 0.3;

    float roughness = 0.0001 + (floor(pos.x + 0.5) * 0.25) + 0.5;
    float metallic = 0.0 + (floor(pos.z + 0.5) * 0.25) + 0.4;

    pos += 0.5;
    pos = opRepite(pos, vec3(-2.0, 0.0, -2.0), vec3(2.0, 0.0, 2.0), 1.0);
    pos -= 0.5;

    res = opUnion( res, vec4( vec3(roughness, metallic, 1.0), sphereSDF(pos, 0.3 ) ) );

    return res;  
}

vec3 raymarchPbrRender(vec3 ray, vec3 pos, vec3 nor, vec3 map) {
    if ( map.r + map.g + map.b <= 0.0 ) 
        return tonemapReinhard( envMap(ray, 0.).rgb );

    vec3 color = vec3(map.z);

    float roughness = map.x;
    float metallic = map.y;

    float notMetal = 1. - metallic;
    float smooth = .95 - saturate(roughness);

    vec3  ref = reflect( ray, nor );
    #if defined(LIGHT_DIRECTION)
    vec3  lig = normalize( LIGHT_DIRECTION );
    #else
    vec3  lig = normalize( LIGHT_POSITION - pos);
    #endif
    vec3  hal = normalize( lig - ray );
    vec3  vie = normalize( ray - pos);
    float dom = smoothstep( -0.1, 0.1, ref.y );
    float occ = raymarchAO( pos, nor );
    float n2v = dot(nor, -vie);

    float diffuse = diffuse(lig, nor, vie, roughness);
    float specular = specular(lig, nor, vie, roughness);

    diffuse *= raymarchSoftShadow( pos, lig, 0.02, 2.5 );
    dom = raymarchSoftShadow( pos, ref, 0.02, 2.5 );
    
    color.rgb *= diffuse;
#ifdef SCENE_SH_ARRAY
    color.rgb *= tonemapReinhard( sphericalHarmonics(nor) );
#endif

    // SPECULAR
    float specIntensity =   (0.04 * notMetal + 2.0 * metallic) * 
                            saturate(1.1 + n2v + metallic) * // Fresnel
                            (metallic + smooth * 4.0); // make smaller highlights brighter

    vec3 ambientSpecular = tonemapReinhard( envMap(ref, roughness, metallic) ) * specIntensity * occ;
    ambientSpecular += fresnel(ref, vec3(0.04), n2v) * metallic;
    ambientSpecular *= LIGHT_COLOR * 0.1 + dom;

    color.rgb   =   color.rgb * notMetal + 
                    (ambientSpecular + LIGHT_COLOR * 2.0 * specular) * 
                    (notMetal * smooth + color.rgb * metallic);

    color = linear2gamma(color);

    return color;
}


void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);
    color.rgb += raymarch(u_camera, uv).rgb;

    gl_FragColor = vec4(color, 1.0);
}
