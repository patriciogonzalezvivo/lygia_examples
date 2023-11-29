# DRAW

math_functions:
	glslViewer math_functions.frag -l

math_gaussian:
	glslViewer math_gaussian.frag -l

math_quat:
	glslViewer math_quat.frag math_quat.vert assets/suzanne.obj -l   

animation_easing:
	glslViewer animation_easing.frag -l	

animation_sprite:
	glslViewer animation_sprite.frag assets/sprite_megaman.png -l

color_mix:
	glslViewer color_mix.frag assets/mixbox_lut.png -l

color_lut:
	glslViewer color_lut.frag assets/danny.png assets/square_01.png -l

color_dither:
	glslViewer color_dither.frag --u_noise assets/noise_blue.png -l

color_dither_bayer:
	glslViewer color_dither_bayer.frag assets/danny.png -l

color_iridescence_map:
	glslViewer color_iridescence_map.frag -l

color_wavelength:
	glslViewer color_wavelength.frag -l 

distort_pincushion:
	glslViewer distort_pincushion.frag assets/danny.png -l

draw_digits:
	glslViewer draw_digits.frag -l

draw_aa:
	glslViewer draw_aa.frag -l 

draw_shapes:
	glslViewer draw_shapes.frag -l

draw_supershape:
	glslViewer draw_supershape.frag -l

draw_gear:
	glslViewer draw_gear.frag -l

draw_tiles:
	glslViewer draw_tiles.frag -l  

draw_koch:
	glslViewer draw_koch.frag -l

draw_julia:
	glslViewer draw_julia.frag -l

draw_mandelbulb:
	glslViewer draw_mandelbulb.frag -l

generative_random:
	glslViewer generative_random.frag --fps 24 -l

generative_cnoise:
	glslViewer generative_cnoise.frag --fps 24 -l

generative_pnoise:
	glslViewer generative_pnoise.frag --fps 24 -l

generative_snoise:
	glslViewer generative_snoise.frag --fps 24 -l

generative_psrdnoise:
	glslViewer generative_psrdnoise.frag assets/sphere.ply -l

generative_noised:
	glslViewer generative_noised.frag --fps 24 -l

generative_curl:
	glslViewer generative_curl.frag --fps 24 -l

generative_fbm:
	glslViewer generative_fbm.frag --fps 24 -l

generative_voronoi:
	glslViewer generative_voronoi.frag --fps 24 -l

generative_voronoise:
	glslViewer generative_voronoise.frag --fps 24 -l

generative_wavelet:
	glslViewer generative_wavelet.frag -w 512 -h 512 -l

generative_worley:
	glslViewer generative_worley.frag --fps 24 -l

filter_boxBlur1D:
	glslViewer filter_boxBlur1D.frag assets/danny.png -e buffers,on -l

filter_boxBlur2D:
	glslViewer filter_boxBlur2D.frag assets/danny.png -l

filter_fibonacciBokeh:
	glslViewer filter_fibonacciBokeh.frag assets/danny.png -l

filter_gaussianBlur1D:
	glslViewer filter_gaussianBlur1D.frag assets/danny.png -e buffers,on -l

filter_gaussianBlur2D:
	glslViewer filter_gaussianBlur2D.frag assets/danny.png -l

filter_bilateral2D:
	glslViewer filter_bilateral2D.frag assets/danny.png -l

filter_radialBlur2D:
	glslViewer filter_radialBlur2D.frag assets/danny.png -l

filter_noiseBlur2D:
	glslViewer filter_noiseBlur2D.frag assets/danny.png --u_noise assets/noise_blue.png -l

filter_median2D:
	glslViewer filter_median2D.frag assets/danny.png -l

filter_kuwahara2D:
	glslViewer filter_kuwahara2D.frag assets/danny.png -l

filter_sharpen2D:
	glslViewer filter_sharpen2D.frag assets/danny.png -l

filter_laplacian2D:
	glslViewer filter_laplacian2D.frag assets/danny.png -l

filter_edge2D:
	glslViewer filter_edge2D.frag assets/danny.png -l

filter_bilinear2D:
	glslViewer filter_bilinear2D.frag assets/danny.png -l

#  SAMPLE

sample_dof:
	glslViewer assets/dragon.obj sample_dof.frag -C assets/Arches_E_PineTree_3k.hdr -e camera_position,-1.43923,0.891203,1.98093 -l

sample_bracketing:
	glslViewer sample_bracketing.frag assets/rock_moss.jpg -l

sample_wrap:
	glslViewer sample_wrap.frag assets/rocks.png -l

sample_wrap_repeat:
	glslViewer sample_wrap_repeat.frag assets/rocks.png -l

sample_wrap_clamp:
	glslViewer sample_wrap_clamp.frag assets/rocks.png -l

sample_wrap_mirror:
	glslViewer sample_wrap_mirror.frag assets/rocks.png -l

sample_wrap_untile:
	glslViewer sample_wrap_untile.frag assets/rocks.png -l

sample_wrap_zero:
	glslViewer sample_wrap_zero.frag assets/rocks.png -l

sample_filter_bicubic:
	glslViewer sample_filter_bicubic.frag assets/noise_blue.png -l

sample_filter_nearest:
	glslViewer sample_filter_nearest.frag assets/noise_blue.png -l

sample_filter_smooth:
	glslViewer sample_filter_smooth.frag assets/noise_blue.png -l

sample_equirect:
	glslViewer sample_equirect.frag assets/dragon.obj assets/studio.png -e defined,SCENE_CUBEMAP,u_tex0 -e camera_position,-1.43923,0.891203,1.98093 -l

sample_3Dsdf:
	glslViewer sample_3Dsdf.frag assets/suzanne.png -e camera_position,-29.5393,26.2406,-42.1865 -l



morphological_erosion:
	glslViewer morphological_erosion.frag assets/flower.png -l

morphological_dilation:
	glslViewer morphological_dilation.frag assets/flower.png -l

morphological_alphaFill:
	glslViewer morphological_alphaFill.frag assets/flower.png -l

morphological_poissonFill:
	glslViewer morphological_poissonFill.frag assets/flower.png -l

morphological_marchinSquares:
	glslViewer morphological_marchinSquares.frag assets/flower.png -l 

# LIGHTING

lighting_position:
	glslViewer assets/dragon.obj lighting_position.frag -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_normal:
	glslViewer assets/dragon.obj lighting_normal.frag -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_gooch:
	glslViewer assets/dragon.obj lighting_gooch.frag -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_pbrLittle:
	glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l

lighting_pbrLittle_cubemap:
	glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l 

lighting_pbrLittle_deferred:
	glslViewer assets/dragon.obj lighting_pbrLittle_deferred.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l

lighting_pbr:
	glslViewer assets/dragon.obj lighting_pbr.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l

lighting_pbr_cubemap:
	glslViewer assets/dragon.obj lighting_pbr.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l 

lighting_pbrClearCoat:
	glslViewer assets/dragon.obj lighting_pbrClearCoat.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l

lighting_pbrClearCoat_cubemap:
	glslViewer assets/dragon.obj lighting_pbrClearCoat.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l 

lighting_pbrIridescence:
	# glslViewer assets/dragon.obj lighting_pbrIridescence.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l
	glslViewer assets/IridescenceSuzanne.glb lighting_pbrIridescence.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -e dynamic_shadows,on -l 

lighting_pbrIridescence_cubemap:
	# glslViewer assets/dragon.obj lighting_pbrIridescence.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l 
	glslViewer assets/IridescenceSuzanne.glb lighting_pbrIridescence.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l

lighting_pbrGlass:
	glslViewer assets/dragon.obj lighting_pbrGlass.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l
	# glslViewer lighting_pbrGlass.frag -e sphere,50 -e camera_position,-1.43923,0.891203,1.98093 --msaa -l 

lighting_pbrGlass_cubemap:
	glslViewer assets/dragon.obj lighting_pbrGlass.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l 
	# glslViewer lighting_pbrGlass.frag -e sphere,50 -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l 

lighting_pbrSsS:
	glslViewer assets/dragon.obj lighting_pbrSsS.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l

lighting_pbrSsS_cubemap:
	glslViewer assets/dragon.obj lighting_pbrSsS.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l 


# lighting_pbr_deferred:
# 	glslViewer assets/dragon.obj lighting_pbr_deferred.frag -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_shadow:
	glslViewer assets/dragon.obj lighting_shadow.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -l

lighting_sphereMap_glass:
	glslViewer assets/dragon.obj lighting_sphereMap.frag assets/sem-glass-0003.jpg --msaa -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_sphereMap_crystal:
	glslViewer assets/dragon.obj lighting_sphereMap.frag assets/sem-glass-0004.jpg --msaa -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_sphereMap_gold:
	glslViewer assets/dragon.obj lighting_sphereMap.frag assets/sem-gold-0003.jpg --msaa -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_sphereMap_metal:
	glslViewer assets/dragon.obj lighting_sphereMap.frag assets/sem-metal-0003.jpg --msaa -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_sphereMap_dark_metal:
	glslViewer assets/dragon.obj lighting_sphereMap.frag assets/sem-metal-0019.jpg --msaa -e camera_position,-1.43923,0.891203,1.98093 -l


lighting_sphereMap_iridescent:
	glslViewer assets/dragon.obj lighting_sphereMap.frag assets/sem-0033.jpg --msaa -e camera_position,-1.43923,0.891203,1.98093 -l



lighting_sphericalHarmonics:
	glslViewer assets/dragon.obj lighting_sphericalHarmonics.frag -e camera_position,-1.43923,0.891203,1.98093 -c assets/Arches_E_PineTree_3k.hdr --msaa --fxaa -e sky,on -l

lighting_ssao:
	glslViewer assets/dragon.obj lighting_ssao.frag -e camera_position,-1.43923,0.891203,1.98093 -l

lighting_ssr:
	glslViewer assets/dragon.obj lighting_ssr.frag -e camera_position,-1.43923,0.891203,1.98093 -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l

lighting_volumetric:
	glslViewer assets/dragon.obj lighting_volumetric.frag -e camera_position,-1.67433,0.0682091,-1.99539 -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -l

lighting_raymarching:
	glslViewer lighting_raymarching.frag -e camera_position,29.5393,26.2406,42.1865 -l

lighting_raymarching_pbr:
	glslViewer lighting_raymarching_pbr.frag -e camera_position,29.5393,26.2406,42.1865 -l

lighting_raymarching_pbr_cubemap:
	glslViewer lighting_raymarching_pbr.frag -e camera_position,29.5393,26.2406,42.1865 -c assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_glass:
	glslViewer lighting_raymarching_glass.frag -e camera_position,29.5393,26.2406,42.1865 -l

lighting_raymarching_glass_cubemap:
	glslViewer lighting_raymarching_glass.frag -e camera_position,29.5393,26.2406,42.1865 -c assets/Arches_E_PineTree_3k.hdr -l

lighting_raymarching_glass_refraction:
	glslViewer lighting_raymarching_glass_refraction.frag -e camera_position,29.5393,26.2406,42.1865 -l

lighting_raymarching_glass_refraction_cubemap:
	glslViewer lighting_raymarching_glass_refraction.frag -e camera_position,29.5393,26.2406,42.1865 -c assets/uffizi_cross.hdr -l

lighting_raymarching_volume:
	glslViewer lighting_raymarching_volume.frag -e camera_position,29.5393,26.2406,42.1865 -l

lighting_atmosphere_equirectangular:
	glslViewer lighting_atmosphere.frag -l -w 1024 -h 512 -e define,PROJECTION_MODE,0

lighting_atmosphere_fisheye:
	glslViewer lighting_atmosphere.frag -l -e define,PROJECTION_MODE,1

# MANTAINANCE
simulate_ripples:
	glslViewer simulate_ripples.frag -l  

simulate_grayscott:
	glslViewer simulate_grayscott.frag -l  

simulate_fluid:
	glslViewer simulate_fluid.frag -l  

screenshots:
	prime-run glslViewer math_functions.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/math_functions.jpg
	prime-run glslViewer math_gaussian.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/math_gaussian.jpg
	# prime-run glslViewer math_quat.frag math_quat.vert assets/suzanne.obj -w 512 -h 512 --noncurses --headless -E record,images/math_quat.gif,0.0,8.0

	# prime-run glslViewer animation_easing.frag -w 512 -h 512 --noncurses --headless -E record,images/animation_easing.gif,0.0,8.0
	# prime-run glslViewer animation_sprite.frag assets/sprite_megaman.png -w 512 -h 512 --noncurses --headless -E record,images/animation_sprite.gif,0.0,8.0

	prime-run glslViewer color_dither_bayer.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/color_dither_bayer.jpg
	prime-run glslViewer color_dither.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/color_dither.jpg
	prime-run glslViewer color_iridescence_map.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/color_iridescence_map.jpg
	prime-run glslViewer color_mix.frag assets/mixbox_lut.png -w 512 -h 512 --noncurses --headless -E screenshot,images/color_mix.jpg
	prime-run glslViewer color_lut.frag assets/danny.png assets/square_01.png -w 512 -h 512 --noncurses --headless -E screenshot,images/color_lut.jpg
	prime-run glslViewer color_wavelength.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/color_wavelength.jpg

	prime-run glslViewer distort_pincushion.frag assets/danny.png -l -w 512 -h 512 --noncurses --headless -E record,images/distort_pincushion.gif,0.0,3.0

	prime-run glslViewer draw_aa.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/draw_aa.jpg 
	prime-run glslViewer draw_digits.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/draw_digits.jpg
	prime-run glslViewer draw_julia.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/draw_julia.jpg
	prime-run glslViewer draw_mandelbulb.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/draw_mandelbulb.jpg
	prime-run glslViewer draw_shapes.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/draw_shapes.jpg
	prime-run glslViewer draw_supershape.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/draw_supershape.jpg
	prime-run glslViewer draw_tiles.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/draw_tiles.jpg

	prime-run glslViewer filter_bilateral2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_bilateral2D.jpg
	prime-run glslViewer filter_boxBlur1D.frag assets/danny.png -e buffers,on -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_boxBlur1D.jpg
	prime-run glslViewer filter_boxBlur2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_boxBlur2D.jpg
	prime-run glslViewer filter_edge2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_edge2D.jpg
	prime-run glslViewer filter_fibonacciBokeh.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_fibonacciBokeh.jpg
	prime-run glslViewer filter_gaussianBlur1D.frag assets/danny.png -e buffers,on -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_gaussianBlur1D.jpg
	prime-run glslViewer filter_gaussianBlur2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_gaussianBlur2D.jpg
	prime-run glslViewer filter_kuwahara2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_kuwahara2D.jpg
	prime-run glslViewer filter_laplacian2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_laplacian2D.jpg
	prime-run glslViewer filter_median2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_median2D.jpg
	prime-run glslViewer filter_noiseBlur2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_noiseBlur2D.jpg
	prime-run glslViewer filter_radialBlur2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_radialBlur2D.jpg
	prime-run glslViewer filter_sharpen2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_sharpen2D.jpg
	prime-run glslViewer filter_bilinear2D.frag assets/danny.png -w 512 -h 512 --noncurses --headless -E screenshot,images/filter_bilinear2D.jpg

	prime-run glslViewer generative_cnoise.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_cnoise.jpg
	prime-run glslViewer generative_curl.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_curl.jpg
	prime-run glslViewer generative_fbm.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_fbm.jpg
	prime-run glslViewer generative_noised.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_noised.jpg
	prime-run glslViewer generative_pnoise.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_pnoise.jpg
	prime-run glslViewer generative_psrdnoise.frag assets/sphere.ply -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_psrdnoise.jpg
	prime-run glslViewer generative_random.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_random.jpg
	prime-run glslViewer generative_snoise.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_snoise.jpg
	prime-run glslViewer generative_voronoi.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_voronoi.jpg
	prime-run glslViewer generative_voronoise.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_voronoise.jpg
	prime-run glslViewer generative_wavelet.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_wavelet.jpg
	prime-run glslViewer generative_worley.frag -w 512 -h 512 --noncurses --headless -E screenshot,images/generative_worley.jpg

	prime-run glslViewer lighting_atmosphere.frag -l -w 1080 -h 540 -e define,PROJECTION_MODE,0 --noncurses --headless --msaa -E screenshot,images/lighting_atmosphere_equirectangular.jpg
	prime-run glslViewer lighting_atmosphere.frag -l -w 512 -h 512 -e define,PROJECTION_MODE,1  --noncurses --headless --msaa -E screenshot,images/lighting_atmosphere_fisheye.jpg
	prime-run glslViewer assets/dragon.obj lighting_gooch.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_gooch.jpg
	prime-run glslViewer assets/dragon.obj lighting_normal.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_normal.jpg
	# prime-run glslViewer assets/dragon.obj lighting_pbrLittle_deferred.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_pbrLittle_deferred.jpg
	prime-run glslViewer assets/dragon.obj lighting_pbr.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_pbr.jpg
	prime-run glslViewer assets/dragon.obj lighting_pbr.frag -e camera_position,-1.43923,0.891203,1.98093 -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_pbr_cubemap.jpg 
	prime-run glslViewer assets/dragon.obj lighting_pbrClearCoat.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa --fxaa -w 512 -h 512 --noncurses --headless -E screenshot,images/lighting_pbrClearCoat.jpg 
	prime-run glslViewer assets/dragon.obj lighting_pbrClearCoat.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on --fxaa -w 512 -h 512 --noncurses --headless -E screenshot,images/lighting_pbrClearCoat_cubemap.jpg 
	prime-run glslViewer assets/dragon.obj lighting_pbrGlass.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_pbrGlass.jpg 
	prime-run glslViewer assets/dragon.obj lighting_pbrGlass.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -w 512 -h 512 --noncurses --headless --fxaa -E screenshot,images/lighting_pbrGlass_cubemap.jpg 
	prime-run glslViewer assets/dragon.obj lighting_pbrIridescence.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -w 512 -h 512 --noncurses --headless --fxaa -E screenshot,images/lighting_pbrIridescence.jpg 
	prime-run glslViewer assets/dragon.obj lighting_pbrIridescence.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -w 512 -h 512 --noncurses --headless --fxaa -E screenshot,images/lighting_pbrIridescence_cubemap.jpg 
	prime-run glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_pbrLittle.jpg
	prime-run glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,-1.43923,0.891203,1.98093 -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_pbrLittle_cubemap.jpg
	# prime-run glslViewer assets/dragon.obj lighting_pbrLittle_deferred.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_pbrLittle_deferred.jpg
	prime-run glslViewer assets/dragon.obj lighting_pbrSsS.frag -e camera_position,-1.43923,0.891203,1.98093 --msaa -w 512 -h 512 --noncurses --headless --fxaa -E screenshot,images/lighting_pbrSsS.jpg
	prime-run glslViewer assets/dragon.obj lighting_pbrSsS.frag -e camera_position,-1.43923,0.891203,1.98093 -C assets/Arches_E_PineTree_3k.hdr -e dynamic_shadows,on --msaa --fxaa -w 512 -h 512 --noncurses --headless -E screenshot,images/lighting_pbrSsS_cubemap.jpg
	prime-run glslViewer assets/dragon.obj lighting_position.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_position.jpg
	prime-run glslViewer lighting_raymarching_glass_refraction.frag -e camera_position,29.5393,26.2406,42.1865 -w 512 -h 512 --noncurses --headless -E screenshot,images/lighting_raymarching_glass_refraction.jpg
	prime-run glslViewer lighting_raymarching_glass_refraction.frag -e camera_position,29.5393,26.2406,42.1865 -c assets/Arches_E_PineTree_3k.hdr -w 512 -h 512 --noncurses --headless -e cubemap,on -E screenshot,images/lighting_raymarching_glass_refraction_cubemap.jpg
	prime-run glslViewer lighting_raymarching_glass.frag -e camera_position,29.5393,26.2406,42.1865 -w 512 -h 512 --noncurses --headless -E screenshot,images/lighting_raymarching_glass.jpg
	prime-run glslViewer lighting_raymarching_glass.frag -e camera_position,29.5393,26.2406,42.1865 -e cubemap,on -C assets/Arches_E_PineTree_3k.hdr -w 512 -h 512 --noncurses --headless -E screenshot,images/lighting_raymarching_glass_cubemap.jpg
	prime-run glslViewer lighting_raymarching_pbr.frag -e camera_position,29.5393,26.2406,42.1865 -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_raymarching_pbr.jpg
	prime-run glslViewer lighting_raymarching_pbr.frag -e camera_position,29.5393,26.2406,42.1865 -C assets/Arches_E_PineTree_3k.hdr -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_raymarching_pbr_cubemap.jpg
	prime-run glslViewer lighting_raymarching_volume.frag -e camera_position,29.5393,26.2406,42.1865 -w 512 -h 512 --noncurses --headless  -E screenshot,images/lighting_raymarching_volume.jpg
	prime-run glslViewer lighting_raymarching.frag -e camera_position,29.5393,26.2406,42.1865 -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_raymarching.jpg
	prime-run glslViewer assets/dragon.obj lighting_shadow.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_shadow.jpg
	prime-run glslViewer assets/dragon.obj lighting_sphereMap.frag assets/sem-glass-0003.jpg -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_sphereMap.jpg
	prime-run glslViewer assets/dragon.obj lighting_sphericalHarmonics.frag -e camera_position,-1.43923,0.891203,1.98093 -c assets/Arches_E_PineTree_3k.hdr -w 512 -h 512 --noncurses --headless --msaa --fxaa -e sky,on -E screenshot,images/lighting_sphericalHarmonics.jpg
	prime-run glslViewer assets/dragon.obj lighting_ssao.frag -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless --msaa --fxaa -E screenshot,images/lighting_ssao.jpg
	prime-run glslViewer assets/dragon.obj lighting_ssr.frag -e camera_position,-1.43923,0.891203,1.98093 -C assets/Arches_E_PineTree_3k.hdr -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_ssr.jpg
	prime-run glslViewer assets/dragon.obj lighting_volumetric.frag -e camera_position,-1.67433,0.0682091,-1.99539 -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_volumetric.jpg
	prime-run glslViewer assets/dragon.obj lighting_volumetric.frag -e camera_position,-1.67433,0.0682091,-1.99539 -C assets/Arches_E_PineTree_3k.hdr -w 512 -h 512 --noncurses --headless --msaa -E screenshot,images/lighting_volumetric_cubemap.jpg

	prime-run glslViewer morphological_alphaFill.frag assets/flower.png -w 512 -h 512 --noncurses --headless -E screenshot,images/morphological_alphaFill.jpg
	prime-run glslViewer morphological_dilation.frag assets/flower.png -w 512 -h 512 --noncurses --headless -E screenshot,images/morphological_dilation.jpg
	prime-run glslViewer morphological_erosion.frag assets/flower.png -w 512 -h 512 --noncurses --headless -E screenshot,images/morphological_erosion.jpg
	# prime-run glslViewer morphological_poissonFill.frag assets/flower.png -w 512 -h 512 --noncurses --headless -E record,images/morphological_poissonFill.gif,0.0,8.0
	prime-run glslViewer morphological_marchinSquares.frag assets/flower.png -w 512 -h 512 --noncurses --headless -E screenshot,images/morphological_marchinSquares.jpg
	
	prime-run glslViewer sample_3Dsdf.frag assets/suzanne.png -e camera_position,-29.5393,26.2406,-42.1865 -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_3Dsdf.jpg
	prime-run glslViewer sample_bracketing.frag assets/rock_moss.jpg -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_bracketing.jpg
	prime-run glslViewer sample_dof.frag assets/dragon.obj -C assets/Arches_E_PineTree_3k.hdr -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_dof.jpg
	prime-run glslViewer sample_equirect.frag assets/dragon.obj assets/studio.png -e defined,SCENE_CUBEMAP,u_tex0 -e camera_position,-1.43923,0.891203,1.98093 -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_equirect.jpg
	prime-run glslViewer sample_filter_bicubic.frag assets/noise_blue.png -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_filter_bicubic.jpg
	prime-run glslViewer sample_filter_nearest.frag assets/noise_blue.png -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_filter_nearest.jpg
	prime-run glslViewer sample_filter_smooth.frag assets/noise_blue.png -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_filter_smooth.jpg
	prime-run glslViewer sample_wrap.frag assets/rocks.png -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_wrap.jpg
	prime-run glslViewer sample_wrap_mirror.frag assets/rocks.png -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_wrap_mirror.jpg
	prime-run glslViewer sample_wrap_untile.frag assets/rocks.png -w 512 -h 512 --noncurses --headless -E screenshot,images/sample_wrap_untile.jpg


clean:
	rm images/*.jpg