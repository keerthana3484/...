import { useState } from 'react';
import { motion } from 'framer-motion';
import PosterCard from './PosterCard';
import Lightbox from './Lightbox';
import { postersData } from '../data/postersData';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function PostersSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % postersData.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + postersData.length) % postersData.length);
    }
  };

  return (
    <section id="posters" className="py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-16"
      >
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-4">
          Poster <span className="italic text-primary">Designs</span>
        </motion.h2>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {postersData.map((poster, index) => (
          <motion.div key={poster.id} variants={fadeUp}>
            <PosterCard
              title={poster.title}
              category={poster.category}
              gradient={poster.gradient}
              src={poster.src}
              onClick={() => setSelectedIndex(index)}
            />
          </motion.div>
        ))}
      </motion.div>

      <Lightbox
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        poster={selectedIndex !== null ? postersData[selectedIndex] : null}
      />
    </section>
  );
}
