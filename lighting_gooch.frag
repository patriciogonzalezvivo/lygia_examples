#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;

uniform vec3        u_light;
uniform vec3        u_lightColor;

#ifdef LIGHT_SHADOWMAP
uniform sampler2D   u_lightShadowMap;
uniform mat4        u_lightMatrix;
varying vec4        v_lightCoord;
#endif

uniform vec2        u_resolution;

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
varying vec4        v_tangent;

// #define DIFFUSE_FNC diffuseOrenNayar
// #define DIFFUSE_FNC diffuseBurley
// #define DIFFUSE_FNC diffuseLambert
// #define SPECULAR_FNC specularGaussian
// #define SPECULAR_FNC specularBeckmann
// #define SPECULAR_FNC specularPhongRoughness
// #define SPECULAR_FNC specularBlinnPhongRoughnes 
// #define SPECULAR_FNC specularCookTorrance

#define LIGHT_COORD  v_lightCoord
#define GOOCH_SPECULAR u_lightColor
#include "lygia/lighting/gooch.glsl" 

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 albedo = materialAlbedo();
    float roughness = 0.2 + 0.8 * step(0.5, st.x);

    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    albedo.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif
    
    gl_FragColor = gooch(albedo, materialNormal(), (u_light - v_position.xyz), (u_camera - v_position.xyz), roughness);
}
