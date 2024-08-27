#!/usr/bin/env python3

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import numpy as np
import subprocess
import json

from tracker import Tracker, Sample, get_median_filtered
from glslviewer import GlslViewer


def process_results(name, results):
    log = {}

    # Prepare averages
    sample_delta = []
    sample_time = []
    # prev_val = 0.0
    for sample in results:
        sample_time.append(sample['time'])
        sample_delta.append(sample['delta'])

    log['name'] = name
    log['data'] = []
    log['mean'] = np.mean(sample_delta)
    log['median'] = np.median(sample_delta)

    sample_data = get_median_filtered(np.array(sample_delta))

    # Get the first element
    prev_val = sample_data[0]
    log['data'].append({
        'sec': sample_time[0],
        'val': prev_val
    })

    for i in range(1, len(sample_time) - 1):
        sec = sample_time[i]
        val = sample_data[i]
        if prev_val != val:
            prev_val = val
            log['data'].append({
                'sec': sec,
                'val': val
            })

    # Get the last element
    log['data'].append({
        'sec': sample_time[-1],
        'val': sample_data[-1]
    })

    return log


def benchmark(name, shader_config, cwd = "./", gpu = "unknown"):
    # Set up the shader for benchmarking
    shader_config["headless"] = True
    shader_config["noncurses"] = True
    shader_config["fullFps"] = True

    # Set up the file names
    cvs_file = cwd + "/" + name + ".csv"
    jpg_file = cwd + "/" + name + "-" + gpu + ".jpg"
    json_file = cwd + "/" + name + "-" + gpu + ".json"
    
    # Set up the GlslViewer
    gv = GlslViewer(name, shader_config)

    # Do the tracking
    gv.cmd.append("-e wait,5")
    gv.cmd.append("-e track,on")
    gv.cmd.append("-e wait,10")
    gv.cmd.append("-e track,off")

    # Store the tracking data
    # gv.cmd.append("-e track,average")
    gv.cmd.append("-e track,samples," + cvs_file)
    gv.cmd.append("-E exit")

    cmd = gv.getCommand()
    print(cmd)
    
    subprocess.call(cmd, shell=True)

    tracks = Tracker(name)
    success = tracks.load(cvs_file)
    if not success:
        print("Error loading tracking data")
        return
    
    # remove CSV file
    subprocess.call("rm " + cvs_file, shell=True)

    tracks.plotTracks(jpg_file)

    with open(json_file, 'w') as f:
        data = tracks.getFramerateLog()
        data["gpu"] = gpu
        data["example"] = name
        json.dump(data, f, indent=4)

