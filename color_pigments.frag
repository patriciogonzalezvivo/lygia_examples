
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#include "lygia/color/palette/pigments.glsl"
#include "lygia/color/palette/ridgway.glsl"
#include "lygia/color/palette/wada.glsl"
#include "lygia/color/palette/windsor_oil.glsl"
#include "lygia/color/palette/windsor_acrylic.glsl"
#include "lygia/color/palette/windsor_gouache.glsl"
#include "lygia/color/palette/rembrandt_oil.glsl"
#include "lygia/color/palette/liquitex_acrylic.glsl"
#include "lygia/color/palette/golden_acrylic.glsl"
#include "lygia/color/palette/gamblin_oil.glsl"

#include "lygia/draw/stroke.glsl"

vec3 get_color(vec3 palette[8], int index) {
    return palette[index];
}

vec3 none_color(vec2 st) {
    return 1.0- vec3(stroke((st.x + st.y)*0.5, 0.5, 0.025) + stroke((st.x - st.y), 0.0, 0.05));
} 

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    st.y = 1.0 - st.y;
    st *= vec2(8.0, 8.0);
    vec2 st_i = floor(st);
    vec2 st_f = fract(st);

    vec3 pigments[8];
    pigments[0] = TITANIUM_WHITE;
    pigments[1] = CADMIUM_YELLOW;
    pigments[2] = YELLOW_OCHRE;
    pigments[3] = CADMIUM_ORANGE;
    pigments[4] = CADMIUM_RED;
    pigments[5] = COBALT_BLUE;
    pigments[6] = BURNT_SIENNA;
    pigments[7] = IVORY_BLACK;

    vec3 windsor_oil[8];
    windsor_oil[0] = WINDSOR_OIL_TITANIUM_WHITE;
    windsor_oil[1] = WINDSOR_OIL_CADMIUM_YELLOW;
    windsor_oil[2] = WINDSOR_OIL_YELLOW_OCHRE;
    windsor_oil[3] = WINDSOR_OIL_CADMIUM_ORANGE;
    windsor_oil[4] = WINDSOR_OIL_CADMIUM_RED;
    windsor_oil[5] = WINDSOR_OIL_COBALT_BLUE;
    windsor_oil[6] = WINDSOR_OIL_BURNT_SIENNA;
    windsor_oil[7] = WINDSOR_OIL_IVORY_BLACK;

    vec3 windsor_acrylic[8];
    windsor_acrylic[0] = WINDSOR_ACRYLIC_TITANIUM_WHITE;
    windsor_acrylic[1] = WINDSOR_ACRYLIC_CADMIUM_YELLOW;
    windsor_acrylic[2] = WINDSOR_ACRYLIC_YELLOW_OCHRE;
    windsor_acrylic[3] = WINDSOR_ACRYLIC_CADMIUM_ORANGE;
    windsor_acrylic[4] = WINDSOR_ACRYLIC_CADMIUM_RED;
    windsor_acrylic[5] = WINDSOR_ACRYLIC_COBALT_BLUE;
    windsor_acrylic[6] = WINDSOR_ACRYLIC_BURNT_SIENNA;
    windsor_acrylic[7] = WINDSOR_ACRYLIC_IVORY_BLACK;

    vec3 windsor_gouache[8];
    windsor_gouache[0] = none_color(st_f);
    windsor_gouache[1] = WINDSOR_GOUACHE_CADMIUM_YELLOW;
    windsor_gouache[2] = WINDSOR_GOUACHE_YELLOW_OCHRE;
    windsor_gouache[3] = WINDSOR_GOUACHE_CADMIUM_ORANGE;
    windsor_gouache[4] = WINDSOR_GOUACHE_CADMIUM_RED;
    windsor_gouache[5] = WINDSOR_GOUACHE_COBALT_BLUE;
    windsor_gouache[6] = WINDSOR_GOUACHE_BURNT_SIENNA;
    windsor_gouache[7] = WINDSOR_GOUACHE_IVORY_BLACK;

    vec3 rembrandt_oil[8];
    rembrandt_oil[0] = REMBRANDT_OIL_TITANIUM_WHITE;
    rembrandt_oil[1] = REMBRANDT_OIL_CADMIUM_YELLOW;
    rembrandt_oil[2] = REMBRANDT_OIL_YELLOW_OCHRE;
    rembrandt_oil[3] = REMBRANDT_OIL_CADMIUM_ORANGE;
    rembrandt_oil[4] = REMBRANDT_OIL_CADMIUM_RED;
    rembrandt_oil[5] = REMBRANDT_OIL_COBALT_BLUE;
    rembrandt_oil[6] = REMBRANDT_OIL_BURNT_SIENNA;
    rembrandt_oil[7] = REMBRANDT_OIL_IVORY_BLACK;

    vec3 gamblin_oil[8];
    gamblin_oil[0] = GAMBLIN_OIL_TITANIUM_WHITE;
    gamblin_oil[1] = GAMBLIN_OIL_CADMIUM_YELLOW;
    gamblin_oil[2] = GAMBLIN_OIL_YELLOW_OCHRE;
    gamblin_oil[3] = GAMBLIN_OIL_CADMIUM_ORANGE;
    gamblin_oil[4] = GAMBLIN_OIL_CADMIUM_RED;
    gamblin_oil[5] = GAMBLIN_OIL_COBALT_BLUE;
    gamblin_oil[6] = GAMBLIN_OIL_BURNT_SIENNA;
    gamblin_oil[7] = GAMBLIN_OIL_IVORY_BLACK;

    vec3 liquitex_acrylic[8];
    liquitex_acrylic[0] = LIQUITEX_ACRYLIC_TITANIUM_WHITE;
    liquitex_acrylic[1] = LIQUITEX_ACRYLIC_CADMIUM_YELLOW;
    liquitex_acrylic[2] = none_color(st_f);
    liquitex_acrylic[3] = LIQUITEX_ACRYLIC_CADMIUM_ORANGE;
    liquitex_acrylic[4] = LIQUITEX_ACRYLIC_CADMIUM_RED;
    liquitex_acrylic[5] = LIQUITEX_ACRYLIC_COBALT_BLUE;
    liquitex_acrylic[6] = LIQUITEX_ACRYLIC_BURNT_SIENNA;
    liquitex_acrylic[7] = LIQUITEX_ACRYLIC_IVORY_BLACK;

    vec3 golden_acrylic[8];
    golden_acrylic[0] = GOLDEN_ACRYLIC_TITANIUM_WHITE;
    golden_acrylic[1] = GOLDEN_ACRYLIC_CADMIUM_YELLOW;
    golden_acrylic[2] = GOLDEN_ACRYLIC_YELLOW_OCHRE;
    golden_acrylic[3] = GOLDEN_ACRYLIC_CADMIUM_ORANGE;
    golden_acrylic[4] = GOLDEN_ACRYLIC_CADMIUM_RED;
    golden_acrylic[5] = GOLDEN_ACRYLIC_COBALT_BLUE;
    golden_acrylic[6] = GOLDEN_ACRYLIC_BURNT_SIENNA;
    golden_acrylic[7] = none_color(st_f);

    

    int brand = int(st_i.x);
    int index = int(st_i.y);

    if (brand == 0)
        color.rgb = get_color(pigments, index);

    else if (brand == 1)
        color.rgb = get_color(windsor_oil, index);
    else if (brand == 2)
        color.rgb = get_color(rembrandt_oil, index);
    else if (brand == 3)
        color.rgb = get_color(gamblin_oil, index);
        
    else if (brand == 4)
        color.rgb = get_color(windsor_acrylic, index);
    else if (brand == 5)
        color.rgb = get_color(golden_acrylic, index);
    else if (brand == 6)
        color.rgb = get_color(liquitex_acrylic, index);
    else if (brand == 7)
        color.rgb = get_color(windsor_gouache, index);
    
    gl_FragColor = color;
}
