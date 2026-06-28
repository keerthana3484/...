import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        gsap.fromTo(gridRef.current.children, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
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
    <section ref={sectionRef} id="reviews" className="py-32 sm:py-40 px-6 w-full max-w-7xl mx-auto border-t border-white/5">
      <div ref={headerRef} className="mb-20 opacity-0">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-foreground mb-6 tracking-tight">
          Client <span className="italic text-foreground/60">Stories</span>
        </h2>
      </div>

      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {reviews.map((review, i) => (
          <div 
            key={i} 
            className="flex flex-col p-8 sm:p-10 rounded-sm bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors duration-500 opacity-0"
          >
            <Quote className="w-8 h-8 text-foreground/20 mb-8" />
            <p className="text-foreground/80 leading-relaxed flex-1 text-lg sm:text-xl font-serif italic font-light tracking-wide">
              "{review.quote}"
            </p>
            <div className="mt-10 pt-6 border-t border-white/5">
              <p className="font-medium text-foreground text-sm tracking-wide">{review.name}</p>
              <p className="text-[10px] text-foreground/50 uppercase tracking-widest mt-1.5">{review.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
