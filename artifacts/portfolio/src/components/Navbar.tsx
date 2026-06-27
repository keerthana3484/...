import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Home', href: '#hero' },
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-border/50' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div 
            className="text-2xl font-serif font-bold text-primary cursor-pointer tracking-wide"
            onClick={() => scrollTo('#hero')}
          >
            Ajay Tharendra
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6">
              {LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => scrollTo('#contact')}
              className="px-5 py-2 text-sm border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full font-medium"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background/98 backdrop-blur-xl z-[100] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button 
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-8">
            {LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-serif text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('#contact')}
              className="mt-4 px-8 py-3 text-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full font-medium"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
