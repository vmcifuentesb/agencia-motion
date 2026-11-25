# Motion Designers Studio — Agencia de Motion Dual-Mode

Agencia modular de producción de video programático y motion graphics que combina **3 motores complementarios**, una **capa universal de coreografía (LottieFiles)** y un **agente investigador creativo anti-repetición (`trend-scout`)**, lista para operar en **Modo Multi-Marca** o exportarse como **Plantilla Single-Brand** dedicada a una sola empresa.

---

## 1. Arquitectura de la Agencia

```text
app-motion-designers/
├── AGENTS.md                   # Reglas maestras, flujo de 5 fases y estándar "Super Motion Artístico"
├── agency.config.json          # Modo activo ("multi-brand" | "single-brand") y ventana anti-repetición
├── fuentes_inspiracion.md      # Tus fuentes favoritas + referentes curados + 12 arquetipos visuales
├── scripts/agency-cli.mjs      # CLI para crear marcas, cambiar de modo y exportar repos dedicados
├── marcas/                     # Modo Multi-Marca (_template/ + marcas/<empresa>/brand.md + historial)
├── brand/                      # Modo Single-Brand (presente cuando el estudio/repo es para 1 sola marca)
├── .agents/skills/
│   ├── motion-director/        # Orquestador principal y QA Director
│   ├── trend-scout/            # Investigador creativo de tendencias + guardián anti-repetición
│   ├── motion-design/          # LottieFiles Motion Design Skill (Disney principles, timing, easing)
│   ├── remotion/               # Especialista Remotion (+ @remotion/three y @remotion/lottie)
│   ├── hyperframes/            # Especialista HyperFrames (HTML5 / DOM / GSAP)
│   └── motion-canvas/          # Especialista Motion Canvas (Vector / Morphing / Explainers)
├── remotion/                   # Motor 1: React 19 + TS + Tailwind v4 + R3F 3D WebGL + Lottie
├── hyperframe/                 # Motor 2: HTML5 + DOM Timelines + GSAP + @hyperframes/cli
├── motion-canvas/              # Motor 3: TypeScript + HTML5 Canvas + Generadores + FFmpeg exporter
├── biblioteca_prompts/         # Catálogo curado de prompts y timelines
└── videos_completados/         # Entregables finales MP4 (verticales/ 9:16 y horizontales/ 16:9)
```

---

## 2. Cómo Operar en Modo Multi-Marca vs. Plantilla Single-Brand

### A. Modo Agencia Multi-Marca (Estudio Central)
1. Crea una carpeta de marca a partir de la plantilla:
   ```bash
   node scripts/agency-cli.mjs new-brand mi-empresa --name "Mi Empresa"
   ```
2. Completa `marcas/mi-empresa/brand.md` con tus colores HEX, tipografías, tono y personalidad de movimiento (`Premium`, `Playful`, `Corporate` o `Energetic`).
3. Pide un video indicando la marca (ej. *"Haz un reel 9:16 para Mi Empresa sobre..."*). El agente activará primero `trend-scout`, revisará `historial_estilos.md` para no repetir estilos recientes y te propondrá 3 conceptos visuales distintos.

### B. Modo Plantilla Descargable / Single-Brand (Para una sola empresa)
Si quieres convertir este proyecto entero en un repositorio exclusivo para una marca (para enviarlo, descargarlo o trabajar dedicado):
```bash
# Opción 1: Exportar un repo limpio y portable exclusivo para esa marca
node scripts/agency-cli.mjs export-brand-repo mi-empresa ../agencia-mi-empresa

# Opción 2: Cambiar el workspace actual a modo Single-Brand
node scripts/agency-cli.mjs switch-single-brand mi-empresa
```
Cuando existe `brand/brand.md` en la raíz, los agentes detectan automáticamente esa marca sin preguntar.

---

## 3. Personalizar tus Fuentes de Inspiración

Edita [`fuentes_inspiracion.md`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/fuentes_inspiracion.md) en cualquier momento y agrega tus URLs, repositorios, canales o cuentas favoritas en la **Sección 1**. `trend-scout` las consultará siempre antes de proponer conceptos.

---

## 4. Comandos Rápidos de los 3 Motores

| Motor | Ideal para | Preview / Desarrollo | Validación / Render |
| :--- | :--- | :--- | :--- |
| **Remotion** (`remotion/`) | Super Motion 3D, Ads/Reels, WebGL (`@remotion/three`), Lottie (`@remotion/lottie`), Whisper captions | `cd remotion && npm run dev` | `npm run lint` / `npx remotion render src/index.ts <ID> ../videos_completados/...` |
| **HyperFrames** (`hyperframe/`) | Web flyovers, capturas DOM reales, pitch decks, efectos CRT/glitch | `cd hyperframe && npm run dev` | `npm run check` / `npm run render` |
| **Motion Canvas** (`motion-canvas/`) | Explainers técnicos, diagramas, código animado, morphing vectorial | `cd motion-canvas && npm run dev` | `npm run check` / Exportar MP4 desde `http://localhost:9000` (`@motion-canvas/ffmpeg`) |
