#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/palette/fire.glsl"
#include "lygia/color/palette/hue.glsl"
#include "lygia/color/palette/water.glsl"
#include "lygia/sdf/juliaSDF.glsl"

void main() {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);

    // Julia set values from the following sources:
    // https://en.wikipedia.org/wiki/Julia_set
    // The Beaty of Fractals, Peitgen & Richter, p193
    // http://paulbourke.net/fractals/juliaset/
  
    vec2 c = vec2(-0.8, 0.156);
    // vec2 c = vec2(-0.4, 0.6);
    // vec2 c = vec2(-0.70176, -0.3842);
    //vec2 c = vec2(-0.835, -0.2321);
    // vec2 c = vec2(0.0, -0.8);
    // vec2 c = vec2(-.6995, .37999);
    // vec2 c = vec2(-0.74543, .11301);
    // vec2 c = vec2(0.285, 0.0);
    // vec2 c = vec2(0.285, 0.01);
    
    float n = juliaSDF( st, c, 1.5 );
    
    // Some different coloring optins you can try
    color.rgb = spectral_gems(cos( n*15.0 ));
    // color.rgb = spectral_geoffrey(cos( n*15.0 ));
    // color.rgb = spectral_zucconi(cos( n*15.0 ));
    color.rgb = spectral_soft(cos( n*15.0 ));
    // color.rgb = hue(cos( n*16.0 ), 0.7);
    // color.rgb = fire(cos( n*15.0 ));
    //color.rgb = water(cos( n*15.0 ));
    
    gl_FragColor = color;
}