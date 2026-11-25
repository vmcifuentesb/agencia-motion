import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface CompositionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  accentColor?: string;
}

export const MainComposition: React.FC<CompositionProps> = ({
  title = "Remotion Motion Studio",
  subtitle = "Programmatic Video with React & TypeScript",
  badge = "Motion Director",
  accentColor = "#6366f1",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const isVertical = height > width;

  // Spring entrance for main card
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const cardOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Slide up title
  const titleY = interpolate(frame, [10, 35], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Subtitle fade
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Ambient floating background orbs
  const orb1X = Math.sin(frame * 0.02) * 40;
  const orb1Y = Math.cos(frame * 0.02) * 30;
  const orb2X = Math.cos(frame * 0.015) * 50;
  const orb2Y = Math.sin(frame * 0.015) * 40;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090d16",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          width: isVertical ? 600 : 900,
          height: isVertical ? 600 : 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
          transform: `translate(${orb1X}px, ${orb1Y}px)`,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: isVertical ? 500 : 700,
          height: isVertical ? 500 : 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, #38bdf822 0%, transparent 70%)",
          transform: `translate(${-orb2X}px, ${-orb2Y}px)`,
          filter: "blur(50px)",
        }}
      />

      {/* Main Content Box */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: isVertical ? "85%" : "70%",
          padding: isVertical ? "48px 36px" : "64px 60px",
          borderRadius: "32px",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
          zIndex: 10,
        }}
      >
        {/* Badge */}
        {badge && (
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: `${accentColor}25`,
              border: `1px solid ${accentColor}60`,
              color: "#e0e7ff",
              fontSize: isVertical ? 22 : 18,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: isVertical ? 32 : 24,
            }}
          >
            {badge}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            fontSize: isVertical ? 64 : 72,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            opacity: subtitleOpacity,
            fontSize: isVertical ? 32 : 26,
            color: "#94a3b8",
            marginTop: isVertical ? 28 : 20,
            marginBottom: 0,
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
