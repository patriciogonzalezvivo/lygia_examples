
# GLSL Viewer Examples
                
This are GLSL examples of how to use [LYGIA Shader Library](https://github.com/patriciogonzalezvivo/lygia). You can try them using:

* [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)
* [glsl-canvas VS Code pluging](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)


## How to start?

Clone this repository recursivelly

```bash
git clone --recursive https://github.com/patriciogonzalezvivo/lygia_examples.git
```

## math_functions
```bash
glslViewer math_functions.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/math_functions.jpg)

![benchmark](benchmarks/math_functions_tracks.jpg)

## math_gaussian
```bash
glslViewer math_gaussian.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/math_gaussian.jpg)

![benchmark](benchmarks/math_gaussian_tracks.jpg)

## math_quat
```bash
glslViewer math_quat.frag assets/suzanne.obj math_quat.vert --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/math_quat.jpg)

![benchmark](benchmarks/math_quat_tracks.jpg)

## animation_easing
```bash
glslViewer animation_easing.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/animation_easing.jpg)

![benchmark](benchmarks/animation_easing_tracks.jpg)

## animation_sprite
```bash
glslViewer animation_sprite.frag assets/sprite_megaman.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/animation_sprite.jpg)

![benchmark](benchmarks/animation_sprite_tracks.jpg)

## color_brightnessContrast
```bash
glslViewer color_brightnessContrast.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_brightnessContrast.jpg)

![benchmark](benchmarks/color_brightnessContrast_tracks.jpg)

## color_brightnessContrastMatrix
```bash
glslViewer color_brightnessContrastMatrix.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_brightnessContrastMatrix.jpg)

![benchmark](benchmarks/color_brightnessContrastMatrix_tracks.jpg)

## color_mix
```bash
glslViewer color_mix.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_mix.jpg)

![benchmark](benchmarks/color_mix_tracks.jpg)

## color_lut
```bash
glslViewer color_lut.frag assets/danny.png assets/square_01.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_lut.jpg)

![benchmark](benchmarks/color_lut_tracks.jpg)

## color_dither
```bash
glslViewer color_dither.frag -u_noise assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_dither.jpg)

![benchmark](benchmarks/color_dither_tracks.jpg)

## sample_dither
```bash
glslViewer sample_dither.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_dither.jpg)

![benchmark](benchmarks/sample_dither_tracks.jpg)

## color_iridescence_map
```bash
glslViewer color_iridescence_map.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_iridescence_map.jpg)

![benchmark](benchmarks/color_iridescence_map_tracks.jpg)

## color_wavelength
```bash
glslViewer color_wavelength.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wavelength.jpg)

![benchmark](benchmarks/color_wavelength_tracks.jpg)

## color_wada
```bash
glslViewer color_wada.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada.jpg)

![benchmark](benchmarks/color_wada_tracks.jpg)

## color_wada_dyads
```bash
glslViewer color_wada_dyads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada_dyads.jpg)

![benchmark](benchmarks/color_wada_dyads_tracks.jpg)

## color_wada_triads
```bash
glslViewer color_wada_triads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada_triads.jpg)

![benchmark](benchmarks/color_wada_triads_tracks.jpg)

## color_wada_tetrads
```bash
glslViewer color_wada_tetrads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada_tetrads.jpg)

![benchmark](benchmarks/color_wada_tetrads_tracks.jpg)

## color_pigments
```bash
glslViewer color_pigments.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_pigments.jpg)

![benchmark](benchmarks/color_pigments_tracks.jpg)

## color_palette_lerp
```bash
glslViewer color_palette_lerp.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_palette_lerp.jpg)

![benchmark](benchmarks/color_palette_lerp_tracks.jpg)

## color_ryb
```bash
glslViewer color_ryb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_ryb.jpg)

![benchmark](benchmarks/color_ryb_tracks.jpg)

## color_zorn
```bash
glslViewer color_zorn.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_zorn.jpg)

![benchmark](benchmarks/color_zorn_tracks.jpg)

## color_mix_ryb
```bash
glslViewer color_mix_ryb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_mix_ryb.jpg)

![benchmark](benchmarks/color_mix_ryb_tracks.jpg)

## distort_pincushion
```bash
glslViewer distort_pincushion.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/distort_pincushion.jpg)

![benchmark](benchmarks/distort_pincushion_tracks.jpg)

## draw_digits
```bash
glslViewer draw_digits.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_digits.jpg)

![benchmark](benchmarks/draw_digits_tracks.jpg)

## draw_aa
```bash
glslViewer draw_aa.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_aa.jpg)

![benchmark](benchmarks/draw_aa_tracks.jpg)

## draw_shapes
```bash
glslViewer draw_shapes.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_shapes.jpg)

![benchmark](benchmarks/draw_shapes_tracks.jpg)

## draw_supershape
```bash
glslViewer draw_supershape.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_supershape.jpg)

![benchmark](benchmarks/draw_supershape_tracks.jpg)

## draw_tiles
```bash
glslViewer draw_tiles.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_tiles.jpg)

![benchmark](benchmarks/draw_tiles_tracks.jpg)

## draw_koch
```bash
glslViewer draw_koch.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_koch.jpg)

![benchmark](benchmarks/draw_koch_tracks.jpg)

## draw_julia
```bash
glslViewer draw_julia.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_julia.jpg)

![benchmark](benchmarks/draw_julia_tracks.jpg)

## draw_mandelbulb
```bash
glslViewer draw_mandelbulb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_mandelbulb.jpg)

![benchmark](benchmarks/draw_mandelbulb_tracks.jpg)

## draw_colorChecker
```bash
glslViewer draw_colorChecker.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_colorChecker.jpg)

![benchmark](benchmarks/draw_colorChecker_tracks.jpg)

## generative_random
```bash
glslViewer generative_random.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_random.jpg)

![benchmark](benchmarks/generative_random_tracks.jpg)

## generative_cnoise
```bash
glslViewer generative_cnoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_cnoise.jpg)

![benchmark](benchmarks/generative_cnoise_tracks.jpg)

## generative_pnoise
```bash
glslViewer generative_pnoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_pnoise.jpg)

![benchmark](benchmarks/generative_pnoise_tracks.jpg)

## generative_snoise
```bash
glslViewer generative_snoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_snoise.jpg)

![benchmark](benchmarks/generative_snoise_tracks.jpg)

## generative_psrdnoise
```bash
glslViewer generative_psrdnoise.frag assets/sphere.ply --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_psrdnoise.jpg)

![benchmark](benchmarks/generative_psrdnoise_tracks.jpg)

## generative_noised
```bash
glslViewer generative_noised.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_noised.jpg)

![benchmark](benchmarks/generative_noised_tracks.jpg)

## generative_curl
```bash
glslViewer generative_curl.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_curl.jpg)

![benchmark](benchmarks/generative_curl_tracks.jpg)

## generative_fbm
```bash
glslViewer generative_fbm.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_fbm.jpg)

![benchmark](benchmarks/generative_fbm_tracks.jpg)

## generative_voronoi
```bash
glslViewer generative_voronoi.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_voronoi.jpg)

![benchmark](benchmarks/generative_voronoi_tracks.jpg)

## generative_voronoise
```bash
glslViewer generative_voronoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_voronoise.jpg)

![benchmark](benchmarks/generative_voronoise_tracks.jpg)

## generative_wavelet
```bash
glslViewer generative_wavelet.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_wavelet.jpg)

![benchmark](benchmarks/generative_wavelet_tracks.jpg)

## generative_worley
```bash
glslViewer generative_worley.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_worley.jpg)

![benchmark](benchmarks/generative_worley_tracks.jpg)

## filter_boxBlur1D
```bash
glslViewer filter_boxBlur1D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_boxBlur1D.jpg)

![benchmark](benchmarks/filter_boxBlur1D_tracks.jpg)

## filter_boxBlur2D
```bash
glslViewer filter_boxBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_boxBlur2D.jpg)

![benchmark](benchmarks/filter_boxBlur2D_tracks.jpg)

## filter_fibonacciBokeh
```bash
glslViewer filter_fibonacciBokeh.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_fibonacciBokeh.jpg)

![benchmark](benchmarks/filter_fibonacciBokeh_tracks.jpg)

## filter_gaussianBlur1D
```bash
glslViewer filter_gaussianBlur1D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_gaussianBlur1D.jpg)

![benchmark](benchmarks/filter_gaussianBlur1D_tracks.jpg)

## filter_gaussianBlur2D
```bash
glslViewer filter_gaussianBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_gaussianBlur2D.jpg)

![benchmark](benchmarks/filter_gaussianBlur2D_tracks.jpg)

## filter_bilateral2D
```bash
glslViewer filter_bilateral2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_bilateral2D.jpg)

![benchmark](benchmarks/filter_bilateral2D_tracks.jpg)

## filter_radialBlur2D
```bash
glslViewer filter_radialBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_radialBlur2D.jpg)

![benchmark](benchmarks/filter_radialBlur2D_tracks.jpg)

## filter_noiseBlur2D
```bash
glslViewer filter_noiseBlur2D.frag -u_tex0 assets/danny.png -u_noise assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_noiseBlur2D.jpg)

![benchmark](benchmarks/filter_noiseBlur2D_tracks.jpg)

## filter_median2D
```bash
glslViewer filter_median2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_median2D.jpg)

![benchmark](benchmarks/filter_median2D_tracks.jpg)

## filter_kuwahara2D
```bash
glslViewer filter_kuwahara2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_kuwahara2D.jpg)

![benchmark](benchmarks/filter_kuwahara2D_tracks.jpg)

## filter_sharpen2D
```bash
glslViewer filter_sharpen2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_sharpen2D.jpg)

![benchmark](benchmarks/filter_sharpen2D_tracks.jpg)

## filter_laplacian2D
```bash
glslViewer filter_laplacian2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_laplacian2D.jpg)

![benchmark](benchmarks/filter_laplacian2D_tracks.jpg)

## filter_edge2D
```bash
glslViewer filter_edge2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_edge2D.jpg)

![benchmark](benchmarks/filter_edge2D_tracks.jpg)

## filter_bilinear2D
```bash
glslViewer filter_bilinear2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_bilinear2D.jpg)

![benchmark](benchmarks/filter_bilinear2D_tracks.jpg)

## sample_dof
```bash
glslViewer sample_dof.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/sample_dof.jpg)

![benchmark](benchmarks/sample_dof_tracks.jpg)

## sample_bracketing
```bash
glslViewer sample_bracketing.frag assets/rock_moss.jpg --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_bracketing.jpg)

![benchmark](benchmarks/sample_bracketing_tracks.jpg)

## sample_wrap
```bash
glslViewer sample_wrap.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap.jpg)

![benchmark](benchmarks/sample_wrap_tracks.jpg)

## sample_wrap_repeat
```bash
glslViewer sample_wrap_repeat.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_repeat.jpg)

![benchmark](benchmarks/sample_wrap_repeat_tracks.jpg)

## sample_wrap_clamp
```bash
glslViewer sample_wrap_clamp.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_clamp.jpg)

![benchmark](benchmarks/sample_wrap_clamp_tracks.jpg)

## sample_wrap_mirror
```bash
glslViewer sample_wrap_mirror.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_mirror.jpg)

![benchmark](benchmarks/sample_wrap_mirror_tracks.jpg)

## sample_wrap_untile
```bash
glslViewer sample_wrap_untile.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_untile.jpg)

![benchmark](benchmarks/sample_wrap_untile_tracks.jpg)

## sample_wrap_zero
```bash
glslViewer sample_wrap_zero.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_zero.jpg)

![benchmark](benchmarks/sample_wrap_zero_tracks.jpg)

## sample_filter_bicubic
```bash
glslViewer sample_filter_bicubic.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_filter_bicubic.jpg)

![benchmark](benchmarks/sample_filter_bicubic_tracks.jpg)

## sample_filter_nearest
```bash
glslViewer sample_filter_nearest.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_filter_nearest.jpg)

![benchmark](benchmarks/sample_filter_nearest_tracks.jpg)

## sample_filter_smooth
```bash
glslViewer sample_filter_smooth.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_filter_smooth.jpg)

![benchmark](benchmarks/sample_filter_smooth_tracks.jpg)

## sample_equirect
```bash
glslViewer sample_equirect.frag assets/dragon.obj assets/studio.png  -e camera_position,-1.43923,0.891203,1.98093  -e define,SCENE_CUBEMAP,u_tex0 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_equirect.jpg)

![benchmark](benchmarks/sample_equirect_tracks.jpg)

## sample_3Dsdf
```bash
glslViewer sample_3Dsdf.frag assets/suzanne.png  -e camera_position,-29.5393,26.2406,-42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_3Dsdf.jpg)

![benchmark](benchmarks/sample_3Dsdf_tracks.jpg)

## sample_triplanar
```bash
glslViewer sample_triplanar.frag assets/suzanne.obj assets/rock_moss.jpg --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_triplanar.jpg)

![benchmark](benchmarks/sample_triplanar_tracks.jpg)

## morphological_erosion
```bash
glslViewer morphological_erosion.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_erosion.jpg)

![benchmark](benchmarks/morphological_erosion_tracks.jpg)

## morphological_dilation
```bash
glslViewer morphological_dilation.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_dilation.jpg)

![benchmark](benchmarks/morphological_dilation_tracks.jpg)

## morphological_alphaFill
```bash
glslViewer morphological_alphaFill.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_alphaFill.jpg)

![benchmark](benchmarks/morphological_alphaFill_tracks.jpg)

## morphological_poissonFill
```bash
glslViewer morphological_poissonFill.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_poissonFill.jpg)

![benchmark](benchmarks/morphological_poissonFill_tracks.jpg)

## morphological_marchinSquares
```bash
glslViewer morphological_marchinSquares.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_marchinSquares.jpg)

![benchmark](benchmarks/morphological_marchinSquares_tracks.jpg)

## lighting_position
```bash
glslViewer lighting_position.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_position.jpg)

![benchmark](benchmarks/lighting_position_tracks.jpg)

## lighting_normal
```bash
glslViewer lighting_normal.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_normal.jpg)

![benchmark](benchmarks/lighting_normal_tracks.jpg)

## lighting_gooch
```bash
glslViewer lighting_gooch.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_gooch.jpg)

![benchmark](benchmarks/lighting_gooch_tracks.jpg)

## lighting_pbrLittle
```bash
glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrLittle.jpg)

![benchmark](benchmarks/lighting_pbrLittle_tracks.jpg)

## lighting_pbrLittle_cubemap
```bash
glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrLittle_cubemap.jpg)

![benchmark](benchmarks/lighting_pbrLittle_cubemap_tracks.jpg)

## lighting_pbrLittle_deferred
```bash
glslViewer lighting_pbrLittle_deferred.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrLittle_deferred.jpg)

![benchmark](benchmarks/lighting_pbrLittle_deferred_tracks.jpg)

## lighting_pbr
```bash
glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbr.jpg)

![benchmark](benchmarks/lighting_pbr_tracks.jpg)

## lighting_pbr_cubemap
```bash
glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbr_cubemap.jpg)

![benchmark](benchmarks/lighting_pbr_cubemap_tracks.jpg)

## lighting_pbr_lights
```bash
glslViewer lighting_pbr_lights.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbr_lights.jpg)

![benchmark](benchmarks/lighting_pbr_lights_tracks.jpg)

## lighting_pbr_dynamic
```bash
glslViewer lighting_pbr_dynamic.frag assets/dragon.obj lighting_pbr_dynamic.vert  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbr_dynamic.jpg)

![benchmark](benchmarks/lighting_pbr_dynamic_tracks.jpg)

## lighting_pbrClearCoat
```bash
glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrClearCoat.jpg)

![benchmark](benchmarks/lighting_pbrClearCoat_tracks.jpg)

## lighting_pbrClearCoat_cubemap
```bash
glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrClearCoat_cubemap.jpg)

![benchmark](benchmarks/lighting_pbrClearCoat_cubemap_tracks.jpg)

## lighting_pbrIridescence
```bash
glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrIridescence.jpg)

![benchmark](benchmarks/lighting_pbrIridescence_tracks.jpg)

## lighting_pbrIridescence_cubemap
```bash
glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrIridescence_cubemap.jpg)

![benchmark](benchmarks/lighting_pbrIridescence_cubemap_tracks.jpg)

## lighting_pbrGlass
```bash
glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrGlass.jpg)

![benchmark](benchmarks/lighting_pbrGlass_tracks.jpg)

## lighting_pbrGlass_cubemap
```bash
glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrGlass_cubemap.jpg)

![benchmark](benchmarks/lighting_pbrGlass_cubemap_tracks.jpg)

## lighting_pbrSsS
```bash
glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrSsS.jpg)

![benchmark](benchmarks/lighting_pbrSsS_tracks.jpg)

## lighting_pbrSsS_cubemap
```bash
glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrSsS_cubemap.jpg)

![benchmark](benchmarks/lighting_pbrSsS_cubemap_tracks.jpg)

## lighting_shadow
```bash
glslViewer lighting_shadow.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_shadow.jpg)

![benchmark](benchmarks/lighting_shadow_tracks.jpg)

## lighting_sphereMap_glass
```bash
glslViewer lighting_sphereMap.frag assets/sem-glass-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_glass.jpg)

![benchmark](benchmarks/lighting_sphereMap_glass_tracks.jpg)

## lighting_sphereMap_crystal
```bash
glslViewer lighting_sphereMap.frag assets/sem-glass-0004.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_crystal.jpg)

![benchmark](benchmarks/lighting_sphereMap_crystal_tracks.jpg)

## lighting_sphereMap_gold
```bash
glslViewer lighting_sphereMap.frag assets/sem-gold-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_gold.jpg)

![benchmark](benchmarks/lighting_sphereMap_gold_tracks.jpg)

## lighting_sphereMap_metal
```bash
glslViewer lighting_sphereMap.frag assets/sem-metal-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_metal.jpg)

![benchmark](benchmarks/lighting_sphereMap_metal_tracks.jpg)

## lighting_sphereMap_dark_metal
```bash
glslViewer lighting_sphereMap.frag assets/sem-metal-0019.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_dark_metal.jpg)

![benchmark](benchmarks/lighting_sphereMap_dark_metal_tracks.jpg)

## lighting_sphereMap_iridescent
```bash
glslViewer lighting_sphereMap.frag assets/sem-0033.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_iridescent.jpg)

![benchmark](benchmarks/lighting_sphereMap_iridescent_tracks.jpg)

## lighting_sphericalHarmonics
```bash
glslViewer lighting_sphericalHarmonics.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093  -e sky,on --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_sphericalHarmonics.jpg)

![benchmark](benchmarks/lighting_sphericalHarmonics_tracks.jpg)

## lighting_ssao
```bash
glslViewer lighting_ssao.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_ssao.jpg)

![benchmark](benchmarks/lighting_ssao_tracks.jpg)

## lighting_ssr
```bash
glslViewer lighting_ssr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_ssr.jpg)

![benchmark](benchmarks/lighting_ssr_tracks.jpg)

## lighting_volumetric
```bash
glslViewer lighting_volumetric.frag assets/dragon.obj  -e camera_position,-1.67433,0.0682091,-1.99539 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_volumetric.jpg)

![benchmark](benchmarks/lighting_volumetric_tracks.jpg)

## lighting_raymarching
```bash
glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching.jpg)

![benchmark](benchmarks/lighting_raymarching_tracks.jpg)

## lighting_raymarching_cubemap
```bash
glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_cubemap.jpg)

![benchmark](benchmarks/lighting_raymarching_cubemap_tracks.jpg)

## lighting_raymarching_return
```bash
glslViewer lighting_raymarching_return.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_return.jpg)

![benchmark](benchmarks/lighting_raymarching_return_tracks.jpg)

## lighting_raymarching_gooch
```bash
glslViewer lighting_raymarching_gooch.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_gooch.jpg)

![benchmark](benchmarks/lighting_raymarching_gooch_tracks.jpg)

## lighting_raymarching_pbr
```bash
glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbr.jpg)

![benchmark](benchmarks/lighting_raymarching_pbr_tracks.jpg)

## lighting_raymarching_pbr_cubemap
```bash
glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbr_cubemap.jpg)

![benchmark](benchmarks/lighting_raymarching_pbr_cubemap_tracks.jpg)

## lighting_raymarching_pbrLittle
```bash
glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrLittle.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrLittle_tracks.jpg)

## lighting_raymarching_pbrLittle_cubemap
```bash
glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrLittle_cubemap.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrLittle_cubemap_tracks.jpg)

## lighting_raymarching_pbrClearCoat
```bash
glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrClearCoat.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrClearCoat_tracks.jpg)

## lighting_raymarching_pbrClearCoat_cubemap
```bash
glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrClearCoat_cubemap.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrClearCoat_cubemap_tracks.jpg)

## lighting_raymarching_pbrGlass
```bash
glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrGlass.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrGlass_tracks.jpg)

## lighting_raymarching_pbrGlass_cubemap
```bash
glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrGlass_cubemap.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrGlass_cubemap_tracks.jpg)

## lighting_raymarching_pbrIridescence
```bash
glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrIridescence.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrIridescence_tracks.jpg)

## lighting_raymarching_pbrIridescence_cubemap
```bash
glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrIridescence_cubemap.jpg)

![benchmark](benchmarks/lighting_raymarching_pbrIridescence_cubemap_tracks.jpg)

## lighting_raymarching_volume
```bash
glslViewer lighting_raymarching_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_volume.jpg)

![benchmark](benchmarks/lighting_raymarching_volume_tracks.jpg)

## lighting_raymarching_pbr_volume
```bash
glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbr_volume.jpg)

![benchmark](benchmarks/lighting_raymarching_pbr_volume_tracks.jpg)

## lighting_raymarching_pbr_volume_cubemap
```bash
glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbr_volume_cubemap.jpg)

![benchmark](benchmarks/lighting_raymarching_pbr_volume_cubemap_tracks.jpg)

## lighting_atmosphere_equirectangular
```bash
glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,0 --msaa --width 1024 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_atmosphere_equirectangular.jpg)

![benchmark](benchmarks/lighting_atmosphere_equirectangular_tracks.jpg)

## lighting_atmosphere_fisheye
```bash
glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,1 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_atmosphere_fisheye.jpg)

![benchmark](benchmarks/lighting_atmosphere_fisheye_tracks.jpg)

