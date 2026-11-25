import os
import math
import struct

os.makedirs("remotion/public/sfx", exist_ok=True)
sample_rate = 44100

def write_wav(filename, samples):
    with open(f"remotion/public/sfx/{filename}", "wb") as f:
        data_size = len(samples) * 2  # 16-bit mono
        f.write(b"RIFF")
        f.write(struct.pack("<I", 36 + data_size))
        f.write(b"WAVE")
        f.write(b"fmt ")
        f.write(struct.pack("<I", 16))
        f.write(struct.pack("<H", 1))  # PCM
        f.write(struct.pack("<H", 1))  # Mono
        f.write(struct.pack("<I", sample_rate))
        f.write(struct.pack("<I", sample_rate * 2))
        f.write(struct.pack("<H", 2))
        f.write(struct.pack("<H", 16))
        f.write(b"data")
        f.write(struct.pack("<I", data_size))
        for s in samples:
            clamped = max(-0.95, min(0.95, s))
            f.write(struct.pack("<h", int(clamped * 32767)))

# 1. POP (Bubbly, cheerful pop-in: 100ms)
dur = 0.12
samples = []
total = int(sample_rate * dur)
for i in range(total):
    t = i / sample_rate
    prog = i / total
    freq = 750 * math.exp(-prog * 8.0) + 120
    env = math.sin(prog * math.pi) * math.exp(-prog * 12.0)
    samples.append(math.sin(2 * math.pi * freq * t) * env * 0.8)
write_wav("pop.wav", samples)

# 2. WHOOSH (Air whip pan transition: 250ms)
dur = 0.28
samples = []
total = int(sample_rate * dur)
for i in range(total):
    t = i / sample_rate
    prog = i / total
    # Bell curve envelope
    env = math.sin(prog * math.pi) ** 2
    # Filtered noise + low sine sweep
    noise = (math.sin(t * 19482.3) % 1.0 - 0.5) * 0.4
    sweep = math.sin(2 * math.pi * (100 + 400 * math.sin(prog * math.pi)) * t) * 0.4
    samples.append((noise + sweep) * env * 0.85)
write_wav("whoosh.wav", samples)

# 3. BOING (Funny cartoon spring bounce: 350ms)
dur = 0.38
samples = []
total = int(sample_rate * dur)
for i in range(total):
    t = i / sample_rate
    prog = i / total
    # Vibrato rate and depth
    vib = math.sin(2 * math.pi * 18 * t) * 60
    freq = 240 + vib + (120 * prog)
    env = math.exp(-prog * 6.0)
    samples.append(math.sin(2 * math.pi * freq * t) * env * 0.75)
write_wav("boing.wav", samples)

# 4. CHA-CHING (Cash bell / Coins: 300ms)
dur = 0.35
samples = []
total = int(sample_rate * dur)
for i in range(total):
    t = i / sample_rate
    prog = i / total
    env = math.exp(-prog * 9.0)
    # 2 bright bell harmonics (C7 + G7)
    bell = (math.sin(2 * math.pi * 2093 * t) * 0.5 + 
            math.sin(2 * math.pi * 3136 * t) * 0.3 +
            math.sin(2 * math.pi * 4186 * t) * 0.2)
    samples.append(bell * env * 0.7)
write_wav("chaching.wav", samples)

# 5. SCRATCH / RECORD STOP (Comedic brake: 220ms)
dur = 0.22
samples = []
total = int(sample_rate * dur)
for i in range(total):
    t = i / sample_rate
    prog = i / total
    # Rapid downward frequency slide with friction noise
    freq = max(40, 1800 * (1 - prog) ** 3)
    noise = (math.sin(t * 31415.9) % 1.0 - 0.5) * 0.35
    env = (1 - prog) ** 1.5
    samples.append((math.sin(2 * math.pi * freq * t) + noise) * env * 0.8)
write_wav("scratch.wav", samples)

# 6. DING (Notification chime: 400ms)
dur = 0.45
samples = []
total = int(sample_rate * dur)
for i in range(total):
    t = i / sample_rate
    prog = i / total
    env = math.exp(-prog * 7.0)
    chime = (math.sin(2 * math.pi * 1046.5 * t) * 0.6 +  # C6
             math.sin(2 * math.pi * 1318.5 * t) * 0.4)   # E6
    samples.append(chime * env * 0.7)
write_wav("ding.wav", samples)

print("SFX generados con exito en remotion/public/sfx/")
