draw_digits:
	glslViewer draw_digits.frag -l


color_mix:
	glslViewer color_mix.frag lygia/assets/mixbox_lut.png -l

filter_boxBlur1D:
	glslViewer filter_boxBlur1D.frag assets/danny.png -e buffers,on -l

filter_boxBlur2D:
	glslViewer filter_boxBlur2D.frag assets/danny.png -l


filter_gaussianBlur1D:
	glslViewer filter_gaussianBlur1D.frag assets/danny.png -e buffers,on -l

filter_gaussianBlur2D:
	glslViewer filter_gaussianBlur2D.frag assets/danny.png -l


filter_bilateralBlur2D:
	glslViewer filter_bilateralBlur2D.frag assets/danny.png -l


filter_radialBlur2D:
	glslViewer filter_radialBlur2D.frag assets/danny.png -l


filter_noiseBlur2D:
	glslViewer filter_noiseBlur2D.frag assets/danny.png -l


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


lighting_gooch:
	glslViewer assets/dragon.obj lighting_gooch.frag -e camera_position,1.43923,-0.891203,-1.98093 -l


lighting_pbrLittle:
	glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -l

lighting_pbrLittle_cubemap:
	glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -l 


lighting_raymarching:
	glslViewer lighting_raymarching.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l

lighting_raymarching_pbr:
	glslViewer lighting_raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l

lighting_raymarching_pbr_cubemap:
	glslViewer lighting_raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -c assets/uffizi_cross.hdr -l

lighting_raymarching_glass:
	glslViewer lighting_raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l

lighting_raymarching_glass_cubemap:
	glslViewer lighting_raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -c assets/uffizi_cross.hdr -l

lighting_raymarching_volume:
	glslViewer lighting_raymarching_volume.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l


screenshots:
	glslViewer draw_digits.frag -w 1080 -h 1080 --headless --msaa --fxaa -E screenshot,images/draw_digits.jpg

	glslViewer color_mix.frag lygia/assets/mixbox_lut.png -w 1080 -h 1080 --headless --msaa -E screenshot,images/color_mix.jpg

	glslViewer filter_boxBlur1D.frag assets/danny.png -e buffers,on --headless -E screenshot,images/filter_boxBlur1D.jpg
	glslViewer filter_boxBlur2D.frag assets/danny.png --headless -E screenshot,images/filter_boxBlur2D.jpg
	glslViewer filter_gaussianBlur1D.frag assets/danny.png -e buffers,on --headless -E screenshot,images/filter_gaussianBlur1D.jpg
	glslViewer filter_gaussianBlur2D.frag assets/danny.png --headless -E screenshot,images/filter_gaussianBlur2D.jpg
	glslViewer filter_bilateralBlur2D.frag assets/danny.png --headless -E screenshot,images/filter_bilateralBlur2D.jpg
	glslViewer filter_radialBlur2D.frag assets/danny.png --headless -E screenshot,images/filter_radialBlur2D.jpg
	glslViewer filter_noiseBlur2D.frag assets/danny.png --headless -E screenshot,images/filter_noiseBlur2D.jpg
	glslViewer filter_median2D.frag assets/danny.png --headless -E screenshot,images/filter_median2D.jpg
	glslViewer filter_kuwahara2D.frag assets/danny.png --headless -E screenshot,images/filter_kuwahara2D.jpg
	glslViewer filter_sharpen2D.frag assets/danny.png --headless -E screenshot,images/filter_sharpen2D.jpg
	glslViewer filter_laplacian2D.frag assets/danny.png --headless -E screenshot,images/filter_laplacian2D.jpg
	glslViewer filter_edge2D.frag assets/danny.png --headless -E screenshot,images/filter_edge2D.jpg

	glslViewer assets/dragon.obj lighting_gooch.frag -e camera_position,1.43923,-0.891203,-1.98093 -w 1080 -h 1080 --headless --msaa --fxaa -E screenshot,images/lighting_gooch.jpg
	glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -w 1080 -h 1080 --headless --msaa --fxaa -E screenshot,images/lighting_pbrLittle.jpg
	glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -w 1080 -h 1080 --headless --msaa --fxaa -E screenshot,images/lighting_pbrLittle_cubemap.jpg
	glslViewer lighting_raymarching.frag -e camera_position,-29.5393,-26.2406,-42.1865 -w 1080 -h 1080 --headless --msaa -E screenshot,images/lighting_raymarching.jpg
	glslViewer lighting_raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -w 1080 -h 1080 --headless --msaa -E screenshot,images/lighting_raymarching_pbr.jpg
	glslViewer lighting_raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -C assets/uffizi_cross.hdr -w 1080 -h 1080 --headless --msaa -E screenshot,images/lighting_raymarching_pbr_cubemap.jpg
	glslViewer lighting_raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -w 1080 -h 1080 --headless --msaa -E screenshot,images/lighting_raymarching_glass.jpg
	glslViewer lighting_raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -c assets/uffizi_cross.hdr -w 1080 -h 1080 --headless --msaa -E screenshot,images/lighting_raymarching_glass_cubemap.jpg
	glslViewer lighting_raymarching_volume.frag -e camera_position,-29.5393,-26.2406,-42.1865 -w 1080 -h 1080 --headless --msaa -E screenshot,images/lighting_raymarching_volume.jpg

clean:
	rm images/*.jpg