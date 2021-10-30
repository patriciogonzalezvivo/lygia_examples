
gooch:
	glslViewer assets/dragon.obj gooch.frag -e camera_position,1.43923,-0.891203,-1.98093 -l

pbrLittle:
	glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -l

pbrLittle_cubemap:
	glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -l 

raymarching:
	glslViewer raymarching.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l

raymarching_pbr:
	glslViewer raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l

raymarching_pbr_cubemap:
	glslViewer raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -c assets/uffizi_cross.hdr -l

raymarching_glass:
	glslViewer raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l

raymarching_glass_cubemap:
	glslViewer raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -c assets/uffizi_cross.hdr -l

screenshots:
	glslViewer assets/dragon.obj gooch.frag -e camera_position,1.43923,-0.891203,-1.98093 -w 1080 -h 1080 --headless --msaa --fxaa -E screenshot,images/gooch.jpg
	glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -w 1080 -h 1080 --headless --msaa --fxaa -E screenshot,images/pbrLittle.jpg
	glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -w 1080 -h 1080 --headless --msaa --fxaa -E screenshot,images/pbrLittle_cubemap.jpg
	glslViewer raymarching.frag -e camera_position,-29.5393,-26.2406,-42.1865 -w 1080 -h 1080 --headless --msaa -E screenshot,images/raymarching.jpg
	glslViewer raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -w 1080 -h 1080 --headless --msaa -E screenshot,images/raymarching_pbr.jpg
	glslViewer raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -C assets/uffizi_cross.hdr -w 1080 -h 1080 --headless --msaa -E screenshot,images/raymarching_pbr_cubemap.jpg

# pbr:
# 	glslViewer assets/dragon.obj pbr.frag -e camera_position,1.43923,-0.891203,-1.98093 -l

# pbr_cubemap:
# 	glslViewer assets/dragon.obj pbr.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -l 
	