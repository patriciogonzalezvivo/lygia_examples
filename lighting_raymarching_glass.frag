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
#define CAMERA_POSITION         u_camera
#define RAYMARCH_MULTISAMPLE    4
#define RAYMARCH_BACKGROUND     vec3(0.0)

// #define SCENE_CUBEMAP           u_cubeMap

// #include "lygia/lighting/atmosphere.glsl"
// #define ENVMAP_FNC(N, R, M) atmosphere(normalize(N), normalize(u_light))
// #define RAYMARCH_BACKGROUND envMap(rayDirection, 0.0, 0.0).rgb
// #define RAYMARCH_AMBIENT envMap(worldNormal, 0.0, 0.0).rgb
#define RAYMARCH_SHADING_FNC pbrGlass

#define RAYMARCH_RENDER_FNC    raymarchCustomRender_glass
vec4 raymarchCustomRender_glass(
    in vec3 rayOrigin, in vec3 rayDirection, vec3 cameraForward,
    out float eyeDepth, out vec3 worldPos, out vec3 worldNormal );

#include "lygia/space/ratio.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/sdf/sphereSDF.glsl"
#include "lygia/sdf/opRepeat.glsl"

// #include "lygia/color/tonemap/reinhard.glsl"
// #include "lygia/lighting/ior.glsl"
// #include "lygia/lighting/ior/2f0.glsl"
// #include "lygia/lighting/ior/2eta.glsl"
// #include "lygia/lighting/envMap.glsl"
// #include "lygia/lighting/specular.glsl"
// #include "lygia/lighting/fresnelReflection.glsl"
// #include "lygia/lighting/reflection.glsl"
#include "lygia/lighting/pbrGlass.glsl"
#include "lygia/lighting/raymarch.glsl"

Material raymarchMap(in vec3 pos ) {
    float roughness = 0.001 + (floor(pos.x + 0.5) * 0.25) + 0.5;
    pos.x += 0.3;

    pos += 0.5;
    pos = opRepeat(pos, vec3(-2.0, 0.0, 0.0), vec3(2.0, 0.0, 0.0), 1.0);
    pos -= 0.5;

    return materialNew( vec3(1.0, 1.0, 1.0), 0.0, roughness, sphereSDF(pos, 0.3 ) );
}


vec4 raymarchCustomRender_glass(
    in vec3 rayOrigin, in vec3 rayDirection, vec3 cameraForward,
    out float eyeDepth, out vec3 worldPos, out vec3 worldNormal ) {

    Material res = raymarchCast(rayOrigin, rayDirection);
    float t = res.sdf;

    worldPos = rayOrigin + t * rayDirection;
    worldNormal = raymarchNormal( worldPos );

    vec4 color = vec4(RAYMARCH_BACKGROUND, 0.0);
    if (res.valid) {
        res.position = worldPos;
        res.normal = worldNormal;
        res.V = -rayDirection;
        color = RAYMARCH_SHADING_FNC(res);
    }

    // vec3  vie = res.V;
    // float occ = raymarchAO( res.position, res.normal );

    // vec3  ior = IOR_GLASS_RGB;
    // vec3  eta = ior2eta(ior);
    // vec3   f0 = ior2f0(ior);
    // float NoV = dot(res.normal, res.V);
    // vec3   Re = reflection(-res.V, res.normal, res.roughness);
    // float dom = raymarchSoftShadow( pos, Re, 1., 1. ) * occ;

    // #if defined(LIGHT_DIRECTION)
    // color += specular(normalize(LIGHT_DIRECTION), nor, -vie, roughness);
    // #elif defined(LIGHT_POSITION)
    // color += specular(normalize(LIGHT_POSITION - pos), nor, -vie, roughness);
    // #endif

    // vec3 refractG = refract(-vie, nor, eta.g);
    // #if !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI)
    // vec3 refractR = refract(-vie, nor, eta.r);
    // vec3 refractB = refract(-vie, nor, eta.b);
    // #endif

    // vec3 refractColor = vec3(0.0);
    // refractColor.rgb = envMap(refractG, roughness).rgb;
    // #if !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI)
    // refractColor.r = envMap(refractR, roughness).r;
    // refractColor.b = envMap(refractB, roughness).b;
    // #endif
    // refractColor = tonemapReinhard( refractColor );

    // color += tonemapReinhard( fresnelReflection(Re, f0, NoV) ) * (map.x*0.5) * dom;
    // color += refractColor;// * dom;
    
    color.rgb = raymarchFog(color.rgb, t, rayOrigin, rayDirection);

    // Eye-space depth. See https://www.shadertoy.com/view/4tByz3
    eyeDepth = t * dot(rayDirection, cameraForward);

    return color;
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
