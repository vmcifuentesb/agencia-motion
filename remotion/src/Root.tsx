import React from "react";
import { Composition } from "remotion";
import { MainComposition } from "./Composition";
import { ShowreelVertical } from "./ShowreelVertical";
import { ShowreelVerticalExtended } from "./ShowreelVerticalExtended";
import { ShowreelImanStyle } from "./ShowreelImanStyle";
import { ShowreelColorfulOpenSource } from "./ShowreelColorfulOpenSource";
import { ShowreelVictorCifuentes } from "./ShowreelVictorCifuentes";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 🚀 Victor Cifuentes - Swiss Motion Design Showreel (Reel 30s 9:16 a 60fps) */}
      <Composition
        id="ShowreelVictorCifuentes"
        component={ShowreelVictorCifuentes}
        durationInFrames={1793} // 29.88s a 60fps
        fps={60}
        width={1080}
        height={1920}
      />
      {/* 🌈 Showreel 15s Colorido Sin Bordes (9:16) - Open Source Costo Cero */}
      <Composition
        id="ShowreelColorful15s"
        component={ShowreelColorfulOpenSource}
        durationInFrames={900} // 15s a 60fps
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 🚀 Nuevo Video Estilo Minimalista High-Ticket (Anmol_type / Iman Gadzhi - 45s 9:16) */}
      <Composition
        id="CoursePromoImanStyle"
        component={ShowreelImanStyle}
        durationInFrames={1350} // ~45.0s a 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🚀 Video Comercial Narrado con Locución, Ilustraciones y Pacing Natural (45s - 9:16) */}
      <Composition
        id="CoursePromoVertical"
        component={ShowreelVerticalExtended}
        durationInFrames={1350} // ~45.0s a 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🚀 Showreel 15s 120BPM Vertical (9:16) - Code Motion Showreel */}
      <Composition
        id="ShowreelCodeMotion"
        component={ShowreelVertical}
        durationInFrames={900} // 15s a 60fps
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 📱 Formato Vertical (Reels / TikTok / Shorts — 9:16) */}
      <Composition
        id="VerticalVideo"
        component={MainComposition}
        durationInFrames={150} // 5s a 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "Remotion Motion",
          subtitle: "Video programático limpio y determinista",
          badge: "Vertical 9:16",
          accentColor: "#6366f1",
        }}
      />

      {/* 🎬 Formato Horizontal (YouTube / Web / Spot — 16:9) */}
      <Composition
        id="HorizontalVideo"
        component={MainComposition}
        durationInFrames={150} // 5s a 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Remotion Motion",
          subtitle: "Video programático limpio y determinista",
          badge: "Horizontal 16:9",
          accentColor: "#3b82f6",
        }}
      />
    </>
  );
};
