// Author: Patricio Gonzalez Vivo
// Title: PixelSpirit

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

#ifdef GL_ES
precision highp float;
#endif

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

uniform vec3        u_camera;
uniform vec2        u_mouse;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#define SCENE_CUBEMAP u_cubeMap

#define AA 2
// #define LIGHT_COLOR vec3(0.9, 0.9, 0.8)
#define LIGHT_POSITION vec3(-1.0, 1., -1.0)
#define RAYMARCH_BACKGROUND vec3(1.0)
#define RAYMARCH_MATERIAL_FNC raymarchPbrRender
// #define IBL_LUMINANCE u_iblLuminance

// #define DIFFUSE_FNC diffuseOrenNayar
// #define DIFFUSE_FNC diffuseBurley
// #define DIFFUSE_FNC diffuseLambert
// #define SPECULAR_FNC specularGaussian
// #define SPECULAR_FNC specularBeckmann
// #define SPECULAR_FNC specularCookTorrance
// #define SPECULAR_FNC specularPhongRoughness
// #define SPECULAR_FNC specularBlinnPhongRoughnes 

#include "lygia/math/const.glsl"
#include "lygia/color/space/gamma2linear.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/tonemap.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/sdf/planeSDF.glsl"
#include "lygia/sdf/sphereSDF.glsl"
#include "lygia/sdf/opUnion.glsl"
#include "lygia/sdf/opRepite.glsl"

vec3 raymarchPbrRender(vec3 rd, vec3 pos, vec3 nor, vec3 map);
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

    float roughness = 0.001 + (floor(pos.x + 0.5) * 0.25) + 0.5;
    float metallic = 0.001 + (floor(pos.z + 0.5) * 0.25) + 0.45;

    pos += 0.5;
    pos = opRepite(pos, vec3(-2.0, 0.0, -2.0), vec3(2.0, 0.0, 2.0), 1.0);
    pos -= 0.5;

    res = opUnion( res, vec4( vec3(roughness, metallic, 1.0), sphereSDF(pos, 0.3 ) ) );

    return res;  
}

vec3 raymarchPbrRender(vec3 rd, vec3 pos, vec3 nor, vec3 map) {
    if ( map.r + map.g + map.b <= 0.0 ) 
        return ( envMap(rd, 0.).rgb );

    vec3 color = vec3(map.z);

    float roughness = map.x;
    float metallic = map.y;

    vec3 ref = reflect( rd, nor );
    float notMetal = 1. - metallic;
    float smooth = .95 - saturate(roughness);

    vec3  lig = normalize( LIGHT_POSITION );
    vec3  hal = normalize( lig - rd );
    vec3  vie = normalize( rd - pos);
    float occ = raymarchAO( pos, nor );
    float n2v = dot(nor, -vie);

    float diffuse = diffuse(lig, nor, vie, roughness);
    float specular = specular(lig, nor, vie, roughness);

    diffuse *= raymarchSoftShadow( pos, lig, 0.02, 2.5 ) * occ;
    specular *= raymarchSoftShadow( pos, ref, 0.02, 2.5 )* occ;
    
    color.rgb *= diffuse;
#ifdef SCENE_SH_ARRAY
    color.rgb *= tonemapReinhard( sphericalHarmonics(nor) );
#endif

    // SPECULAR
    float specIntensity =   (0.04 * notMetal + 2.0 * metallic) * 
                            saturate(1.1 + n2v + metallic) * // Fresnel
                            (metallic + smooth * 4.0); // make smaller highlights brighter

    vec3 ambientSpecular = tonemapReinhard( envMap(ref, roughness, metallic) ) * specIntensity;
    ambientSpecular += fresnel(ref, vec3(0.04), n2v) * metallic;

    color.rgb   = color.rgb * notMetal + ( ambientSpecular 
                    + LIGHT_COLOR * 2.0 * specular
                    ) * (notMetal * smooth + color.rgb * metallic);

    color = linear2gamma(color);
    
    // color = map;

    return color;
}


void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
  
#if AA > 1
    for( int m = 0; m<AA; m++ )
    for( int n = 0; n<AA; n++ ) 
    {
        // pixel coordinates
    vec2 o = vec2(float(m),float(n)) / float(AA) - 0.5;
    vec2 st = (v_texcoord * u_resolution + o) * pixel;
#else    
    vec2 st = v_texcoord;
#endif
    vec2 uv = ratio(st, u_resolution);
    color.rgb += raymarch(u_camera, uv).rgb;

#if AA > 1
    }
    color /= float(AA*AA);
#endif

    gl_FragColor = vec4(color, 1.0);
}
