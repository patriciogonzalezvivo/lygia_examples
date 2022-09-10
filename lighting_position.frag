// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;
uniform sampler2D   u_sceneDepth;
uniform sampler2D   u_sceneNormal;
uniform sampler2D   u_scenePosition;

uniform mat4        u_viewMatrix;
uniform mat4        u_projectionMatrix;
uniform mat4        u_inverseProjectionMatrix;

uniform vec3        u_camera;
uniform float       u_cameraFarClip;
uniform float       u_cameraNearClip;

uniform vec2        u_resolution;
uniform vec2        u_mouse;

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

#include "lygia/math/inverse.glsl"
#define INVERSE_CAMERA_PROJECTION_MATRIX inverse(u_projectionMatrix)
#include "lygia/sample/viewPosition.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#if defined(POSTPROCESSING)
    vec4 viewPosFromBuffer = texture2D(u_scenePosition, st);
    vec4 viewPosFromDepth = sampleViewPosition(u_sceneDepth, st, u_cameraNearClip, u_cameraFarClip);

    color.rgb = mix(viewPosFromBuffer.xyz,
                    viewPosFromDepth.xyz, 
                    step(0.5, st.x) );

#else
    #ifdef MODEL_VERTEX_COLOR
    color = v_color;
    #endif

    #if defined(FLOOR)
    #endif

#endif

    gl_FragColor = color;
}
