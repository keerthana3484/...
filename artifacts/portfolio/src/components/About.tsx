import { useEffect, useRef } from 'react';
import { 
  Video, 
  Wand2, 
  MonitorPlay, 
  Sparkles, 
  Briefcase 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Video, label: 'Video Editing' },
  { icon: Wand2, label: 'Motion Graphics' },
  { icon: MonitorPlay, label: 'Promotional Videos' },
  { icon: Sparkles, label: 'AI-Assisted Creative' },
  { icon: Briefcase, label: 'Branding Content' }
];

const software = ['After Effects', 'Premiere Pro', 'Blender', 'Photoshop', 'Illustrator'];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Avatar fade up
      gsap.fromTo(avatarRef.current, {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: avatarRef.current,
          start: 'top 85%',
        }
      });

      // Content staggered fade up
      if (contentRef.current) {
        const children = contentRef.current.children;
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
            trigger: contentRef.current,
            start: 'top 80%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 sm:py-40 px-6 w-full max-w-7xl mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-32 items-center">
        
        {/* Avatar Side */}
        <div 
          ref={avatarRef}
          className="relative w-full max-w-md mx-auto aspect-[4/5] overflow-hidden opacity-0"
        >
          {/* Subtle Image Masking / Background Frame */}
          <div className="absolute inset-0 bg-card rounded-sm flex items-center justify-center overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-background to-card-border/20 opacity-50" />
            <h2 className="text-[12rem] font-serif text-white/5 z-0 select-none tracking-tighter">AJ</h2>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className="flex flex-col">
          <div className="mb-10 opacity-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 font-medium mb-6 block">
              The Editor
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-foreground mb-6 leading-tight tracking-tight">
              Ajay Tharendra
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70 tracking-wide uppercase">
              <span>Creative Video Editor</span>
              <span className="w-1 h-1 rounded-full bg-foreground/20 hidden sm:block" />
              <span>Motion Designer</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed mb-16 max-w-2xl font-light opacity-0">
            I'm Ajay Tharendra, a student freelancer passionate about transforming ideas into cinematic visual experiences. I specialize in video editing, motion graphics, promotional films, AI-assisted creative workflows, and brand-focused content that captures attention and tells compelling stories. From concert promotions and cultural events to social media campaigns and title animations, I enjoy blending creativity with precision to create work that feels polished, engaging, and memorable.
          </p>

          <div className="mb-16 opacity-0">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6 font-medium">Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-colors">
                  <skill.icon className="w-3.5 h-3.5 text-foreground/70" />
                  <span className="text-xs tracking-wider uppercase text-foreground/80">{skill.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="opacity-0">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6 font-medium">Software Stack</h3>
            <div className="flex flex-wrap gap-2">
              {software.map((item, idx) => (
                <span key={idx} className="px-4 py-2 text-xs tracking-wider uppercase text-foreground/60 bg-transparent border border-white/5 rounded-full hover:text-foreground transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
