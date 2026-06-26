import { Eye } from 'lucide-react';
import { PosterItem } from '../data/postersData';

interface PosterCardProps extends Omit<PosterItem, 'id'> {
  onClick: () => void;
}

export default function PosterCard({ title, category, gradient, src, onClick }: PosterCardProps) {
  return (
    <div
      className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border border-card-border"
      onClick={onClick}
    >
      {/* Real image if provided, else gradient placeholder */}
      {src ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
      )}

      {/* Bronze overlay on hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-500 mix-blend-overlay" />

      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Title & category */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-xl font-serif text-white font-bold drop-shadow-md">{title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors duration-300 font-medium">{category}</p>
      </div>

      {/* View icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-primary/30">
          <Eye className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
