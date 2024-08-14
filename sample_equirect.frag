
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_doubleBuffer0;
uniform sampler2D   u_tex0;

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

uniform vec3        u_light;
uniform vec3        u_camera;
uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec4        v_position;
varying vec4        v_color;
varying vec3        v_normal;
varying vec2        v_texcoord;

// #define SAMPLEEQUIRET_ITERATIONS 24
// #define SCENE_CUBEMAP u_tex0
#define SAMPLE_CUBE_FNC(CUBEMAP, NORM, LOD) sampleEquirect(CUBEMAP, NORM, LOD)
#define LOOK_AT_RIGHT_HANDED

#include "lygia/math/const.glsl"
#include "lygia/math/mirror.glsl"
#include "lygia/math/saturate.glsl"
#include "lygia/generative/srandom.glsl"

#include "lygia/sample/equirect.glsl"
#include "lygia/space/lookAt.glsl"

#include "lygia/lighting/envMap.glsl"
#include "lygia/lighting/reflection.glsl"
#include "lygia/lighting/fresnelReflection.glsl"
#include "lygia/lighting/ior/2f0.glsl"
#include "lygia/color/tonemap.glsl"


void main (void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    mat3 ca = lookAt(-u_camera);
    vec3 dir = ca * normalize(vec3(st*2.0-1.0, 1.0));

#if defined(DOUBLE_BUFFER_0)
    color = texture2D(u_doubleBuffer0, st) * 0.9;
    
    vec3 offset = vec3(0.0);
    offset = srandom3( vec3(st, u_time * 0.1)) * 0.01;

    color += sampleEquirect(u_tex0, dir + offset, 3.0);

#elif defined(BACKGROUND) 
    vec4 backgroundBuffer = texture2D(u_doubleBuffer0, st);
    color.rgb = backgroundBuffer.rgb / backgroundBuffer.a;

#else

    float roughness = 0.1;
    float metallic = 0.9;
    vec3 ior  = vec3(0.15, 0.14, 0.13);                             // IOR (Silver)

    vec3    N       = v_normal;                                     // Normal
    vec3    V       = normalize(u_camera - v_position.xyz);         // View
    float   NoV     = dot(N, V);                                    // Normal . View
    vec3    R       = reflection(V, N, roughness);

    color.rgb = tonemap( envMap(R, roughness, metallic) );
    color.rgb += tonemap( fresnelReflection(R, ior2f0(ior), NoV) ) * metallic;
    
#endif

    gl_FragColor = color;
}
