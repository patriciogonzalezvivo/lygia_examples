#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/color/luma.glsl"
#include "lygia/color/palette/wada/triad.glsl"
#include "lygia/color/palette/wada/value.glsl"
#include "lygia/draw/digits.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float X = floor(st.x * 3.0);
    float x = fract(st.x * 3.0);
    float y = st.y;

    // Iterate through all the triads
    int i = int( mod(u_time, float(WADA_TRIAD_TOTAL)) );
    ivec3 triad = wadaTriad( i );

    // Each X band is a different component of the triad
    int id = 0;
    if (X == 0.0) {
        id = triad.x;
    } else if (X == 1.0) {
        id = triad.y;
    } else if (X == 2.0) {
        id = triad.z;
    }

    // Pick the color
    color = wada(id);

    // Add some Reference numbers
    vec3 bkg = vec3(step(luma(color), 0.1));
    color = mix(color, bkg, 
                digits(vec2(x, y) * vec2(.2,.5) - 0.01, float(id) + 1., 0.));

    color = mix(color, bkg, 
                digits(st - vec2(0.01, 0.96), float(i) + 1., 0.));

    gl_FragColor = vec4(color, 1.0);
}
