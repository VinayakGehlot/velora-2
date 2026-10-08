import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { PrankPhase } from '../hooks/usePrankMode';

interface SpeakerVisualizerProps {
  phase: PrankPhase;
}

export const SpeakerVisualizer: React.FC<SpeakerVisualizerProps> = ({ phase }) => {
  const [pulseTick, setPulseTick] = useState(0);
  const isLoud = phase === 'loud';

  // Rhythmic oscillation for speaker displacement
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, isLoud ? 90 : 140);

    return () => clearInterval(interval);
  }, [isLoud]);

  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Outer Sound Wave Echo Rings (Pulsing sound waves emitting outward) */}
      <div className="absolute inset-0 -m-20 sm:-m-28 flex items-center justify-center pointer-events-none">
        <div
          className={`absolute rounded-full border border-white/40 transition-transform duration-300 ${
            isLoud
              ? 'w-72 h-72 sm:w-96 sm:h-96 scale-125 opacity-90 animate-ping'
              : 'w-60 h-60 sm:w-76 sm:h-76 scale-110 opacity-60 animate-pulse'
          }`}
          style={{ animationDuration: isLoud ? '0.45s' : '0.9s' }}
        />
        <div
          className={`absolute rounded-full border border-white/30 transition-transform duration-500 ${
            isLoud
              ? 'w-84 h-84 sm:w-[440px] sm:h-[440px] scale-150 opacity-50'
              : 'w-68 h-68 sm:w-88 sm:h-88 scale-105 opacity-40 animate-pulse'
          }`}
          style={{ animationDuration: isLoud ? '0.9s' : '1.4s' }}
        />
      </div>

      {/* Main Speaker Cabinet / Enclosure */}
      <div
        className={`relative z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full flex items-center justify-center p-3.5 transition-transform duration-75 ${
          isLoud
            ? pulseTick % 2 === 0
              ? 'scale-110 shadow-[0_0_80px_rgba(255,255,255,0.95)]'
              : 'scale-95 shadow-[0_0_40px_rgba(255,255,255,0.6)]'
            : pulseTick % 2 === 0
            ? 'scale-105 shadow-[0_0_45px_rgba(255,255,255,0.7)]'
            : 'scale-98 shadow-[0_0_25px_rgba(255,255,255,0.4)]'
        } bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border-4 border-neutral-200`}
      >
        {/* Outer Metallic Ring Screws / Detail */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/40 pointer-events-none" />

        {/* Subwoofer Surround Rubber Roll */}
        <div className="relative w-38 h-38 sm:w-52 sm:h-52 rounded-full bg-neutral-950 flex items-center justify-center shadow-inner border border-neutral-700/80">
          {/* Vibrating Speaker Cone */}
          <div
            className={`w-30 h-30 sm:w-40 sm:h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/30 transition-all duration-75 ${
              isLoud
                ? 'scale-108 shadow-[inset_0_0_35px_rgba(255,255,255,0.5)]'
                : 'scale-103 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)]'
            }`}
          >
            {/* Center Dust Cap (Bouncing Center Dome) */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-neutral-700 via-neutral-800 to-black border border-white/60 shadow-xl transition-transform duration-75 ${
                isLoud
                  ? pulseTick % 2 === 0
                    ? 'scale-120'
                    : 'scale-88'
                  : pulseTick % 2 === 0
                  ? 'scale-110'
                  : 'scale-95'
              }`}
            >
              <Volume2
                className={`w-7 h-7 sm:w-9 sm:h-9 text-white transition-opacity ${
                  isLoud ? 'opacity-100 scale-110' : 'opacity-90 animate-pulse'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Sound Wave Arcs Radiating on Left & Right */}
      <div className="absolute -left-14 sm:-left-20 flex items-center gap-1.5">
        <div
          className={`w-1.5 bg-white rounded-full transition-all duration-150 ${
            isLoud
              ? pulseTick % 3 === 0
                ? 'h-20 opacity-100'
                : 'h-10 opacity-60'
              : pulseTick % 2 === 0
              ? 'h-14 opacity-80'
              : 'h-6 opacity-40'
          }`}
        />
        <div
          className={`w-1.5 bg-white rounded-full transition-all duration-150 ${
            isLoud
              ? pulseTick % 2 === 0
                ? 'h-28 opacity-100'
                : 'h-12 opacity-70'
              : pulseTick % 3 === 0
              ? 'h-18 opacity-90'
              : 'h-8 opacity-50'
          }`}
        />
        <div
          className={`w-1.5 bg-white rounded-full transition-all duration-150 ${
            isLoud
              ? pulseTick % 4 === 0
                ? 'h-36 opacity-100'
                : 'h-14 opacity-80'
              : pulseTick % 2 === 0
              ? 'h-24 opacity-85'
              : 'h-10 opacity-50'
          }`}
        />
      </div>

      <div className="absolute -right-14 sm:-right-20 flex items-center gap-1.5">
        <div
          className={`w-1.5 bg-white rounded-full transition-all duration-150 ${
            isLoud
              ? pulseTick % 4 === 0
                ? 'h-36 opacity-100'
                : 'h-14 opacity-80'
              : pulseTick % 2 === 0
              ? 'h-24 opacity-85'
              : 'h-10 opacity-50'
          }`}
        />
        <div
          className={`w-1.5 bg-white rounded-full transition-all duration-150 ${
            isLoud
              ? pulseTick % 2 === 0
                ? 'h-28 opacity-100'
                : 'h-12 opacity-70'
              : pulseTick % 3 === 0
              ? 'h-18 opacity-90'
              : 'h-8 opacity-50'
          }`}
        />
        <div
          className={`w-1.5 bg-white rounded-full transition-all duration-150 ${
            isLoud
              ? pulseTick % 3 === 0
                ? 'h-20 opacity-100'
                : 'h-10 opacity-60'
              : pulseTick % 2 === 0
              ? 'h-14 opacity-80'
              : 'h-6 opacity-40'
          }`}
        />
      </div>

      {/* Dynamic Equalizer Wave Bars directly beneath the speaker */}
      <div className="mt-8 flex items-end justify-center gap-1.5 sm:gap-2 h-10 px-6 py-1 bg-black/60 border border-white/30 rounded-full backdrop-blur-md shadow-lg">
        {[24, 38, 18, 44, 28, 36, 20, 42, 30, 22].map((height, idx) => {
          const mod = (pulseTick + idx * 3) % 4;
          const activeHeight = isLoud
            ? Math.min(36, height * 1.0)
            : Math.max(8, (height * (mod + 1)) / 4);

          return (
            <div
              key={idx}
              className="w-1.5 sm:w-2 bg-white rounded-full transition-all duration-100"
              style={{
                height: `${activeHeight}px`,
                opacity: 0.95,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
