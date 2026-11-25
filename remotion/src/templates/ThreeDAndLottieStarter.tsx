import React, { useEffect, useState } from "react";
import { ThreeCanvas } from "@remotion/three";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ThreeDShowcaseProps = {
  accentColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
};

/**
 * Escena 3D determinista gobernada 100% por useCurrentFrame() (sin useFrame de R3F).
 */
const KineticCrystalMesh: React.FC<{
  accentColor: string;
  secondaryColor: string;
}> = ({ accentColor, secondaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 110 },
  });

  const scale = interpolate(entrance, [0, 1], [0.2, 1.35]);
  const rotY = frame * 0.025;
  const rotX = Math.sin(frame * 0.03) * 0.35;
  const floatY = Math.sin(frame * 0.05) * 0.18;

  return (
    <group position={[0, floatY, 0]} scale={[scale, scale, scale]}>
      <mesh rotation={[rotX, rotY, 0]}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.45}
          roughness={0.22}
          emissive={secondaryColor}
          emissiveIntensity={0.22}
        />
      </mesh>
      <mesh rotation={[-rotX * 0.7, -rotY * 1.4, 0.4]}>
        <torusGeometry args={[2.25, 0.045, 24, 96]} />
        <meshStandardMaterial
          color={secondaryColor}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
};

/**
 * Plantilla base de escena 3D WebGL para Remotion (@remotion/three + R3F v9).
 */
export const ThreeDShowcaseStarter: React.FC<ThreeDShowcaseProps> = ({
  accentColor = "#6366F1",
  secondaryColor = "#22D3EE",
  backgroundColor = "#0A0A0C",
}) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[6, 8, 5]} intensity={1.8} />
        <pointLight
          position={[-5, -4, 4]}
          intensity={1.2}
          color={secondaryColor}
        />
        <KineticCrystalMesh
          accentColor={accentColor}
          secondaryColor={secondaryColor}
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

export type LottieLayerProps = {
  /** Ruta relativa dentro de remotion/public/ (ej. "lottie/badge.json") */
  assetPath: string;
  playbackRate?: number;
  style?: React.CSSProperties;
};

/**
 * Capa Lottie determinista sincronizada con el timeline de Remotion.
 */
export const LottieLayer: React.FC<LottieLayerProps> = ({
  assetPath,
  playbackRate = 1,
  style,
}) => {
  const [handle] = useState(() =>
    delayRender(`Loading Lottie asset: ${assetPath}`)
  );
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(staticFile(assetPath))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} al cargar ${assetPath}`);
        }
        return res.json() as Promise<LottieAnimationData>;
      })
      .then((json) => {
        if (!cancelled) {
          setAnimationData(json);
          continueRender(handle);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          cancelRender(err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [assetPath, handle]);

  if (!animationData) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      playbackRate={playbackRate}
      style={style}
    />
  );
};
