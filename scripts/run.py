#!/usr/bin/env python3

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import os
import sys
import json
import yaml
import argparse

from glslviewer import GlslViewer
from benchmark import benchmark

CONFIG_FILE = "config.yaml"
SCREENSHOT_FOLDER = "images"
BENCHMARK_FOLDER = "benchmarks"

def run(name, shader_config, run=True):
    shader = GlslViewer( name, shader_config )
    cmd = shader.getCommand() + " -l"
    print(cmd)
    if run:
        os.system(cmd)
    return cmd


def run_screenshot(name, shader_config, run=True):
    shader_config["headless"] = True
    shader_config["noncurses"] = True
    shader_config["wait"] = 3
    shader = GlslViewer( name, shader_config)
    output = SCREENSHOT_FOLDER + "/" + name + ".jpg"
    cmd = shader.getCommand() + " -E screenshot," + output
    # cmd = "prime-run " + cmd
    print(cmd)
    if run:
        os.system(cmd)
    return cmd


def run_benchmark(name, shader_config, folder):
    shader_config["width"] = 512
    shader_config["height"] = 512
    data = benchmark(name, shader_config, folder)
    with open(folder + "/" + name + ".json", 'w') as f:
        json.dump(data, f, indent=4)


def make_makefile(config):
    with open("Makefile", "w") as f:
        for example in config["examples"]:
            f.write(example + ":\n")
            f.write("\t" + run(example, config["examples"][example], False) + "\n\n")

        f.write("screenshots:\n")
        for example in config["examples"]:
            f.write("\tprime-run " + run_screenshot(example, config["examples"][example], False) + "\n")

        f.write("\nclean:\n")
        f.write("\trm images/*.jpg\n")
        

def make_readme(config):
    with open("README.md", "w") as f:
        f.write("""
# GLSL Viewer Examples
                
This are GLSL examples of how to use [LYGIA Shader Library](https://github.com/patriciogonzalezvivo/lygia). You can try them using:

* [glslViewer](https://github.com/patriciogonzalezvivo/glslViewer/wiki/Compiling)
* [glsl-canvas VS Code pluging](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)


## How to start?

Clone this repository recursivelly

```bash
git clone --recursive https://github.com/patriciogonzalezvivo/lygia_examples.git
```

""")

        for example in config["examples"]:
            f.write("## " + example + "\n")
            f.write("```bash\n")
            f.write(run(example, config["examples"][example], False) + "\n")
            f.write("```\n\n")
            f.write("![screenshot](images/" + example + ".jpg)\n\n")
            if example + "_tracks.jpg" in os.listdir("benchmarks"):
                f.write("![benchmark](benchmarks/" + example + "_tracks.jpg)\n\n")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', '-i', help="Input example. Default: 'all'`", type=str, default="all")

    parser.add_argument('--screenshot', '-s', help="Make a screenshot`", action='store_true')
    parser.add_argument('--benchmark', '-b', help="Run benchmark`", action='store_true')
    parser.add_argument('--makefile', '-m', help="Generate a Makefile`", action='store_true')
    parser.add_argument('--readme', '-r', help="Generate a README.md`", action='store_true')
    args = parser.parse_args()

    with open( CONFIG_FILE ) as f:
        config = yaml.load(f, Loader=yaml.FullLoader)

        if args.makefile:
            make_makefile(config)

        elif args.readme:
            make_readme(config)

        elif args.input == "all":
            for example in config["examples"]:

                if args.screenshot:
                    run_screenshot( example, config["examples"][example] )

                if args.benchmark:
                    run_benchmark( example, config["examples"][example], BENCHMARK_FOLDER)
                
                if not args.screenshot and not args.benchmark:
                #     run(config["examples"][example])
                    print("Please specify an example to run")

        else:
            example = args.input
            if example.endswith(".frag"):
                example = example[:-5]

            if example in config["examples"]:
                if args.screenshot:
                    run_screenshot(example, config["examples"][example] )

                if args.benchmark:
                    run_benchmark(example, config["examples"][example], BENCHMARK_FOLDER)

                if not args.screenshot and not args.benchmark:
                    run(example, config["examples"][example])

            else:
                print("Example not found in config file")
