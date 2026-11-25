import math
import struct

sample_rate = 44100
duration = 46.0
total_samples = int(sample_rate * duration)
bpm = 115
beat_sec = 60.0 / bpm

# Chords: Fm9 (F2, C3, Eb3, G3, Ab3) -> Dbmaj7 (Db2, Ab2, C3, F3) -> Bbm7 (Bb1, F2, Ab2, Db3) -> C7alt (C2, G2, Bb2, E3)
progression = [
    [87.31, 130.81, 155.56, 196.00, 207.65],  # Fm9
    [69.30, 103.83, 130.81, 174.61],          # Dbmaj7
    [58.27, 87.31, 103.83, 138.59],           # Bbm7
    [65.41, 98.00, 116.54, 164.81],           # C7
]
bar_sec = beat_sec * 4  # 4 beats = ~2.08s

audio = [0.0] * total_samples

for i in range(total_samples):
    t = i / sample_rate
    chord_idx = int(t / bar_sec) % len(progression)
    bar_time = t % bar_sec
    chord_freqs = progression[chord_idx]

    # 1. Dark Atmospheric Ambient Pad (Smooth, Warm, Tape-filtered)
    pad_env = math.sin(min(1.0, bar_time / 0.5) * (math.pi / 2)) * (0.8 + 0.2 * math.sin(t * 1.5))
    chord_val = 0.0
    for f in chord_freqs:
        tone = math.sin(2 * math.pi * f * t) * 0.4
        tone += math.sin(2 * math.pi * f * 2.0 * t) * 0.15
        tone += math.sin(2 * math.pi * (f * 1.002) * t) * 0.25 # lush chorus
        chord_val += tone
    chord_val = (chord_val / len(chord_freqs)) * pad_env * 0.20

    # 2. Deep 808 Sub-Bass (Punchy, solid low end)
    root_f = chord_freqs[0]
    beat_in_bar = (t % bar_sec) / beat_sec
    bass = 0.0
    # Hit on beat 1 and beat 3
    if beat_in_bar < 0.35 or (1.9 < beat_in_bar < 2.3):
        b_time = (t % (beat_sec * 2))
        b_env = math.exp(-b_time * 4.5)
        # Deep sub sweep 65Hz -> 38Hz
        freq = 38.0 + 25.0 * math.exp(-b_time * 20.0)
        bass = math.sin(2 * math.pi * freq * t) * b_env * 0.42

    # 3. Precision Clock Tick / Closed Hat (Iman Gadzhi style focus tick on 16th notes)
    tick_time = t % (beat_sec / 4)
    tick_env = math.exp(-tick_time * 140.0)
    tick = (math.sin(t * 38291.5) % 1.0 - 0.5) * tick_env * 0.045

    # 4. Soft Muted Kick on downbeats
    kick = 0.0
    if beat_in_bar < 0.2:
        k_time = t % bar_sec
        k_env = math.exp(-k_time * 22.0)
        kick = math.sin(2 * math.pi * 50.0 * t) * k_env * 0.35

    audio[i] = chord_val + bass + tick + kick

# Write WAV file
with open("remotion/public/iman_bg_track.wav", "wb") as f:
    num_channels = 2
    bits_per_sample = 16
    byte_rate = sample_rate * num_channels * (bits_per_sample // 8)
    block_align = num_channels * (bits_per_sample // 8)
    data_size = total_samples * block_align

    f.write(b"RIFF")
    f.write(struct.pack("<I", 36 + data_size))
    f.write(b"WAVE")
    f.write(b"fmt ")
    f.write(struct.pack("<I", 16))
    f.write(struct.pack("<H", 1))
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

print("Iman Gadzhi style soundtrack generated: remotion/public/iman_bg_track.wav")
