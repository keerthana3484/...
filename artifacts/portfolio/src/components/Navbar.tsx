import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Animations', href: '#animations' },
  { label: 'VFX', href: '#vfx' },
  { label: 'Posters', href: '#posters' },
  { label: 'Reviews', href: '#reviews' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element as HTMLElement);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md py-4 border-b border-white/5' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-3 items-center">
          
          {/* Left: Logo */}
          <div 
            className="text-lg font-medium text-foreground cursor-pointer tracking-wider flex items-center"
            onClick={() => scrollTo('#hero')}
          >
            Ajay Tharendra
          </div>

          {/* Center: Navigation (Desktop) */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-xs uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: CTA Button & Mobile Menu Toggle */}
          <div className="flex justify-end items-center gap-4">
            
            {/* CTA Button (Desktop) */}
            <button 
              onClick={() => scrollTo('#contact')}
              className="hidden lg:flex group relative items-center justify-center px-6 py-2 border border-foreground/20 text-foreground rounded-full text-xs font-medium tracking-widest uppercase overflow-hidden transition-all duration-700 ease-out hover:border-transparent cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-foreground rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
              <span className="relative z-10 group-hover:text-background transition-colors duration-500">
                Let's Talk
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-foreground p-2 rounded-full border border-foreground/10 hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background/98 backdrop-blur-xl z-[100] transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button 
              className="p-3 text-foreground rounded-full border border-foreground/10 hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-8">
            {LINKS.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
                transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-serif text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
              transition={{ delay: 0.1 * LINKS.length, duration: 0.5, ease: 'easeOut' }}
              onClick={() => scrollTo('#contact')}
              className="mt-8 px-8 py-3 border border-foreground/20 text-foreground rounded-full uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Let's Talk
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
