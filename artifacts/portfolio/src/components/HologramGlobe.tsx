import { useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────
const R   = 115;   // Saturn radius in canvas px
const FOV = 500;
const BR  = 138; const BG = 140; const BB = 110; // muted olive RGB

const RING_INC = 22 * (Math.PI / 180);  // Tilt Saturn's equator and rings towards viewer
const AXIS_TILT = -15 * (Math.PI / 180); // Tilt Saturn's axis sideways

const RINGS_DATA = [
  // Inner C Ring (faint)
  { r: R * 1.30, lw: 0.5, op: 0.12, dash: false },
  { r: R * 1.36, lw: 0.8, op: 0.15, dash: false },
  { r: R * 1.42, lw: 1.0, op: 0.20, dash: false },
  // Middle B Ring (bright, dense)
  { r: R * 1.50, lw: 1.5, op: 0.40, dash: false },
  { r: R * 1.56, lw: 2.0, op: 0.50, dash: false },
  { r: R * 1.62, lw: 2.5, op: 0.55, dash: false },
  { r: R * 1.68, lw: 1.8, op: 0.45, dash: false },
  { r: R * 1.74, lw: 1.2, op: 0.35, dash: false },
  // Cassini Division (empty space around 1.80)
  // Outer A Ring
  { r: R * 1.84, lw: 1.5, op: 0.35, dash: false },
  { r: R * 1.90, lw: 2.0, op: 0.40, dash: false },
  { r: R * 1.96, lw: 1.0, op: 0.30, dash: false },
  // Encke Gap / Outer F Ring (faint, dashed)
  { r: R * 2.04, lw: 0.5, op: 0.15, dash: true },
  { r: R * 2.12, lw: 0.8, op: 0.25, dash: true },
  { r: R * 2.20, lw: 0.4, op: 0.10, dash: false }
];

// ─── Math helpers ─────────────────────────────────────────────────────────────
function ll2xyz(lat: number, lon: number, r = R): [number, number, number] {
  const la = lat * (Math.PI / 180);
  const lo = lon * (Math.PI / 180);
  return [r * Math.cos(la) * Math.cos(lo), r * Math.sin(la), r * Math.cos(la) * Math.sin(lo)];
}

function rotY(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x * Math.cos(a) - z * Math.sin(a), y, x * Math.sin(a) + z * Math.cos(a)];
}

function tiltX(x: number, y: number, z: number, a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}

function rotZ(x: number, y: number, z: number, a: number): [number, number, number] {
  const c = Math.cos(a), s = Math.sin(a);
  return [x * c - y * s, x * s + y * c, z];
}

// Combined transformation for any point on the planet or rings
function transform3D(x: number, y: number, z: number, rot: number): [number, number, number] {
  const [x1, y1, z1] = rotY(x, y, z, rot);
  const [x2, y2, z2] = tiltX(x1, y1, z1, RING_INC);
  const [x3, y3, z3] = rotZ(x2, y2, z2, AXIS_TILT);
  return [x3, y3, z3];
}

function persp(x: number, y: number, z: number): [number, number] {
  const f = FOV / (FOV + z);
  return [x * f, y * f];
}

// Depth fade: front hemisphere (z<=0) = 1, back (z>0) fades to 0
function depthFade(z: number): number {
  if (z <= 0) return 1;
  return Math.max(0, 1 - z / (R * 0.9));
}

function isOccluded(p: [number, number, number]): boolean {
  const [x, y, z] = p;
  if (z <= 0) return false;
  const [px, py] = persp(x, y, z);
  const dist2D = Math.hypot(px, py);
  const projR = R * (FOV / (FOV + z));
  return dist2D < projR * 0.98;
}

// Inclined orbit path relative to Saturn's equator
function orbitXYZ(t: number, r = R * 2.45): [number, number, number] {
  const INC = 35 * (Math.PI / 180);
  return [r * Math.cos(t), r * Math.sin(t) * Math.sin(INC), r * Math.sin(t) * Math.cos(INC)];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HologramGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef    = useRef(-0.35);  // start showing Africa/Europe
  const rafRef    = useRef(0);
  const alphaRef  = useRef(0);
  const scaleRef  = useRef(0.15);
  const lastScrRef = useRef(0);
  const progRef   = useRef(0);

  const { scrollYProgress } = useScroll();
  const opacityMV = useTransform(scrollYProgress, [0.12, 0.26], [0, 0.92]);
  const scaleMV   = useTransform(scrollYProgress, [0.12, 0.34], [0.12, 1]);

  useMotionValueEvent(opacityMV, 'change', v => { alphaRef.current = v; });
  useMotionValueEvent(scaleMV,   'change', v => { scaleRef.current = v; });
  useMotionValueEvent(scrollYProgress, 'change', v => { progRef.current = v; });

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const CX = canvas.width / 2;
    const CY = canvas.height / 2;

    // Draw a single segment between two 3D points, with depth-based opacity
    function seg(
      p1: [number,number,number], p2: [number,number,number],
      alpha: number, color: string, lw: number,
      glowColor?: string, glowBlur = 0
    ) {
      const mz = (p1[2] + p2[2]) / 2;
      const fade = depthFade(mz);
      if (fade <= 0.02) return;
      const [x1, y1] = persp(...p1);
      const [x2, y2] = persp(...p2);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.globalAlpha = fade * alpha;
      if (glowColor && glowBlur > 0) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur;
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    function drawGlobe(rot: number, alpha: number, sc: number, prog: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (alpha < 0.01) return;

      ctx.save();
      ctx.translate(CX, CY);
      ctx.scale(sc, sc);

      // ── Saturn's Cloud Bands (Latitude lines of varying width & opacity) ─────
      const latitudes = [
        { lat: -75, lw: 0.6, op: 0.15 },
        { lat: -60, lw: 0.8, op: 0.20 },
        { lat: -45, lw: 1.2, op: 0.25 },
        { lat: -30, lw: 2.2, op: 0.40 }, // Thick belt
        { lat: -15, lw: 0.8, op: 0.20 },
        { lat: 0,   lw: 2.5, op: 0.45 }, // Equator belt
        { lat: 15,  lw: 0.8, op: 0.20 },
        { lat: 30,  lw: 2.2, op: 0.40 }, // Thick belt
        { lat: 45,  lw: 1.2, op: 0.25 },
        { lat: 60,  lw: 0.8, op: 0.20 },
        { lat: 75,  lw: 0.6, op: 0.15 }
      ];

      for (const band of latitudes) {
        const STEPS = 72;
        for (let j = 0; j < STEPS; j++) {
          const l1 = -180 + (j / STEPS) * 360;
          const l2 = -180 + ((j + 1) / STEPS) * 360;
          const p1 = transform3D(...ll2xyz(band.lat, l1), rot);
          const p2 = transform3D(...ll2xyz(band.lat, l2), rot);
          seg(p1, p2, alpha * band.op, `rgb(${BR},${BG},${BB})`, band.lw);
        }
      }

      // ── Saturn's rotation grid (faint longitude lines) ───────────────────────
      for (let lon = 0; lon < 360; lon += 45) {
        const STEPS = 36;
        for (let j = 0; j < STEPS; j++) {
          const la1 = -90 + (j / STEPS) * 180;
          const la2 = -90 + ((j + 1) / STEPS) * 180;
          const p1 = transform3D(...ll2xyz(la1, lon), rot);
          const p2 = transform3D(...ll2xyz(la2, lon), rot);
          seg(p1, p2, alpha * 0.08, `rgb(${BR},${BG},${BB})`, 0.3);
        }
      }

      // ── Saturn's Rings ───────────────────────────────────────────────────────
      for (const ring of RINGS_DATA) {
        const STEPS = 120;
        for (let j = 0; j < STEPS; j++) {
          if (ring.dash && j % 6 >= 4) continue;
          const t1 = (j / STEPS) * Math.PI * 2;
          const t2 = ((j + 1) / STEPS) * Math.PI * 2;
          
          // Spin rings with Keplerian velocity
          const ringRot = rot * (1.2 / Math.sqrt(ring.r / R));
          const p1 = transform3D(ring.r * Math.cos(t1), 0, ring.r * Math.sin(t1), ringRot);
          const p2 = transform3D(ring.r * Math.cos(t2), 0, ring.r * Math.sin(t2), ringRot);

          // Render only if not occluded by planet body
          if (isOccluded(p1) && isOccluded(p2)) continue;
          
          seg(p1, p2, alpha * ring.op, `rgb(${BR},${BG},${BB})`, ring.lw);
        }
      }

      // ── Orbit path (dashed tilted outer circle) ──────────────────────────────
      const OP = 120;
      for (let j = 0; j < OP; j++) {
        if (j % 4 === 3) continue; // dashed
        const t1 = (j / OP) * Math.PI * 2;
        const t2 = ((j + 1) / OP) * Math.PI * 2;
        const p1 = transform3D(...orbitXYZ(t1), rot);
        const p2 = transform3D(...orbitXYZ(t2), rot);
        
        if (isOccluded(p1) && isOccluded(p2)) continue;
        seg(p1, p2, alpha * 0.35, `rgb(${BR},${BG},${BB})`, 0.7);
      }

      // ── Arrow trail ──────────────────────────────────────────────────────────
      const arrowT = prog * Math.PI * 6; // 3 full orbits
      const TRAIL = 24;
      for (let k = TRAIL; k >= 1; k--) {
        const tT = arrowT - k * 0.045;
        const p = transform3D(...orbitXYZ(tT), rot);
        if (isOccluded(p)) continue;
        const [tx, ty, tz] = p;
        const fade = depthFade(tz);
        const [px, py] = persp(tx, ty, tz);
        const ta = (1 - k / TRAIL) * alpha * 0.8 * fade;
        const sz = 1 + (1 - k / TRAIL) * 2;
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BR},${BG},${BB},${ta})`;
        ctx.fill();
      }

      // ── Arrow head ───────────────────────────────────────────────────────────
      const ap = transform3D(...orbitXYZ(arrowT), rot);
      if (!isOccluded(ap)) {
        const [ax, ay, az] = ap;
        const fade = depthFade(az);
        const [px, py] = persp(ax, ay, az);

        const ap2 = transform3D(...orbitXYZ(arrowT + 0.015), rot);
        const [px2, py2] = persp(ap2[0], ap2[1], ap2[2]);
        const angle = Math.atan2(py2 - py, px2 - px);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle);
        ctx.globalAlpha = fade * alpha;
        ctx.shadowColor = `rgba(${BR},${BG},${BB},1)`;
        ctx.shadowBlur = 22;

        ctx.beginPath();
        ctx.moveTo(12, 0);
        ctx.lineTo(-7, -6);
        ctx.lineTo(-4, 0);
        ctx.lineTo(-7, 6);
        ctx.closePath();
        ctx.fillStyle = `rgb(${BR},${BG},${BB})`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, 6);
        ctx.lineTo(0, 14);
        ctx.strokeStyle = `rgb(${BR},${BG},${BB})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // ── Pole dots ────────────────────────────────────────────────────────────
      for (const pole of [[0, R, 0], [0, -R, 0]] as const) {
        const p = transform3D(pole[0], pole[1], pole[2], rot);
        if (isOccluded(p)) continue;
        const [px, py, pz] = p;
        const [sx, sy] = persp(px, py, pz);
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BR},${BG},${BB},${depthFade(pz) * alpha * 0.9})`;
        ctx.shadowColor = `rgba(${BR},${BG},${BB},0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Atmospheric limb glow ────────────────────────────────────────────────
      const limb = ctx.createRadialGradient(0, 0, R * 0.82, 0, 0, R * 1.12);
      limb.addColorStop(0,   `rgba(${BR},${BG},${BB},0)`);
      limb.addColorStop(0.5, `rgba(${BR},${BG},${BB},${alpha * 0.07})`);
      limb.addColorStop(1,   `rgba(${BR},${BG},${BB},0)`);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.12, 0, Math.PI * 2);
      ctx.fillStyle = limb;
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      const delta = window.scrollY - lastScrRef.current;
      lastScrRef.current = window.scrollY;
      // Slow base rotation + scroll velocity boost
      rotRef.current += 0.0025 + delta * 0.005;
      drawGlobe(rotRef.current, alphaRef.current, scaleRef.current, progRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={460}
      height={460}
      className="hidden lg:block"
      style={{
        position: 'fixed',
        right: '2%',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
