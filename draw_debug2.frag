#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_scene;

uniform mat4        u_viewMatrix;
uniform mat4        u_modelMatrix;
uniform mat4        u_projectionMatrix;

uniform vec3        u_camera;
uniform vec3        u_light;

uniform samplerCube u_cubeMap;
uniform vec3        u_SH[9];

#ifdef LIGHT_SHADOWMAP
uniform sampler2D   u_lightShadowMap;
uniform mat4        u_lightMatrix;
varying vec4        v_lightCoord;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec4        v_position;
varying vec4        v_color;
varying vec3        v_normal;

#ifdef MODEL_VERTEX_TEXCOORD
varying vec2        v_texcoord;
#endif

#define SURFACE_POSITION    v_position
#define CAMERA_POSITION     u_camera

#define LIGHT_DIRECTION     u_light
#define LIGHT_COORD         v_lightCoord

#define DIGITS_SIZE vec2(.015)
#define PIXEL_SIZE vec2(0.005)
#define PIXEL_KERNEL_SIZE 14

#include "lygia/lighting/material/new.glsl"
#include "lygia/lighting/pbrLittle.glsl"

#include "lygia/space/ratio.glsl"
#include "lygia/draw/matrix.glsl"

#include "lygia/draw/colorPicker.glsl"
#include "lygia/draw/point.glsl"
#include "lygia/draw/axis.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_resolution);
    vec2 mouse = u_mouse * pixel;
    
    #if defined(POSTPROCESSING)

    color = texture2D(u_scene, st);

    vec4 debug = vec4(0.0);
    // debug += colorPicker(u_scene, mouse, u_resolution, uv - ratio(mouse, u_resolution));

    mat4 M = u_projectionMatrix * u_viewMatrix;

    vec3 c = vec3(0.0);
    vec3 r = vec3(1.0, 0.0, 0.0);
    vec3 g = vec3(0.0, 1.0, 0.0);
    vec3 b = vec3(0.0, 0.0, 1.0);

    debug += axis(uv, M, c, max(pixel.x, pixel.y));
    debug += point(uv, M, r);
    debug += point(uv, M, g);
    debug += point(uv, M, b);

    color = mix(color, debug, debug.a);

    #else

    // Draw the scene
    Material material = materialNew();
    color = pbrLittle(material);
    color = linear2gamma(color);

    #endif

    gl_FragColor = color;
}
