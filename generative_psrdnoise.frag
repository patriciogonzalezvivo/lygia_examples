

#ifdef GL_ES
precision mediump float;
#endif

uniform mat4        u_viewMatrix;
uniform vec3        u_camera;
uniform vec3        u_light;
uniform vec3        u_lightColor;
uniform sampler2D   u_lightShadowMap;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec4        v_position;
varying vec3        v_normal;
varying vec2        v_texcoord;

#define CAMERA_POSITION u_camera
#define LIGHT_DIRECTION u_light
#define LIGHT_COLOR     u_lightColor

// Example from https://stegu.github.io/psrdnoise/3d-tutorial/3d-psrdnoise-tutorial-06.html
#include "lygia/generative/psrdnoise.glsl"
#include "lygia/lighting/material/new.glsl"
#include "lygia/lighting/pbrLittle.glsl"

void main(void) {
    vec4 color = vec4( vec3(0.0), 1.0);
    
    vec3 v = v_position.xyz * 8.0;
    vec3 p = vec3(0.0);
    vec3 g = vec3(0.0);

    float bump = psrdnoise(v, p, u_time, g);

    Material material = materialNew();
    material.albedo = vec4(vec3(0.5+0.5*bump), 1.0);
    material.metallic = 0.01;
    material.roughness = 0.1;

    vec3 N = g - dot(g, v_normal) * v_normal; // N orthogonal to N
    material.normal = normalize(v_normal - N * 0.15);

    color = pbrLittle(material);
    color = linear2gamma(color);

    gl_FragColor = color;
}