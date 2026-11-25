# Fuentes de Inspiración & Catálogo de Arquetipos Creativos

> Este documento alimenta al agente investigador **`trend-scout`** (`.agents/skills/trend-scout/SKILL.md`).
> Su objetivo es evitar la repetición visual y asegurar que **cada nuevo video sea artísticamente distinto al anterior**, manteniendo el 100% de fidelidad al Brand Kit de la empresa (`brand/brand.md` o `marcas/<empresa>/brand.md`).

---

## 1. Mis Fuentes Personalizadas (Prioridad Máxima)

> Añade aquí en cualquier momento tus URLs, repositorios, canales de YouTube, perfiles de Instagram/TikTok, tableros de Behance, Dribbble o Are.na. `trend-scout` siempre revisará esta sección primero.

- **Awesome Opus 5.5 Videos**: https://github.com/yihui-dev/awesome-opus5-5-videos
  - *Enfoque:* Repositorio curado de videos programáticos, técnicas artísticas experimentales y código de motion design de vanguardia.
- **Prompt Motion**: https://prompt-motion.com/
  - *Enfoque:* Referente de dirección de arte, física de movimiento, reglas anti-AI-slop y timelines de alta precisión.
- **Skillry — AI Videos Showcase (Opus 5.5)**: https://skillry.dev/ai-videos/opus-5-5?utm_source=github&utm_medium=readme&utm_campaign=awesome-opus5-5-videos
  - *Enfoque:* Galería visual de estilos creativos, transiciones novedosas y formatos virales programáticos.

*(Espacio para seguir agregando tus fuentes favoritas)*:
- `Nombre de tu fuente`: `URL` — *Nota de estilo*

---

## 2. Fuentes Curadas Base de la Agencia (Para Búsqueda Activa)

Cuando `trend-scout` realice investigación web (`search_web`) de tendencias virales y diseño contemporáneo, puede consultar referencias de:
- **Motionographer** (`motionographer.com`) — Dirección de arte, title sequences, experimental motion.
- **Eyecandy** (`eyecandy.co`) — Diccionario visual de técnicas de cámara, transiciones, match cuts y composición.
- **Godly** (`godly.website`) & **Awwwards** (`awwwards.com`) — Tendencias web, tipografía cinética, WebGL y micro-interacciones modernas.
- **Curated Design** (`curated.design`) — Estética editorial, SaaS dark/light y diseño gráfico de alto contraste.
- **Stash Media** (`stashmedia.tv`) & **Behance Motion** (`behance.net`) — Showreels comerciales, branding en movimiento y 3D.

### Consultas sugeridas para `search_web`
- `"viral motion graphics design trends 2026 kinetic typography"`
- `"editorial motion design reel transition techniques match cut"`
- `"3d product launch animation webgl linear apple style"`
- `"motion canvas technical explainer vector morphing inspiration"`

---

## 3. Matriz de 12 Arquetipos Artísticos Distintivos

`trend-scout` selecciona y combina de esta matriz para garantizar que **dos videos consecutivos de la misma marca nunca repitan lenguaje visual**. Todos son adaptables a cualquier paleta HEX y tipografía de marca.

| ID | Arquetipo Visual | Firma Estética & Lenguaje | Motor(es) Ideal(es) | Cámara / Transición Dominante | Cómo adaptarlo a la Marca |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `01-swiss-kinetic-3d` | **Swiss Kinetic 3D / Brutalismo Editorial** | Retículas visibles, tipografía escultórica con extrusión 3D, alto contraste, telemetría HUD y órbita 3D. | **Remotion** | Whip-Zoom exponencial, Impact Shake, Iris Wipe. | Usa el Fondo Principal + Acento como tinta dominante y tipografía Display de marca en extrusión. |
| `02-spatial-glass-3d` | **Apple / Linear Spatial Glass 3D** | Escenario WebGL con iluminación suave, mockups/objetos 3D flotantes, vidrio esmerilado y reflejos especulares. | **Remotion + `@remotion/three`** | Paneo orbital 3D suave, dolly-in cinematográfico. | Colores de superficie de marca en materiales PBR y acento como luz rim/emisiva. |
| `03-vector-morph-explainer` | **Vector Morphing & Technical Explainer** | Formas vectoriales que mutan entre sí, diagramas limpios, flechas vivas, bloques de código o arquitectura. | **Motion Canvas** | Morphing continuo (`yield*`), zoom selectivo en nodo. | Trazo y rellenos en los HEX de marca; tipografía mono de marca en anotaciones. |
| `04-live-web-flyover` | **Live Web Flyover & DOM Showcase** | Captura real de producto/web, scroll cinético en perspectiva, cursores guiando la mirada y zoom a UI real. | **HyperFrames** | Flyover 3D CSS, punch-in a componente DOM. | Muestra la web/app real de la marca con overlays tipográficos usando su Brand Kit. |
| `05-editorial-collage` | **Editorial Magazine / Mixed-Media Collage** | Recortes fotográficos con bordes rasgados/geométricos, texto apilado asimétrico, texturas de papel y ritmo sincopado. | **Remotion** / **HyperFrames** | Match cut rítmico, slide-in de láminas con *stagger*. | Fotos del producto/equipo de marca recortadas sobre el fondo claro/oscuro oficial. |
| `06-bento-saas-lottie` | **Bento Grid SaaS & Micro-Interactions** | Tarjetas modulares estilo Bento que respiran, iconos Lottie vectoriales animados, estados interactivos y métricas. | **Remotion + `@remotion/lottie`** | Reorganización de grid (FLIP/spring), zoom a tarjeta. | Cada tarjeta usa `Superficie` + borde sutil y los Lottie se recolorean al HEX de acento. |
| `07-retro-crt-risograph` | **Retro CRT / Risograph / Neo-Brutalist Zine** | Scanlines sutiles, grano analógico, sombras duras sin blur, marcos gruesos y estética print/VHS moderna. | **HyperFrames** (registry) / **Remotion** | Glitch cut de 2 frames, barrido de persiana CRT. | Usa paleta oficial en modo duotono/risografía para un look alternativo sin perder el color de marca. |
| `08-liquid-shader-art` | **Liquid Glass & Custom GLSL Shader Art** | Fondos orgánicos fluidos por shader WebGL, refracción líquida, partículas 3D y tipografía ultra-limpia flotando encima. | **Remotion + `@remotion/three`** | Disolución líquida, cámara flotante continua. | Shaders parametrizados estrictamente con los 2–3 HEX oficiales de la marca. |
| `09-japanese-minimal-zen` | **Minimalismo Japonés / Kinetic Negative Space** | 70%+ de espacio negativo, líneas finas de 1px, tipografía pequeña milimétrica + un solo gesto heroico lento-rápido. | **Motion Canvas** / **HyperFrames** | Deslizamiento silencioso con desaceleración larga (`easeOutExpo`). | Ideal para marcas `Premium`: usa Fondo Claro/Oscuro puro y un único acento quirúrgico. |
| `10-data-storytelling` | **High-Tempo Data Storytelling & Infographics** | Contadores acelerados, barras/líneas SVG que se dibujan en vivo, comparativas antes/después y badges de impacto. | **Motion Canvas** / **Remotion** | Wipe horizontal con barra de progreso sincronizada. | Gráficos pintados exclusivamente con la escala cromática de la marca. |
| `11-documentary-split` | **High-Ticket Documentary / Split-Frame Motion** | Pantalla dividida (2 o 3 paneles), B-roll o siluetas de alto contraste, subrayados a mano/SVG y subtítulos editoriales. | **Remotion** | Cortinilla vertical dividida + zoom sutil tipo Ken Burns. | Combina voz/narrativa de marca con resaltados en su color de acento. |
| `12-isometric-vector-world` | **Isometric Vector System & Diagrammatic Flow** | Escenas isométricas en 2.5D, tuberías de datos, nodos conectados e iconos Lottie integrados en un mapa sistémico. | **Motion Canvas** / **Remotion + Lottie** | Paneo isométrico diagonal siguiendo el flujo de datos. | Convierte el servicio de la empresa en un ecosistema visual en su paleta exacta. |
