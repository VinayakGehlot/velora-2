import React from 'react';
import { PrankPhase } from '../hooks/usePrankMode';
import { SpeakerVisualizer } from './SpeakerVisualizer';
import { prankAudioEngine } from '../utils/audioEngine';

interface PrankOverlayProps {
  isActive: boolean;
  phase: PrankPhase;
  canDismiss: boolean;
  onDismiss: () => void;
  onShare?: () => void;
}

export const PrankOverlay: React.FC<PrankOverlayProps> = ({
  isActive,
  phase,
  canDismiss,
  onDismiss,
}) => {
  React.useEffect(() => {
    if (isActive) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      const originalOverscroll = document.body.style.overscrollBehavior;
      const originalHtmlOverscroll = document.documentElement.style.overscrollBehavior;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overscrollBehavior = 'none';

      // Block touch gestures that trigger edge-swipe back navigation on iOS Safari and Android
      const preventNavigationSwipes = (e: TouchEvent) => {
        // Allow interaction with the CLOSE button if unlocked
        const target = e.target as HTMLElement | null;
        if (target && target.closest('button')) {
          return;
        }
        if (e.cancelable) {
          e.preventDefault();
        }
      };

      window.addEventListener('touchmove', preventNavigationSwipes, { passive: false });
      window.addEventListener('touchstart', preventNavigationSwipes, { passive: false });

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        document.body.style.overscrollBehavior = originalOverscroll;
        document.documentElement.style.overscrollBehavior = originalHtmlOverscroll;
        window.removeEventListener('touchmove', preventNavigationSwipes);
        window.removeEventListener('touchstart', preventNavigationSwipes);
      };
    }
  }, [isActive]);

  if (!isActive) return null;

  /**
   * Screen tap handler:
   * When user taps or clicks anywhere on screen while prank is active,
   * we ensure audio continues playing uninhibited.
   * We prevent bubbling that might trigger navigation or browser gestures.
   */
  const handleOverlayInteraction = (e: React.SyntheticEvent) => {
    // Keep sound playing on any screen touch
    prankAudioEngine.ensurePlaying();

    // Prevent background clicks or gestures from navigating back
    e.stopPropagation();
  };

  return (
    <div
      onPointerDown={handleOverlayInteraction}
      onTouchStart={handleOverlayInteraction}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={handleOverlayInteraction}
      onClick={handleOverlayInteraction}
      onContextMenu={(e) => e.preventDefault()}
      className={`fixed inset-0 z-[999999] w-screen h-[100dvh] overflow-hidden select-none pointer-events-auto cursor-default transition-colors duration-300 ${
        phase === 'loud' ? 'animate-red-blue-flash' : 'bg-black'
      }`}
    >
      {/* Four Extreme Corner Connected Frame Elements (Strictly at top:0, left:0; top:0, right:0; bottom:0, left:0; bottom:0, right:0) */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Connected High-Tech Perimeter Frame Lines */}
        <div className="absolute inset-2 sm:inset-4 border border-white/20 pointer-events-none" />

        {/* Corner 1: top: 0; left: 0; */}
        <div
          style={{ top: 0, left: 0 }}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-l-4 border-white pointer-events-none shadow-[0_0_25px_rgba(255,255,255,0.95)]"
        >
          <div className="w-2.5 h-2.5 bg-white m-1 shadow-[0_0_8px_rgba(255,255,255,1)]" />
        </div>

        {/* Corner 2: top: 0; right: 0; */}
        <div
          style={{ top: 0, right: 0 }}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-r-4 border-white pointer-events-none shadow-[0_0_25px_rgba(255,255,255,0.95)] flex justify-end"
        >
          <div className="w-2.5 h-2.5 bg-white m-1 shadow-[0_0_8px_rgba(255,255,255,1)]" />
        </div>

        {/* Corner 3: bottom: 0; left: 0; */}
        <div
          style={{ bottom: 0, left: 0 }}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-l-4 border-white pointer-events-none shadow-[0_0_25px_rgba(255,255,255,0.95)] flex items-end"
        >
          <div className="w-2.5 h-2.5 bg-white m-1 shadow-[0_0_8px_rgba(255,255,255,1)]" />
        </div>

        {/* Corner 4: bottom: 0; right: 0; */}
        <div
          style={{ bottom: 0, right: 0 }}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-r-4 border-white pointer-events-none shadow-[0_0_25px_rgba(255,255,255,0.95)] flex items-end justify-end"
        >
          <div className="w-2.5 h-2.5 bg-white m-1 shadow-[0_0_8px_rgba(255,255,255,1)]" />
        </div>
      </div>

      {/* Center Screen: Vibrating Speaker + Flashing Lighting */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-40 pointer-events-none">
        <SpeakerVisualizer phase={phase} />

        {/* 3 to 4 seconds Suspense Indication before loud explosion */}
        {phase === 'silent' && (
          <div className="mt-8 flex flex-col items-center gap-2 animate-pulse text-center">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-[11px] font-mono tracking-widest text-neutral-300 uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>SYNCHRONIZING AUDIO ARCHIVE...</span>
            </div>
          </div>
        )}

        {/* Close button ONLY appears once unlocked (at 18 seconds of loud sound) */}
        {/* Sound continues looping even when CLOSE button is visible, until user explicitly touches CLOSE */}
        {/* Touching the red CLOSE button triggers the pop-up window and completes the prank */}
        {canDismiss && (
          <div className="mt-10 flex flex-col items-center gap-2.5 animate-in fade-in zoom-in-95 duration-500 pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="py-4 px-16 text-sm sm:text-base font-extrabold tracking-[0.25em] uppercase text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 shadow-[0_0_60px_rgba(239,68,68,1)] active:scale-95 transition-all rounded-full cursor-pointer min-h-[54px] border-2 border-red-300 ring-4 ring-red-500/50 animate-pulse"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
