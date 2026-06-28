import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@jaysthetics._",
    href: "https://instagram.com/jaysthetics._"
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    handle: "+91 95006 54475",
    href: "https://wa.me/919500654475"
  },
  {
    icon: Mail,
    label: "Email",
    handle: "ajaytharendra@gmail.com",
    href: "mailto:ajaytharendra@gmail.com"
  }
];

export default function Contact() {
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
    <section ref={sectionRef} id="contact" className="py-32 sm:py-40 px-6 w-full max-w-7xl mx-auto border-t border-white/5">
      <div ref={headerRef} className="mb-24 text-center">
        <h2 className="text-5xl sm:text-7xl lg:text-9xl font-serif text-foreground mb-8 tracking-tight opacity-0">
          Let's create <br className="sm:hidden" />
          <span className="italic text-foreground/60">something</span>
        </h2>
        <p className="text-foreground/50 text-lg sm:text-xl font-light opacity-0">
          Available for freelance projects, creative collaborations, and more.
        </p>
      </div>

      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {contacts.map((contact, i) => (
          <a
            key={i}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center p-12 rounded-sm bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-700 opacity-0"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-foreground group-hover:text-background transition-all duration-500 mb-8">
              <contact.icon className="w-6 h-6 text-foreground/80 group-hover:text-background transition-colors" />
            </div>
            <h3 className="text-lg font-medium text-foreground tracking-wide mb-3">{contact.label}</h3>
            <p className="text-foreground/50 text-sm tracking-wide group-hover:text-foreground transition-colors">{contact.handle}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
