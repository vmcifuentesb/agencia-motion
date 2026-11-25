# Motion Designers Studio — Agencia de Motion Dual-Mode (Multi-Motor)

Este workspace es una **Agencia Completa de Motion Design** capaz de operar en **Modo Multi-Marca** (`marcas/<empresa>/`) o en **Modo Plantilla Single-Brand exportable** (`brand/` en la raíz), integrando **3 motores de renderizado** (**Remotion + 3D/Lottie**, **HyperFrames** y **Motion Canvas**), la capa universal de coreografía de **LottieFiles** (`/motion-design`) y un agente investigador creativo anti-repetición (**`/trend-scout`**).

---

## 1. Flujo Oficial de la Agencia (5 Fases Obligatorias)

Ante cualquier solicitud para crear, planificar o producir un video, animación o motion graphic:

### Fase 0 — Resolución de Marca (Dual-Mode)
1. Lee [`agency.config.json`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/agency.config.json) y verifica si existe `brand/brand.md` en la raíz:
   - **Modo Single-Brand (Repo Dedicado):** si existe `brand/brand.md`, esa es automáticamente la marca activa (`brand/brand.md`, `brand/historial_estilos.md`, `brand/assets/`).
   - **Modo Multi-Marca (Estudio Central):** resuelve `marcas/<slug>/brand.md`. Si la empresa aún no tiene ficha, créala con:
     ```bash
     node scripts/agency-cli.mjs new-brand <slug> --name "Nombre Comercial"
     ```
2. Absorbe la paleta HEX exacta, tipografías, tono verbal, reglas de logo, prohibiciones de marca y la **Personalidad de Movimiento** (`Premium`, `Playful`, `Corporate` o `Energetic`).

### Fase 1 — Investigación Creativa Anti-Repetición (`/trend-scout`)
> **Regla estricta:** Prohibido empezar a programar sin ejecutar primero [`trend-scout`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/trend-scout/SKILL.md).
1. Lee `historial_estilos.md` de la marca activa y **bloquea** el arquetipo visual, cámara/transición dominante y layout principal de los últimos 3 videos (`antiRepetitionWindow: 3`).
2. Consulta [`fuentes_inspiracion.md`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/fuentes_inspiracion.md) (priorizando la Sección 1 del usuario) + búsqueda web de tendencias virales/artísticas actuales.
3. Entrega un **Creative Direction Brief** con **3 conceptos visuales radicalmente distintos entre sí** (todos 100% fieles al Brand Kit) y espera la elección del usuario.

### Fase 2 — Matriz de Decisión de 3 Motores (`/motion-director`)
Con el concepto elegido, [`motion-director`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/motion-director/SKILL.md) selecciona el motor óptimo:
- **Usa Remotion (`remotion/`)** si el video requiere:
  - Ads/Reels hipercinéticos ("Super Motion 3D"), tipografía escultórica, React + Tailwind v4.
  - **3D WebGL real** (`@remotion/three` + React Three Fiber v9) o **vectores Lottie** (`@remotion/lottie`).
  - Templates parametrizados desde API/JSON, subtítulos palabra por palabra (Whisper) o audio ducking frame-perfecto.
- **Usa HyperFrames (`hyperframe/`)** si el video requiere:
  - Captura, showcase o flyover de un sitio web / landing page desde una URL / DOM real.
  - Presentaciones interactivas o pitch decks navegables (`/slideshow`).
  - Motion graphics ligeros HTML5/CSS/GSAP o efectos de registry (CRT, glitch, film grain).
- **Usa Motion Canvas (`motion-canvas/`)** si el video requiere:
  - Explainers técnicos o narrativos con morphing vectorial/geométrico continuo (`yield*`, señales).
  - Diagramas de flujo, arquitecturas de sistemas, infografías fluidas o bloques de código animado (`<Code>`).
  - Sincronización precisa de locución por marcadores (`waitUntil`).

### Fase 3 — Coreografía Universal (`/motion-design` de LottieFiles)
Antes de codificar animaciones en cualquiera de los 3 motores, consulta [`motion-design`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/.agents/skills/motion-design/SKILL.md) para aplicar:
- Principios de Disney adaptados a diseño digital (anticipación, follow-through, arcos, peso).
- Bandas de duración, curvas de *easing* y reglas técnicas según la personalidad de la marca (`Playful`, `Premium`, `Corporate`, `Energetic`).

### Fase 4 — Producción, Auditoría QA ("Super Motion Artístico") y Registro
1. Desarrolla la pieza en el motor elegido activando su skill especializada (`/remotion`, `/hyperframes` o `/motion-canvas`).
2. Ejecuta el **Protocolo de Auditoría Obligatoria** (Sección 4) antes de entregar.
3. Guarda el MP4 final en `videos_completados/verticales/` o `videos_completados/horizontales/`.
4. **Registra obligatoriamente** la entrega en el `historial_estilos.md` de la marca activa para proteger la variedad futura.

---

## 2. Estructura Organizada del Proyecto

- `agency.config.json` — Configuración global Dual-Mode (`multi-brand` / `single-brand`) y ventana anti-repetición.
- `fuentes_inspiracion.md` — Fuentes personalizadas del usuario + fuentes base + matriz de 12 arquetipos artísticos.
- `scripts/agency-cli.mjs` — CLI para crear marcas (`new-brand`), activar modo único (`switch-single-brand`) o exportar un repo portable exclusivo para una empresa (`export-brand-repo`).
- `marcas/` — Base de marcas en Modo Multi-Marca (`_template/` + carpeta por empresa con `brand.md`, `historial_estilos.md`, `assets/`, `briefs/`).
- `brand/` — *(Opcional en Modo Single-Brand)* Ficha de la única marca activa cuando el repo se usa en modo dedicado.
- `.agents/skills/` — Cerebros especializados de la agencia:
  - `motion-director/` (orquestador y QA)
  - `trend-scout/` (investigación creativa + anti-repetición)
  - `motion-design/` (LottieFiles — coreografía, curvas y principios de Disney)
  - `remotion/`, `hyperframes/`, `motion-canvas/` (especialistas de cada motor)
- `remotion/` — Motor 1: React 19, TypeScript, Tailwind v4, `@remotion/three` (R3F v9), `@remotion/lottie`.
- `hyperframe/` — Motor 2: HTML5, DOM Timelines, GSAP y `@hyperframes/cli`.
- `motion-canvas/` — Motor 3: TypeScript, HTML5 Canvas, generadores (`yield*`) y `@motion-canvas/ffmpeg`.
- `biblioteca_prompts/` — Catálogo curado de prompts y plantillas de motion design.
- `videos_completados/` — Entregables finales renderizados (`verticales/` 9:16 y `horizontales/` 16:9).

---

## 3. Comandos de Producción y Agencia

### Gestión Dual-Mode de Marcas (desde la raíz):
```bash
node scripts/agency-cli.mjs status
node scripts/agency-cli.mjs new-brand acme-corp --name "Acme Corp"
node scripts/agency-cli.mjs switch-single-brand acme-corp
node scripts/agency-cli.mjs export-brand-repo acme-corp ../agency-acme-corp
```

### Motor 1 — Remotion (desde `remotion/`):
```bash
cd remotion
npm run dev               # Abre el Remotion Studio interactivo
npx remotion render src/index.ts VerticalVideo ../videos_completados/verticales/<nombre>.mp4
npx remotion render src/index.ts HorizontalVideo ../videos_completados/horizontales/<nombre>.mp4
npx remotion still src/index.ts VerticalVideo ../scratch/preview.png --frame=60
npm run lint              # Verificación ESLint + TypeScript
```

### Motor 2 — HyperFrames (desde `hyperframe/`):
```bash
cd hyperframe
npm run dev               # Preview de HyperFrames
npx hyperframes preview --background # Preview persistente para agentes
npm run check             # Validación de DOM, timings, contraste y layout
npm run render            # Renderizado a MP4
```

### Motor 3 — Motion Canvas (desde `motion-canvas/`):
```bash
cd motion-canvas
npm run check             # Verificación de TypeScript
npm run dev               # Editor visual (http://localhost:9000) + exportador @motion-canvas/ffmpeg
```

### Post-render:
Al finalizar un render exitoso, guarda siempre el resultado final clasificado en:
- `videos_completados/verticales/` (para formato 9:16)
- `videos_completados/horizontales/` (para formato 16:9)
Y registra la fila correspondiente en el `historial_estilos.md` de la marca activa.

---

## 4. Estándar Mínimo de Calidad: "Super Motion Artístico" & Auditoría Obligatoria (Motion QA Audit)

> **Benchmark de Referencia Oficial (Golden Standard)**: [`remotion/src/ShowreelVictorCifuentes.tsx`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/remotion/src/ShowreelVictorCifuentes.tsx) y [`videos_completados/verticales/VictorCifuentes_SuperMotion.mp4`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/videos_completados/verticales/VictorCifuentes_SuperMotion.mp4).

Queda **estrictamente prohibido** entregar videos planos, diapositivas estáticas o textos que simplemente aparecen con un `opacity` simple. Todo video producido en este estudio debe cumplir como **mínimo** con el estándar **Super Motion Artístico (Hyper-Kinetic 3D)** y pasar por el **Protocolo de Auditoría del Agente** antes de darse por completado.

### 4.1 Los 7 Pilares Obligatorios del "Super Motion Artístico"
1. **Cero Frames Estáticos (Continuous Kinetic Energy)**:
   - Ninguna escena puede permanecer inmóvil. Incluso durante la lectura de un titular, debe existir flotación sinusoidal (`Math.sin`), deriva de cámara, barrido de luz, rotación de anillos HUD o partículas técnicas deterministas.
2. **Cámara Virtual & Transiciones de Inercia (`perspective: 1000px–1300px` o cámara 2D/WebGL)**:
   - Escenarios con profundidad real (`transformStyle: "preserve-3d"`, `rotateX/Y/Z`, escenas WebGL o zoom/paneo de cámara vectorial).
   - Cortes impulsados por **Whip-Zooms** exponenciales, **Slams** con `spring`, portales circulares (*iris wipe*), morphings continuos o **Impact Camera Shake** amortiguado en golpes de beat.
3. **Tipografía Escultórica y Animación Coreografiada**:
   - Titulares con carácter visual (extrusión 3D, aberración cromática controlada o composición editorial de alto contraste), animaciones por carácter/palabra con *stagger* y efectos `useCipherText` en metadatos cuando aplique al arquetipo.
4. **Profundidad Multicapa (Parallax Z-Space)**:
   - Al menos **3 planos de profundidad**: *Fondo* (marquees, retículas, shaders o trazos ambientales), *Plano Medio* (sujeto principal, tarjetas Bento, diagramas o modelos 3D) y *Plano Frontal* (órbitas, cursores, partículas y HUD de telemetría).
5. **Aleatoriedad Determinista y Micro-Telemetría Viva**:
   - Uso obligatorio de `random('seed')` de Remotion o señales deterministas (nunca `Math.random()`).
6. **Física 100% Determinista a 60 FPS**:
   - Prohibido usar `transition-*` o `@keyframes` no deterministas en Remotion.
7. **Sincronización Rítmica & Visualizadores Reactivos**:
   - Cortes, flashes de inversión y acentos clavados en los transientes del audio, acompañados de micro-ecualizadores o barras de progreso reactivas.

### 4.2 Protocolo de Auditoría Obligatoria del Agente (Pre-Delivery QA Checklist)
Antes de entregar cualquier video al usuario, el agente **DEBE** auditar su propio trabajo ejecutando estos 5 pasos:
1. **Verificación de Compilación y Pureza**:
   - Remotion: `cd remotion && npx tsc --noEmit && npm run lint`
   - HyperFrames: `cd hyperframe && npm run check`
   - Motion Canvas: `cd motion-canvas && npm run check`
2. **Inspección Visual de Stills (`npx remotion still` / snapshots + `read_file`)**:
   - Revisar visualmente al menos 3–5 fotogramas representativos de distintas escenas para garantizar legibilidad, márgenes, ausencia de saltos de línea indeseados (`whitespace-nowrap`) y fidelidad cromática con `brand.md`.
3. **Auditoría de los 7 Pilares Super Motion + `/motion-design`**:
   - Confirmar que ninguna escena luce plana y que los tiempos/easings corresponden a la personalidad de la marca.
4. **Validación Técnica del MP4 Final (`ffprobe`)**:
   - Confirmar resolución exacta (`1080x1920` o `1920x1080`), `60 fps`, presencia de pista de audio AAC (cuando lleve audio) y bitrate saludable.
5. **Registro Anti-Repetición**:
   - Anotar la entrega final en el `historial_estilos.md` de la marca activa.
