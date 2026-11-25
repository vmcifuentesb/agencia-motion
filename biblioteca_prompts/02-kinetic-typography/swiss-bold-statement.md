# Template 02: Swiss Bold Statement (Kinetic Typography)

Inspirado en el Estilo Tipográfico Internacional (Swiss Style) y en la tipografía cinética de alto impacto de los showreels contemporáneos. Ideal para declaraciones de marca contundentes, manifiestos, frases célebres o intros de video donde las palabras son las protagonistas indiscutibles.

---

## ⚙️ Metadatos
- **Motor Recomendado**: `Remotion` o `HyperFrames`
- **Aspect Ratio**:
  - Vertical: `1080x1920` (9:16 — Reels / TikTok / Shorts)
  - Horizontal: `1920x1080` (16:9 — Brand Film / Teaser)
- **FPS**: `30`
- **Duración Típica**: 10 a 20 segundos (300 a 600 frames)

---

## 🎨 Sistema Visual & Paleta Cromática
- **Contraste Extremo**: Blanco y Negro puro con un único color de acento suizo.
  - Fondo Primario: `#000000` (o `#FFFFFF` en variante inversa)
  - Color de Texto Primario: `#FFFFFF` (o `#0A0A0A`)
  - Acento Focal Único: `#FF3333` (Swiss Red Internacional) o `#FF5500` (Safety Orange)
- **Tipografía**: Neo-Grotesque de alto impacto (`Helvetica Neue Heavy`, `Neue Haas Grotesk`, `Inter Tight Black`, `Geist ExtraBold`).
- **Tracking & Leading**: Tracking ultracompacto (`-0.04em`), leading muy ajustado (`0.95` a `1.05`).
- **Composición Espacial**: Alineación matemática a los márgenes; textos gigantes que ocupan entre el 60% y el 90% del ancho del viewport.

---

## ⏱️ Reglas de Física & Movimiento (Motion Rules)
- **Cortes y Ritmo**:
  - Animación por palabras o frases de alta frecuencia (entre 12 y 24 frames por palabra o cambio de frase).
  - Transiciones sin desvanecimientos lentos; usar **cortes duros (hard cuts)** o máscaras de recorte instantáneas (`overflow: hidden` con revelado vertical tipo *mask reveal*).
- **Curva de Revelado de Texto (Mask Reveal)**:
  - `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-snappy con frenado suave).
  - El texto viaja desde `100%` (oculto tras la línea de máscara inferior) hasta `0%` (posición visible) en solo 8 a 12 frames.
- **Micro-interacción de Énfasis**:
  - La palabra clave se invierte cromáticamente (fondo rojo y texto blanco) en un solo frame sincronizado con el acento de audio o beat.

---

## 🚫 Anti-Patterns (Reglas de Exclusión Estricta)
- ❌ **NO** utilizar tipografías manuscritas, decorativas o con serifas anticuadas.
- ❌ **NO** usar desenfoques de movimiento (motion blur) borrosos o degradados pasteles.
- ❌ **NO** permitir que el texto tarde más de 0.5 segundos en ser legible: la legibilidad debe ser instantánea.
- ❌ **NO** colocar múltiples colores de acento competidores; solo uno además del blanco y negro.

---

## 🎬 Estructura del Timeline (Ejemplo 12 segundos a 30fps = 360 frames)

| Tiempo | Frames | Palabra / Frase | Acción Visual |
|---|---|---|---|
| **00:00 - 00:02** | `0 - 60` | *"CREATIVIDAD"* | Palabra en blanco gigante centrada, máscara de revelado de abajo hacia arriba en frame 5. |
| **00:02 - 00:04** | `60 - 120` | *"SIN LIMITES."* | Corte duro: el fondo cambia a rojo suizo `#FF3333`, texto en negro profundo con escala inmediata. |
| **00:04 - 00:08** | `120 - 240` | *"DISEÑADO POR CÓDIGO."* | Tres líneas que se revelan en cascada rápida (stagger de 6 frames entre línea). |
| **00:08 - 00:12** | `240 - 360` | *"CONOCE EL ESTUDIO →"* | Cierre minimalista: texto a 50% de tamaño con el logotipo y la URL en tipografía monoespaciada en la parte inferior. |

---

## 💻 Starter Snippet (HyperFrames HTML + GSAP)

```html
<div class="mask-container" style="overflow: hidden; height: 120px;">
  <h1 id="swiss-title" style="transform: translateY(120px); font-size: 96px; font-weight: 900; letter-spacing: -0.04em;">
    REVOLUCIÓN
  </h1>
</div>

<script>
  tl.to("#swiss-title", {
    y: 0,
    duration: 0.45,
    ease: "power4.out" // Curva ultra-rápida y limpia
  }, 0.2);
</script>
```
