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

uniform vec3        u_camera;
uniform float       u_cameraFarClip;
uniform float       u_cameraNearClip;

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

#ifdef MODEL_VERTEX_TANGENT
varying vec4        v_tangent;
varying mat3        v_tangentToWorld;
#endif

#include "lygia/space/viewPosition.glsl"
#include "lygia/space/perspectiveDepth2viewZ.glsl"


void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#if defined(POSTPROCESSING)
    vec3 pos = texture2D(u_scenePosition, st).xyz;
    float depth = texture2D(u_sceneDepth, st).r;
    float viewZ = perspectiveDepth2viewZ( depth, u_cameraNearClip, u_cameraFarClip);
    vec3 viewPos = viewPosition(st, depth, viewZ);

    color.rgb = mix(pos,
                    viewPos, 
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
