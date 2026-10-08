import React from 'react';
import { RotateCcw, ArrowLeft, Sparkles, Gem, MessageCircle, Instagram } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface PrankRevealModalProps {
  isOpen: boolean;
  onBackToGallery: () => void;
  onPrankFriend: () => void;
  onReplay: () => void;
}

export const PrankRevealModal: React.FC<PrankRevealModalProps> = ({
  isOpen,
  onBackToGallery,
  onPrankFriend,
  onReplay,
}) => {
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://kexart.com.in/';

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`${siteConfig.shareText}\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const shareToInstagram = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentUrl).catch(() => {});
    }
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-300"
    >
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800/80 p-8 sm:p-10 text-center shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden rounded-2xl">
        {/* Subtle gold aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Diamond Badge */}
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center mb-6 shadow-inner">
            <Gem className="w-8 h-8 text-amber-400" />
          </div>

          <div className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 font-mono mb-2">
            CONTEMPORARY GALLERY ARCHIVE
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight mb-3">
            {siteConfig.brandName} MASTERWORK
          </h2>

          <p className="text-sm text-neutral-300 font-light max-w-sm mb-6 leading-relaxed">
            You just accessed the exclusive {siteConfig.brandName} Contemporary Masterwork Vault. The gallery collection and your device remain completely secure.
          </p>

          {/* Dedicated WhatsApp & Instagram Send Options */}
          <div className="w-full grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={shareToWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-emerald-300 bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/40 hover:border-emerald-500 transition-all cursor-pointer rounded-xl min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Send WhatsApp</span>
            </button>

            <button
              onClick={shareToInstagram}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-pink-300 bg-neutral-900 hover:bg-neutral-800 border border-pink-500/40 hover:border-pink-500 transition-all cursor-pointer rounded-xl min-h-[46px]"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Send Insta</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-2.5">
            <button
              onClick={onBackToGallery}
              className="group w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.98] cursor-pointer rounded-xl min-h-[48px]"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-800 transition-transform group-hover:-translate-x-1" />
              <span>RETURN TO GALLERY</span>
            </button>

            <button
              onClick={onPrankFriend}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 transition-all cursor-pointer rounded-xl min-h-[40px]"
            >
              <span>More Share Options</span>
            </button>

            <button
              onClick={onReplay}
              className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs tracking-wider uppercase text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>View Exhibition Again</span>
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-neutral-900 w-full text-center">
            <span className="text-[11px] text-neutral-500 font-light flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500/60" />
              <span>Curated Fine Art & Sovereign Vault Platform</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
