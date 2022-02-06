
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_buffer0;
uniform sampler2D   u_buffer1;
uniform sampler2D   u_buffer2;
uniform sampler2D   u_doubleBuffer0;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;
uniform int         u_frame;

uniform vec2        v_texcoord;

#include "lygia/math/const.glsl"
#include "lygia/math/saturate.glsl"
#include "lygia/color/space/hsv2rgb.glsl"
#include "lygia/generative/random.glsl"
#include "lygia/simulate/fluidSolver.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0),1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 st = fragCoord * pixel;
    vec2 uv = v_texcoord;
    vec2 mouse = u_mouse.xy * pixel;
    vec2 mouse_prev = texture2D(u_doubleBuffer0, pixel).xy;
    vec2 mouse_delta = (mouse - mouse_prev);
    float mouse_delta_length = length(mouse_delta);

        // Calc external force from mouse input
    vec2 extForce = vec2(0.);
    // extForce = vec2(-0.1,0.0);

    if (mouse_delta_length > 0.001)
    {
        vec2 dragDir = clamp(mouse_delta * 600.0, -10., 10.) * 2.0;
        vec2 p = st - mouse.xy;
        p *= 10.0;
        // extForce.xy += .75*.0002/(dot(p, p)+.0001) * (.5 - st);
        extForce += 0.001/(dot(p, p)) * dragDir;
    }

#if defined(BUFFER_0)
    color = fluidSolver(u_buffer2, st, pixel, extForce);

#elif defined(BUFFER_1)
    color = fluidSolver(u_buffer0, st, pixel, extForce);
    
#elif defined(BUFFER_2)
    color = fluidSolver(u_buffer1, st, pixel, extForce);

#elif defined(DOUBLE_BUFFER_0)
    
    vec2 vel = texture2D(u_buffer2, st).xy * 2.0 - 1.0;
    color = texture2D(u_doubleBuffer0, st - vel * pixel); //advection
    
    if (mouse_delta_length > 0.001)
    {
        float hue = fract( (atan(vel.y, vel.x) / TAU + 0.5)  + u_time * 0.1 );
        vec4 rgb = vec4( hsv2rgb(vec3(hue, 1., 1.)), 1.);
        float bloom = smoothstep(-0.5, 0.5, mouse_delta_length);
        color += bloom * 0.001/pow(length(st - mouse), 1.5) * rgb;
    }
    
    color = clamp(color, 0., 5.);
    color *= 0.995;
    // color = max(color - (color * 0.005), 0.);

    if (fragCoord.x < 10. && fragCoord.y < 10.)
        color.rg = mouse;

#else 
    color = texture2D(u_doubleBuffer0, st);
    color.a = 1.0;
    
#endif
    
    gl_FragColor = color;
}
