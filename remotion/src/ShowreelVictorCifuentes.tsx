import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// --- COLOR TOKENS ---
const COLORS = {
  night: "#0E0F14",
  ink: "#14151B",
  paper: "#E6E0DD",
  cobalt: "#0B63A4",
  navy: "#0B2B5C",
  orange: "#E6915B",
  orangeDark: "#D09269",
  guideDark: "rgba(255, 255, 255, 0.18)",
  guideLight: "rgba(0, 0, 0, 0.14)",
  guideBlue: "rgba(255, 255, 255, 0.25)",
};

const DISCIPLINES = [
  "Desarrollo Web",
  "Software a la Medida",
  "Aplicaciones Móviles",
  "Inteligencia Artificial",
  "Arquitectura Cloud",
  "Diseño de Interfaces",
  "Motion & Frontend",
  "Automatización IA",
  "E-commerce & APIs",
  "Estrategia Digital",
  "Identidad Visual",
];

const CIPHER_CHARS = "01#$%&/<>{}[]*+=-~^";

// --- HELPER: DETERMINISTIC TEXT SCRAMBLE / MATRIX DECODER ---
const useCipherText = (target: string, progress: number, seedPrefix: string) => {
  const revealedCount = Math.floor(
    interpolate(progress, [0, 1], [0, target.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  return target
    .split("")
    .map((ch, idx) => {
      if (ch === " ") return " ";
      if (idx < revealedCount) return ch;
      if (progress <= 0) return "";
      const rIdx = Math.floor(
        random(`${seedPrefix}-${idx}-${Math.floor(progress * 30)}`) *
          CIPHER_CHARS.length
      );
      return CIPHER_CHARS[rIdx];
    })
    .join("");
};

// --- HELPER: 3D EXTRUDED TEXT SHADOW GENERATOR ---
const get3DShadow = (
  depth: number,
  color: string,
  dx = 1.5,
  dy = 2,
  chromatic = false
) => {
  const layers: string[] = [];
  for (let i = 1; i <= depth; i++) {
    layers.push(`${(i * dx).toFixed(1)}px ${(i * dy).toFixed(1)}px 0px ${color}`);
  }
  if (chromatic) {
    layers.push(`-5px -2px 0px rgba(230, 145, 91, 0.75)`);
    layers.push(`5px 2px 0px rgba(11, 99, 164, 0.75)`);
  }
  layers.push(`0px 25px 45px rgba(0,0,0,0.35)`);
  return layers.join(", ");
};

// --- HELPER: GENERATIVE FLOATING PARTICLES & HUD CROSSHAIRS ---
const GenerativeField: React.FC<{
  seed: string;
  count?: number;
  color?: string;
}> = ({ seed, count = 18, color = "rgba(255,255,255,0.22)" }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const baseX = random(`${seed}-x-${i}`) * 1080;
        const baseY = random(`${seed}-y-${i}`) * 1920;
        const speedX = (random(`${seed}-sx-${i}`) - 0.5) * 2.5;
        const speedY = (random(`${seed}-sy-${i}`) - 0.5) * 3.5;
        const size = 10 + random(`${seed}-sz-${i}`) * 18;
        const rotSpeed = (random(`${seed}-rot-${i}`) - 0.5) * 4;
        const kind = Math.floor(random(`${seed}-k-${i}`) * 4);

        const x = (baseX + frame * speedX + 1080) % 1080;
        const y = (baseY + frame * speedY + 1920) % 1920;
        const rot = frame * rotSpeed;
        const pulse = 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.08 + i));

        return (
          <div
            key={i}
            className="absolute font-mono select-none flex items-center justify-center"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) rotate(${rot}deg)`,
              color,
              opacity: pulse,
              fontSize: `${size}px`,
            }}
          >
            {kind === 0 && "+"}
            {kind === 1 && "×"}
            {kind === 2 && (
              <div
                className="rounded-full border"
                style={{
                  width: `${size * 0.8}px`,
                  height: `${size * 0.8}px`,
                  borderColor: color,
                }}
              />
            )}
            {kind === 3 && (
              <span className="text-[10px] tracking-widest">
                {Math.floor(x)}:{Math.floor(y)}
              </span>
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// --- HELPER: 3D KINETIC CHARACTER-BY-CHARACTER TEXT ---
const Kinetic3DText: React.FC<{
  text: string;
  relFrame: number;
  fontSize?: number;
  textColor?: string;
  extrudeColor?: string;
  extrudeDepth?: number;
  staggerFrames?: number;
  chromatic?: boolean;
}> = ({
  text,
  relFrame,
  fontSize = 115,
  textColor = "#14151B",
  extrudeColor = "rgba(0,0,0,0.2)",
  extrudeDepth = 8,
  staggerFrames = 2,
  chromatic = false,
}) => {
  const { fps } = useVideoConfig();

  return (
    <div
      className="inline-flex flex-nowrap items-center justify-center"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {text.split("").map((char, i) => {
        const delay = i * staggerFrames;
        const spr = spring({
          frame: Math.max(0, relFrame - delay),
          fps,
          config: { damping: 11, stiffness: 180, mass: 0.7 },
        });

        const translateY = interpolate(spr, [0, 1], [110, 0]);
        const rotateX = interpolate(spr, [0, 1], [-95, 0]);
        const rotateY = interpolate(spr, [0, 1], [45, 0]);
        const scale = interpolate(spr, [0, 1], [0.2, 1]);
        const opacity = interpolate(spr, [0, 0.3, 1], [0, 1, 1]);

        // Continuous subtle wave float after landing
        const waveY = Math.sin((relFrame - delay) * 0.12 + i * 0.5) * 4 * spr;

        return (
          <span
            key={i}
            className="inline-block font-extrabold tracking-tight select-none"
            style={{
              fontFamily: "Inter, 'Helvetica Neue', sans-serif",
              fontSize: `${fontSize}px`,
              color: textColor,
              opacity,
              transform: `translateY(${translateY + waveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
              textShadow: get3DShadow(extrudeDepth, extrudeColor, 1.5, 2, chromatic),
              whiteSpace: "pre",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

// --- ANIMATED TECHNICAL GUIDE OVERLAY ---
const TechnicalGrid: React.FC<{
  theme: "dark" | "light" | "blue";
  relFrame?: number;
  showCoords?: boolean;
  topLabel?: string;
  leftX?: number;
  rightX?: number;
  topY?: number;
  bottomY?: number;
}> = ({
  theme,
  relFrame = 30,
  showCoords = true,
  topLabel,
  leftX = 312,
  rightX = 768,
  topY = 862,
  bottomY = 1058,
}) => {
  const { fps } = useVideoConfig();

  const snap = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const animLeftX = Math.round(interpolate(snap, [0, 1], [0, leftX]));
  const animRightX = Math.round(interpolate(snap, [0, 1], [1080, rightX]));
  const animTopY = Math.round(interpolate(snap, [0, 1], [200, topY]));
  const animBottomY = Math.round(interpolate(snap, [0, 1], [1720, bottomY]));

  const guideColor =
    theme === "dark"
      ? COLORS.guideDark
      : theme === "blue"
      ? COLORS.guideBlue
      : COLORS.guideLight;

  const textColor =
    theme === "dark"
      ? "text-zinc-400"
      : theme === "blue"
      ? "text-blue-200/80"
      : "text-zinc-600";

  // Scanning laser pulse along grid
  const scanY = (relFrame * 22) % 1920;

  return (
    <AbsoluteFill className="pointer-events-none">
      {/* Vertical guide lines */}
      <div
        className="absolute top-0 bottom-0 border-l"
        style={{ left: `${animLeftX}px`, borderColor: guideColor }}
      />
      <div
        className="absolute top-0 bottom-0 border-l"
        style={{ left: `${animRightX}px`, borderColor: guideColor }}
      />

      {/* Horizontal guide lines */}
      <div
        className="absolute left-0 right-0 border-t"
        style={{ top: `${animTopY}px`, borderColor: guideColor }}
      />
      <div
        className="absolute left-0 right-0 border-t"
        style={{ top: `${animBottomY}px`, borderColor: guideColor }}
      />

      {/* Horizontal laser scan line */}
      <div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          top: `${scanY}px`,
          background: `linear-gradient(90deg, transparent, ${COLORS.orange}, transparent)`,
          opacity: 0.35,
        }}
      />

      {/* Center vertical dashed line */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dashed"
        style={{ borderColor: guideColor }}
      />

      {/* Intersection Target Circles with rotating crosshairs */}
      {[
        { x: animLeftX, y: animTopY },
        { x: animRightX, y: animTopY },
        { x: animLeftX, y: animBottomY },
        { x: animRightX, y: animBottomY },
      ].map((pt, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border flex items-center justify-center"
          style={{
            left: `${pt.x}px`,
            top: `${pt.y}px`,
            borderColor: COLORS.orange,
            transform: `translate(-50%, -50%) scale(${0.8 + 0.3 * Math.sin(relFrame * 0.2 + i)})`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />
        </div>
      ))}

      {/* Live Numerical Coordinate Callouts */}
      {showCoords && (
        <>
          <div
            className={`absolute font-mono text-[14px] font-bold tracking-widest ${textColor}`}
            style={{ left: `${animLeftX + 14}px`, top: `${animTopY - 28}px` }}
          >
            X {animLeftX}
          </div>
          <div
            className={`absolute font-mono text-[14px] font-bold tracking-widest ${textColor}`}
            style={{ left: `${animRightX + 14}px`, top: `${animTopY - 28}px` }}
          >
            X {animRightX}
          </div>
          <div
            className={`absolute font-mono text-[14px] font-bold tracking-widest ${textColor}`}
            style={{ left: `${animLeftX + 14}px`, top: `${animBottomY + 14}px` }}
          >
            {animBottomY - animTopY} PX
          </div>
          <div
            className={`absolute font-mono text-[14px] font-bold tracking-widest ${textColor}`}
            style={{ left: "51.5%", top: `${animBottomY + 110}px` }}
          >
            Y {Math.round((animTopY + animBottomY) / 2)} · Z {(relFrame * 3) % 99}
          </div>
        </>
      )}

      {topLabel && (
        <div
          className={`absolute font-mono text-[14px] font-bold uppercase tracking-widest ${textColor}`}
          style={{
            left: `${Math.max(24, animLeftX - 140)}px`,
            top: `${(animTopY + animBottomY) / 2 - 8}px`,
          }}
        >
          {topLabel}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 1: INTRO CALIBRATION + RADAR LOCK (Frames 0 - 48)
// ==========================================
const SceneIntroGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    from: 2.2,
    to: 1,
  });

  const rotZ = interpolate(frame, [0, 48], [-15, 0], {
    easing: Easing.out(Easing.cubic),
  });

  // Whip zoom out at the very end of scene (frames 40-48)
  const exitZoom = interpolate(frame, [38, 48], [0, 1.8], {
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.exp),
  });

  return (
    <AbsoluteFill
      className="flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.night }}
    >
      <GenerativeField seed="intro" count={24} color="rgba(230,145,91,0.35)" />

      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          transform: `scale(${zoom + exitZoom}) rotateZ(${rotZ}deg)`,
        }}
      >
        <TechnicalGrid theme="dark" relFrame={frame} showCoords={true} />

        {/* Central Target Radar Ring */}
        <div
          className="w-[340px] h-[340px] rounded-full border border-dashed border-[#E6915B]/50 flex items-center justify-center"
          style={{ transform: `rotate(${frame * 4}deg)` }}
        >
          <div className="w-[180px] h-[180px] rounded-full border border-white/30 flex items-center justify-center">
            <span className="font-mono text-xs tracking-[0.4em] text-[#E6915B]">
              SYS.INIT // {frame * 2}%
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 2: 3D HELLO + CAMERA TILT (Frames 48 - 132)
// ==========================================
const SceneHello: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 48;
  const { fps } = useVideoConfig();

  // Camera entry punch + 3D perspective orbit
  const camScale = spring({
    frame: relFrame,
    fps,
    config: { damping: 13, stiffness: 140 },
    from: 0.5,
    to: 1.08,
  });

  // Whip zoom right before transition (relFrame 72 -> 84)
  const whipZoom = interpolate(relFrame, [70, 84], [0, 2.5], {
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.poly(3)),
  });

  const tiltX = interpolate(relFrame, [0, 84], [22, -10]);
  const tiltY = interpolate(relFrame, [0, 84], [-25, 18]);

  const showCursor = Math.floor(relFrame / 8) % 2 === 0;

  return (
    <AbsoluteFill
      className="flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: COLORS.paper,
        perspective: "1100px",
      }}
    >
      <GenerativeField seed="hello" count={20} color="rgba(20,21,27,0.18)" />
      <TechnicalGrid theme="light" relFrame={relFrame} showCoords={true} />

      {/* Giant Kinetic Background Watermark */}
      <div
        className="absolute text-[420px] font-black tracking-tighter select-none pointer-events-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px rgba(20,21,27,0.06)",
          transform: `translateX(${interpolate(relFrame, [0, 84], [250, -250])}px) scale(1.2)`,
        }}
      >
        HELLO_WORLD
      </div>

      {/* 3D Tilted Stage */}
      <div
        className="relative z-10 flex items-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${camScale + whipZoom}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        <Kinetic3DText
          text="Hello"
          relFrame={relFrame}
          fontSize={185}
          textColor="#14151B"
          extrudeColor="#B8B2AE"
          extrudeDepth={12}
          staggerFrames={4}
          chromatic={relFrame < 15 || relFrame > 70}
        />
        <span
          className="inline-block w-[14px] h-[155px] ml-4 rounded-full"
          style={{
            backgroundColor: COLORS.orange,
            opacity: showCursor ? 1 : 0.25,
            boxShadow: `0 0 30px ${COLORS.orange}`,
            transform: `translateZ(30px)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 3: EXPLOSIVE 3D "I'm" (Frames 132 - 180)
// ==========================================
const SceneIm: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 132;
  const { fps } = useVideoConfig();

  const punch = spring({
    frame: relFrame,
    fps,
    config: { damping: 9, stiffness: 200, mass: 0.6 },
    from: 2.8,
    to: 1,
  });

  const rotZ = interpolate(relFrame, [0, 48], [12, -4]);
  const exitSlide = interpolate(relFrame, [38, 48], [0, -1200], {
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.back(1.7)),
  });

  // Flash invert on first 3 frames
  const isFlash = relFrame < 3;

  return (
    <AbsoluteFill
      className="flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isFlash ? COLORS.night : COLORS.paper,
        perspective: "1000px",
      }}
    >
      <GenerativeField seed="im" count={16} color="rgba(230,145,91,0.4)" />

      {/* Expanding geometric shockwave rings */}
      {[0, 10, 20].map((delay, i) => {
        const ringScale = interpolate(relFrame - delay, [0, 40], [0.2, 3.5], {
          extrapolateLeft: "clamp",
        });
        const ringOp = interpolate(relFrame - delay, [0, 40], [0.5, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            className="absolute w-[350px] h-[350px] rounded-full border-2"
            style={{
              borderColor: i % 2 === 0 ? COLORS.orange : "#14151B",
              transform: `scale(${ringScale})`,
              opacity: ringOp,
            }}
          />
        );
      })}

      <div
        style={{
          transform: `translateY(${exitSlide}px) scale(${punch}) rotateZ(${rotZ}deg) rotateY(${interpolate(
            relFrame,
            [0, 48],
            [-30, 20]
          )}deg)`,
        }}
      >
        <Kinetic3DText
          text="I'm"
          relFrame={relFrame}
          fontSize={220}
          textColor={isFlash ? "#FFFFFF" : "#14151B"}
          extrudeColor={COLORS.orange}
          extrudeDepth={14}
          staggerFrames={3}
          chromatic={true}
        />
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 4: NAME + HOLOGRAPHIC SILHOUETTE CLONES (Frames 180 - 288)
// ==========================================
const SceneNameSilhouette: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 180;
  const { fps } = useVideoConfig();

  // Silhouette springs up from bottom edge
  const silhouetteY = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.9 },
    from: 900,
    to: 0,
  });

  // Camera slow dolly zoom + 3D tilt
  const camScale = interpolate(relFrame, [0, 95, 108], [0.92, 1.08, 1.9], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const camRotY = Math.sin(relFrame * 0.06) * 8;

  // Cipher decoded subtitle
  const subText = useCipherText(
    "WEB DEVELOPER & AI ARCHITECT",
    interpolate(relFrame, [15, 55], [0, 1], { extrapolateRight: "clamp" }),
    "sub-vc"
  );

  return (
    <AbsoluteFill
      className="flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: COLORS.paper,
        perspective: "1200px",
      }}
    >
      <GenerativeField seed="silh" count={22} color="rgba(11,99,164,0.22)" />

      {/* Giant rotating monogram wireframe behind everything */}
      <div
        className="absolute top-[15%] text-[480px] font-black select-none pointer-events-none leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px rgba(20,21,27,0.07)",
          transform: `rotateY(${relFrame * 0.8}deg) scale(1.1)`,
        }}
      >
        VC
      </div>

      <AbsoluteFill
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${camScale}) rotateY(${camRotY}deg)`,
        }}
      >
        {/* Top 3D Name Lockup */}
        <div
          className="absolute top-[14%] left-0 right-0 flex flex-col items-center z-30"
          style={{ transform: "translateZ(80px)" }}
        >
          <span className="font-mono text-[22px] font-bold tracking-[0.4em] text-[#E6915B] uppercase mb-2">
            // IDENTITY_VERIFIED
          </span>

          <Kinetic3DText
            text="Victor Cifuentes"
            relFrame={relFrame}
            fontSize={102}
            textColor="#14151B"
            extrudeColor="#BDB7B3"
            extrudeDepth={9}
            staggerFrames={2}
            chromatic={relFrame < 20}
          />

          <div className="mt-6 px-6 py-2 rounded-full bg-[#14151B] text-[#E6E0DD] font-mono text-[17px] tracking-[0.3em] shadow-xl">
            {subText}
          </div>
        </div>

        {/* Concentric Sonar Rings behind Silhouette Head */}
        <div
          className="absolute bottom-[360px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none"
          style={{ transform: "translateZ(-40px)" }}
        >
          {[320, 480, 640].map((sz, idx) => (
            <div
              key={idx}
              className="absolute rounded-full border border-dashed"
              style={{
                width: `${sz}px`,
                height: `${sz}px`,
                borderColor: idx === 0 ? COLORS.orange : "rgba(20,21,27,0.2)",
                transform: `rotate(${relFrame * (idx % 2 === 0 ? 1.5 : -1.5)}deg)`,
              }}
            />
          ))}
        </div>

        {/* Silhouette Echo Clone #1 (Orange Offset) */}
        <div
          className="absolute bottom-0 left-1/2 w-[680px] z-10 flex justify-center pointer-events-none"
          style={{
            transform: `translate(-50%, ${silhouetteY}px) translateX(${
              Math.sin(relFrame * 0.15) * 22
            }px) scale(1.03)`,
            filter: "sepia(1) saturate(6) hue-rotate(-15deg) opacity(0.45)",
          }}
        >
          <Img
            src={staticFile("victor_silhouette.png")}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Silhouette Echo Clone #2 (Cobalt Offset) */}
        <div
          className="absolute bottom-0 left-1/2 w-[680px] z-10 flex justify-center pointer-events-none"
          style={{
            transform: `translate(-50%, ${silhouetteY}px) translateX(${
              -Math.sin(relFrame * 0.15) * 22
            }px) scale(1.015)`,
            filter: "sepia(1) saturate(5) hue-rotate(175deg) opacity(0.35)",
          }}
        >
          <Img
            src={staticFile("victor_silhouette.png")}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Main Sharp Victor Silhouette */}
        <div
          className="absolute bottom-0 left-1/2 w-[680px] z-20 flex justify-center"
          style={{
            transform: `translate(-50%, ${silhouetteY}px) translateZ(30px)`,
          }}
        >
          <Img
            src={staticFile("victor_silhouette.png")}
            className="w-full h-auto object-contain"
            style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))" }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 5: "I'm your|" + HYPER ZOOM INTO SILHOUETTE (Frames 288 - 348)
// ==========================================
const SceneImYour: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 288;
  const { fps } = useVideoConfig();

  const textScale = spring({
    frame: relFrame,
    fps,
    config: { damping: 10, stiffness: 160 },
    from: 0.4,
    to: 1,
  });

  // Aggressive zoom-in transition at end of scene
  const zoomThrough = interpolate(relFrame, [42, 60], [1, 4.5], {
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.exp),
  });

  const rotZ = interpolate(relFrame, [0, 60], [-5, 4]);

  return (
    <AbsoluteFill
      className="flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: COLORS.paper,
        perspective: "1000px",
      }}
    >
      <AbsoluteFill
        className="flex flex-col items-center justify-center"
        style={{
          transform: `scale(${zoomThrough}) rotateZ(${rotZ}deg)`,
        }}
      >
        <div
          className="absolute top-[28%] flex items-center z-30"
          style={{
            transform: `scale(${textScale}) rotateX(12deg)`,
          }}
        >
          <Kinetic3DText
            text="I'm your"
            relFrame={relFrame}
            fontSize={155}
            textColor="#14151B"
            extrudeColor={COLORS.orange}
            extrudeDepth={10}
            staggerFrames={2}
            chromatic={true}
          />
        </div>

        <div className="absolute bottom-0 w-[680px] z-10 flex justify-center">
          <Img
            src={staticFile("victor_silhouette.png")}
            className="w-full h-auto object-contain"
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 6: 4 RAPID ROLES WITH EXTREME 3D & CAMERA SHAKE (Frames 348 - 468)
// ==========================================
const RoleCard3D: React.FC<{
  subFrame: number;
  indexStr: string;
  title: string;
  bg: string;
  textColor: string;
  extrudeColor: string;
  accentType: "dot" | "square" | "plus" | "none";
  tiltDirection: number;
  watermark: string;
}> = ({
  subFrame,
  indexStr,
  title,
  bg,
  textColor,
  extrudeColor,
  accentType,
  tiltDirection,
  watermark,
}) => {
  const { fps } = useVideoConfig();

  // Explosive entry slam
  const slam = spring({
    frame: subFrame,
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.6 },
    from: 2.4,
    to: 1,
  });

  // Camera impact shake decaying over first 12 frames
  const shakeDecay = interpolate(subFrame, [0, 12], [18, 0], {
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(subFrame * 2.7) * shakeDecay;
  const shakeY = Math.cos(subFrame * 3.3) * shakeDecay;

  const rotY = interpolate(subFrame, [0, 30], [35 * tiltDirection, -10 * tiltDirection]);
  const rotZ = interpolate(subFrame, [0, 30], [-6 * tiltDirection, 2 * tiltDirection]);

  // Fast background marquee
  const marqueeX = interpolate(subFrame, [0, 30], [200 * tiltDirection, -300 * tiltDirection]);

  // 2-frame impact flash
  const isImpact = subFrame < 2;

  return (
    <AbsoluteFill
      className="flex flex-col justify-between p-20 overflow-hidden"
      style={{
        backgroundColor: isImpact ? "#FFFFFF" : bg,
        perspective: "1100px",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      <GenerativeField seed={`role-${indexStr}`} count={15} />

      {/* Giant Outline Kinetic Marquee in Background */}
      <div
        className="absolute top-1/2 -translate-y-1/2 text-[340px] font-black whitespace-nowrap select-none pointer-events-none"
        style={{
          color: "transparent",
          WebkitTextStroke: `3px ${
            bg === COLORS.paper ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"
          }`,
          transform: `translateX(${marqueeX}px) rotateZ(${-5 * tiltDirection}deg)`,
        }}
      >
        {watermark} // {watermark}
      </div>

      {/* Top HUD Bar */}
      <div
        className="flex justify-between items-center font-mono text-[24px] font-bold tracking-[0.3em] uppercase z-20"
        style={{ color: textColor }}
      >
        <span className="px-4 py-1 border border-current rounded-full">
          ROLE_SYS
        </span>
        <span>{indexStr} / 04</span>
      </div>

      {/* 3D Extruded Role Headline */}
      <div
        className="flex items-center justify-center z-20 my-auto"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${slam}) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
        }}
      >
        <div className="flex items-center">
          <Kinetic3DText
            text={title}
            relFrame={subFrame}
            fontSize={96}
            textColor={isImpact ? "#0E0F14" : textColor}
            extrudeColor={extrudeColor}
            extrudeDepth={12}
            staggerFrames={1}
            chromatic={subFrame < 8}
          />
          {accentType === "dot" && (
            <span
              className="w-7 h-7 rounded-full ml-5 inline-block"
              style={{
                backgroundColor: COLORS.orange,
                boxShadow: `0 0 25px ${COLORS.orange}`,
              }}
            />
          )}
          {accentType === "square" && (
            <span
              className="w-7 h-7 ml-5 inline-block"
              style={{
                backgroundColor: COLORS.orange,
                transform: `rotate(${subFrame * 12}deg)`,
              }}
            />
          )}
          {accentType === "plus" && (
            <span
              className="text-[95px] font-extrabold ml-4 inline-block"
              style={{
                color: COLORS.orange,
                transform: `rotate(${subFrame * 9}deg)`,
              }}
            >
              +
            </span>
          )}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full h-2 bg-black/15 rounded-full overflow-hidden z-20">
        <div
          className="h-full"
          style={{
            width: `${(parseInt(indexStr, 10) / 4) * 100}%`,
            backgroundColor: bg === COLORS.orange ? "#14151B" : COLORS.orange,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const SceneRolesFlashes: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 348;

  if (relFrame < 30) {
    return (
      <RoleCard3D
        subFrame={relFrame}
        indexStr="01"
        title="Web Developer"
        bg={COLORS.paper}
        textColor="#14151B"
        extrudeColor="#B5AFAC"
        accentType="dot"
        tiltDirection={1}
        watermark="FRONTEND & ARCHITECTURE"
      />
    );
  }
  if (relFrame < 60) {
    return (
      <RoleCard3D
        subFrame={relFrame - 30}
        indexStr="02"
        title="Full-Stack Dev"
        bg={COLORS.night}
        textColor="#FFFFFF"
        extrudeColor={COLORS.cobalt}
        accentType="square"
        tiltDirection={-1}
        watermark="SCALABLE SYSTEMS"
      />
    );
  }
  if (relFrame < 90) {
    return (
      <RoleCard3D
        subFrame={relFrame - 60}
        indexStr="03"
        title="Custom Software"
        bg={COLORS.orange}
        textColor="#14151B"
        extrudeColor="#FFFFFF"
        accentType="none"
        tiltDirection={1}
        watermark="TAILORED SOLUTIONS"
      />
    );
  }
  return (
    <RoleCard3D
      subFrame={relFrame - 90}
      indexStr="04"
      title="AI Creative"
      bg={COLORS.cobalt}
      textColor="#FFFFFF"
      extrudeColor="#063963"
      accentType="plus"
      tiltDirection={-1}
      watermark="GENERATIVE INTELLIGENCE"
    />
  );
};

// ==========================================
// SCENE 7: KINETIC GLITCH FLASH NAME (Frames 468 - 504)
// ==========================================
const SceneFlashName: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 468;

  const scale = interpolate(relFrame, [0, 18, 36], [0.5, 1.1, 3.2], {
    easing: Easing.inOut(Easing.cubic),
  });

  // Expanding blue portal circle at the end to transition into Blueprint
  const portalRadius = interpolate(relFrame, [22, 36], [0, 2400], {
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.exp),
  });

  return (
    <AbsoluteFill
      className="flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.paper }}
    >
      {/* Multiple stacked kinetic echo copies */}
      {[-2, -1, 0, 1, 2].map((offset) => (
        <h1
          key={offset}
          className="absolute text-[105px] font-black tracking-tight whitespace-nowrap"
          style={{
            fontFamily: "Inter, 'Helvetica Neue', sans-serif",
            color: offset === 0 ? "#14151B" : "transparent",
            WebkitTextStroke:
              offset === 0 ? "none" : `2px rgba(20, 21, 27, ${0.35 - Math.abs(offset) * 0.1})`,
            transform: `translateY(${offset * 110 * interpolate(relFrame, [0, 25], [1, 0], { extrapolateRight: "clamp" })}px) scale(${scale})`,
          }}
        >
          Victor Cifuentes
        </h1>
      ))}

      {/* Cobalt Blue Iris Portal Wipe */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: `${portalRadius}px`,
          height: `${portalRadius}px`,
          backgroundColor: COLORS.cobalt,
        }}
      />
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 8: LIVING BLUEPRINT MANIFESTO (Frames 504 - 672)
// ==========================================
const BlueprintGrid: React.FC<{ rotOffset?: number }> = ({ rotOffset = 0 }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="pointer-events-none flex items-center justify-center">
      {/* Rotating outer dashed radar ring */}
      <div
        className="absolute w-[1120px] h-[1120px] rounded-full border-2 border-dashed border-white/15"
        style={{ transform: `rotate(${frame * 0.4 + rotOffset}deg)` }}
      />
      {/* Counter-rotating inner technical ring */}
      <div
        className="absolute w-[720px] h-[720px] rounded-full border border-white/25"
        style={{ transform: `rotate(${-frame * 0.7 - rotOffset}deg)` }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#E6915B]" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/60" />
      </div>
      {/* Inner core ring */}
      <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-white/20" />
      {/* Axis lines */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-white/20" />
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-white/20" />
    </AbsoluteFill>
  );
};

const SceneBlueprintManifesto: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 504;
  const { fps } = useVideoConfig();

  const words = ["Coding", "is", "like", "a", "game,"];
  // Active bracket jumps from word 0 -> 1 -> 2 -> 3 -> 4
  const activeIdx = Math.min(4, Math.floor(relFrame / 32));

  // Camera 3D float
  const camRotX = Math.sin(relFrame * 0.05) * 12;
  const camRotY = Math.cos(relFrame * 0.04) * 14;
  const camScale = interpolate(relFrame, [0, 145, 168], [0.85, 1.05, 2.2], {
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill
      className="flex items-center justify-center text-center p-12 overflow-hidden"
      style={{
        backgroundColor: COLORS.cobalt,
        perspective: "1100px",
      }}
    >
      <GenerativeField seed="blueprint" count={25} color="rgba(255,255,255,0.25)" />
      <BlueprintGrid rotOffset={relFrame} />

      <div
        className="relative z-10 max-w-[920px] flex flex-wrap justify-center gap-x-7 gap-y-6"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${camScale}) rotateX(${camRotX}deg) rotateY(${camRotY}deg)`,
        }}
      >
        {words.map((word, idx) => {
          const isTarget = idx === activeIdx;
          const wordSpring = spring({
            frame: Math.max(0, relFrame - idx * 8),
            fps,
            config: { damping: 11, stiffness: 160 },
          });

          const targetPop = isTarget ? 1.22 : 1.0;

          return (
            <div
              key={idx}
              className="relative inline-flex items-center px-3 py-1"
              style={{
                transform: `scale(${wordSpring * targetPop}) translateZ(${
                  isTarget ? 60 : 0
                }px)`,
              }}
            >
              {isTarget && (
                <span
                  className="text-[110px] font-light mr-2"
                  style={{
                    color: COLORS.orange,
                    textShadow: `0 0 25px ${COLORS.orange}`,
                  }}
                >
                  [
                </span>
              )}
              <span
                className="text-[105px] font-extrabold tracking-tight"
                style={{
                  fontFamily: "Inter, 'Helvetica Neue', sans-serif",
                  color: isTarget ? COLORS.orange : "#FFFFFF",
                  textShadow: get3DShadow(
                    isTarget ? 12 : 6,
                    "#063B63",
                    1.5,
                    2,
                    isTarget
                  ),
                }}
              >
                {word}
              </span>
              {isTarget && (
                <span
                  className="text-[110px] font-light ml-2"
                  style={{
                    color: COLORS.orange,
                    textShadow: `0 0 25px ${COLORS.orange}`,
                  }}
                >
                  ]
                </span>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 9: 3D GYROSCOPE ORBITAL TOOLS MENU (Frames 672 - 840)
// ==========================================
const DEV_ICONS = [
  // 1. Code brackets </ >
  <svg key="c1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-11 h-11">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  // 2. Terminal
  <svg key="c2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-11 h-11">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>,
  // 3. Database
  <svg key="c3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-11 h-11">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>,
  // 4. AI Sparkles
  <svg key="c4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-11 h-11">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>,
  // 5. 3D Box
  <svg key="c5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-11 h-11">
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>,
  // 6. Typography Aa
  <span key="c6" className="font-extrabold text-3xl font-mono">Aa</span>,
  // 7. Git Branch
  <svg key="c7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-11 h-11">
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>,
  // 8. Transform
  <svg key="c8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-11 h-11">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </svg>,
];

const SceneRadialTools: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 672;
  const { fps } = useVideoConfig();

  // 3D Orbit progression
  const orbitAngle = interpolate(relFrame, [0, 168], [0, 280]);

  const radius = spring({
    frame: relFrame,
    fps,
    config: { damping: 12, stiffness: 110 },
    from: 40,
    to: 350,
  });

  // Whole scene 3D camera zoom & tilt
  const sceneScale = interpolate(relFrame, [0, 84, 150, 168], [0.8, 1.12, 1.0, 2.6]);
  const ringTiltX = interpolate(relFrame, [0, 168], [55, -35]);
  const ringTiltY = interpolate(relFrame, [0, 168], [-25, 30]);

  return (
    <AbsoluteFill
      className="flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: COLORS.cobalt,
        perspective: "1200px",
      }}
    >
      <GenerativeField seed="radial" count={28} color="rgba(230,145,91,0.35)" />
      <BlueprintGrid rotOffset={relFrame * 2} />

      <div
        className="relative flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${sceneScale})`,
        }}
      >
        {/* Center 3D Sculptural Word: "like" */}
        <div
          style={{
            transform: `rotateX(${-ringTiltX * 0.3}deg) rotateY(${-ringTiltY * 0.3}deg)`,
          }}
        >
          <Kinetic3DText
            text="like"
            relFrame={relFrame}
            fontSize={165}
            textColor="#FFFFFF"
            extrudeColor="#053559"
            extrudeDepth={14}
            staggerFrames={2}
            chromatic={true}
          />
        </div>

        {/* 3D Tilted Saturn Ring of Developer Tools */}
        {DEV_ICONS.map((icon, i) => {
          const theta = ((i / DEV_ICONS.length) * 360 + orbitAngle) * (Math.PI / 180);
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          const y = Math.sin(theta) * 175 + Math.cos(theta * 2) * 25; // Tilted 3D elliptical Saturn orbit

          // Depth scale and brightness based on Z position (front vs back of word)
          const depthScale = interpolate(z, [-350, 350], [0.65, 1.35]);
          const isHighlighted = i % 2 === 0 && z > 100;

          return (
            <div
              key={i}
              className="absolute w-20 h-20 rounded-2xl border-2 flex items-center justify-center shadow-2xl"
              style={{
                backgroundColor: isHighlighted
                  ? COLORS.orange
                  : "rgba(11, 43, 92, 0.85)",
                borderColor: isHighlighted ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                color: isHighlighted ? "#14151B" : "#FFFFFF",
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${depthScale})`,
                boxShadow: isHighlighted
                  ? `0 0 35px ${COLORS.orange}`
                  : "0 15px 35px rgba(0,0,0,0.4)",
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 10: "AND YES, WE LOVE TO BUILD." (Frames 840 - 912)
// ==========================================
const SceneWeLoveToBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 840;
  const { fps } = useVideoConfig();

  const slam = spring({
    frame: relFrame,
    fps,
    config: { damping: 11, stiffness: 180 },
    from: 1.9,
    to: 1,
  });

  const tiltY = interpolate(relFrame, [0, 72], [-20, 15]);

  return (
    <AbsoluteFill
      className="flex items-center justify-center text-center p-16 overflow-hidden"
      style={{
        backgroundColor: COLORS.cobalt,
        perspective: "1100px",
      }}
    >
      <GenerativeField seed="build" count={20} />
      <BlueprintGrid rotOffset={relFrame * 3} />

      <div
        className="flex flex-col items-center z-20"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${slam}) rotateY(${tiltY}deg) rotateX(8deg)`,
        }}
      >
        <Kinetic3DText
          text="and yes, we"
          relFrame={relFrame}
          fontSize={105}
          textColor="#FFFFFF"
          extrudeColor="#063963"
          extrudeDepth={10}
          staggerFrames={1}
        />
        <div className="flex items-center mt-4">
          <Kinetic3DText
            text="love to build"
            relFrame={relFrame - 10}
            fontSize={118}
            textColor={COLORS.orange}
            extrudeColor="#063963"
            extrudeDepth={12}
            staggerFrames={2}
            chromatic={true}
          />
          <span
            className="inline-block w-6 h-6 rounded-full ml-4"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 0 25px #FFFFFF",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 11: 3D CYLINDER OF DISCIPLINES + DYNAMIC CAMERA (Frames 912 - 1272)
// ==========================================
const Scene3DCylinder: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 912;

  const anglePerItem = 360 / DISCIPLINES.length;
  // Accelerated kinetic drum spin
  const cylinderRotation = interpolate(
    relFrame,
    [0, 360],
    [0, 360 * 2.5],
    { easing: Easing.inOut(Easing.sin) }
  );

  // Camera orbits and zooms in/out dynamically around the 3D drum
  const camScale = 1 + 0.14 * Math.sin(relFrame * 0.04);
  const camRotY = interpolate(relFrame, [0, 180, 360], [-16, 12, -10]);
  const camRotZ = Math.sin(relFrame * 0.03) * 3.5;

  const activeIndex =
    (Math.round(cylinderRotation / anglePerItem) % DISCIPLINES.length) + 1;

  return (
    <AbsoluteFill
      className="flex flex-col justify-between p-16 overflow-hidden"
      style={{
        backgroundColor: COLORS.cobalt,
        perspective: "1300px",
      }}
    >
      <GenerativeField seed="cylinder" count={26} />
      <BlueprintGrid rotOffset={relFrame} />

      {/* Top HUD Metadata + Audio Equalizer Bars */}
      <div className="flex justify-between items-center font-mono text-[20px] font-bold tracking-[0.25em] uppercase text-blue-100 z-20">
        <div className="flex items-center gap-4">
          <span>DISCIPLINES // MATRIX</span>
          <div className="flex items-end gap-1 h-6">
            {Array.from({ length: 8 }).map((_, b) => {
              const barH = 25 + 75 * Math.abs(Math.sin(relFrame * 0.25 + b * 0.9));
              return (
                <div
                  key={b}
                  className="w-1.5 bg-[#E6915B] rounded-t"
                  style={{ height: `${barH}%` }}
                />
              );
            })}
          </div>
        </div>
        <span className="px-4 py-1 rounded-full bg-white/15 text-white">
          {String(activeIndex).padStart(2, "0")} / 11
        </span>
      </div>

      {/* Main 3D Stage */}
      <div
        className="relative z-20 flex items-center justify-between my-auto px-4"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${camScale}) rotateY(${camRotY}deg) rotateZ(${camRotZ}deg)`,
        }}
      >
        {/* Left Anchor with 3D Extrusion */}
        <div
          className="w-[360px] flex items-center"
          style={{ transform: "translateZ(60px)" }}
        >
          <span
            className="text-[76px] font-extrabold text-white tracking-tight flex items-center whitespace-nowrap"
            style={{
              fontFamily: "Inter, 'Helvetica Neue', sans-serif",
              textShadow: get3DShadow(8, "#053357"),
            }}
          >
            to build
            <span
              className="w-5 h-5 rounded-full ml-4 inline-block"
              style={{
                backgroundColor: COLORS.orange,
                boxShadow: `0 0 25px ${COLORS.orange}`,
              }}
            />
          </span>
        </div>

        {/* Right 3D Revolving Cylinder */}
        <div
          className="w-[580px] h-[760px] flex items-center justify-center relative"
          style={{
            perspective: "1100px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="relative w-full h-[90px]"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${-cylinderRotation}deg)`,
            }}
          >
            {DISCIPLINES.map((item, idx) => {
              const itemAngle = idx * anglePerItem;
              const currentAngle =
                (itemAngle - (cylinderRotation % 360) + 360) % 360;
              const diffFromFront = Math.abs(
                currentAngle > 180 ? 360 - currentAngle : currentAngle
              );

              const isFront = diffFromFront < 18;
              const opacity = interpolate(diffFromFront, [0, 95], [1, 0.1], {
                extrapolateRight: "clamp",
              });
              const blur = interpolate(diffFromFront, [0, 95], [0, 5], {
                extrapolateRight: "clamp",
              });
              const scaleItem = interpolate(diffFromFront, [0, 40], [1.12, 0.88], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={idx}
                  className="absolute inset-0 flex items-center justify-start px-4 select-none"
                  style={{
                    transform: `rotateX(${itemAngle}deg) translateZ(340px) scale(${scaleItem})`,
                    opacity,
                    filter: `blur(${blur}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span
                    className={`text-[52px] font-extrabold tracking-tight whitespace-nowrap ${
                      isFront ? "text-[#E6915B]" : "text-white"
                    }`}
                    style={{
                      fontFamily: "Inter, 'Helvetica Neue', sans-serif",
                      textShadow: isFront
                        ? get3DShadow(6, "#042A47", 1.5, 2, true)
                        : "none",
                    }}
                  >
                    {isFront ? `▸ ${item}` : item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="flex justify-between items-center font-mono text-[20px] tracking-[0.25em] uppercase text-blue-200/90 z-20">
        <span>VICTOR CIFUENTES // DEV_CORE</span>
        <span>60 FPS · SYNC</span>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 12: SACRED GEOMETRY GEARS & COMPASS (Frames 1272 - 1320)
// ==========================================
const SceneGeometricCircles: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 1272;
  const { fps } = useVideoConfig();

  const spread = spring({
    frame: relFrame,
    fps,
    config: { damping: 11, stiffness: 140 },
    from: 0,
    to: 210,
  });

  const sceneRot = interpolate(relFrame, [0, 48], [-25, 15]);
  const zoom = interpolate(relFrame, [0, 38, 48], [0.8, 1.05, 2.4]);

  return (
    <AbsoluteFill
      className="flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: COLORS.cobalt,
        perspective: "1000px",
      }}
    >
      <GenerativeField seed="geo" count={20} />

      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{
          transform: `scale(${zoom}) rotateZ(${sceneRot}deg)`,
        }}
      >
        {/* 4 Animated Intersecting Drafting Rings */}
        {[
          { dx: 0, dy: -spread },
          { dx: 0, dy: spread },
          { dx: -spread, dy: 0 },
          { dx: spread, dy: 0 },
        ].map((pos, idx) => (
          <div
            key={idx}
            className="absolute w-[520px] h-[520px] rounded-full border-2 border-dashed border-white/50 flex items-center justify-center"
            style={{
              transform: `translate(${pos.dx}px, ${pos.dy}px) rotate(${
                relFrame * (idx % 2 === 0 ? 3 : -3)
              }deg)`,
            }}
          >
            <div className="w-[460px] h-[460px] rounded-full border border-white/25" />
          </div>
        ))}

        {/* Pulsing Orange Nodes at Intersections */}
        {[
          { x: -spread, y: 0 },
          { x: spread, y: 0 },
          { x: 0, y: -spread },
          { x: 0, y: spread },
          { x: -spread * 0.7, y: -spread * 0.7 },
          { x: spread * 0.7, y: -spread * 0.7 },
          { x: -spread * 0.7, y: spread * 0.7 },
          { x: spread * 0.7, y: spread * 0.7 },
        ].map((pt, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 rounded-full border-2 border-[#E6915B] flex items-center justify-center"
            style={{
              transform: `translate(${pt.x}px, ${pt.y}px) scale(${
                1 + 0.3 * Math.sin(relFrame * 0.4 + i)
              })`,
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        ))}

        {/* Central 3D Name */}
        <div style={{ transform: `rotateZ(${-sceneRot}deg)` }}>
          <Kinetic3DText
            text="Victor Cifuentes"
            relFrame={relFrame}
            fontSize={104}
            textColor="#FFFFFF"
            extrudeColor="#042D4D"
            extrudeDepth={12}
            staggerFrames={1}
            chromatic={true}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 13: VOLUMETRIC SWEEPING SPOTLIGHT & 35MM FILM (Frames 1320 - 1356)
// ==========================================
const SceneSpotlight: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 1320;

  // Sweeping spotlight angle
  const beamAngle = interpolate(relFrame, [0, 18, 36], [-22, 12, -5]);
  const filmScrollY = (relFrame * 28) % 140;

  return (
    <AbsoluteFill
      className="flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.night }}
    >
      <GenerativeField seed="spot" count={30} color="rgba(255,230,200,0.4)" />

      {/* Sweeping Volumetric Cone of Light */}
      <div
        className="absolute left-[-250px] top-1/2 -translate-y-1/2 w-[1400px] h-[700px] pointer-events-none origin-left"
        style={{
          background:
            "radial-gradient(ellipse at 5% 50%, rgba(255, 225, 185, 0.7) 0%, rgba(230, 145, 91, 0.28) 45%, transparent 75%)",
          filter: "blur(30px)",
          transform: `rotate(${beamAngle}deg)`,
        }}
      />

      {/* Center Illuminated 3D Name */}
      <div
        className="relative z-20"
        style={{
          transform: `scale(${interpolate(relFrame, [0, 36], [0.9, 1.15])}) rotateY(${interpolate(
            relFrame,
            [0, 36],
            [-18, 18]
          )}deg)`,
        }}
      >
        <Kinetic3DText
          text="Victor Cifuentes"
          relFrame={relFrame}
          fontSize={102}
          textColor="#FFFFFF"
          extrudeColor="#3D291A"
          extrudeDepth={12}
          staggerFrames={1}
        />
      </div>

      {/* High-Speed Scrolling 35mm Cinema Sprockets on Right Edge */}
      <div
        className="absolute right-14 -top-40 -bottom-40 flex flex-col justify-between py-12"
        style={{ transform: `translateY(${-filmScrollY}px)` }}
      >
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="flex gap-6 my-3">
            <div className="w-8 h-8 rounded-full bg-[#E6E0DD] shadow-lg" />
            <div className="w-8 h-8 rounded-full bg-[#E6E0DD] shadow-lg" />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 14: INTERACTIVE CAD BOUNDING BOX + CURSOR DRAG (Frames 1356 - 1392)
// ==========================================
const SceneNameGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 1356;
  const { fps } = useVideoConfig();

  // Box expands dynamically as if dragged by a designer cursor
  const boxScaleX = spring({
    frame: relFrame,
    fps,
    config: { damping: 10, stiffness: 160 },
    from: 0.35,
    to: 1,
  });
  const boxScaleY = spring({
    frame: Math.max(0, relFrame - 4),
    fps,
    config: { damping: 10, stiffness: 160 },
    from: 0.2,
    to: 1,
  });

  const liveW = Math.round(boxScaleX * 920);
  const liveH = Math.round(boxScaleY * 260);

  return (
    <AbsoluteFill
      className="flex flex-col items-center justify-between py-28 overflow-hidden"
      style={{ backgroundColor: COLORS.orange }}
    >
      <GenerativeField seed="namegrid" count={18} color="rgba(20,21,27,0.2)" />

      <div className="font-mono text-[20px] font-bold tracking-[0.35em] uppercase text-[#14151B]">
        NAME_GRID // {liveW} × {liveH} PX
      </div>

      {/* Interactive Bounding Box with Corner Anchor Handles */}
      <div
        className="relative border-2 border-[#14151B] px-16 py-14 bg-white/10 backdrop-blur-sm"
        style={{
          transform: `scale(${boxScaleX}, ${boxScaleY}) rotateZ(${interpolate(
            relFrame,
            [0, 36],
            [-6, 2]
          )}deg)`,
        }}
      >
        <h1
          className="text-[100px] font-extrabold tracking-tight text-[#14151B] whitespace-nowrap"
          style={{
            fontFamily: "Inter, 'Helvetica Neue', sans-serif",
            textShadow: get3DShadow(8, "rgba(255,255,255,0.45)"),
          }}
        >
          Victor Cifuentes
        </h1>

        {/* 4 Corner handles */}
        {[
          "-top-3.5 -left-3.5",
          "-top-3.5 -right-3.5",
          "-bottom-3.5 -left-3.5",
          "-bottom-3.5 -right-3.5",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-7 h-7 rounded-full border-2 border-[#14151B] bg-[#E6E0DD] flex items-center justify-center`}
          >
            <div className="w-2 h-2 rounded-full bg-[#14151B]" />
          </div>
        ))}

        {/* Animated Vector Cursor Dragging Bottom-Right Corner */}
        <div
          className="absolute -bottom-14 -right-14 flex items-center gap-2"
          style={{
            transform: `scale(${1 + 0.15 * Math.sin(relFrame * 0.5)})`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="#14151B"
            className="w-10 h-10 drop-shadow-lg"
          >
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
          <span className="px-2 py-0.5 bg-[#14151B] text-white font-mono text-xs rounded">
            RESIZE
          </span>
        </div>
      </div>

      {/* Animated Pagination Dots */}
      <div className="flex gap-4 items-center">
        {[0, 1, 2, 3, 4].map((d) => {
          const isActive = Math.floor(relFrame / 7) % 5 === d;
          return (
            <div
              key={d}
              className="w-4 h-4 rounded-full border-2 border-[#14151B]"
              style={{
                backgroundColor: isActive ? "#14151B" : "transparent",
                transform: `scale(${isActive ? 1.35 : 1})`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 15: 3D HOLOGRAPHIC FLIPPING BUSINESS CARD (Frames 1392 - 1428)
// ==========================================
const SceneBusinessCard: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 1392;
  const { fps } = useVideoConfig();

  // Full 3D flip entrance
  const flipSpr = spring({
    frame: relFrame,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const rotY = interpolate(flipSpr, [0, 1], [-140, 12]);
  const rotX = interpolate(flipSpr, [0, 1], [65, 14]);
  const rotZ = interpolate(relFrame, [0, 36], [-12, 4]);
  const cardScale = interpolate(flipSpr, [0, 1], [0.4, 1.05]);

  // Holographic light sheen sweeping across card
  const sheenX = interpolate(relFrame, [0, 36], [-600, 1200]);

  return (
    <AbsoluteFill
      className="flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #E6A57E 0%, #C86D42 100%)",
        perspective: "1200px",
      }}
    >
      <GenerativeField seed="card3d" count={20} color="rgba(255,255,255,0.3)" />

      {/* 3D Floating Card */}
      <div
        className="relative w-[900px] h-[540px] rounded-[38px] bg-[#E6E0DD] p-16 flex flex-col justify-between overflow-hidden border-2 border-white/60"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${cardScale}) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
          boxShadow: "0 55px 100px rgba(0,0,0,0.42)",
        }}
      >
        {/* Sweeping Metallic Glare */}
        <div
          className="absolute -top-40 -bottom-40 w-[260px] pointer-events-none rotate-12"
          style={{
            left: `${sheenX}px`,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
          }}
        />

        <div className="flex justify-between items-center font-mono text-[19px] font-bold tracking-[0.25em] text-zinc-700 uppercase z-10">
          <span>WEB DEVELOPER & AI</span>
          <span>2026 // EDITION</span>
        </div>

        <div className="text-center z-10">
          <h1
            className="text-[94px] font-extrabold text-[#14151B] tracking-tight whitespace-nowrap"
            style={{
              fontFamily: "Inter, 'Helvetica Neue', sans-serif",
              textShadow: get3DShadow(6, "#C5BFBC"),
            }}
          >
            Victor Cifuentes
          </h1>
        </div>

        <div className="flex justify-between items-center z-10">
          <div className="flex gap-3">
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: COLORS.orange }}
            />
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: COLORS.cobalt }}
            />
          </div>
          <span className="font-mono text-[19px] font-bold tracking-[0.25em] text-zinc-700 uppercase">
            SOFTWARE · APPS · AI
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 16: KINETIC SLIDING COLOR SWATCH BLADES (Frames 1428 - 1476)
// ==========================================
const SceneColorPalette: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 1428;
  const { fps } = useVideoConfig();

  const swatches = [
    { name: "COBALT", hex: "#0B63A4", bg: COLORS.cobalt, textColor: "text-white" },
    { name: "NAVY", hex: "#0B2B5C", bg: COLORS.navy, textColor: "text-white" },
    {
      name: "NIGHT",
      hex: "#0E0F14",
      bg: COLORS.night,
      textColor: "text-white",
      showName: true,
    },
    { name: "PAPER", hex: "#E6E0DD", bg: COLORS.paper, textColor: "text-zinc-800" },
    { name: "INK", hex: "#14151B", bg: COLORS.ink, textColor: "text-white" },
  ];

  return (
    <AbsoluteFill className="flex flex-col overflow-hidden bg-[#0E0F14]">
      {swatches.map((swatch, i) => {
        const slideSpr = spring({
          frame: Math.max(0, relFrame - i * 3),
          fps,
          config: { damping: 14, stiffness: 180 },
        });
        const dir = i % 2 === 0 ? -1 : 1;
        const translateX = interpolate(slideSpr, [0, 1], [1080 * dir, 0]);

        return (
          <div
            key={i}
            className="flex-1 flex justify-between items-center px-16 relative overflow-hidden"
            style={{
              backgroundColor: swatch.bg,
              transform: `translateX(${translateX}px)`,
            }}
          >
            <span
              className={`font-mono text-[20px] font-bold tracking-[0.3em] uppercase ${swatch.textColor}`}
            >
              0{i + 1} // {swatch.name}
            </span>

            {swatch.showName && (
              <div className="absolute left-1/2 -translate-x-1/2">
                <Kinetic3DText
                  text="Victor Cifuentes"
                  relFrame={relFrame}
                  fontSize={70}
                  textColor="#3B82F6"
                  extrudeColor="#0B2B5C"
                  extrudeDepth={7}
                  staggerFrames={1}
                />
              </div>
            )}

            <div
              className={`flex flex-col items-end font-mono text-[15px] font-bold tracking-widest ${swatch.textColor}`}
            >
              <span>HEX {swatch.hex}</span>
              <span className="opacity-70 text-[12px] mt-1">
                RGB · CMYK · PANTONE
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 17: BRAND STATEMENT + WAVE PILL MATRIX (Frames 1476 - 1524)
// ==========================================
const SceneBrandStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 1476;

  const decodedQuote = useCipherText(
    "GREAT IDEAS DESERVE SCALABLE CODE.",
    interpolate(relFrame, [0, 22], [0, 1], { extrapolateRight: "clamp" }),
    "quote"
  );

  return (
    <AbsoluteFill
      className="flex flex-col justify-between overflow-hidden"
      style={{
        backgroundColor: COLORS.cobalt,
        perspective: "1000px",
      }}
    >
      <GenerativeField seed="statement" count={22} />

      <div
        className="p-20 flex-1 flex flex-col justify-center z-20"
        style={{
          transform: `scale(${interpolate(relFrame, [0, 48], [0.92, 1.06])}) rotateX(6deg)`,
        }}
      >
        <div className="font-mono text-[22px] font-bold tracking-[0.3em] uppercase text-[#E6915B] mb-12">
          {decodedQuote}
        </div>

        <div className="mb-12 flex justify-start">
          <Kinetic3DText
            text="Victor Cifuentes"
            relFrame={relFrame}
            fontSize={94}
            textColor="#FFFFFF"
            extrudeColor="#053357"
            extrudeDepth={10}
            staggerFrames={1}
            chromatic={true}
          />
        </div>

        <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-blue-100">
          WEB DEVELOPER & CUSTOM SOFTWARE — 2026
        </div>
      </div>

      {/* Animated Equalizer Pill Matrix Footer */}
      <div className="bg-[#E6E0DD] py-10 px-12 flex flex-col gap-5 z-20">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row} className="flex justify-between">
            {Array.from({ length: 14 }).map((_, col) => {
              const wave = Math.sin(relFrame * 0.35 + col * 0.5 + row * 0.8);
              const isOrange = wave > 0.65;
              return (
                <div
                  key={col}
                  className="w-12 h-6 rounded-t-xl"
                  style={{
                    backgroundColor: isOrange ? COLORS.orange : COLORS.cobalt,
                    opacity: 0.35 + 0.65 * Math.abs(wave),
                    transform: `scaleY(${0.6 + 0.6 * Math.abs(wave)})`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 18: MONUMENTAL 3D TYPOGRAPHY OUTRO (Frames 1524 - 1793)
// ==========================================
const SceneFinalTypography: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 1524;
  const { fps } = useVideoConfig();

  // Dramatic zoom-in from macro to perfect lockup
  const camZoom = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 1.2 },
    from: 2.8,
    to: 1,
  });

  // Subtle 3D breathing float during hold
  const floatRotY = Math.sin(relFrame * 0.04) * 6;
  const floatRotX = Math.cos(relFrame * 0.03) * 4;

  // Grid lines gently fade out near the end leaving pristine lockup
  const gridOpacity = interpolate(relFrame, [170, 245], [1, 0], {
    extrapolateRight: "clamp",
  });

  const decodedRole = useCipherText(
    "WEB DEVELOPER & CUSTOM SOFTWARE",
    interpolate(relFrame, [20, 85], [0, 1], { extrapolateRight: "clamp" }),
    "outro-role"
  );

  return (
    <AbsoluteFill
      className="flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: COLORS.night,
        perspective: "1200px",
      }}
    >
      <div style={{ opacity: gridOpacity }}>
        <GenerativeField seed="outro" count={24} color="rgba(230,145,91,0.3)" />
        <TechnicalGrid
          theme="dark"
          relFrame={relFrame}
          leftX={120}
          rightX={960}
          topY={820}
          bottomY={1120}
          showCoords={true}
          topLabel="TYPOGRAPHY"
        />
      </div>

      {/* Hero 3D Name Lockup */}
      <div
        className="relative z-20 flex flex-col items-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `scale(${camZoom}) rotateY(${floatRotY}deg) rotateX(${floatRotX}deg)`,
        }}
      >
        <Kinetic3DText
          text="Victor Cifuentes"
          relFrame={relFrame}
          fontSize={108}
          textColor="#FFFFFF"
          extrudeColor="#272A36"
          extrudeDepth={12}
          staggerFrames={2}
          chromatic={relFrame < 35}
        />

        <p className="font-mono text-[20px] font-bold tracking-[0.42em] uppercase text-[#E6915B] mt-12 whitespace-nowrap">
          {decodedRole}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// MASTER TIMELINE COMPOSITION (0 to 1793 frames = 29.88s @ 60fps)
// ==========================================
export const ShowreelVictorCifuentes: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-[#0E0F14] text-white">
      {/* Master Soundtrack with foley clicks and electronic beat */}
      <Audio src={staticFile("showreel_audio.wav")} />

      {/* Sequential Scene Switching at Exact Keyframe Cuts */}
      {frame < 48 && <SceneIntroGrid />}
      {frame >= 48 && frame < 132 && <SceneHello />}
      {frame >= 132 && frame < 180 && <SceneIm />}
      {frame >= 180 && frame < 288 && <SceneNameSilhouette />}
      {frame >= 288 && frame < 348 && <SceneImYour />}
      {frame >= 348 && frame < 468 && <SceneRolesFlashes />}
      {frame >= 468 && frame < 504 && <SceneFlashName />}
      {frame >= 504 && frame < 672 && <SceneBlueprintManifesto />}
      {frame >= 672 && frame < 840 && <SceneRadialTools />}
      {frame >= 840 && frame < 912 && <SceneWeLoveToBuild />}
      {frame >= 912 && frame < 1272 && <Scene3DCylinder />}
      {frame >= 1272 && frame < 1320 && <SceneGeometricCircles />}
      {frame >= 1320 && frame < 1356 && <SceneSpotlight />}
      {frame >= 1356 && frame < 1392 && <SceneNameGrid />}
      {frame >= 1392 && frame < 1428 && <SceneBusinessCard />}
      {frame >= 1428 && frame < 1476 && <SceneColorPalette />}
      {frame >= 1476 && frame < 1524 && <SceneBrandStatement />}
      {frame >= 1524 && <SceneFinalTypography />}
    </AbsoluteFill>
  );
};
