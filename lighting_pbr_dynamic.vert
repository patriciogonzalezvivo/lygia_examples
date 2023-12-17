
#ifdef GL_ES
precision mediump float;
#endif

uniform mat4    u_modelViewProjectionMatrix;
uniform mat4    u_projectionMatrix;
uniform mat4    u_modelMatrix;
uniform mat4    u_viewMatrix;
uniform mat3    u_normalMatrix;

uniform vec3    u_light;
uniform float   u_time;
uniform float   u_area;

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
#endif
varying vec2    v_texcoord;

#ifdef MODEL_VERTEX_TANGENT
attribute vec4  a_tangent;
varying vec4    v_tangent;
varying mat3    v_tangentToWorld;
#endif

#ifdef LIGHT_SHADOWMAP
uniform mat4    u_lightMatrix;
#endif

varying mat4    v_lightMatrix;
varying vec3    v_light;
varying vec4    v_lightCoord;

#define LIGHT_ELEVATION     (sin(u_time * 0.5) * 0.4 + 0.5)

#include "lygia/math/toMat4.glsl"
#include "lygia/math/inverse.glsl"
#include "lygia/space/orthographic.glsl"
#include "lygia/space/lookAt.glsl"

void main(void) {
    v_position = a_position;
    #if defined(FLOOR)
    v_position.y += 0.05;
    #endif

    v_light = u_light;
    v_light = vec3(cos(u_time * 0.25), LIGHT_ELEVATION, 1.0);
    mat4 V = toMat4(lookAt(vec3(0.0, 0.0, 0.0), -normalize(v_light), vec3(0.0, 1.0, 0.0)));
    float area = 2.2;
    mat4 P = orthographic(  area, -area, 
                            area, -area, 
                            area * 1000., -area);

    mat4 biasMatrix = mat4( vec4(0.5, 0.0, 0.0, 0.0),
                            vec4(0.0, 0.5, 0.0, 0.0),
                            vec4(0.0, 0.0, 0.5, 0.0),
                            vec4(0.5, 0.5, 0.5, 1.0));
    
    v_lightMatrix = P * V * u_modelMatrix;


#ifdef MODEL_VERTEX_COLOR
    v_color = a_color;
#endif
    
#ifdef MODEL_VERTEX_NORMAL
    v_normal = vec4(u_modelMatrix * vec4(a_normal, 0.0) ).xyz;
#endif
    
#ifdef MODEL_VERTEX_TEXCOORD
    v_texcoord = a_texcoord;
#endif
    
#ifdef MODEL_VERTEX_TANGENT
    v_tangent = a_tangent;
    vec3 worldTangent = a_tangent.xyz;
    vec3 worldBiTangent = cross(v_normal, worldTangent);// * sign(a_tangent.w);
    v_tangentToWorld = mat3(normalize(worldTangent), normalize(worldBiTangent), normalize(v_normal));
#endif
    
    v_lightCoord = (biasMatrix * v_lightMatrix) * v_position;
    
    #if defined(SCENE_BUFFER_0)
    #if defined(FLOOR)
    gl_Position = mat4(1.0) * v_position;
    #else
    gl_Position = v_lightMatrix * v_position;
    #endif
    #else
    gl_Position = u_projectionMatrix * u_viewMatrix * v_position;
    #endif
}
