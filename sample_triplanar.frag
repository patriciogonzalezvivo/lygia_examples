// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;
uniform vec3        u_camera;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec4        v_position;
varying vec3        v_normal;


#ifdef LIGHT_SHADOWMAP
uniform sampler2D   u_lightShadowMap;
uniform mat4        u_lightMatrix;
varying vec4        v_lightCoord;
#endif


#include "lygia/sample/untile.glsl"

// #define SAMPLETRIPLANAR_FNC(TEX, UV) sampleUntile(TEX, UV)
#include "lygia/sample/triplanar.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    color = sampleTriplanar(u_tex0, v_normal, 0.2);

    color.rgb += (dot(v_normal, normalize(u_camera - v_position.xyz)) * 0.5);

    gl_FragColor = color;
}

