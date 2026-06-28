import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PosterCard from './PosterCard';
import Lightbox from './Lightbox';
import { postersData } from '../data/postersData';

gsap.registerPlugin(ScrollTrigger);

export default function PostersSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        });
      }

      if (gridRef.current) {
        const items = gridRef.current.children;
        gsap.fromTo(items, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="posters" className="py-32 sm:py-40 px-6 w-full max-w-7xl mx-auto border-t border-white/5">
      <div ref={headerRef} className="mb-20 opacity-0">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-foreground mb-6 tracking-tight">
          Poster <span className="italic text-foreground/60">Designs</span>
        </h2>
      </div>

      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {postersData.map((poster, index) => (
          <div key={poster.id} className="opacity-0">
            <PosterCard
              title={poster.title}
              category={poster.category}
              gradient={poster.gradient}
              src={poster.src}
              onClick={() => setSelectedIndex(index)}
            />
          </div>
        ))}
      </div>

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
