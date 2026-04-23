"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const globeGroup = new THREE.Group();

    // Core layers
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(2, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x1d45d9,
        transparent: true,
        opacity: 0.18,
      })
    );
    globeGroup.add(core);

    const midGlow = new THREE.Mesh(
      new THREE.SphereGeometry(2.12, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x22bfff,
        transparent: true,
        opacity: 0.1,
      })
    );
    globeGroup.add(midGlow);

    const outerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(2.3, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0x6fd3ff,
        transparent: true,
        opacity: 0.05,
      })
    );
    globeGroup.add(outerGlow);

    // Wireframes
    const wireGeo = new THREE.SphereGeometry(2.02, 22, 16);
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeo),
      new THREE.LineBasicMaterial({
        color: 0x4f7df5,
        transparent: true,
        opacity: 0.85,
      })
    );
    globeGroup.add(wireframe);

    const wireGeo2 = new THREE.SphereGeometry(2.05, 10, 8);
    const wireframe2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeo2),
      new THREE.LineBasicMaterial({
        color: 0x22bfff,
        transparent: true,
        opacity: 0.35,
      })
    );
    globeGroup.add(wireframe2);

    // Glowing nodes
    const nodePositions: [number, number, number][] = [];
    for (let i = 1; i < 8; i++) {
      const theta = (i / 8) * Math.PI;
      for (let j = 0; j < 14; j++) {
        const phi = (j / 14) * Math.PI * 2;
        if (Math.random() > 0.65) {
          nodePositions.push([
            2.02 * Math.sin(theta) * Math.cos(phi),
            2.02 * Math.cos(theta),
            2.02 * Math.sin(theta) * Math.sin(phi),
          ]);
        }
      }
    }

    const nodeGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const haloGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const nodeMeshes: {
      halo: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
      phase: number;
    }[] = [];

    nodePositions.forEach((pos) => {
      const n = new THREE.Mesh(nodeGeo, nodeMat);
      n.position.set(...pos);
      globeGroup.add(n);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x6fd3ff,
        transparent: true,
        opacity: 0.5,
      });
      const h = new THREE.Mesh(haloGeo, haloMat);
      h.position.set(...pos);
      globeGroup.add(h);
      nodeMeshes.push({ halo: h, phase: Math.random() * Math.PI * 2 });
    });

    scene.add(globeGroup);

    // Orbital rings
    const orbitalRings: {
      mesh: THREE.Mesh;
      speed: number;
      baseRotZ: number;
    }[] = [];
    const ringConfigs = [
      { r: 3.2, tiltX: 1.3, tiltZ: 0.5, color: 0x6fd3ff, speed: 0.35 },
      { r: 3.5, tiltX: 1.4, tiltZ: -0.5, color: 0x4f7df5, speed: -0.28 },
      { r: 3.8, tiltX: 1.2, tiltZ: 0.2, color: 0x22bfff, speed: 0.22 },
      { r: 4.1, tiltX: 1.5, tiltZ: -0.7, color: 0x7fa2fb, speed: -0.18 },
    ];
    ringConfigs.forEach((cfg) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.r, 0.012, 8, 128),
        new THREE.MeshBasicMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.55,
        })
      );
      ring.rotation.x = cfg.tiltX;
      ring.rotation.z = cfg.tiltZ;
      scene.add(ring);
      orbitalRings.push({ mesh: ring, speed: cfg.speed, baseRotZ: cfg.tiltZ });
    });

    // Satellites
    const satellites: {
      group: THREE.Group;
      speed: number;
      radius: number;
      phase: number;
    }[] = [];
    const satColors = [0x22bfff, 0x4f7df5, 0x6fd3ff, 0x7fa2fb];
    for (let i = 0; i < 4; i++) {
      const sGroup = new THREE.Group();
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 12, 12),
        new THREE.MeshBasicMaterial({ color: satColors[i] })
      );
      sGroup.add(sat);
      const g = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 8, 8),
        new THREE.MeshBasicMaterial({
          color: satColors[i],
          transparent: true,
          opacity: 0.35,
        })
      );
      sGroup.add(g);
      scene.add(sGroup);
      satellites.push({
        group: sGroup,
        speed: 1.0 + i * 0.3,
        radius: 3.2 + i * 0.3,
        phase: i * 1.5,
      });
    }

    // Particles
    const particles: THREE.Mesh<
      THREE.SphereGeometry,
      THREE.MeshBasicMaterial
    >[] = [];
    const particleGeo = new THREE.SphereGeometry(0.04, 6, 6);
    for (let i = 0; i < 100; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x22bfff : 0x4f7df5,
        transparent: true,
        opacity: 0.9,
      });
      const p = new THREE.Mesh(particleGeo, mat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.random() * 3;
      (p.userData as any) = {
        startPos: {
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
        },
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      };
      p.position.set(
        (p.userData as any).startPos.x,
        (p.userData as any).startPos.y,
        (p.userData as any).startPos.z
      );
      scene.add(p);
      particles.push(p);
    }

    // Energy arcs
    const arcs: {
      line: THREE.Line;
      from: [number, number, number];
      to: [number, number, number];
      t: number;
      speed: number;
    }[] = [];
    for (let i = 0; i < 5; i++) {
      const mat = new THREE.LineBasicMaterial({
        color: 0x22bfff,
        transparent: true,
        opacity: 0,
      });
      const geo = new THREE.BufferGeometry();
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      arcs.push({
        line,
        from: nodePositions[Math.floor(Math.random() * nodePositions.length)],
        to: nodePositions[Math.floor(Math.random() * nodePositions.length)],
        t: Math.random() * Math.PI * 2,
        speed: 1 + Math.random(),
      });
    }

    const updateArc = (arc: (typeof arcs)[0]) => {
      const from = arc.from;
      const to = arc.to;
      const mid: [number, number, number] = [
        ((from[0] + to[0]) * 0.5) * 1.5,
        ((from[1] + to[1]) * 0.5) * 1.5,
        ((from[2] + to[2]) * 0.5) * 1.5,
      ];
      const points: THREE.Vector3[] = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x =
          (1 - u) * (1 - u) * from[0] +
          2 * (1 - u) * u * mid[0] +
          u * u * to[0];
        const y =
          (1 - u) * (1 - u) * from[1] +
          2 * (1 - u) * u * mid[1] +
          u * u * to[1];
        const z =
          (1 - u) * (1 - u) * from[2] +
          2 * (1 - u) * u * mid[2] +
          u * u * to[2];
        points.push(new THREE.Vector3(x, y, z));
      }
      arc.line.geometry.setFromPoints(points);
    };

    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      const t = clock.getElapsedTime();

      globeGroup.rotation.y = t * 0.2;
      globeGroup.rotation.x = Math.sin(t * 0.15) * 0.15;

      wireframe2.rotation.y = -t * 0.4;
      wireframe2.rotation.x = -t * 0.15;

      nodeMeshes.forEach(({ halo, phase }) => {
        halo.material.opacity = 0.3 + Math.sin(t * 3 + phase) * 0.25;
        halo.scale.setScalar(1 + Math.sin(t * 3 + phase) * 0.2);
      });

      orbitalRings.forEach((r) => {
        r.mesh.rotation.z = r.baseRotZ + t * r.speed;
      });

      satellites.forEach((s, i) => {
        const a = t * s.speed + s.phase;
        const tilt = (i - 1.5) * 0.35;
        s.group.position.set(
          s.radius * Math.cos(a) * Math.cos(tilt),
          s.radius * Math.sin(a) * 0.45,
          s.radius * Math.sin(a) * Math.cos(tilt) +
            s.radius * Math.cos(a) * Math.sin(tilt) * 0.3
        );
      });

      particles.forEach((p) => {
        const ud = p.userData as any;
        ud.t += ud.speed;
        if (ud.t > 1) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 6 + Math.random() * 3;
          ud.startPos = {
            x: r * Math.sin(phi) * Math.cos(theta),
            y: r * Math.sin(phi) * Math.sin(theta),
            z: r * Math.cos(phi),
          };
          ud.t = 0;
        }
        const pt = ud.t;
        const s = ud.startPos;
        p.position.x = s.x * (1 - pt);
        p.position.y = s.y * (1 - pt);
        p.position.z = s.z * (1 - pt);
        p.material.opacity = Math.sin(pt * Math.PI);
      });

      arcs.forEach((arc) => {
        arc.t += 0.02 * arc.speed;
        updateArc(arc);
        (arc.line.material as THREE.LineBasicMaterial).opacity =
          Math.max(0, Math.sin(arc.t)) * 0.6;
        if (arc.t > Math.PI) {
          arc.t = 0;
          arc.from =
            nodePositions[Math.floor(Math.random() * nodePositions.length)];
          arc.to =
            nodePositions[Math.floor(Math.random() * nodePositions.length)];
        }
      });

      core.material.opacity = 0.15 + Math.sin(t * 2) * 0.05;
      midGlow.material.opacity = 0.08 + Math.sin(t * 1.5) * 0.04;
      outerGlow.material.opacity = 0.04 + Math.sin(t * 1.2) * 0.03;
      outerGlow.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05);

      tx += (mx * 0.5 - tx) * 0.05;
      ty += (-my * 0.35 - ty) * 0.05;
      camera.position.x = tx;
      camera.position.y = ty;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full relative z-[2]"
      aria-hidden
    />
  );
}
