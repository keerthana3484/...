import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PosterItem } from '../data/postersData';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  poster: PosterItem | null;
}

export default function Lightbox({ isOpen, onClose, onNext, onPrev, poster }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && poster && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-12"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-muted-foreground hover:text-background transition-colors rounded-full hover:bg-foreground duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-12 p-4 text-muted-foreground hover:text-background transition-colors rounded-full hover:bg-foreground duration-300"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-12 p-4 text-muted-foreground hover:text-background transition-colors rounded-full hover:bg-foreground duration-300"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Poster */}
          <motion.div
            key={poster.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-h-full w-full max-w-2xl aspect-[3/4] rounded-lg overflow-hidden border border-card-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {poster.src ? (
              <img
                src={poster.src}
                alt={poster.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: poster.gradient }} />
            )}

            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-3xl md:text-4xl font-serif text-white font-bold">{poster.title}</h2>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-primary/90 font-mono">{poster.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
