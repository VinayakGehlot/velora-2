import React from 'react';
import { Sparkles, MessageCircle, Instagram, Link2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface ShareSectionProps {
  onOpenShareModal: () => void;
  showToast: (msg: string) => void;
}

export const ShareSection: React.FC<ShareSectionProps> = ({ onOpenShareModal, showToast }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://kexart.com.in/';

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`${siteConfig.shareText} ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp...');
  };

  const shareToInstagram = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      }
      showToast('Gallery link copied! Paste in Insta Story or DM');
    } catch {
      showToast('Opening Instagram...');
    }
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const copyDirectLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      }
      showToast('Gallery link copied to clipboard');
    } catch {
      onOpenShareModal();
    }
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-neutral-900 bg-neutral-950 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-amber-400/90 font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>INVITE COLLECTORS // SHARE ACCESS</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight mb-4 [text-wrap:balance]">
          Send {siteConfig.brandName} Gallery Access
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mb-10 leading-relaxed [text-wrap:balance]">
          Share the {siteConfig.brandName} contemporary gallery and exclusive collections directly with friends or collectors on WhatsApp and Instagram.
        </p>

        {/* Direct Send Buttons: WhatsApp and Instagram */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <button
            onClick={shareToWhatsApp}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-white bg-emerald-700 hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 cursor-pointer rounded-xl min-h-[50px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>Send on WhatsApp</span>
          </button>

          <button
            onClick={shareToInstagram}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-90 shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all active:scale-95 cursor-pointer rounded-xl min-h-[50px]"
          >
            <Instagram className="w-4 h-4 text-white" />
            <span>Send on Instagram</span>
          </button>
        </div>

        <button
          onClick={copyDirectLink}
          className="mt-4 text-xs tracking-wider uppercase text-neutral-500 hover:text-neutral-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Copy Direct Link</span>
        </button>
      </div>
    </section>
  );
};
