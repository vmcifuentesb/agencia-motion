# 06. Super Motion 3D — Swiss Kinetic Showreel (Golden Benchmark)

> **Estado**: 🏆 **Estándar Mínimo Oficial del Estudio (QA Baseline)**
> **Implementación de Referencia**: [`remotion/src/ShowreelVictorCifuentes.tsx`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/remotion/src/ShowreelVictorCifuentes.tsx)
> **Entregable de Referencia**: [`videos_completados/verticales/VictorCifuentes_SuperMotion.mp4`](file:///c:/Users/DELL/Documents/Proyectos%20Promptend/app-motion-designers/videos_completados/verticales/VictorCifuentes_SuperMotion.mp4)

---

## 1. Metadatos Técnicos
- **Motor**: Remotion (`React 19 + TypeScript + Tailwind v4`)
- **Resolución & Aspect Ratio**: `1080 × 1920` (9:16 Vertical) o `1920 × 1080` (16:9 Horizontal)
- **Frame Rate**: `60 fps` (obligatorio para fluidez hiper-cinética)
- **Duración Típica**: `15s – 30s` (`900 – 1800 frames`)

---

## 2. Sistema Visual & Paleta Cromática (Swiss Blueprint & Warm Contrast)
- **Night / Ink**: `#0E0F14` / `#14151B` (Fondos profundos de alto contraste y tipografía sobre crema)
- **Paper Cream**: `#E6E0DD` (Superficie editorial cálida)
- **Cobalt Blueprint**: `#0B63A4` (Fondo técnico de ingeniería y manifiesto)
- **Navy Depth**: `#0B2B5C` (Sombras 3D extruidas sobre azul y tarjetas orbitales)
- **Warm Orange Accent**: `#E6915B` (Cursores luminosos, brackets `[ ]`, nodos de mira, destellos cromáticos)
- **Tipografía**:
  - *Hero 3D*: `Inter` / `Helvetica Neue` (`font-extrabold`, tracking `-0.04em`, `whitespace-nowrap`)
  - *Telemetría & HUD*: `JetBrains Mono` / `monospace` (`tracking-[0.3em]`, uppercase)

---

## 3. Reglas de Física & Super Motion (Los 7 Pilares Auditables)
1. **Tipografía Escultórica 3D (`Kinetic3DText` + `get3DShadow`)**:
   - Extrusión de 6 a 14 capas sólidas en `textShadow` + aberración cromática (`-5px -2px #E6915B, 5px 2px #0B63A4`) en transiciones rápidas.
   - Entrada por carácter con `spring({ damping: 11, stiffness: 180, mass: 0.7 })`, desfase `staggerFrames = 1..4`, rotación inicial `rotateX(-95deg) rotateY(45deg)` y flotación continua `Math.sin`.
2. **Cámara Virtual 3D, Whip-Zooms e Impact Shake**:
   - Escenarios con `perspective: 1100px–1300px` y `transformStyle: "preserve-3d"`.
   - Salidas con *Whip-Zoom* exponencial (`scale: 1 -> 3.5+` con `Easing.in(Easing.exp)`).
   - Entradas de golpe con `slam` (`2.4x -> 1.0x`), flash de inversión de 2 frames y sacudida amortiguada (`Math.sin(subFrame * 2.7) * decay`).
3. **Decodificación Cipher / Matrix (`useCipherText`)**:
   - Todos los subtítulos, cotas y frases técnicas se desencriptan pasando por caracteres `01#$%&/<>{}[]*+=-~^` usando `random()` determinista.
4. **Campo Generativo y Retículas Vivas (`GenerativeField` + `TechnicalGrid`)**:
   - Entre 18 y 30 partículas deterministas (`+`, `×`, círculos y coordenadas `X:Y` vivas) + líneas de acotación que hacen *snap* con resorte y barrido láser horizontal.
5. **Profundidad en 3 Planos (Parallax Z-Space)**:
   - *Fondo (`translateZ < 0`)*: Marquees gigantes en `WebkitTextStroke` corriendo a alta velocidad o monogramas wireframe rotando en 3D.
   - *Medio (`translateZ = 0`)*: Sujeto con clones de eco cromático (`hue-rotate`), tambores cilíndricos 3D o tarjetas con reflejo holográfico (`sheenX`).
   - *Frente (`translateZ > 0`)*: Anillos orbitales 3D tipo Saturno (`translate3d(x, y, z)`) donde los iconos pasan por delante y por detrás del texto central.

---

## 4. Checklist de Auditoría Obligatoria (Pre-Delivery QA)
- [ ] `npx tsc --noEmit` sin errores ni advertencias de animaciones no puras.
- [ ] Cero uso de `Math.random()` o `transition-*` de CSS.
- [ ] Renderizado e inspección visual con `read_file` de al menos 3–5 stills (`npx remotion still`) comprobando que ningún titular se parta en dos líneas y que la composición 3D sea legible.
- [ ] Verificación del MP4 final con `ffprobe` (`1080x1920`, `60 fps`, audio AAC sincronizado).
