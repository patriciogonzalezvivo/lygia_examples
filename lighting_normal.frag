// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform mat3        u_normalMatrix;

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

#include "lygia/lighting/material/normal.glsl"

void main(void) {
    
    // Floor pattern
    #if defined(FLOOR) 
    #endif

    vec3 normal = materialNormal();
    gl_FragColor = vec4(normalize(u_normalMatrix * normal), 1.0);
}
