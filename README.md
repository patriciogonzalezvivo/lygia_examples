
# GLSL Viewer Examples
                
This are GLSL examples of how to use [LYGIA Shader Library](https://github.com/patriciogonzalezvivo/lygia). You can try them using:

* [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)
* [glsl-canvas VS Code pluging](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)


## How to start?

Clone this repository recursivelly

```bash
git clone --recursive https://github.com/patriciogonzalezvivo/lygia_examples.git
```

## Examples
                
### math_functions
```bash
glslViewer math_functions.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/math_functions.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 16.783909242424244 | 16.773925999999847 | ![plot](benchmarks/math_functions-V3D.jpg) |


### math_gaussian
```bash
glslViewer math_gaussian.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/math_gaussian.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.511047384966632 | 3.4379879999996774 | ![plot](benchmarks/math_gaussian-V3D.jpg) |


### math_quat
```bash
glslViewer math_quat.frag assets/suzanne.obj math_quat.vert --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/math_quat.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.124212485561056 | 4.071532499999876 | ![plot](benchmarks/math_quat-V3D.jpg) |


### animation_easing
```bash
glslViewer animation_easing.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/animation_easing.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 5.422414016820402 | 5.398924999999963 | ![plot](benchmarks/animation_easing-V3D.jpg) |


### animation_sprite
```bash
glslViewer animation_sprite.frag assets/sprite_megaman.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/animation_sprite.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.9646592645775485 | 4.023926000000756 | ![plot](benchmarks/animation_sprite-V3D.jpg) |


### color_brightnessContrast
```bash
glslViewer color_brightnessContrast.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_brightnessContrast.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.2684607995421846 | 3.235106999999971 | ![plot](benchmarks/color_brightnessContrast-V3D.jpg) |


### color_brightnessContrastMatrix
```bash
glslViewer color_brightnessContrastMatrix.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_brightnessContrastMatrix.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.2700958004579657 | 3.236084000000119 | ![plot](benchmarks/color_brightnessContrastMatrix-V3D.jpg) |


### color_mix
```bash
glslViewer color_mix.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_mix.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 19.89188217928287 | 19.892943999999943 | ![plot](benchmarks/color_mix-V3D.jpg) |


### color_lut
```bash
glslViewer color_lut.frag assets/danny.png assets/square_01.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_lut.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.93947265983445 | 3.911132000000009 | ![plot](benchmarks/color_lut-V3D.jpg) |


### color_dither
```bash
glslViewer color_dither.frag -u_noise assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_dither.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.4483735636426354 | 3.427001999999902 | ![plot](benchmarks/color_dither-V3D.jpg) |


### sample_dither
```bash
glslViewer sample_dither.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_dither.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 5.67916245909091 | 5.654051999999922 | ![plot](benchmarks/sample_dither-V3D.jpg) |


### color_iridescence_map
```bash
glslViewer color_iridescence_map.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_iridescence_map.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.046378514979756 | 4.022949000000153 | ![plot](benchmarks/color_iridescence_map-V3D.jpg) |


### color_wavelength
```bash
glslViewer color_wavelength.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wavelength.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 9.779359523996082 | 9.762939000000188 | ![plot](benchmarks/color_wavelength-V3D.jpg) |


### color_wada
```bash
glslViewer color_wada.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 6.838548569083448 | 6.858885999999984 | ![plot](benchmarks/color_wada-V3D.jpg) |


### color_wada_dyads
```bash
glslViewer color_wada_dyads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada_dyads.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 6.356348557251909 | 6.473876999999902 | ![plot](benchmarks/color_wada_dyads-V3D.jpg) |


### color_wada_triads
```bash
glslViewer color_wada_triads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada_triads.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 6.372831072066326 | 6.518066000000545 | ![plot](benchmarks/color_wada_triads-V3D.jpg) |


### color_wada_tetrads
```bash
glslViewer color_wada_tetrads.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_wada_tetrads.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 6.375011521683674 | 6.451904000000468 | ![plot](benchmarks/color_wada_tetrads-V3D.jpg) |


### color_pigments
```bash
glslViewer color_pigments.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_pigments.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 6.223853527725856 | 6.187989000000016 | ![plot](benchmarks/color_pigments-V3D.jpg) |


### color_palette_lerp
```bash
glslViewer color_palette_lerp.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_palette_lerp.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 5.196802481539262 | 5.176026000000093 | ![plot](benchmarks/color_palette_lerp-V3D.jpg) |


### color_ryb
```bash
glslViewer color_ryb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_ryb.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 12.157060832116787 | 12.147094999999808 | ![plot](benchmarks/color_ryb-V3D.jpg) |


### color_zorn
```bash
glslViewer color_zorn.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_zorn.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.9379483609141057 | 3.9169929999993656 | ![plot](benchmarks/color_zorn-V3D.jpg) |


### color_mix_ryb
```bash
glslViewer color_mix_ryb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/color_mix_ryb.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.7578883124060147 | 3.7380370000000767 | ![plot](benchmarks/color_mix_ryb-V3D.jpg) |


### distort_pincushion
```bash
glslViewer distort_pincushion.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/distort_pincushion.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.4516628735529835 | 4.490966999999841 | ![plot](benchmarks/distort_pincushion-V3D.jpg) |


### draw_digits
```bash
glslViewer draw_digits.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_digits.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 6.005568430889422 | 5.984130999999934 | ![plot](benchmarks/draw_digits-V3D.jpg) |


### draw_aa
```bash
glslViewer draw_aa.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_aa.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.373160615048119 | 4.351807000000008 | ![plot](benchmarks/draw_aa-V3D.jpg) |


### draw_shapes
```bash
glslViewer draw_shapes.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_shapes.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 5.942745539833531 | 5.920165999999881 | ![plot](benchmarks/draw_shapes-V3D.jpg) |


### draw_supershape
```bash
glslViewer draw_supershape.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_supershape.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.575002705128205 | 4.553955000000315 | ![plot](benchmarks/draw_supershape-V3D.jpg) |


### draw_tiles
```bash
glslViewer draw_tiles.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_tiles.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.7156973345724906 | 3.6940919999997277 | ![plot](benchmarks/draw_tiles-V3D.jpg) |


### draw_koch
```bash
glslViewer draw_koch.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_koch.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.1646507770833345 | 4.146972000000005 | ![plot](benchmarks/draw_koch-V3D.jpg) |


### draw_julia
```bash
glslViewer draw_julia.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_julia.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 63.787871532051284 | 64.14941399999992 | ![plot](benchmarks/draw_julia-V3D.jpg) |


### draw_mandelbulb
```bash
glslViewer draw_mandelbulb.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_mandelbulb.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 1314.9866536666668 | 1566.3020020000004 | ![plot](benchmarks/draw_mandelbulb-V3D.jpg) |


### draw_colorChecker
```bash
glslViewer draw_colorChecker.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/draw_colorChecker.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 13.52185504600812 | 13.523926000000074 | ![plot](benchmarks/draw_colorChecker-V3D.jpg) |


### generative_random
```bash
glslViewer generative_random.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_random.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.1789634620031793 | 3.1049800000000687 | ![plot](benchmarks/generative_random-V3D.jpg) |


### generative_cnoise
```bash
glslViewer generative_cnoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_cnoise.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 11.98763880552221 | 11.979003999999804 | ![plot](benchmarks/generative_cnoise-V3D.jpg) |


### generative_pnoise
```bash
glslViewer generative_pnoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_pnoise.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 13.06147971503268 | 13.060059000000365 | ![plot](benchmarks/generative_pnoise-V3D.jpg) |


### generative_snoise
```bash
glslViewer generative_snoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_snoise.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 8.948128211469534 | 8.934081999999762 | ![plot](benchmarks/generative_snoise-V3D.jpg) |


### generative_psrdnoise
```bash
glslViewer generative_psrdnoise.frag assets/sphere.ply --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_psrdnoise.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 10.83108354989154 | 10.807129000000032 | ![plot](benchmarks/generative_psrdnoise-V3D.jpg) |


### generative_noised
```bash
glslViewer generative_noised.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_noised.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 13.974844979020977 | 13.975097999999889 | ![plot](benchmarks/generative_noised-V3D.jpg) |


### generative_curl
```bash
glslViewer generative_curl.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_curl.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 90.68111874311926 | 91.4941400000007 | ![plot](benchmarks/generative_curl-V3D.jpg) |


### generative_fbm
```bash
glslViewer generative_fbm.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_fbm.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 27.49757747790055 | 27.552002000000357 | ![plot](benchmarks/generative_fbm-V3D.jpg) |


### generative_voronoi
```bash
glslViewer generative_voronoi.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_voronoi.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 28.418783943019942 | 28.472899999999754 | ![plot](benchmarks/generative_voronoi-V3D.jpg) |


### generative_voronoise
```bash
glslViewer generative_voronoise.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_voronoise.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 101.56076610204083 | 102.54504399999973 | ![plot](benchmarks/generative_voronoise-V3D.jpg) |


### generative_wavelet
```bash
glslViewer generative_wavelet.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_wavelet.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 9.633942091610416 | 9.6281740000004 | ![plot](benchmarks/generative_wavelet-V3D.jpg) |


### generative_worley
```bash
glslViewer generative_worley.frag --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/generative_worley.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 23.94787714903846 | 23.980469000000312 | ![plot](benchmarks/generative_worley-V3D.jpg) |


### filter_boxBlur1D
```bash
glslViewer filter_boxBlur1D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_boxBlur1D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 14.695885278350515 | 14.692871000000196 | ![plot](benchmarks/filter_boxBlur1D-V3D.jpg) |


### filter_boxBlur2D
```bash
glslViewer filter_boxBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_boxBlur2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 68.6612989652778 | 69.13500999999997 | ![plot](benchmarks/filter_boxBlur2D-V3D.jpg) |


### filter_fibonacciBokeh
```bash
glslViewer filter_fibonacciBokeh.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_fibonacciBokeh.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 64.60022765584415 | 65.00854449999997 | ![plot](benchmarks/filter_fibonacciBokeh-V3D.jpg) |


### filter_gaussianBlur1D
```bash
glslViewer filter_gaussianBlur1D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_gaussianBlur1D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 16.22086205357143 | 16.21704099999988 | ![plot](benchmarks/filter_gaussianBlur1D-V3D.jpg) |


### filter_gaussianBlur2D
```bash
glslViewer filter_gaussianBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_gaussianBlur2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 77.65952300781251 | 78.2545170000003 | ![plot](benchmarks/filter_gaussianBlur2D-V3D.jpg) |


### filter_bilateral2D
```bash
glslViewer filter_bilateral2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_bilateral2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 96.04395241747574 | 97.00610300000153 | ![plot](benchmarks/filter_bilateral2D-V3D.jpg) |


### filter_radialBlur2D
```bash
glslViewer filter_radialBlur2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_radialBlur2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 25.24421479493671 | 25.269043000000238 | ![plot](benchmarks/filter_radialBlur2D-V3D.jpg) |


### filter_noiseBlur2D
```bash
glslViewer filter_noiseBlur2D.frag -u_tex0 assets/danny.png -u_noise assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_noiseBlur2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 7.690558806004618 | 7.680908000000272 | ![plot](benchmarks/filter_noiseBlur2D-V3D.jpg) |


### filter_median2D
```bash
glslViewer filter_median2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_median2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 37.379973676691726 | 37.48706099999981 | ![plot](benchmarks/filter_median2D-V3D.jpg) |


### filter_kuwahara2D
```bash
glslViewer filter_kuwahara2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_kuwahara2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 193.53437990000003 | 197.45288100000016 | ![plot](benchmarks/filter_kuwahara2D-V3D.jpg) |


### filter_sharpen2D
```bash
glslViewer filter_sharpen2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_sharpen2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 18.388167406998157 | 18.390136999999413 | ![plot](benchmarks/filter_sharpen2D-V3D.jpg) |


### filter_laplacian2D
```bash
glslViewer filter_laplacian2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_laplacian2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 5.179741893782383 | 5.152099500000077 | ![plot](benchmarks/filter_laplacian2D-V3D.jpg) |


### filter_edge2D
```bash
glslViewer filter_edge2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_edge2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 6.7799267713704205 | 6.765991499999927 | ![plot](benchmarks/filter_edge2D-V3D.jpg) |


### filter_bilinear2D
```bash
glslViewer filter_bilinear2D.frag assets/danny.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/filter_bilinear2D.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 313.3211945483871 | 323.812011 | ![plot](benchmarks/filter_bilinear2D-V3D.jpg) |


### sample_dof
```bash
glslViewer sample_dof.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/sample_dof.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 206.28929137500003 | 210.46704100000034 | ![plot](benchmarks/sample_dof-V3D.jpg) |


### sample_bracketing
```bash
glslViewer sample_bracketing.frag assets/rock_moss.jpg --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_bracketing.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 20.141433223790322 | 20.155028999999786 | ![plot](benchmarks/sample_bracketing-V3D.jpg) |


### sample_wrap
```bash
glslViewer sample_wrap.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.017077970659163 | 4.013550000000123 | ![plot](benchmarks/sample_wrap-V3D.jpg) |


### sample_wrap_repeat
```bash
glslViewer sample_wrap_repeat.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_repeat.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.086793988143908 | 4.091796500000328 | ![plot](benchmarks/sample_wrap_repeat-V3D.jpg) |


### sample_wrap_clamp
```bash
glslViewer sample_wrap_clamp.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_clamp.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.970107996028594 | 3.9885260000000926 | ![plot](benchmarks/sample_wrap_clamp-V3D.jpg) |


### sample_wrap_mirror
```bash
glslViewer sample_wrap_mirror.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_mirror.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.496538430499324 | 4.364012999999886 | ![plot](benchmarks/sample_wrap_mirror-V3D.jpg) |


### sample_wrap_untile
```bash
glslViewer sample_wrap_untile.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_untile.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 14.21294313960114 | 11.746094000000028 | ![plot](benchmarks/sample_wrap_untile-V3D.jpg) |


### sample_wrap_zero
```bash
glslViewer sample_wrap_zero.frag assets/rocks.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_wrap_zero.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.0914985898546243 | 3.072997999999643 | ![plot](benchmarks/sample_wrap_zero-V3D.jpg) |


### sample_filter_bicubic
```bash
glslViewer sample_filter_bicubic.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_filter_bicubic.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 4.343824451346655 | 4.289062000000513 | ![plot](benchmarks/sample_filter_bicubic-V3D.jpg) |


### sample_filter_nearest
```bash
glslViewer sample_filter_nearest.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_filter_nearest.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.207598326596086 | 3.1889650000002803 | ![plot](benchmarks/sample_filter_nearest-V3D.jpg) |


### sample_filter_smooth
```bash
glslViewer sample_filter_smooth.frag assets/noise_blue.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_filter_smooth.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 3.1999442948143404 | 3.1860350000006292 | ![plot](benchmarks/sample_filter_smooth-V3D.jpg) |


### sample_equirect
```bash
glslViewer sample_equirect.frag assets/dragon.obj assets/studio.png  -e camera_position,-1.43923,0.891203,1.98093  -e define,SCENE_CUBEMAP,u_tex0 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_equirect.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 32.66280017377049 | 32.44409199999973 | ![plot](benchmarks/sample_equirect-V3D.jpg) |


### sample_3Dsdf
```bash
glslViewer sample_3Dsdf.frag assets/suzanne.png  -e camera_position,-29.5393,26.2406,-42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_3Dsdf.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 575.9005126875 | 613.4965814999998 | ![plot](benchmarks/sample_3Dsdf-V3D.jpg) |


### sample_triplanar
```bash
glslViewer sample_triplanar.frag assets/suzanne.obj assets/rock_moss.jpg --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/sample_triplanar.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 13.720145425824175 | 13.608154500000182 | ![plot](benchmarks/sample_triplanar-V3D.jpg) |


### morphological_erosion
```bash
glslViewer morphological_erosion.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_erosion.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 2115.54449475 | 2818.0 | ![plot](benchmarks/morphological_erosion-V3D.jpg) |


### morphological_dilation
```bash
glslViewer morphological_dilation.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_dilation.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 2113.56579575 | 2800.0140380000003 | ![plot](benchmarks/morphological_dilation-V3D.jpg) |


### morphological_alphaFill
```bash
glslViewer morphological_alphaFill.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_alphaFill.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 21.43885406021505 | 21.471923999999944 | ![plot](benchmarks/morphological_alphaFill-V3D.jpg) |


### morphological_poissonFill
```bash
glslViewer morphological_poissonFill.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_poissonFill.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 34.65882921254356 | 39.56884699999955 | ![plot](benchmarks/morphological_poissonFill-V3D.jpg) |


### morphological_marchinSquares
```bash
glslViewer morphological_marchinSquares.frag assets/flower.png --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/morphological_marchinSquares.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 5.067554564622403 | 5.051025999999979 | ![plot](benchmarks/morphological_marchinSquares-V3D.jpg) |


### lighting_position
```bash
glslViewer lighting_position.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_position.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 27.51197570441989 | 27.444580000000315 | ![plot](benchmarks/lighting_position-V3D.jpg) |


### lighting_normal
```bash
glslViewer lighting_normal.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_normal.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 10.415446387904067 | 10.166016000000127 | ![plot](benchmarks/lighting_normal-V3D.jpg) |


### lighting_gooch
```bash
glslViewer lighting_gooch.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_gooch.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 17.32920837326389 | 17.00097649999998 | ![plot](benchmarks/lighting_gooch-V3D.jpg) |


### lighting_pbrLittle
```bash
glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrLittle.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 17.533517510526316 | 17.20495600000004 | ![plot](benchmarks/lighting_pbrLittle-V3D.jpg) |


### lighting_pbrLittle_cubemap
```bash
glslViewer lighting_pbrLittle.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrLittle_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 41.30007921576764 | 41.25903299999999 | ![plot](benchmarks/lighting_pbrLittle_cubemap-V3D.jpg) |


### lighting_pbrLittle_deferred
```bash
glslViewer lighting_pbrLittle_deferred.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrLittle_deferred.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 54.272173010869565 | 53.39392049999992 | ![plot](benchmarks/lighting_pbrLittle_deferred-V3D.jpg) |


### lighting_pbr
```bash
glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbr.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 18.54513198141264 | 18.450439499999902 | ![plot](benchmarks/lighting_pbr-V3D.jpg) |


### lighting_pbr_cubemap
```bash
glslViewer lighting_pbr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbr_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 36.90450394074074 | 36.781006000000275 | ![plot](benchmarks/lighting_pbr_cubemap-V3D.jpg) |


### lighting_pbr_lights
```bash
glslViewer lighting_pbr_lights.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbr_lights.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 25.352725576142134 | 25.36840849999976 | ![plot](benchmarks/lighting_pbr_lights-V3D.jpg) |


### lighting_pbr_dynamic
```bash
glslViewer lighting_pbr_dynamic.frag assets/dragon.obj lighting_pbr_dynamic.vert  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbr_dynamic.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 581.0404124705883 | 617.1000979999999 | ![plot](benchmarks/lighting_pbr_dynamic-V3D.jpg) |


### lighting_pbrClearCoat
```bash
glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrClearCoat.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 21.35313503640257 | 21.288817999999992 | ![plot](benchmarks/lighting_pbrClearCoat-V3D.jpg) |


### lighting_pbrClearCoat_cubemap
```bash
glslViewer lighting_pbrClearCoat.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrClearCoat_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 44.48485783035715 | 44.47460999999987 | ![plot](benchmarks/lighting_pbrClearCoat_cubemap-V3D.jpg) |


### lighting_pbrIridescence
```bash
glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrIridescence.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 8.258077826446282 | 8.237060500000553 | ![plot](benchmarks/lighting_pbrIridescence-V3D.jpg) |


### lighting_pbrIridescence_cubemap
```bash
glslViewer lighting_pbrIridescence.frag assets/IridescenceSuzanne.glb  -e camera_position,-5.34446,3.96689,5.76653 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrIridescence_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 11.939168440860216 | 11.905029000000468 | ![plot](benchmarks/lighting_pbrIridescence_cubemap-V3D.jpg) |


### lighting_pbrGlass
```bash
glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrGlass.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 11.498899679723502 | 11.364990499999976 | ![plot](benchmarks/lighting_pbrGlass-V3D.jpg) |


### lighting_pbrGlass_cubemap
```bash
glslViewer lighting_pbrGlass.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrGlass_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 44.79905357207207 | 44.796996999999806 | ![plot](benchmarks/lighting_pbrGlass_cubemap-V3D.jpg) |


### lighting_pbrSsS
```bash
glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_pbrSsS.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 64.33532397402597 | 64.52490249999937 | ![plot](benchmarks/lighting_pbrSsS-V3D.jpg) |


### lighting_pbrSsS_cubemap
```bash
glslViewer lighting_pbrSsS.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_pbrSsS_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 66.66574526845638 | 67.08300799999961 | ![plot](benchmarks/lighting_pbrSsS_cubemap-V3D.jpg) |


### lighting_shadow
```bash
glslViewer lighting_shadow.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_shadow.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 53.902000632432426 | 54.12988300000052 | ![plot](benchmarks/lighting_shadow-V3D.jpg) |


### lighting_sphereMap_glass
```bash
glslViewer lighting_sphereMap.frag assets/sem-glass-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_glass.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 64.20122542580646 | 64.40698199999997 | ![plot](benchmarks/lighting_sphereMap_glass-V3D.jpg) |


### lighting_sphereMap_crystal
```bash
glslViewer lighting_sphereMap.frag assets/sem-glass-0004.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_crystal.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 67.80104863945579 | 68.15210000000025 | ![plot](benchmarks/lighting_sphereMap_crystal-V3D.jpg) |


### lighting_sphereMap_gold
```bash
glslViewer lighting_sphereMap.frag assets/sem-gold-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_gold.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 61.1531840184049 | 61.46215800000027 | ![plot](benchmarks/lighting_sphereMap_gold-V3D.jpg) |


### lighting_sphereMap_metal
```bash
glslViewer lighting_sphereMap.frag assets/sem-metal-0003.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_metal.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 61.8325286273292 | 62.096923999999944 | ![plot](benchmarks/lighting_sphereMap_metal-V3D.jpg) |


### lighting_sphereMap_dark_metal
```bash
glslViewer lighting_sphereMap.frag assets/sem-metal-0019.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_dark_metal.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 61.1156387791411 | 61.36401400000068 | ![plot](benchmarks/lighting_sphereMap_dark_metal-V3D.jpg) |


### lighting_sphereMap_iridescent
```bash
glslViewer lighting_sphereMap.frag assets/sem-0033.jpg assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_sphereMap_iridescent.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 61.05847242944786 | 61.339111 | ![plot](benchmarks/lighting_sphereMap_iridescent-V3D.jpg) |


### lighting_sphericalHarmonics
```bash
glslViewer lighting_sphericalHarmonics.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093  -e sky,on --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_sphericalHarmonics.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 55.210693361111105 | 55.47009300000036 | ![plot](benchmarks/lighting_sphericalHarmonics-V3D.jpg) |


### lighting_ssao
```bash
glslViewer lighting_ssao.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_ssao.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 76.36516864615386 | 76.86791999999991 | ![plot](benchmarks/lighting_ssao-V3D.jpg) |


### lighting_ssr
```bash
glslViewer lighting_ssr.frag assets/dragon.obj  -e camera_position,-1.43923,0.891203,1.98093 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_ssr.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 620.4948079999999 | 665.0170899999998 | ![plot](benchmarks/lighting_ssr-V3D.jpg) |


### lighting_volumetric
```bash
glslViewer lighting_volumetric.frag assets/dragon.obj  -e camera_position,-1.67433,0.0682091,-1.99539 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_volumetric.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 86.77642072807018 | 87.38159149999998 | ![plot](benchmarks/lighting_volumetric-V3D.jpg) |


### lighting_raymarching
```bash
glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 1161.42926025 | 1326.8914795 | ![plot](benchmarks/lighting_raymarching-V3D.jpg) |


### lighting_raymarching_cubemap
```bash
glslViewer lighting_raymarching.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 1161.764129625 | 1327.5004884999998 | ![plot](benchmarks/lighting_raymarching_cubemap-V3D.jpg) |


### lighting_raymarching_return
```bash
glslViewer lighting_raymarching_return.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_return.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 1188.9358825 | 1358.0830075 | ![plot](benchmarks/lighting_raymarching_return-V3D.jpg) |


### lighting_raymarching_gooch
```bash
glslViewer lighting_raymarching_gooch.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_gooch.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 249.71746043589744 | 256.3178719999996 | ![plot](benchmarks/lighting_raymarching_gooch-V3D.jpg) |


### lighting_raymarching_pbr
```bash
glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbr.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 259.93813343243244 | 267.16699200000005 | ![plot](benchmarks/lighting_raymarching_pbr-V3D.jpg) |


### lighting_raymarching_pbr_cubemap
```bash
glslViewer lighting_raymarching_pbr.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbr_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 253.38067949999999 | 260.2359620000001 | ![plot](benchmarks/lighting_raymarching_pbr_cubemap-V3D.jpg) |


### lighting_raymarching_pbrLittle
```bash
glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrLittle.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 248.23941433333334 | 254.75 | ![plot](benchmarks/lighting_raymarching_pbrLittle-V3D.jpg) |


### lighting_raymarching_pbrLittle_cubemap
```bash
glslViewer lighting_raymarching_pbrLittle.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrLittle_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 249.47936071794874 | 255.94116199999996 | ![plot](benchmarks/lighting_raymarching_pbrLittle_cubemap-V3D.jpg) |


### lighting_raymarching_pbrClearCoat
```bash
glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrClearCoat.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 259.8986750540541 | 267.07617200000004 | ![plot](benchmarks/lighting_raymarching_pbrClearCoat-V3D.jpg) |


### lighting_raymarching_pbrClearCoat_cubemap
```bash
glslViewer lighting_raymarching_pbrClearCoat.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrClearCoat_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 253.5797890263158 | 260.38146999999935 | ![plot](benchmarks/lighting_raymarching_pbrClearCoat_cubemap-V3D.jpg) |


### lighting_raymarching_pbrGlass
```bash
glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrGlass.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 195.0845166 | 199.06042500000012 | ![plot](benchmarks/lighting_raymarching_pbrGlass-V3D.jpg) |


### lighting_raymarching_pbrGlass_cubemap
```bash
glslViewer lighting_raymarching_pbrGlass.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrGlass_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 182.73037662264147 | 186.226807 | ![plot](benchmarks/lighting_raymarching_pbrGlass_cubemap-V3D.jpg) |


### lighting_raymarching_pbrIridescence
```bash
glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbrIridescence.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 259.8401076756757 | 266.98095700000067 | ![plot](benchmarks/lighting_raymarching_pbrIridescence-V3D.jpg) |


### lighting_raymarching_pbrIridescence_cubemap
```bash
glslViewer lighting_raymarching_pbrIridescence.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbrIridescence_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 253.27028939473684 | 260.1040035000001 | ![plot](benchmarks/lighting_raymarching_pbrIridescence_cubemap-V3D.jpg) |


### lighting_raymarching_volume
```bash
glslViewer lighting_raymarching_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_volume.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |


### lighting_raymarching_pbr_volume
```bash
glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_raymarching_pbr_volume.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |


### lighting_raymarching_pbr_volume_cubemap
```bash
glslViewer lighting_raymarching_pbr_volume.frag  -e camera_position,29.5393,26.2406,42.1865 --msaa --width 512 --height 512 -e dynamic_shadows,on -C assets/Arches_E_PineTree_3k.hdr -l
```

![screenshot](images/lighting_raymarching_pbr_volume_cubemap.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |


### lighting_atmosphere_equirectangular
```bash
glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,0 --msaa --width 1024 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_atmosphere_equirectangular.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 129.42670963157897 | 131.366943 | ![plot](benchmarks/lighting_atmosphere_equirectangular-V3D.jpg) |


### lighting_atmosphere_fisheye
```bash
glslViewer lighting_atmosphere.frag  -e define,PROJECTION_MODE,1 --msaa --width 512 --height 512 -e dynamic_shadows,on -l
```

![screenshot](images/lighting_atmosphere_fisheye.jpg)

| GPU | Mean | Median | plot 
| --- | --- | --- | --- |
| V3D | 160.01698578688524 | 168.28198199999997 | ![plot](benchmarks/lighting_atmosphere_fisheye-V3D.jpg) |


