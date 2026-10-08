import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Instagram, Send } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, onClose, showToast }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://kexart.com.in/';

  const copyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      showToast('Gallery link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy automatically');
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: siteConfig.shareTitle,
          text: siteConfig.shareText,
          url: currentUrl,
        });
        showToast('Shared successfully');
        onClose();
      } catch {
        // User canceled
      }
    } else {
      copyLink();
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`${siteConfig.shareText} ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const shareToInstagram = async () => {
    await copyLink();
    showToast('Link copied! Open Instagram to share in DM or Story');
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl rounded-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-amber-400 font-medium mb-2">
          <Share2 className="w-3.5 h-3.5" />
          <span>Curated Invitation</span>
        </div>

        <h3 className="font-serif text-2xl text-white font-normal mb-2">
          Share {siteConfig.brandName}
        </h3>

        <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
          Send private access to the {siteConfig.brandName} Contemporary Art Gallery directly via WhatsApp or Instagram.
        </p>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1.5 mb-6 rounded-lg">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="bg-transparent text-xs text-neutral-300 px-3 py-1 flex-grow outline-none truncate font-mono select-all"
          />
          <button
            onClick={copyLink}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[36px] rounded"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Dedicated Send on WhatsApp & Instagram */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={shareToWhatsApp}
            className="flex items-center justify-center gap-2 p-3 bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/40 text-xs text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer min-h-[46px] rounded-xl font-medium"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={shareToInstagram}
            className="flex items-center justify-center gap-2 p-3 bg-neutral-900 hover:bg-neutral-800 border border-pink-500/40 text-xs text-pink-300 hover:text-pink-200 transition-colors cursor-pointer min-h-[46px] rounded-xl font-medium"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram</span>
          </button>
        </div>

        {/* Primary Native Trigger if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={shareNative}
            className="w-full py-3 text-xs tracking-[0.15em] uppercase font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer flex items-center justify-center gap-2 min-h-[44px] rounded-xl"
          >
            <Send className="w-3.5 h-3.5" />
            <span>System Share Sheet</span>
          </button>
        )}
      </div>
    </div>
  );
};
