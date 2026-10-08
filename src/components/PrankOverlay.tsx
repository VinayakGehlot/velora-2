import React from 'react';
import { PrankPhase } from '../hooks/usePrankMode';
import { SpeakerVisualizer } from './SpeakerVisualizer';

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
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isActive]);

  if (!isActive) return null;

  const blockBackgroundTouch = (e: React.SyntheticEvent) => {
    if (!canDismiss) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      onPointerDown={blockBackgroundTouch}
      onTouchStart={blockBackgroundTouch}
      onTouchMove={blockBackgroundTouch}
      onTouchEnd={blockBackgroundTouch}
      onClick={blockBackgroundTouch}
      onContextMenu={blockBackgroundTouch}
      className="fixed inset-0 z-[999999] w-screen h-[100dvh] overflow-hidden select-none pointer-events-auto cursor-none touch-none animate-red-blue-flash"
    >
      {/* Center Screen: Ultra-Clean, Blank Red & Blue Flashing Page with Vibrating Speaker */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-40">
        <SpeakerVisualizer phase={phase} />

        {/* Professional 'CLOSE' button ONLY appears strictly after 10 seconds (canDismiss) */}
        {canDismiss && (
          <div className="mt-10 flex flex-col items-center gap-2.5 animate-in fade-in zoom-in-95 duration-300 pointer-events-auto">
            <button
              type="button"
              onClick={onDismiss}
              className="py-3.5 px-14 text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-black bg-white hover:bg-neutral-100 shadow-[0_0_50px_rgba(255,255,255,0.95)] active:scale-95 transition-all rounded-full cursor-pointer min-h-[50px] border border-white"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
