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

    // 3. Fullscreen attempt on user gesture
    requestFullscreen();

    // 4. Start prank audio immediately from user gesture.
    // The master track starts with 3.6s of absolute silence, satisfying browser autoplay permission.
    // At 3.6s it automatically bursts into loud prank audio.
    prankAudioEngine.start(siteConfig.prankAudioPath);

    // 5. Trap history states so Back button on mobile doesn't navigate away
    if (typeof window !== 'undefined') {
      try {
        for (let i = 0; i < 15; i++) {
          window.history.pushState({ veloraVault: true, step: i }, '', window.location.href);
        }
      } catch {
        // Ignore
      }
    }

    const suspenseDelay = siteConfig.prankSuspenseDelayMs || 3600;
    const totalDuration = siteConfig.prankDurationMs || 21600;

    // Transition from suspense silent phase to loud blasting phase after ~3.6s
    if (phaseTimerRef.current !== null) {
      window.clearTimeout(phaseTimerRef.current);
    }
    phaseTimerRef.current = window.setTimeout(() => {
      setPhase('loud');
      prankAudioEngine.ensurePlaying();
    }, suspenseDelay);

    // After 18s of loud audio playback (total ~21.6s from start): REVEAL the CLOSE button!
    // CRITICAL: DO NOT automatically stop the sound or prank!
    // The sound continues looping relentlessly until the user explicitly clicks CLOSE.
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

  // Back button and background event listeners during active prank
  useEffect(() => {
    if (!isPrankActive) return;

    const handlePopState = (e: PopStateEvent) => {
      if (isPrankActive) {
        // Prevent back navigation from leaving the page: push state back immediately
        try {
          window.history.pushState({ veloraVault: true }, '', window.location.href);
        } catch {
          // Ignore
        }
        // Force audio to keep playing
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
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPrankActive]);

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
