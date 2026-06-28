import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayTextTopRef = useRef<HTMLParagraphElement>(null);
  const overlayTextCenter1Ref = useRef<HTMLSpanElement>(null);
  const overlayTextCenter2Ref = useRef<HTMLSpanElement>(null);
  const overlayTextBottomRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in the dark overlay slightly to reveal video
      tl.to(overlayRef.current, {
        opacity: 0.35,
        duration: 2,
        ease: 'power2.inOut',
      }, 0.5);

      // Stagger text reveal
      tl.fromTo([
        overlayTextTopRef.current,
        overlayTextCenter1Ref.current,
        overlayTextCenter2Ref.current,
        overlayTextBottomRef.current,
        buttonRef.current
      ], {
        opacity: 0,
        y: 40,
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
      }, 1);

      tl.fromTo(scrollIndicatorRef.current, {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 1.5,
      }, 2.5);
    }, heroRef);

    return () => ctx.revert();
  }, []);

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
    <section ref={heroRef} id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/Sana_Day 2.mp4"
      />

      {/* Dark Overlay for Readability */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black z-0 opacity-100 pointer-events-none" 
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-between pt-32 pb-12 pointer-events-none">
        
        {/* Top: Small uppercase text and mute button */}
        <div className="flex justify-between items-start pointer-events-auto w-full">
          <p ref={overlayTextTopRef} className="uppercase tracking-[0.2em] text-[11px] sm:text-xs text-foreground/80 font-mono opacity-0">
            Video Editor<br />
            Motion Designer<br />
            Visual Storyteller
          </p>

          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-foreground hover:text-background transition-all duration-500 cursor-pointer text-foreground/80"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Center: Very large editorial typography */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-16 pointer-events-auto">
          <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] text-foreground leading-[1] tracking-tight mb-8">
            <span ref={overlayTextCenter1Ref} className="block opacity-0">Crafting</span>
            <span ref={overlayTextCenter2Ref} className="block italic text-foreground/80 opacity-0 ml-12 sm:ml-24">Visual Stories</span>
          </h1>

          {/* Below: Minimal paragraph introducing work */}
          <p ref={overlayTextBottomRef} className="max-w-md mx-auto text-sm sm:text-base text-foreground/70 leading-relaxed mb-12 opacity-0">
            A premium creative approach to cinematic edits, motion graphics, and visual experiences that captivate.
          </p>

          {/* Button: Minimal locomotive-inspired magnetic button */}
          <button
            ref={buttonRef}
            onClick={scrollToWorks}
            className="group relative flex items-center justify-center gap-3 px-8 py-3 border border-foreground/20 text-foreground rounded-full text-xs sm:text-sm font-medium tracking-widest uppercase overflow-hidden transition-all duration-700 ease-out hover:border-transparent opacity-0 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-foreground rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-background transition-colors duration-500">
              View Works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Bottom: Animated scroll indicator */}
        <div ref={scrollIndicatorRef} className="flex justify-center opacity-0">
          <div className="w-[1px] h-16 bg-foreground/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-[slideDown_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
