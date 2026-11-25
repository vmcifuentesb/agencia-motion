---
name: motion-canvas
description: >-
  Especialista en Motion Canvas (TypeScript + HTML5 Canvas + Generadores + @motion-canvas/ffmpeg).
  Úsalo cuando el Motion Director elija Motion Canvas para explainers técnicos, diagramas
  vectoriales, morphing geométrico fluido, bloques de código animados o narrativas sincronizadas
  por eventos de voz (waitUntil).
---

# Motion Canvas Video Engineering

**Motion Canvas** es un motor programático en TypeScript que renderiza sobre HTML5 Canvas usando **funciones generadoras (`yield*`) y señales reactivas (`createSignal`)**, con un editor visual interactivo en vivo (`http://localhost:9000`) conectado a `@motion-canvas/ffmpeg` para exportar a MP4.

---

## 1. Cuándo Elegir Motion Canvas (Frente a Remotion e HyperFrames)

Elige **Motion Canvas** cuando el concepto necesite:
- **Explainers técnicos / arquitectónicos**: nodos conectados, tuberías de datos, diagramas de flujo, mapas sistémicos.
- **Morphing geométrico y vectorial puro**: transiciones continuas entre formas, líneas dibujadas en vivo (`end`), curvas `Spline` y vectores SVG.
- **Bloques de código animados (`<Code>`)**: resaltado progresivo, diff animado y explicaciones de programación/software.
- **Sincronización fina con locución (`waitUntil`)**: marcar puntos exactos de la pista de audio desde el editor visual sin recalcular frames manualmente.

---

## 2. Estructura de `motion-canvas/`

```text
motion-canvas/
├── package.json            # @motion-canvas/core, @motion-canvas/2d, @motion-canvas/vite-plugin, @motion-canvas/ffmpeg
├── vite.config.ts          # Plugins motionCanvas() + ffmpeg()
├── tsconfig.json           # jsxImportSource: "@motion-canvas/2d/lib"
└── src/
    ├── project.ts          # Registro de escenas (makeProject) y pista de audio opcional
    └── scenes/
        └── example.tsx     # Escenas modulares con makeScene2D
```

---

## 3. Patrones Fundamentales de Animación

1. **Coreografía Obligatoria (`/motion-design`)**: Antes de definir tiempos y curvas (`easeOutCubic`, `easeInOutExpo`, `spring`), consulta [`motion-design`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/motion-design/SKILL.md) para adaptar el peso y velocidad a la personalidad de la marca (`Premium`, `Playful`, `Corporate`, `Energetic`).
2. **Identidad de Marca**: Importa los HEX y tipografías exactos desde `brand/brand.md` (Modo Single-Brand) o `marcas/<slug>/brand.md` (Modo Multi-Marca).
3. **Generadores y Concurrencia**:
   - Usa `yield* all(...)` para animar múltiples propiedades en paralelo (nunca animaciones secuenciales aburridas de una sola cosa a la vez).
   - Usa `yield* chain(...)` y `yield* delay(0.08, ...)` para *stagger* coreografiado.
   - Usa `createSignal()` para contadores reactivos, barras de progreso o coordenadas vinculadas entre nodos.
   - **Cero escenas muertas**: mantén micro-deriva, trazos dibujándose, pulso o partículas vectoriales activas durante toda la escena.

---

## 4. Preview Interactivo y Exportación a MP4

A diferencia de Remotion o HyperFrames (que exportan por CLI directo), Motion Canvas renderiza a MP4 mediante su editor Vite conectado a `@motion-canvas/ffmpeg`:

```bash
# 1. Verificación de tipos TypeScript (obligatorio antes de renderizar)
cd motion-canvas && npm run check

# 2. Iniciar el editor visual interactivo (http://localhost:9000)
cd motion-canvas && npm run dev
```

### Pasos de Exportación Final:
1. Abre `http://localhost:9000` en el navegador.
2. En **Video Settings**, configura la resolución exacta (`1080x1920` para vertical 9:16 o `1920x1080` para horizontal 16:9), `60 fps` y el **Exporter: Video (FFmpeg)**.
3. Haz clic en **Render**.
4. Mueve o guarda el archivo `.mp4` final en:
   - `videos_completados/verticales/<nombre>.mp4` (9:16)
   - `videos_completados/horizontales/<nombre>.mp4` (16:9)
5. Verifica el `.mp4` con `ffprobe` y registra la entrega en el `historial_estilos.md` de la marca activa.
