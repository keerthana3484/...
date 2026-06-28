import { Eye } from 'lucide-react';
import { PosterItem } from '../data/postersData';

interface PosterCardProps extends Omit<PosterItem, 'id'> {
  onClick: () => void;
}

export default function PosterCard({ title, category, gradient, src, onClick }: PosterCardProps) {
  return (
    <div
      className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border border-white/10"
      onClick={onClick}
    >
      {/* Real image or inline gradient placeholder */}
      {src ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: gradient }}
        />
      )}

      {/* Bronze shimmer on hover */}
      <div className="absolute inset-0 bg-[hsl(38_60%_55%/0)] group-hover:bg-[hsl(38_60%_55%/0.12)] transition-colors duration-500" />

      {/* Bottom gradient scrim for text legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Title & category — always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="text-lg font-serif text-white font-bold drop-shadow-md">{title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-[hsl(38_60%_65%)] font-mono">{category}</p>
      </div>

      {/* View icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Eye className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
