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

def run(name, shader_config):
    shader = GlslViewer( name, shader_config )
    print(shader.getCommand())
    os.system(shader.getCommand() + " -l")


def screenshot(name, shader_config):
    shader_config["headless"] = True
    shader_config["noncurses"] = True
    shader = GlslViewer( name, shader_config)
    output = SCREENSHOT_FOLDER + "/" + name + ".jpg"
    cmd = shader.getCommand() + " -E screenshot," + output
    # cmd = "prime-run " + cmd
    print(cmd)
    os.system(cmd)



if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', '-i', help="Input example. Default: 'all'`", type=str, default="all")

    parser.add_argument('--screenshot', '-s', help="Make a screenshot`", action='store_true')
    parser.add_argument('--benchmark', '-b', help="Run benchmark`", action='store_true')
    args = parser.parse_args()

    with open( CONFIG_FILE ) as f:
        config = yaml.load(f, Loader=yaml.FullLoader)

        if args.input == "all":
            for example in config["examples"]:

                if args.screenshot:
                    screenshot( example, config["examples"][example] )
                
                if args.benchmark:
                    benchmark( example, config["examples"][example], BENCHMARK_FOLDER)
                
                if not args.screenshot and not args.benchmark:
                #     run(config["examples"][example])
                    print("Please specify an example to run")

        else:
            example = args.input
            if example.endswith(".frag"):
                example = example[:-5]

            if example in config["examples"]:
                if args.screenshot:
                    screenshot( example, config["examples"][example] )

                if args.benchmark:
                    benchmark( example, config["examples"][example], BENCHMARK_FOLDER)

                if not args.screenshot and not args.benchmark:
                    run(example, config["examples"][example])

            else:
                print("Example not found in config file")