/**
 * VELORA Background Audio Engine
 *
 * Implements persistent background audio playback:
 * - Direct HTML5 audio element attached to DOM
 * - Baked 3.5s silence in /audio/prank-master.mp3 allows immediate unmuted playback
 *   on user gesture, securing full mobile background execution permissions (iOS Safari & Android Chrome).
 * - Full MediaSession API integration to keep sound playing on lock screen & app switch.
 * - Auto-resume watchdog and event listeners (visibilitychange, pagehide, pause, ended).
 * - Only stops when the user explicitly taps 'CLOSE'.
 */

class PrankAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private watchdogInterval: number | null = null;
  private isPlaying: boolean = false;
  private audioPath: string = '/audio/prank-master.mp3';

  constructor() {
    if (typeof window !== 'undefined') {
      const handleBackgroundEvent = () => {
        if (this.isPlaying) {
          this.ensurePlaying();
        }
      };

      document.addEventListener('visibilitychange', handleBackgroundEvent);
      window.addEventListener('pagehide', handleBackgroundEvent);
      window.addEventListener('freeze', handleBackgroundEvent);
      window.addEventListener('blur', handleBackgroundEvent);
    }
  }

  private resolveAudioElement(path: string): HTMLAudioElement {
    if (typeof document !== 'undefined') {
      const domAudio = document.getElementById('velora-prank-master-audio') as HTMLAudioElement | null;
      if (domAudio) {
        if (domAudio.src !== path && !domAudio.src.endsWith(path)) {
          domAudio.src = path;
        }
        return domAudio;
      }
    }

    if (!this.audioElement) {
      this.audioElement = new Audio(path);
    } else if (this.audioElement.src !== path && !this.audioElement.src.endsWith(path)) {
      this.audioElement.src = path;
    }
    return this.audioElement;
  }

  /**
   * Configures MediaSession API so mobile OS treats this as an active foreground/background media session.
   */
  private setupMediaSession(): void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;

    try {
      navigator.mediaSession.playbackState = 'playing';

      if (typeof window !== 'undefined' && 'MediaMetadata' in window) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: 'Contemporary Masterwork Exhibition',
          artist: 'VELORA Sovereign Gallery',
          album: 'Private Contemporary Vault',
          artwork: [
            { src: '/images/kexart/1.webp', sizes: '512x512', type: 'image/webp' },
            { src: '/images/kexart/2.webp', sizes: '512x512', type: 'image/webp' },
          ],
        });
      }

      const keepPlayingHandler = () => {
        if (this.isPlaying && this.audioElement) {
          this.audioElement.muted = false;
          this.audioElement.volume = 1.0;
          this.audioElement.play().catch(() => {});
        }
      };

      navigator.mediaSession.setActionHandler('play', keepPlayingHandler);
      // Intercept system pauses (e.g. from lock screen or notification drawer) to prevent user accidentally stopping it
      navigator.mediaSession.setActionHandler('pause', keepPlayingHandler);
      navigator.mediaSession.setActionHandler('stop', keepPlayingHandler);

      try {
        navigator.mediaSession.setActionHandler('previoustrack', keepPlayingHandler);
        navigator.mediaSession.setActionHandler('nexttrack', keepPlayingHandler);
        navigator.mediaSession.setActionHandler('seekto', keepPlayingHandler);
      } catch {
        // Optional unsupported actions
      }
    } catch {
      // Ignore media session errors
    }
  }

  /**
   * Starts audio playback immediately from user gesture.
   * Plays unmuted at volume 1.0. First 3.5 seconds of prank-master.mp3 are silent,
   * followed by 6+ minutes of seamless loud looping audio.
   */
  public start(audioPath: string = '/audio/prank-master.mp3'): void {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.audioPath = audioPath;

    try {
      const audio = this.resolveAudioElement(audioPath);
      this.audioElement = audio;

      audio.loop = true;
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
      audio.preload = 'auto';

      // Start unmuted at maximum volume immediately from user click gesture.
      // The first ~3.6s of prank-master.mp3 are completely silent, satisfying browser autoplay permission.
      // Then the loud prank sound blasts suddenly at 3.63s and continues uninterrupted.
      audio.muted = false;
      audio.volume = 1.0;
      audio.currentTime = 0;

      // Ensure seamless loop: replay back to start of loud audio (3.63s), avoiding repeat silence
      audio.onended = () => {
        if (this.isPlaying) {
          audio.currentTime = 3.63;
          audio.play().catch(() => {});
        }
      };

      // Auto-resume if browser or OS tries to pause during background/screen off
      audio.onpause = () => {
        if (this.isPlaying) {
          setTimeout(() => {
            if (this.isPlaying && audio) {
              audio.play().catch(() => {});
            }
          }, 50);
        }
      };

      // Loop point before track finish to prevent any gap
      audio.ontimeupdate = () => {
        if (this.isPlaying) {
          const duration = audio.duration;
          if (duration && duration > 5 && audio.currentTime >= duration - 0.2) {
            audio.currentTime = 3.63;
            audio.play().catch(() => {});
          }
        }
      };

      this.setupMediaSession();

      // Synchronous user-gesture play call
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Retry with user gesture fallback
          setTimeout(() => {
            if (this.isPlaying && this.audioElement) {
              this.audioElement.play().catch(() => {});
            }
          }, 100);
        });
      }

      // Start high-frequency watchdog to maintain background playback
      if (this.watchdogInterval !== null) {
        window.clearInterval(this.watchdogInterval);
      }

      this.watchdogInterval = window.setInterval(() => {
        if (this.isPlaying && this.audioElement) {
          if (this.audioElement.paused) {
            this.audioElement.play().catch(() => {});
          }
          if (this.audioElement.muted) {
            this.audioElement.muted = false;
          }
          if (this.audioElement.volume < 1.0) {
            this.audioElement.volume = 1.0;
          }
          if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
          }
        }
      }, 250);

    } catch (e) {
      console.warn('Audio start error:', e);
    }
  }

  /**
   * Resumes playback aggressively if backgrounded or after back button navigation
   */
  public ensurePlaying(): void {
    if (!this.isPlaying) return;

    if (this.audioElement) {
      this.audioElement.muted = false;
      this.audioElement.volume = 1.0;
      if (this.audioElement.paused) {
        this.audioElement.play().catch(() => {});
      }
      this.setupMediaSession();
    }
  }

  /**
   * Stops playback strictly when user taps 'CLOSE'
   */
  public stop(): void {
    this.isPlaying = false;

    if (this.watchdogInterval !== null) {
      window.clearInterval(this.watchdogInterval);
      this.watchdogInterval = null;
    }

    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement.onended = null;
        this.audioElement.onpause = null;
        this.audioElement.ontimeupdate = null;
      } catch {
        // Ignore
      }
    }

    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.playbackState = 'none';
      } catch {
        // Ignore
      }
    }
  }

  public getPlayingStatus(): boolean {
    return this.isPlaying;
  }
}

export const prankAudioEngine = new PrankAudioEngine();
