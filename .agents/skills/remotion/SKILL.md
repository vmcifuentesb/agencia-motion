---
name: remotion
description: >-
  Specialist skill for creating, editing, animating, and rendering programmatic videos using
  Remotion (React, TypeScript, Tailwind CSS, @remotion/player, and @remotion/cli). Use when
  working with React components, dynamic data-driven video templates, complex multi-scene TSX
  timelines, audio/voice sync, Whisper word-by-word captions, or when rendering Remotion compositions.
---

# Remotion Video Engineering

Remotion treats video as a pure function of state and time in React. Every frame is rendered deterministically from code.

## 1. Core Architecture

### Composition Registration (`src/Root.tsx`)
Every video deliverable must be declared as a `<Composition>` in `src/Root.tsx`:

```tsx
import { Composition } from 'remotion';
import { MyVideo } from './scenes/MyVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Vertical Video (TikTok / Reels / Shorts: 1080x1920) */}
      <Composition
        id="PromoReel"
        component={MyVideo}
        durationInFrames={30 * 30} // 30 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "Mi Campaña",
          brandColor: "#6366f1"
        }}
      />

      {/* Horizontal Video (YouTube / Web: 1920x1080) */}
      <Composition
        id="ProductLaunch"
        component={MyVideo}
        durationInFrames={60 * 30} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

### Layout Primitives
- `<AbsoluteFill>`: The foundational layout container. Full-bleed absolute positioning (`top: 0, left: 0, right: 0, bottom: 0`).
- `<Sequence>`: Positions children on the timeline.
  ```tsx
  <Sequence from={0} durationInFrames={90}>
    <IntroScene />
  </Sequence>
  <Sequence from={90} durationInFrames={150}>
    <MainContentScene />
  </Sequence>
  ```
- `<Series>`: Chains sequential scenes automatically without manually calculating frame offsets:
  ```tsx
  <Series>
    <Series.Sequence durationInFrames={90}>
      <IntroScene />
    </Series.Sequence>
    <Series.Sequence durationInFrames={120}>
      <FeatureScene />
    </Series.Sequence>
  </Series>
  ```

---

## 2. Deterministic Animation Patterns

> [!IMPORTANT]
> Never use CSS animations, `@keyframes`, `setTimeout`, or `useEffect` for animation. In Remotion, **all visual states must be a pure mathematical function of `useCurrentFrame()`**.

### `useCurrentFrame()` & `useVideoConfig()`
```tsx
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const AnimatedCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Linear / Eased Interpolation
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Physics-based Spring Motion
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.6,
      stiffness: 120,
    },
  });

  const translateY = interpolate(frame, [0, 25], [60, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20"
    >
      <h2 className="text-3xl font-bold">Título Impactante</h2>
    </div>
  );
};
```

---

## 3. Audio & Voice Synchronization

Assets in `public/` are served via `staticFile()`:

```tsx
import { Audio, staticFile, interpolate, useCurrentFrame } from 'remotion';

export const AudioTrack: React.FC = () => {
  const frame = useCurrentFrame();

  // Background music ducking when voiceover is playing (frames 30 to 180)
  const musicVolume = interpolate(
    frame,
    [20, 30, 180, 195],
    [0.6, 0.15, 0.15, 0.6],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* Background Music */}
      <Audio src={staticFile('music/bg_electronic.mp3')} volume={musicVolume} loop />

      {/* Voiceover Track */}
      <Sequence from={30}>
        <Audio src={staticFile('audio/voice_act1.mp3')} volume={1.0} />
      </Sequence>
    </>
  );
};
```

---

## 4. Production & CLI Commands

```bash
# Start interactive visual preview studio
npm run dev
# or: npx remotion studio

# Render composition to MP4 (Full HD)
npx remotion render src/index.ts <CompositionId> out/<output_name>.mp4

# Render high-quality still image preview for a specific frame
npx remotion still src/index.ts <CompositionId> out/<preview_name>.png --frame=60

# Check TypeScript and lint errors
npm run lint
```

---

## 5. Decision Checklist: When to use Remotion
- Project needs **React component reuse** or integration with React libraries (Lucide icons, Three.js / React Three Fiber, Framer Motion springs).
- Video template needs **dynamic parameterization** (rendering hundreds of personalized videos from JSON/database/API).
- Complex multi-scene narrative with precise audio-visual ducking and synchronized word-by-word captions.
- Team is comfortable with TypeScript, JSX, and Tailwind.

---

## 6. Estándar Mínimo Obligatorio: "Super Motion Artístico" & QA Audit

> **Referencia Maestra**: [`remotion/src/ShowreelVictorCifuentes.tsx`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/remotion/src/ShowreelVictorCifuentes.tsx)

Toda composición de Remotion debe implementar como mínimo este arsenal visual y aprobar la auditoría técnica antes de entregarse:

### 6.1 Primitivas de Super Motion Requeridas
1. **Extrusión 3D & Aberración Cromática (`get3DShadow` + `Kinetic3DText`)**:
   - Proyectar de 6 a 14 capas de sombra sólida en `textShadow` + separación cromática en entradas rápidas.
   - Animar cada carácter con su propio `spring()` desfasado (`staggerFrames`), `rotateX(-95deg -> 0)`, `rotateY(45deg -> 0)` y flotación sinusoidal continua (`Math.sin`).
2. **Decodificación Matrix / Cipher (`useCipherText`)**:
   - Usar `random()` determinista de Remotion para desencriptar subtítulos, cotas y etiquetas técnicas antes de resolver el texto final.
3. **Campo Generativo Determinista (`GenerativeField`)**:
   - Partículas técnicas flotantes (`+`, `×`, miras circulares y coordenadas vivas `X:Y`) impulsadas por `random('seed')`.
4. **Cámara 3D, Whip-Zooms e Impact Shake**:
   - Escenarios con `perspective: 1100px–1300px` y `transformStyle: "preserve-3d"`.
   - En los últimos 8–12 frames de cada escena, aplicar un *whip-zoom* exponencial (`Easing.in(Easing.exp)`) o transición de portal circular para conectar cortes con inercia física.
   - En cortes rítmicos fuertes, aplicar sacudida de cámara amortiguada (`Math.sin(frame * 2.7) * decay`) y flashes de inversión de 2 frames.
5. **Órbitas Elípticas 3D & Tambores Cilíndricos**:
   - Para menús de iconos o listas de servicios, emplear `translate3d(x, y, z)` o `rotateX(angle) translateZ(radius)` pasando físicamente por delante y por detrás del elemento central.

### 6.2 Auditoría Obligatoria Pre-Entrega (QA Workflow)
1. **Chequeo de Pureza y Tipos**:
   ```bash
   cd remotion && npx tsc --noEmit
   ```
   *(Prohibido usar `Math.random()` o clases `transition-*` de CSS que causen parpadeo).*
2. **Auditoría Visual de Stills (`npx remotion still` + `read_file`)**:
   - Renderizar al menos 3–5 stills de escenas clave y revisarlos visualmente con `read_file` para garantizar que ningún titular se divida en dos líneas por accidente (`whitespace-nowrap`) y que la jerarquía 3D sea legible.
3. **Render Final a 60 FPS y Verificación con `ffprobe`**:
   ```bash
   cd remotion && npx remotion render src/index.ts <CompositionId> ../videos_completados/verticales/<Nombre>.mp4
   ```

---

## 7. Extensiones 3D WebGL (`@remotion/three`) y Lottie (`@remotion/lottie`)

Además del motor React/DOM, `remotion/` cuenta con soporte nativo para escenas 3D WebGL reales y animaciones vectoriales Lottie sincronizadas frame a frame. Consulta la plantilla de referencia [`remotion/src/templates/ThreeDAndLottieStarter.tsx`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/remotion/src/templates/ThreeDAndLottieStarter.tsx) y aplica siempre la skill [`motion-design`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/motion-design/SKILL.md) (LottieFiles) para definir personalidad, peso y curvas antes de animar.

### 7.1 Escenas 3D Deterministas con `@remotion/three` (React 19 + R3F v9)
- Usa `<ThreeCanvas width={width} height={height}>` como contenedor principal.
- **Regla de Determinismo:** Prohibido usar `useFrame()` de R3F basado en `delta` o reloj real. Todo movimiento 3D (rotación, posición, intensidad de luz, cámara o *uniforms* de shaders GLSL) debe calcularse directamente con `useCurrentFrame()`, `interpolate()` y `spring()`.
- Ideal para: mockups 3D de dispositivos/productos, vidrio espacial (*spatial glass*), geometrías flotantes con iluminación PBR y fondos con shaders GLSL paramétricos usando los HEX de la marca.

### 7.2 Vectores Lottie Deterministas con `@remotion/lottie`
- Coloca los archivos `.json` en `remotion/public/lottie/` y cárgalos mediante `staticFile()` protegido con `delayRender()` / `continueRender()` (y `cancelRender()` en `catch`).
- `<Lottie animationData={data} playbackRate={1} />` avanza sincronizado con `useCurrentFrame()` sin parpadeos.
- Ideal para: micro-interacciones Bento, iconos animados de marca, checkmarks, gráficos vectoriales y badges dinámicos.
