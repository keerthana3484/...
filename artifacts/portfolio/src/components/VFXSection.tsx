import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';
import { vfxData } from '../data/vfxData';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function VFXSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 4);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="vfx" className="py-32 w-full max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-16"
      >
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-4">
          Visual <span className="italic text-primary">Effects</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="relative">
          <div ref={rowRef} className="scroll-row scroll-row-video">
            {vfxData.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="h-full flex-shrink-0"
              >
                <VideoCard
                  title={item.title}
                  category={item.category}
                  type={item.type}
                  src={item.src}
                  thumbnail={item.thumbnail}
                />
              </motion.div>
            ))}
          </div>
          {overflows && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent" />
          )}
        </div>
      </motion.div>
    </section>
  );
}
