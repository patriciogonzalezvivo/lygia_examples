// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_lightShadowMap;
uniform sampler2D   u_sceneBuffer0; // 2048x2048

uniform vec3        u_camera;
uniform float       u_cameraNearClip;
uniform float       u_cameraFarClip;

uniform vec2        u_resolution;
uniform float       u_time;

uniform vec3        u_light;
uniform vec3        u_lightColor;
uniform float       u_lightFalloff;
uniform float       u_lightIntensity;

uniform float       u_iblLuminance;

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

varying vec3        v_light;
varying vec4        v_lightCoord;

#define LIGHT_ELEVATION     (sin(u_time * 0.5) * 0.4 + 0.5)
#define LIGHT_DIRECTION     v_light
#define LIGHT_COLOR         saturate(enviroment(-v_light))
#define LIGHT_FALLOFF       u_lightFalloff
#define LIGHT_INTENSITY     u_lightIntensity
#define LIGHT_COORD         v_lightCoord

#undef SCENE_SH_ARRAY
#undef SCENE_CUBEMAP
#undef LIGHT_SHADOWMAP
#undef LIGHT_SHADOWMAP_SIZE

#define LIGHT_SHADOWMAP     u_sceneBuffer0
#define LIGHT_SHADOWMAP_SIZE 2048

#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera
#define IBL_LUMINANCE       u_iblLuminance * LIGHT_ELEVATION

#define ATMOSPHERE_GROUND  vec3(0.5)
#define ATMOSPHERE_STARS_LAYERS 3
#define ATMOSPHERE_STARS_ELEVATION (u_time * 0.006)
#define ATMOSPHERE_STARS_AZIMUTH (u_time * 0.005)
#include "lygia/lighting/atmosphere.glsl"
#define ENVMAP_FNC(N, R, M) enviroment(N) 
vec3 enviroment(vec3 normal) {
    vec3 color = vec3(0.0);

#ifdef BACKGROUND
    vec3 L = vec3(cos(u_time * 0.25), LIGHT_ELEVATION, 1.0);
#else
    vec3 L = v_light;
#endif

    color = atmosphere(normalize(normal), normalize(L));
    return color;
}

#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbr.glsl"
#include "lygia/lighting/material/new.glsl"
#include "lygia/lighting/raymarch/camera.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = st;

    #if defined(MODEL_VERTEX_TEXCOORD)
    uv = v_texcoord;
    #endif
    vec3 cam = (vec4(u_camera, 0.0)).xyz;
    mat3 ca = raymarchCamera( cam );
    vec3 ray = ca * normalize(vec3(st*2.0-1.0, 1.65));

#if defined(SCENE_BUFFER_0)
    color.rgb += gl_FragCoord.w;
    color.a = 1.0;

#elif defined(BACKGROUND)
    color.rgb = enviroment(ray);

#else

    #if defined(FLOOR)
    color.rgb = enviroment(ray);

    #if defined(LIGHT_SHADOWMAP) && defined(LIGHT_SHADOWMAP_SIZE) && defined(LIGHT_COORD)
    color.rgb *= shadow(LIGHT_SHADOWMAP, vec2(LIGHT_SHADOWMAP_SIZE), (LIGHT_COORD).xy, (LIGHT_COORD).z);
    #endif

    // color = texture2D(u_sceneBuffer0, uv);
    // color.a = 1.0;
    
    #else
    Material material = materialNew();
    color = pbr(material);
    color = linear2gamma(color);

    #endif

#endif

    gl_FragColor = color;
}
