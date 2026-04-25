"use client";

import { Float, Line, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

function Phone({
  position,
  rotation,
  accent = "#ff0033",
  dark,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  accent?: string;
  dark: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = rotation[1] + Math.sin(clock.elapsedTime * 0.6 + position[0]) * 0.08;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1.05, 2.05, 0.08]} />
        <meshStandardMaterial color={dark ? "#111111" : "#1f1f23"} roughness={0.3} metalness={0.65} />
      </mesh>
      <mesh position={[0, 0, 0.047]}>
        <boxGeometry args={[0.88, 1.78, 0.012]} />
        <meshStandardMaterial color={dark ? "#050505" : "#f8fafc"} emissive={dark ? "#180006" : "#fff1f3"} emissiveIntensity={dark ? 0.4 : 0.2} />
      </mesh>
      <mesh position={[0, 0.43, 0.058]}>
        <boxGeometry args={[0.58, 0.1, 0.018]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0, 0.15, 0.058]}>
        <boxGeometry args={[0.68, 0.08, 0.018]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[0, -0.22, 0.058]}>
        <boxGeometry args={[0.44, 0.44, 0.018]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function NeuralNetwork({ dark }: { dark: boolean }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const radius = 1.35 + (index % 4) * 0.28;
        return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(index * 1.7) * 0.6, Math.sin(angle) * radius);
      }),
    [],
  );

  return (
    <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.35}>
      <group position={[1.35, 0.1, 0]}>
        {nodes.map((node, index) => (
          <mesh key={index} position={node}>
            <sphereGeometry args={[0.035, 18, 18]} />
            <meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={dark ? 1.8 : 0.9} />
          </mesh>
        ))}
        {nodes.slice(0, 18).map((node, index) => (
          <Line
            key={index}
            points={[node, nodes[(index * 5 + 7) % nodes.length]]}
            color="#ff0033"
            transparent
            opacity={dark ? 0.22 : 0.32}
            lineWidth={1}
          />
        ))}
      </group>
    </Float>
  );
}

function RobotArm({ dark }: { dark: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.7) * 0.12 - 0.2;
  });

  return (
    <group position={[1.75, -1.05, -0.25]} rotation={[0.3, -0.7, -0.28]}>
      <mesh>
        <cylinderGeometry args={[0.24, 0.32, 0.28, 32]} />
        <meshStandardMaterial color={dark ? "#202020" : "#d4d4d8"} metalness={0.9} roughness={0.2} />
      </mesh>
      <group ref={ref} position={[0, 0.52, 0]}>
        <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0.34]}>
          <boxGeometry args={[0.18, 1.05, 0.18]} />
          <meshStandardMaterial color={dark ? "#303030" : "#b9bbc2"} metalness={0.85} roughness={0.18} />
        </mesh>
        <mesh position={[0.24, 0.92, 0]} rotation={[0, 0, -0.54]}>
          <boxGeometry args={[0.16, 0.88, 0.16]} />
          <meshStandardMaterial color={dark ? "#191919" : "#e4e4e7"} metalness={0.88} roughness={0.22} />
        </mesh>
        <mesh position={[0.48, 1.22, 0]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={1.2} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ dark }: { dark: boolean }) {
  return (
    <>
      <color attach="background" args={[dark ? "#050505" : "#f8f8f9"]} />
      <fog attach="fog" args={[dark ? "#050505" : "#f8f8f9", 4.2, 8.5]} />
      <ambientLight intensity={dark ? 0.65 : 1.25} />
      <pointLight position={[2.5, 2.5, 2]} intensity={dark ? 9 : 5.5} color="#ff0033" />
      <pointLight position={[-3, -1, 2.2]} intensity={dark ? 4 : 6} color="#ffffff" />
      {dark ? <Stars radius={8} depth={5} count={900} factor={3} saturation={0} fade speed={0.4} /> : null}
      <NeuralNetwork dark={dark} />
      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.42}>
        <Phone position={[0.55, 0.05, 0.2]} rotation={[0.18, 0.58, -0.12]} dark={dark} />
      </Float>
      <Float speed={1.6} rotationIntensity={0.22} floatIntensity={0.35}>
        <Phone position={[2.05, 0.15, -0.35]} rotation={[-0.12, -0.55, 0.1]} accent="#e50914" dark={dark} />
      </Float>
      <group position={[0.8, 0, 0]}>
        <RobotArm dark={dark} />
      </group>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.75} />
    </>
  );
}

export function HeroScene() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0.35, 5.1], fov: 46 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <Scene dark={dark} />
      </Canvas>
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark
            ? "bg-[linear-gradient(90deg,rgba(10,10,10,.96)_0%,rgba(10,10,10,.88)_34%,rgba(10,10,10,.36)_62%,rgba(10,10,10,.92)_100%),radial-gradient(circle_at_62%_45%,transparent_0,rgba(10,10,10,.08)_34%,rgba(10,10,10,.88)_86%)]"
            : "bg-[linear-gradient(90deg,rgba(250,250,250,.96)_0%,rgba(250,250,250,.9)_34%,rgba(250,250,250,.38)_62%,rgba(250,250,250,.9)_100%),radial-gradient(circle_at_62%_45%,transparent_0,rgba(250,250,250,.08)_34%,rgba(250,250,250,.88)_86%)]",
        )}
      />
    </div>
  );
}
