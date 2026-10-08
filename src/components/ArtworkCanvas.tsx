import React, { useState } from 'react';
import { GalleryItem } from '../config/siteConfig';

interface ArtworkCanvasProps {
  item: GalleryItem;
  className?: string;
  isHovered?: boolean;
}

export const ArtworkCanvas: React.FC<ArtworkCanvasProps> = ({ item, className = '', isHovered = false }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-neutral-950 flex items-center justify-center select-none ${className}`}>
      {/* Background ambient subtle glow matching palette */}
      {item.palette && item.palette[1] && (
        <div
          className="absolute inset-0 opacity-20 blur-2xl pointer-events-none transition-opacity duration-700"
          style={{ backgroundColor: item.palette[1] }}
        />
      )}

      {/* Real High-Resolution WebP Artwork Image */}
      {!imgError && item.imageUrl ? (
        <>
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'scale-105 filter brightness-105' : 'scale-100 filter brightness-95'
            } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {!imgLoaded && (
            <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-600">
                Loading Masterwork...
              </span>
            </div>
          )}
        </>
      ) : (
        /* Curated High-End Geometric Canvas Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-neutral-900 to-neutral-950">
          <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center mb-4">
            <span className="text-amber-400 font-serif text-xl font-bold">K</span>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
            {item.category}
          </div>
          <div className="text-sm font-serif text-white font-medium mt-1">
            {item.title}
          </div>
        </div>
      )}

      {/* Subtle Curatorial Vignette & Gold Rim */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] border border-white/5" />
      <div className="absolute inset-0 pointer-events-none border border-amber-500/10 group-hover:border-amber-500/30 transition-colors duration-500" />
    </div>
  );
};
