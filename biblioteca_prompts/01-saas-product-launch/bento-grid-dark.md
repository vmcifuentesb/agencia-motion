# Template 01: Bento Grid Dark SaaS Showcase

Inspirado en los videos de lanzamiento de productos de primer nivel (*Linear, Raycast, Vercel*). Diseñado para mostrar múltiples características, micro-interacciones de producto y métricas en una cuadrícula moderna y sofisticada.

---

## ⚙️ Metadatos
- **Motor Recomendado**: `Remotion` (React + Tailwind v4) o `HyperFrames` (DOM con CSS Grid)
- **Aspect Ratio**: 
  - Horizontal: `1920x1080` (16:9 — Landing / YouTube / Keynote)
  - Vertical: `1080x1920` (9:16 — Reels / TikTok / Shorts)
- **FPS**: `30` o `60`
- **Duración Típica**: 15 a 30 segundos (450 a 900 frames a 30fps)

---

## 🎨 Sistema Visual & Paleta Cromática
- **Fondo Primario**: `#07090E` (Obsidian Deep)
- **Fondo de Tarjetas (Bento Cards)**: `#0F141F` con borde `1px solid rgba(255, 255, 255, 0.08)`
- **Acento Primario**: `#6366F1` (Electric Indigo) o `#38BDF8` (Sky Blue)
- **Acento Secundario / Gradiente**: Linear gradient `135deg, #6366F1 0%, #A855F7 100%`
- **Tipografía de Títulos**: Sans-serif moderna y geométrica (`Geist`, `Inter Display`, `SF Pro Display`), weight `700` a `800`, tracking `-0.03em`.
- **Tipografía de Cuerpo / Labels**: Sans-serif limpia (`Geist Mono` para números/código, `Inter` para texto), weight `400` a `500`.
- **Efectos de Tarjeta**: Gradiente radial sutil en hover/focus (`radial-gradient(circle at top, rgba(99,102,241,0.12), transparent 70%)`).

---

## ⏱️ Reglas de Física & Movimiento (Motion Rules)
- **Entrada de Tarjetas**:
  - `spring({ fps: 30, frame: currentFrame - delay, config: { damping: 14, mass: 0.8, stiffness: 130 } })`
  - Escala: `0.92` → `1.00`
  - Opacidad: `0` → `1`
  - Traslación Y: `+40px` → `0px`
- **Stagger entre Tarjetas**: 4 a 6 frames de separación secuencial.
- **Micro-animaciones Internas**:
  - Indicadores de estado: Pulsos de escala `1.0` a `1.15` en bucle suave.
  - Cifras / Contadores: Aceleración con curva `power2.out` en los primeros 30 frames tras la aparición de la tarjeta.
- **Cierre / Transición de Escena**: Zoom sutil de toda la cuadrícula (scale `1.0` a `1.05`) antes de disolverse en el CTA final.

---

## 🚫 Anti-Patterns (Reglas de Exclusión Estricta)
- ❌ **NO** utilizar rebotes gomosos o caricaturescos (evitar `damping < 8`).
- ❌ **NO** saturar la pantalla con partículas flotantes o destellos no justificados.
- ❌ **NO** usar sombras difusas negras gigantescas (`box-shadow: 0 20px 50px rgba(0,0,0,0.9)` sucia); preferir bordes sutiles con `rgba(255, 255, 255, 0.08)` y sombras precisas con difusión pequeña.
- ❌ **NO** usar transiciones de corte brusco entre tarjetas sin coordinación de tiempo.

---

## 🎬 Estructura del Timeline (Ejemplo 20 segundos a 30fps = 600 frames)

| Tiempo | Frames | Escena | Descripción & Acción |
|---|---|---|---|
| **00:00 - 00:03** | `0 - 90` | **El Gancho (Hook)** | Badge de categoría aparece, seguido del titular principal con tipografía kinetic que entra desde abajo. Fondo con brillo sutil. |
| **00:03 - 00:10** | `90 - 300` | **Bento Grid Reveal** | 3 o 4 tarjetas Bento se deslizan escalonadas (Feature 1: Velocidad, Feature 2: Automatización, Feature 3: Integraciones). |
| **00:10 - 00:15** | `300 - 450` | **Focus en la Métrica Clave** | La tarjeta central se expande levemente o su contador interno se activa (ej. "+340% de productividad"). Las demás tarjetas bajan su opacidad a 0.6. |
| **00:15 - 00:20** | `450 - 600` | **Resolución & CTA** | La cuadrícula se desvanece suavemente mientras emerge el logotipo de la marca, el claim final y el botón interactivo con brillo perimetral. |

---

## 💻 Starter Snippet (Remotion React)

```tsx
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const BentoCard = ({ title, metric, delay = 0 }: { title: string; metric: string; delay?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 130 },
  });

  const translateY = interpolate(entrance, [0, 1], [40, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.94, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
      }}
      className="rounded-2xl border border-white/10 bg-[#0F141F] p-6 shadow-2xl"
    >
      <h3 className="text-sm font-medium uppercase tracking-wider text-indigo-400">{title}</h3>
      <div className="mt-2 text-4xl font-extrabold text-white">{metric}</div>
    </div>
  );
};
```
