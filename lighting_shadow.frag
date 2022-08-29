#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;
uniform vec3        u_light;
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

#ifdef LIGHT_SHADOWMAP
uniform sampler2D   u_lightShadowMap;
uniform mat4        u_lightMatrix;
varying vec4        v_lightCoord;
#endif

#include "lygia/sample/textureShadowPCF.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

void main(void) {
    vec4 color = vec4(1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    // Vertex Color
    #ifdef MODEL_VERTEX_COLOR
    color = v_color;
    #endif

    // Floor Pattern
    #if defined(FLOOR) && defined(MODEL_VERTEX_TEXCOORD)
    color.rgb = vec3(0.5) + checkBoard(v_texcoord, vec2(8.0)) * 0.5;
    #endif

    // Diffuse shading
    #ifdef MODEL_VERTEX_NORMAL
    vec3 n = normalize(v_normal);
    vec3 l = normalize(u_light);
    vec3 v = normalize(u_camera - v_position.xyz);

    color.rgb *= (dot(n, l) + 1.0 ) * 0.5;
    #endif

    // Shadow
    #if defined(LIGHT_SHADOWMAP) && defined(LIGHT_SHADOWMAP_SIZE)
    color.rgb *= textureShadowPCF(u_lightShadowMap, vec2(LIGHT_SHADOWMAP_SIZE), v_lightCoord.xy, v_lightCoord.z - 0.005) * 0.8 + 0.2;
    #endif

    gl_FragColor = color;
}

