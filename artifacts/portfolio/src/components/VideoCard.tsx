import { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import VideoFullscreenModal from './VideoFullscreenModal';

interface VideoCardProps {
  title: string;
  category: string;
  type: '9:16' | '16:9' | '1:1';
  src?: string;
  thumbnail?: string;
  previewStart?: number;
}

export default function VideoCard({ title, category, type, src, thumbnail, previewStart }: VideoCardProps) {
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
      videoRef.current.currentTime = previewStart ?? 3.0;
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
      videoRef.current.currentTime = previewStart ?? 3.0;
    }
  };

  return (
    <>
      <div
        className={`group relative h-full overflow-hidden rounded-sm bg-card border border-white/5 cursor-pointer transition-transform duration-700 hover:scale-[1.01] ${isPortrait ? 'aspect-[9/16]' : isSquare ? 'aspect-square' : 'aspect-video'} flex flex-col`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src ? `${src}#t=${previewStart ?? 3.0}` : undefined}
            poster={thumbnail}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-card to-muted z-0" />
        )}

        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-700 ${playing ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-700 z-10" />

        {(!playing || !src) && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 scale-95 group-hover:scale-100">
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center transition-transform duration-500">
              <Play className="w-6 h-6 text-background ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {playing && src && !isFullscreen && (
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-foreground hover:text-background"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        )}

        <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-3">{title}</h3>
            <span className="inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
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
