
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;

uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution;

uniform sampler2D   u_tex1;
uniform vec2        u_tex1Resolution;

varying vec2        v_texcoord;

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;
    float screen_aspect = u_resolution.x/u_resolution.y;

    float tex0_aspect = u_tex0Resolution.x/u_tex0Resolution.y;
    vec4 tex0 = texture2D(u_tex0, st);
    color += tex0.rgb * step(0.5, st.x);

    float tex1_aspect = u_tex1Resolution.x/u_tex1Resolution.y;
    vec4 tex1 = texture2D(u_tex1, st);
    color += tex1.rgb * step(st.x, 0.5);

    gl_FragColor = vec4(color,1.0);
}
