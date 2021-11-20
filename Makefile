draw_digits:
	glslViewer draw_digits.frag -l

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