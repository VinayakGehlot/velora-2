import React from 'react';
import { X, Gem, ShieldCheck } from 'lucide-react';
import { GalleryItem } from '../config/siteConfig';
import { ArtworkCanvas } from './ArtworkCanvas';

interface ArtworkModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onTriggerExperience: () => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ item, onClose, onTriggerExperience }) => {
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-black/70 rounded-full transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center border border-neutral-800"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Artwork view */}
        <div className="w-full md:w-3/5 h-72 md:h-auto min-h-[300px] relative bg-neutral-900 flex items-center justify-center">
          <ArtworkCanvas item={item} />
          <div className="absolute bottom-3 left-3 text-[11px] tracking-widest text-neutral-300 bg-black/80 px-3 py-1 uppercase border border-neutral-800 font-mono">
            {item.dimensions}
          </div>
          {item.valuation && (
            <div className="absolute top-3 left-3 text-xs tracking-wider text-amber-300 bg-black/85 px-3 py-1 font-mono font-medium border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
              <Gem className="w-3 h-3 text-amber-400" />
              <span>Valuation: {item.valuation}</span>
            </div>
          )}
        </div>

        {/* Metadata info */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">
              <span>{item.category}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mt-2">
              {item.title}
            </h2>
            <div className="text-xs text-amber-400/90 font-medium mt-1">
              {item.artist}
            </div>
            <div className="text-xs text-neutral-400 italic mt-0.5">
              {item.subtitle}
            </div>

            <div className="my-5 border-t border-neutral-900 pt-5 space-y-3">
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {item.description}
              </p>

              <dl className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div>
                  <dt className="text-neutral-500 uppercase tracking-wider text-[10px]">Year</dt>
                  <dd className="text-neutral-200 font-medium mt-0.5">{item.year}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500 uppercase tracking-wider text-[10px]">Vault Location</dt>
                  <dd className="text-neutral-200 font-medium mt-0.5 truncate text-[11px]" title={item.vaultLocation}>{item.vaultLocation}</dd>
                </div>
              </dl>

              {item.provenance && (
                <div className="pt-1 text-[11px] text-neutral-400 flex items-center gap-1.5 bg-neutral-900/50 p-2 border border-neutral-850">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{item.provenance}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-5 border-t border-neutral-900 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onTriggerExperience();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold tracking-widest uppercase text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer min-h-[46px] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Gem className="w-4 h-4 text-black" />
              <span>ACCESS SOVEREIGN VAULT DOSSIER</span>
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-xs tracking-wider uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Return to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
