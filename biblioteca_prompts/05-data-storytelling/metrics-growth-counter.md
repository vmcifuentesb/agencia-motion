# Template 05: Metrics & Growth Counter (Data Storytelling)

Diseñado para videos corporativos, informes de resultados anuales, casos de éxito y videos de demostración de ROI. Convierte datos y estadísticas complejas en narrativas visuales dinámicas con contadores numéricos acelerados, gráficos de barras o líneas crecientes y estética de panel de control financiero moderno.

---

## ⚙️ Metadatos
- **Motor Recomendado**: `Remotion` (React con funciones matemáticas interpoladas) o `HyperFrames`
- **Aspect Ratio**:
  - Horizontal: `1920x1080` (16:9 — Presentaciones a inversores / YouTube)
  - Vertical: `1080x1920` (9:16 — Social Proof en TikTok / Reels)
- **FPS**: `30`
- **Duración Típica**: 15 a 25 segundos (450 a 750 frames)

---

## 🎨 Sistema Visual & Paleta Cromática
- **Estética**: *Fintech Dark Terminal / High-End Analytics Dashboard*.
- **Fondo**: `#080B11` con cuadrícula técnica sutil (`border: 1px solid rgba(255, 255, 255, 0.04)` en celdas de 80x80px).
- **Color de Crecimiento Positivo**: `#10B981` (Emerald Green) o `#22C55E`.
- **Acento Tecnológico**: `#3B82F6` (Electric Blue) y `#8B5CF6` (Purple Glow).
- **Tipografía para Números**: Monoespaciada moderna de alto contraste (`Geist Mono`, `JetBrains Mono`, `SF Mono Bold`).
- **Glow Effects**: Sombra perimetral en las líneas de los gráficos (`filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.5))`).

---

## ⏱️ Reglas de Física & Movimiento (Motion Rules)
- **Contador Numérico (Counter Dynamics)**:
  - Función de aceleración y desaceleración no lineal: el número comienza a subir rápido y desacelera progresivamente hacia la cifra final (`ease-out`).
  - Símbolo de porcentaje (`%`), moneda (`$`) o multiplicador (`x`) con ligero desfase (stagger) para entrar justo cuando el número se fija.
- **Trazado de Gráficos (Path Draw)**:
  - Trazado de líneas SVG mediante `strokeDashoffset` con curva suave (`power3.out` o `expo.out`).
  - Barras verticales que crecen desde el eje inferior con resorte suave (`damping: 15, stiffness: 100`).
- **Puntos de Hito (Milestone Pins)**:
  - Aparecen secuencialmente en los picos más altos del gráfico con una pequeña onda de choque o halo expansivo.

---

## 🚫 Anti-Patterns (Reglas de Exclusión Estricta)
- ❌ **NO** usar gráficos estáticos de imagen PNG o capturas planas de Excel.
- ❌ **NO** hacer que los números cambien de manera instantánea o lineal aburrida sin aceleración física.
- ❌ **NO** sobrecargar la pantalla con demasiadas métricas a la vez; focalizar la atención en 1 o 2 datos críticos por escena.
- ❌ **NO** omitir la unidad de medida (siempre indicar si son dólares, usuarios, horas o porcentaje).

---

## 🎬 Estructura del Timeline (Ejemplo 15 segundos a 30fps = 450 frames)

| Tiempo | Frames | Fase | Elementos Visuales |
|---|---|---|---|
| **00:00 - 00:03** | `0 - 90` | **El Contexto** | Badge superior *"Resultados Q3"*. La cuadrícula base y los ejes del gráfico se dibujan desde los bordes. |
| **00:03 - 00:09** | `90 - 270` | **El Disparo de Crecimiento** | La línea del gráfico sube con un resplandor esmeralda. El contador central pasa velozmente de `0` a `+340%`. |
| **00:09 - 00:12** | `270 - 360` | **El Hito Clave** | Un marcador circular se fija en la cima del gráfico con el texto *"10x más rápido que el promedio del sector"*. |
| **00:12 - 00:15** | `360 - 450` | **Conclusión & CTA** | La pantalla se atenúa ligeramente y emerge la frase de cierre: *"Multiplica tus resultados hoy"*. |

---

## 💻 Starter Snippet (Remotion React - Contador Numérico Interpolado)

```tsx
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const GrowthMetric = ({ endValue = 340, prefix = "+", suffix = "%" }) => {
  const frame = useCurrentFrame();

  // El contador sube de 0 a endValue en 60 frames con frenado suave
  const currentValue = Math.round(
    interpolate(frame, [0, 60], [0, endValue], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
        Rendimiento Comprobado
      </span>
      <div className="mt-2 font-mono text-8xl font-black text-white tracking-tight">
        {prefix}{currentValue.toLocaleString()}{suffix}
      </div>
    </div>
  );
};
```
