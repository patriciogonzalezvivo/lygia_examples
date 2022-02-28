

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

// Example from https://stegu.github.io/psrdnoise/3d-tutorial/3d-psrdnoise-tutorial-06.html
#include "lygia/generative/psrdnoise.glsl"
#include "lygia/lighting/pbrLittle.glsl"

void main(void) {
    vec4 color = vec4( vec3(0.0), 1.0);
    
    vec3 v = v_position.xyz * 8.0;
    vec3 p = vec3(0.0);
    vec3 g = vec3(0.0);

    float bump = psrdnoise(v, p, u_time, g);
 
    vec3 pattern = vec3(0.5+0.5*bump);
    // pattern.rb = 1.0-pattern.rb; // spruce it up
     
    // Perturb normal (Yes, this is all we need to do)
    vec3 N_ = g - dot(g, v_normal) * v_normal; // N_ orthogonal to N
    vec3 normal = v_normal - N_ * 0.15;
    normal = normalize( (u_viewMatrix * vec4(normal, 0.0)).xyz );

    // Use PBR Little
    color = pbrLittle(vec4(pattern, 1.0), normal, 0.05, 0.0);

    gl_FragColor = color;
}