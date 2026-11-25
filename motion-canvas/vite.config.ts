import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";

function unwrapDefault<T>(mod: T): T {
  const maybeWrapped = mod as unknown as { default?: T };
  return maybeWrapped?.default ?? mod;
}

const motionCanvasPlugin = unwrapDefault(motionCanvas);
const ffmpegPlugin = unwrapDefault(ffmpeg);

export default defineConfig({
  plugins: [motionCanvasPlugin(), ffmpegPlugin()],
});
