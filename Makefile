math_functions:
	glslViewer math_functions.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

math_gaussian:
	glslViewer math_gaussian.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

math_quat:
	glslViewer math_quat.frag assets/suzanne.obj math_quat.vert --msaa --width 512 --height 512 -e dynamic_shadows,on -l

animation_easing:
	glslViewer animation_easing.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

animation_sprite:
	glslViewer animation_sprite.frag assets/sprite_megaman.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_brightnessContrast:
	glslViewer color_brightnessContrast.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_brightnessContrastMatrix:
	glslViewer color_brightnessContrastMatrix.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_mix:
	glslViewer color_mix.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_lut:
	glslViewer color_lut.frag assets/danny.png assets/square_01.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_dither:
	glslViewer color_dither.frag -u_noise assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_dither:
	glslViewer sample_dither.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_iridescence_map:
	glslViewer color_iridescence_map.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_wavelength:
	glslViewer color_wavelength.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_wada:
	glslViewer color_wada.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_wada_dyads:
	glslViewer color_wada_dyads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_wada_triads:
	glslViewer color_wada_triads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_wada_tetrads:
	glslViewer color_wada_tetrads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_pigments:
	glslViewer color_pigments.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_palette_lerp:
	glslViewer color_palette_lerp.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_ryb:
	glslViewer color_ryb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_zorn:
	glslViewer color_zorn.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_mix_ryb:
	glslViewer color_mix_ryb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

color_mixSpectral_check:
	glslViewer color_mixSpectral_check.frag -l

distort_pincushion:
	glslViewer distort_pincushion.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_digits:
	glslViewer draw_digits.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_aa:
	glslViewer draw_aa.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_shapes:
	glslViewer draw_shapes.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_supershape:
	glslViewer draw_supershape.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_tiles:
	glslViewer draw_tiles.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_koch:
	glslViewer draw_koch.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_julia:
	glslViewer draw_julia.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_mandelbulb:
	glslViewer draw_mandelbulb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_colorChecker:
	glslViewer draw_colorChecker.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

draw_debug1:
	glslViewer draw_debug1.frag -e camera_position,1.,1.,2. -l

draw_debug2:
	glslViewer draw_debug2.frag assets/dragon.obj -l

generative_random:
	glslViewer generative_random.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_cnoise:
	glslViewer generative_cnoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_pnoise:
	glslViewer generative_pnoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_snoise:
	glslViewer generative_snoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_psrdnoise:
	glslViewer generative_psrdnoise.frag assets/sphere.ply --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_noised:
	glslViewer generative_noised.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_curl:
	glslViewer generative_curl.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_fbm:
	glslViewer generative_fbm.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_voronoi:
	glslViewer generative_voronoi.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_voronoise:
	glslViewer generative_voronoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_wavelet:
	glslViewer generative_wavelet.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

generative_worley:
	glslViewer generative_worley.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_boxBlur1D:
	glslViewer filter_boxBlur1D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_boxBlur2D:
	glslViewer filter_boxBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_fibonacciBokeh:
	glslViewer filter_fibonacciBokeh.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_gaussianBlur1D:
	glslViewer filter_gaussianBlur1D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_gaussianBlur2D:
	glslViewer filter_gaussianBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_bilateral2D:
	glslViewer filter_bilateral2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_radialBlur2D:
	glslViewer filter_radialBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_noiseBlur2D:
	glslViewer filter_noiseBlur2D.frag -u_tex0 assets/danny.png -u_noise assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_median2D:
	glslViewer filter_median2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_kuwahara2D:
	glslViewer filter_kuwahara2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_sharpen2D:
	glslViewer filter_sharpen2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_laplacian2D:
	glslViewer filter_laplacian2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_edge2D:
	glslViewer filter_edge2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

filter_bilinear2D:
	glslViewer filter_bilinear2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_dof:
	glslViewer sample_dof.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

sample_bracketing:
	glslViewer sample_bracketing.frag assets/rock_moss.jpg --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_wrap:
	glslViewer sample_wrap.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_wrap_repeat:
	glslViewer sample_wrap_repeat.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_wrap_clamp:
	glslViewer sample_wrap_clamp.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_wrap_mirror:
	glslViewer sample_wrap_mirror.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_wrap_untile:
	glslViewer sample_wrap_untile.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_wrap_zero:
	glslViewer sample_wrap_zero.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_filter_bicubic:
	glslViewer sample_filter_bicubic.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_filter_nearest:
	glslViewer sample_filter_nearest.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_filter_smooth:
	glslViewer sample_filter_smooth.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_equirect:
	glslViewer sample_equirect.frag assets/dragon.obj assets/studio.png  -e camera_position,-1.43923,0.891203,1.98093  -e define,SCENE_CUBEMAP,u_tex0 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_3Dsdf:
	glslViewer sample_3Dsdf.frag assets/suzanne.png  -e camera_position,-29.5393,26.2406,-42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

sample_triplanar:
	glslViewer sample_triplanar.frag assets/suzanne.obj assets/rock_moss.jpg --msaa --width 512 --height 512 -e dynamic_shadows,on -l

morphological_erosion:
	glslViewer morphological_erosion.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

morphological_dilation:
	glslViewer morphological_dilation.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

morphological_alphaFill:
	glslViewer morphological_alphaFill.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

morphological_poissonFill:
	glslViewer morphological_poissonFill.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

morphological_marchinSquares:
	glslViewer morphological_marchinSquares.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_position:
	glslViewer lighting_position.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_normal:
	glslViewer lighting_normal.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_gooch:
	glslViewer lighting_gooch.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbrLittle:
	glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbrLittle_cubemap:
	glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_pbrLittle_deferred:
	glslViewer lighting_pbrLittle_deferred.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbr:
	glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbr_cubemap:
	glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_pbr_lights:
	glslViewer lighting_pbr_lights.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbr_dynamic:
	glslViewer lighting_pbr_dynamic.frag assets/dragon.obj lighting_pbr_dynamic.vert  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbrClearCoat:
	glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbrClearCoat_cubemap:
	glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_pbrIridescence:
	glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbrIridescence_cubemap:
	glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_pbrGlass:
	glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbrGlass_cubemap:
	glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_pbrSsS:
	glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_pbrSsS_cubemap:
	glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_shadow:
	glslViewer lighting_shadow.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_sphereMap_glass:
	glslViewer lighting_sphereMap.frag assets/sem-glass-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_sphereMap_crystal:
	glslViewer lighting_sphereMap.frag assets/sem-glass-0004.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_sphereMap_gold:
	glslViewer lighting_sphereMap.frag assets/sem-gold-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_sphereMap_metal:
	glslViewer lighting_sphereMap.frag assets/sem-metal-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_sphereMap_dark_metal:
	glslViewer lighting_sphereMap.frag assets/sem-metal-0019.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_sphereMap_iridescent:
	glslViewer lighting_sphereMap.frag assets/sem-0033.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_sphericalHarmonics:
	glslViewer lighting_sphericalHarmonics.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093  -e sky,on --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_ssao:
	glslViewer lighting_ssao.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_ssr:
	glslViewer lighting_ssr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_volumetric:
	glslViewer lighting_volumetric.frag assets/dragon.obj  -e camera_position,-1.67433,0.0682091,-1.99539 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching:
	glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_cubemap:
	glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_return:
	glslViewer lighting_raymarching_return.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_gooch:
	glslViewer lighting_raymarching_gooch.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbr:
	glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbr_cubemap:
	glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_pbrLittle:
	glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbrLittle_cubemap:
	glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_pbrClearCoat:
	glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbrClearCoat_cubemap:
	glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_pbrGlass:
	glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbrGlass_cubemap:
	glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_pbrIridescence:
	glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbrIridescence_cubemap:
	glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_volume:
	glslViewer lighting_raymarching_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbr_volume:
	glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

lighting_raymarching_pbr_volume_cubemap:
	glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l

lighting_atmosphere_equirectangular:
	glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,0 --msaa --width 1024 --height 512 -e dynamic_shadows,on -l

lighting_atmosphere_fisheye:
	glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,1 --msaa --width 512 --height 512 -e dynamic_shadows,on -l

screenshots:
	prime-run glslViewer math_functions.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/math_functions.jpg
	prime-run glslViewer math_gaussian.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/math_gaussian.jpg
	prime-run glslViewer math_quat.frag assets/suzanne.obj math_quat.vert --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/math_quat.jpg
	prime-run glslViewer animation_easing.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/animation_easing.jpg
	prime-run glslViewer animation_sprite.frag assets/sprite_megaman.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/animation_sprite.jpg
	prime-run glslViewer color_brightnessContrast.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_brightnessContrast.jpg
	prime-run glslViewer color_brightnessContrastMatrix.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_brightnessContrastMatrix.jpg
	prime-run glslViewer color_mix.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_mix.jpg
	prime-run glslViewer color_lut.frag assets/danny.png assets/square_01.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_lut.jpg
	prime-run glslViewer color_dither.frag -u_noise assets/noise_blue.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_dither.jpg
	prime-run glslViewer sample_dither.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_dither.jpg
	prime-run glslViewer color_iridescence_map.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_iridescence_map.jpg
	prime-run glslViewer color_wavelength.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_wavelength.jpg
	prime-run glslViewer color_wada.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_wada.jpg
	prime-run glslViewer color_wada_dyads.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_wada_dyads.jpg
	prime-run glslViewer color_wada_triads.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_wada_triads.jpg
	prime-run glslViewer color_wada_tetrads.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_wada_tetrads.jpg
	prime-run glslViewer color_pigments.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_pigments.jpg
	prime-run glslViewer color_palette_lerp.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_palette_lerp.jpg
	prime-run glslViewer color_ryb.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_ryb.jpg
	prime-run glslViewer color_zorn.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_zorn.jpg
	prime-run glslViewer color_mix_ryb.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/color_mix_ryb.jpg
	prime-run glslViewer distort_pincushion.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/distort_pincushion.jpg
	prime-run glslViewer draw_digits.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_digits.jpg
	prime-run glslViewer draw_aa.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_aa.jpg
	prime-run glslViewer draw_shapes.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_shapes.jpg
	prime-run glslViewer draw_supershape.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_supershape.jpg
	prime-run glslViewer draw_tiles.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_tiles.jpg
	prime-run glslViewer draw_koch.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_koch.jpg
	prime-run glslViewer draw_julia.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_julia.jpg
	prime-run glslViewer draw_mandelbulb.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_mandelbulb.jpg
	prime-run glslViewer draw_colorChecker.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/draw_colorChecker.jpg
	prime-run glslViewer generative_random.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_random.jpg
	prime-run glslViewer generative_cnoise.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_cnoise.jpg
	prime-run glslViewer generative_pnoise.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_pnoise.jpg
	prime-run glslViewer generative_snoise.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_snoise.jpg
	prime-run glslViewer generative_psrdnoise.frag assets/sphere.ply --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_psrdnoise.jpg
	prime-run glslViewer generative_noised.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_noised.jpg
	prime-run glslViewer generative_curl.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_curl.jpg
	prime-run glslViewer generative_fbm.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_fbm.jpg
	prime-run glslViewer generative_voronoi.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_voronoi.jpg
	prime-run glslViewer generative_voronoise.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_voronoise.jpg
	prime-run glslViewer generative_wavelet.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_wavelet.jpg
	prime-run glslViewer generative_worley.frag --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/generative_worley.jpg
	prime-run glslViewer filter_boxBlur1D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_boxBlur1D.jpg
	prime-run glslViewer filter_boxBlur2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_boxBlur2D.jpg
	prime-run glslViewer filter_fibonacciBokeh.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_fibonacciBokeh.jpg
	prime-run glslViewer filter_gaussianBlur1D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_gaussianBlur1D.jpg
	prime-run glslViewer filter_gaussianBlur2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_gaussianBlur2D.jpg
	prime-run glslViewer filter_bilateral2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_bilateral2D.jpg
	prime-run glslViewer filter_radialBlur2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_radialBlur2D.jpg
	prime-run glslViewer filter_noiseBlur2D.frag -u_tex0 assets/danny.png -u_noise assets/noise_blue.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_noiseBlur2D.jpg
	prime-run glslViewer filter_median2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_median2D.jpg
	prime-run glslViewer filter_kuwahara2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_kuwahara2D.jpg
	prime-run glslViewer filter_sharpen2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_sharpen2D.jpg
	prime-run glslViewer filter_laplacian2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_laplacian2D.jpg
	prime-run glslViewer filter_edge2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_edge2D.jpg
	prime-run glslViewer filter_bilinear2D.frag assets/danny.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/filter_bilinear2D.jpg
	prime-run glslViewer sample_dof.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/sample_dof.jpg
	prime-run glslViewer sample_bracketing.frag assets/rock_moss.jpg --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_bracketing.jpg
	prime-run glslViewer sample_wrap.frag assets/rocks.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_wrap.jpg
	prime-run glslViewer sample_wrap_repeat.frag assets/rocks.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_wrap_repeat.jpg
	prime-run glslViewer sample_wrap_clamp.frag assets/rocks.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_wrap_clamp.jpg
	prime-run glslViewer sample_wrap_mirror.frag assets/rocks.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_wrap_mirror.jpg
	prime-run glslViewer sample_wrap_untile.frag assets/rocks.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_wrap_untile.jpg
	prime-run glslViewer sample_wrap_zero.frag assets/rocks.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_wrap_zero.jpg
	prime-run glslViewer sample_filter_bicubic.frag assets/noise_blue.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_filter_bicubic.jpg
	prime-run glslViewer sample_filter_nearest.frag assets/noise_blue.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_filter_nearest.jpg
	prime-run glslViewer sample_filter_smooth.frag assets/noise_blue.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_filter_smooth.jpg
	prime-run glslViewer sample_equirect.frag assets/dragon.obj assets/studio.png  -e camera_position,-1.43923,0.891203,1.98093  -e define,SCENE_CUBEMAP,u_tex0 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_equirect.jpg
	prime-run glslViewer sample_3Dsdf.frag assets/suzanne.png  -e camera_position,-29.5393,26.2406,-42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_3Dsdf.jpg
	prime-run glslViewer sample_triplanar.frag assets/suzanne.obj assets/rock_moss.jpg --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/sample_triplanar.jpg
	prime-run glslViewer morphological_erosion.frag assets/flower.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/morphological_erosion.jpg
	prime-run glslViewer morphological_dilation.frag assets/flower.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/morphological_dilation.jpg
	prime-run glslViewer morphological_alphaFill.frag assets/flower.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/morphological_alphaFill.jpg
	prime-run glslViewer morphological_poissonFill.frag assets/flower.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/morphological_poissonFill.jpg
	prime-run glslViewer morphological_marchinSquares.frag assets/flower.png --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/morphological_marchinSquares.jpg
	prime-run glslViewer lighting_position.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_position.jpg
	prime-run glslViewer lighting_normal.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_normal.jpg
	prime-run glslViewer lighting_gooch.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_gooch.jpg
	prime-run glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbrLittle.jpg
	prime-run glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_pbrLittle_cubemap.jpg
	prime-run glslViewer lighting_pbrLittle_deferred.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbrLittle_deferred.jpg
	prime-run glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbr.jpg
	prime-run glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_pbr_cubemap.jpg
	prime-run glslViewer lighting_pbr_lights.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbr_lights.jpg
	prime-run glslViewer lighting_pbr_dynamic.frag assets/dragon.obj lighting_pbr_dynamic.vert  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbr_dynamic.jpg
	prime-run glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbrClearCoat.jpg
	prime-run glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_pbrClearCoat_cubemap.jpg
	prime-run glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbrIridescence.jpg
	prime-run glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_pbrIridescence_cubemap.jpg
	prime-run glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbrGlass.jpg
	prime-run glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_pbrGlass_cubemap.jpg
	prime-run glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_pbrSsS.jpg
	prime-run glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_pbrSsS_cubemap.jpg
	prime-run glslViewer lighting_shadow.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_shadow.jpg
	prime-run glslViewer lighting_sphereMap.frag assets/sem-glass-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_sphereMap_glass.jpg
	prime-run glslViewer lighting_sphereMap.frag assets/sem-glass-0004.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_sphereMap_crystal.jpg
	prime-run glslViewer lighting_sphereMap.frag assets/sem-gold-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_sphereMap_gold.jpg
	prime-run glslViewer lighting_sphereMap.frag assets/sem-metal-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_sphereMap_metal.jpg
	prime-run glslViewer lighting_sphereMap.frag assets/sem-metal-0019.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_sphereMap_dark_metal.jpg
	prime-run glslViewer lighting_sphereMap.frag assets/sem-0033.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_sphereMap_iridescent.jpg
	prime-run glslViewer lighting_sphericalHarmonics.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093  -e sky,on --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_sphericalHarmonics.jpg
	prime-run glslViewer lighting_ssao.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_ssao.jpg
	prime-run glslViewer lighting_ssr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_ssr.jpg
	prime-run glslViewer lighting_volumetric.frag assets/dragon.obj  -e camera_position,-1.67433,0.0682091,-1.99539 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_volumetric.jpg
	prime-run glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching.jpg
	prime-run glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_raymarching_cubemap.jpg
	prime-run glslViewer lighting_raymarching_return.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_return.jpg
	prime-run glslViewer lighting_raymarching_gooch.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_gooch.jpg
	prime-run glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_pbr.jpg
	prime-run glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_raymarching_pbr_cubemap.jpg
	prime-run glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_pbrLittle.jpg
	prime-run glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_raymarching_pbrLittle_cubemap.jpg
	prime-run glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_pbrClearCoat.jpg
	prime-run glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_raymarching_pbrClearCoat_cubemap.jpg
	prime-run glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_pbrGlass.jpg
	prime-run glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_raymarching_pbrGlass_cubemap.jpg
	prime-run glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_pbrIridescence.jpg
	prime-run glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_raymarching_pbrIridescence_cubemap.jpg
	prime-run glslViewer lighting_raymarching_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_volume.jpg
	prime-run glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_raymarching_pbr_volume.jpg
	prime-run glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -E screenshot,images/lighting_raymarching_pbr_volume_cubemap.jpg
	prime-run glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,0 --headless --noncurses --msaa --width 1024 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_atmosphere_equirectangular.jpg
	prime-run glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,1 --headless --noncurses --msaa --width 512 --height 512 -e dynamic_shadows,on -E screenshot,images/lighting_atmosphere_fisheye.jpg

clean:
	rm images/*.jpg
