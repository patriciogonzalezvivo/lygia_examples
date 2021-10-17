# Lygia examples

You can try this examples with

* [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)
* [glsl-canvas VS Code pluging](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)
* ...


## How to start?

Clone this repository recursivelly

```bash
git clone --recursive https://github.com/patriciogonzalezvivo/lygia_examples.git
```

## Try some 3D examples

```bash
glslViewer raymarching.frag -e camera_position,-29.5393,-26.2406,-42.1865 -l
```

![](images/raymarching.jpg)


```bash
glslViewer assets/dragon.obj gooch.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/gooch.jpg)

```bash
glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -l
```

![](images/pbrLittle.jpg)

```bash
glslViewer assets/dragon.obj pbrLittle.frag -e camera_position,1.43923,-0.891203,-1.98093 -C assets/uffizi_cross.hdr -e dynamic_shadows,on -l 
```

![](images/pbrLittle_cubemap.jpg)