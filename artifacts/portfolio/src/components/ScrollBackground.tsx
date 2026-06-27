import { useScroll, useTransform, motion, useMotionValueEvent, MotionValue } from 'framer-motion';
import { useState } from 'react';

const FRAME_W = 88;
const FRAMES = 80;
const B = 'rgba(193,148,72,';

function FilmStrip({ x, direction = 'top' }: { x: MotionValue<number>; direction?: 'top' | 'bottom' }) {
  const isTop = direction === 'top';
  return (
    <motion.div
      style={{
        x,
        [isTop ? 'top' : 'bottom']: 0,
        position: 'absolute',
        left: 0,
        display: 'flex',
        willChange: 'transform',
        opacity: 0.55,
      }}
    >
      {Array.from({ length: FRAMES }).map((_, i) => (
        <div
          key={i}
          style={{
            width: FRAME_W,
            flexShrink: 0,
            borderLeft: `1px solid ${B}0.12)`,
            borderRight: `1px solid ${B}0.12)`,
            ...(isTop ? { borderTop: `1px solid ${B}0.12)` } : { borderBottom: `1px solid ${B}0.12)` }),
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '3px 6px',
            }}
          >
            {[0, 1, 2, 3].map((j) => (
              <div
                key={j}
                style={{
                  width: 9,
                  height: 5,
                  background: B + '0.28)',
                  borderRadius: 1.5,
                  flexShrink: 0,
                }}
              />
            ))}
            <span
              style={{
                fontSize: 7,
                color: B + '0.22)',
                fontFamily: 'monospace',
                letterSpacing: 1,
                marginLeft: 4,
              }}
            >
              {String(i + 1).padStart(3, '0')}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function Timecode({ progress }: { progress: MotionValue<number> }) {
  const [tc, setTc] = useState('00:00:00');

  useMotionValueEvent(progress, 'change', (v) => {
    const total = Math.round(v * 5 * 60 * 25);
    const f = total % 25;
    const s = Math.floor(total / 25) % 60;
    const m = Math.floor(total / 25 / 60);
    const pad = (n: number) => String(n).padStart(2, '0');
    setTc(`${pad(m)}:${pad(s)}:${pad(f)}`);
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 18,
        fontFamily: 'monospace',
        lineHeight: 1.5,
        pointerEvents: 'none',
      }}
    >
      <div style={{ fontSize: 7, color: B + '0.18)', letterSpacing: 2 }}>TC</div>
      <div style={{ fontSize: 9, color: B + '0.28)', letterSpacing: 3 }}>{tc}</div>
    </div>
  );
}

export default function ScrollBackground() {
  const { scrollY, scrollYProgress } = useScroll();

  const x1 = useTransform(scrollY, [0, 12000], [0, -1600]);
  const x2 = useTransform(scrollY, [0, 12000], [-300, 1400]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <FilmStrip x={x1} direction="top" />
      <FilmStrip x={x2} direction="bottom" />
      <Timecode progress={scrollYProgress} />
    </div>
  );
}
