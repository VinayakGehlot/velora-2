/**
 * VELORA Ultra-Reliable Background Audio Engine
 *
 * Implements 100% fail-safe audio playback:
 * 1. Baked 3.0s silence in /audio/prank-master.mp3 allows immediate unmuted playback
 *    at volume 1.0 synchronously inside user gesture, securing full mobile permissions
 *    (iOS Safari & Android Chrome) without getting blocked by autoplay policy.
 * 2. At 3.0s, loud girl-voice from kexart.com.in starts blasting continuously.
 * 3. On track end / loop, audio jumps back to 3.0s (bypassing the initial silence)
 *    so loud girl-voice loops uninterrupted with zero delay.
 * 4. Dual-layer Web Audio API backup scheduled at (ctx.currentTime + 3.0) with sample-accurate loop.
 * 5. Full MediaSession API integration for lock-screen persistence.
 */

class PrankAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private rawGirlVoiceBuffer: AudioBuffer | null = null;
  private webAudioSource: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private watchdogInterval: number | null = null;
  private isPlaying: boolean = false;
  private audioPath: string = '/audio/prank-master.mp3';
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.attachGlobalUnlockListeners();
      this.preloadGirlVoiceBuffer();

      const handleBackgroundEvent = () => {
        if (this.isPlaying) {
          this.ensurePlaying();
        }
      };

      document.addEventListener('visibilitychange', handleBackgroundEvent);
      window.addEventListener('pagehide', handleBackgroundEvent);
      window.addEventListener('freeze', handleBackgroundEvent);
      window.addEventListener('blur', handleBackgroundEvent);
      window.addEventListener('focus', handleBackgroundEvent);
    }
  }

  /**
   * Pre-warm and unlock audio hardware on ANY user interaction anywhere on the website.
   */
  private attachGlobalUnlockListeners(): void {
    const unlock = () => {
      this.unlockAudioContext();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('click', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioContext) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        }
      } catch {
        // Web Audio API unavailable
      }
    }
    return this.audioContext;
  }

  private unlockAudioContext(): void {
    if (this.isUnlocked) return;
    const ctx = this.getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      this.isUnlocked = true;
    }
  }

  /**
   * Preloads raw girl-voice.mp3 from kexart.com.in into memory for instantaneous Web Audio backup.
   */
  private async preloadGirlVoiceBuffer(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const response = await fetch('/audio/girl-voice.mp3');
      if (!response.ok) return;
      const arrayBuffer = await response.arrayBuffer();
      const ctx = this.getAudioContext();
      if (ctx) {
        this.rawGirlVoiceBuffer = await ctx.decodeAudioData(arrayBuffer);
      }
    } catch {
      // Graceful fallback
    }
  }

  private resolveAudioElement(path: string): HTMLAudioElement {
    if (typeof document !== 'undefined') {
      const domAudio = document.getElementById('velora-prank-master-audio') as HTMLAudioElement | null;
      if (domAudio) {
        if (!domAudio.src.endsWith(path)) {
          domAudio.src = path;
        }
        return domAudio;
      }
    }

    if (!this.audioElement) {
      this.audioElement = new Audio(path);
    } else if (!this.audioElement.src.endsWith(path)) {
      this.audioElement.src = path;
    }
    return this.audioElement;
  }

  /**
   * Configures MediaSession API so mobile OS keeps background playback alive.
   */
  private setupMediaSession(): void {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;

    try {
      navigator.mediaSession.playbackState = 'playing';

      if (typeof window !== 'undefined' && 'MediaMetadata' in window) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: 'Contemporary Masterwork Audio Tour',
          artist: 'VELORA Sovereign Gallery',
          album: 'Private Contemporary Vault',
          artwork: [
            { src: '/images/kexart/1.webp', sizes: '512x512', type: 'image/webp' },
            { src: '/images/kexart/2.webp', sizes: '512x512', type: 'image/webp' },
          ],
        });
      }

      const keepPlayingHandler = () => {
        if (this.isPlaying) {
          this.ensurePlaying();
        }
      };

      navigator.mediaSession.setActionHandler('play', keepPlayingHandler);
      navigator.mediaSession.setActionHandler('pause', keepPlayingHandler);
      navigator.mediaSession.setActionHandler('stop', keepPlayingHandler);
    } catch {
      // Ignore media session errors
    }
  }

  /**
   * Starts audio playback synchronously inside the user click gesture.
   * Plays unmuted at maximum volume 1.0 immediately:
   * First 3.0s are silent lead-in, securing mobile browser permissions.
   * At 3.0s loud audio blasts uninterrupted.
   * Continuous loop seamlessly replays loud audio at 3.0s.
   */
  public start(audioPath: string = '/audio/prank-master.mp3'): void {
    this.isPlaying = true;
    this.audioPath = audioPath;
    this.unlockAudioContext();

    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // 1. Direct HTML5 Audio playback (Starts synchronous to user click, UNMUTED, volume 1.0)
    try {
      const audio = this.resolveAudioElement(audioPath);
      this.audioElement = audio;

      audio.loop = true;
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
      audio.preload = 'auto';
      audio.muted = false;
      audio.volume = 1.0;
      audio.currentTime = 0;

      this.setupMediaSession();

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Initial play promise rejected, retrying on animation frame:', err);
          requestAnimationFrame(() => {
            if (this.isPlaying && this.audioElement) {
              this.audioElement.muted = false;
              this.audioElement.volume = 1.0;
              this.audioElement.play().catch(() => {});
            }
          });
        });
      }

      // Seamless loop point: loop loud portion (3.0s) avoiding repeat silence
      audio.onended = () => {
        if (this.isPlaying) {
          audio.currentTime = 3.0;
          audio.play().catch(() => {});
        }
      };

      audio.ontimeupdate = () => {
        if (this.isPlaying) {
          const duration = audio.duration;
          if (duration && duration > 10 && audio.currentTime >= duration - 0.25) {
            audio.currentTime = 3.0;
            audio.play().catch(() => {});
          }
        }
      };
    } catch (e) {
      console.warn('HTML5 Audio start error:', e);
    }

    // 2. Web Audio API Backup (Scheduled at ctx.currentTime + 3.0 with sample-accurate loop)
    if (ctx) {
      try {
        if (this.rawGirlVoiceBuffer) {
          this.scheduleWebAudioBuffer(ctx, 3.0);
        } else {
          this.preloadGirlVoiceBuffer().then(() => {
            if (this.isPlaying && this.rawGirlVoiceBuffer && !this.webAudioSource) {
              this.scheduleWebAudioBuffer(ctx, 0.0);
            }
          });
        }
      } catch (err) {
        console.warn('Web Audio schedule error:', err);
      }
    }

    // 3. High-frequency watchdog to maintain continuous unmuted playback
    if (this.watchdogInterval !== null) {
      window.clearInterval(this.watchdogInterval);
    }

    this.watchdogInterval = window.setInterval(() => {
      if (this.isPlaying) {
        if (this.audioElement) {
          if (this.audioElement.paused) {
            this.audioElement.play().catch(() => {});
          }
          if (this.audioElement.muted) {
            this.audioElement.muted = false;
          }
          if (this.audioElement.volume < 1.0) {
            this.audioElement.volume = 1.0;
          }
        }
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume().catch(() => {});
        }
        if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
      }
    }, 400);
  }

  private scheduleWebAudioBuffer(ctx: AudioContext, delaySeconds: number): void {
    if (!this.rawGirlVoiceBuffer) return;
    try {
      if (this.webAudioSource) {
        try {
          this.webAudioSource.stop();
          this.webAudioSource.disconnect();
        } catch {
          // Ignore
        }
      }

      this.webAudioSource = ctx.createBufferSource();
      this.webAudioSource.buffer = this.rawGirlVoiceBuffer;
      this.webAudioSource.loop = true;

      this.gainNode = ctx.createGain();
      this.gainNode.gain.setValueAtTime(1.0, ctx.currentTime);

      this.webAudioSource.connect(this.gainNode);
      this.gainNode.connect(ctx.destination);

      const startTime = ctx.currentTime + delaySeconds;
      this.webAudioSource.start(startTime);
    } catch {
      // Ignore
    }
  }

  /**
   * Resumes playback aggressively if paused or after app switch
   */
  public ensurePlaying(): void {
    if (!this.isPlaying) return;

    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }

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

    if (this.webAudioSource) {
      try {
        this.webAudioSource.stop();
        this.webAudioSource.disconnect();
      } catch {
        // Ignore
      }
      this.webAudioSource = null;
    }

    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement.onended = null;
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
