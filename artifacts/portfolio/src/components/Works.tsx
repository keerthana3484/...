import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { worksData } from '../data/worksData';
import VideoCard from './VideoCard';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

type Category = keyof typeof worksData;

function HorizontalRow({ items }: { items: typeof worksData[Category] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div ref={rowRef} className="scroll-row" style={{ height: '480px' }}>
        {items.map((work) => (
          <div key={work.id} className="h-full flex-shrink-0">
            <VideoCard
              title={work.title}
              category={work.category}
              type={work.type}
              src={work.src}
              thumbnail={work.thumbnail}
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export default function Works() {
  const categories = Object.keys(worksData) as Category[];
  const [activeTab, setActiveTab] = useState<Category>(categories[0]);

  return (
    <section id="works" className="py-32 w-full max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="mb-16"
      >
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-12">
          Selected <span className="italic text-primary">Works</span>
        </motion.h2>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wider uppercase rounded-full transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground border border-card-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <HorizontalRow items={worksData[activeTab]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
