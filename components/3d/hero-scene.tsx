"use client";

import type { Engine as BabylonEngine } from "@babylonjs/core/Engines/engine";
import type { Color3 as Color3Type } from "@babylonjs/core/Maths/math.color";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Nodes are spread over a Fibonacci sphere so the field stays evenly dense. */
const NODE_COUNT = 460;
const SHELL_RADIUS = 2.5;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

type NodeSeed = {
  x: number;
  y: number;
  z: number;
  /** Phase offset so the pulse travels instead of blinking in unison. */
  phase: number;
  scale: number;
  accent: boolean;
};

function buildNodeSeeds(): NodeSeed[] {
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    return {
      x: Math.cos(theta) * ring,
      y,
      z: Math.sin(theta) * ring,
      phase: Math.acos(y) * 3.1,
      scale: 0.012 + (i % 7) * 0.0022,
      // Interleaved, not sliced — the Fibonacci order runs pole to pole, so a
      // slice would band the colours into stripes.
      accent: i % 5 < 2,
    };
  });
}

export function HeroScene() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // next-themes resolves on mount; skip the first undefined pass so the
    // engine is built once with the right palette.
    if (!resolvedTheme) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dark = resolvedTheme === "dark";
    let engine: BabylonEngine | null = null;
    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const [
        { Engine },
        { Scene },
        { ArcRotateCamera },
        { HemisphericLight },
        { PointLight },
        { Vector3 },
        { Color3, Color4 },
        { CreateIcoSphere },
        { CreateTorus },
        { CreatePolyhedron },
        { StandardMaterial },
        { GlowLayer },
        { TransformNode },
        { SolidParticleSystem },
      ] = await Promise.all([
        import("@babylonjs/core/Engines/engine"),
        import("@babylonjs/core/scene"),
        import("@babylonjs/core/Cameras/arcRotateCamera"),
        import("@babylonjs/core/Lights/hemisphericLight"),
        import("@babylonjs/core/Lights/pointLight"),
        import("@babylonjs/core/Maths/math.vector"),
        import("@babylonjs/core/Maths/math.color"),
        import("@babylonjs/core/Meshes/Builders/icoSphereBuilder"),
        import("@babylonjs/core/Meshes/Builders/torusBuilder"),
        import("@babylonjs/core/Meshes/Builders/polyhedronBuilder"),
        import("@babylonjs/core/Materials/standardMaterial"),
        import("@babylonjs/core/Layers/glowLayer"),
        import("@babylonjs/core/Meshes/transformNode"),
        import("@babylonjs/core/Particles/solidParticleSystem"),
      ]);

      if (cancelled) return;

      engine = new Engine(canvas, true, { alpha: true, stencil: false, preserveDrawingBuffer: false }, true);
      const scene = new Scene(engine);
      // Transparent so the page gradient stays visible behind the scene.
      scene.clearColor = new Color4(0, 0, 0, 0);

      // The canvas itself is placed on the right half of the hero, so the scene
      // stays centred in its own viewport instead of being nudged in 3D space.
      const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 12, Vector3.Zero(), scene);
      camera.fov = 0.7;
      camera.minZ = 0.1;

      const root = new TransformNode("root", scene);

      const accent = dark ? new Color3(1, 0, 0.2) : new Color3(0.9, 0, 0.16);
      // Nodes need contrast against the page; the lattice would look like a
      // harsh scribble at the same weight, so it gets a softer neutral.
      const nodeNeutral = dark ? new Color3(1, 1, 1) : new Color3(0.38, 0.38, 0.45);
      const latticeNeutral = dark ? new Color3(1, 1, 1) : new Color3(0.55, 0.55, 0.62);
      const neutral = nodeNeutral;

      new HemisphericLight("ambient", new Vector3(0, 1, 0), scene).intensity = dark ? 0.35 : 0.75;
      const keyLight = new PointLight("key", new Vector3(4, 3, -3), scene);
      keyLight.diffuse = accent;
      keyLight.intensity = dark ? 260 : 120;
      keyLight.parent = root;

      const emissive = (color: Color3Type, intensity: number, alpha = 1) => {
        const material = new StandardMaterial("m", scene);
        material.diffuseColor = Color3.Black();
        material.specularColor = Color3.Black();
        material.emissiveColor = color.scale(intensity);
        material.alpha = alpha;
        material.disableLighting = true;
        return material;
      };

      // A single clean geodesic lattice — a second one only produced visual noise.
      const core = CreateIcoSphere("core", { radius: 1.35, subdivisions: 2, flat: false }, scene);
      const coreMaterial = emissive(accent, dark ? 0.85 : 0.95);
      coreMaterial.wireframe = true;
      core.material = coreMaterial;
      core.parent = root;

      // Soft inner mass that reads as volume behind the lattice.
      const heart = CreateIcoSphere("heart", { radius: 0.95, subdivisions: 3, flat: false }, scene);
      heart.material = emissive(accent, dark ? 0.42 : 0.55, dark ? 0.32 : 0.18);
      heart.parent = root;

      // Two tilted rings for structure.
      const rings = [0, 1].map((index) => {
        const ring = CreateTorus("ring", { diameter: index ? 6.6 : 5.9, thickness: 0.012, tessellation: 128 }, scene);
        ring.material = emissive(index ? latticeNeutral : accent, dark ? 0.6 : 0.8, dark ? 0.6 : 0.4);
        ring.rotation.x = index ? 1.15 : 0.42;
        ring.rotation.z = index ? -0.5 : 0.28;
        ring.parent = root;
        return ring;
      });

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let elapsed = 0;

      // Node shell. Built with SolidParticleSystem rather than thin instances:
      // hardware instancing silently renders nothing on some software/older GL
      // stacks, while an SPS bakes everything into one regular mesh.
      const seeds = buildNodeSeeds();
      const groups = [
        { seeds: seeds.filter((s) => s.accent), color: accent, intensity: dark ? 1.25 : 1 },
        { seeds: seeds.filter((s) => !s.accent), color: neutral, intensity: dark ? 0.55 : 0.6 },
      ].map(({ seeds: groupSeeds, color, intensity }) => {
        const sps = new SolidParticleSystem(`nodes-${groupSeeds.length}`, scene, { updatable: true });
        const proto = CreatePolyhedron("proto", { type: 1, size: 1 }, scene);
        sps.addShape(proto, groupSeeds.length);
        proto.dispose();

        const mesh = sps.buildMesh();
        mesh.material = emissive(color, intensity);
        mesh.parent = root;
        mesh.isPickable = false;

        // Only positions and scaling change, so skip the rest of the per-particle work.
        sps.computeParticleRotation = false;
        sps.computeParticleColor = false;
        sps.computeParticleTexture = false;
        sps.computeBoundingBox = false;
        mesh.alwaysSelectAsActiveMesh = true;

        sps.updateParticle = (particle) => {
          const seed = groupSeeds[particle.idx];
          const wave = Math.sin(elapsed * 1.15 - seed.phase);
          const radius = SHELL_RADIUS + wave * 0.26;
          const scale = seed.scale * (1 + wave * 0.45);
          particle.position.set(seed.x * radius, seed.y * radius, seed.z * radius);
          particle.scaling.set(scale, scale, scale);
          return particle;
        };

        return sps;
      });

      const glow = new GlowLayer("glow", scene, { blurKernelSize: 48 });
      glow.intensity = dark ? 0.5 : 0.4;

      let pointerX = 0;
      let pointerY = 0;
      let cameraAlpha = camera.alpha;
      let cameraBeta = camera.beta;

      const onPointerMove = (event: PointerEvent) => {
        pointerX = (event.clientX / window.innerWidth) * 2 - 1;
        pointerY = (event.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      // A pulse travelling outward from the core.
      const updateNodes = () => {
        for (const sps of groups) sps.setParticles();
      };
      updateNodes();

      scene.registerBeforeRender(() => {
        const delta = engine ? engine.getDeltaTime() / 1000 : 0;
        if (!reduceMotion) elapsed += delta;

        updateNodes();
        root.rotation.y = elapsed * 0.12;
        core.rotation.y = -elapsed * 0.22;
        core.rotation.x = elapsed * 0.08;
        rings[0].rotation.y = elapsed * 0.3;
        rings[1].rotation.y = -elapsed * 0.19;

        // Gentle parallax toward the pointer.
        cameraAlpha += (Math.PI / 2 - pointerX * 0.22 - cameraAlpha) * 0.04;
        cameraBeta += (Math.PI / 2 + pointerY * 0.16 - cameraBeta) * 0.04;
        camera.alpha = cameraAlpha;
        camera.beta = cameraBeta;
      });

      const renderLoop = () => scene.render();
      engine.runRenderLoop(renderLoop);

      const onResize = () => engine?.resize();
      window.addEventListener("resize", onResize);

      // Don't burn frames when the hero is scrolled away or the tab is hidden.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!engine) return;
          if (entry.isIntersecting && !document.hidden) engine.runRenderLoop(renderLoop);
          else engine.stopRenderLoop(renderLoop);
        },
        { threshold: 0 },
      );
      observer.observe(canvas);

      const onVisibility = () => {
        if (!engine) return;
        if (document.hidden) engine.stopRenderLoop(renderLoop);
        else engine.runRenderLoop(renderLoop);
      };
      document.addEventListener("visibilitychange", onVisibility);

      cleanup = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        observer.disconnect();
        glow.dispose();
        scene.dispose();
        engine?.dispose();
        engine = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [resolvedTheme]);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[54%]">
        <canvas ref={canvasRef} className="size-full outline-none" aria-hidden />
      </div>
      {/* Driven by the CSS theme, not by resolvedTheme: next-themes reports
          undefined on the hydration pass, which left the light scrim on a dark
          page and washed the whole hero out. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[linear-gradient(90deg,rgba(250,250,250,.96)_0%,rgba(250,250,250,.9)_38%,rgba(250,250,250,.5)_56%,rgba(250,250,250,.04)_74%,rgba(250,250,250,.38)_100%)]",
          "dark:bg-[linear-gradient(90deg,rgba(10,10,10,.96)_0%,rgba(10,10,10,.9)_38%,rgba(10,10,10,.5)_56%,rgba(10,10,10,.05)_74%,rgba(10,10,10,.38)_100%)]",
        )}
      />
    </div>
  );
}
