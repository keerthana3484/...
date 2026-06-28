import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoCard from './VideoCard';
import { vfxData } from '../data/vfxData';

gsap.registerPlugin(ScrollTrigger);

export default function VFXSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowContainerRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header
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

      // Animate Row
      if (rowContainerRef.current) {
        gsap.fromTo(rowContainerRef.current, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rowContainerRef.current,
            start: 'top 85%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="vfx" className="py-32 sm:py-40 w-full max-w-7xl mx-auto px-6 border-t border-white/5">
      <div ref={headerRef} className="mb-20 opacity-0">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-foreground mb-6 tracking-tight">
          Visual <span className="italic text-foreground/60">Effects</span>
        </h2>
      </div>

      <div ref={rowContainerRef} className="opacity-0">
        <div className="relative">
          <div ref={rowRef} className="scroll-row scroll-row-video">
            {vfxData.map((item) => (
              <div
                key={item.id}
                className="h-full flex-shrink-0"
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
          {overflows && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent" />
          )}
        </div>
      </div>
    </section>
  );
}
