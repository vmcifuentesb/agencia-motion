import math
import struct

sample_rate = 44100
duration = 15.0
total_samples = int(sample_rate * duration)
bpm = 128  # High-energy showreel tempo
beat_sec = 60.0 / bpm  # ~0.46875s per beat (32 beats in 15s)

# Bright Future-Bass / Motion Showreel Chord Progression (Fmaj9 -> G6 -> Em9 -> Am7)
chords = [
    [174.61, 220.00, 261.63, 329.63, 392.00],  # Fmaj9
    [196.00, 246.94, 293.66, 329.63, 392.00],  # G6
    [164.81, 196.00, 246.94, 293.66, 369.99],  # Em9
    [220.00, 261.63, 329.63, 392.00, 493.88],  # Am9
]

left = [0.0] * total_samples
right = [0.0] * total_samples

for i in range(total_samples):
    t = i / sample_rate
    beat_float = t / beat_sec
    beat_idx = int(beat_float)
    beat_frac = beat_float - beat_idx

    # 1. Punchy Showreel Kick on every beat
    kick = 0.0
    if beat_frac < 0.45:
        kt = beat_frac * beat_sec
        k_env = math.exp(-kt * 16.0)
        k_freq = 46.0 + 130.0 * math.exp(-kt * 32.0)
        kick = math.sin(2 * math.pi * k_freq * kt) * k_env * 0.55

    # 2. Snappy Clap / Snare on beats 1, 3, 5, 7...
    snare = 0.0
    if beat_idx % 2 == 1 and beat_frac < 0.35:
        st = beat_frac * beat_sec
        s_env = math.exp(-st * 24.0)
        noise = (math.sin(i * 12.9898) * 43758.5453) % 1.0 - 0.5
        body = math.sin(2 * math.pi * 190.0 * st) * math.exp(-st * 35.0)
        snare = (noise * 0.7 + body * 0.4) * s_env * 0.40

    # 3. Crisp 16th-note Hi-hat groove
    sub16 = (beat_float * 4.0) % 1.0
    ht = sub16 * (beat_sec / 4.0)
    h_env = math.exp(-ht * 95.0)
    hat_noise = ((math.sin(i * 78.233) * 19341.123) % 1.0 - 0.5)
    hat_gain = 0.14 if int(beat_float * 4.0) % 2 == 1 else 0.06
    hat = hat_noise * h_env * hat_gain

    # 4. Bright Future-Bass Supersaw Chords with Sidechain Pumping
    bar_idx = (beat_idx // 4) % len(chords)
    current_chord = chords[bar_idx]
    # Sidechain pump from the kick
    sidechain = 1.0 - 0.65 * math.exp(-beat_frac * 6.0)
    chord_l = 0.0
    chord_r = 0.0
    for idx_f, f in enumerate(current_chord):
        # Detuned stereo saws/sines
        osc1 = math.sin(2 * math.pi * f * t + 0.3 * math.sin(2 * math.pi * f * 2 * t))
        osc2 = math.sin(2 * math.pi * (f * 1.004) * t)
        osc3 = math.sin(2 * math.pi * (f * 0.996) * t)
        chord_l += (osc1 * 0.5 + osc2 * 0.5)
        chord_r += (osc1 * 0.5 + osc3 * 0.5)
    chord_l = (chord_l / len(current_chord)) * sidechain * 0.24
    chord_r = (chord_r / len(current_chord)) * sidechain * 0.24

    # 5. Funky Sub-Bass Groove
    root_f = current_chord[0] / 2.0
    bass_env = sidechain * 0.32
    bass = math.sin(2 * math.pi * root_f * t + 0.5 * math.sin(2 * math.pi * root_f * t)) * bass_env

    # 6. Arpeggio / Pluck Sparkle on 8th notes
    arp_idx = int(beat_float * 2.0) % len(current_chord)
    arp_frac = (beat_float * 2.0) % 1.0
    arp_t = arp_frac * (beat_sec / 2.0)
    arp_env = math.exp(-arp_t * 14.0)
    arp_freq = current_chord[arp_idx] * 2.0
    arp = math.sin(2 * math.pi * arp_freq * t) * arp_env * 0.14

    # 7. Scene Transition Whooshes at 3s, 6s, 9s, 12s
    whoosh = 0.0
    for trans_t in [3.0, 6.0, 9.0, 12.0]:
        dt = abs(t - trans_t)
        if dt < 0.25:
            w_env = math.cos((dt / 0.25) * (math.pi / 2.0)) ** 2
            w_freq = 220.0 + 900.0 * (1.0 - dt / 0.25)
            w_noise = ((math.sin(i * 45.164) * 91823.1) % 1.0 - 0.5) * 0.4
            whoosh += (math.sin(2 * math.pi * w_freq * t) * 0.35 + w_noise) * w_env * 0.45

    left[i] = kick + snare + hat * 0.8 + chord_l + bass + arp * 0.9 + whoosh
    right[i] = kick + snare + hat * 1.2 + chord_r + bass + arp * 1.1 + whoosh

output_path = "remotion/public/colorful_showreel_15s.wav"
with open(output_path, "wb") as f:
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

    for idx in range(total_samples):
        l_val = max(-0.96, min(0.96, left[idx]))
        r_val = max(-0.96, min(0.96, right[idx]))
        f.write(struct.pack("<hh", int(l_val * 32767), int(r_val * 32767)))

print(f"Generated {output_path}")
