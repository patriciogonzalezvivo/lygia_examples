
#ifdef GL_ES
precision mediump float;
#endif

uniform mat4    u_modelViewProjectionMatrix;
uniform mat4    u_projectionMatrix;
uniform mat4    u_modelMatrix;
uniform mat4    u_viewMatrix;
uniform mat3    u_normalMatrix;

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
#endif
varying vec2    v_texcoord;

#include "lygia/math/quat.glsl"
#include "lygia/math/quat/mul.glsl"
#include "lygia/math/quat/2mat3.glsl"
#include "lygia/math/quat/2mat4.glsl"
#include "lygia/math/quat/conj.glsl"
#include "lygia/math/quat/lerp.glsl"

void main(void) {
    v_position = a_position;
    v_texcoord = a_position.xy * 0.5 + 0.5;

    QUAT Q = QUAT_IDENTITY;

    QUAT up = quat(vec3(0.0, 0.75, 1.0));
    QUAT down = quat(vec3(0.0, -0.75, 1.0));
    QUAT spin = quat(vec3(0, 1, 0), u_time);

    Q = quatLerp(up, down, sin(u_time) * 0.5 + 0.5);
    Q = quatMul(Q, spin);
    // Q = quatConj(Q);

    mat3 M = quat2mat3(Q);
    v_position.xyz = M * v_position.xyz;

#ifdef MODEL_VERTEX_NORMAL
    v_normal = M * vec4(u_modelMatrix * vec4(a_normal, 0.0) ).xyz;
#endif

#ifdef MODEL_VERTEX_COLOR
    v_color = a_color;
#endif
        
#ifdef MODEL_VERTEX_TEXCOORD
    v_texcoord = a_texcoord;
#endif
    
    gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * v_position;
}
