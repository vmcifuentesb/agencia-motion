# Template 03: Hook-Problem-Solution (Social Ads & Reels 9:16)

Diseñado específicamente para campañas de marketing en redes sociales (**Instagram Reels, TikTok Ads y YouTube Shorts**). Optimizado para maximizar el porcentaje de retención en los primeros 3 segundos y convertir al espectador con un llamado a la acción inequívoco.

---

## ⚙️ Metadatos
- **Motor Recomendado**: `Remotion` (React con soporte de audio, assets dinámicos y captions)
- **Aspect Ratio**: `1080x1920` (9:16 Exclusivo Vertical)
- **FPS**: `30`
- **Duración Típica**: 15 a 30 segundos (450 a 900 frames)

---

## 🎨 Sistema Visual & Paleta Cromática
- **Safe Zones**: Respetar los márgenes de interfaz de TikTok/Instagram (dejar libres los 150px superiores y los 280px inferiores para botones de like/comentario y descripción).
- **Fondo**: `#0A0F1D` con sutil grid perimetral o gradiente oscuro.
- **Color de Gancho (Hook Badge)**: `#EF4444` (Alerta/Urgencia) o `#F59E0B` (Atención dorada).
- **Acento de Solución**: `#10B981` (Verde Esmeralda de Éxito) o `#6366F1` (Índigo Tecnológico).
- **Textos / Subtítulos Dinámicos**: Tipografía bold (`Inter Black` o `Montserrat ExtraBold`), texto blanco con sombra de contraste o caja de fondo con `padding: 6px 14px`.

---

## ⏱️ Reglas de Física & Movimiento (Motion Rules)
- **Primeros 3 Segundos (The Hook)**:
  - Movimiento continuo desde el frame 0. El video **NUNCA** debe comenzar estático.
  - Zoom dinámico de cámara o del elemento principal (`scale: 1.0` a `1.08` durante los primeros 45 frames).
  - Texto del hook entra en dos golpes: golpe 1 (palabras 1-2) en frame 5, golpe 2 (palabra clave) en frame 18 con efecto "pop".
- **Animación del Problema (Agitación)**:
  - Micro-vibración sutil o tarjeta de error con icono tachado o métrica en rojo descendiendo.
- **Revelación de la Solución**:
  - Transición fluida con resorte ágil: `damping: 12, mass: 0.6, stiffness: 150`.
  - Checkmarks animados o tarjeta de producto que reemplaza la frustración anterior.
- **CTA Final Pulsante**:
  - Botón de acción con pulso cíclico cada 24 frames (`scale: 1.0` → `1.05` → `1.0`).

---

## 🚫 Anti-Patterns (Reglas de Exclusión Estricta)
- ❌ **NO** colocar textos o logotipos en las esquinas inferiores derechas (tapadas por la UI de TikTok/Reels).
- ❌ **NO** esperar más de 1.5 segundos para mostrar el texto principal del gancho.
- ❌ **NO** usar transiciones de barrido de estrella o efectos de transición anticuados tipo PowerPoint.
- ❌ **NO** presentar una voz en off monótona sin subtítulos dinámicos coordinados palabra por palabra.

---

## 🎬 Estructura del Timeline (Ejemplo 20 segundos a 30fps = 600 frames)

| Tiempo | Frames | Fase Narrativa | Acción en Pantalla |
|---|---|---|---|
| **00:00 - 00:03** | `0 - 90` | **El Gancho (The Hook)** | Badge superior de alerta *"Deja de perder horas en esto"*. Titular gigante en el centro con zoom continuo. |
| **00:03 - 00:07** | `90 - 210` | **El Problema (Pain Point)** | Tarjeta de frustración mostrando el método tradicional ineficiente (icono de advertencia y tiempo perdido). |
| **00:07 - 00:14** | `210 - 420` | **La Solución (The Fix)** | Transición dinámica: la tarjeta antigua sale disparada hacia la izquierda y entra la UI de la app o producto con una interfaz pulida y rápida. |
| **00:14 - 00:17** | `420 - 510` | **El Resultado / Métrica** | Indicador de resultado instantáneo: *"De 4 horas a 30 segundos"* con contador y check verde. |
| **00:17 - 00:20** | `510 - 600` | **CTA de Alta Conversión** | Botón central *"Pruébalo gratis hoy"* con botón pulsante e indicación de flecha hacia abajo. |

---

## 💻 Starter Snippet (Remotion React con Subtítulo Dinámico)

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const HookScene = ({ hookText, badgeText }: { hookText: string; badgeText: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 180 },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
      <div
        style={{ transform: `scale(${pop})` }}
        className="rounded-full bg-red-500/20 border border-red-500/50 px-6 py-2 text-xl font-bold uppercase tracking-wider text-red-400"
      >
        {badgeText}
      </div>
      <h1
        style={{ opacity: pop, transform: `translateY(${(1 - pop) * 30}px)` }}
        className="mt-6 text-6xl font-black leading-tight text-white"
      >
        {hookText}
      </h1>
    </div>
  );
};
```
