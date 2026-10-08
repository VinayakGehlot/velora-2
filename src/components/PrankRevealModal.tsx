import React, { useEffect } from 'react';
import { RotateCcw, ArrowLeft, Sparkles, MessageCircle, Instagram, ShieldCheck, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { initNativeAd, SMART_LINK_URL, NATIVE_AD_CONTAINER_ID } from '../utils/adManager';

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
  useEffect(() => {
    if (isOpen) {
      // Initialize Native Ad cleanly inside container when modal opens
      initNativeAd();
    }
  }, [isOpen]);

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
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-300 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800/80 p-6 sm:p-8 text-center shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden rounded-2xl my-auto">
        {/* Subtle gold aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Professional Gallery Seal / Badge replacing devil emoji */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-900 border border-amber-500/40 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(217,119,6,0.15)] text-amber-400 select-none">
            <ShieldCheck className="w-7 h-7 text-amber-400 stroke-[1.75]" />
          </div>

          <div className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-mono mb-1">
            VELORA PRIVATE AUDIT // PRANK REVEAL
          </div>

          {/* Clean, Elegant Prank Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
            GOT YOU!
          </h2>

          {/* Prank Completion Message */}
          <p className="text-sm sm:text-base text-amber-300 font-medium mb-1">
            It was just a harmless, playful prank.
          </p>

          <p className="text-xs text-neutral-400 font-light max-w-sm mb-4 leading-relaxed">
            Your device, system, and data remain 100% safe. Enjoy exploring our sovereign contemporary masterworks!
          </p>

          {/* Professional Native Ad Container */}
          <div className="w-full my-3 flex flex-col items-center justify-center min-h-[50px] overflow-hidden rounded-xl bg-neutral-900/40 border border-neutral-800/60 p-2">
            <div id={NATIVE_AD_CONTAINER_ID} className="w-full text-center"></div>
          </div>

          {/* WhatsApp & Instagram Quick Share */}
          <div className="w-full grid grid-cols-2 gap-2.5 mb-3">
            <button
              onClick={shareToWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold tracking-wider uppercase text-emerald-300 bg-neutral-900/90 hover:bg-neutral-800 border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer rounded-xl min-h-[42px]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Share WhatsApp</span>
            </button>

            <button
              onClick={shareToInstagram}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold tracking-wider uppercase text-pink-300 bg-neutral-900/90 hover:bg-neutral-800 border border-pink-500/30 hover:border-pink-500/60 transition-all cursor-pointer rounded-xl min-h-[42px]"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Share Instagram</span>
            </button>
          </div>

          {/* Professional Action Buttons */}
          <div className="w-full flex flex-col gap-2">
            {/* Return to Gallery */}
            <button
              onClick={onBackToGallery}
              className="group w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold tracking-[0.2em] uppercase text-black bg-white hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] active:scale-[0.98] cursor-pointer rounded-xl min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-neutral-800 transition-transform group-hover:-translate-x-1" />
              <span>RETURN TO GALLERY</span>
            </button>

            {/* Smart Link: Clean Partner Sponsor */}
            <a
              href={SMART_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold tracking-[0.14em] uppercase text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-all cursor-pointer rounded-xl min-h-[38px]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Featured Partner Gallery</span>
            </a>

            {/* Prank a Friend */}
            <button
              onClick={onPrankFriend}
              className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold tracking-[0.16em] uppercase text-neutral-300 hover:text-white bg-neutral-900/70 hover:bg-neutral-800 border border-neutral-800/80 transition-all cursor-pointer rounded-xl min-h-[36px]"
            >
              <span>Prank a Friend</span>
            </button>

            {/* Replay */}
            <button
              onClick={onReplay}
              className="w-full inline-flex items-center justify-center gap-2 py-1.5 text-[11px] tracking-wider uppercase text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>View Exhibition Again</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-900 w-full text-center">
            <span className="text-[11px] text-neutral-500 font-light flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500/60" />
              <span>{siteConfig.brandName} Sovereign Gallery Vault</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
