import math
import struct

sample_rate = 44100
duration = 48.0
total_samples = int(sample_rate * duration)
bpm = 100
beat_sec = 60.0 / bpm

# Chords (frequencies in Hz)
# Cmaj7 (C3, E3, G3, B3) -> Am7 (A2, C3, E3, G3) -> Fmaj7 (F2, A2, C3, E3) -> G7sus4 (G2, C3, D3, F3)
progression = [
    [130.81, 164.81, 196.00, 246.94],  # Cmaj7
    [110.00, 130.81, 164.81, 196.00],  # Am7
    [87.31, 110.00, 130.81, 164.81],   # Fmaj7
    [98.00, 130.81, 146.83, 174.61],   # G7sus
]
chord_duration = beat_sec * 4  # 4 beats per chord = 2.4s

audio = [0.0] * total_samples

for i in range(total_samples):
    t = i / sample_rate
    chord_idx = int(t / chord_duration) % len(progression)
    chord_time = t % chord_duration
    chord_freqs = progression[chord_idx]
    
    # Chord envelope (soft attack, sustained, smooth release)
    env = math.sin(min(1.0, chord_time / 0.4) * (math.pi / 2)) * math.exp(-chord_time * 0.15)
    
    # Electric piano / warm pad tone
    chord_val = 0.0
    for f in chord_freqs:
        # fundamental + soft 2nd harmonic + slight detune for warmth
        tone = math.sin(2 * math.pi * f * t) * 0.5
        tone += math.sin(2 * math.pi * f * 2.0 * t) * 0.2
        tone += math.sin(2 * math.pi * (f + 0.3) * t) * 0.3
        chord_val += tone
    chord_val = (chord_val / len(chord_freqs)) * env * 0.25

    # Bassline (root note one octave down)
    root_f = chord_freqs[0] / 2.0
    bass_env = math.exp(-(chord_time % beat_sec) * 3.0) * 0.3
    bass = math.sin(2 * math.pi * root_f * t) * bass_env

    # Soft hi-hat tick on 8th notes
    hat_time = t % (beat_sec / 2)
    hat = (math.sin(t * 12345.67) % 1.0 - 0.5) * math.exp(-hat_time * 80.0) * 0.04

    # Soft kick on downbeats (beats 1 and 3)
    beat_in_bar = (t % (beat_sec * 4)) / beat_sec
    kick = 0.0
    if beat_in_bar < 0.25 or (1.9 < beat_in_bar < 2.25):
        k_time = (t % (beat_sec * 2))
        k_env = math.exp(-k_time * 18.0)
        kick = math.sin(2 * math.pi * (55.0 * math.exp(-k_time * 25.0) + 40.0) * t) * k_env * 0.3

    audio[i] = chord_val + bass + hat + kick

# Write WAV file
with open("remotion/public/ambient_bg.wav", "wb") as f:
    num_channels = 2
    bits_per_sample = 16
    byte_rate = sample_rate * num_channels * (bits_per_sample // 8)
    block_align = num_channels * (bits_per_sample // 8)
    data_size = total_samples * block_align
    
    # RIFF header
    f.write(b"RIFF")
    f.write(struct.pack("<I", 36 + data_size))
    f.write(b"WAVE")
    f.write(b"fmt ")
    f.write(struct.pack("<I", 16))
    f.write(struct.pack("<H", 1))  # PCM
    f.write(struct.pack("<H", num_channels))
    f.write(struct.pack("<I", sample_rate))
    f.write(struct.pack("<I", byte_rate))
    f.write(struct.pack("<H", block_align))
    f.write(struct.pack("<H", bits_per_sample))
    f.write(b"data")
    f.write(struct.pack("<I", data_size))
    
    for val in audio:
        clamped = max(-0.95, min(0.95, val))
        sample = int(clamped * 32767)
        f.write(struct.pack("<hh", sample, sample))

print("Ambient soundtrack generated successfully!")
