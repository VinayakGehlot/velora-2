import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { FeaturedArtwork } from './components/FeaturedArtwork';
import { About } from './components/About';
import { ShareSection } from './components/ShareSection';
import { Footer } from './components/Footer';
import { PrankOverlay } from './components/PrankOverlay';
import { PrankRevealModal } from './components/PrankRevealModal';
import { ShareDialog } from './components/ShareDialog';
import { Toast } from './components/Toast';
import { usePrankMode } from './hooks/usePrankMode';
import { siteConfig } from './config/siteConfig';

export default function App() {
  const { isPrankActive, canDismiss, isPrankRevealed, phase, triggerPrank, stopPrank, resetPrank } =
    usePrankMode();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Automatically activate the full-screen experience after 10 seconds of visiting
  React.useEffect(() => {
    if (isPrankActive || isPrankRevealed) return;
    const timer = window.setTimeout(() => {
      if (!isPrankActive && !isPrankRevealed) {
        triggerPrank();
      }
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [isPrankActive, isPrankRevealed, triggerPrank]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  }, []);

  const handlePrankFriend = useCallback(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://kexart.com.in/';

    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: siteConfig.shareTitle,
          text: siteConfig.shareText,
          url: currentUrl,
        })
        .then(() => {
          showToast('Shared successfully');
        })
        .catch(() => {
          // If rejected or cancelled, open the fallback dialog
          setIsShareModalOpen(true);
        });
    } else {
      setIsShareModalOpen(true);
    }
  }, [showToast]);

  return (
    <div className="relative min-h-[100dvh] bg-neutral-950 text-neutral-100 flex flex-col selection:bg-neutral-800 selection:text-white">
      {/* Animated Luxury Ambient Aurora Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
        <div className="absolute -top-[15%] -left-[10%] w-[500px] sm:w-[900px] h-[500px] sm:h-[900px] bg-gradient-to-br from-amber-500/12 via-amber-700/6 to-transparent rounded-full blur-3xl animate-aurora-1" />
        <div className="absolute top-[35%] -right-[15%] w-[450px] sm:w-[800px] h-[450px] sm:h-[800px] bg-gradient-to-bl from-purple-600/10 via-indigo-600/6 to-transparent rounded-full blur-3xl animate-aurora-2" />
        <div className="absolute -bottom-[15%] left-[25%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-gradient-to-tr from-amber-600/8 to-transparent rounded-full blur-3xl animate-aurora-1" />
      </div>

      {/* Continuous Loop Prank Overlay with Dismiss Button on same page */}
      <PrankOverlay
        isActive={isPrankActive}
        phase={phase}
        canDismiss={canDismiss}
        onDismiss={stopPrank}
        onShare={handlePrankFriend}
      />

      {/* Prank Reveal Dialog */}
      <PrankRevealModal
        isOpen={isPrankRevealed}
        onBackToGallery={resetPrank}
        onPrankFriend={handlePrankFriend}
        onReplay={triggerPrank}
      />

      {/* Normal Gallery Experience (Hidden / Inaccessible during active prank) */}
      <div
        className={`flex flex-col min-h-screen transition-opacity duration-300 ${
          isPrankActive ? 'opacity-0 pointer-events-none select-none h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        <Header
          onOpenShare={() => setIsShareModalOpen(true)}
          onTriggerExperience={triggerPrank}
        />

        <main className="flex-grow">
          <Hero
            onTriggerExperience={triggerPrank}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
          <Gallery onTriggerExperience={triggerPrank} />
          <FeaturedArtwork onTriggerExperience={triggerPrank} />
          <About />
          <ShareSection
            onOpenShareModal={() => setIsShareModalOpen(true)}
            showToast={showToast}
          />
        </main>

        <Footer onOpenShare={() => setIsShareModalOpen(true)} />
      </div>

      {/* Share Dialog */}
      <ShareDialog
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        showToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}
