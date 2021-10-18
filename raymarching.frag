#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;
uniform vec3        u_light;
uniform vec3        u_lightColor;

uniform vec2        u_resolution;

varying vec2        v_texcoord;

// SPACE
#include "lygia/space/ratio.glsl"
#include "lygia/sdf/planeSDF.glsl"
#include "lygia/sdf/sphereSDF.glsl"
#include "lygia/sdf/boxSDF.glsl"
#include "lygia/sdf/torusSDF.glsl"
#include "lygia/sdf/capsuleSDF.glsl"
#include "lygia/sdf/triPrismSDF.glsl"
#include "lygia/sdf/cylinderSDF.glsl"
#include "lygia/sdf/coneSDF.glsl"
#include "lygia/sdf/hexPrismSDF.glsl"
#include "lygia/sdf/opUnion.glsl"

#define LIGHT_POSITION  vec3(0.0, 10.0, -50.0)
#define LIGHT_COLOR     vec3(0.95, 0.65, 0.5)
#define RAYMARCH_AMBIENT ( vec3(0.7, 0.9, 1.0) )
#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) +rd.y*0.8 )

#include "lygia/lighting/raymarch.glsl"
#include "lygia/color/space/linear2gamma.glsl"

float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

vec4 raymarchMap( in vec3 pos ) {
    vec4 res = vec4(1.0);

    float check = checkBoard(pos.xz, vec2(2.0));
    res = opUnion( res, vec4( vec3( 0.5 + check * 0.5), planeSDF(pos) ) );

    res = opUnion( res, vec4( 1.0, 1.0, 1.0, sphereSDF(    pos-vec3( 0.0,0.25, 0.0), 0.25 ) ) );
    res = opUnion( res, vec4( 0.0, 1.0, 1.0, boxSDF(       pos-vec3( 1.0,0.25, 0.0), vec3(0.25) ) ) );
    res = opUnion( res, vec4( 0.3, 0.3, 1.0, torusSDF(     pos-vec3( 0.0,0.25, 1.0), vec2(0.20,0.05) ) ) );
    res = opUnion( res, vec4( 0.3, 0.1, 0.3, capsuleSDF(   pos,vec3(-1.3,0.10,-0.1), vec3(-0.8,0.50,0.2), 0.1 ) ) );
    res = opUnion( res, vec4( 0.5, 0.3, 0.4, triPrismSDF(  pos-vec3(-1.0,0.25,-1.0), vec2(0.25,0.05) ) ) );
    res = opUnion( res, vec4( 0.23, 0.2, 0.8, cylinderSDF(  pos-vec3( 1.0,0.30,-1.0), vec2(0.1,0.2) ) ) );
    res = opUnion( res, vec4( 0.7, 0.5, 0.2, coneSDF(      pos-vec3( 0.0,0.50,-1.0), vec3(0.8,0.6,0.3) ) ) );
    res = opUnion( res, vec4( 0.1, 0.5, 0.1, hexPrismSDF(  pos-vec3(-1.0,0.20, 1.0), vec2(0.25,0.05) ) ) );
        
    return res;
}

void main() {
    vec3 color = vec3(0.0);
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);

    color = raymarch(u_camera, uv).rgb;
    color = linear2gamma(color);

    gl_FragColor = vec4( color, 1.0 );
}