import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  category: string;
  type: '9:16' | '16:9';
  src?: string;
  thumbnail?: string;
}

export default function VideoCard({ title, category, type, src, thumbnail }: VideoCardProps) {
  const isPortrait = type === '9:16';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (src && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (src && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl bg-card border border-card-border cursor-pointer transition-transform duration-500 hover:scale-[1.02] ${isPortrait ? 'aspect-[9/16]' : 'aspect-video'} flex flex-col`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video element */}
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={thumbnail}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        /* Placeholder shimmer when no video is set */
        <div className="absolute inset-0 bg-gradient-to-br from-card to-muted animate-shimmer z-0" />
      )}

      {/* Thumbnail overlay (fades out when playing) */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}
        />
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />

      {/* Play icon (shown when no video is playing) */}
      {(!playing || !src) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 scale-90 group-hover:scale-100">
          <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-primary/30">
            <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Title & category */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl font-serif text-foreground mb-2">{title}</h3>
          <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary border border-primary/30 rounded-full bg-background/50 backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
