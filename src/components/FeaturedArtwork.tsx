import React from 'react';
import { ArrowRight, Gem } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ArtworkCanvas } from './ArtworkCanvas';

interface FeaturedArtworkProps {
  onTriggerExperience: () => void;
}

export const FeaturedArtwork: React.FC<FeaturedArtworkProps> = ({ onTriggerExperience }) => {
  const featuredItem = siteConfig.galleryItems.find((i) => i.featured) || siteConfig.galleryItems[0];

  return (
    <section id="featured" className="py-20 sm:py-32 bg-neutral-900/30 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Artwork Showcase (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl rounded-xl">
              <ArtworkCanvas item={featuredItem} />
              <div className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.25em] uppercase text-white/90 bg-black/80 px-3 py-1 font-mono border border-neutral-800 flex items-center gap-1.5">
                <Gem className="w-3 h-3 text-amber-400" />
                <span>VALUATION: {featuredItem.valuation}</span>
              </div>
            </div>
            {/* Subtle glow behind canvas */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 rounded-xl blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Curatorial Text & Action (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-xs tracking-[0.25em] uppercase text-amber-400 font-medium mb-3 flex items-center gap-1.5">
              <span>VAULT CENTERPIECE MASTERWORK</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight leading-tight">
              {featuredItem.title}
            </h2>

            <div className="text-sm font-medium text-amber-300 mt-2">
              {featuredItem.artist} ({featuredItem.year})
            </div>

            <p className="text-sm text-neutral-300 italic font-serif mt-2 mb-4">
              "{featuredItem.subtitle}"
            </p>

            <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
              {featuredItem.description} Stored under Swiss sovereign security protocol with 24/7 environmental telemetry and multisig escrow custody.
            </p>

            {/* Curatorial data list */}
            <div className="space-y-3 py-5 border-y border-neutral-800 text-xs mb-8">
              <div className="flex justify-between text-neutral-400">
                <span className="text-neutral-500">Vault Location</span>
                <span className="text-neutral-200 text-right truncate max-w-[220px] font-mono">{featuredItem.vaultLocation}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span className="text-neutral-500">Provenance</span>
                <span className="text-neutral-200 truncate max-w-[220px]">{featuredItem.provenance}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span className="text-neutral-500">Insured Valuation</span>
                <span className="text-amber-400 font-mono font-medium">{featuredItem.valuation}</span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={onTriggerExperience}
                className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-100 transition-all shadow-md active:scale-95 cursor-pointer rounded-lg min-h-[46px]"
              >
                <Gem className="w-4 h-4 text-neutral-800" />
                <span>ACCESS CURATOR EXHIBITION DOSSIER</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
