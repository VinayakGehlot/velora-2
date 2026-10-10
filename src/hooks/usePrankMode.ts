import { useCallback, useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { prankAudioEngine } from '../utils/audioEngine';
import { useFullscreen } from './useFullscreen';
import { initPostInteractionAds } from '../utils/adManager';

export type PrankPhase = 'silent' | 'loud';

export function usePrankMode() {
  const [isPrankActive, setIsPrankActive] = useState<boolean>(false);
  const [canDismiss, setCanDismiss] = useState<boolean>(false);
  const [isPrankRevealed, setIsPrankRevealed] = useState<boolean>(false);
  const [phase, setPhase] = useState<PrankPhase>('silent');
  const timerRef = useRef<number | null>(null);
  const phaseTimerRef = useRef<number | null>(null);
  const wakeLockRef = useRef<unknown>(null);
  const { requestFullscreen, exitFullscreen } = useFullscreen();

  /**
   * Only called when the user EXPLICITLY clicks the 'CLOSE' button!
   * The audio will NEVER stop automatically.
   *
   * 1. Stops prank audio immediately
   * 2. Stops lighting and visual effects
   * 3. Exits fullscreen
   * 4. Reveals the 'GOT YOU 😈' completion modal with Native Ad and CTAs
   */
  const stopPrank = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (phaseTimerRef.current !== null) {
      window.clearTimeout(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }

    // Release wake lock if held
    if (wakeLockRef.current && typeof (wakeLockRef.current as { release?: () => Promise<void> }).release === 'function') {
      (wakeLockRef.current as { release: () => Promise<void> }).release().catch(() => {});
      wakeLockRef.current = null;
    }

    // 1. Explicit user tap on CLOSE: Stop prank audio
    prankAudioEngine.stop();
    exitFullscreen();

    // 2. Stop intense lighting & visual prank effects
    setIsPrankActive(false);
    setCanDismiss(false);

    // 3. Reveal completion screen with Native Ad and CTAs
    setIsPrankRevealed(true);
  }, [exitFullscreen]);

  const triggerPrank = useCallback(() => {
    if (isPrankActive) return;

    // 1. Initialize advertisement integrations without blocking the prank
    initPostInteractionAds();

    setIsPrankRevealed(false);
    setIsPrankActive(true);
    setCanDismiss(false);
    setPhase('silent');

    const suspenseDelay = siteConfig.prankSuspenseDelayMs ?? 3000;
    const totalDuration = siteConfig.prankDurationMs || 19000;

    // 2. Request Screen Wake Lock so display does not sleep
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

    // 3. Pre-warm and start prank audio synchronously in user gesture
    prankAudioEngine.start(siteConfig.prankAudioPath);

    // 4. Fullscreen attempt on user gesture
    requestFullscreen();

    // 5. Trap history states deeply (60+ steps) so Back button/gestures on mobile cannot leave
    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < 60; i++) {
          window.history.pushState({ veloraVault: true, step: i }, '', window.location.href);
        }
      } catch {
        // Ignore
      }
    }

    // 6. Transition to loud phase, screen flashing, and vibration at exactly 3 seconds
    if (phaseTimerRef.current !== null) {
      window.clearTimeout(phaseTimerRef.current);
    }
    phaseTimerRef.current = window.setTimeout(() => {
      setPhase('loud');
      prankAudioEngine.ensurePlaying();
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([250, 100, 250, 100, 400]);
        } catch {
          // Ignore
        }
      }
    }, suspenseDelay);

    // After total duration: REVEAL the CLOSE button!
    // The sound continues looping until the user explicitly clicks CLOSE.
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setCanDismiss(true);
      prankAudioEngine.ensurePlaying();
    }, totalDuration);
  }, [isPrankActive, requestFullscreen]);

  const resetPrank = useCallback(() => {
    stopPrank();
    setIsPrankRevealed(false);
  }, [stopPrank]);

  // Deep anti-back trap and persistent background audio listeners during active prank
  useEffect(() => {
    if (!isPrankActive) return;

    // Periodic watchdog to trap history states and vibrate phone
    const trapInterval = window.setInterval(() => {
      if (isPrankActive) {
        try {
          window.history.pushState({ veloraVault: true }, '', window.location.href);
        } catch {
          // Ignore
        }
        prankAudioEngine.ensurePlaying();

        if (phase === 'loud' && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([200, 80, 250]);
          } catch {
            // Ignore
          }
        }
      }
    }, 2000);

    const handlePopState = (e: PopStateEvent) => {
      if (isPrankActive) {
        // Aggressively prevent back navigation: immediately re-push states
        try {
          for (let i = 0; i < 10; i++) {
            window.history.pushState({ veloraVault: true, step: i }, '', window.location.href);
          }
        } catch {
          // Ignore
        }
        requestFullscreen();
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

    const handleFocus = () => {
      if (isPrankActive) {
        prankAudioEngine.ensurePlaying();
        requestFullscreen();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPrankActive) {
        prankAudioEngine.ensurePlaying();
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handleFocus);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.clearInterval(trapInterval);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handleFocus);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPrankActive, phase, requestFullscreen]);

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
