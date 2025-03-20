
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_camera;
uniform vec2        u_resolution;
uniform float       u_time;

#define RAYMARCH_CAMERA_FOV 210.0
#define RESOLUTION          u_resolution
#define RAYMARCH_MULTISAMPLE 4
#define RAYMARCH_BACKGROUND (RAYMARCH_AMBIENT + rayDirection.y * 0.8)
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)
#define RAYMARCH_SPHERICAL
#define RAYMARCH_AOV 1

#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/color/space/linear2gamma.glsl"

// I'd like to see if this can be upstreamed too ? also with mixing of the materials likely 
Material opUnion( Material d1, Material d2, float k) {
    float h = saturate(0.5 + 0.5 * (d2.sdf-d1.sdf) / k);
    if(d1.sdf < d2.sdf) {
        d1.sdf = mix(d2.sdf, d1.sdf, h) - k * h * (1.0 - h); ;
        return d1;
    } else {
        d2.sdf = mix(d2.sdf, d1.sdf, h) - k * h * (1.0 - h);
        return d2;
    }
}


float checkBoard(vec2 uv, vec2 _scale) {
    uv = floor(fract(uv * _scale) * 2.0);
    return min(1.0, uv.x + uv.y) - (uv.x * uv.y);
}

Material raymarchMap( in vec3 pos ) {
    float check = 0.5 + checkBoard(pos.xz, vec2(1.0, 1.0)) * 0.5;
    Material res = materialNew(vec3(check), 0.0, 0.5, planeSDF(pos)); 
     
    const float smooth_factor = 0.5; 

    res = opUnion( res, materialNew( vec3(1.0, 1.0, 1.0), 1.0, 0.0, sphereSDF(   pos-vec3( 0.0, 0.60, 0.0), 0.5 ) ) , smooth_factor);
    res = opUnion( res, materialNew( vec3(0.3, 0.3, 1.0), torusSDF(    pos-vec3( 0.0, 0.5, 2.0), vec2(0.4,0.1) ) ) , smooth_factor);
    res = opUnion( res, materialNew( vec3(0.3, 0.1, 0.3), capsuleSDF(  pos,vec3(-2.3, 0.4,-0.2), vec3(-1.6,0.75,0.2), 0.2 ) ) , smooth_factor);
    res = opUnion( res, materialNew( vec3(0.5, 0.3, 0.4), triPrismSDF( pos-vec3(-2.0, 0.50,-2.0), vec2(0.5,0.1) ) ) , smooth_factor);
    res = opUnion( res, materialNew( vec3(0.2, 0.2, 0.8), cylinderSDF( pos-vec3( 2.0, 0.50,-2.0), vec2(0.2,0.4) ) ) , smooth_factor);
    res = opUnion( res, materialNew( vec3(0.7, 0.5, 0.2), coneSDF(     pos-vec3( 0.0, 0.75,-2.0), vec3(0.8,0.6,0.6) ) ), smooth_factor );
    res = opUnion( res, materialNew( vec3(0.4, 0.2, 0.9), hexPrismSDF( pos-vec3(-2.0, 0.60, 2.0), vec2(0.5,0.1) ) ) , smooth_factor);
    res = opUnion( res, materialNew( vec3(0.1, 0.3, 0.6), pyramidSDF(  pos-vec3( 2.0, 0.10, 2.0), 1.0 )  ) , smooth_factor);;

    return res;
}


void main() {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0 / u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = ratio(st, u_resolution);

    vec3 cam = vec3(cos(0.1 * u_time),  1., sin(0.1 * u_time));
    // cam += u_camera;

    color = raymarch(cam, vec3(0.0), uv * 2.0 - 1.0).rgb;
    color = linear2gamma(color);

    gl_FragColor = vec4( color, 1.0 );
}