You can try this examples with

* [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)
* [glsl-canvas VS Code pluging](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)
* ...


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

