# Template 04: Landing Page Flyover & Showcase

Diseñado para exhibir sitios web, aplicaciones SaaS o landing pages a partir de una URL o captura real del DOM. Ideal para portafolios de agencias, lanzamientos de plataformas y demostraciones de producto donde se busca un recorrido elegante ("flyover") del sitio en un navegador estilizado.

---

## ⚙️ Metadatos
- **Motor Recomendado**: `HyperFrames` (Navegación nativa en DOM/HTML o screenshots reales) o `Remotion` (mediante mockups renderizados)
- **Aspect Ratio**:
  - Horizontal: `1920x1080` (16:9 — Showcase de producto y presentaciones)
  - Vertical: `1080x1920` (9:16 — Reels mostrando la versión responsive móvil)
- **FPS**: `30` o `60`
- **Duración Típica**: 20 a 40 segundos (600 a 1200 frames)

---

## 🎨 Sistema Visual & Paleta Cromática
- **Fondo de Escena (Backdrop)**: Gradiente radial oscuro profundo `#0B0E17` a `#05070B` con cuadrícula de puntos sutil (*dot matrix* con `rgba(255, 255, 255, 0.05)`).
- **Marco del Navegador (Browser Mockup)**:
  - Ventana redondeada (`border-radius: 16px`), borde `1px solid rgba(255, 255, 255, 0.12)`.
  - Barra superior con los 3 botones de control de macOS (rojo `#FF5F56`, amarillo `#FFBD2E`, verde `#27C93F`).
  - Barra de URL simulada con texto atenuado (`https://tuweb.com`) e icono de candado SSL.
- **Puntero del Ratón / Cursor**: Cursor estilizado en SVG con vector brillante y animación de clic (pulso concéntrico al hacer tap).
- **Destacadores (Callout Badges)**: Píldoras flotantes con fondo translúcido tipo vidrio (*glassmorphism*) y borde brillante para señalar botones o secciones destacadas.

---

## ⏱️ Reglas de Física & Movimiento (Motion Rules)
- **Cámara & Perspectiva**:
  - Entrada con perspectiva 3D sutil: rotación `rotateX: 12deg`, `rotateY: -6deg`, `scale: 0.9` que transiciona suavemente a vista frontal plana (`rotateX: 0deg`, `rotateY: 0deg`, `scale: 1.0`).
- **Desplazamiento del Sitio (Scroll Simulation)**:
  - Scroll fluido utilizando curva `power2.inOut` para simular la inercia de un trackpad de MacBook.
  - Pausas tácticas de 1 a 2 segundos en las secciones clave (Hero, Features, Pricing) para permitir lectura.
- **Micro-interacción de Clic**:
  - El cursor viaja desde fuera de pantalla hacia el botón principal (ej. "Get Started").
  - Al llegar: escala del cursor `1.0` → `0.85` → `1.0`, y el botón reacciona con un destello perimetral.

---

## 🚫 Anti-Patterns (Reglas de Exclusión Estricta)
- ❌ **NO** utilizar movimientos de scroll bruscos o lineales a velocidad constante sin frenado (evitar sensación de robot).
- ❌ **NO** desenfocar o comprimir las capturas de texto del sitio web; el texto de la página debe mantenerse 100% nítido.
- ❌ **NO** usar un cursor de flecha tosco de sistema operativo genérico; usar siempre un puntero SVG limpio y estilizado.
- ❌ **NO** recortar los bordes de la página web de manera arbitraria sin un contenedor armonioso.

---

## 🎬 Estructura del Timeline (Ejemplo 25 segundos a 30fps = 750 frames)

| Tiempo | Frames | Sección | Movimiento de Cámara & DOM |
|---|---|---|---|
| **00:00 - 00:04** | `0 - 120` | **Intro & Presentación del Mockup** | El navegador entra con ligera inclinación 3D y se estabiliza. Titular superior introduce el proyecto. |
| **00:04 - 00:10** | `120 - 300` | **Hero Section & Primer Clic** | Zoom al 115% hacia el titular de la web. El cursor entra y hace clic en el botón de reproducción o navegación. |
| **00:10 - 00:18** | `300 - 540` | **Smooth Scroll por el Sitio** | Desplazamiento vertical fluido hacia la sección de características. Una píldora flotante señala una función estrella. |
| **00:18 - 00:25** | `540 - 750` | **Alejamiento (Zoom Out) & CTA Final** | La ventana del navegador se aleja suavemente, revelando el enlace final y el llamado a la acción. |

---

## 💻 Starter Snippet (HyperFrames DOM + GSAP)

```html
<div id="browser-window" class="mockup" style="transform-origin: center center;">
  <div class="browser-header">
    <div class="dots"><span></span><span></span><span></span></div>
    <div class="url-bar">https://app.com</div>
  </div>
  <div class="browser-viewport">
    <div id="page-content">
      <!-- Contenido de la página web o imagen de alta resolución -->
      <img src="assets/landing-full.png" style="width: 100%; display: block;" />
    </div>
  </div>
</div>

<script>
  // Timeline en HyperFrames
  tl.fromTo("#browser-window", 
    { scale: 0.9, opacity: 0, y: 50 }, 
    { scale: 1.0, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 
    0
  )
  .to("#page-content", {
    y: -800, // Scroll hacia abajo
    duration: 3.5,
    ease: "power2.inOut"
  }, 2.0);
</script>
```
