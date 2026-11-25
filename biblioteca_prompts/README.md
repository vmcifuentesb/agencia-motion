# 🎬 Biblioteca de Prompts & Templates de Motion Design
> Inspirada en el estándar de calidad de [Prompt Motion](https://prompt-motion.com/), optimizada para **Remotion** (React/TSX) y **HyperFrames** (HTML5/DOM/GSAP).

Esta biblioteca proporciona especificaciones técnicas, directivas visuales, reglas de física y estructuras narrativas listas para ser interpretadas por el **Motion Director** y ejecutadas por los motores de renderizado del estudio.

---

## 📑 Catálogo de Templates

| # | Categoría | Template | Motores | Formatos | Duración Típica |
|---|---|---|---|---|---|
| **01** | **SaaS & Tech** | [`bento-grid-dark.md`](./01-saas-product-launch/bento-grid-dark.md) | Remotion / HyperFrames | 16:9 / 9:16 | 15s – 30s |
| **02** | **Kinetic Typography** | [`swiss-bold-statement.md`](./02-kinetic-typography/swiss-bold-statement.md) | Remotion / HyperFrames | 9:16 / 16:9 | 10s – 20s |
| **03** | **Social Ads / Reels** | [`hook-problem-solution.md`](./03-social-reels-tiktok/hook-problem-solution.md) | Remotion | 9:16 (Vertical) | 15s – 30s |
| **04** | **Web Showcase** | [`landing-page-scan.md`](./04-web-showcase-flyover/landing-page-scan.md) | HyperFrames | 16:9 / 9:16 | 20s – 45s |
| **05** | **Data Storytelling** | [`metrics-growth-counter.md`](./05-data-storytelling/metrics-growth-counter.md) | Remotion / HyperFrames | 16:9 / 9:16 | 15s – 25s |
| **06** | **Super Motion 3D (Estándar Mínimo)** | [`swiss-kinetic-3d-showreel.md`](./06-super-motion-3d/swiss-kinetic-3d-showreel.md) | Remotion | 9:16 / 16:9 | 15s – 30s |

---

## 📐 Anatomía de un Prompt de Motion Design de Alta Precisión

Para evitar que los modelos de lenguaje generen animaciones genéricas ("AI slop"), cada plantilla contiene 6 componentes esenciales:

1. **Metadatos Técnicos**: Motor recomendado, relación de aspecto, FPS y rango de duración.
2. **Sistema Visual & Paleta Cromática**: Códigos HEX exactos de fondo, texto, acentos y bordes, tipografías y tracking.
3. **Reglas de Física & Movimiento (Motion Rules)**: Parámetros de resortes (`mass`, `damping`, `stiffness`) o curvas Bézier (`cubic-bezier`), delays de stagger y transiciones.
4. **Lista de Exclusión Negativa (Anti-AI Patterns)**: Prohibición explícita de vicios comunes (rebotes excesivos, partículas flotantes no motivadas, sombras difusas sucias, fuentes genéricas).
5. **Timeline Segundo a Segundo**: Estructura de escenas con hooks de retención, demostración y llamada a la acción (CTA).
6. **Starter Snippet**: Implementación base lista para adaptar en React/TSX o HTML/GSAP.

---

## 🤖 ¿Cómo interactúa el Motion Director con esta biblioteca?

Cuando solicites un video (ejemplo: *"Quiero un reel para promocionar mi app financiera"*), el **Motion Director**:
1. Busca la plantilla que mejor se adapte a tu caso de uso en esta biblioteca.
2. Te propone el estilo y la paleta o te permite personalizarla.
3. Inyecta el guion y los textos en la estructura temporal.
4. Genera el código correspondiente en `remotion/src/` o `hyperframe/index.html`.
