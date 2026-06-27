import { useScroll, useTransform, motion, useMotionTemplate, MotionValue } from 'framer-motion';

const FRAME_W = 96;
const FRAMES = 70;
const BRONZE = 'rgba(193,148,72,';

function sprocket() {
  return [0, 1, 2, 3].map((j) => (
    <div
      key={j}
      style={{
        width: 10,
        height: 7,
        background: BRONZE + '0.45)',
        borderRadius: 2,
        flexShrink: 0,
      }}
    />
  ));
}

function FilmStrip({
  x,
  top,
  frameH = 60,
  numOpacity = 0.35,
  borderOpacity = 0.18,
}: {
  x: MotionValue<number>;
  top: string;
  frameH?: number;
  numOpacity?: number;
  borderOpacity?: number;
}) {
  return (
    <motion.div
      style={{
        x,
        top,
        position: 'absolute',
        left: 0,
        display: 'flex',
        alignItems: 'stretch',
        willChange: 'transform',
      }}
    >
      {Array.from({ length: FRAMES }).map((_, i) => (
        <div
          key={i}
          style={{
            width: FRAME_W,
            flexShrink: 0,
            border: `1px solid ${BRONZE + borderOpacity + ')'}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top sprocket row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '4px 5px',
              background: BRONZE + '0.025)',
            }}
          >
            {sprocket()}
          </div>

          {/* Frame body */}
          <div
            style={{
              height: frameH,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: BRONZE + '0.015)',
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: BRONZE + numOpacity + ')',
                fontFamily: 'monospace',
                letterSpacing: 3,
              }}
            >
              {String(i + 1).padStart(3, '0')}
            </span>
          </div>

          {/* Bottom sprocket row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '4px 5px',
              background: BRONZE + '0.025)',
            }}
          >
            {sprocket()}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function Timecode({ progress }: { progress: MotionValue<number> }) {
  const minutes = useTransform(progress, [0, 1], [0, 5]);
  const seconds = useTransform(progress, [0, 1], [0, 59]);
  const frames = useTransform(progress, [0, 1], [0, 24]);

  const display = useMotionTemplate`0${minutes}:${seconds}:${frames}`;

  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: 28,
        left: 24,
        fontFamily: 'monospace',
        fontSize: 11,
        color: BRONZE + '0.4)',
        letterSpacing: 3,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <div style={{ fontSize: 8, color: BRONZE + '0.25)', letterSpacing: 2, marginBottom: 2 }}>TIMECODE</div>
      <motion.span>{display}</motion.span>
    </motion.div>
  );
}

export default function ScrollBackground() {
  const { scrollY, scrollYProgress } = useScroll();

  // Three strips at different depths / directions
  const x1 = useTransform(scrollY, [0, 12000], [0, -1800]);   // slow, left
  const x2 = useTransform(scrollY, [0, 12000], [-400, 1200]);  // medium, right
  const x3 = useTransform(scrollY, [0, 12000], [-200, -3000]); // fast, left

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Strip 1 — near top, slow drift left, very faint */}
        <FilmStrip x={x1} top="6%" frameH={52} borderOpacity={0.12} numOpacity={0.25} />

        {/* Strip 2 — mid-screen, medium drift right, slightly more visible */}
        <FilmStrip x={x2} top="44%" frameH={68} borderOpacity={0.16} numOpacity={0.32} />

        {/* Strip 3 — near bottom, fastest drift left, faintest */}
        <FilmStrip x={x3} top="80%" frameH={44} borderOpacity={0.10} numOpacity={0.20} />

        {/* Playhead — vertical scanning line tied to scroll */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 1,
            background: `linear-gradient(to bottom, transparent, ${BRONZE + '0.35)'} 30%, ${BRONZE + '0.35)'} 70%, transparent)`,
            left: useTransform(scrollYProgress, [0, 1], ['8%', '92%']),
          }}
        />
      </div>

      {/* Timecode readout — fixed bottom-left */}
      <Timecode progress={scrollYProgress} />
    </>
  );
}
