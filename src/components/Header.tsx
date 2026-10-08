import React, { useState } from 'react';
import { Menu, X, Share2, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeaderProps {
  onOpenShare: () => void;
  onTriggerExperience: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShare, onTriggerExperience }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/80 border-b border-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Single element wordmark + subtle curatorial pavilion note */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-medium text-white hover:text-neutral-300 transition-colors select-none"
          >
            {siteConfig.brandName}
          </a>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 rounded-full font-mono uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Pavilion Open
          </span>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.18em] uppercase text-neutral-400 font-medium">
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('featured')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Featured
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Curatorial
          </button>
          <button
            onClick={onOpenShare}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Share
          </button>
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenShare}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded transition-all cursor-pointer"
            aria-label="Share gallery"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={onTriggerExperience}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-black bg-white hover:bg-neutral-200 transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
            <span>Explore</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 border-b border-neutral-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4 text-xs tracking-[0.2em] uppercase text-neutral-300 font-medium">
            <button
              onClick={() => scrollTo('gallery')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Gallery Exhibition
            </button>
            <button
              onClick={() => scrollTo('featured')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Featured Work
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-white transition-colors"
            >
              Curatorial Philosophy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShare();
              }}
              className="text-left py-2 hover:text-white transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Experience
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
