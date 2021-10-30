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

#define LIGHT_POSITION vec3(-1.0, 1., -1.0)
#define RAYMARCH_BACKGROUND vec3(1.0)
#define RAYMARCH_MATERIAL_FNC raymarchGlassRender

#include "lygia/math/const.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/tonemap.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/sdf/sphereSDF.glsl"
#include "lygia/sdf/opRepite.glsl"

vec3 raymarchGlassRender(vec3 ray, vec3 pos, vec3 nor, vec3 map);
#include "lygia/lighting/raymarch.glsl"
#include "lygia/lighting/envMap.glsl"

float fresnel(vec3 V, vec3 N, float R0) {
    float cosAngle = 1.0-max(dot(V, N), 0.0);
    float result = cosAngle * cosAngle;
    result = result * result;
    result = result * cosAngle;
    result = clamp(result * (1.0 - R0) + R0, 0.0, 1.0);
    return result;
}

vec4 raymarchMap(in vec3 pos ) {
    vec4 res = vec4(1.);

    float roughness = 0.001 + (floor(pos.x + 0.5) * 0.25) + 0.5;
    pos.x += 0.3;

    pos += 0.5;
    pos = opRepite(pos, vec3(-2.0, 0.0, 0.0), vec3(2.0, 0.0, 0.0), 1.0);
    pos -= 0.5;

    res = vec4( vec3(roughness, 0.0, 1.0), sphereSDF(pos, 0.3 ) );

    return res;  
}

vec3 raymarchGlassRender(vec3 ray, vec3 pos, vec3 nor, vec3 map) {
    if ( map.r + map.g + map.b <= 0.0 ) 
        return tonemapReinhard( envMap(ray, 0.).rgb );

    vec3 color = vec3(0.0);
    vec3 Kd = vec3(1.0);

    float roughness = map.x;

    vec3  lig = normalize( LIGHT_POSITION );
    vec3  ref = reflect( ray, nor );
    vec3  vie = normalize( ray - pos);
    float occ = raymarchAO( pos, nor );
    float dom = raymarchSoftShadow( pos, ref, 0.02, 2.5 ) * occ;

    const float etaR = 0.64;
    const float etaG = 0.65;
    const float etaB = 0.66;
    const float fresnelPower = 6.0;
    const float f = ((1.0-etaG)*(1.0-etaG)) / ((1.0+etaG)*(1.0+etaG));
    float ratio = f + (1.0 - f) * pow((1.0 - dot(-vie, nor)), fresnelPower);

    vec3 Id = Kd * max(dot(nor, lig), 0.0);
    color = color + Id * 0.25;

    vec3 Is = vec3(pow(max(dot(ref, -vie),0.0), 128.0));
    color = color + Is * dom;

    float fr = fresnel(-vie, nor, 0.2);
    
    vec3 Ir = fr * envMap(ref, roughness).rgb;
    color = color + Ir * dom;

    vec3 refractR = refract(vie, nor, etaR);
    vec3 refractG = refract(vie, nor, etaG);
    vec3 refractB = refract(vie, nor, etaB);

    vec3 refractColor = vec3(0.0);
    refractColor.r = envMap(refractR, roughness).r;
    refractColor.g = envMap(refractG, roughness).g;
    refractColor.b = envMap(refractB, roughness).b;

    vec3 It = (1.0-fr) * refractColor;
    color = color + It;

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
