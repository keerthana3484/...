import { useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────
const R   = 155;   // Globe radius in canvas px
const FOV = 500;
const BR  = 193; const BG = 148; const BB = 72; // bronze RGB

// ─── Math helpers ─────────────────────────────────────────────────────────────
function ll2xyz(lat: number, lon: number, r = R): [number, number, number] {
  const la = lat * (Math.PI / 180);
  const lo = lon * (Math.PI / 180);
  return [r * Math.cos(la) * Math.cos(lo), r * Math.sin(la), r * Math.cos(la) * Math.sin(lo)];
}

function rotY(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x * Math.cos(a) - z * Math.sin(a), y, x * Math.sin(a) + z * Math.cos(a)];
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

// Arrow orbital path (inclined 30° great circle)
const INC = 30 * (Math.PI / 180);
function orbitXYZ(t: number, r = R): [number, number, number] {
  return [r * Math.cos(t), r * Math.sin(t) * Math.sin(INC), r * Math.sin(t) * Math.cos(INC)];
}

// ─── Simplified continent outlines: [lon, lat][] ──────────────────────────────
const CONTINENTS: [number, number][][] = [
  // North America
  [[-168,70],[-155,72],[-140,70],[-130,72],[-115,73],[-100,74],[-78,72],[-65,63],[-60,60],[-55,55],[-55,50],[-60,47],[-67,45],[-70,43],[-76,37],[-80,35],[-82,30],[-80,25],[-75,22],[-70,20],[-65,18],[-60,15],[-52,4],[-50,15],[-60,4],[-75,10],[-77,8],[-83,10],[-88,16],[-110,23],[-117,32],[-124,48],[-130,54],[-140,60],[-168,70]],
  // South America
  [[-80,8],[-78,4],[-78,0],[-75,-10],[-70,-20],[-72,-30],[-73,-42],[-68,-55],[-56,-55],[-50,-50],[-42,-38],[-44,-33],[-43,-28],[-40,-23],[-38,-18],[-35,-12],[-38,-8],[-50,-5],[-52,0],[-50,4],[-62,11],[-75,12],[-80,8]],
  // Europe
  [[-10,36],[-9,43],[-2,43],[-5,48],[2,57],[5,65],[10,72],[20,72],[26,68],[25,60],[20,55],[22,49],[27,46],[32,47],[28,38],[15,38],[3,37],[-10,36]],
  // Africa
  [[-18,16],[-15,12],[-10,4],[-5,5],[0,6],[5,5],[10,-5],[12,-18],[15,-28],[17,-35],[26,-35],[31,-30],[35,-20],[40,-12],[41,-2],[45,5],[50,12],[44,12],[43,22],[35,30],[25,37],[10,37],[-5,36],[-12,32],[-17,25],[-18,16]],
  // Asia (Eurasia east of Europe)
  [[27,41],[32,41],[38,37],[44,34],[50,30],[56,28],[57,24],[62,25],[68,22],[75,8],[80,10],[88,22],[92,27],[100,26],[105,20],[114,22],[118,22],[122,14],[118,5],[110,0],[104,1],[100,5],[105,12],[110,22],[120,25],[125,32],[130,38],[135,45],[140,50],[145,60],[140,70],[120,72],[100,73],[80,75],[60,73],[35,65],[28,56],[30,50],[27,41]],
  // Australia
  [[114,-22],[118,-20],[124,-16],[130,-14],[136,-12],[143,-10],[148,-14],[152,-18],[154,-24],[152,-30],[148,-38],[140,-38],[138,-35],[132,-36],[130,-33],[124,-34],[118,-38],[115,-34],[114,-22]],
  // Greenland (simplified)
  [[-45,82],[-20,78],[-14,78],[-18,73],[-24,68],[-50,68],[-56,72],[-52,78],[-45,82]],
];

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
    const canvas = canvasRef.current;
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

      // ── Latitude grid lines (every 30°) ───────────────────────
      for (let lat = -60; lat <= 60; lat += 30) {
        const STEPS = 72;
        for (let j = 0; j < STEPS; j++) {
          const l1 = -180 + (j / STEPS) * 360;
          const l2 = -180 + ((j + 1) / STEPS) * 360;
          const p1 = rotY(...ll2xyz(lat, l1), rot);
          const p2 = rotY(...ll2xyz(lat, l2), rot);
          seg(p1, p2, alpha * 0.20, `rgb(${BR},${BG},${BB})`, 0.4);
        }
      }

      // ── Longitude grid lines (every 30°) ──────────────────────
      for (let lon = 0; lon < 360; lon += 30) {
        const STEPS = 48;
        for (let j = 0; j < STEPS; j++) {
          const la1 = -90 + (j / STEPS) * 180;
          const la2 = -90 + ((j + 1) / STEPS) * 180;
          const p1 = rotY(...ll2xyz(la1, lon), rot);
          const p2 = rotY(...ll2xyz(la2, lon), rot);
          seg(p1, p2, alpha * 0.20, `rgb(${BR},${BG},${BB})`, 0.4);
        }
      }

      // ── Continent outlines ─────────────────────────────────────
      for (const outline of CONTINENTS) {
        for (let i = 0; i < outline.length - 1; i++) {
          const [lo1, la1] = outline[i];
          const [lo2, la2] = outline[i + 1];
          const p1 = rotY(...ll2xyz(la1, lo1), rot);
          const p2 = rotY(...ll2xyz(la2, lo2), rot);
          // Skip edges that jump across globe (long segments)
          const dist = Math.hypot(lo2 - lo1, la2 - la1);
          if (dist > 40) continue;
          seg(p1, p2, alpha * 0.80, `rgb(${BR},${BG},${BB})`, 1.3,
              `rgb(${BR},${BG},${BB})`, 4);
        }
      }

      // ── Equator ───────────────────────────────────────────────
      const EQ = 96;
      for (let j = 0; j < EQ; j++) {
        const p1 = rotY(...ll2xyz(0, -180 + (j / EQ) * 360), rot);
        const p2 = rotY(...ll2xyz(0, -180 + ((j + 1) / EQ) * 360), rot);
        seg(p1, p2, alpha * 0.90, `rgb(${BR},${BG},${BB})`, 1.5,
            `rgb(${BR},${BG},${BB})`, 12);
      }

      // ── Orbit path (dashed tilted great circle) ────────────────
      const OP = 120;
      for (let j = 0; j < OP; j++) {
        if (j % 4 === 3) continue; // dashed
        const t1 = (j / OP) * Math.PI * 2;
        const t2 = ((j + 1) / OP) * Math.PI * 2;
        const p1 = rotY(...orbitXYZ(t1), rot);
        const p2 = rotY(...orbitXYZ(t2), rot);
        seg(p1, p2, alpha * 0.35, `rgb(${BR},${BG},${BB})`, 0.7);
      }

      // ── Arrow trail ───────────────────────────────────────────
      const arrowT = prog * Math.PI * 6; // 3 full orbits across the page
      const TRAIL = 24;
      for (let k = TRAIL; k >= 1; k--) {
        const tT = arrowT - k * 0.045;
        const [tx, ty, tz] = rotY(...orbitXYZ(tT), rot);
        if (tz > R * 0.8) continue;
        const fade = depthFade(tz);
        const [px, py] = persp(tx, ty, tz);
        const ta = (1 - k / TRAIL) * alpha * 0.8 * fade;
        const sz = 1 + (1 - k / TRAIL) * 2;
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BR},${BG},${BB},${ta})`;
        ctx.fill();
      }

      // ── Arrow head ────────────────────────────────────────────
      const [ax, ay, az] = rotY(...orbitXYZ(arrowT), rot);
      if (az <= R * 0.75) {
        const fade = depthFade(az);
        const [px, py] = persp(ax, ay, az);

        // Tangent direction for arrow heading
        const [ax2, ay2, az2] = rotY(...orbitXYZ(arrowT + 0.015), rot);
        const [px2, py2] = persp(ax2, ay2, az2);
        const angle = Math.atan2(py2 - py, px2 - px);

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(angle);
        ctx.globalAlpha = fade * alpha;
        ctx.shadowColor = `rgba(${BR},${BG},${BB},1)`;
        ctx.shadowBlur = 22;

        // Arrow shape: a playhead chevron
        ctx.beginPath();
        ctx.moveTo(12, 0);      // tip
        ctx.lineTo(-7, -6);     // left wing
        ctx.lineTo(-4, 0);      // notch
        ctx.lineTo(-7, 6);      // right wing
        ctx.closePath();
        ctx.fillStyle = `rgb(${BR},${BG},${BB})`;
        ctx.fill();

        // Small line underneath (like a timeline playhead stem)
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

      // ── Pole dots ─────────────────────────────────────────────
      for (const pole of [[0, 0, R], [0, 0, -R]] as const) {
        const [px, py, pz] = rotY(pole[0], pole[1], pole[2], rot);
        if (pz > R * 0.8) continue;
        const [sx, sy] = persp(px, py, pz);
        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BR},${BG},${BB},${depthFade(pz) * alpha * 0.9})`;
        ctx.shadowColor = `rgba(${BR},${BG},${BB},0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Atmospheric limb glow ─────────────────────────────────
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
