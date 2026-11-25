import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Helper for Ajith-style bouncy overshoot springs
export const useBouncySpring = (delay = 0, damping = 7.5, stiffness = 190, mass = 0.55) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping, stiffness, mass },
  });
};

// =========================================================================
// 1. WORKSPACE ILUSTRADO (Sin nombres de herramientas, puro código)
// =========================================================================
export const DeveloperWorkspaceIllustration: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const bounce = useBouncySpring(delay);
  const tag1Bounce = useBouncySpring(delay + 12);
  const tag2Bounce = useBouncySpring(delay + 22);
  const tag3Bounce = useBouncySpring(delay + 32);

  const float = Math.sin((frame / 20) * Math.PI) * 12;

  return (
    <div
      style={{
        width: 720,
        height: 520,
        position: "relative",
        transform: `scale(${bounce}) translateY(${float}px)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg width="680" height="480" viewBox="0 0 680 480" fill="none">
        <defs>
          <linearGradient id="glowLap" x1="340" y1="180" x2="340" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" stopOpacity="0.45" />
            <stop stopColor="#00F59B" stopOpacity="0.2" />
            <stop stopColor="#0B0F19" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Glow */}
        <ellipse cx="340" cy="270" rx="270" ry="170" fill="url(#glowLap)" />

        {/* Desk Surface */}
        <path d="M 60 410 L 620 410 L 580 435 L 100 435 Z" fill="#1E293B" />
        <rect x="60" y="410" width="560" height="6" fill="#334155" rx="3" />

        {/* Laptop Base */}
        <path d="M 220 375 L 460 375 L 485 402 L 195 402 Z" fill="#334155" />
        <rect x="290" y="383" width="100" height="10" rx="4" fill="#1E293B" />

        {/* Laptop Screen */}
        <rect x="235" y="210" width="210" height="165" rx="14" fill="#0F172A" stroke="#475569" strokeWidth="4" />
        <rect x="245" y="220" width="190" height="145" rx="8" fill="#090D16" />

        {/* Code Lines on Screen */}
        <rect x="258" y="238" width="60" height="8" rx="4" fill="#6366F1" />
        <rect x="326" y="238" width="80" height="8" rx="4" fill="#00F59B" />
        <rect x="258" y="256" width="110" height="8" rx="4" fill="#38BDF8" />
        <rect x="274" y="274" width="70" height="8" rx="4" fill="#F43F5E" />
        <rect x="274" y="292" width="130" height="8" rx="4" fill="#FACC15" />
        <rect x="258" y="310" width="40" height="8" rx="4" fill="#E2E8F0" />

        {/* Developer Silhouette */}
        <path d="M 280 410 C 280 365 310 345 340 345 C 370 345 400 365 400 410 Z" fill="#1E293B" stroke="#475569" strokeWidth="3" />
        <circle cx="340" cy="298" r="32" fill="#334155" stroke="#64748B" strokeWidth="3" />
        {/* Headphones */}
        <path d="M 304 293 C 304 263 376 263 376 293" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="300" y="288" width="10" height="20" rx="5" fill="#6366F1" />
        <rect x="370" y="288" width="10" height="20" rx="5" fill="#6366F1" />

        {/* Coffee Mug with steam */}
        <rect x="140" y="365" width="30" height="40" rx="6" fill="#F97316" />
        <path d="M 170 375 C 182 375 182 395 170 395" stroke="#F97316" strokeWidth="4" fill="none" />
      </svg>

      {/* Floating Tag 1: { Puro Código } */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 30,
          transform: `scale(${tag1Bounce})`,
          backgroundColor: "#161E2E",
          border: "3px solid #6366F1",
          borderRadius: 20,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 15px 40px rgba(99, 102, 241, 0.35)",
        }}
      >
        <span style={{ fontSize: 28 }}>⚡</span>
        <span style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF" }}>
          Puro Código
        </span>
      </div>

      {/* Floating Tag 2: 100% Tu Computadora */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 20,
          transform: `scale(${tag2Bounce})`,
          backgroundColor: "#0F231D",
          border: "3px solid #00F59B",
          borderRadius: 20,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 15px 40px rgba(0, 245, 155, 0.3)",
        }}
      >
        <span style={{ fontSize: 28 }}>💻</span>
        <span style={{ fontSize: 24, fontWeight: 900, color: "#00F59B" }}>
          100% Local
        </span>
      </div>

      {/* Floating Tag 3: Cero Licencias */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          transform: `scale(${tag3Bounce})`,
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #EF4444",
          borderRadius: 20,
          padding: "12px 26px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 15px 40px rgba(239, 68, 68, 0.3)",
        }}
      >
        <span style={{ fontSize: 28 }}>🚫</span>
        <span style={{ fontSize: 22, fontWeight: 900, color: "#FCA5A5" }}>
          SIN PAGAR LICENCIAS
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SUSCRIPCIONES CARAS TACHADAS VS LIBERTAD (Scene 2)
// =========================================================================
export const SubscriptionTrapIllustration: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const card1 = useBouncySpring(delay);
  const card2 = useBouncySpring(delay + 16);
  const stamp = useBouncySpring(delay + 28, 6.5, 220); // Extra punchy stamp

  return (
    <div
      style={{
        width: 880,
        display: "flex",
        gap: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Tarjeta 1: Suscripciones de $200 (El error) */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(35, 20, 25, 0.95)",
          border: "3px solid #EF4444",
          borderRadius: 32,
          padding: "40px 36px",
          boxShadow: "0 20px 60px rgba(239, 68, 68, 0.25)",
          position: "relative",
          transform: `scale(${card1})`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#EF4444", letterSpacing: "0.1em" }}>
            EL ERROR COMÚN
          </span>
          <span style={{ fontSize: 36 }}>💸</span>
        </div>

        <div style={{ fontSize: 44, fontWeight: 900, color: "#FFFFFF", marginBottom: 6 }}>
          Suscripciones
        </div>
        <div style={{ fontSize: 34, fontWeight: 900, color: "#F87171", marginBottom: 28 }}>
          $200 / mes ❌
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <SubFeature text="Tokens que se acaban" bad />
          <SubFeature text="Cuentas bloqueadas" bad />
          <SubFeature text="Pagos recurrentes eternos" bad />
        </div>

        {/* Sello Gigante "¡PARA NADA!" */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "8%",
            transform: `scale(${stamp}) rotate(-16deg)`,
            border: "6px solid #EF4444",
            padding: "12px 28px",
            borderRadius: 20,
            color: "#EF4444",
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: "0.08em",
            backgroundColor: "#0D0910",
            boxShadow: "0 10px 40px rgba(239, 68, 68, 0.6)",
          }}
        >
          ¡PARA NADA!
        </div>
      </div>

      {/* Tarjeta 2: Tu Código (Ganador) */}
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(12, 32, 26, 0.95)",
          border: "4px solid #00F59B",
          borderRadius: 32,
          padding: "40px 36px",
          boxShadow: "0 25px 70px rgba(0, 245, 155, 0.35)",
          transform: `scale(${card2})`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#00F59B", letterSpacing: "0.1em" }}>
            EL MÉTODO LIBRE
          </span>
          <span style={{ fontSize: 36 }}>🚀</span>
        </div>

        <div style={{ fontSize: 44, fontWeight: 900, color: "#FFFFFF", marginBottom: 6 }}>
          Animar con Código
        </div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#00F59B", marginBottom: 28 }}>
          $0 / MES SIEMPRE
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <SubFeature text="Directo en tu computadora" />
          <SubFeature text="Sin límites de duración" />
          <SubFeature text="Renderizado 100% tuyo" />
        </div>

        <div
          style={{
            marginTop: 28,
            backgroundColor: "rgba(0, 245, 155, 0.2)",
            border: "2px solid #00F59B",
            padding: "12px 20px",
            borderRadius: 14,
            textAlign: "center",
            fontSize: 22,
            fontWeight: 900,
            color: "#00F59B",
          }}
        >
          ✓ CERO DEPENDENCIAS
        </div>
      </div>
    </div>
  );
};

const SubFeature: React.FC<{ text: string; bad?: boolean }> = ({ text, bad }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: bad ? "rgba(239, 68, 68, 0.25)" : "rgba(0, 245, 155, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: bad ? "#EF4444" : "#00F59B",
        fontSize: 18,
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      {bad ? "✕" : "✓"}
    </div>
    <span style={{ fontSize: 22, color: bad ? "#94A3B8" : "#F1F5F9", fontWeight: 700 }}>{text}</span>
  </div>
);

// =========================================================================
// 3. EL UNIVERSO CREATIVO (Scene 3 - El límite es tu imaginación)
// =========================================================================
export const CreativeGalaxyIllustration: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const coreBounce = useBouncySpring(delay);
  const card1 = useBouncySpring(delay + 8);
  const card2 = useBouncySpring(delay + 16);
  const card3 = useBouncySpring(delay + 24);
  const card4 = useBouncySpring(delay + 32);

  const pulse = interpolate(Math.sin((frame / 12) * Math.PI), [-1, 1], [0.98, 1.04]);

  return (
    <div
      style={{
        width: 880,
        height: 600,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Central Core: Brain & Lightbulb */}
      <div
        style={{
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FF4D00 0%, #7C3AED 70%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 100px rgba(255, 77, 0, 0.6)",
          transform: `scale(${coreBounce * pulse})`,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 84 }}>🧠</span>
        <span style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.15em", marginTop: 4 }}>
          TU MENTE
        </span>
      </div>

      {/* Orbit 1: Micro-animaciones UI */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "#161E2E",
          border: "3px solid #38BDF8",
          borderRadius: 24,
          padding: "22px 26px",
          width: 280,
          boxShadow: "0 20px 50px rgba(56, 189, 248, 0.3)",
          transform: `scale(${card1})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 30 }}>✨</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#38BDF8" }}>INTERFACES & APPS</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>Micro-interacciones</div>
      </div>

      {/* Orbit 2: Tipografía Cinética */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 40,
          backgroundColor: "#1D132B",
          border: "3px solid #A855F7",
          borderRadius: 24,
          padding: "22px 26px",
          width: 290,
          boxShadow: "0 20px 50px rgba(168, 85, 247, 0.3)",
          transform: `scale(${card2})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 30 }}>🔤</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#C084FC" }}>TIPOGRAFÍA</span>
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF" }}>Texto en Movimiento</div>
      </div>

      {/* Orbit 3: Reels Verticales 9:16 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 20,
          backgroundColor: "#241418",
          border: "3px solid #F43F5E",
          borderRadius: 24,
          padding: "22px 26px",
          width: 280,
          boxShadow: "0 20px 50px rgba(244, 63, 94, 0.3)",
          transform: `scale(${card3})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 30 }}>📱</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#FB7185" }}>REELS COMERCIALES</span>
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF" }}>Alto Impacto 9:16</div>
      </div>

      {/* Orbit 4: Efectos & Datos */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 30,
          backgroundColor: "#0F231D",
          border: "3px solid #00F59B",
          borderRadius: 24,
          padding: "22px 26px",
          width: 270,
          boxShadow: "0 20px 50px rgba(0, 245, 155, 0.3)",
          transform: `scale(${card4})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 30 }}>📈</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#00F59B" }}>DATA STORIES</span>
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF" }}>Gráficos Dinámicos</div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. META COMUNITARIA / CURSO SI HAY INTERÉS (Scene 4)
// =========================================================================
export const CoursePassIllustration: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const cardBounce = useBouncySpring(delay);
  const meterProgress = useBouncySpring(delay + 14);

  return (
    <div
      style={{
        width: 880,
        backgroundColor: "#0D121F",
        border: "4px solid #6366F1",
        borderRadius: 40,
        padding: "52px 48px",
        boxShadow: "0 30px 100px rgba(99, 102, 241, 0.35)",
        transform: `scale(${cardBounce})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div
          style={{
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            border: "2px solid #6366F1",
            color: "#A5B4FC",
            padding: "8px 24px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "0.1em",
          }}
        >
          CONDICIÓN DE APERTURA
        </div>
        <div
          style={{
            backgroundColor: "#00F59B",
            color: "#0B0F19",
            padding: "8px 24px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 900,
          }}
        >
          ★ SÚPER ECONÓMICO
        </div>
      </div>

      <h2 style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.05, margin: "0 0 24px 0", color: "#FFFFFF" }}>
        ¿QUIERES QUE LES ENSEÑE?
      </h2>

      <p style={{ fontSize: 26, color: "#CBD5E1", lineHeight: 1.35, margin: "0 0 32px 0" }}>
        Si veo que a <b>muchos les interesa</b>, armo un curso completo paso a paso con precio simbólico para que todos puedan entrar.
      </p>

      {/* Community Goal Meter */}
      <div
        style={{
          backgroundColor: "#161E2E",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 24,
          padding: "24px 28px",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
          <span style={{ color: "#FACC15" }}>🔥 META COMUNITARIA</span>
          <span style={{ color: "#00F59B" }}>¡SÓLO SI HAY INTERÉS!</span>
        </div>
        <div style={{ height: 18, backgroundColor: "#1E293B", borderRadius: 999, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${Math.min(100, meterProgress * 85)}%`,
              background: "linear-gradient(90deg, #6366F1 0%, #00F59B 100%)",
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* 3 Pillars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <MiniPillar icon="🎯" title="Desde Cero" desc="Paso a paso" />
        <MiniPillar icon="💻" title="Puro Código" desc="Sin licencias caras" />
        <MiniPillar icon="🏷️" title="Precio Accesible" desc="Para todos" />
      </div>
    </div>
  );
};

const MiniPillar: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div
    style={{
      backgroundColor: "rgba(30, 41, 59, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: 18,
      padding: "16px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 36, marginBottom: 6 }}>{icon}</div>
    <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF" }}>{title}</div>
    <div style={{ fontSize: 16, color: "#94A3B8", marginTop: 4 }}>{desc}</div>
  </div>
);

// =========================================================================
// 5. SMARTPHONE DM & LLAMADO A LA ACCIÓN (Scene 5)
// =========================================================================
export const SmartphoneDMIllustration: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const phoneBounce = useBouncySpring(delay, 7.0, 180);
  const bubbleBounce = useBouncySpring(delay + 14, 6.5, 220);
  const buttonBounce = useBouncySpring(delay + 24, 7.5, 190);

  return (
    <div
      style={{
        width: 880,
        backgroundColor: "#0D1117",
        border: "4px solid #00F59B",
        borderRadius: 44,
        padding: "50px 48px",
        boxShadow: "0 35px 120px rgba(0, 245, 155, 0.35)",
        transform: `scale(${phoneBounce})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgba(0, 245, 155, 0.15)",
          border: "2px solid #00F59B",
          color: "#00F59B",
          padding: "10px 28px",
          borderRadius: 999,
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: "0.12em",
          marginBottom: 20,
        }}
      >
        ¡VOTA CON TU MENSAJE!
      </div>

      <h1
        style={{
          fontSize: 74,
          fontWeight: 900,
          lineHeight: 1.05,
          margin: "0 0 16px 0",
          letterSpacing: "-0.03em",
          color: "#FFFFFF",
        }}
      >
        ESCRÍBEME AL DM
      </h1>

      <p
        style={{
          fontSize: 28,
          color: "#94A3B8",
          margin: "0 0 32px 0",
          lineHeight: 1.35,
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Mándame un DM con la palabra <b>"MOTION"</b>. Si se junta suficiente gente, ¡abrimos el curso y les enseño a todos!
      </p>

      {/* Chat Bubble */}
      <div
        style={{
          backgroundColor: "#1E293B",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 24,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 32,
          textAlign: "left",
          transform: `scale(${bubbleBounce})`,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            backgroundColor: "#6366F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            flexShrink: 0,
          }}
        >
          💬
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF" }}>
            "MOTION"
          </div>
          <div style={{ fontSize: 18, color: "#00F59B", marginTop: 4, fontWeight: 700 }}>
            ● Tu voto cuenta para abrir el curso
          </div>
        </div>
      </div>

      {/* Button */}
      <div
        style={{
          backgroundColor: "#FF4D00",
          color: "#FFFFFF",
          padding: "26px 48px",
          borderRadius: 24,
          fontSize: 34,
          fontWeight: 900,
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          transform: `scale(${buttonBounce})`,
          boxShadow: "0 20px 50px rgba(255, 77, 0, 0.45)",
          cursor: "pointer",
        }}
      >
        <span>ENVIAR DM AHORA</span>
        <span style={{ fontSize: 38 }}>→</span>
      </div>
    </div>
  );
};
