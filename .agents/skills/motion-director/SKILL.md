---
name: motion-director
description: >-
  Orquestador principal y QA Director de la Agencia de Motion Design. Resuelve la marca activa
  (Modo Multi-Marca o Single-Brand), activa obligatoriamente a trend-scout para investigar
  tendencias y evitar repetición de estilos, evalúa la matriz de 3 motores (Remotion + 3D/Lottie,
  HyperFrames, Motion Canvas), integra la coreografía de motion-design (LottieFiles) y ejecuta
  la auditoría final Super Motion + registro en historial_estilos.md.
---

# Motion Director (Orquestador Principal de la Agencia)

El **Motion Director** gobierna todo el ciclo de producción de la agencia desde la raíz del proyecto: conecta la identidad de la empresa, la investigación creativa anti-repetición, la elección del mejor motor técnico y el control de calidad final.

---

## 1. Flujo Obligatorio de Orquestación (5 Fases)

### Fase 0: Resolver la Marca Activa (Dual-Mode)
1. Lee [`agency.config.json`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/agency.config.json).
2. Comprueba si existe `brand/brand.md` en la raíz:
   - **Modo Single-Brand:** usa `brand/brand.md`, `brand/historial_estilos.md` y `brand/assets/`.
   - **Modo Multi-Marca:** busca `marcas/<slug>/brand.md`. Si la marca aún no existe, solicita los datos mínimos y guíala con `node scripts/agency-cli.mjs new-brand <slug> --name "Nombre"`.

### Fase 1: Entrevista Rápida + Activación de `/trend-scout`
Antes de escribir código de animación:
1. Aclara los parámetros base si faltan (Formato `9:16` / `16:9`, duración objetivo, audio/voz en off, objetivo de campaña).
2. Activa obligatoriamente la skill [`trend-scout`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/trend-scout/SKILL.md):
   - Audita `historial_estilos.md` para **bloquear** los arquetipos/transiciones/layouts usados en los últimos 3 videos de esa marca.
   - Investiga en [`fuentes_inspiracion.md`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/fuentes_inspiracion.md) + búsqueda web.
   - Presenta **3 conceptos artísticos muy distintos entre sí** fieles al 100% al Brand Kit de la empresa.
3. Espera a que el usuario seleccione la dirección creativa (Opción A, B o C).

---

## 2. Fase 2: Matriz de Decisión de 3 Motores

Con el concepto creativo aprobado, elige el motor óptimo usando esta matriz:

| Criterio / Necesidad | **Remotion** (`remotion/`) | **HyperFrames** (`hyperframe/`) | **Motion Canvas** (`motion-canvas/`) |
| :--- | :--- | :--- | :--- |
| **Fortaleza Principal** | Ads/Reels hipercinéticos, **3D WebGL (`@remotion/three`)**, **Lottie (`@remotion/lottie`)**, React + Tailwind y templates por datos. | Flyovers de URLs/DOM reales, pitch decks interactivos (`/slideshow`), HTML/CSS/GSAP ligero y efectos de registry. | Explainers técnicos/narrativos, morphing vectorial fluido, diagramas de flujo y código animado (`<Code>`). |
| **Stack & Modelo** | React 19 + TSX + `useCurrentFrame()` / `spring()` + R3F v9. | HTML5 + `data-*` timeline + GSAP + Canvas. | TypeScript + HTML5 Canvas + Generadores (`yield*`) + Señales (`createSignal`). |
| **Audio & Subtítulos** | Whisper palabra por palabra + `<Audio>` con ducking frame-perfecto. | Audio sincronizado con timeline HTML y ducking de tracks. | Marcadores visuales `waitUntil` sincronizados en editor vivo. |
| **Arquetipos Ideales** | Swiss Kinetic 3D, Spatial Glass 3D, Bento SaaS + Lottie, Liquid GLSL Shaders, Documentary Split. | Live Web Flyover, Retro CRT/Glitch, Editorial HTML ligero, Pitch Decks. | Vector Morph Explainer, Isometric System Flow, Data Storytelling, Minimalismo Japonés. |
| **Renderizado** | CLI directo (`npx remotion render`). | CLI directo (`npm run render`). | Editor Vite (`npm run dev` en `:9000`) + `@motion-canvas/ffmpeg`. |

### Formato de Diagnóstico al Usuario:
> 🎯 **Diagnóstico del Motion Director**:
> - **Marca & Personalidad LottieFiles:** `[Nombre de Marca]` · `[Premium | Playful | Corporate | Energetic]`
> - **Concepto Elegido:** `[Opción elegida de Trend Scout]` (`<ID-Arquetipo>`)
> - **Motor Seleccionado:** `[Remotion (+ 3D/Lottie) | HyperFrames | Motion Canvas]`
> - **Motivo Técnico:** *[2–3 líneas justificando por qué este motor ejecuta mejor el concepto elegido]*
> - **Formato & Duración:** `[Ej. 1080x1920 a 60fps, 30s]`

---

## 3. Fase 3: Coreografía Transversal (`/motion-design` de LottieFiles)

Antes de implementar las escenas en el motor seleccionado, carga [`motion-design`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/motion-design/SKILL.md) para fijar:
- Bandas de duración y curvas de *easing* acordes a la personalidad de la marca.
- Principios de Disney (anticipación, *follow-through*, *squash & stretch* sutil, arcos y *staging*).
- Checklist de 8 pasos de coreografía (evitar movimientos lineales en espacio, combinar opacidad con escala/posición, controlar *staggers*).

---

## 4. Fase 4: Delegación a la Skill del Motor

- **Remotion**: carga [`remotion`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/remotion/SKILL.md) (y [`remotion/src/templates/ThreeDAndLottieStarter.tsx`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/remotion/src/templates/ThreeDAndLottieStarter.tsx) si usa 3D/Lottie).
- **HyperFrames**: carga [`hyperframes`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/hyperframes/SKILL.md).
- **Motion Canvas**: carga [`motion-canvas`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/motion-canvas/SKILL.md).
- Apóyate también en el catálogo de [`biblioteca_prompts/`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/biblioteca_prompts/README.md) cuando enriquezca la estructura temporal.

---

## 5. Gate de Auditoría Obligatoria: "Super Motion Artístico" & Cierre Anti-Repetición

Ningún video puede entregarse si no iguala o supera la calidad cinética de [`remotion/src/ShowreelVictorCifuentes.tsx`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/remotion/src/ShowreelVictorCifuentes.tsx):

1. **Verificación de Tipos/Lint del Motor**: `tsc --noEmit` / `eslint` / `hyperframes check` sin errores.
2. **Inspección Visual de Stills**: revisar al menos 3–5 fotogramas clave con `read_file` para validar contraste, jerarquía 3D, márgenes seguros y cero saltos de línea accidentales (`whitespace-nowrap`).
3. **Los 7 Pilares Super Motion**: energía cinética continua (cero frames muertos), cámara/profundidad 3D o vectorial multicapa (3 planos Z), tipografía escultórica, aleatoriedad determinista y sincronización rítmica.
4. **Validación MP4 (`ffprobe`)**: confirmar resolución, `60 fps` y audio correcto en `videos_completados/verticales/` o `videos_completados/horizontales/`.
5. **Registro Obligatorio en `historial_estilos.md`**: añadir la fila del nuevo video en el historial de la marca activa para que el próximo video vuelva a ser visualmente distinto.
