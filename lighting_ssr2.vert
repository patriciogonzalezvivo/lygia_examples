
#ifdef GL_ES
precision mediump float;
#endif

uniform mat4    u_modelViewProjectionMatrix;
uniform mat4    u_projectionMatrix;
uniform mat4    u_modelMatrix;
uniform mat4    u_viewMatrix;
uniform mat3    u_normalMatrix;

uniform vec2    u_resolution;
uniform float   u_time;

attribute vec4  a_position;
varying vec4    v_position;

#ifdef MODEL_VERTEX_COLOR
attribute vec4  a_color;
varying vec4    v_color;
#endif

#ifdef MODEL_VERTEX_NORMAL
attribute vec3  a_normal;
varying vec3    v_normal;
#endif

#ifdef MODEL_VERTEX_TEXCOORD
attribute vec2  a_texcoord;
varying vec2    v_texcoord;
#endif

#ifdef MODEL_VERTEX_TANGENT
attribute vec4  a_tangent;
varying vec4    v_tangent;
varying mat3    v_tangentToWorld;
#endif

#ifdef LIGHT_SHADOWMAP
uniform mat4    u_lightMatrix;
varying vec4    v_lightCoord;
#endif

#include "lygia/generative/gerstnerWave.glsl"

void main(void) {
    
    v_position = a_position;
    
#ifdef MODEL_VERTEX_COLOR
    v_color = a_color;
#endif

#ifdef MODEL_VERTEX_NORMAL
    v_normal = a_normal;
#endif

#ifdef MODEL_VERTEX_TEXCOORD
    v_texcoord = a_texcoord;
#endif

#ifdef MODEL_VERTEX_TANGENT
    v_tangent = a_tangent;
#endif

    #if defined(FLOOR)
    vec3 tangent = vec3(1., 0., 0.);
    vec3 binormal = vec3(0., 0., 1.);
    float t = u_time * 0.5;

    v_position.xyz *= 0.25;
    v_position.y -= 0.35;
    v_position.xyz += gerstnerWave(v_position.xz, vec2(1.0,1.0), 0.1, 4.0, t * 0.5, tangent, binormal);
    v_position.xyz += gerstnerWave(v_position.xz, vec2(1.0,0.6), 0.15, 2.1, t, tangent, binormal);
    v_position.xyz += gerstnerWave(v_position.xz, vec2(1.0,1.3), 0.15, 0.5, t, tangent, binormal);
    v_position.xyz += gerstnerWave(v_position.xz, vec2(1.1,1.2), 0.1, 0.25, t, tangent, binormal);
    // v_position.xyz += gerstnerWave(v_position.xz, vec2(1.0,1.2), 0.1, 0.125, t, tangent, binormal);
    
    #ifdef MODEL_VERTEX_NORMAL
    v_normal = normalize(cross(binormal, tangent));
    #endif

    #ifdef MODEL_VERTEX_TANGENT
    v_tangent.xyz = tangent;
    #endif
    #endif
        
#ifdef MODEL_VERTEX_TANGENT
    vec3 worldTangent = a_tangent.xyz;
    vec3 worldBiTangent = cross(v_normal, worldTangent);// * sign(a_tangent.w);
    v_tangentToWorld = mat3(normalize(worldTangent), normalize(worldBiTangent), normalize(v_normal));
#endif
    
#ifdef LIGHT_SHADOWMAP
    v_lightCoord = u_lightMatrix * v_position;
#endif
    
    gl_Position = u_modelViewProjectionMatrix * v_position;
}
