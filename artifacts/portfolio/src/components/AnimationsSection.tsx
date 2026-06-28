import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoCard from './VideoCard';
import { twoDAnimations, titleAnimations, Motionposter, AnimationItem } from '../data/animationsData';

gsap.registerPlugin(ScrollTrigger);

function HorizontalRow({ items }: { items: AnimationItem[] }) {
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
        {items.map((item) => (
          <div key={item.id} className="h-full flex-shrink-0">
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
  );
}

export default function AnimationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Header
      if (headerRef.current) {
        const headerChildren = headerRef.current.children;
        gsap.fromTo(headerChildren, {
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

      // Animate Rows
      if (rowsRef.current) {
        const rows = rowsRef.current.children;
        gsap.fromTo(rows, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rowsRef.current,
            start: 'top 85%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="animations" className="py-32 sm:py-40 w-full max-w-7xl mx-auto px-6 border-t border-white/5">
      <div ref={headerRef} className="mb-24">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-foreground mb-6 tracking-tight opacity-0">
          Motion <span className="italic text-foreground/60">Graphics</span>
        </h2>
        <p className="text-foreground/60 text-lg sm:text-xl font-light opacity-0">
          2D animations, title sequences, and kinetic typography.
        </p>
      </div>

      <div ref={rowsRef} className="space-y-24">
        <div className="opacity-0">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-8 font-medium">2D Animation</h3>
          <HorizontalRow items={twoDAnimations} />
        </div>

        <div className="opacity-0">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-8 font-medium">Title Animations</h3>
          <HorizontalRow items={titleAnimations} />
        </div>

        <div className="opacity-0">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-8 font-medium">Text Animations</h3>
          <HorizontalRow items={Motionposter} />
        </div>
      </div>
    </section>
  );
}
