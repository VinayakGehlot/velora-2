import React, { useState } from 'react';
import { Maximize2, ArrowUpRight, Gem } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ArtworkCanvas } from './ArtworkCanvas';

interface GalleryProps {
  onTriggerExperience: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onTriggerExperience }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredItems = siteConfig.galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sovereign') return item.category.toLowerCase().includes('sovereign') || item.category.toLowerCase().includes('masterpiece');
    if (activeFilter === 'contemporary') return item.category.toLowerCase().includes('contemporary') || item.category.toLowerCase().includes('neo-expressionism');
    if (activeFilter === 'abstract') return item.category.toLowerCase().includes('abstract') || item.category.toLowerCase().includes('modernism') || item.category.toLowerCase().includes('color field');
    return true;
  });

  return (
    <section id="gallery" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-neutral-900 gap-6">
        <div>
          <div className="text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium mb-3 flex items-center gap-2">
            <Gem className="w-3.5 h-3.5 text-amber-400" />
            <span>{siteConfig.brandName} CONTEMPORARY ARCHIVE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
            Original Gallery Collections
          </h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed">
          Curated collection of expressive contemporary artworks and blue-chip acquisitions. Select any masterwork to review provenance, valuation, and vault documentation.
        </p>
      </div>

      {/* Curatorial Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-4">
        {[
          { id: 'all', label: 'All Collections' },
          { id: 'sovereign', label: 'Sovereign Masterpieces' },
          { id: 'contemporary', label: 'Contemporary Figuration' },
          { id: 'abstract', label: 'Abstract & Modernism' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer rounded-full ${
              activeFilter === tab.id
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-850 border border-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredItems.map((item, index) => {
          const isFeaturedSpan = item.featured ? 'md:col-span-2 lg:col-span-2' : '';
          const aspectClass =
            item.aspect === 'tall'
              ? 'aspect-[3/4]'
              : item.aspect === 'wide'
              ? 'aspect-[16/10]'
              : 'aspect-square';

          return (
            <article
              key={item.id}
              className={`group relative flex flex-col justify-between bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-500 rounded-xl overflow-hidden ${isFeaturedSpan}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Frame */}
              <div
                onClick={onTriggerExperience}
                className={`relative w-full ${aspectClass} overflow-hidden cursor-pointer bg-neutral-900`}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onTriggerExperience();
                  }
                }}
              >
                <ArtworkCanvas item={item} isHovered={hoveredId === item.id} />

                {/* Valuation Badge */}
                {item.valuation && (
                  <div className="absolute top-3 left-3 z-10 text-[11px] font-mono tracking-wider text-amber-300 bg-black/80 px-2.5 py-1 rounded-sm border border-amber-500/30 flex items-center gap-1 shadow-md">
                    <Gem className="w-2.5 h-2.5 text-amber-400" />
                    <span>{item.valuation}</span>
                  </div>
                )}

                {/* Inspect Overlay Trigger */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="p-2.5 bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Quick index mark */}
                <div className="absolute bottom-3 left-3 z-10 text-[10px] tracking-widest text-white/70 font-mono">
                  COLLECTION {String(index + 1).padStart(2, '0')} // {item.year}
                </div>
              </div>

              {/* Artwork Metadata */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-light mb-1.5">
                    <span>{item.category}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs text-amber-400/90 font-medium mt-1">
                    {item.artist}
                  </div>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-[11px] tracking-wider text-neutral-500 font-mono truncate max-w-[150px]">
                    {item.vaultLocation}
                  </span>
                  <button
                    onClick={onTriggerExperience}
                    className="inline-flex items-center gap-1 text-xs tracking-wider uppercase text-neutral-300 hover:text-white font-medium transition-colors cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
