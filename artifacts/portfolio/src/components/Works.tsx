import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { worksData } from '../data/worksData';
import VideoCard from './VideoCard';

gsap.registerPlugin(ScrollTrigger);

type Category = keyof typeof worksData;

function HorizontalRow({ items }: { items: typeof worksData[Category] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 4);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [items]);

  return (
    <div className="relative">
      <div ref={rowRef} className="scroll-row scroll-row-video">
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
      {overflows && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent" />
      )}
    </div>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const categories = Object.keys(worksData) as Category[];
  const [activeTab, setActiveTab] = useState<Category>(categories[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const children = headerRef.current.children;
        gsap.fromTo(children, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="works" className="py-32 sm:py-40 w-full max-w-7xl mx-auto px-6 border-t border-white/5">
      <div ref={headerRef} className="mb-20">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-foreground mb-12 tracking-tight opacity-0">
          Selected <span className="italic text-foreground/60">Works</span>
        </h2>

        <div className="flex flex-wrap gap-3 opacity-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`group relative px-6 py-2.5 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase rounded-full border overflow-hidden transition-all duration-500 cursor-pointer ${
                activeTab === cat
                  ? 'bg-foreground text-background border-transparent'
                  : 'bg-transparent text-foreground/60 border-white/10 hover:border-transparent'
              }`}
            >
              {activeTab !== cat && (
                <span className="absolute inset-0 w-full h-full bg-foreground rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
              )}
              <span className={`relative z-10 ${activeTab === cat ? '' : 'group-hover:text-background'} transition-colors duration-500`}>
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HorizontalRow items={worksData[activeTab]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
