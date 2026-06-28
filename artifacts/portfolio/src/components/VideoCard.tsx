import { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import VideoFullscreenModal from './VideoFullscreenModal';

interface VideoCardProps {
  title: string;
  category: string;
  type: '9:16' | '16:9' | '1:1';
  src?: string;
  thumbnail?: string;
}

export default function VideoCard({ title, category, type, src, thumbnail }: VideoCardProps) {
  const isPortrait = type === '9:16';
  const isSquare = type === '1:1';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenStartTime, setFullscreenStartTime] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const handleMouseEnter = () => {
    if (src && videoRef.current && !isFullscreen) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (src && videoRef.current && !isFullscreen) {
      videoRef.current.pause();
      videoRef.current.currentTime = 1.5;
      setPlaying(false);
      setMuted(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  const handleCardClick = () => {
    if (src && videoRef.current) {
      setFullscreenStartTime(videoRef.current.currentTime);
      videoRef.current.pause();
      setPlaying(false);
      setMuted(false);
      setIsFullscreen(true);
    }
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setMuted(true);
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 1.5;
    }
  };

  return (
    <>
      <div
        className={`group relative h-full overflow-hidden rounded-2xl bg-card border border-card-border cursor-pointer transition-transform duration-500 hover:scale-[1.02] ${isPortrait ? 'aspect-[9/16]' : isSquare ? 'aspect-square' : 'aspect-video'} flex flex-col`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src ? `${src}#t=1.5` : undefined}
            poster={thumbnail}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-card to-muted animate-shimmer z-0" />
        )}

        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />

        {(!playing || !src) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 scale-90 group-hover:scale-100">
            <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-primary/30">
              <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {playing && src && !isFullscreen && (
          <button
            onClick={toggleMute}
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-background/70 backdrop-blur-md flex items-center justify-center border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/90 hover:border-primary/50"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-primary" />
            ) : (
              <Volume2 className="w-4 h-4 text-primary" />
            )}
          </button>
        )}

        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-xl font-serif text-foreground mb-2">{title}</h3>
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary border border-primary/30 rounded-full bg-background/50 backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
      </div>

      {src && (
        <VideoFullscreenModal
          isOpen={isFullscreen}
          onClose={handleCloseFullscreen}
          src={src}
          title={title}
          poster={thumbnail}
          startTime={fullscreenStartTime}
          muted={muted}
          onMutedChange={setMuted}
        />
      )}
    </>
  );
}
