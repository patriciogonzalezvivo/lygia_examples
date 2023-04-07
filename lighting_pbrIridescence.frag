
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;

uniform mat4        u_projectionMatrix;

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
varying vec4        v_lightCoord;
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

#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define IBL_LUMINANCE       u_iblLuminance

#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         u_lightColor
#define LIGHT_FALLOFF       u_lightFalloff
#define LIGHT_INTENSITY     u_lightIntensity
#define LIGHT_COORD         v_lightCoord

#if !defined(GAMMA) && !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI) && !defined(PLATFORM_WEBGL)
#define GAMMA 2.2
#endif

#ifndef FNC_LINEAR2GAMMA
#define FNC_LINEAR2GAMMA
vec3 linear2gamma(in vec3 v) {
#ifdef GAMMA
    return pow(v, vec3(1. / GAMMA));
#else
    // assume gamma 2.0
    return sqrt(v);
#endif
}

vec4 linear2gamma(in vec4 v) {
    return vec4(linear2gamma(v.rgb), v.a);
}

float linear2gamma(in float v) {
#ifdef GAMMA
    return pow(v, 1. / GAMMA);
#else
    // assume gamma 2.0
    return sqrt(v);
#endif
}
#endif

#ifndef FNC_SATURATE
#define FNC_SATURATE
// #define saturate(x) clamp(x, 0.0, 1.0)
float saturate( float x){ return clamp(x, 0.0, 1.0); }
vec2  saturate( vec2 x ){ return clamp(x, 0.0, 1.0); }
vec3  saturate( vec3 x ){ return clamp(x, 0.0, 1.0); }
vec4  saturate( vec4 x ){ return clamp(x, 0.0, 1.0); }
#endif

#if !defined(GAMMA) && !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI) && !defined(PLATFORM_WEBGL)
#define GAMMA 2.2
#endif

#ifndef FNC_GAMMA2LINEAR
#define FNC_GAMMA2LINEAR
float gamma2linear(in float v) {
#ifdef GAMMA
    return pow(v, GAMMA);
#else
    // assume gamma 2.0
    return v * v;
#endif
}

vec3 gamma2linear(in vec3 v) {
#ifdef GAMMA
    return pow(v, vec3(GAMMA));
#else
    // assume gamma 2.0
    return v * v;
#endif
}

vec4 gamma2linear(in vec4 v) {
    return vec4(gamma2linear(v.rgb), v.a);
}
#endif

#ifndef SAMPLER_FNC

#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif

#endif

#ifndef FNC_MATERIAL_ALBEDO
#define FNC_MATERIAL_ALBEDO

#ifdef MATERIAL_BASECOLORMAP
uniform sampler2D MATERIAL_BASECOLORMAP;
#endif

#ifdef MATERIAL_ALBEDOMAP
uniform sampler2D MATERIAL_ALBEDOMAP;
#endif

vec4 materialAlbedo() {
    vec4 albedo = vec4(0.5, 0.5, 0.5, 1.0);
    
#if defined(MATERIAL_BASECOLORMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    #if defined(MATERIAL_BASECOLORMAP_OFFSET)
    uv += (MATERIAL_BASECOLORMAP_OFFSET).xy;
    #endif
    #if defined(MATERIAL_BASECOLORMAP_SCALE)
    uv *= (MATERIAL_BASECOLORMAP_SCALE).xy;
    #endif
    albedo = gamma2linear( SAMPLER_FNC(MATERIAL_BASECOLORMAP, uv) );

#elif defined(MATERIAL_ALBEDOMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    #if defined(MATERIAL_ALBEDOMAP_OFFSET)
    uv += (MATERIAL_ALBEDOMAP_OFFSET).xy;
    #endif
    #if defined(MATERIAL_ALBEDOMAP_SCALE)
    uv *= (MATERIAL_ALBEDOMAP_SCALE).xy;
    #endif
    albedo = gamma2linear( SAMPLER_FNC(MATERIAL_ALBEDOMAP, uv) );

#elif defined(MATERIAL_BASECOLOR)
    albedo = MATERIAL_BASECOLOR;

#elif defined(MATERIAL_ALBEDO)
    albedo = MATERIAL_ALBEDO;

#endif

#if defined(MODEL_VERTEX_COLOR)
    albedo *= v_color;
#endif

    return albedo;
}
#endif

#ifndef FNC_MATERIAL_SPECULAR
#define FNC_MATERIAL_SPECULAR

#ifdef MATERIAL_SPECULARMAP
uniform sampler2D MATERIAL_SPECULARMAP;
#endif

vec3 materialSpecular() {
    vec3 spec = vec3(0.04);
#if defined(MATERIAL_SPECULARMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    #if defined(MATERIAL_SPECULARMAP_OFFSET)
    uv += (MATERIAL_SPECULARMAP_OFFSET).xy;
    #endif
    #if defined(MATERIAL_SPECULARMAP_SCALE)
    uv *= (MATERIAL_SPECULARMAP_SCALE).xy;
    #endif
    spec = SAMPLER_FNC(MATERIAL_SPECULARMAP, uv).rgb;
#elif defined(MATERIAL_SPECULAR)
    spec = MATERIAL_SPECULAR;
#endif
    return spec;
}

#endif

#ifndef FNC_MATERIAL_EMISSIVE
#define FNC_MATERIAL_EMISSIVE
#ifdef MATERIAL_EMISSIVEMAP
uniform sampler2D MATERIAL_EMISSIVEMAP;
#endif
vec3 materialEmissive() {
    vec3 emission = vec3(0.0);

#if defined(MATERIAL_EMISSIVEMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    #if defined(MATERIAL_EMISSIVEMAP_OFFSET)
    uv += (MATERIAL_EMISSIVEMAP_OFFSET).xy;
    #endif
    #if defined(MATERIAL_EMISSIVEMAP_SCALE)
    uv *= (MATERIAL_EMISSIVEMAP_SCALE).xy;
    #endif
    emission = gamma2linear( SAMPLER_FNC(MATERIAL_EMISSIVEMAP, uv) ).rgb;

#elif defined(MATERIAL_EMISSIVE)
    emission = MATERIAL_EMISSIVE;
#endif

    return emission;
}

#endif

#ifndef FNC_MATERIAL_OCCLUSION
#define FNC_MATERIAL_OCCLUSION

#ifdef MATERIAL_OCCLUSIONMAP
uniform sampler2D MATERIAL_OCCLUSIONMAP;
#endif

#if defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP) && !defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP_UNIFORM)
#define MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP_UNIFORM
uniform sampler2D MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP;
#endif

float materialOcclusion() {
    float occlusion = 1.0;

#if defined(MATERIAL_OCCLUSIONMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    occlusion = SAMPLER_FNC(MATERIAL_OCCLUSIONMAP, uv).r;
#elif defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    occlusion = SAMPLER_FNC(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP, uv).r;
#endif

#if defined(MATERIAL_OCCLUSIONMAP_STRENGTH)
    occlusion *= MATERIAL_OCCLUSIONMAP_STRENGTH;
#endif

    return occlusion;
}

#endif

#ifndef FNC_MATERIAL_NORMAL
#define FNC_MATERIAL_NORMAL

#ifdef MATERIAL_NORMALMAP
uniform sampler2D MATERIAL_NORMALMAP;
#endif

#ifdef MATERIAL_BUMPMAP_NORMALMAP
uniform sampler2D MATERIAL_BUMPMAP_NORMALMAP;
#endif

vec3 materialNormal() {
    vec3 normal = vec3(0.0, 0.0, 1.0);

#ifdef MODEL_VERTEX_NORMAL
    normal = v_normal;

    #if defined(MODEL_VERTEX_TANGENT) && defined(MODEL_VERTEX_TEXCOORD) && defined(MATERIAL_NORMALMAP) 
    vec2 uv = v_texcoord.xy;
        #if defined(MATERIAL_NORMALMAP_OFFSET)
    uv += (MATERIAL_NORMALMAP_OFFSET).xy;
        #endif
        #if defined(MATERIAL_NORMALMAP_SCALE)
    uv *= (MATERIAL_NORMALMAP_SCALE).xy;
        #endif
    normal = SAMPLER_FNC(MATERIAL_NORMALMAP, uv).xyz;
    normal = v_tangentToWorld * (normal * 2.0 - 1.0);

    #elif defined(MODEL_VERTEX_TANGENT) && defined(MODEL_VERTEX_TEXCOORD) && defined(MATERIAL_BUMPMAP_NORMALMAP)
    vec2 uv = v_texcoord.xy;
        #if defined(MATERIAL_BUMPMAP_OFFSET)
    uv += (MATERIAL_BUMPMAP_OFFSET).xy;
        #endif
        #if defined(MATERIAL_BUMPMAP_SCALE)
    uv *= (MATERIAL_BUMPMAP_SCALE).xy;
        #endif
    normal = v_tangentToWorld * ( SAMPLER_FNC(MATERIAL_BUMPMAP_NORMALMAP, uv).xyz * 2.0 - 1.0) ;
    #endif
#endif

    return normal;
}
#endif

#ifndef TOMETALLIC_MIN_REFLECTANCE
#define TOMETALLIC_MIN_REFLECTANCE 0.04
#endif

#ifndef FNC_TOMETALLIC
#define FNC_TOMETALLIC

float toMetallic(vec3 diffuse, vec3 specular, float maxSpecular) {
    float perceivedDiffuse = sqrt(0.299 * diffuse.r * diffuse.r + 0.587 * diffuse.g * diffuse.g + 0.114 * diffuse.b * diffuse.b);
    float perceivedSpecular = sqrt(0.299 * specular.r * specular.r + 0.587 * specular.g * specular.g + 0.114 * specular.b * specular.b);
    if (perceivedSpecular < TOMETALLIC_MIN_REFLECTANCE) {
        return 0.0;
    }
    float a = TOMETALLIC_MIN_REFLECTANCE;
    float b = perceivedDiffuse * (1.0 - maxSpecular) / (1.0 - TOMETALLIC_MIN_REFLECTANCE) + perceivedSpecular - 2.0 * TOMETALLIC_MIN_REFLECTANCE;
    float c = TOMETALLIC_MIN_REFLECTANCE - perceivedSpecular;
    float D = max(b * b - 4.0 * a * c, 0.0);
    return saturate((-b + sqrt(D)) / (2.0 * a));
}

float toMetallic(vec3 diffuse, vec3 specular) {
    float maxSpecula = max(max(specular.r, specular.g), specular.b);
    return toMetallic(diffuse, specular, maxSpecula);
}

#endif

#ifndef FNC_MATERIAL_METALLIC
#define FNC_MATERIAL_METALLIC

#ifdef MATERIAL_METALLICMAP
uniform sampler2D MATERIAL_METALLICMAP;
#endif

#if defined(MATERIAL_ROUGHNESSMETALLICMAP) && !defined(MATERIAL_ROUGHNESSMETALLICMAP_UNIFORM)
#define MATERIAL_ROUGHNESSMETALLICMAP_UNIFORM
uniform sampler2D MATERIAL_ROUGHNESSMETALLICMAP;
#endif

#if defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP) && !defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP_UNIFORM)
#define MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP_UNIFORM
uniform sampler2D MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP;
#endif
    
float materialMetallic() {
    float metallic = 0.0;

#if defined(MATERIAL_METALLICMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    #if defined(MATERIAL_METALLICMAP_OFFSET)
    uv += (MATERIAL_METALLICMAP_OFFSET).xy;
    #endif
    #if defined(MATERIAL_METALLICMAP_SCALE)
    uv *= (MATERIAL_METALLICMAP_SCALE).xy;
    #endif
    metallic = SAMPLER_FNC(MATERIAL_METALLICMAP, uv).b;

#elif defined(MATERIAL_ROUGHNESSMETALLICMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    metallic = SAMPLER_FNC(MATERIAL_ROUGHNESSMETALLICMAP, uv).b;

#elif defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    metallic = SAMPLER_FNC(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP, uv).b;

#elif defined(MATERIAL_METALLIC)
    metallic = MATERIAL_METALLIC;

#else
    vec3 diffuse = materialAlbedo().rgb;
    vec3 specular = materialSpecular();
    metallic = toMetallic(diffuse, specular);
#endif

    return metallic;
}

#endif

#ifndef FNC_MATERIAL_ROUGHNESS
#define FNC_MATERIAL_ROUGHNESS

#ifdef MATERIAL_ROUGHNESSMAP
uniform sampler2D MATERIAL_ROUGHNESSMAP;
#endif

#if defined(MATERIAL_ROUGHNESSMETALLICMAP) && !defined(MATERIAL_ROUGHNESSMETALLICMAP_UNIFORM)
#define MATERIAL_ROUGHNESSMETALLICMAP_UNIFORM
uniform sampler2D MATERIAL_ROUGHNESSMETALLICMAP;
#endif

#if defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP) && !defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP_UNIFORM)
#define MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP_UNIFORM
uniform sampler2D MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP;
#endif

float materialRoughness() {
    float roughness = 0.05;

#if defined(MATERIAL_ROUGHNESSMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    #if defined(MATERIAL_ROUGHNESSMAP_OFFSET)
    uv += (MATERIAL_ROUGHNESSMAP_OFFSET).xy;
    #endif
    #if defined(MATERIAL_ROUGHNESSMAP_SCALE)
    uv *= (MATERIAL_ROUGHNESSMAP_SCALE).xy;
    #endif
    roughness = max(roughness, SAMPLER_FNC(MATERIAL_ROUGHNESSMAP, uv).g);

#elif defined(MATERIAL_ROUGHNESSMETALLICMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    roughness = max(roughness, SAMPLER_FNC(MATERIAL_ROUGHNESSMETALLICMAP, uv).g);

#elif defined(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP) && defined(MODEL_VERTEX_TEXCOORD)
    vec2 uv = v_texcoord.xy;
    roughness = max(roughness, SAMPLER_FNC(MATERIAL_OCCLUSIONROUGHNESSMETALLICMAP, uv).g);

#elif defined(MATERIAL_ROUGHNESS)
    roughness = MATERIAL_ROUGHNESS;

#endif

    return roughness;
}

#endif

#ifndef FNC_TOSHININESS
#define FNC_TOSHININESS

float toShininess(float roughness, float metallic) {
    float s = .95 - roughness * 0.5;
    s *= s;
    s *= s;
    return s * (80. + 160. * (1.0-metallic));
}

#endif

#ifndef FNC_MATERIAL_SHININESS
#define FNC_MATERIAL_SHININESS

float materialShininess() {
    float shininess = 15.0;

#ifdef MATERIAL_SHININESS
    shininess = MATERIAL_SHININESS;

#elif defined(MATERIAL_METALLIC) && defined(MATERIAL_ROUGHNESS)
    float roughness = materialRoughness();
    float metallic = materialMetallic();

    shininess = toShininess(roughness, metallic);
#endif
    return shininess;
}

#endif

#ifndef STR_MATERIAL
#define STR_MATERIAL
struct Material {
    vec4    albedo;
    vec3    emissive;

    vec3    position;       // world position of the surface
    vec3    normal;         // world normal of the surface

    #if defined(SCENE_BACK_SURFACE)
    vec3    normal_back;    // world normal of the back surface of the model
    #endif
    
    vec3    ior;            // Index of Refraction
    vec3    f0;             // reflectance at 0 degree

    float   roughness;
    float   metallic;
    float   ambientOcclusion;   // default 1.0
    float   shadow;             // default 1.0

// #if defined(MATERIAL_HAS_CLEAR_COAT)
    float   clearCoat;
    float   clearCoatRoughness;
    #if defined(MATERIAL_HAS_CLEAR_COAT_NORMAL)
    vec3    clearCoatNormal;    // default vec3(0.0, 0.0, 1.0);
    #endif
// #endif

#if defined(SHADING_MODEL_SUBSURFACE)
    float   thickness;          // default to 0.5
    float   subsurfacePower;    // default to 12.234
#endif

#if defined(SHADING_MODEL_CLOTH)
    vec3    sheenColor;
#endif

#if defined(MATERIAL_SUBSURFACE_COLOR)
    vec3    subsurfaceColor;    // defualt vec3(1.0)
#endif

#if defined(SHADING_MODEL_SPECULAR_GLOSSINESS)
    vec3    specularColor;
    float   glossiness;
#endif

};
#endif

#ifndef FNC_POW5
#define FNC_POW5
float pow5(in float x) {
    float x2 = x * x;
    return x2 * x2 * x;
}

vec2 pow5(in vec2 x) {
    vec2 x2 = x * x;
    return x2 * x2 * x;
}

vec3 pow5(in vec3 x) {
    vec3 x2 = x * x;
    return x2 * x2 * x;
}

vec4 pow5(in vec4 x) {
    vec4 x2 = x * x;
    return x2 * x2 * x;
}
#endif

#ifndef FNC_SCHLICK
#define FNC_SCHLICK

// Schlick 1994, "An Inexpensive BRDF Model for Physically-Based Rendering"
vec3 schlick(const vec3 f0, float f90, float VoH) {
    float f = pow5(1.0 - VoH);
    return f + f0 * (f90 - f);
}

vec3 schlick(vec3 f0, vec3 f90, float VoH) {
    return f0 + (f90 - f0) * pow5(1.0 - VoH);
}

float schlick(float f0, float f90, float VoH) {
    return f0 + (f90 - f0) * pow5(1.0 - VoH);
}

#endif

#ifndef FNC_FRESNEL
#define FNC_FRESNEL
vec3 fresnel(const vec3 f0, float NoV) {
#if defined(TARGET_MOBILE) || defined(PLATFORM_RPI)
    return schlick(f0, 1.0, NoV);
#else
    float f90 = saturate(dot(f0, vec3(50.0 * 0.33)));
    return schlick(f0, f90, NoV);
#endif
}
#endif

#ifndef FNC_POWFAST
#define FNC_POWFAST
float powFast(float a, float b) {
    return a / ((1. - b) * a + b);
}
#endif

#ifndef FNC_TONEMAPACES
#define FNC_TONEMAPACES
vec3 tonemapACES(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return saturate((x*(a*x+b))/(x*(c*x+d)+e));
}

vec4 tonemapACES(in vec4 x) {
    return vec4(tonemapACES(x.rgb), x.a);
}
#endif

#ifndef FNC_LUMINANCE
#define FNC_LUMINANCE
float luminance(in vec3 linear) { return dot(linear, vec3(0.2126, 0.7152, 0.0722)); }
float luminance(in vec4 linear) { return luminance( linear.rgb ); }
#endif

#ifndef FNC_TONEMAPDEBUG
#define FNC_TONEMAPDEBUG

#if !defined(PLATFORM_RPI) && !defined(PLATFORM_WEBGL)
vec3 tonemapDebug(const vec3 x) {
    
    // 16 debug colors + 1 duplicated at the end for easy indexing
    vec3 debugColors[17];
    debugColors[0] = vec3(0.0, 0.0, 0.0);         // black
    debugColors[1] = vec3(0.0, 0.0, 0.1647);      // darkest blue
    debugColors[2] = vec3(0.0, 0.0, 0.3647);      // darker blue
    debugColors[3] = vec3(0.0, 0.0, 0.6647);      // dark blue
    debugColors[4] = vec3(0.0, 0.0, 0.9647);      // blue
    debugColors[5] = vec3(0.0, 0.9255, 0.9255);   // cyan
    debugColors[6] = vec3(0.0, 0.5647, 0.0);      // dark green
    debugColors[7] = vec3(0.0, 0.7843, 0.0);      // green
    debugColors[8] = vec3(1.0, 1.0, 0.0);         // yellow
    debugColors[9] = vec3(0.90588, 0.75294, 0.0); // yellow-orange
    debugColors[10] = vec3(1.0, 0.5647, 0.0);      // orange
    debugColors[11] = vec3(1.0, 0.0, 0.0);         // bright red
    debugColors[12] = vec3(0.8392, 0.0, 0.0);      // red
    debugColors[13] = vec3(1.0, 0.0, 1.0);         // magenta
    debugColors[14] = vec3(0.6, 0.3333, 0.7882);   // purple
    debugColors[15] = vec3(1.0, 1.0, 1.0);         // white
    debugColors[16] = vec3(1.0, 1.0, 1.0);         // white

    // The 5th color in the array (cyan) represents middle gray (18%)
    // Every stop above or below middle gray causes a color shift
    float v = log2(luminance(x) / 0.18);
    v = clamp(v + 5.0, 0.0, 15.0);
    int index = int(v);
    return mix(debugColors[index], debugColors[index + 1], v - float(index));
}
vec4 tonemapDebug(const vec4 x) { return vec4(tonemapDebug(x.rgb), x.a); }
#endif

#endif

#ifndef FNC_TONEMAPFILMIC
#define FNC_TONEMAPFILMIC
vec3 tonemapFilmic(vec3 color) {
    color = max(vec3(0.0), color - 0.004);
    color = (color * (6.2 * color + 0.5)) / (color * (6.2 * color + 1.7) + 0.06);
    return color;
}

vec4 tonemapFilmic(const vec4 x) { return vec4( tonemapFilmic(x.rgb), x.a ); }
#endif

#ifndef FNC_TONEMAPLINEAR
#define FNC_TONEMAPLINEAR
vec3 tonemapLinear(const vec3 x) { return x; }
vec4 tonemapLinear(const vec4 x) { return x; }
#endif

#ifndef FNC_TONEMAPREINHARD
#define FNC_TONEMAPREINHARD
vec3 tonemapReinhard(const vec3 x) { return x / (1.0 + luminance(x)); }
vec4 tonemapReinhard(const vec4 x) { return vec4( tonemapReinhard(x.rgb), x.a ); }
#endif

#ifndef FNC_TONEMAPREINHARDJODIE
#define FNC_TONEMAPREINHARDJODIE
vec3 tonemapReinhardJodie(const vec3 x) { 
    float l = luminance(x);
    vec3 tc = x / (x + 1.0);
    return mix(x / (l + 1.0), tc, tc); 
}
vec4 tonemapReinhardJodie(const vec4 x) { return vec4( tonemapReinhardJodie(x.rgb), x.a ); }
#endif

#ifndef FNC_TONEMAPUNCHARTED
#define FNC_TONEMAPUNCHARTED

vec3 uncharted2Tonemap(const vec3 x) {
    const float A = 0.15;
    const float B = 0.50;
    const float C = 0.10;
    const float D = 0.20;
    const float E = 0.02;
    const float F = 0.30;
    return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

vec3 tonemapUncharted(const vec3 x) {
    const float W = 11.2;
    const float exposureBias = 2.0;
    vec3 curr = uncharted2Tonemap(exposureBias * x);
    vec3 whiteScale = 1.0 / uncharted2Tonemap(vec3(W));
    return curr * whiteScale;
}

vec4 tonemapUncharted(const vec4 x) { return vec4( tonemapUncharted(x.rgb), x.a); }
#endif

#ifndef FNC_TONEMAPUNCHARTED2
#define FNC_TONEMAPUNCHARTED2
vec3 tonemapUncharted2(vec3 color) {
    float A = 0.15; // 0.22
    float B = 0.50; // 0.30
    float C = 0.10;
    float D = 0.20;
    float E = 0.02; // 0.01
    float F = 0.30;
    float W = 11.2;
    
    vec4 x = vec4(color, W);
    x = ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;
    return x.xyz / x.w;
}

vec4 tonemapUncharted2(const vec4 x) { return vec4( tonemapUncharted2(x.rgb), x.a); }
#endif

#ifndef FNC_TONEMAPUNREAL
#define FNC_TONEMAPUNREAL
vec3 tonemapUnreal(const vec3 x) { return x / (x + 0.155) * 1.019; }
vec4 tonemapUnreal(const vec4 x) { return vec4(tonemapUnreal(x.rgb), x.a); }
#endif

#ifndef TONEMAP_FNC
#if defined(TARGET_MOBILE) || defined(PLATFORM_RPI) || defined(PLATFORM_WEBGL)
    #define TONEMAP_FNC     tonemapUnreal
#else
    // #define TONEMAP_FNC     tonemapDebug
    // #define TONEMAP_FNC     tonemapFilmic
    // #define TONEMAP_FNC     tonemapACES
    // #define TONEMAP_FNC     tonemapUncharted2
    // #define TONEMAP_FNC     tonemapUncharted
    #define TONEMAP_FNC     tonemapReinhardJodie
    // #define TONEMAP_FNC     tonemapReinhard
    // #define TONEMAP_FNC     tonemapUnreal
    // #define TONEMAP_FNC     tonemapLinear
#endif
#endif

#ifndef FNC_TONEMAP
#define FNC_TONEMAP

vec3 tonemap(const vec3 color) { return TONEMAP_FNC (color); }
vec4 tonemap(const vec4 color) { return TONEMAP_FNC (color); }

#endif

#ifndef FNC_FAKECUBE
#define FNC_FAKECUBE

vec3 fakeCube(vec3 _normal, float _shininnes) {
    vec3 rAbs = abs(_normal);
    return vec3( powFast(max(max(rAbs.x, rAbs.y), rAbs.z) + 0.005, _shininnes) );
}

vec3 fakeCube(vec3 _normal) {
    return fakeCube(_normal, materialShininess() );
}

#endif
#ifndef SPHERICALHARMONICS_BANDS
#if defined(TARGET_MOBILE) || defined(PLATFORM_RPI) || defined(PLATFORM_WEBGL)
#define SPHERICALHARMONICS_BANDS           2
#else
#define SPHERICALHARMONICS_BANDS           3
#endif
#endif

#ifndef SPHERICALHARMONICS_TONEMAP 
#define SPHERICALHARMONICS_TONEMAP
#endif

#ifndef FNC_SPHERICALHARMONICS
#define FNC_SPHERICALHARMONICS

vec3 sphericalHarmonics(const vec3 n) {
#ifdef SCENE_SH_ARRAY
    return SPHERICALHARMONICS_TONEMAP ( max(
           0.282095 * SCENE_SH_ARRAY[0]
#if SPHERICALHARMONICS_BANDS >= 2
        + -0.488603 * SCENE_SH_ARRAY[1] * (n.y)
        +  0.488603 * SCENE_SH_ARRAY[2] * (n.z)
        + -0.488603 * SCENE_SH_ARRAY[3] * (n.x)
#endif
#if SPHERICALHARMONICS_BANDS >= 3
        +  1.092548 * SCENE_SH_ARRAY[4] * (n.y * n.x)
        + -1.092548 * SCENE_SH_ARRAY[5] * (n.y * n.z)
        +  0.315392 * SCENE_SH_ARRAY[6] * (3.0 * n.z * n.z - 1.0)
        + -1.092548 * SCENE_SH_ARRAY[7] * (n.z * n.x)
        +  0.546274 * SCENE_SH_ARRAY[8] * (n.x * n.x - n.y * n.y)
#endif
        , 0.0) );
#else
    return vec3(1.0);
#endif
}

#endif

#ifndef SAMPLE_CUBE_FNC
#define SAMPLE_CUBE_FNC(CUBEMAP, NORM, LOD) textureCube(CUBEMAP, NORM, LOD)
#endif

#ifndef ENVMAP_MAX_MIP_LEVEL
#define ENVMAP_MAX_MIP_LEVEL 3.0
#endif

#ifndef FNC_ENVMAP
#define FNC_ENVMAP
vec3 envMap(vec3 _normal, float _roughness, float _metallic) {

// ENVMAP overwrites cube sampling  
#if defined(ENVMAP_FNC) 
    return ENVMAP_FNC(_normal, _roughness, _metallic);

// Cubemap sampling - spherical harmonics
#elif defined(SCENE_CUBEMAP) && defined(SCENE_SH_ARRAY) && !defined(TARGET_MOBILE)
    return mix(
        SAMPLE_CUBE_FNC( SCENE_CUBEMAP, _normal, (ENVMAP_MAX_MIP_LEVEL * _roughness) ).rgb,
        sphericalHarmonics(_normal),
        _roughness * _roughness * _roughness
    );

// Cubemap sampling
#elif defined(SCENE_CUBEMAP)
    return SAMPLE_CUBE_FNC( SCENE_CUBEMAP, _normal, (ENVMAP_MAX_MIP_LEVEL * _roughness) ).rgb;

// Default
#else
    return fakeCube(_normal, toShininess(_roughness, _metallic));

#endif
}

vec3 envMap(vec3 _normal, float _roughness) {
    return envMap(_normal, _roughness, 1.0);
}
#endif

#ifndef FNC_FRESNEL_REFLECTION
#define FNC_FRESNEL_REFLECTION

vec3 fresnelReflection(vec3 R, vec3 f0, float NoV) {
    vec3 frsnl = fresnel(f0, NoV);

    vec3 reflectColor = vec3(0.0);
    #if defined(FRESNEL_REFLECTION_FNC)
    reflection = FRESNEL_REFLECTION_FNC(R);

    #elif defined(ENVMAP_FNC) 
    reflectColor = ENVMAP_FNC(R, 0.001, 0.001);
    
    #elif defined(SCENE_CUBEMAP)
    reflectColor = SAMPLE_CUBE_FNC( SCENE_CUBEMAP, R, ENVMAP_MAX_MIP_LEVEL).rgb;

    #elif defined(SCENE_SH_ARRAY)
    reflectColor = sphericalHarmonics(R);

    #else
    reflectColor = fakeCube(R);
    #endif

    return reflectColor * frsnl;
}

vec3 fresnelReflection(vec3 R, float f0, float NoV) {
    return fresnelReflection(R, vec3(f0, f0, f0), NoV);
}

#endif

#ifndef SPECULAR_POW
#if defined(TARGET_MOBILE) || defined(PLATFORM_RPI) || defined(PLATFORM_WEBGL)
#define SPECULAR_POW(A,B) powFast(A,B)
#else
#define SPECULAR_POW(A,B) pow(A,B)
#endif
#endif

#ifndef FNC_SPECULAR_PHONG
#define FNC_SPECULAR_PHONG 

// https://github.com/glslify/glsl-specular-phong
float specularPhong(vec3 L, vec3 N, vec3 V, float shininess) {
    vec3 R = reflect(L, N); // 2.0 * dot(N, L) * N - L;
    return SPECULAR_POW(max(0.0, dot(R, -V)), shininess);
}

float specularPhongRoughness(vec3 L, vec3 N, vec3 V, float roughness) {
    return specularPhong(L, N, V, toShininess(roughness, 0.0) );
}

float specularPhongRoughness(vec3 L, vec3 N, vec3 V, float roughness, float fresnel) {
    return specularPhongRoughness(L, N, V, roughness );
}

float specularPhongRoughness(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness, float fresnel) {
    return specularPhongRoughness(L, N, V, roughness);
}

#endif

#ifndef SPECULAR_POW
#if defined(TARGET_MOBILE) || defined(PLATFORM_RPI) || defined(PLATFORM_WEBGL)
#define SPECULAR_POW(A,B) powFast(A,B)
#else
#define SPECULAR_POW(A,B) pow(A,B)
#endif
#endif

#ifndef FNC_SPECULAR_BLINNPHONG
#define FNC_SPECULAR_BLINNPHONG

// https://github.com/glslify/glsl-specular-blinn-phong
float specularBlinnPhong(vec3 L, vec3 N, vec3 V, float shininess) {
    // halfVector
    vec3 H = normalize(L + V);
    return SPECULAR_POW(max(0.0, dot(N, H)), shininess);
}

float specularBlinnPhongRoughnes(vec3 L, vec3 N, vec3 V, float roughness) {
    return specularBlinnPhong(L, N, V, toShininess(roughness, 0.0) );
}

float specularBlinnPhongRoughnes(vec3 L, vec3 N, vec3 V, float roughness, float fresnel) {
    return specularBlinnPhongRoughnes(L, N, V, roughness);
}

float specularBlinnPhongRoughnes(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness, float fresnel) {
    return specularBlinnPhongRoughnes(L, N, V, roughness);
}

#endif

#ifndef FNC_BECKMANN
#define FNC_BECKMANN
// https://github.com/glslify/glsl-specular-beckmann
float beckmann(float _NoH, float roughness) {
    float NoH = max(_NoH, 0.0001);
    float cos2Alpha = NoH * NoH;
    float tan2Alpha = (cos2Alpha - 1.0) / cos2Alpha;
    float roughness2 = roughness * roughness;
    float denom = 3.141592653589793 * roughness2 * cos2Alpha * cos2Alpha;
    return exp(tan2Alpha / roughness2) / denom;
}
#endif

#ifndef QTR_PI
#define QTR_PI 0.78539816339
#endif
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966192313216916398
#endif
#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif
#ifndef TAU
#define TAU 6.2831853071795864769252867665590
#endif
#ifndef ONE_OVER_PI
#define ONE_OVER_PI 0.31830988618
#endif
#ifndef SQRT_HALF_PI
#define SQRT_HALF_PI 1.25331413732
#endif
#ifndef PHI
#define PHI 1.618033988749894848204586834
#endif
#ifndef EPSILON
#define EPSILON 0.0000001
#endif
#ifndef GOLDEN_RATIO
#define GOLDEN_RATIO 1.6180339887
#endif
#ifndef GOLDEN_RATIO_CONJUGATE 
#define GOLDEN_RATIO_CONJUGATE 0.61803398875
#endif
#ifndef GOLDEN_ANGLE // (3.-sqrt(5.0))*PI radians
#define GOLDEN_ANGLE 2.39996323
#endif

#ifndef FNC_SATURATEMEDIUMP
#define FNC_SATURATEMEDIUMP

#ifndef MEDIUMP_FLT_MAX
#define MEDIUMP_FLT_MAX    65504.0
#endif

#if defined(TARGET_MOBILE) || defined(PLATFORM_WEBGL) || defined(PLATFORM_RPI)
#define saturateMediump(x) min(x, MEDIUMP_FLT_MAX)
#else
#define saturateMediump(x) x
#endif

#endif

#ifndef FNC_GGX
#define FNC_GGX
float GGX(float NoH, float roughness) {
    float oneMinusNoHSquared = 1.0 - NoH * NoH;
    
    float a = NoH * roughness;
    float k = roughness / (oneMinusNoHSquared + a * a);
    float d = k * k * ONE_OVER_PI;
    return saturateMediump(d);
}

float GGX(vec3 N, vec3 H, float NoH, float roughness) {
#if defined(TARGET_MOBILE)
    vec3 NxH = cross(N, H);
    float oneMinusNoHSquared = dot(NxH, NxH);
#else
    float oneMinusNoHSquared = 1.0 - NoH * NoH;
#endif

    float a = NoH * roughness;
    float k = roughness / (oneMinusNoHSquared + a * a);
    float d = k * k * ONE_OVER_PI;
    return saturateMediump(d);
}
#endif

#ifndef SPECULAR_POW
#if defined(TARGET_MOBILE) || defined(PLATFORM_RPI) || defined(PLATFORM_WEBGL)
#define SPECULAR_POW(A,B) powFast(A,B)
#else
#define SPECULAR_POW(A,B) pow(A,B)
#endif
#endif

#ifndef SPECULAR_COOKTORRANCE_DIFFUSE_FNC
#define SPECULAR_COOKTORRANCE_DIFFUSE_FNC GGX
// #define SPECULAR_COOKTORRANCE_DIFFUSE_FNC beckmann
#endif 

#ifndef FNC_SPECULAR_COOKTORRANCE
#define FNC_SPECULAR_COOKTORRANCE

// https://github.com/stackgl/glsl-specular-cook-torrance
float specularCookTorrance(vec3 _L, vec3 _N, vec3 _V, float _NoV, float _NoL, float _roughness, float _fresnel) {
    float NoV = max(_NoV, 0.0);
    float NoL = max(_NoL, 0.0);

    // Half angle vector
    vec3 H = normalize(_L + _V);

    // Geometric term
    float NoH = max(dot(_N, H), 0.0);
    float VoH = max(dot(_V, H), 0.000001);

    float x = 2.0 * NoH / VoH;
    float G = min(1.0, min(x * NoV, x * NoL));
    
    // Distribution term
    float D = SPECULAR_COOKTORRANCE_DIFFUSE_FNC(NoH, _roughness);

    // Fresnel term
    float F = SPECULAR_POW(1.0 - NoV, _fresnel);

    // Multiply terms and done
    return max(G * F * D / max(PI * NoV * NoL, 0.00001), 0.0);
}

// https://github.com/glslify/glsl-specular-cook-torrance
float specularCookTorrance(vec3 L, vec3 N, vec3 V, float roughness, float fresnel) {
    return specularCookTorrance(L, N, V, dot(N, V), dot(N, L), roughness, fresnel);
}

float specularCookTorrance(vec3 L, vec3 N, vec3 V, float roughness) {
    return specularCookTorrance(L, N, V, roughness, 0.04);
}
#endif

#ifndef FNC_SPECULAR_GAUSSIAN
#define FNC_SPECULAR_GAUSSIAN

// https://github.com/glslify/glsl-specular-gaussian
float specularGaussian(vec3 L, vec3 N, vec3 V, float roughness) {
    vec3 H = normalize(L + V);
    float theta = acos(dot(H, N));
    float w = theta / roughness;
    return exp(-w*w);
}

float specularGaussian(vec3 L, vec3 N, vec3 V, float roughness, float fresnel) {
    return specularGaussian(L, N, V, roughness);
}

float specularGaussian(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness, float fresnel) {
    return specularGaussian(L, N, V, roughness);
}

#endif

#ifndef FNC_SPECULAR_BECKMANN
#define FNC_SPECULAR_BECKMANN

float specularBeckmann(vec3 L, vec3 N, vec3 V, float roughness) {
    float NoH = dot(N, normalize(L + V));
    return beckmann(NoH, roughness);
}

float specularBeckmann(vec3 L, vec3 N, vec3 V, float roughness, float fresnel) {
    return specularBeckmann(L, N, V, roughness);
}

float specularBeckmann(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness, float fresnel) {
    return specularBeckmann(L, N, V, roughness);
}

#endif

#ifndef FNC_SMITH_GGX_CORRELATED
#define FNC_SMITH_GGX_CORRELATED

float smithGGXCorrelated(float NoV, float NoL, float roughness) {
    // Heitz 2014, "Understanding the Masking-Shadowing Function in Microfacet-Based BRDFs"
    float a2 = roughness * roughness;
    // TODO: lambdaV can be pre-computed for all the lights, it should be moved out of this function
    float lambdaV = NoL * sqrt((NoV - a2 * NoV) * NoV + a2);
    float lambdaL = NoV * sqrt((NoL - a2 * NoL) * NoL + a2);
    float v = 0.5 / (lambdaV + lambdaL);
    // a2=0 => v = 1 / 4*NoL*NoV   => min=1/4, max=+inf
    // a2=1 => v = 1 / 2*(NoL+NoV) => min=1/4, max=+inf
    // clamp to the maximum value representable in mediump
    return saturateMediump(v);
}

float smithGGXCorrelated_Fast(float NoV, float NoL, float roughness) {
    // Hammon 2017, "PBR Diffuse Lighting for GGX+Smith Microsurfaces"
    float v = 0.5 / mix(2.0 * NoL * NoV, NoL + NoV, roughness);
    return saturateMediump(v);
}
#endif

#ifndef FNC_SPECULAR_GGX
#define FNC_SPECULAR_GGX

float specularGGX(vec3 _L, vec3 _N, vec3 _V, float _NoV, float _NoL, float _roughness, float _fresnel) {
    float NoV = max(_NoV, 0.0);
    float NoL = max(_NoL, 0.0);

    vec3 H = normalize(_L + _V);
    float LoH = saturate(dot(_L, H));
    float NoH = saturate(dot(_N, H));

    // float NoV, float NoL, float roughness
    float linearRoughness =  _roughness * _roughness;
    float D = GGX(NoH, linearRoughness);
    float V = smithGGXCorrelated(_NoV, NoL,linearRoughness);
    float F = fresnel(vec3(_fresnel), LoH).r;

    return (D * V) * F;
}

float specularGGX(vec3 L, vec3 N, vec3 V, float roughness, float fresnel) {
    float NoV = max(dot(N, V), 0.0);
    float NoL = max(dot(N, L), 0.0);
    return specularGGX(L, N, V, NoV, NoL, roughness, fresnel);
}

float specularGGX(vec3 L, vec3 N, vec3 V, float roughness) {
    return specularGGX(L, N, V, roughness, 0.04);
}

#endif

#ifndef SPECULAR_FNC
#if defined(TARGET_MOBILE) || defined(PLATFORM_RPI) || defined(PLATFORM_WEBGL)
#define SPECULAR_FNC specularBlinnPhongRoughnes
#else
#define SPECULAR_FNC specularCookTorrance
#endif  
#endif

#ifndef FNC_SPECULAR
#define FNC_SPECULAR
float specular(vec3 L, vec3 N, vec3 V, float roughness) { return SPECULAR_FNC(L, N, V, roughness); }
float specular(vec3 L, vec3 N, vec3 V, float roughness, float fresnel) { return SPECULAR_FNC(L, N, V, roughness, fresnel); }
float specular(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness, float fresnel) { return SPECULAR_FNC(L, N, V, NoV, NoL, roughness, fresnel); }
#endif

#ifndef FNC_DIFFUSE_LAMBERT
#define FNC_DIFFUSE_LAMBERT
float diffuseLambert(vec3 L, vec3 N) { return max(0.0, dot(N, L)); }
float diffuseLambert(vec3 L, vec3 N, vec3 V, float roughness) { return diffuseLambert(L, N); }
float diffuseLambert(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness) { return diffuseLambert(L, N); }
#endif

#ifndef FNC_DIFFUSE_ORENNAYAR
#define FNC_DIFFUSE_ORENNAYAR

float diffuseOrenNayar(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness) {
    float LoV = dot(L, V);
    
    float s = LoV - NoL * NoV;
    float t = mix(1.0, max(NoL, NoV), step(0.0, s));

    float sigma2 = roughness * roughness;
    float A = 1.0 + sigma2 * (1.0 / (sigma2 + 0.13) + 0.5 / (sigma2 + 0.33));
    float B = 0.45 * sigma2 / (sigma2 + 0.09);

    return max(0.0, NoL) * (A + B * s / t);
}

float diffuseOrenNayar(vec3 L, vec3 N, vec3 V, float roughness) {
    float NoV = max(dot(N, V), 0.001);
    float NoL = max(dot(N, L), 0.001);
    return diffuseOrenNayar(L, N, V, NoV, NoL, roughness);
}
#endif

#ifndef FNC_DIFFUSE_BURLEY
#define FNC_DIFFUSE_BURLEY

float diffuseBurley(float NoV, float NoL, float LoH, float linearRoughness) {
    // Burley 2012, "Physically-Based Shading at Disney"
    float f90 = 0.5 + 2.0 * linearRoughness * LoH * LoH;
    float lightScatter = schlick(1.0, f90, NoL);
    float viewScatter  = schlick(1.0, f90, NoV);
    return lightScatter * viewScatter;
}

float diffuseBurley(vec3 L, vec3 N, vec3 V, float NoV, float NoL, float roughness) {
    float LoH = max(dot(L, normalize(L + V)), 0.001);
    return diffuseBurley(NoV, NoL, LoH, roughness * roughness);
}

float diffuseBurley(vec3 L, vec3 N, vec3 V, float roughness) {
    vec3 H = normalize(V + L);
    float NoV = clamp(dot(N, V), 0.001, 1.0);
    float NoL = clamp(dot(N, L), 0.001, 1.0);
    float LoH = clamp(dot(L, H), 0.001, 1.0);

    return diffuseBurley(NoV, NoL, LoH, roughness * roughness);
}
#endif

#ifndef DIFFUSE_FNC 
#define DIFFUSE_FNC diffuseLambert
#endif

#ifndef FNC_DIFFUSE
#define FNC_DIFFUSE
float diffuse(vec3 _L, vec3 _N, vec3 _V, float _roughness) { return DIFFUSE_FNC(_L, _N, _V, _roughness); }
float diffuse(vec3 _L, vec3 _N, vec3 _V, float _NoV, float _NoL, float _roughness) { return DIFFUSE_FNC(_L, _N, _V, _NoV, _NoL, _roughness); }
#endif

#ifndef FNC_LIGHT_FALLOFF
#define FNC_LIGHT_FALLOFF
float falloff(float _dist, float _lightRadius) {
    float att = clamp(1.0 - _dist * _dist / (_lightRadius * _lightRadius), 0.0, 1.0);
    att *= att;
    return att;
}
#endif


#ifndef SURFACE_POSITION
#define SURFACE_POSITION vec3(0.0, 0.0, 0.0)
#endif

#ifndef LIGHT_POSITION
#define LIGHT_POSITION  vec3(0.0, 10.0, -50.0)
#endif

#ifndef LIGHT_COLOR
#define LIGHT_COLOR    vec3(0.5, 0.5, 0.5)
#endif

#ifndef LIGHT_INTENSITY
#define LIGHT_INTENSITY 1.0
#endif

#ifndef LIGHT_FALLOFF
#define LIGHT_FALLOFF   0.0
#endif

#ifndef FNC_LIGHT_POINT
#define FNC_LIGHT_POINT

void lightPoint(vec3 _diffuseColor, vec3 _specularColor, vec3 _N, vec3 _V, float _NoV, float _roughness, float _f0, float _shadow, inout vec3 _diffuse, inout vec3 _specular) {
    vec3 toLight = LIGHT_POSITION - (SURFACE_POSITION).xyz;
    float toLightLength = length(toLight);
    vec3 s = toLight/toLightLength;

    float NoL = dot(_N, s);

    float dif = diffuse(s, _N, _V, _NoV, NoL, _roughness);// * ONE_OVER_PI;
    float spec = specular(s, _N, _V, _NoV, NoL, _roughness, _f0);

    vec3 lightContribution = LIGHT_COLOR * LIGHT_INTENSITY * _shadow;
    #ifdef LIGHT_FALLOFF
    if (LIGHT_FALLOFF > 0.0)
        lightContribution *= falloff(toLightLength, LIGHT_FALLOFF);
    #endif

    _diffuse +=  max(vec3(0.0), _diffuseColor * lightContribution * dif);
    _specular += max(vec3(0.0), _specularColor * lightContribution * spec);
}

void lightPoint(vec3 _diffuseColor, vec3 _specularColor, vec3 _N, vec3 _V, float _NoV, float _roughness, float _f0, inout vec3 _diffuse, inout vec3 _specular) {
    lightPoint(_diffuseColor, _specularColor, _N, _V,  _NoV, _roughness, _f0, 1.0, _diffuse, _specular);
}

#endif

#ifndef LIGHT_POSITION
#define LIGHT_POSITION vec3(0.0, 10.0, -50.0)
#endif

#ifndef LIGHT_COLOR
#define LIGHT_COLOR vec3(0.5)
#endif

#ifndef LIGHT_INTENSITY
#define LIGHT_INTENSITY 1.0
#endif

#ifndef FNC_LIGHT_DIRECTIONAL
#define FNC_LIGHT_DIRECTIONAL

void lightDirectional(vec3 _diffuseColor, vec3 _specularColor, vec3 _N, vec3 _V, float _NoV, float _roughness, float _f0, float _shadow, inout vec3 _diffuse, inout vec3 _specular) {
    #ifdef LIGHT_DIRECTION
    vec3    D = normalize(LIGHT_DIRECTION);
    #else 
    vec3    D = normalize(LIGHT_POSITION);
    #endif
    float NoL = dot(_N, D);
    float dif = diffuseOrenNayar(D, _N, _V, _NoV, NoL, _roughness);
    float spec = specularCookTorrance(D, _N, _V, _NoV, NoL, _roughness, _f0);
    _diffuse  += max(vec3(0.0), LIGHT_INTENSITY * (_diffuseColor * LIGHT_COLOR * dif) * _shadow);
    _specular += max(vec3(0.0), LIGHT_INTENSITY * (_specularColor * LIGHT_COLOR * spec) * _shadow);
}

#endif

#ifndef FNC_REFLECTION
#define FNC_REFLECTION

vec3 reflection(vec3 _V, vec3 _N, float _roughness) {
        // Reflect
#ifdef MATERIAL_ANISOTROPY
    vec3  anisotropicT = MATERIAL_ANISOTROPY_DIRECTION;
    vec3  anisotropicB = MATERIAL_ANISOTROPY_DIRECTION;

#ifdef MODERL_VERTEX_TANGENT
    anisotropicT = normalize(v_tangentToWorld * MATE RIAL_ANISOTROPY_DIRECTION);
    anisotropicB = normalize(cross(v_tangentToWorld[2], anisotropicT));
#endif

    vec3  anisotropyDirection = MATERIAL_ANISOTROPY >= 0.0 ? anisotropicB : anisotropicT;
    vec3  anisotropicTangent  = cross(anisotropyDirection, _V);
    vec3  anisotropicNormal   = cross(anisotropicTangent, anisotropyDirection);
    float bendFactor          = abs(MATERIAL_ANISOTROPY) * saturate(5.0 * _roughness);
    vec3  bentNormal          = normalize(mix(_N, anisotropicNormal, bendFactor));
    return reflect(-_V, bentNormal);
#else
    return reflect(-_V, _N);
#endif

}
#endif

#if !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI) && !defined(PLATFORM_WEBGL)
#define IBL_SPECULAR_OCCLUSION
#endif

#ifndef FNC_SPECULARAO
#define FNC_SPECULARAO
float specularAO(float NoV, float ao, float roughness) {
#if !defined(TARGET_MOBILE) && !defined(PLATFORM_RPI) && !defined(PLATFORM_WEBGL)
    return saturate(pow(NoV + ao, exp2(-16.0 * roughness - 1.0)) - 1.0 + ao);
#else
    return 1.0;
#endif
}
#endif

#ifndef FNC_ENVBRDFAPPROX
#define FNC_ENVBRDFAPPROX
vec3 envBRDFApprox(vec3 _specularColor, float _NoV, float _roughness) {
    vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022 );
    vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040 );
    vec4 r = _roughness * c0 + c1;
    float a004 = min( r.x * r.x, exp2( -9.28 * _NoV ) ) * r.x + r.y;
    vec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;
    return _specularColor * AB.x + AB.y;
}
#endif

#ifndef CAMERA_POSITION
#define CAMERA_POSITION vec3(0.0, 0.0, -10.0)
#endif

#ifndef LIGHT_POSITION
#define LIGHT_POSITION  vec3(0.0, 10.0, -50.0)
#endif

#ifndef LIGHT_COLOR
#define LIGHT_COLOR     vec3(0.5, 0.5, 0.5)
#endif

#ifndef IBL_LUMINANCE
#define IBL_LUMINANCE   1.0
#endif

#ifndef FNC_PBR
#define FNC_PBR

vec4 pbr(const Material _mat) {
    // Calculate Color
    vec3    diffuseColor = _mat.albedo.rgb * (vec3(1.0) - _mat.f0) * (1.0 - _mat.metallic);
    vec3    specularColor = mix(_mat.f0, _mat.albedo.rgb, _mat.metallic);

    vec3    N       = _mat.normal;                                  // Normal
    vec3    V       = normalize(CAMERA_POSITION - _mat.position);   // View
    float   NoV     = dot(N, V);                                    // Normal . View
    vec3    R       = reflection(V, N, _mat.roughness);

    // Ambient Occlusion
    // ------------------------
    float ssao = 1.0;
// #if defined(FNC_SSAO) && defined(SCENE_DEPTH) && defined(RESOLUTION) && defined(CAMERA_NEAR_CLIP) && defined(CAMERA_FAR_CLIP)
//     vec2 pixel = 1.0/RESOLUTION;
//     ssao = ssao(SCENE_DEPTH, gl_FragCoord.xy*pixel, pixel, 1.);
// #endif 
    float diffuseAO = min(_mat.ambientOcclusion, ssao);
    float specularAO = specularAO(NoV, diffuseAO, _mat.roughness);

    // Global Ilumination ( mage Based Lighting )
    // ------------------------
    vec3 E = envBRDFApprox(specularColor, NoV, _mat.roughness);

    // This is a bit of a hack to pop the metalics
    float specIntensity =   (2.0 * _mat.metallic) * 
                            saturate(-1.1 + NoV + _mat.metallic) *          // Fresnel
                            (_mat.metallic + (.95 - _mat.roughness) * 2.0); // make smaller highlights brighter
                            // (_mat.metallic + (1.0 - _mat.roughness)); // make smaller highlights brighter

    vec3 Fr = vec3(0.0, 0.0, 0.0);
    Fr = tonemap( envMap(R, _mat.roughness, _mat.metallic) ) * E * specIntensity;
    Fr += tonemap( fresnelReflection(R, _mat.f0, NoV) ) * _mat.metallic * (1.0-_mat.roughness) * 0.2;
    Fr *= specularAO;

    vec3 Fd = vec3(0.0, 0.0, 0.0);
    Fd = diffuseColor;
    #if defined(SCENE_SH_ARRAY)
    Fd *= tonemap( sphericalHarmonics(N) );
    #endif
    Fd *= diffuseAO;
    Fd *= (1.0 - E);

    // Local Ilumination
    // ------------------------
    vec3 lightDiffuse = vec3(0.0, 0.0, 0.0);
    vec3 lightSpecular = vec3(0.0, 0.0, 0.0);
    
    {
        #if defined(LIGHT_DIRECTION)
        float f0 = max(_mat.f0.r, max(_mat.f0.g, _mat.f0.b));
        lightDirectional(diffuseColor, specularColor, N, V, NoV, _mat.roughness, f0, _mat.shadow, lightDiffuse, lightSpecular);
        #elif defined(LIGHT_POSITION)
        float f0 = max(_mat.f0.r, max(_mat.f0.g, _mat.f0.b));
        lightPoint(diffuseColor, specularColor, N, V, NoV, _mat.roughness, f0, _mat.shadow, lightDiffuse, lightSpecular);
        #endif
    }
    
    // Final Sum
    // ------------------------
    vec4 color  = vec4(0.0, 0.0, 0.0, 1.0);
    // Diffuse
    color.rgb  += Fd * IBL_LUMINANCE;
    color.rgb  += lightDiffuse;     
    // Specular
    color.rgb  += Fr * IBL_LUMINANCE;
    color.rgb  += lightSpecular;    
    color.rgb  *= _mat.ambientOcclusion;
    color.rgb  += _mat.emissive;
    color.a     = _mat.albedo.a;

    return color;
}
#endif

#ifndef FNC_SAMPLESHADOW
#define FNC_SAMPLESHADOW

float sampleShadow(in sampler2D shadowMap, in vec4 _coord) {
    vec3 shadowCoord = _coord.xyz / _coord.w;
    return SAMPLER_FNC(shadowMap, shadowCoord.xy).r;
}

float sampleShadow(in sampler2D shadowMap, in vec3 _coord) {
    return sampleShadow(shadowMap, vec4(_coord, 1.0));
}

float sampleShadow(in sampler2D shadowMap, in vec2 uv, in float compare) {
    return step(compare, SAMPLER_FNC(shadowMap, uv).r );
}

float sampleShadow(in sampler2D shadowMap, in vec2 size, in vec2 uv, in float compare) {
    return sampleShadow(shadowMap, uv, compare);
}
#endif

#ifndef FNC_SAMPLESHADOWLERP
#define FNC_SAMPLESHADOWLERP
float sampleShadowLerp(sampler2D depths, vec2 size, vec2 uv, float compare) {
    vec2 texelSize = vec2(1.0)/size;
    vec2 f = fract(uv*size+0.5);
    vec2 centroidUV = floor(uv*size+0.5)/size;
    float lb = sampleShadow(depths, centroidUV+texelSize*vec2(0.0, 0.0), compare);
    float lt = sampleShadow(depths, centroidUV+texelSize*vec2(0.0, 1.0), compare);
    float rb = sampleShadow(depths, centroidUV+texelSize*vec2(1.0, 0.0), compare);
    float rt = sampleShadow(depths, centroidUV+texelSize*vec2(1.0, 1.0), compare);
    float a = mix(lb, lt, f.y);
    float b = mix(rb, rt, f.y);
    float c = mix(a, b, f.x);
    return c;
}
#endif

#ifndef SAMPLESHADOWPCF_SAMPLER_FNC
#define SAMPLESHADOWPCF_SAMPLER_FNC sampleShadowLerp
#endif

#ifndef FNC_SAMPLESHADOWPCF
#define FNC_SAMPLESHADOWPCF
float sampleShadowPCF(sampler2D depths, vec2 size, vec2 uv, float compare) {
    vec2 pixel = 1.0/size;
    float result = 0.0;
    for (float x= -2.0; x <= 2.0; x++)
        for (float y= -2.0; y <= 2.0; y++) 
            result += SAMPLESHADOWPCF_SAMPLER_FNC(depths, size, uv + vec2(x,y) * pixel, compare);
    return result/25.0;
}
#endif

#ifndef SHADOWMAP_BIAS
#define SHADOWMAP_BIAS 0.005
#endif

#ifndef SHADOW_SAMPLER_FNC
#define SHADOW_SAMPLER_FNC sampleShadowPCF
#endif

#ifndef FNC_SHADOW
#define FNC_SHADOW

float shadow(sampler2D shadoMap, vec2 size, vec2 uv, float compare) {
    #ifdef SHADOWMAP_BIAS
    compare -= SHADOWMAP_BIAS;
    #endif
    return sampleShadowPCF(shadoMap, size, uv, compare);
}

#endif 


// https://en.wikipedia.org/wiki/Refractive_index

#ifndef IOR_AIR
#define IOR_AIR 1.000293
#endif

#ifndef IOR_ICE
#define IOR_ICE 1.31
#endif

#ifndef IOR_WATER
#define IOR_WATER 1.333
#endif

#ifndef IOR_WATER_RGB
#define IOR_WATER_RGB vec3(1.337, 1.333, 1.331)
#endif

#ifndef IOR_GLYCERING
#define IOR_GLYCERING 1.473
#endif

#ifndef IOR_OIL
#define IOR_OIL 1.515
#endif

#ifndef IOR_OIL_RGB
#define IOR_OIL_RGB vec3(1.530, 1.520, 1.516)
#endif

#ifndef IOR_GLASS
#define IOR_GLASS 1.5168
#endif

#ifndef IOR_GLASS_RGB
#define IOR_GLASS_RGB vec3(1.524, 1.517, 1.515)
#endif

#ifndef IOR_GLASS_FLINT 
#define IOR_GLASS_FLINT 1.69
#endif

#ifndef IOR_GLASS_FLINT_RGB 
#define IOR_GLASS_FLINT_RGB vec3(1.639, 1.627, 1.622)
#endif

#ifndef IOR_SAPPHIRE
#define IOR_SAPPHIRE 1.77
#endif

#ifndef IOR_DIAMONG
#define IOR_DIAMONG 2.42
#endif

#ifndef SURFACE_POSITION
#define SURFACE_POSITION vec3(0.0, 0.0, 0.0)
#endif

#ifndef SHADOW_INIT
#if defined(LIGHT_SHADOWMAP) && defined(LIGHT_SHADOWMAP_SIZE) && defined(LIGHT_COORD)
#define SHADOW_INIT shadow(LIGHT_SHADOWMAP, vec2(LIGHT_SHADOWMAP_SIZE), (LIGHT_COORD).xy, (LIGHT_COORD).z)
#else
#define SHADOW_INIT 1.0
#endif
#endif


#ifndef FNC_MATERIAL_NEW
#define FNC_MATERIAL_NEW

void materialNew(out Material _mat) {
    // Surface data
    _mat.position           = (SURFACE_POSITION).xyz;
    _mat.normal             = materialNormal();

    #if defined(SCENE_BACK_SURFACE) && defined(RESOLUTION)
    vec4 back_surface       = SAMPLER_FNC(SCENE_BACK_SURFACE, gl_FragCoord.xy / RESOLUTION);
    _mat.normal_back        = back_surface.xyz;
    #if defined(SHADING_MODEL_SUBSURFACE)
    _mat.thickness          = saturate(gl_FragCoord.z - back_surface.a);
    #endif
    #else
    #if defined(SCENE_BACK_SURFACE)
    _mat.normal_back        = -_mat.normal;
    #endif
    #if defined(SHADING_MODEL_SUBSURFACE)
    _mat.thickness          = 0.5;
    #endif
    #endif

    // PBR Properties
    _mat.albedo             = materialAlbedo();
    _mat.emissive           = materialEmissive();
    _mat.roughness          = materialRoughness();
    _mat.metallic           = materialMetallic();

    _mat.ior                = vec3(IOR_GLASS_RGB);      // Index of Refraction
    _mat.f0                 = vec3(0.04, 0.04, 0.04);   // reflectance at 0 degree

    // Shade
    _mat.ambientOcclusion   = materialOcclusion();

    _mat.shadow             = SHADOW_INIT;

    // Clear Coat Model
// #if defined(MATERIAL_HAS_CLEAR_COAT)
    _mat.clearCoat          = 0.0;
    _mat.clearCoatRoughness = 0.01;
#if defined(MATERIAL_HAS_CLEAR_COAT_NORMAL)
    _mat.clearCoatNormal    = vec3(0.0, 0.0, 1.0);
#endif
// #endif

    // SubSurface Model
#if defined(SHADING_MODEL_SUBSURFACE)
    _mat.subsurfacePower    = 12.234;
#endif

#if defined(MATERIAL_SUBSURFACE_COLOR)
    #if defined(SHADING_MODEL_SUBSURFACE)
    _mat.subsurfaceColor    = vec3(1.0, 1.0, 1.0);
    #else
    _mat.subsurfaceColor    = vec3(0.0, 0.0, 0.0);
    #endif
#endif

    // Cloath Model
#if defined(SHADING_MODEL_CLOTH)
    _mat.sheenColor         = sqrt(_mat.albedo.rgb);
#endif
}

Material materialNew() {
    Material mat;
    materialNew(mat);
    return mat;
}
#endif

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    
    Material material = materialNew();
    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    material.albedo.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    color = pbr(material);
    color = linear2gamma(color);

    gl_FragColor = color;
}
