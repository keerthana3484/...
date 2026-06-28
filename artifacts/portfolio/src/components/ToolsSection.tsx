import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    name: 'After Effects',
    description: 'Motion Graphics & VFX',
    logo: '/after-effects.png',
  },
  {
    name: 'Premiere Pro',
    description: 'Video Editing & SFX',
    logo: '/premiere-pro.png',
  },
  {
    name: 'Blender',
    description: '3D Modeling & VFX',
    logo: '/blender.png',
  },
  {
    name: 'Photoshop',
    description: 'Design & Compositing',
    logo: '/photoshop.png',
  },
  {
    name: 'Illustrator',
    description: 'Vector Graphics & Assets',
    logo: '/illustrator.png',
  },
];

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children, {
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

      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children, {
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
    <section ref={sectionRef} id="tools" className="py-32 sm:py-40 px-6 w-full max-w-7xl mx-auto border-t border-white/5">
      <div ref={headerRef} className="mb-20">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-foreground mb-6 tracking-tight opacity-0">
          Tools I <span className="italic text-foreground/60">Use</span>
        </h2>
        <p className="text-foreground/60 text-lg sm:text-xl font-light opacity-0">
          The software behind every frame, effect, and visual story.
        </p>
      </div>

      <div 
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
      >
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-sm cursor-pointer border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 opacity-0"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-110">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-full h-full object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>

            <div className="text-center">
              <p className="text-foreground/90 text-sm sm:text-base font-medium tracking-wide">
                {tool.name}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-2">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
