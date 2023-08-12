#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/draw/fill.glsl"

// #define CENTER_2D vec2(0.0)
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/sdf/vesicaSDF.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/sdf/rectSDF.glsl"
#include "lygia/sdf/polySDF.glsl"
#include "lygia/sdf/hexSDF.glsl"
#include "lygia/sdf/starSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/crossSDF.glsl"
#include "lygia/sdf/raysSDF.glsl"
#include "lygia/sdf/spiralSDF.glsl"
#include "lygia/sdf/gearSDF.glsl"


void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    float cols = 4.0; 
    st *= cols;
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);

    float sdf = 0.0;
    float index = ( st_i.x + (cols-st_i.y - 1.0) * cols);
    
    if (index == 0.0)
        sdf = circleSDF( st_f );
    else if (index == 1.0)
        sdf = vesicaSDF( st_f, 0.25 );
    else if (index == 2.0)
        sdf = triSDF( st_f );
    else if (index == 3.0)
        sdf = rectSDF( st_f, vec2(1.0) );
    else if (index == 4.0)
        sdf = polySDF( st_f, 5);
    else if (index == 5.0)
        sdf = hexSDF( st_f );
    else if (index == 6.0)
        sdf = starSDF(st_f, 7);
    else if (index == 7.0)
        sdf = flowerSDF(st_f, 8);

    else if (index == 8.0)
        sdf = crossSDF(st_f, 1.0);
    else if (index == 9.0)
        sdf = gearSDF(st_f, 10.0, 10);

    
    
    else if (index == 14.0)
        sdf = raysSDF(st_f, 14);
    else if (index == 15.0)
        sdf = spiralSDF(st_f, 0.1);

    color.rgb += aastep(sdf, 0.5);
    
    gl_FragColor = color;
}
