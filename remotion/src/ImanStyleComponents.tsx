import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Helper for smooth, high-ticket cubic/spring keyframes
const useSmoothSpring = (delay = 0, damping = 14, stiffness = 130, mass = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping, stiffness, mass },
  });
};

// =========================================================================
// 1. SCENE 1: MACOS INSPECTOR & BEZIER CURVE EDITOR (Hook)
// =========================================================================
export const MacOSInspectorCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const enter = useSmoothSpring(delay);
  const graphSpring = useSmoothSpring(delay + 15);

  // Bezier control point animation
  const p1Y = interpolate(Math.sin((frame / 20) * Math.PI), [-1, 1], [180, 80]);
  const p2Y = interpolate(Math.cos((frame / 22) * Math.PI), [-1, 1], [300, 220]);

  return (
    <div
      style={{
        width: 880,
        backgroundColor: "#0D1117",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 30px 90px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
        transform: `scale(${enter})`,
      }}
    >
      {/* Window Titlebar */}
      <div
        style={{
          height: 54,
          backgroundColor: "#161B22",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            color: "#8B949E",
            letterSpacing: "0.08em",
          }}
        >
          motion://code-engine.local
        </div>
        <div
          style={{
            backgroundColor: "rgba(0, 245, 155, 0.15)",
            border: "1px solid #00F59B",
            color: "#00F59B",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 13,
            fontWeight: 800,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          ● 60 FPS LOCAL
        </div>
      </div>

      {/* Main Graph & Keyframe Canvas */}
      <div style={{ padding: "36px 40px", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#8B949E", letterSpacing: "0.1em" }}>
              TIMELINE CURVE // SPRING EASING
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>
              Física Matemática Determinista
            </div>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              color: "#38BDF8",
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "8px 16px",
              borderRadius: 10,
            }}
          >
            cubic-bezier(0.16, 1, 0.3, 1)
          </div>
        </div>

        {/* Interactive SVG Motion Curve */}
        <div
          style={{
            height: 240,
            backgroundColor: "#070A0F",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 18,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Grid inside graph */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <svg width="800" height="240" viewBox="0 0 800 240" fill="none">
            {/* Animated Bezier Curve */}
            <path
              d={`M 60 200 C 240 ${p1Y * graphSpring} 480 ${p2Y} 740 40`}
              stroke="#00F59B"
              strokeWidth="5"
              fill="none"
            />
            {/* Control lines */}
            <line x1="60" y1="200" x2="240" y2={p1Y * graphSpring} stroke="rgba(255, 255, 255, 0.2)" strokeDasharray="4 4" strokeWidth="2" />
            <line x1="740" y1="40" x2="480" y2={p2Y} stroke="rgba(255, 255, 255, 0.2)" strokeDasharray="4 4" strokeWidth="2" />

            {/* Control Handles */}
            <circle cx="240" cy={p1Y * graphSpring} r="8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="480" cy={p2Y} r="8" fill="#FF5500" stroke="#FFFFFF" strokeWidth="2" />

            {/* Start and End Keyframe Diamonds */}
            <rect x="52" y="192" width="16" height="16" fill="#00F59B" transform="rotate(45 60 200)" />
            <rect x="732" y="32" width="16" height="16" fill="#00F59B" transform="rotate(45 740 40)" />
          </svg>
        </div>

        {/* Footer Metrics */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 18, color: "#8B949E" }}>
          <div>LICENCIA: <span style={{ color: "#00F59B", fontWeight: 800 }}>$0.00 (OPEN SOURCE)</span></div>
          <div>CÓDIGO: <span style={{ color: "#FFFFFF", fontWeight: 800 }}>REACT / JS / DOM</span></div>
          <div>ESTADO: <span style={{ color: "#38BDF8", fontWeight: 800 }}>ILIMITADO</span></div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SCENE 2: INVOICE / RECEIPT CANCELLED VS FREE LOCAL CODE
// =========================================================================
export const SubscriptionsReceiptCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const invoiceEnter = useSmoothSpring(delay);
  const stampEnter = useSmoothSpring(delay + 22, 10, 220); // crisp thud stamp
  const freeCardEnter = useSmoothSpring(delay + 14);

  return (
    <div style={{ width: 880, display: "flex", gap: 28, justifyContent: "center", alignItems: "stretch" }}>
      {/* 🧾 The Expensive Monthly Bill */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#F8FAFC",
          color: "#0F172A",
          borderRadius: 24,
          padding: "36px 32px",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
          position: "relative",
          transform: `scale(${invoiceEnter}) rotate(-1.5deg)`,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "2px dashed #CBD5E1", paddingBottom: 16 }}>
          <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em" }}>FACTURA MENSUAL</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "#64748B" }}>#INV-9402</span>
        </div>

        <div style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 14 }}>
          <InvoiceRow item="Licencia AI Pro (Claude)" price="$200.00" />
          <InvoiceRow item="Tokens Adicionales" price="$45.00" />
          <InvoiceRow item="Límite de Solicitudes" price="$30.00" />
          <div style={{ borderTop: "2px solid #0F172A", paddingTop: 14, display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 900 }}>
            <span>TOTAL / MES</span>
            <span style={{ color: "#EF4444" }}>$275.00 USD</span>
          </div>
        </div>

        {/* Big Red CANCELLED Ink Stamp */}
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "8%",
            transform: `scale(${stampEnter}) rotate(-18deg)`,
            border: "6px solid #EF4444",
            padding: "10px 24px",
            borderRadius: 16,
            color: "#EF4444",
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: "0.12em",
            backgroundColor: "rgba(254, 242, 242, 0.95)",
            boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
          }}
        >
          ¡CANCELADO!
        </div>
      </div>

      {/* 🚀 The Free Open-Source Terminal */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#0D121F",
          border: "2px solid #00F59B",
          borderRadius: 24,
          padding: "36px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 25px 70px rgba(0, 245, 155, 0.2)",
          transform: `scale(${freeCardEnter}) rotate(1.5deg)`,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#00F59B" }} />
            <span style={{ fontSize: 18, fontWeight: 800, color: "#00F59B", letterSpacing: "0.1em" }}>
              CÓDIGO 100% LIBRE
            </span>
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1 }}>
            Animar en tu Máquina
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#00F59B", margin: "16px 0" }}>
            $0 / MES
          </div>
          <div style={{ fontSize: 20, color: "#94A3B8", lineHeight: 1.4 }}>
            Control absoluto en cada fotograma. Sin depender de APIs cerradas ni pagar suscripciones abusivas.
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(0, 245, 155, 0.15)",
            border: "1px solid #00F59B",
            padding: "12px 18px",
            borderRadius: 12,
            textAlign: "center",
            fontSize: 20,
            fontWeight: 800,
            color: "#00F59B",
          }}
        >
          ✓ ACCESO DE POR VIDA
        </div>
      </div>
    </div>
  );
};

const InvoiceRow: React.FC<{ item: string; price: string }> = ({ item, price }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#475569" }}>
    <span>{item}</span>
    <span style={{ fontWeight: 800, color: "#0F172A", fontFamily: "'JetBrains Mono', monospace" }}>{price}</span>
  </div>
);

// =========================================================================
// 3. SCENE 3: BENTO GRID ARCHITECTURE (El límite es tu imaginación)
// =========================================================================
export const CreativeBentoGrid: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const card1 = useSmoothSpring(delay);
  const card2 = useSmoothSpring(delay + 8);
  const card3 = useSmoothSpring(delay + 16);
  const card4 = useSmoothSpring(delay + 24);

  return (
    <div style={{ width: 880, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {/* Bento 1: App UI & Micro-interactions */}
      <div
        style={{
          backgroundColor: "#111726",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: 24,
          padding: "30px 28px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          transform: `scale(${card1})`,
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>📱</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>Interfaces & Apps</div>
        <div style={{ fontSize: 18, color: "#38BDF8", marginTop: 6, fontWeight: 700 }}>
          Micro-interacciones fluidas
        </div>
      </div>

      {/* Bento 2: Reels Verticales 9:16 */}
      <div
        style={{
          backgroundColor: "#1D141C",
          border: "1px solid rgba(244, 63, 94, 0.3)",
          borderRadius: 24,
          padding: "30px 28px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          transform: `scale(${card2})`,
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>🎬</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>Reels Comerciales</div>
        <div style={{ fontSize: 18, color: "#FB7185", marginTop: 6, fontWeight: 700 }}>
          Formatos 9:16 de alta retención
        </div>
      </div>

      {/* Bento 3: Tipografía Cinética */}
      <div
        style={{
          backgroundColor: "#161324",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: 24,
          padding: "30px 28px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          transform: `scale(${card3})`,
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>🔤</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>Kinetic Type</div>
        <div style={{ fontSize: 18, color: "#C084FC", marginTop: 6, fontWeight: 700 }}>
          Texto animado al ritmo del beat
        </div>
      </div>

      {/* Bento 4: Data & Storytelling */}
      <div
        style={{
          backgroundColor: "#0F201C",
          border: "1px solid rgba(0, 245, 155, 0.3)",
          borderRadius: 24,
          padding: "30px 28px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          transform: `scale(${card4})`,
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>📊</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>Data Storytelling</div>
        <div style={{ fontSize: 18, color: "#00F59B", marginTop: 6, fontWeight: 700 }}>
          Gráficos vectoriales y cifras
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. SCENE 4: BLUEPRINT DEL CURSO & META COMUNITARIA
// =========================================================================
export const MasterclassBlueprintCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const cardEnter = useSmoothSpring(delay);
  const meterProgress = useSmoothSpring(delay + 14);

  return (
    <div
      style={{
        width: 880,
        backgroundColor: "#0D111A",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 32,
        padding: "48px 44px",
        boxShadow: "0 30px 90px rgba(0, 0, 0, 0.7)",
        transform: `scale(${cardEnter})`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: "#FACC15",
            letterSpacing: "0.15em",
            fontWeight: 800,
          }}
        >
          // CONDICIÓN DE APERTURA
        </span>
        <span
          style={{
            backgroundColor: "#FF5500",
            color: "#FFFFFF",
            padding: "6px 20px",
            borderRadius: 999,
            fontSize: 18,
            fontWeight: 900,
          }}
        >
          PRECIO SIMBÓLICO
        </span>
      </div>

      <h2 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: "#FFFFFF", margin: "0 0 16px 0" }}>
        ¿Quieres que les enseñe todo el método?
      </h2>

      <p style={{ fontSize: 26, color: "#94A3B8", lineHeight: 1.35, margin: "0 0 28px 0" }}>
        Si veo que hay <b>suficiente gente interesada</b>, organizo el curso paso a paso a un precio súper económico para que todos puedan dominarlo.
      </p>

      {/* Community Progress Meter */}
      <div
        style={{
          backgroundColor: "#161D2B",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
          <span style={{ color: "#FACC15" }}>🗳️ META DE INTERÉS DE LA COMUNIDAD</span>
          <span style={{ color: "#00F59B" }}>{Math.round(meterProgress * 85)}% COMPLETADO</span>
        </div>
        <div style={{ height: 16, backgroundColor: "#0A0D14", borderRadius: 999, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${Math.min(100, meterProgress * 85)}%`,
              background: "linear-gradient(90deg, #FF5500 0%, #00F59B 100%)",
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* 3 Steps */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <BlueprintStep number="01" title="Fundamentos" desc="De cero a tus primeros frames" />
        <BlueprintStep number="02" title="Física & Código" desc="Control exacto sin licencias" />
        <BlueprintStep number="03" title="Monetización" desc="Templates para clientes reales" />
      </div>
    </div>
  );
};

const BlueprintStep: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: 18,
      padding: "20px 18px",
    }}
  >
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: "#6366F1", fontWeight: 900 }}>
      {number}
    </div>
    <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", marginTop: 4 }}>{title}</div>
    <div style={{ fontSize: 16, color: "#8B949E", marginTop: 6 }}>{desc}</div>
  </div>
);

// =========================================================================
// 5. SCENE 5: HIGH-TICKET DM CALL TO ACTION
// =========================================================================
export const HighTicketDMCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const enter = useSmoothSpring(delay);
  const pulse = interpolate(Math.sin((useCurrentFrame() / 15) * Math.PI), [-1, 1], [1, 1.04]);

  return (
    <div
      style={{
        width: 880,
        backgroundColor: "#0D111A",
        border: "1px solid rgba(0, 245, 155, 0.4)",
        borderRadius: 36,
        padding: "52px 48px",
        boxShadow: "0 35px 120px rgba(0, 245, 155, 0.2)",
        transform: `scale(${enter})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 18,
          color: "#00F59B",
          letterSpacing: "0.15em",
          fontWeight: 900,
          backgroundColor: "rgba(0, 245, 155, 0.12)",
          padding: "8px 24px",
          borderRadius: 999,
          marginBottom: 20,
        }}
      >
        // PASO SIGUIENTE
      </div>

      <h1 style={{ fontSize: 72, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.05, margin: "0 0 16px 0", letterSpacing: "-0.03em" }}>
        Mándame un DM con la palabra <span style={{ color: "#00F59B" }}>"MOTION"</span>
      </h1>

      <p style={{ fontSize: 26, color: "#94A3B8", margin: "0 0 36px 0", lineHeight: 1.4, maxWidth: 740, marginLeft: "auto", marginRight: "auto" }}>
        Si alcanzamos el número mínimo de personas interesadas, abrimos la convocatoria a precio de lanzamiento.
      </p>

      {/* Button */}
      <div
        style={{
          backgroundColor: "#00F59B",
          color: "#070A0F",
          padding: "26px 54px",
          borderRadius: 20,
          fontSize: 34,
          fontWeight: 900,
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          transform: `scale(${pulse})`,
          boxShadow: "0 20px 60px rgba(0, 245, 155, 0.4)",
          cursor: "pointer",
        }}
      >
        <span>ESCRIBIR POR DM AHORA</span>
        <span style={{ fontSize: 38 }}>→</span>
      </div>
    </div>
  );
};
