import { Eye } from 'lucide-react';

interface PosterCardProps {
  title: string;
  category: string;
  gradient: string;
  onClick: () => void;
}

export default function PosterCard({ title, category, gradient, onClick }: PosterCardProps) {
  return (
    <div 
      className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border border-card-border"
      onClick={onClick}
    >
      {/* Gradient placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Soft bronze overlay on hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-500 mix-blend-overlay" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        <h3 className="text-2xl font-serif text-white font-bold opacity-50 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">{title}</h3>
        <p className="mt-2 text-sm uppercase tracking-widest text-primary/70 group-hover:text-primary transition-colors duration-300 font-medium">{category}</p>
      </div>

      {/* View Icon */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-primary/30">
          <Eye className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
