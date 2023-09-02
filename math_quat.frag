// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;
uniform vec3        u_light;
uniform vec3        u_lightColor;

varying vec4        v_position;
varying vec4        v_color;
varying vec3        v_normal;

#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera

#define LIGHT_DIRECTION     u_light
#define LIGHT_COLOR         u_lightColor

#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/lighting/pbr.glsl"
#include "lygia/lighting/material/new.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

    Material material = materialNew();
    color = pbr(material);
    color = linear2gamma(color);

    gl_FragColor = color;
}
