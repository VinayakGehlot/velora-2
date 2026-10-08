import React from 'react';
import { Gem, ShieldCheck, Landmark } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium mb-4">
        <Landmark className="w-3.5 h-3.5 text-amber-400" />
        <span>{siteConfig.brandName} CONTEMPORARY MANIFESTO</span>
        <span aria-hidden="true" className="text-neutral-600">·</span>
        <span>{siteConfig.brandName} ARCHIVE</span>
      </div>

      {/* Dominant editorial quote */}
      <blockquote className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.2] mb-16 [text-wrap:balance]">
        “True fine art connects raw emotional expression with <span className="italic text-amber-200">uncompromising rarity</span>.”
      </blockquote>

      {/* Editorial reading columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 text-sm text-neutral-400 font-light leading-relaxed border-t border-neutral-900 pt-12">
        <div>
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-amber-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1 mb-6 text-neutral-300">
            {siteConfig.brandName} is a premier contemporary art platform featuring expressive paintings, original artworks, private gallery collections, and immersive creative processes.
          </p>
          <p>
            Across confidential freeports in Geneva, subterranean private vaults in Zurich, and royal trusts in Monaco, our archive presents verified masterworks with high-precision multispectral presentation and physical sovereign escrow.
          </p>
        </div>

        <div>
          <p className="mb-6">
            The collection houses curated blue-chip masterworks spanning contemporary figuration to modern abstract expressionism. Each piece is preserved with museum-grade care and confidential provenance.
          </p>
          <div className="p-6 bg-neutral-950 border border-neutral-800 mt-6 rounded-xl">
            <div className="text-[11px] tracking-widest uppercase text-amber-400 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Sovereign Custody Protocol</span>
            </div>
            <p className="text-xs text-neutral-300 italic font-serif">
              “True luxury in fine art is absolute provenance, unbroken silence, and uncompromised rarity.”
            </p>
            <div className="text-[10px] text-neutral-500 mt-2 font-mono">— Swiss Freeport Curatorial Board, 2026</div>
          </div>
        </div>
      </div>

      {/* Three curatorial pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t border-neutral-900">
        <div>
          <div className="text-xs font-mono text-amber-400 mb-2">01.</div>
          <h3 className="font-serif text-lg text-white font-normal mb-2 flex items-center gap-1.5">
            <Gem className="w-4 h-4 text-amber-400" />
            <span>Museum-Grade Pedigree</span>
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Original contemporary artworks and sovereign acquisitions with verified provenance.
          </p>
        </div>
        <div>
          <div className="text-xs font-mono text-amber-400 mb-2">02.</div>
          <h3 className="font-serif text-lg text-white font-normal mb-2">Confidential Escrow</h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Preserved behind Geneva and Zurich high-security vaults with climate-stabilized storage.
          </p>
        </div>
        <div>
          <div className="text-xs font-mono text-amber-400 mb-2">03.</div>
          <h3 className="font-serif text-lg text-white font-normal mb-2">Sovereign Protocol</h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Bespoke authentication protocol engineered for collectors and art enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
};
