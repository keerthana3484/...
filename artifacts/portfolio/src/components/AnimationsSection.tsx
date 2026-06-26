import { motion } from 'framer-motion';
import VideoCard from './VideoCard';
import { twoDAnimations, titleAnimations, textAnimations, AnimationItem } from '../data/animationsData';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

function HorizontalRow({ items }: { items: AnimationItem[] }) {
  return (
    <div className="relative">
      <div className="scroll-row">
        {items.map((item) => (
          <div
            key={item.id}
            className={item.type === '9:16' ? 'w-[220px] sm:w-[260px]' : 'w-[340px] sm:w-[440px]'}
          >
            <VideoCard
              title={item.title}
              category={item.category}
              type={item.type}
              src={item.src}
              thumbnail={item.thumbnail}
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export default function AnimationsSection() {
  return (
    <section id="animations" className="py-32 w-full max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="mb-16"
      >
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-4">
          Motion <span className="italic text-primary">Graphics</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-lg">
          2D animations, title sequences, and kinetic typography.
        </motion.p>
      </motion.div>

      <div className="space-y-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="text-xl font-serif mb-6 text-foreground/80">2D Animation</motion.h3>
          <HorizontalRow items={twoDAnimations} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="text-xl font-serif mb-6 text-foreground/80">Title Animations</motion.h3>
          <HorizontalRow items={titleAnimations} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="text-xl font-serif mb-6 text-foreground/80">Text Animations</motion.h3>
          <HorizontalRow items={textAnimations} />
        </motion.div>
      </div>
    </section>
  );
}
