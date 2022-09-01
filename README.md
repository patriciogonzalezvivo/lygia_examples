This are GLSL examples of how to use [LYGIA Shader Library](https://github.com/patriciogonzalezvivo/lygia). You can try them using:

* [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)
* [glsl-canvas VS Code pluging](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)


## How to start?

Clone this repository recursivelly

```bash
git clone --recursive https://github.com/patriciogonzalezvivo/lygia_examples.git
```

# COLOR 

#### OKLab and MixBox color mixing

```bash
glslViewer color_mix.frag lygia/assets/mixbox_lut.png -l
```

![](images/color_mix.jpg)

# DRAW

#### Digits

```bash
glslViewer draw_digits.frag -l
```

![](images/draw_digits.jpg)

# GENERATIVE


#### Random

```bash
glslViewer generative_random.frag 
```

![](images/generative_random.jpg)

#### Clasic Noise

```bash
glslViewer generative_cnoise.frag 
```

![](images/generative_cnoise.jpg)


#### Perlin Noise

```bash
glslViewer generative_pnoise.frag 
```

![](images/generative_pnoise.jpg)


#### Simplex Noise

```bash
glslViewer generative_snoise.frag 
```

![](images/generative_snoise.jpg)

#### Tiling Simplex Flow Noise

```bash
glslViewer generative_psrdnoise.frag assets/sphere.ply -l
```

![](images/generative_psrdnoise.jpg)

#### Simplex Noise Derivatives

```bash
glslViewer generative_noised.frag 
```

![](images/generative_noised.jpg)


#### Curl Noise

```bash
glslViewer generative_curl.frag 
```
![](images/generative_curl.jpg)



#### Fractal Brownian Motion

```bash
glslViewer generative_fbm.frag 
```

![](images/generative_fbm.jpg)


#### Voronoi

```bash
glslViewer generative_voronoi.frag 
```

![](images/generative_voronoi.jpg)


#### Worley Noise

```bash
glslViewer generative_worley.frag 
```

![](images/generative_worley.jpg)


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

#### View Position

```bash
glslViewer assets/dragon.obj lighting_position.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/lighting_position.jpg)

#### View Normal

```bash
glslViewer assets/dragon.obj lighting_normal.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/lighting_normal.jpg)

#### Shadow

```bash
glslViewer assets/dragon.obj lighting_shadow.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/lighting_shadow.jpg)


#### Spherical Harmonics

```bash
glslViewer assets/dragon.obj lighting_sphericalHarmonics.frag -e camera_position,1.43923,-0.891203,-1.98093 -c assets/uffizi_cross.hdr -l
```

![](images/lighting_sphericalHarmonics.jpg)

#### ScreenSpace Ambient Occlusion

```bash
glslViewer assets/dragon.obj lighting_ssao.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/lighting_ssao.jpg)

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

#### ScreenSpace Reflections

```bash
glslViewer assets/dragon.obj lighting_ssr.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -l 
```

![](images/lighting_ssr.jpg)


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

#### Atmosphere Scatering

```bash
glslViewer lighting_atmosphere.frag -l -w 1024 -h 512 -e define,PROJECTION_MODE,0
```

![](images/lighting_atmosphere_equirectangular.jpg)


```bash
glslViewer lighting_atmosphere.frag -l -e define,PROJECTION_MODE,1
```

![](images/lighting_atmosphere_fisheye.jpg)
