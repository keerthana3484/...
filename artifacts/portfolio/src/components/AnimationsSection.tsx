import { motion } from 'framer-motion';
import VideoCard from './VideoCard';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const twoD = [
  { id: 1, title: 'Morphic Dreamscape', category: '2D Animation', type: '16:9' as const },
  { id: 2, title: 'Liquid Geometry', category: '2D Animation', type: '16:9' as const }
];

const titles = [
  { id: 3, title: 'Cinematic Opening', category: 'Title Animation', type: '9:16' as const }
];

const textAnim = [
  { id: 4, title: 'Glitch Type', category: 'Text Animation', type: '9:16' as const },
  { id: 5, title: 'Kinetic Words', category: 'Text Animation', type: '9:16' as const },
  { id: 6, title: 'Fade Reveal', category: 'Text Animation', type: '9:16' as const }
];

export default function AnimationsSection() {
  return (
    <section id="animations" className="py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto">
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

      <div className="space-y-24">
        {/* 2D Animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.h3 variants={fadeUp} className="text-xl font-serif mb-8 text-foreground/80">2D Animation</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {twoD.map(item => (
              <motion.div key={item.id} variants={fadeUp}>
                <VideoCard {...item} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Title & Text Combined Grid for nice layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.h3 variants={fadeUp} className="text-xl font-serif mb-8 text-foreground/80">Titles & Typography</motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div variants={fadeUp} className="col-span-1">
              <VideoCard {...titles[0]} />
            </motion.div>
            {textAnim.map(item => (
              <motion.div key={item.id} variants={fadeUp} className="col-span-1">
                <VideoCard {...item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
