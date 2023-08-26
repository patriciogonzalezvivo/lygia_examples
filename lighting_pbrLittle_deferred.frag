// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;            // Albedo
uniform sampler2D   u_sceneDepth;       // Depth
uniform sampler2D   u_sceneNormal;      // View Normal
uniform sampler2D   u_scenePosition;    // View Position
uniform sampler2D   u_sceneBuffer0;     // PBR properties

uniform mat4        u_projectionMatrix;
uniform mat4        u_inverseProjectionMatrix;
uniform mat4        u_inverseViewMatrix;
uniform mat3        u_normalMatrix;

uniform vec3        u_camera;
uniform float       u_cameraNearClip;
uniform float       u_cameraFarClip;

uniform vec3        u_light;
uniform vec3        u_lightColor;
uniform float       u_lightFalloff;
uniform float       u_lightIntensity;

uniform float       u_iblLuminance;

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

#ifdef LIGHT_SHADOWMAP
uniform sampler2D   u_lightShadowMap;
uniform mat4        u_lightMatrix;
#endif

uniform vec2        u_resolution;
uniform float       u_time;

varying vec4        v_position;
varying vec4        v_color;
varying vec3        v_normal;

#ifdef MODEL_VERTEX_TEXCOORD
varying vec2        v_texcoord;
#endif

#ifdef MODEL_VERTEX_TANGENT
varying vec4        v_tangent;
varying mat3        v_tangentToWorld;
#endif

// #define DIFFUSE_FNC diffuseOrenNayar
// #define DIFFUSE_FNC diffuseBurley
// #define DIFFUSE_FNC diffuseLambert
// #define SPECULAR_FNC specularGaussian
// #define SPECULAR_FNC specularBeckmann
// #define SPECULAR_FNC specularPhongRoughness
// #define SPECULAR_FNC specularBlinnPhongRoughnes 
// #define SPECULAR_FNC specularCookTorrance
// #define SPECULAR_FNC specularGGX
#define SURFACE_POSITION    vec3(0.0)
#define CAMERA_POSITION     u_camera
#define LIGHT_POSITION      u_light
#define LIGHT_COLOR         u_lightColor
// #define LIGHT_COORD         v_lightCoord
#define INVERSE_CAMERA_VIEW_MATRIX u_inverseViewMatrix
#define INVERSE_CAMERA_PROJECTION_MATRIX u_inverseProjectionMatrix

#include "lygia/math/inverse.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/sample/viewPosition.glsl"
#include "lygia/lighting/pbrLittle.glsl"
#include "lygia/lighting/material/new.glsl"
#include "lygia/lighting/ssao.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#if defined(POSTPROCESSING)

    vec4 viewPos = texture2D(u_scenePosition, st);
    vec4 worldPos = INVERSE_CAMERA_VIEW_MATRIX * viewPos;

    vec4 viewNormal = texture2D(u_sceneNormal, st);
    vec3 worldNormal = inverse(u_normalMatrix) * viewNormal.xyz;

    vec3 light_coord = (u_lightMatrix * worldPos).xyz;

    vec4 albedo = texture2D(u_scene, st);
    vec4 pbr_props = texture2D(u_sceneBuffer0, st);
    float ao = ssao(u_scenePosition, u_sceneNormal, st, 0.25);
    float shadows = shadow(LIGHT_SHADOWMAP, vec2(LIGHT_SHADOWMAP_SIZE), light_coord.xy, light_coord.z);

    Material material = materialNew();
    material.albedo = albedo;
    material.position = worldPos.xyz;
    material.normal = worldNormal;
    material.ambientOcclusion = ao;
    material.metallic = pbr_props.r;
    material.roughness = pbr_props.g;
    // material.shadow = shadows;

    color.rgb = pbrLittle(material).rgb;
    color.rgb = linear2gamma(color.rgb);
    // color.rgb = material.position;
    // color.rgb = material.normal;
    // color.rgb = material.albedo.rgb;
    // color.rgb = vec3(material.shadow);
    // color.rgb *= vec3(material.ambientOcclusion);
    // color.rgb = mix(albedo.rgb, color.rgb, viewNormal.a);

#else

    Material material = materialNew();
    
    #if defined(SCENE_BUFFER_0)
    material.roughness = 0.05; 

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.metallic = 1.0;
    material.roughness = 0.01 + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    color.r = material.metallic;
    color.g = material.roughness;
    color.b = 1.0;

    #else
    color = material.albedo;

    #endif

#endif

    gl_FragColor = color;
}
