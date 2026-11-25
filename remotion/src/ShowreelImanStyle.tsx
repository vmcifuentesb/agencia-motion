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
  MacOSInspectorCard,
  SubscriptionsReceiptCard,
  CreativeBentoGrid,
  MasterclassBlueprintCard,
  HighTicketDMCard,
} from "./ImanStyleComponents";

export const ShowreelImanStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig(); // 1080x1920, 30fps, 1350 frames (~45.0s)

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0A0D14",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* 🎙️ Voiceover (Cero nombres de herramientas, condición comunitaria clara) */}
      <Audio src={staticFile("locucion_energetica.mp3")} volume={1.0} />

      {/* 🎵 Deep Luxury Tech Soundtrack (Iman Gadzhi style minor-key beat) */}
      <Audio src={staticFile("iman_bg_track.wav")} volume={0.16} />

      {/* 🔊 Sincronización de SFX en compases clave */}
      <Sequence from={0}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.65} /></Sequence>
      <Sequence from={228}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.7} /></Sequence>
      <Sequence from={250}><Audio src={staticFile("sfx/chaching.wav")} volume={0.65} /></Sequence>
      <Sequence from={358}><Audio src={staticFile("sfx/scratch.wav")} volume={0.8} /></Sequence>
      <Sequence from={366}><Audio src={staticFile("sfx/boing.wav")} volume={0.7} /></Sequence>
      <Sequence from={432}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.7} /></Sequence>
      <Sequence from={738}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.7} /></Sequence>
      <Sequence from={1012}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.75} /></Sequence>
      <Sequence from={1038}><Audio src={staticFile("sfx/ding.wav")} volume={0.8} /></Sequence>

      {/* 📐 Technical Blueprint Grid & Vignette Background */}
      <BlueprintTechnicalBackground frame={frame} />

      {/* 🎬 SCENE 1: HOOK / INSPECTOR CURVE (Frames 0 - 232 / ~0 - 7.7s) */}
      {frame < 235 && (
        <ImanSceneWrapper start={0} end={230} frame={frame} fps={fps}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 999,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#E2E8F0",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.15em",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 16,
              }}
            >
              // EXPERIMENTO DE CÓDIGO 01
            </div>
            <h1
              style={{
                fontSize: 66,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.04em",
              }}
            >
              ¿Motion Graphics con <span style={{ color: "#00F59B" }}>Puro Código</span>?
            </h1>
          </div>

          <MacOSInspectorCard />

          <ImanCaptionBox
            text="¿Te imaginas crear este tipo de motion graphics profesionales con puro código, sin pagarle un solo centavo a Claude ni a Codex?"
            highlight="sin pagarle un solo centavo a Claude ni a Codex"
          />
        </ImanSceneWrapper>
      )}

      {/* 🎬 SCENE 2: INVOICE CANCELLED VS FREE CODE (Frames 228 - 438 / ~7.7 - 14.5s) */}
      {frame >= 228 && frame < 438 && (
        <ImanSceneWrapper start={230} end={435} frame={frame} fps={fps}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 999,
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "1px solid #EF4444",
                color: "#FCA5A5",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.15em",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 16,
              }}
            >
              // ANÁLISIS DE COSTOS
            </div>
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.04em",
              }}
            >
              ¿Pagar <span style={{ color: "#EF4444" }}>$200 al mes</span>? ¡Para nada!
            </h1>
          </div>

          <SubscriptionsReceiptCard />

          <ImanCaptionBox
            text={
              frame < 350
                ? "O sea, ¿quién inventó que tienes que pagar suscripciones de doscientos dólares al mes?"
                : "¡Para nada! Con código abierto puedes animar lo que quieras en tu computadora."
            }
            highlight={frame < 350 ? "suscripciones de doscientos dólares al mes" : "¡Para nada! Con código abierto"}
          />
        </ImanSceneWrapper>
      )}

      {/* 🎬 SCENE 3: BENTO GRID / EL LÍMITE ES TU IMAGINACIÓN (Frames 430 - 745 / ~14.5 - 24.7s) */}
      {frame >= 430 && frame < 745 && (
        <ImanSceneWrapper start={435} end={740} frame={frame} fps={fps}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 999,
                backgroundColor: "rgba(255, 85, 0, 0.15)",
                border: "1px solid #FF5500",
                color: "#FF8A50",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.15em",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 16,
              }}
            >
              // FORMATOS & POSIBILIDADES
            </div>
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.04em",
              }}
            >
              El único límite es <span style={{ color: "#FF5500" }}>tu imaginación</span>
            </h1>
          </div>

          <CreativeBentoGrid />

          <ImanCaptionBox
            text={
              frame < 600
                ? "Puedes animar literalmente lo que se te ocurra, directamente en tu compu y con cero límites."
                : "El límite no es tu billetera... ¡es tu imaginación!"
            }
            highlight={frame < 600 ? "directamente en tu compu y con cero límites" : "¡es tu imaginación!"}
          />
        </ImanSceneWrapper>
      )}

      {/* 🎬 SCENE 4: BLUEPRINT DEL CURSO (Frames 735 - 1020 / ~24.7 - 33.9s) */}
      {frame >= 735 && frame < 1020 && (
        <ImanSceneWrapper start={740} end={1015} frame={frame} fps={fps}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 999,
                backgroundColor: "rgba(0, 245, 155, 0.15)",
                border: "1px solid #00F59B",
                color: "#00F59B",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.15em",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 16,
              }}
            >
              // CONVOCATORIA COMUNITARIA
            </div>
            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 900,
                letterSpacing: "-0.04em",
              }}
            >
              Si veo interés... <span style={{ color: "#00F59B" }}>les enseño a todos</span>
            </h1>
          </div>

          <MasterclassBlueprintCard />

          <ImanCaptionBox
            text="Si veo que a muchos les interesa, voy a armar un curso súper, súper económico donde les enseñaré todo paso a paso."
            highlight="curso súper, súper económico donde les enseñaré todo"
          />
        </ImanSceneWrapper>
      )}

      {/* 🎬 SCENE 5: HIGH-TICKET DM CALL TO ACTION (Frames 1010 - 1350 / ~33.9 - 45.0s) */}
      {frame >= 1010 && (
        <ImanSceneWrapper start={1015} end={1350} frame={frame} fps={fps}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 24px",
                borderRadius: 999,
                backgroundColor: "rgba(0, 245, 155, 0.15)",
                border: "1px solid #00F59B",
                color: "#00F59B",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "0.15em",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 16,
              }}
            >
              // TU DECISIÓN
            </div>
            <h1
              style={{
                fontSize: 70,
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: 920,
                letterSpacing: "-0.04em",
              }}
            >
              Escríbeme <span style={{ color: "#00F59B" }}>MOTION</span> al DM
            </h1>
          </div>

          <HighTicketDMCard />

          <ImanCaptionBox
            text="Escríbeme un DM ahora mismo con la palabra MOTION, y si se junta suficiente gente, ¡lo abrimos y les enseño a todos!"
            highlight="Escríbeme un DM ahora mismo con la palabra MOTION"
          />
        </ImanSceneWrapper>
      )}

      {/* Top Header Watermark (Iman Gadzhi Studio Header) */}
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
          fontSize: 18,
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.5)",
          letterSpacing: "0.12em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#FF5500" }} />
          <span>PROMPTEND // CODE MOTION ARCHIVE</span>
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            padding: "6px 16px",
            borderRadius: 8,
            color: "#E2E8F0",
          }}
        >
          {Math.floor(frame / 30)}s / 45s
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SMOOTH SCENE TRANSITION WRAPPER
// =========================================================================
const ImanSceneWrapper: React.FC<{
  start: number;
  end: number;
  frame: number;
  fps: number;
  children: React.ReactNode;
}> = ({ start, end, frame, fps, children }) => {
  const localFrame = frame - start;
  const duration = end - start;

  // Crisp smooth entry
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.75 },
  });

  // Continuous subtle cinematic drift across the scene
  const slowDrift = interpolate(localFrame, [0, duration], [1, 1.025]);

  // Split-wipe exit during last 6 frames
  const exitFrames = 6;
  const isExiting = localFrame > duration - exitFrames;
  const exitProgress = isExiting
    ? interpolate(localFrame, [duration - exitFrames, duration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

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
        transform: `scale(${entrance * slowDrift}) translateY(${exitProgress * -80}px)`,
        opacity: isExiting ? 1 - exitProgress : 1,
      }}
    >
      {children}
    </div>
  );
};

// =========================================================================
// HIGH-CONTRAST IMAN GADZHI STYLE CAPTION BOX
// =========================================================================
const ImanCaptionBox: React.FC<{ text: string; highlight?: string }> = ({ text, highlight }) => {
  return (
    <div
      style={{
        marginTop: 38,
        backgroundColor: "rgba(10, 13, 20, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        borderRadius: 20,
        padding: "20px 36px",
        maxWidth: 920,
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        backdropFilter: "blur(16px)",
      }}
    >
      <p style={{ margin: 0, fontSize: 30, fontWeight: 800, lineHeight: 1.35, color: "#FFFFFF" }}>
        {highlight && text.includes(highlight) ? (
          <>
            {text.split(highlight)[0]}
            <span
              style={{
                color: "#070A0F",
                backgroundColor: "#00F59B",
                padding: "2px 10px",
                borderRadius: 8,
                fontWeight: 900,
                display: "inline-block",
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

// Technical Graph Paper & Vignette Background
const BlueprintTechnicalBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const subtleDrift = (frame * 0.2) % 40;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Matte Charcoal Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 30%, #131826 0%, #0A0D14 85%)",
        }}
      />

      {/* Blueprint Grid Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: `0px ${subtleDrift}px`,
          opacity: 0.7,
        }}
      />

      {/* Vignette Shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />
    </div>
  );
};
