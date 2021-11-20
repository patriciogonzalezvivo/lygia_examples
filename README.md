This are GLSL examples of how to use [LYGIA Shader Library](https://github.com/patriciogonzalezvivo/lygia). You can try them using:

* [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)
* [glsl-canvas VS Code pluging](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)


## How to start?

Clone this repository recursivelly

```bash
git clone --recursive https://github.com/patriciogonzalezvivo/lygia_examples.git
```

# DRAW

#### Digits

```bash
glslViewer draw_digits.frag -l
```

![](images/draw_digits.jpg)


#### Filter

#### boxBlur 1D

```bash
	glslViewer filter_boxBlur1D.frag assets/danny.png -e buffers,on -l
```

![](images/filter_boxBlur1D.jpg)


#### boxBlur 2D

```bash
filter_boxBlur2D:
	glslViewer filter_boxBlur2D.frag assets/danny.png -l
```

![](images/filter_boxBlur2D.jpg)


#### GaussianBlur 1D

```bash
	glslViewer filter_gaussianBlur1D.frag assets/danny.png -e buffers,on -l
```

![](images/filter_gaussianBlur1D.jpg)


#### GaussianBlur 2D

```bash
	glslViewer filter_gaussianBlur2D.frag assets/danny.png -l
```

![](images/filter_gaussianBlur2D.jpg)


#### BilateralBlur 2D 

```bash
	glslViewer filter_bilateralBlur2D.frag assets/danny.png -l
```

![](images/filter_bilateralBlur2D.jpg)


#### RadialBlur 2D 

```bash
	glslViewer filter_radialBlur2D.frag assets/danny.png -l
```

![](images/filter_radialBlur2D.jpg)


#### NoiseBlur 2D 

```bash
	glslViewer filter_noiseBlur2D.frag assets/danny.png -l
```

![](images/filter_noiseBlur2D.jpg)


#### Median 2D 

```bash
	glslViewer filter_median2D.frag assets/danny.png -l
```

![](images/filter_median2D.jpg)


#### Kuwahara 2D 

```bash
	glslViewer filter_kuwahara2D.frag assets/danny.png -l
```

![](images/filter_kuwahara2D.jpg)


#### Sharpen 2D 

```bash
	glslViewer filter_sharpen2D.frag assets/danny.png -l
```

![](images/filter_sharpen2D.jpg)


#### Laplacian 2D 

```bash
	glslViewer filter_laplacian2D.frag assets/danny.png -l
```

![](images/filter_laplacian2D.jpg)


#### Edge 2D 

```bash
	glslViewer filter_edge2D.frag assets/danny.png -l
```

![](images/filter_edge2D.jpg)


# LIGHTING

#### Gooch

```bash
glslViewer assets/dragon.obj lighting_gooch.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/lighting_gooch.jpg)


#### PBR little 

```bash
glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/lighting_pbrLittle.jpg)


#### PBR little with cubemap

```bash
glslViewer assets/dragon.obj lighting_pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -l 
```

![](images/lighting_pbrLittle_cubemap.jpg)


#### Raymarching 

```bash
glslViewer lighting_raymarching.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l
```

![](images/lighting_raymarching.jpg)


#### Raymarching custom PBR

```bash
glslViewer lighting_raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l
```

![](images/lighting_raymarching_pbr.jpg)


#### Raymarching custom PBR with CUBEMAP

```bash
glslViewer lighting_raymarching_pbr.frag -e camera_position,-29.5393,-26.2406,-42.1865 -C assets/uffizi_cross.hdr -l
```

![](images/lighting_raymarching_pbr_cubemap.jpg)


#### Raymarching custom GLASS material

```bash
glslViewer lighting_raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l
```

![](images/lighting_raymarching_glass.jpg)


#### Raymarching custom GLASS material with CUBEMAP

```bash
glslViewer lighting_raymarching_glass.frag -e camera_position,-29.5393,-26.2406,-42.1865 -C assets/uffizi_cross.hdr -l
```

![](images/lighting_raymarching_glass_cubemap.jpg)


#### Raymarching efault VOLUME

```bash
glslViewer lighting_raymarching_volume.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l
```

![](images/lighting_raymarching_volume.jpg)

