import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Brand Colors (Max 3 colors + Black & White)
const COLOR_BG = "#0A0A0C";
const COLOR_WHITE = "#FFFFFF";
const COLOR_ORANGE = "#FF4D00"; // Accent 1: Energy & Slicing
const COLOR_GREEN = "#00F59B";  // Accent 2: Code, Freedom & $0
const COLOR_COBALT = "#2563EB"; // Accent 3: Tech Grid & 3D Wireframe

export const ShowreelVertical: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig(); // 1080x1920, 60fps, 900 frames

  // 120 BPM: 1 beat = 30 frames at 60fps
  // Total beats: 30 beats = 900 frames = 15.0 seconds
  const currentBeat = frame / 30;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLOR_BG,
        color: COLOR_WHITE,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 🎵 Procedural 120 BPM Soundtrack */}
      <Audio src={staticFile("soundtrack_120bpm.wav")} />

      {/* Subtle Background Metric Grid (always present, never distracting) */}
      <BackgroundGrid frame={frame} />

      {/* 🎬 SCENE 1: THE HOOK & KINETIC TYPE (Frames 0 - 120 / Beats 0 - 4) */}
      {frame < 135 && <Scene1Hook frame={frame} fps={fps} />}

      {/* 🎬 SCENE 2: SHAPE MORPH & SLICE LICENSES (Frames 115 - 255 / Beats 4 - 8) */}
      {frame >= 115 && frame < 255 && <Scene2Slice frame={frame} fps={fps} />}

      {/* 🎬 SCENE 3: 2D TO 3D ISOMETRIC WIREFRAME (Frames 235 - 375 / Beats 8 - 12) */}
      {frame >= 235 && frame < 375 && <Scene3Isometric frame={frame} fps={fps} />}

      {/* 🎬 SCENE 4: DATA & UI / ZERO LICENSES (Frames 355 - 495 / Beats 12 - 16) */}
      {frame >= 355 && frame < 495 && <Scene4DataTerminal frame={frame} fps={fps} />}

      {/* 🎬 SCENE 5: EXPANSION & PHILOSOPHY (Frames 475 - 615 / Beats 16 - 20) */}
      {frame >= 475 && frame < 615 && <Scene5Philosophy frame={frame} fps={fps} />}

      {/* 🎬 SCENE 6: THE CLIMAX & COURSE REVEAL (Frames 595 - 765 / Beats 20 - 25) */}
      {frame >= 595 && frame < 765 && <Scene6ClimaxCourse frame={frame} fps={fps} />}

      {/* 🎬 SCENE 7: END TITLE & SEAMLESS LOOP (Frames 745 - 900 / Beats 25 - 30) */}
      {frame >= 745 && <Scene7EndTitleLoop frame={frame} fps={fps} />}

      {/* Top Header / Corner Telemetry (World-class studio aesthetic) */}
      <GlobalTelemetry frame={frame} currentBeat={currentBeat} />
    </div>
  );
};

// =========================================================================
// SUB-COMPONENTS & SCENES
// =========================================================================

// Background Grid with breathing pulse
const BackgroundGrid: React.FC<{ frame: number }> = ({ frame }) => {
  const gridOpacity = interpolate(
    Math.sin((frame / 60) * Math.PI),
    [-1, 1],
    [0.03, 0.07]
  );
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, ${gridOpacity}) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, ${gridOpacity}) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }}
    />
  );
};

// Top and Bottom Telemetry (Studio branding)
const GlobalTelemetry: React.FC<{ frame: number; currentBeat: number }> = ({
  frame,
  currentBeat,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 60,
        right: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 50,
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontFamily: "'JetBrains Mono', monospace",
        color: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: frame % 30 < 15 ? COLOR_ORANGE : COLOR_GREEN,
            borderRadius: "50%",
          }}
        />
        <span>PROMPTEND // CODE-MOTION</span>
      </div>
      <div>
        <span>BEAT {Math.floor(currentBeat).toString().padStart(2, "0")}/30</span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------------------
// SCENE 1: THE HOOK & KINETIC TYPE (Frames 0 - 120)
// -------------------------------------------------------------------------
const Scene1Hook: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Beat 0 -> 1 (0 - 30): The initial 40px seed expands into a tall monolith
  const seedMorph = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  // Beat 1 -> 2 (30 - 60): Text "¿CREAR MOTIONS" slides in with mask
  const text1Spring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 150 },
  });

  // Beat 2 -> 3 (60 - 90): "CON CÓDIGO?" pops with scale & inverted badge
  const text2Spring = spring({
    frame: frame - 58,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 160 },
  });

  // Beat 3 -> 4 (90 - 120): "SIN PAGAR LICENCIAS" compresses into solid blocks
  const text3Spring = spring({
    frame: frame - 88,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 170 },
  });

  // Morph exit toward Scene 2
  const exitMorph = spring({
    frame: frame - 110,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  const seedScale = interpolate(seedMorph, [0, 1], [0.1, 1]);
  const exitScaleY = interpolate(exitMorph, [0, 1], [1, 0.12]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        transform: `scaleY(${exitScaleY})`,
        opacity: interpolate(frame, [118, 125], [1, 0], { extrapolateRight: "clamp" }),
      }}
    >
      {/* The Origin Seed that morphs */}
      {frame < 25 && (
        <div
          style={{
            width: 44,
            height: 44,
            backgroundColor: COLOR_WHITE,
            borderBottomRightRadius: 22,
            boxShadow: `0 0 40px ${COLOR_ORANGE}`,
            transform: `scale(${seedScale}) rotate(${interpolate(frame, [0, 25], [0, 90])}deg)`,
          }}
        />
      )}

      {/* Main Kinetic Typography */}
      {frame >= 20 && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Badge */}
          <div
            style={{
              overflow: "hidden",
              height: 52,
            }}
          >
            <div
              style={{
                transform: `translateY(${(1 - text1Spring) * 60}px)`,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                backgroundColor: "rgba(255, 77, 0, 0.15)",
                border: `1px solid ${COLOR_ORANGE}`,
                padding: "8px 24px",
                borderRadius: 999,
                color: COLOR_ORANGE,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              PREGUNTA CLAVE
            </div>
          </div>

          {/* Line 1: ¿CREAR MOTIONS */}
          <div style={{ overflow: "hidden" }}>
            <h1
              style={{
                margin: 0,
                fontSize: 92,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                transform: `translateY(${(1 - text1Spring) * 110}px)`,
                color: COLOR_WHITE,
              }}
            >
              ¿CREAR MOTIONS
            </h1>
          </div>

          {/* Line 2: CON CÓDIGO? */}
          <div style={{ overflow: "hidden" }}>
            <h1
              style={{
                margin: 0,
                fontSize: 104,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                transform: `translateY(${(1 - text2Spring) * 120}px)`,
                color: COLOR_GREEN,
                textTransform: "uppercase",
              }}
            >
              CON CÓDIGO?
            </h1>
          </div>

          {/* Line 3: SIN PAGAR LICENCIAS */}
          <div
            style={{
              marginTop: 20,
              transform: `scale(${text3Spring}) translateY(${(1 - text3Spring) * 40}px)`,
              backgroundColor: COLOR_WHITE,
              color: COLOR_BG,
              padding: "16px 28px",
              borderRadius: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em" }}>
              SIN PAGAR LICENCIAS
            </span>
            <span
              style={{
                backgroundColor: COLOR_ORANGE,
                color: COLOR_WHITE,
                padding: "6px 16px",
                borderRadius: 8,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              0$
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------------------
// SCENE 2: SHAPE MORPH & SLICE LICENSES (Frames 120 - 240)
// -------------------------------------------------------------------------
const Scene2Slice: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const localFrame = frame - 120;

  // Pills assemble
  const pillsEnter = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 150 },
  });

  // The 45-degree Blade Slices at frame 150 (localFrame 30 = Beat 5)
  const sliceProgress = interpolate(localFrame, [26, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pills displacement after slice
  const sliceDisplace = interpolate(sliceProgress, [0, 1], [0, 40]);

  // Terminal shield expansion (Beat 6 -> 7 / localFrame 60 - 90)
  const shieldExpand = spring({
    frame: localFrame - 58,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 140 },
  });

  // Exit tilt into 3D (localFrame 105 - 120)
  const exitTilt = interpolate(localFrame, [100, 120], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        perspective: 1000,
        transform: `rotateX(${exitTilt}deg)`,
      }}
    >
      {/* Top Tag */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "rgba(255, 255, 255, 0.4)",
          letterSpacing: "0.2em",
          marginBottom: 30,
          textTransform: "uppercase",
        }}
      >
        // ADIÓS A LAS SUSCRIPCIONES
      </div>

      {/* The Two Sliced License Pills */}
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 24,
          transform: `scale(${pillsEnter})`,
          position: "relative",
        }}
      >
        {/* Left Pill: CLAUDE */}
        <div
          style={{
            flex: 1,
            height: 180,
            borderRadius: 24,
            backgroundColor: "#161B26",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transform: `translateY(${-sliceDisplace}px)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.03em" }}>
            CLAUDE
          </span>
          <span style={{ fontSize: 24, color: "#EF4444", fontWeight: 700, textDecoration: "line-through" }}>
            $20 - $200 / mes
          </span>
        </div>

        {/* Right Pill: CODEX / OPENAI */}
        <div
          style={{
            flex: 1,
            height: 180,
            borderRadius: 24,
            backgroundColor: "#161B26",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transform: `translateY(${sliceDisplace}px)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.03em" }}>
            CODEX
          </span>
          <span style={{ fontSize: 24, color: "#EF4444", fontWeight: 700, textDecoration: "line-through" }}>
            API Tokens $$$
          </span>
        </div>

        {/* Orange Slicing Laser Beam */}
        {sliceProgress > 0 && sliceProgress < 1 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-10%",
              width: "120%",
              height: 6,
              backgroundColor: COLOR_ORANGE,
              boxShadow: `0 0 30px ${COLOR_ORANGE}`,
              transform: `rotate(-15deg) scaleX(${sliceProgress * 1.5})`,
              transformOrigin: "left center",
            }}
          />
        )}
      </div>

      {/* The 100% LIBRE Y LOCAL Container that emerges */}
      {localFrame >= 50 && (
        <div
          style={{
            width: "100%",
            marginTop: 40,
            borderRadius: 28,
            backgroundColor: "#0F172A",
            border: `2px solid ${COLOR_GREEN}`,
            padding: "36px 32px",
            transform: `scale(${shieldExpand})`,
            boxShadow: `0 20px 60px rgba(0, 245, 155, 0.15)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 14, height: 14, backgroundColor: COLOR_GREEN, borderRadius: "50%" }} />
            <span style={{ fontSize: 22, fontWeight: 800, color: COLOR_GREEN, letterSpacing: "0.1em" }}>
              SOLUCIÓN REAL
            </span>
          </div>
          <h2 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.05, margin: "0 0 16px 0" }}>
            100% LIBRE & LOCAL
          </h2>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 24,
              color: "#94A3B8",
              backgroundColor: "#060A10",
              padding: "12px 20px",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: COLOR_GREEN }}>$</span>
            <span>npx remotion render --local</span>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------------------
// SCENE 3: 2D TO 3D ISOMETRIC WIREFRAME (Frames 240 - 360)
// -------------------------------------------------------------------------
const Scene3Isometric: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const localFrame = frame - 240;

  // Rotation in 3D
  const rotSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 120 },
  });

  const rotY = interpolate(localFrame, [0, 120], [25, 205]);
  const rotX = interpolate(rotSpring, [0, 1], [65, 35]);
  const scale = interpolate(localFrame, [90, 120], [1, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1200,
        transform: `scale(${scale})`,
        opacity: interpolate(localFrame, [110, 120], [1, 0], { extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: COLOR_GREEN,
          letterSpacing: "0.2em",
          marginBottom: 40,
        }}
      >
        // MOTOR DETERMINISTA 3D
      </div>

      {/* 3D Cube Container */}
      <div
        style={{
          width: 440,
          height: 440,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(-15deg)`,
        }}
      >
        {/* Front Face */}
        <CubeFace
          translateZ={220}
          title="REACT 19"
          subtitle="useCurrentFrame()"
          color={COLOR_COBALT}
        />
        {/* Back Face */}
        <CubeFace
          translateZ={-220}
          rotateY={180}
          title="CANVAS"
          subtitle="OffscreenBuffer"
          color={COLOR_GREEN}
        />
        {/* Right Face */}
        <CubeFace
          rotateY={90}
          translateZ={220}
          title="DETERMINISTA"
          subtitle="Frame Perfect"
          color={COLOR_ORANGE}
        />
        {/* Left Face */}
        <CubeFace
          rotateY={-90}
          translateZ={220}
          title="HYPERFRAME"
          subtitle="DOM Engine"
          color={COLOR_WHITE}
        />
        {/* Top Face */}
        <CubeFace
          rotateX={90}
          translateZ={220}
          title="SPRINGS"
          subtitle="Physics Engine"
          color={COLOR_GREEN}
        />
      </div>

      <div
        style={{
          marginTop: 60,
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        <h2 style={{ fontSize: 64, fontWeight: 900, margin: "0 0 12px 0", letterSpacing: "-0.03em" }}>
          ARQUITECTURA VIVA
        </h2>
        <p style={{ fontSize: 26, color: "#94A3B8", margin: 0 }}>
          Animaciones controladas al 100% por fórmulas y física
        </p>
      </div>
    </div>
  );
};

const CubeFace: React.FC<{
  translateZ?: number;
  rotateY?: number;
  rotateX?: number;
  title: string;
  subtitle: string;
  color: string;
}> = ({ translateZ = 0, rotateY = 0, rotateX = 0, title, subtitle, color }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: 440,
        height: 440,
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        border: `3px solid ${color}`,
        borderRadius: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: `inset 0 0 40px rgba(0,0,0,0.8), 0 0 30px ${color}33`,
        transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
        backfaceVisibility: "visible",
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          marginBottom: 16,
          color,
          fontWeight: 900,
        }}
      >
        ⚡
      </div>
      <div style={{ fontSize: 38, fontWeight: 900, color: COLOR_WHITE }}>{title}</div>
      <div style={{ fontSize: 22, color, fontFamily: "'JetBrains Mono', monospace", marginTop: 8 }}>
        {subtitle}
      </div>
    </div>
  );
};

// -------------------------------------------------------------------------
// SCENE 4: DATA & UI MOMENT / ZERO LICENSES (Frames 360 - 480)
// -------------------------------------------------------------------------
const Scene4DataTerminal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const localFrame = frame - 360;

  // Counter ticks from $240 down to $0 in 40 frames
  const countProgress = interpolate(localFrame, [10, 50], [240, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const meterSpring = spring({
    frame: localFrame - 30,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        opacity: interpolate(localFrame, [110, 120], [1, 0], { extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#0D1117",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 32,
          padding: 44,
          boxShadow: "0 30px 90px rgba(0,0,0,0.8)",
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 24,
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#10B981" }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: "#64748B" }}>
            COST_TELEMETRY.TS
          </span>
        </div>

        {/* Big Counter */}
        <div style={{ padding: "40px 0", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.1em" }}>
            COSTO POR RENDER
          </div>
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              fontFamily: "'JetBrains Mono', monospace",
              color: Math.round(countProgress) === 0 ? COLOR_GREEN : COLOR_WHITE,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              marginTop: 10,
            }}
          >
            ${Math.round(countProgress)}
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: 16,
              backgroundColor: "rgba(0, 245, 155, 0.15)",
              border: `1px solid ${COLOR_GREEN}`,
              color: COLOR_GREEN,
              padding: "8px 24px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            ✓ CERO DEPENDECIA DE APIs
          </div>
        </div>

        {/* Dynamic Telemetry Meters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
          <MetricBar label="VELOCIDAD DE RENDER" value="60 FPS ESTABLES" progress={meterSpring} color={COLOR_GREEN} />
          <MetricBar label="CONTROL FRAME A FRAME" value="100% DETERMINISTA" progress={meterSpring * 0.95} color={COLOR_COBALT} />
          <MetricBar label="AUTONOMÍA DEL ESTUDIO" value="ILIMITADA" progress={meterSpring} color={COLOR_ORANGE} />
        </div>
      </div>
    </div>
  );
};

const MetricBar: React.FC<{ label: string; value: string; progress: number; color: string }> = ({
  label,
  value,
  progress,
  color,
}) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
        <span style={{ color: "#94A3B8" }}>{label}</span>
        <span style={{ color: COLOR_WHITE, fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
      </div>
      <div style={{ height: 12, backgroundColor: "#1E293B", borderRadius: 999, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: color,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
};

// -------------------------------------------------------------------------
// SCENE 5: EXPANSION & PHILOSOPHY (Frames 475 - 615)
// -------------------------------------------------------------------------
const Scene5Philosophy: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const localFrame = frame - 475;

  const word1 = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 150 },
  });

  const word2 = spring({
    frame: localFrame - 25,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 160 },
  });

  const word3 = spring({
    frame: localFrame - 50,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 170 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        textAlign: "center",
        opacity: interpolate(localFrame, [125, 140], [1, 0], { extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          transform: `scale(${word1})`,
          fontSize: 80,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: "rgba(255, 255, 255, 0.7)",
          lineHeight: 1,
        }}
      >
        EL LÍMITE
      </div>

      <div
        style={{
          transform: `scale(${word2})`,
          fontSize: 90,
          fontWeight: 900,
          letterSpacing: "-0.03em",
          color: COLOR_WHITE,
          margin: "12px 0",
          lineHeight: 1,
        }}
      >
        ES TU
      </div>

      <div
        style={{
          transform: `scale(${word3})`,
          fontSize: 108,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: COLOR_ORANGE,
          lineHeight: 0.95,
          textTransform: "uppercase",
        }}
      >
        IMAGINACIÓN
      </div>

      {localFrame >= 65 && (
        <div
          style={{
            marginTop: 40,
            maxWidth: 800,
            fontSize: 32,
            fontWeight: 600,
            color: "#CBD5E1",
            lineHeight: 1.35,
          }}
        >
          No necesitas herramientas de suscripción cerrada. Domina el código y crea lo que quieras.
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------------------
// SCENE 6: THE CLIMAX & COURSE REVEAL (Frames 595 - 765 / Beats 20 - 25)
// -------------------------------------------------------------------------
const Scene6ClimaxCourse: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const localFrame = frame - 595;

  // Explosive impact on Beat 21 (localFrame 30)
  const impactSpring = spring({
    frame: localFrame - 15,
    fps,
    config: { damping: 11, mass: 0.6, stiffness: 160 },
  });

  const cardFold = interpolate(localFrame, [150, 170], [1, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        transform: `scale(${impactSpring * cardFold})`,
        opacity: interpolate(localFrame, [160, 170], [1, 0], { extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#0B101B",
          border: `3px solid ${COLOR_ORANGE}`,
          borderRadius: 36,
          padding: "50px 40px",
          boxShadow: `0 30px 100px rgba(255, 77, 0, 0.25)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow corner ribbon */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 28,
            backgroundColor: COLOR_GREEN,
            color: COLOR_BG,
            padding: "8px 20px",
            borderRadius: 999,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "0.08em",
          }}
        >
          PRECIO ACCESIBLE
        </div>

        <div style={{ fontSize: 24, fontWeight: 800, color: COLOR_ORANGE, letterSpacing: "0.15em", marginBottom: 12 }}>
          ★ PRÓXIMO LANZAMIENTO
        </div>

        <h1 style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.05, margin: "0 0 28px 0" }}>
          CURSO PRÁCTICO MOTION CON CÓDIGO
        </h1>

        {/* Feature List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
          <CourseBullet text="Aprende Remotion & HyperFrames desde cero" />
          <CourseBullet text="Sin pagar licencias de Claude ni OpenAI" />
          <CourseBullet text="Crea videos verticales 9:16 y horizontales 16:9" />
          <CourseBullet text="Plantillas listas para comercializar" />
        </div>

        {/* Course Price / Guarantee Box */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 20,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 18, color: "#94A3B8" }}>INVERSIÓN</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: COLOR_WHITE }}>MUY ECONÓMICO</div>
          </div>
          <div
            style={{
              backgroundColor: COLOR_ORANGE,
              color: COLOR_WHITE,
              padding: "12px 28px",
              borderRadius: 14,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            CUPO LIMITADO
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseBullet: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 245, 155, 0.15)",
          border: `2px solid ${COLOR_GREEN}`,
          color: COLOR_GREEN,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        ✓
      </div>
      <span style={{ fontSize: 26, fontWeight: 700, color: "#E2E8F0" }}>{text}</span>
    </div>
  );
};

// -------------------------------------------------------------------------
// SCENE 7: END TITLE & SEAMLESS LOOP (Frames 745 - 900 / Beats 25 - 30)
// -------------------------------------------------------------------------
const Scene7EndTitleLoop: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const localFrame = frame - 745;

  // Entrance of DM Card
  const dmEntrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 150 },
  });

  // Final collapse into the 44px Seed (localFrame 120 - 155 = frame 865 - 900)
  const collapseProgress = interpolate(localFrame, [115, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalScale = interpolate(collapseProgress, [0, 1], [1, 0.04]);
  const finalOpacity = interpolate(collapseProgress, [0.8, 1], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        transform: `scale(${dmEntrance * finalScale})`,
      }}
    >
      {/* If closing, show the seed */}
      {collapseProgress > 0.8 && (
        <div
          style={{
            position: "absolute",
            width: 44,
            height: 44,
            backgroundColor: COLOR_WHITE,
            borderBottomRightRadius: 22,
            boxShadow: `0 0 40px ${COLOR_ORANGE}`,
            opacity: 1,
            zIndex: 100,
          }}
        />
      )}

      {/* Main End Card */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#0F141F",
          border: `2px solid ${COLOR_GREEN}`,
          borderRadius: 36,
          padding: "50px 44px",
          textAlign: "center",
          boxShadow: `0 30px 100px rgba(0, 245, 155, 0.2)`,
          opacity: finalOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 22,
            fontWeight: 800,
            color: COLOR_GREEN,
            letterSpacing: "0.15em",
            marginBottom: 20,
            backgroundColor: "rgba(0, 245, 155, 0.12)",
            padding: "8px 24px",
            borderRadius: 999,
          }}
        >
          ¿ESTÁS INTERESADO?
        </div>

        <h1
          style={{
            fontSize: 74,
            fontWeight: 900,
            lineHeight: 1.05,
            margin: "0 0 20px 0",
            letterSpacing: "-0.03em",
          }}
        >
          ESCRÍBEME AL DM
        </h1>

        <p
          style={{
            fontSize: 30,
            color: "#94A3B8",
            margin: "0 0 36px 0",
            lineHeight: 1.3,
          }}
        >
          Mándame un mensaje directo para reservar tu lugar en el curso antes de que se agote.
        </p>

        {/* Pulsing Button */}
        <div
          style={{
            backgroundColor: COLOR_ORANGE,
            color: COLOR_WHITE,
            padding: "24px 40px",
            borderRadius: 20,
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            boxShadow: `0 15px 40px rgba(255, 77, 0, 0.4)`,
          }}
        >
          <span>ENVIAR MENSAJE AHORA</span>
          <span style={{ fontSize: 36 }}>→</span>
        </div>
      </div>
    </div>
  );
};
