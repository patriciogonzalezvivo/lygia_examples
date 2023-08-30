#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/draw/fill.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"

#include "lygia/space/sqTile.glsl"
#include "lygia/space/triTile.glsl"
#include "lygia/space/hexTile.glsl"
#include "lygia/space/mirrorTile.glsl"
#include "lygia/space/brickTile.glsl"
#include "lygia/space/windmillTile.glsl"
#include "lygia/space/checkerTile.glsl"

#include "lygia/sdf/heartSDF.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    st = ratio(st, u_resolution.xy);

    vec4 t = sqTile(st * 4.0);
    // t = triTile(st * 4.0);
    // t = hexTile(st * 4.0);
    // t = mirrorTile(st * 4.0);
    // t = mirrorXTile(st * 4.0);
    // t = mirrorYTile(st * 4.0);
    // t = windmillTile(st * 4.0);
    // t = brickTile(st, vec2(1.0, 2.0) * 5.0);

    // t = brickTile(t);
    // t = mirrorTile(t);
    // t = mirrorXTile(t);
    // t = mirrorYTile(t);
    // t = windmillTile(t);

    float sdf = heartSDF(t.xy);
    color.rg += t.xy;
    color.rgb = mix(color.rgb, vec3(checkerTile(t)), fill(sdf, 0.25));
    
    gl_FragColor = color;
}
