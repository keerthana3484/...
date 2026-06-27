import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

export default function Hero() {
  const scrollToWorks = () => {
    const works = document.getElementById('works');
    if (works) {
      if (window.lenis) {
        window.lenis.scrollTo(works);
      } else {
        works.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div 
        className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          variants={fadeUp}
          className="uppercase tracking-[0.3em] text-xs sm:text-sm text-primary mb-8 font-medium"
        >
          Creative Video Editor & Motion Designer
        </motion.p>
        
        <motion.h1 
          variants={fadeUp}
          className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif text-foreground leading-[1.1] tracking-tight mb-8"
        >
          <span className="block animate-shimmer bg-[linear-gradient(110deg,#E8D5B5,45%,#ffffff,55%,#E8D5B5)] bg-[length:200%_auto] bg-clip-text text-transparent">
            Cinematic
          </span>
          <span className="block italic text-foreground/90 mt-2">
            Visual Stories
          </span>
        </motion.h1>

        <motion.p 
          variants={fadeUp}
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-12"
        >
          Creating cinematic edits, motion graphics, promotional films, and visual experiences that leave a lasting impression.
        </motion.p>

        <motion.button
          variants={fadeUp}
          onClick={scrollToWorks}
          className="group flex items-center gap-3 px-8 py-4 border border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 rounded-full text-sm font-medium tracking-wide uppercase"
        >
          View My Works
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        <ChevronDown className="w-4 h-4 text-primary/70 animate-bounce" />
      </motion.div>
    </section>
  );
}
