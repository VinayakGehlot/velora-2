import { useCallback, useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { prankAudioEngine } from '../utils/audioEngine';
import { useFullscreen } from './useFullscreen';

export type PrankPhase = 'silent' | 'loud';

export function usePrankMode() {
  const [isPrankActive, setIsPrankActive] = useState<boolean>(false);
  const [canDismiss, setCanDismiss] = useState<boolean>(false);
  const [isPrankRevealed, setIsPrankRevealed] = useState<boolean>(false);
  const [phase, setPhase] = useState<PrankPhase>('silent');
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const wakeLockRef = useRef<unknown>(null);
  const { requestFullscreen, exitFullscreen } = useFullscreen();

  /**
   * User taps 'CLOSE' to stop audio immediately and exit the prank
   */
  const stopPrank = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Release wake lock if held
    if (wakeLockRef.current && typeof (wakeLockRef.current as { release?: () => Promise<void> }).release === 'function') {
      (wakeLockRef.current as { release: () => Promise<void> }).release().catch(() => {});
      wakeLockRef.current = null;
    }

    // Stop audio immediately
    prankAudioEngine.stop();
    exitFullscreen();

    setIsPrankActive(false);
    setCanDismiss(false);
    setIsPrankRevealed(true);
  }, [exitFullscreen]);

  const triggerPrank = useCallback(() => {
    if (isPrankActive) return;

    setIsPrankRevealed(false);
    setIsPrankActive(true);
    setCanDismiss(false);
    setPhase('silent');
    startTimeRef.current = Date.now();

    // 1. Request Screen Wake Lock so display does not sleep quickly
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      try {
        (navigator as unknown as { wakeLock: { request: (type: string) => Promise<unknown> } })
          .wakeLock.request('screen')
          .then((lock) => {
            wakeLockRef.current = lock;
          })
          .catch(() => {});
      } catch {
        // WakeLock unsupported/denied
      }
    }

    // 2. Fullscreen attempt on user gesture
    requestFullscreen();

    // 3. Audio trigger:
    // First 0 to 3.5s: 100% silent, speaker visualizer animates actively.
    // 3.5s onwards: Looping loud audio back-to-back in foreground & background.
    prankAudioEngine.start(siteConfig.prankAudioPath);

    // 4. Trap history states so Back button on mobile doesn't exit or stop audio
    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < 5; i++) {
          window.history.pushState({ veloraVault: true, step: i }, '', window.location.href);
        }
      } catch {
        // Ignore
      }
    }

    const targetDismissTime = siteConfig.prankDurationMs || 18000;

    // 5. Timeline interval check:
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed < 3500) {
        setPhase('silent');
      } else {
        setPhase('loud');
      }

      if (elapsed >= targetDismissTime) {
        setCanDismiss(true);
      }
    }, 50);

    // 6. Timer unlocks the Close button at the configured delay (e.g. 18th second)
    timerRef.current = window.setTimeout(() => {
      setCanDismiss(true);
    }, targetDismissTime);
  }, [isPrankActive, requestFullscreen]);

  const resetPrank = useCallback(() => {
    stopPrank();
    setIsPrankRevealed(false);
  }, [stopPrank]);

  // Back button and background event listeners during active prank
  useEffect(() => {
    if (!isPrankActive) return;

    const handlePopState = () => {
      if (isPrankActive) {
        // Push state back so browser does not navigate away
        try {
          window.history.pushState({ veloraVault: true }, '', window.location.href);
        } catch {
          // Ignore
        }
        // Force audio to keep blasting even if back was pressed
        prankAudioEngine.ensurePlaying();
      }
    };

    const handleVisibility = () => {
      if (isPrankActive) {
        prankAudioEngine.ensurePlaying();
      }
    };

    const handlePageHide = () => {
      if (isPrankActive) {
        prankAudioEngine.ensurePlaying();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPrankActive && !canDismiss) {
        prankAudioEngine.ensurePlaying();
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPrankActive, canDismiss]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      prankAudioEngine.stop();
    };
  }, []);

  return {
    isPrankActive,
    canDismiss,
    isPrankRevealed,
    phase,
    triggerPrank,
    stopPrank,
    resetPrank,
  };
}
