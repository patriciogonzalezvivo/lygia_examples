// Copyright Patricio Gonzalez Vivo, 2021 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;
uniform vec3        u_light;
uniform vec3        u_lightColor;

uniform vec2        u_resolution;

varying vec2        v_texcoord;

// SPACE
#define LIGHT_DIRECTION     u_light
#define RESOLUTION          u_resolution
#define LIGHT_COLOR         vec3(0.95, 0.65, 0.5)

// #define RAYMARCH_SAMPLES 100
#define RAYMARCH_MULTISAMPLE 4
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)
#define RAYMARCH_BACKGROUND (RAYMARCH_AMBIENT + rayDirection.y * 0.8)

#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/color/space/linear2gamma.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

Material raymarchMap( in vec3 pos ) {
    float check = 0.5 + checkBoard(pos.xz, vec2(1.0, 1.0)) * 0.5;
    Material res = materialNew(vec3(check), 0.0, 0.5, planeSDF(pos));

    res = opUnion( res, materialNew( vec3(1.0, 1.0, 1.0), 1.0, 0.0, sphereSDF(   pos-vec3( 0.0, 0.60, 0.0), 0.5 ) ) );
    res = opUnion( res, materialNew( vec3(0.0, 1.0, 1.0), boxSDF(      pos-vec3( 2.0, 0.5, 0.0), vec3(0.4, 0.4, 0.4) ) ) );
    res = opUnion( res, materialNew( vec3(0.3, 0.3, 1.0), torusSDF(    pos-vec3( 0.0, 0.5, 2.0), vec2(0.4,0.1) ) ) );
    res = opUnion( res, materialNew( vec3(0.3, 0.1, 0.3), capsuleSDF(  pos,vec3(-2.3, 0.4,-0.2), vec3(-1.6,0.75,0.2), 0.2 ) ) );
    res = opUnion( res, materialNew( vec3(0.5, 0.3, 0.4), triPrismSDF( pos-vec3(-2.0, 0.50,-2.0), vec2(0.5,0.1) ) ) );
    res = opUnion( res, materialNew( vec3(0.2, 0.2, 0.8), cylinderSDF( pos-vec3( 2.0, 0.50,-2.0), vec2(0.2,0.4) ) ) );
    res = opUnion( res, materialNew( vec3(0.7, 0.5, 0.2), coneSDF(     pos-vec3( 0.0, 0.75,-2.0), vec3(0.8,0.6,0.6) ) ) );
    res = opUnion( res, materialNew( vec3(0.4, 0.2, 0.9), hexPrismSDF( pos-vec3(-2.0, 0.60, 2.0), vec2(0.5,0.1) ) ) );
    res = opUnion( res, materialNew( vec3(0.1, 0.3, 0.6), pyramidSDF(  pos-vec3( 2.0, 0.10, 2.0), 1.0 ) ) );;

    return res;
}

void main() {
    vec3 color = vec3(0.0);
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);

    vec3 cam = u_camera * 0.11;
    cam.x = 1.0 - cam.x;

    color = raymarch(cam, vec3(0.0), uv).rgb;
    color = linear2gamma(color);

    gl_FragColor = vec4( color, 1.0 );
}