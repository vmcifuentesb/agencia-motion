import fs from "fs";
import path from "path";

// Parameters
const SAMPLE_RATE = 44100;
const DURATION_SEC = 15.0;
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION_SEC);
const BPM = 120;
const BEAT_DURATION = 60 / BPM; // 0.5 seconds
const TOTAL_BEATS = Math.round(DURATION_SEC / BEAT_DURATION); // 30 beats

// Float audio buffers (Left & Right)
const leftChannel = new Float32Array(TOTAL_SAMPLES);
const rightChannel = new Float32Array(TOTAL_SAMPLES);

function addSample(i: number, l: number, r: number) {
  if (i >= 0 && i < TOTAL_SAMPLES) {
    leftChannel[i] += l;
    rightChannel[i] += r;
  }
}

// 1. KICKS on every beat
for (let b = 0; b < TOTAL_BEATS; b++) {
  const startSample = Math.floor(b * BEAT_DURATION * SAMPLE_RATE);
  const kickSamples = Math.floor(0.22 * SAMPLE_RATE); // 220ms kick

  // Slightly heavier kick on downbeats (every 4 beats)
  const isDownbeat = b % 4 === 0;
  const kickGain = isDownbeat ? 0.85 : 0.65;

  for (let s = 0; s < kickSamples; s++) {
    const t = s / SAMPLE_RATE;
    const progress = s / kickSamples;
    const env = Math.exp(-progress * 14);

    // Pitch sweep from 160Hz -> 42Hz
    const phase = 2 * Math.PI * (42 * t + (120 / 25) * (1 - Math.exp(-progress * 25)) * (kickSamples / SAMPLE_RATE));
    const kickVal = Math.sin(phase) * env * kickGain;

    // Click transient
    let click = 0;
    if (s < 100) {
      click = (Math.random() * 2 - 1) * Math.exp(-s / 20) * 0.35;
    }

    const val = kickVal + click;
    addSample(startSample + s, val, val);
  }
}

// 2. HI-HATS on off-beats (8th notes)
for (let b = 0; b < TOTAL_BEATS * 2; b++) {
  const isOffbeat = b % 2 === 1;
  const startSample = Math.floor((b * BEAT_DURATION * 0.5) * SAMPLE_RATE);
  const hatSamples = Math.floor(0.04 * SAMPLE_RATE);
  const hatGain = isOffbeat ? 0.22 : 0.08;

  for (let s = 0; s < hatSamples; s++) {
    const progress = s / hatSamples;
    const env = Math.exp(-progress * 30);
    const noise = (Math.random() * 2 - 1) * env * hatGain;
    // Panned slightly
    addSample(startSample + s, noise * 0.8, noise * 1.1);
  }
}

// 3. SCENE CHANGE IMPACTS (Every 4 beats: beats 0, 4, 8, 12, 16, 20, 26)
const impactBeats = [0, 4, 8, 12, 16, 20, 26];
impactBeats.forEach((b) => {
  const startSample = Math.floor(b * BEAT_DURATION * SAMPLE_RATE);
  const impactSamples = Math.floor(0.6 * SAMPLE_RATE);
  for (let s = 0; s < impactSamples; s++) {
    const t = s / SAMPLE_RATE;
    const progress = s / impactSamples;
    const env = Math.exp(-progress * 7);
    const subFreq = 55;
    const sub = Math.sin(2 * Math.PI * subFreq * t) * env * 0.45;
    const noise = (Math.random() * 2 - 1) * Math.exp(-progress * 20) * 0.25;
    addSample(startSample + s, sub + noise, sub + noise);
  }
});

// 4. RISER before the Climax (Beats 17 to 20: 8.5s to 10.0s)
const riserStartSample = Math.floor(17 * BEAT_DURATION * SAMPLE_RATE);
const riserEndSample = Math.floor(20.9 * BEAT_DURATION * SAMPLE_RATE);
const riserDurationSamples = riserEndSample - riserStartSample;

for (let s = 0; s < riserDurationSamples; s++) {
  const progress = s / riserDurationSamples;
  const t = s / SAMPLE_RATE;
  // Exponential pitch rising from 180Hz to 1600Hz
  const freq = 180 * Math.pow(1600 / 180, progress);
  const env = Math.pow(progress, 2.2) * 0.4;
  const tone = Math.sin(2 * Math.PI * freq * t) * env;
  const noise = (Math.random() * 2 - 1) * Math.pow(progress, 3) * 0.3;
  // Panning sweep from left to center
  const panL = 1 - progress * 0.5;
  const panR = 0.5 + progress * 0.5;
  addSample(riserStartSample + s, (tone + noise) * panL, (tone + noise) * panR);
}

// 5. CLIMAX DROP (Beat 21 = 10.5s): Massive 808 Sub Boom
const climaxStartSample = Math.floor(21 * BEAT_DURATION * SAMPLE_RATE);
const climaxSamples = Math.floor(1.5 * SAMPLE_RATE);
for (let s = 0; s < climaxSamples; s++) {
  const t = s / SAMPLE_RATE;
  const progress = s / climaxSamples;
  const env = Math.exp(-progress * 3.5);
  const freq = 65 * Math.exp(-progress * 1.5);
  const sub = Math.sin(2 * Math.PI * freq * t) * env * 0.75;
  addSample(climaxStartSample + s, sub, sub);
}

// Write 16-bit Stereo PCM WAV
function createWavBuffer(left: Float32Array, right: Float32Array): Buffer {
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = SAMPLE_RATE * blockAlign;
  const dataSize = TOTAL_SAMPLES * blockAlign;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;

  const buffer = Buffer.alloc(totalSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(totalSize - 8, 4);
  buffer.write("WAVE", 8);

  // "fmt " chunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample

  // "data" chunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Limiter & Convert Float32 to Int16
  let offset = 44;
  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    // Soft clip
    let l = Math.max(-0.98, Math.min(0.98, left[i]));
    let r = Math.max(-0.98, Math.min(0.98, right[i]));

    buffer.writeInt16LE(Math.floor(l * 32767), offset);
    buffer.writeInt16LE(Math.floor(r * 32767), offset + 2);
    offset += 4;
  }

  return buffer;
}

const wavBuffer = createWavBuffer(leftChannel, rightChannel);
const publicDir = path.resolve(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const outputPath = path.join(publicDir, "soundtrack_120bpm.wav");
fs.writeFileSync(outputPath, wavBuffer);
console.log(`Generated soundtrack: ${outputPath} (${(wavBuffer.length / 1024).toFixed(1)} KB)`);
