import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), video[controls], [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EASE_OUT = [0, 0, 0.2, 1] as const;
const DURATION = 0.3;

/** Viewport padding so the video never touches screen edges */
const VIEWPORT_PAD_X = 48;
const VIEWPORT_PAD_Y = 48;
/** Reserve space for the native browser control bar below the video frame */
const CONTROL_BAR_RESERVE = 52;

/**
 * Compute the display width for the video element.
 * Only width is set in CSS — height stays `auto` so native controls
 * render at full width below the video frame (not squeezed inside it).
 */
function fitVideoWidth(naturalWidth: number, naturalHeight: number): number {
  const maxW = window.innerWidth - VIEWPORT_PAD_X;
  const maxH = window.innerHeight - VIEWPORT_PAD_Y - CONTROL_BAR_RESERVE;
  const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight);
  return naturalWidth * scale;
}

interface VideoFullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
  poster?: string;
  startTime?: number;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
}

export default function VideoFullscreenModal({
  isOpen,
  onClose,
  src,
  title,
  poster,
  startTime = 0,
  muted,
  onMutedChange,
}: VideoFullscreenModalProps) {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [displayWidth, setDisplayWidth] = useState<number | null>(null);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  const syncDisplayWidth = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;
    setDisplayWidth(fitVideoWidth(video.videoWidth, video.videoHeight));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setDisplayWidth(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('video-fullscreen-open');
    window.dispatchEvent(new CustomEvent('video-fullscreen-change', { detail: { open: true } }));
    window.lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      if (e.key !== 'Tab' || !modalRef.current) return;

      const elements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);

      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => syncDisplayWidth();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    const focusTimer = window.setTimeout(() => {
      videoRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
      document.body.classList.remove('video-fullscreen-open');
      window.dispatchEvent(new CustomEvent('video-fullscreen-change', { detail: { open: false } }));
      window.lenis?.start();
      previousFocusRef.current?.focus();
    };
  }, [isOpen, close, syncDisplayWidth]);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = startTime;
    video.muted = muted;
    video.play().catch(() => {});
  }, [isOpen, src, startTime]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const handleLoadedMetadata = () => {
    syncDisplayWidth();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMutedChange(!muted);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION, ease: EASE_OUT }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 cursor-default"
          onClick={close}
        >
          <span id={titleId} className="sr-only">
            {title} — fullscreen video player
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2.5 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Close fullscreen video"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, filter: 'blur(6px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0.95, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: DURATION, ease: EASE_OUT }}
            className="relative shrink-0"
            style={{
              willChange: 'transform, opacity, filter',
              width: displayWidth ? `${displayWidth}px` : 0,
              opacity: displayWidth ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              tabIndex={0}
              controlsList="nofullscreen noremoteplayback"
              disablePictureInPicture
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleLoadedMetadata}
              className="block w-full h-auto bg-black shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
              aria-label={title}
            />

            {displayWidth && (
              <button
                type="button"
                onClick={toggleMute}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white hover:bg-black/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                aria-pressed={!muted}
              >
                {muted ? (
                  <VolumeX className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
