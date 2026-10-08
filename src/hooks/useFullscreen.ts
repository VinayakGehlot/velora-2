import { useCallback, useState } from 'react';

interface FullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
}

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const requestFullscreen = useCallback(async (): Promise<boolean> => {
    if (typeof document === 'undefined') return false;
    const docEl = document.documentElement as FullscreenElement;

    try {
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
        setIsFullscreen(true);
        return true;
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
        setIsFullscreen(true);
        return true;
      } else if (docEl.mozRequestFullScreen) {
        await docEl.mozRequestFullScreen();
        setIsFullscreen(true);
        return true;
      } else if (docEl.msRequestFullscreen) {
        await docEl.msRequestFullscreen();
        setIsFullscreen(true);
        return true;
      }
    } catch {
      // Browsers often reject if not allowed or in iframe; gracefully continue in full viewport
    }
    return false;
  }, []);

  const exitFullscreen = useCallback(async (): Promise<void> => {
    if (typeof document === 'undefined') return;
    const doc = document as FullscreenDocument;

    try {
      const activeElement = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;
      if (activeElement) {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch {
      // Exit fullscreen errors ignored
    } finally {
      setIsFullscreen(false);
    }
  }, []);

  return { isFullscreen, requestFullscreen, exitFullscreen };
}
