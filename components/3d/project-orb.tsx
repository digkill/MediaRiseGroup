"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function OrbCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.elapsedTime * 0.22;
    ref.current.rotation.y = clock.elapsedTime * 0.35;
  });

  return (
    <Float speed={1.4} floatIntensity={0.35} rotationIntensity={0.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshStandardMaterial color="#142c18" emissive="#22c55e" emissiveIntensity={0.45} metalness={0.45} roughness={0.28} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.72, 48, 48]} />
        <meshStandardMaterial color="#071007" emissive="#ff0033" emissiveIntensity={0.45} transparent opacity={0.72} />
      </mesh>
    </Float>
  );
}

export function ProjectOrb() {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-lg border border-white/10 bg-black/40 md:h-[520px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.75]}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.65} />
        <pointLight position={[2, 2, 3]} intensity={8} color="#22c55e" />
        <pointLight position={[-2, -1, 3]} intensity={5} color="#ff0033" />
        <OrbCore />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
