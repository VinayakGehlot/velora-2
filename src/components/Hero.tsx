import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, Instagram, Gem } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeroProps {
  onTriggerExperience: () => void;
  onOpenShareModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTriggerExperience, onOpenShareModal }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://kexart.com.in/';
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${siteConfig.shareTitle}\n${siteConfig.shareText}\n${shareUrl}`
  )}`;

  return (
    <section className="relative min-h-[85dvh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      {/* Subtle curatorial lighting background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-amber-500/10 via-neutral-900/10 to-transparent rounded-full blur-3xl opacity-60 transform -translate-y-12" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle unboxed kicker label */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-[0.28em] uppercase text-neutral-400 mb-6 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{siteConfig.heroLabel}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>CURATED VAULT</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-amber-400/90 font-mono text-[11px]">2026 EDITION</span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-light text-white leading-[1.08] mb-6 max-w-4xl [text-wrap:balance]">
          CONTEMPORARY ART <span className="italic font-normal bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent">GALLERY</span>.
        </h1>

        {/* Curatorial Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-light leading-relaxed mb-8 [text-wrap:balance]">
          {siteConfig.heroDescription}
        </p>

        {/* Primary Buttons Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md sm:max-w-none">
          {/* Main EXPLORE GALLERY Button */}
          <button
            onClick={onTriggerExperience}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-100 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:shadow-[0_0_65px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer min-h-[56px] min-w-[260px] rounded-xl border border-white/60"
            aria-label="Explore Gallery Exhibition"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{siteConfig.primaryCta}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary Button: MY ARTWORK GALLERY */}
          <a
            href="#gallery"
            className="inline-flex items-center justify-center px-8 py-4 sm:py-5 text-sm font-semibold tracking-[0.18em] uppercase text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800/80 transition-all duration-300 rounded-xl min-h-[56px] min-w-[220px]"
          >
            {siteConfig.secondaryCta}
          </a>
        </div>

        {/* Authentication badge & Instant Social Share */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-2 text-xs tracking-wider text-neutral-400 font-light bg-neutral-900/60 border border-neutral-800/80 px-4 py-1.5 rounded-full">
            <Gem className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-neutral-300">{siteConfig.subCtaText}</span>
          </div>

          {/* Quick WhatsApp Send */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 px-3.5 py-1.5 rounded-full transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Send on WhatsApp</span>
          </a>

          {/* Quick Instagram Share */}
          {onOpenShareModal && (
            <button
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-400 hover:text-pink-300 bg-pink-950/40 border border-pink-800/60 hover:bg-pink-900/40 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </button>
          )}
        </div>

        {/* Curatorial Metadata Strip */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-neutral-900 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div>
            <div className="text-[11px] tracking-widest uppercase text-neutral-500">Exhibition</div>
            <div className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">{siteConfig.brandName} Contemporary</div>
          </div>
          <div>
            <div className="text-[11px] tracking-widest uppercase text-neutral-500">Curated Works</div>
            <div className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">07 Masterpieces</div>
          </div>
          <div>
            <div className="text-[11px] tracking-widest uppercase text-neutral-500">Archive Valuation</div>
            <div className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium font-mono text-amber-300">$1.27 Billion USD</div>
          </div>
          <div>
            <div className="text-[11px] tracking-widest uppercase text-neutral-500">Security Vault</div>
            <div className="text-xs sm:text-sm text-neutral-300 mt-1 font-medium">Sovereign Protocol</div>
          </div>
        </div>
      </div>
    </section>
  );
};
