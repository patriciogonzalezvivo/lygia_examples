#!/usr/bin/env python3

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import numpy as np

def get_median_filtered(signal, threshold=3):
    """
    signal: is numpy array-like
    returns: signal, numpy array
    """
    difference = np.abs(signal - np.median(signal))
    median_difference = np.median(difference)
    s = 0 if median_difference == 0 else difference / float(median_difference)
    mask = s > threshold
    signal[mask] = np.median(signal)
    return signal


class Sample:
    def __init__(self, timestamp, duration):
        self.timestamp = timestamp
        self.duration = duration
        self.delta  = 0


class Track:
    def __init__(self, name):
        self.name = name
        self.samples = []

        self.deltas_smooth = []
        self.delta_median = 0
        self.delta_mean = 0
        self.deltas_processed = False

        self.durations_smooth = []
        self.duration_median = 0
        self.duration_mean = 0

    def getTimestampsMs(self):
        return [sample.timestamp for sample in self.samples]

    def getTimestampsSec(self):
        return [sample.timestamp * 0.001 for sample in self.samples]

    def getDurations(self):
        return [sample.duration for sample in self.samples]

    def getDeltas(self):
        if not self.deltas_processed:
            self.processDeltas()

        return [sample.delta for sample in self.samples]

    def processDeltas(self):

        deltas = []
        for i in range(1, len(self.samples)):
            self.samples[i].delta = self.samples[i].timestamp - self.samples[i-1].timestamp

            deltas.append(self.samples[i].delta)

        deltas[0] = deltas[1]

        self.deltas_processed = True

        self.deltas_smooth = get_median_filtered( np.array(deltas) )
        self.delta_median = np.median(deltas)
        self.delta_mean = np.mean(deltas)

    def addSample(self, sample: Sample):
        self.samples.append( sample )


    def processDurations(self):
        durations = self.getDurations()
        self.durations_smooth = get_median_filtered( np.array(durations), 10.001 )
        self.duration_median = np.median(durations)
        self.duration_mean = np.mean(durations)
    


class Tracker:
    def __init__(self, name: str):
        self.name = name
        self.tracks = {}
        self.timestamp = []
        self.deltas = []
        self.deltas_smooth = []
        self.delta_median = 0
        self.delta_median = 0


    def load(self, filename):
        import csv

        with open(filename, newline='') as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:
                self.addSample(row['track'], Sample( float(row['timeStampMs']), float(row['durationMs'])) )
            
            self.processDeltas()


    def getTracks(self):
        return self.tracks.keys()


    def addSample(self, track_name: str, sample: Sample): 
        if not track_name in self.tracks:
            self.tracks[track_name] = Track(track_name)

        self.tracks[track_name].addSample( sample )


    def processDeltas(self):
        # samples = []
        # for track in self.tracks:
        #     self.tracks[track].processDeltas()
        #     for sample in self.tracks[track].samples:
        #         samples.append( [sample.timestamp, sample.delta] )

        # samples = sorted(samples, key=lambda x: x[0] )
        
        # self.timestamps = [delta_sample[0] for delta_sample in samples]
        # self.deltas = [delta_sample[1] for delta_sample in samples]

        self.tracks["render"].processDeltas()
        self.timestamps = [ sample.timestamp for sample in self.tracks["render"].samples ]
        self.deltas = [ sample.delta for sample in self.tracks["render"].samples ]

        self.delta_mean = np.mean(self.deltas)
        self.delta_median = np.median(self.deltas)
        self.deltas_smooth = get_median_filtered( np.array(self.deltas), 1 )


    def getFramerateLog(self):
        log_frame = {}
        log_frame['name'] = self.name + ":frame"
        log_frame['data'] = []
        log_frame['mean'] = self.delta_mean
        log_frame['median'] = self.delta_median
        sample_time = self.timestamps 
        sample_data = self.deltas

        for i in range(1, len(sample_time)):
            if  sample_data[i] > 0.0 and sample_data[i] != sample_data[i-1]:
                log_frame['data'].append({
                    'sec': sample_time[i] * 0.001,
                    'val': sample_data[i]
                })

        return log_frame


    def plotFramerate(self, name: str ):
        import matplotlib.pyplot as plt

        for track_name in self.tracks:
            if track_name == "render":
                self.tracks[track_name].processDurations()
                plt.xlabel("Timestamp Sec")
                plt.ylabel("Duration Ms")
                plt.plot(   self.tracks[track_name].getTimestampsSec(), 
                            self.tracks[track_name].durations_smooth,
                            linewidth=1,
                            label=str(track_name[7:]) )
                plt.legend()

        plt.savefig(name + '.png')
        plt.close()


    def plotTracks(self, filename: str ):
        import matplotlib.pyplot as plt

        for track_name in self.tracks:
            if track_name == "render":
                continue

            self.tracks[track_name].processDurations()
            plt.xlabel("Timestamp Sec")
            plt.ylabel("Duration Ms")
            plt.plot(   self.tracks[track_name].getTimestampsSec(), 
                        self.tracks[track_name].durations_smooth,
                        linewidth=1,
                        label=str(track_name[7:]) )
            plt.legend()

        plt.savefig(filename)
        plt.close()

