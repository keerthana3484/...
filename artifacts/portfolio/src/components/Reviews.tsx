import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const reviews = [
  {
    quote: "Ajay transformed our concert footage into something we still can't stop watching. The energy, the cuts, the color — absolutely cinematic.",
    name: "Priya M.",
    title: "Event Organizer"
  },
  {
    quote: "Professional, creative, and delivered ahead of schedule. Our brand film has gotten more views than anything we've produced before.",
    name: "Kiran V.",
    title: "Brand Manager"
  },
  {
    quote: "He understood the vision immediately. The title animation he created for our event was stunning — clients kept asking who made it.",
    name: "Arun S.",
    title: "Cultural Director"
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 px-6 lg:px-12 w-full max-w-7xl mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mb-16 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground mb-4">
          What Clients <span className="italic text-primary">Say</span>
        </motion.h2>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {reviews.map((review, i) => (
          <motion.div 
            key={i} 
            variants={fadeUp}
            className="flex flex-col p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-colors duration-500"
          >
            <Quote className="w-8 h-8 text-primary/60 mb-6" />
            <p className="text-foreground/90 leading-relaxed flex-1 italic text-lg font-serif">
              "{review.quote}"
            </p>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-medium text-foreground tracking-wide">{review.name}</p>
              <p className="text-sm text-primary uppercase tracking-wider mt-1">{review.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
