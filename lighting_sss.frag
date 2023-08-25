// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;

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

#ifdef MODEL_VERTEX_COLOR
varying vec4        v_color;
#endif

#ifdef MODEL_VERTEX_NORMAL
varying vec3        v_normal;
#endif

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

#define LIGHT_POSITION      u_light
#define LIGHT_COLOR         u_lightColor
#define LIGHT_FALLOFF       u_lightFalloff
#define LIGHT_INTENSITY     u_lightIntensity
#define LIGHT_COORD         v_lightCoord

#include "lygia/math/saturate.glsl"
#include "lygia/lighting/pbr.glsl"
#include "lygia/lighting/material/new.glsl"
#include "lygia/color/space/linear2gamma.glsl"

vec3 sss(vec3 skin, in vec3 p, in vec3 n, in vec3 ro, in vec3 rd) {
    vec3 ldir1 = normalize(ro - p);
    float latt1 = pow( length(ro - p) * 0.055, 50.0);
    vec3 diff1 = u_lightColor * (max(dot(n,ldir1),0.) ) / latt1;

    vec3 col = diff1;
    float trans1 =  pow( clamp( dot(-rd, -ldir1 + n), 0., 1.), 1.) + 1.;
    col = skin * (trans1/latt1) * 10.0;
    return col;
}

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    Material material = materialNew();
    material.albedo = vec4(0.1, 0.03, 0.02, 1.0);
    material.roughness = 0.2;
    color = pbr(material);


    // // Shadow
    vec3 shadowCoord = v_lightCoord.xyz / v_lightCoord.w;

    // Calcualte the ray from the camera
    vec3 light_ro = u_light;
    float light_rdist = texture2D(u_lightShadowMap, shadowCoord.xy).r;
    vec3 light_rd = (u_lightMatrix * vec4(0.0, 0.0, light_rdist, 0.0)).xyz;
    vec3 light_rc = light_ro + light_rd;
    color.rgb += sss(vec3(0.2, 0.03, 0.02) * 2., v_position.xyz, v_normal, light_rc, light_rd);

    color.rgb = linear2gamma(color.rgb);
    gl_FragColor = color;
}

