import { useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const RADIUS = 165;
const LONG = 10;  // longitude lines
const LAT  = 7;   // latitude divisions
const R = 193, G = 148, B = 72; // bronze

function projectPoint(x: number, y: number, z: number) {
  const fov = 480;
  const f = fov / (fov + z);
  return [x * f, y * f] as const;
}

export default function HologramGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef     = useRef(0);
  const rafRef     = useRef(0);
  const alphaRef   = useRef(0);
  const scaleRef   = useRef(0.2);
  const lastScrRef = useRef(0);

  const { scrollYProgress } = useScroll();

  // Globe fades in and scales up starting at the Works section (~15% scroll)
  const opacityMV = useTransform(scrollYProgress, [0.13, 0.28], [0, 0.9]);
  const scaleMV   = useTransform(scrollYProgress, [0.13, 0.35], [0.15, 1]);

  useMotionValueEvent(opacityMV, 'change', (v) => { alphaRef.current = v; });
  useMotionValueEvent(scaleMV,   'change', (v) => { scaleRef.current = v; });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const CX = canvas.width / 2;
    const CY = canvas.height / 2;

    function drawGlobe(rot: number, alpha: number, sc: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (alpha < 0.005) return;

      ctx.save();
      ctx.translate(CX, CY);
      ctx.scale(sc, sc);

      // ─── Longitude lines ───────────────────────────────────────────
      for (let i = 0; i < LONG; i++) {
        const phi = (i / LONG) * Math.PI * 2 + rot;
        const STEPS = 48;

        // Draw back-facing half (z < 0) first at low opacity
        ctx.beginPath();
        let started = false;
        for (let j = 0; j <= STEPS; j++) {
          const theta = (j / STEPS) * Math.PI;
          const x = RADIUS * Math.sin(theta) * Math.cos(phi);
          const y = RADIUS * Math.cos(theta);
          const z = RADIUS * Math.sin(theta) * Math.sin(phi);
          if (z > 0) { started = false; continue; }
          const [px, py] = projectPoint(x, y, z);
          started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
        }
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha * 0.12})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Draw front-facing half (z >= 0) at full opacity
        ctx.beginPath();
        started = false;
        for (let j = 0; j <= STEPS; j++) {
          const theta = (j / STEPS) * Math.PI;
          const x = RADIUS * Math.sin(theta) * Math.cos(phi);
          const y = RADIUS * Math.cos(theta);
          const z = RADIUS * Math.sin(theta) * Math.sin(phi);
          if (z < 0) { started = false; continue; }
          const [px, py] = projectPoint(x, y, z);
          started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
        }
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha * 0.55})`;
        ctx.lineWidth = 0.7;
        ctx.shadowColor = `rgba(${R},${G},${B},0.4)`;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ─── Latitude lines ────────────────────────────────────────────
      for (let i = 1; i < LAT; i++) {
        const theta = (i / LAT) * Math.PI;
        const STEPS = 64;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);

        ctx.beginPath();
        let started = false;
        for (let j = 0; j <= STEPS; j++) {
          const phi = (j / STEPS) * Math.PI * 2 + rot;
          const x = RADIUS * sinT * Math.cos(phi);
          const y = RADIUS * cosT;
          const z = RADIUS * sinT * Math.sin(phi);
          if (z < 0) { started = false; continue; }
          const [px, py] = projectPoint(x, y, z);
          started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
        }
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha * 0.38})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();

        // back-facing latitude (very faint)
        ctx.beginPath();
        started = false;
        for (let j = 0; j <= STEPS; j++) {
          const phi = (j / STEPS) * Math.PI * 2 + rot;
          const x = RADIUS * sinT * Math.cos(phi);
          const y = RADIUS * cosT;
          const z = RADIUS * sinT * Math.sin(phi);
          if (z >= 0) { started = false; continue; }
          const [px, py] = projectPoint(x, y, z);
          started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
        }
        ctx.strokeStyle = `rgba(${R},${G},${B},${alpha * 0.08})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      // ─── Bright equator ring (timeline track) ──────────────────────
      const EQ_STEPS = 72;
      // back half
      ctx.beginPath();
      let started = false;
      for (let j = 0; j <= EQ_STEPS; j++) {
        const phi = (j / EQ_STEPS) * Math.PI * 2 + rot;
        const x = RADIUS * Math.cos(phi);
        const z = RADIUS * Math.sin(phi);
        if (z >= 0) { started = false; continue; }
        const [px, py] = projectPoint(x, 0, z);
        started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
      }
      ctx.strokeStyle = `rgba(${R},${G},${B},${alpha * 0.22})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // front half
      ctx.beginPath();
      started = false;
      ctx.shadowColor = `rgba(${R},${G},${B},0.8)`;
      ctx.shadowBlur = 14;
      for (let j = 0; j <= EQ_STEPS; j++) {
        const phi = (j / EQ_STEPS) * Math.PI * 2 + rot;
        const x = RADIUS * Math.cos(phi);
        const z = RADIUS * Math.sin(phi);
        if (z < 0) { started = false; continue; }
        const [px, py] = projectPoint(x, 0, z);
        started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
      }
      ctx.strokeStyle = `rgba(${R},${G},${B},${alpha * 0.95})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ─── Keyframe dots on equator ──────────────────────────────────
      const KF_COUNT = 8;
      for (let k = 0; k < KF_COUNT; k++) {
        const phi = (k / KF_COUNT) * Math.PI * 2 + rot;
        const x = RADIUS * Math.cos(phi);
        const z = RADIUS * Math.sin(phi);
        const [px, py] = projectPoint(x, 0, z);
        const front = z >= 0;
        const dotAlpha = front ? alpha : alpha * 0.2;
        ctx.beginPath();
        ctx.arc(px, py, front ? 3 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${dotAlpha})`;
        ctx.shadowColor = `rgba(${R},${G},${B},${dotAlpha})`;
        ctx.shadowBlur = front ? 18 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ─── Subtle pole glow ──────────────────────────────────────────
      const poleGrad = ctx.createRadialGradient(0, -RADIUS, 0, 0, -RADIUS, 20);
      poleGrad.addColorStop(0, `rgba(${R},${G},${B},${alpha * 0.6})`);
      poleGrad.addColorStop(1, `rgba(${R},${G},${B},0)`);
      ctx.beginPath();
      ctx.arc(0, -RADIUS, 20, 0, Math.PI * 2);
      ctx.fillStyle = poleGrad;
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      const scrollDelta = window.scrollY - lastScrRef.current;
      lastScrRef.current = window.scrollY;
      // Base slow rotation + scroll-driven boost
      rotRef.current += 0.003 + scrollDelta * 0.004;
      drawGlobe(rotRef.current, alphaRef.current, scaleRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={480}
      className="hidden lg:block"
      style={{
        position: 'fixed',
        right: '3%',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
