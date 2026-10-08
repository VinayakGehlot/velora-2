import React from 'react';
import { siteConfig } from '../config/siteConfig';

interface FooterProps {
  onOpenShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShare }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-12 px-4 sm:px-6 lg:px-8 pb-safe text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="font-serif text-lg tracking-[0.25em] text-white font-medium select-none">
            {siteConfig.brandName}
          </span>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <p className="text-neutral-400 font-light">
            An experimental digital gallery experience.
          </p>
        </div>

        <nav className="flex items-center gap-6 tracking-wider uppercase text-[11px] font-medium">
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

        <div className="text-[11px] text-neutral-400 font-mono">
          © {new Date().getFullYear()} {siteConfig.brandName} BIENNIAL. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
