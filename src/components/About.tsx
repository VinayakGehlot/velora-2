import React from 'react';
import { Gem, ShieldCheck, Landmark } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-neutral-900/80">
      <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-amber-400/90 font-medium mb-4">
        <Landmark className="w-3.5 h-3.5 text-amber-400" />
        <span>{siteConfig.brandName} CURATORIAL MANIFESTO</span>
      </div>

      {/* Dominant editorial quote */}
      <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.25] mb-12 [text-wrap:balance]">
        “True contemporary art bridges raw emotional perception with <span className="italic text-amber-200">timeless rarity</span>.”
      </blockquote>

      {/* Editorial reading columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-sm text-neutral-400 font-light leading-relaxed">
        <div>
          <p className="text-neutral-300 leading-relaxed">
            {siteConfig.brandName} is a curated contemporary fine art platform dedicated to original masterworks, expressive figurative creations, and sovereign acquisitions.
          </p>
        </div>

        <div>
          <p className="leading-relaxed">
            Every piece in the collection is presented with pristine digital high-fidelity resolution and private provenance certification.
          </p>
        </div>
      </div>

      {/* Three curatorial pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-900">
        <div className="p-4 rounded-xl bg-neutral-950/40 border border-neutral-900/60">
          <div className="text-[11px] font-mono text-amber-400/80 mb-1.5">01. PROVENANCE</div>
          <h3 className="font-serif text-base text-white font-normal mb-1 flex items-center gap-1.5">
            <Gem className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Pedigree</span>
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Direct artist studio provenance and verified blue-chip exhibition history.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/40 border border-neutral-900/60">
          <div className="text-[11px] font-mono text-amber-400/80 mb-1.5">02. MASTERWORK</div>
          <h3 className="font-serif text-base text-white font-normal mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Museum Custody</span>
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Preserved under museum-grade climate-controlled archiving protocols.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/40 border border-neutral-900/60">
          <div className="text-[11px] font-mono text-amber-400/80 mb-1.5">03. ARCHIVE</div>
          <h3 className="font-serif text-base text-white font-normal mb-1 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Private Exhibition</span>
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            High-precision digital presentation for connoisseurs and collectors worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};
