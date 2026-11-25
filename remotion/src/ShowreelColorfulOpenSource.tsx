import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Vibrant, Full-Bleed Color Palette (Borderless Showreel)
const C_YELLOW = "#FFBE0B";
const C_MAGENTA = "#FF006E";
const C_VIOLET = "#8338EC";
const C_BLUE = "#3A86FF";
const C_MINT = "#06D6A0";
const C_CREAM = "#FFFDF7";
const C_DARK = "#12062C";

export const ShowreelColorfulOpenSource: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig(); // 1080x1920, 60fps, 900 frames (15s)

  // 128 BPM beat pulse (1 beat = 28.125 frames at 60fps)
  const beatFloat = frame / 28.125;
  const beatPulse = Math.exp(-((beatFloat % 1) * 5));

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: C_DARK,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* 🎵 High-Energy 128 BPM Future-Beats Showreel Soundtrack */}
      <Audio src={staticFile("colorful_showreel_15s.wav")} volume={0.95} />

      {/* 🎬 ACT 1 (Frames 0 - 195): IRIS PORTAL & SLIT-SCAN "APRENDE A HACER" */}
      {frame < 195 && <Act1IrisAprende frame={frame} fps={fps} beatPulse={beatPulse} />}

      {/* 🎬 ACT 2 (Frames 165 - 375): CHROMATIC WAVE "MOTION GRAPHICS" */}
      {frame >= 165 && frame < 375 && (
        <Act2ChromaticMotion frame={frame - 165} fps={fps} beatPulse={beatPulse} />
      )}

      {/* 🎬 ACT 3 (Frames 345 - 555): RIBBON FLOW "CON APLICACIONES OPEN SOURCE" */}
      {frame >= 345 && frame < 555 && (
        <Act3OpenSourceRibbons frame={frame - 345} fps={fps} beatPulse={beatPulse} />
      )}

      {/* 🎬 ACT 4 (Frames 525 - 735): KALEIDOSCOPE "COSTO CERO" */}
      {frame >= 525 && frame < 735 && (
        <Act4CostoCeroExplosion frame={frame - 525} fps={fps} beatPulse={beatPulse} />
      )}

      {/* 🎬 ACT 5 (Frames 705 - 900): GRAND FINALE MANIFESTO LOCKUP */}
      {frame >= 705 && (
        <Act5GrandFinaleManifesto frame={frame - 705} fps={fps} beatPulse={beatPulse} />
      )}
    </div>
  );
};

// ============================================================================
// ACT 1: CONCENTRIC IRIS PORTAL & KINETIC SLIT-SCAN ("APRENDE A HACER")
// ============================================================================
const Act1IrisAprende: React.FC<{ frame: number; fps: number; beatPulse: number }> = ({
  frame,
  fps,
  beatPulse,
}) => {
  // Concentric circles expanding from center
  const circleColors = [C_VIOLET, C_MAGENTA, C_YELLOW, C_MINT, C_DARK];

  // Portal expansion at end of Act 1 (frames 160 - 190)
  const portalExpand = interpolate(frame, [160, 190], [0, 2600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lettersAprende = "APRENDE".split("");
  const lettersAHacer = "A HACER".split("");

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Expanding Concentric Color Circles (Zero borders, pure color fill) */}
      {circleColors.map((col, idx) => {
        const sp = spring({
          frame: frame - idx * 5,
          fps,
          config: { damping: 14, stiffness: 90, mass: 0.8 },
        });
        const size = interpolate(sp, [0, 1], [0, 2500 - idx * 220]);
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: col,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Floating Borderless Geometric Accents */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Top-left spinning Bauhaus sun */}
        <g transform={`translate(220, 380) rotate(${frame * 2.5}) scale(${1 + beatPulse * 0.08})`}>
          <circle cx="0" cy="0" r="140" fill={C_YELLOW} />
          <path d="M 0 -140 A 140 140 0 0 1 140 0 L 0 0 Z" fill={C_MAGENTA} />
          <circle cx="0" cy="0" r="55" fill={C_DARK} />
        </g>

        {/* Bottom-right morphing pill */}
        <g transform={`translate(860, 1520) rotate(${-frame * 2}) scale(${1 + beatPulse * 0.1})`}>
          <rect x="-160" y="-70" width="320" height="140" rx="70" fill={C_MINT} />
          <circle cx="-80" cy="0" r="45" fill={C_VIOLET} />
          <circle cx="80" cy="0" r="45" fill={C_YELLOW} />
        </g>

        {/* Dynamic floating quarter arcs */}
        <path
          d="M 1080 0 L 1080 420 A 420 420 0 0 1 660 0 Z"
          fill={C_BLUE}
          transform={`scale(${spring({ frame: frame - 15, fps, config: { damping: 12 } })})`}
        />
        <path
          d="M 0 1920 L 0 1500 A 420 420 0 0 1 420 1920 Z"
          fill={C_MAGENTA}
          transform={`translate(0, ${interpolate(
            spring({ frame: frame - 20, fps, config: { damping: 12 } }),
            [0, 1],
            [420, 0]
          )})`}
        />
      </svg>

      {/* Center Kinetic Typography Lockup */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transform: `rotate(-6deg) scale(${1 + beatPulse * 0.03})`,
        }}
      >
        {/* Row 1: APRENDE */}
        <div
          style={{
            backgroundColor: C_YELLOW,
            padding: "20px 56px",
            borderRadius: 120,
            display: "flex",
            gap: 6,
            transform: `translateX(${interpolate(
              spring({ frame: frame - 12, fps, config: { damping: 11, stiffness: 150 } }),
              [0, 1],
              [-1100, 0]
            )}px)`,
          }}
        >
          {lettersAprende.map((ch, i) => {
            const charSp = spring({
              frame: frame - 18 - i * 3,
              fps,
              config: { damping: 8, stiffness: 200, mass: 0.5 },
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: 152,
                  fontWeight: 900,
                  color: C_DARK,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.95,
                  display: "inline-block",
                  transform: `translateY(${(1 - charSp) * 80}px) scale(${charSp})`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        {/* Row 2: A HACER */}
        <div
          style={{
            backgroundColor: C_MAGENTA,
            padding: "20px 64px",
            borderRadius: 120,
            marginTop: -16,
            display: "flex",
            gap: 8,
            transform: `translateX(${interpolate(
              spring({ frame: frame - 28, fps, config: { damping: 11, stiffness: 150 } }),
              [0, 1],
              [1100, 0]
            )}px)`,
          }}
        >
          {lettersAHacer.map((ch, i) => {
            const charSp = spring({
              frame: frame - 34 - i * 3,
              fps,
              config: { damping: 8, stiffness: 200, mass: 0.5 },
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: 152,
                  fontWeight: 900,
                  color: C_CREAM,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.95,
                  display: "inline-block",
                  transform: `translateY(${(1 - charSp) * -80}px) scale(${charSp})`,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </div>

        {/* Row 3: Dynamic Pill Tag */}
        <div
          style={{
            backgroundColor: C_MINT,
            padding: "18px 48px",
            borderRadius: 999,
            marginTop: 28,
            transform: `scale(${spring({
              frame: frame - 52,
              fps,
              config: { damping: 7, stiffness: 190 },
            })})`,
          }}
        >
          <span
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: C_DARK,
              letterSpacing: "0.08em",
            }}
          >
            ★ CREATIVIDAD SIN LÍMITES ★
          </span>
        </div>
      </div>

      {/* Expanding Color Portal to Act 2 */}
      {portalExpand > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: portalExpand,
            height: portalExpand,
            borderRadius: "50%",
            backgroundColor: C_MAGENTA,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// ACT 2: CHROMATIC ECHO WAVE & BAUHAUS SHAPES ("MOTION GRAPHICS")
// ============================================================================
const Act2ChromaticMotion: React.FC<{
  frame: number;
  fps: number;
  beatPulse: number;
}> = ({ frame, fps, beatPulse }) => {
  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Diagonal wipe to Act 3 at frames 180 - 210
  const wipeProgress = interpolate(frame, [175, 208], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const echoColors = [C_VIOLET, C_BLUE, C_MINT, C_YELLOW, C_CREAM];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C_MAGENTA,
        overflow: "hidden",
        clipPath: `circle(${enter * 150}% at 50% 50%)`,
      }}
    >
      {/* Dynamic Sweeping Color Field */}
      <div
        style={{
          position: "absolute",
          top: -300,
          left: -300,
          width: 1700,
          height: 1250,
          backgroundColor: C_VIOLET,
          transform: `rotate(${-14 + Math.sin(frame / 25) * 4}deg)`,
        }}
      />

      {/* Giant Spinning Starburst in Background (No borders, flat fill) */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <g transform={`translate(540, 960) rotate(${frame * 1.2})`}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <rect
              key={idx}
              x="-45"
              y="-1100"
              width="90"
              height="2200"
              fill="rgba(255, 255, 255, 0.07)"
              transform={`rotate(${idx * 15})`}
            />
          ))}
        </g>

        {/* Floating Bauhaus Geometry */}
        <circle
          cx={interpolate(Math.sin(frame / 22), [-1, 1], [180, 900])}
          cy="320"
          r={90 + beatPulse * 20}
          fill={C_YELLOW}
        />
        <circle
          cx={interpolate(Math.cos(frame / 22), [-1, 1], [180, 900])}
          cy="1600"
          r={110 + beatPulse * 25}
          fill={C_MINT}
        />
      </svg>

      {/* Stacked Chromatic Kinetic Typography: MOTION GRAPHICS */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {echoColors.map((col, idx) => {
          const isFront = idx === echoColors.length - 1;
          const waveX = Math.sin((frame - idx * 5) / 10) * (isFront ? 10 : 55);
          const waveY = Math.cos((frame - idx * 5) / 12) * (isFront ? 6 : 28);
          const rowSp = spring({
            frame: frame - idx * 4,
            fps,
            config: { damping: 9, stiffness: 170, mass: 0.6 },
          });

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                transform: `translate(${waveX}px, ${waveY + (idx - 2) * 32}px) scale(${
                  rowSp * (isFront ? 1.06 + beatPulse * 0.04 : 0.96)
                })`,
                textAlign: "center",
                zIndex: idx,
              }}
            >
              <div
                style={{
                  fontSize: 184,
                  fontWeight: 900,
                  lineHeight: 0.86,
                  letterSpacing: "-0.06em",
                  color: col,
                }}
              >
                MOTION
              </div>
              <div
                style={{
                  fontSize: 168,
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: "-0.06em",
                  color: isFront ? C_YELLOW : col,
                }}
              >
                GRAPHICS
              </div>
            </div>
          );
        })}

        {/* Floating Pill Badges */}
        <div
          style={{
            position: "absolute",
            top: 230,
            backgroundColor: C_MINT,
            padding: "16px 46px",
            borderRadius: 999,
            transform: `rotate(-8deg) scale(${spring({
              frame: frame - 20,
              fps,
              config: { damping: 8, stiffness: 180 },
            })})`,
          }}
        >
          <span style={{ fontSize: 48, fontWeight: 900, color: C_DARK }}>
            100% DINÁMICO
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 230,
            backgroundColor: C_DARK,
            padding: "18px 52px",
            borderRadius: 999,
            transform: `rotate(6deg) scale(${spring({
              frame: frame - 32,
              fps,
              config: { damping: 8, stiffness: 180 },
            })})`,
          }}
        >
          <span style={{ fontSize: 48, fontWeight: 900, color: C_YELLOW }}>
            ARTE EN MOVIMIENTO
          </span>
        </div>
      </div>

      {/* Diagonal Curtain Wipe to Act 3 */}
      {wipeProgress > 0 && (
        <div
          style={{
            position: "absolute",
            inset: -400,
            backgroundColor: C_BLUE,
            transform: `translateY(${interpolate(wipeProgress, [0, 1], [2400, 0])}px) rotate(-12deg)`,
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// ACT 3: DIAGONAL RIBBONS & FLOWER MORPH ("CON APLICACIONES OPEN SOURCE")
// ============================================================================
const Act3OpenSourceRibbons: React.FC<{
  frame: number;
  fps: number;
  beatPulse: number;
}> = ({ frame, fps, beatPulse }) => {
  const enter = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // Flower portal expansion to Act 4 (frames 175 - 208)
  const portalScale = interpolate(frame, [175, 208], [0, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C_BLUE,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      {/* Full-Bleed Diagonal Color Streams (Zero borders) */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -300,
          width: 1800,
          height: 520,
          backgroundColor: C_DARK,
          transform: `rotate(-15deg) translateX(${interpolate(enter, [0, 1], [-800, 0])}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -220,
          left: -300,
          width: 1800,
          height: 560,
          backgroundColor: C_MINT,
          transform: `rotate(-15deg) translateX(${interpolate(enter, [0, 1], [800, 0])}px)`,
        }}
      />

      {/* Animated Open-Source Geometric Petal Emblem */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <g transform={`translate(540, 440) rotate(${frame * 1.8}) scale(${enter * (1 + beatPulse * 0.08)})`}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-95"
              rx="55"
              ry="110"
              fill={i % 2 === 0 ? C_YELLOW : C_MAGENTA}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="52" fill={C_CREAM} />
        </g>
      </svg>

      {/* Main Typography Blocks */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 180,
          transform: "rotate(-6deg)",
        }}
      >
        {/* Ribbon 1: CON APLICACIONES */}
        <div
          style={{
            backgroundColor: C_CREAM,
            padding: "26px 56px",
            borderRadius: 48,
            transform: `scale(${spring({
              frame: frame - 10,
              fps,
              config: { damping: 8, stiffness: 180 },
            })})`,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              color: C_DARK,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            CON APLICACIONES
          </div>
        </div>

        {/* Ribbon 2: OPEN SOURCE */}
        <div
          style={{
            backgroundColor: C_YELLOW,
            padding: "36px 68px",
            borderRadius: 64,
            marginTop: 24,
            transform: `scale(${
              spring({
                frame: frame - 24,
                fps,
                config: { damping: 7, stiffness: 190 },
              }) *
              (1 + beatPulse * 0.04)
            })`,
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              color: C_DARK,
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              textAlign: "center",
            }}
          >
            OPEN
            <br />
            SOURCE
          </div>
        </div>

        {/* Bottom Tag: LIBRES Y ABIERTAS */}
        <div
          style={{
            backgroundColor: C_MAGENTA,
            padding: "20px 54px",
            borderRadius: 999,
            marginTop: 32,
            transform: `scale(${spring({
              frame: frame - 40,
              fps,
              config: { damping: 8, stiffness: 180 },
            })})`,
          }}
        >
          <span
            style={{
              fontSize: 50,
              fontWeight: 900,
              color: C_CREAM,
              letterSpacing: "0.06em",
            }}
          >
            100% CÓDIGO ABIERTO
          </span>
        </div>
      </div>

      {/* Expanding Yellow Portal to Act 4 */}
      {portalScale > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: C_YELLOW,
            transform: `translate(-50%, -50%) scale(${portalScale})`,
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// ACT 4: KALEIDOSCOPE ZERO & RADIAL BURST ("COSTO CERO")
// ============================================================================
const Act4CostoCeroExplosion: React.FC<{
  frame: number;
  fps: number;
  beatPulse: number;
}> = ({ frame, fps, beatPulse }) => {
  const zeroPop = spring({
    frame: frame - 8,
    fps,
    config: { damping: 7.5, stiffness: 180, mass: 0.6 },
  });

  const textPop = spring({
    frame: frame - 24,
    fps,
    config: { damping: 8, stiffness: 190 },
  });

  // Transition wipe to Act 5 (frames 175 - 208)
  const wipeAct5 = interpolate(frame, [175, 208], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C_YELLOW,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      {/* Flat-Vector Radial Sunburst in Background */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <g transform={`translate(540, 820) rotate(${-frame * 1.5})`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon
              key={i}
              points="0,0 -95,-1400 95,-1400"
              fill={i % 2 === 0 ? C_MINT : C_YELLOW}
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* Kaleidoscope Concentric Rings */}
        <g transform={`translate(540, 820) scale(${zeroPop * (1 + beatPulse * 0.06)})`}>
          <circle cx="0" cy="0" r="420" fill={C_DARK} />
          <circle cx="0" cy="0" r="330" fill={C_MAGENTA} />
          <circle cx="0" cy="0" r="240" fill={C_VIOLET} />
          <circle cx="0" cy="0" r="150" fill={C_BLUE} />
        </g>
      </svg>

      {/* Giant "$0" and "COSTO CERO" */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Giant $0 */}
        <div
          style={{
            fontSize: 380,
            fontWeight: 900,
            color: C_CREAM,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
            marginTop: -120,
            transform: `scale(${zeroPop * (1 + beatPulse * 0.05)})`,
          }}
        >
          $0
        </div>

        {/* COSTO CERO Banner */}
        <div
          style={{
            backgroundColor: C_DARK,
            padding: "32px 76px",
            borderRadius: 72,
            marginTop: 40,
            transform: `scale(${textPop}) rotate(-4deg)`,
          }}
        >
          <div
            style={{
              fontSize: 138,
              fontWeight: 900,
              color: C_YELLOW,
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              textAlign: "center",
            }}
          >
            COSTO CERO
          </div>
        </div>

        {/* Subtitle Pill */}
        <div
          style={{
            backgroundColor: C_MAGENTA,
            padding: "20px 56px",
            borderRadius: 999,
            marginTop: 28,
            transform: `scale(${spring({
              frame: frame - 38,
              fps,
              config: { damping: 8, stiffness: 190 },
            })}) rotate(3deg)`,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: C_CREAM,
              letterSpacing: "0.06em",
            }}
          >
            ¡GRATIS PARA SIEMPRE!
          </span>
        </div>
      </div>

      {/* Expanding Iris Wipe to Act 5 */}
      {wipeAct5 > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: wipeAct5 * 2600,
            height: wipeAct5 * 2600,
            borderRadius: "50%",
            backgroundColor: C_DARK,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

// ============================================================================
// ACT 5: GRAND FINALE MANIFESTO LOCKUP (Full-Bleed Color Blocks, Zero Borders)
// ============================================================================
const Act5GrandFinaleManifesto: React.FC<{
  frame: number;
  fps: number;
  beatPulse: number;
}> = ({ frame, fps, beatPulse }) => {
  const band1 = spring({ frame: frame - 5, fps, config: { damping: 11, stiffness: 160 } });
  const band2 = spring({ frame: frame - 13, fps, config: { damping: 11, stiffness: 160 } });
  const band3 = spring({ frame: frame - 21, fps, config: { damping: 11, stiffness: 160 } });
  const band4 = spring({ frame: frame - 29, fps, config: { damping: 11, stiffness: 160 } });
  const band5 = spring({ frame: frame - 37, fps, config: { damping: 11, stiffness: 160 } });

  const bands = [
    {
      bg: C_YELLOW,
      fg: C_DARK,
      text: "APRENDE A HACER",
      size: 98,
      sp: band1,
      dir: -1,
    },
    {
      bg: C_MAGENTA,
      fg: C_CREAM,
      text: "MOTION GRAPHICS",
      size: 102,
      sp: band2,
      dir: 1,
    },
    {
      bg: C_BLUE,
      fg: C_CREAM,
      text: "CON APLICACIONES",
      size: 94,
      sp: band3,
      dir: -1,
    },
    {
      bg: C_MINT,
      fg: C_DARK,
      text: "OPEN SOURCE",
      size: 124,
      sp: band4,
      dir: 1,
    },
    {
      bg: C_VIOLET,
      fg: C_YELLOW,
      text: "COSTO CERO • $0",
      size: 112,
      sp: band5,
      dir: -1,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {bands.map((b, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            backgroundColor: b.bg,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
            transform: `translateX(${(1 - b.sp) * b.dir * 1080}px)`,
          }}
        >
          {/* Subtle Geometric Background Accent inside each band */}
          <div
            style={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.14)",
              left: i % 2 === 0 ? -60 : undefined,
              right: i % 2 === 1 ? -60 : undefined,
              transform: `scale(${1 + beatPulse * 0.15})`,
            }}
          />

          <span
            style={{
              fontSize: b.size,
              fontWeight: 900,
              color: b.fg,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              textAlign: "center",
              transform: `scale(${1 + beatPulse * 0.03})`,
            }}
          >
            {b.text}
          </span>
        </div>
      ))}
    </div>
  );
};
