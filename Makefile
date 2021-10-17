raymarching:
	glslViewer raymarching.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l

gooch:
	glslViewer assets/dragon.obj gooch.frag -e camera_position,1.43923,-0.891203,-1.98093 -l

pbrLittle:
	glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -l

pbrLittle_cubemap:
	glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -l 

pbr:
	glslViewer assets/dragon.obj pbr.frag -e camera_position,1.43923,-0.891203,-1.98093 -l

pbr_cubemap:
	glslViewer assets/dragon.obj pbr.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -l 
	