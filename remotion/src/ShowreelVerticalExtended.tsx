import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  DeveloperWorkspaceIllustration,
  SubscriptionTrapIllustration,
  CreativeGalaxyIllustration,
  CoursePassIllustration,
  SmartphoneDMIllustration,
} from "./Illustrations";

export const ShowreelVerticalExtended: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig(); // 1080x1920, 30fps, 1350 frames (~45.0s)

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0A0E17",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* 🎙️ Energetic Neural Voiceover (sin nombres de herramientas) */}
      <Audio src={staticFile("locucion_energetica.mp3")} volume={1.0} />

      {/* 🎵 Upbeat Ambient Background Music */}
      <Audio src={staticFile("ambient_bg.wav")} volume={0.14} />

      {/* 🔊 SOUND EFFECTS (SFX) Sincronizados a cada acción */}
      {/* Scene 1 Intro & Pops */}
      <Sequence from={0}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.7} /></Sequence>
      <Sequence from={18}><Audio src={staticFile("sfx/pop.wav")} volume={0.6} /></Sequence>

      {/* Scene 2 Whip Transition, Cash Chime & Comic Scratch */}
      <Sequence from={228}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.75} /></Sequence>
      <Sequence from={250}><Audio src={staticFile("sfx/chaching.wav")} volume={0.7} /></Sequence>
      <Sequence from={358}><Audio src={staticFile("sfx/scratch.wav")} volume={0.8} /></Sequence>
      <Sequence from={366}><Audio src={staticFile("sfx/boing.wav")} volume={0.75} /></Sequence>

      {/* Scene 3 Whip Transition & Creative Pop */}
      <Sequence from={432}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.75} /></Sequence>
      <Sequence from={450}><Audio src={staticFile("sfx/pop.wav")} volume={0.6} /></Sequence>

      {/* Scene 4 Community Goal Transition & Boing */}
      <Sequence from={738}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.75} /></Sequence>
      <Sequence from={755}><Audio src={staticFile("sfx/boing.wav")} volume={0.7} /></Sequence>

      {/* Scene 5 DM Call To Action & Notification Ding */}
      <Sequence from={1012}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.75} /></Sequence>
      <Sequence from={1035}><Audio src={staticFile("sfx/ding.wav")} volume={0.85} /></Sequence>

      {/* 🌌 Animated Background with glowing energetic orbs */}
      <RichAnimatedBackground frame={frame} />

      {/* 🎬 SCENE 1: HOOK (Frames 0 - 232 / ~0 - 7.7s) */}
      {frame < 235 && (
        <WhipSceneWrapper start={0} end={230} frame={frame} fps={fps} direction="left">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 28px",
                borderRadius: 999,
                backgroundColor: "rgba(99, 102, 241, 0.25)",
                border: "2px solid #6366F1",
                color: "#A5B4FC",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              PREGUNTA CLAVE
            </div>
            <h1
              style={{
                fontSize: 66,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.03em",
              }}
            >
              ¿Crear <span style={{ color: "#00F59B" }}>Motion Graphics</span> con Puro Código?
            </h1>
          </div>

          <DeveloperWorkspaceIllustration />

          <CaptionBox
            text="¿Te imaginas crear este tipo de motion graphics profesionales con puro código, sin pagarle un solo centavo a Claude ni a Codex?"
            highlight="sin pagarle un solo centavo a Claude ni a Codex"
          />
        </WhipSceneWrapper>
      )}

      {/* 🎬 SCENE 2: SUSCRIPCIONES DE $200 VS CÓDIGO (Frames 228 - 438 / ~7.7 - 14.5s) */}
      {frame >= 228 && frame < 438 && (
        <WhipSceneWrapper start={230} end={435} frame={frame} fps={fps} direction="right">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 28px",
                borderRadius: 999,
                backgroundColor: "rgba(239, 68, 68, 0.25)",
                border: "2px solid #EF4444",
                color: "#FCA5A5",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ¿SUSCRIPCIONES CARAS?
            </div>
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.03em",
              }}
            >
              ¿Pagar <span style={{ color: "#EF4444" }}>$200 al mes</span>? ¡Para nada!
            </h1>
          </div>

          <SubscriptionTrapIllustration />

          <CaptionBox
            text={
              frame < 350
                ? "O sea, ¿quién inventó que tienes que pagar suscripciones de doscientos dólares al mes?"
                : "¡Para nada! Con código abierto puedes animar lo que quieras en tu computadora."
            }
            highlight={frame < 350 ? "suscripciones de doscientos dólares al mes" : "¡Para nada! Con código abierto"}
          />
        </WhipSceneWrapper>
      )}

      {/* 🎬 SCENE 3: UNIVERSO CREATIVO & IMAGINACIÓN (Frames 430 - 745 / ~14.5 - 24.7s) */}
      {frame >= 430 && frame < 745 && (
        <WhipSceneWrapper start={435} end={740} frame={frame} fps={fps} direction="up">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 28px",
                borderRadius: 999,
                backgroundColor: "rgba(255, 77, 0, 0.25)",
                border: "2px solid #FF4D00",
                color: "#FFA07A",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              LIBERTAD TOTAL
            </div>
            <h1
              style={{
                fontSize: 70,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.03em",
              }}
            >
              El único límite es <span style={{ color: "#FF4D00" }}>tu imaginación</span>
            </h1>
          </div>

          <CreativeGalaxyIllustration />

          <CaptionBox
            text={
              frame < 600
                ? "Puedes animar literalmente lo que se te ocurra, directamente en tu compu y con cero límites."
                : "El límite no es tu billetera... ¡es tu imaginación!"
            }
            highlight={frame < 600 ? "directamente en tu compu y con cero límites" : "¡es tu imaginación!"}
          />
        </WhipSceneWrapper>
      )}

      {/* 🎬 SCENE 4: META COMUNITARIA / CURSO ECONÓMICO (Frames 735 - 1020 / ~24.7 - 33.9s) */}
      {frame >= 735 && frame < 1020 && (
        <WhipSceneWrapper start={740} end={1015} frame={frame} fps={fps} direction="left">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 28px",
                borderRadius: 999,
                backgroundColor: "rgba(0, 245, 155, 0.25)",
                border: "2px solid #00F59B",
                color: "#00F59B",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              PROPUESTA COMUNITARIA
            </div>
            <h1
              style={{
                fontSize: 66,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 900,
                letterSpacing: "-0.03em",
              }}
            >
              Si hay interés... <span style={{ color: "#00F59B" }}>les enseño a todos</span>
            </h1>
          </div>

          <CoursePassIllustration />

          <CaptionBox
            text="Si veo que a muchos les interesa, voy a armar un curso súper, súper económico donde les enseñaré todo paso a paso."
            highlight="curso súper, súper económico donde les enseñaré todo"
          />
        </WhipSceneWrapper>
      )}

      {/* 🎬 SCENE 5: SMARTPHONE DM / LLAMADO A LA ACCIÓN (Frames 1010 - 1350 / ~33.9 - 45.0s) */}
      {frame >= 1010 && (
        <WhipSceneWrapper start={1015} end={1350} frame={frame} fps={fps} direction="zoom">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 28px",
                borderRadius: 999,
                backgroundColor: "rgba(255, 77, 0, 0.25)",
                border: "2px solid #FF4D00",
                color: "#FFA07A",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ¿QUIERES APRENDER?
            </div>
            <h1
              style={{
                fontSize: 70,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.03em",
              }}
            >
              Escríbeme <span style={{ color: "#00F59B" }}>MOTION</span> al DM
            </h1>
          </div>

          <SmartphoneDMIllustration />

          <CaptionBox
            text="Escríbeme un DM ahora mismo con la palabra MOTION, y si se junta suficiente gente, ¡lo abrimos y les enseño a todos!"
            highlight="Escríbeme un DM ahora mismo con la palabra MOTION"
          />
        </WhipSceneWrapper>
      )}

      {/* Persistent Channel / Brand Watermark (Top Corner) */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 64,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 20,
          fontWeight: 800,
          color: "rgba(255, 255, 255, 0.6)",
          letterSpacing: "0.1em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#00F59B" }} />
          <span>PROMPTEND // CODE MOTION</span>
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            padding: "6px 18px",
            borderRadius: 10,
            color: "#FFFFFF",
          }}
        >
          {Math.floor(frame / 30)}s / 44s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// WHIP PAN / ZOOM TRANSITION SCENE WRAPPER
// =========================================================================
const WhipSceneWrapper: React.FC<{
  start: number;
  end: number;
  frame: number;
  fps: number;
  direction?: "left" | "right" | "up" | "zoom";
  children: React.ReactNode;
}> = ({ start, end, frame, fps, direction = "left", children }) => {
  const localFrame = frame - start;
  const duration = end - start;

  // Snappy Bouncy Entrance
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 8.0, stiffness: 180, mass: 0.6 },
  });

  // Whip Pan / Zoom Exit during last 8 frames
  const exitFrames = 8;
  const isExiting = localFrame > duration - exitFrames;
  const exitProgress = isExiting
    ? interpolate(localFrame, [duration - exitFrames, duration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Exit transforms based on direction
  let exitTransX = 0;
  let exitTransY = 0;
  let exitScale = 1;
  let blurAmount = 0;

  if (isExiting) {
    blurAmount = exitProgress * 12;
    if (direction === "left") {
      exitTransX = -exitProgress * 1400;
    } else if (direction === "right") {
      exitTransX = exitProgress * 1400;
    } else if (direction === "up") {
      exitTransY = -exitProgress * 1600;
    } else if (direction === "zoom") {
      exitScale = 1 + exitProgress * 0.8;
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px 50px 80px 50px",
        transform: `translateX(${exitTransX}px) translateY(${exitTransY}px) scale(${entrance * exitScale})`,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
        opacity: isExiting ? 1 - exitProgress * 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
};

// =========================================================================
// ENERGETIC CAPTION BOX
// =========================================================================
const CaptionBox: React.FC<{ text: string; highlight?: string }> = ({ text, highlight }) => {
  return (
    <div
      style={{
        marginTop: 36,
        backgroundColor: "rgba(15, 23, 42, 0.92)",
        border: "3px solid rgba(255, 255, 255, 0.18)",
        borderRadius: 24,
        padding: "22px 36px",
        maxWidth: 920,
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
        backdropFilter: "blur(14px)",
      }}
    >
      <p style={{ margin: 0, fontSize: 32, fontWeight: 800, lineHeight: 1.35, color: "#F8FAFC" }}>
        {highlight && text.includes(highlight) ? (
          <>
            {text.split(highlight)[0]}
            <span
              style={{
                color: "#00F59B",
                backgroundColor: "rgba(0, 245, 155, 0.2)",
                border: "1px solid #00F59B",
                padding: "4px 12px",
                borderRadius: 10,
                display: "inline-block",
                transform: "scale(1.04)",
              }}
            >
              {highlight}
            </span>
            {text.split(highlight)[1]}
          </>
        ) : (
          text
        )}
      </p>
    </div>
  );
};

// Rich Background with Glowing Floating Orbs
const RichAnimatedBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const orb1X = interpolate(Math.sin((frame / 60) * Math.PI), [-1, 1], [-90, 90]);
  const orb1Y = interpolate(Math.cos((frame / 70) * Math.PI), [-1, 1], [-90, 90]);

  const orb2X = interpolate(Math.cos((frame / 50) * Math.PI), [-1, 1], [90, -90]);
  const orb2Y = interpolate(Math.sin((frame / 65) * Math.PI), [-1, 1], [90, -90]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Background Deep Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 25%, #171E36 0%, #0A0E17 80%)",
        }}
      />

      {/* Glowing Orb 1: Violet Indigo */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "15%",
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, transparent 70%)",
          transform: `translate(${orb1X}px, ${orb1Y}px)`,
          filter: "blur(60px)",
        }}
      />

      {/* Glowing Orb 2: Neon Emerald */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "12%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 245, 155, 0.22) 0%, transparent 70%)",
          transform: `translate(${orb2X}px, ${orb2Y}px)`,
          filter: "blur(70px)",
        }}
      />

      {/* Blueprint Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "48px 48px",
          opacity: 0.6,
        }}
      />
    </div>
  );
};
