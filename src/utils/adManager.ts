/**
 * VELORA Advertisement & Monetization Integration Manager
 *
 * Configured cleanly and professionally:
 * 1. Popunder Script:
 *    - Controlled: Does NOT trigger on first visit.
 *    - Triggers only on 2nd and subsequent user interactions (session count >= 2).
 * 2. Social Bar:
 *    - Clean, non-intrusive floating bar.
 * 3. Native Ad:
 *    - Placed inside container: id="container-2fb8c6b5f2e0ad44048e1828e7208584"
 *    - Appears professionally in the completion area without clutter.
 * 4. Smart Link:
 *    - Elegant, verified partner link.
 *
 * Professional Safeguards:
 * - Fail-safe error handling (ad-blockers or slow networks will never break the app).
 * - React StrictMode duplicate prevention.
 * - Anti-spam rate limiting: prevents multi-popups from overwhelming the user.
 */

export const POPUNDER_SCRIPT_URL = 'https://pl31723046.profitableratecpmnetwork.com/eb/40/48/eb404886700b524298862b1ee65adb82.js';
export const SOCIAL_BAR_SCRIPT_URL = 'https://pl31723048.profitableratecpmnetwork.com/99/dd/79/99dd7981f4b5a970dd959d2879eed606.js';
export const NATIVE_AD_SCRIPT_URL = 'https://pl31723049.profitableratecpmnetwork.com/2fb8c6b5f2e0ad44048e1828e7208584/invoke.js';
export const NATIVE_AD_CONTAINER_ID = 'container-2fb8c6b5f2e0ad44048e1828e7208584';
export const SMART_LINK_URL = 'https://www.profitableratecpmnetwork.com/ez8i9cz0d?key=821bccbcd91c70022cc0167fcc17823d';

let popunderInjected = false;
let socialBarInjected = false;
let nativeAdInjected = false;

const VISIT_COUNT_KEY = 'velora_gallery_interaction_count';

/**
 * Returns how many times user has triggered the experience/prank in this session/browser.
 */
function getInteractionCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = sessionStorage.getItem(VISIT_COUNT_KEY) || localStorage.getItem(VISIT_COUNT_KEY);
    const count = raw ? parseInt(raw, 10) : 0;
    return isNaN(count) ? 0 : count;
  } catch {
    return 0;
  }
}

/**
 * Increments the interaction count and stores it.
 */
function incrementInteractionCount(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const nextCount = getInteractionCount() + 1;
    sessionStorage.setItem(VISIT_COUNT_KEY, nextCount.toString());
    localStorage.setItem(VISIT_COUNT_KEY, nextCount.toString());
    return nextCount;
  } catch {
    return 1;
  }
}

/**
 * Injects a script tag safely into the DOM if not already present.
 */
function injectScriptSafely(url: string, async = true, dataCfAsync = false, parentElement?: HTMLElement): void {
  if (typeof document === 'undefined') return;

  try {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (async) {
      script.async = true;
    }
    if (dataCfAsync) {
      script.setAttribute('data-cfasync', 'false');
    }

    script.onerror = () => {
      // Gracefully continue without throwing if blocked
    };

    const target = parentElement || document.body || document.head;
    target.appendChild(script);
  } catch {
    // Fail silently to never interrupt user experience
  }
}

/**
 * Initializes advertisement integrations with professional frequency control:
 * - Popunder is delayed until the 2nd interaction (first time it will NOT trigger).
 * - Social bar is initialized smoothly.
 * - Prevents overwhelming ad floods.
 */
export function initPostInteractionAds(): void {
  if (typeof window === 'undefined') return;

  const currentCount = incrementInteractionCount();

  // 1. Popunder initialization:
  // Strictly skips 1st interaction! Only triggers from the 2nd interaction onward.
  if (currentCount >= 2 && !popunderInjected) {
    popunderInjected = true;
    setTimeout(() => {
      injectScriptSafely(POPUNDER_SCRIPT_URL, true, false);
    }, 150);
  }

  // 2. Social Bar initialization (Only once, smoothly after interaction)
  if (!socialBarInjected) {
    socialBarInjected = true;
    setTimeout(() => {
      injectScriptSafely(SOCIAL_BAR_SCRIPT_URL, true, false);
    }, 100);
  }
}

/**
 * Initializes Native Ad cleanly inside container-2fb8c6b5f2e0ad44048e1828e7208584
 * Called only when the Prank Completion area is displayed.
 */
export function initNativeAd(): void {
  if (typeof document === 'undefined') return;

  try {
    const container = document.getElementById(NATIVE_AD_CONTAINER_ID);
    if (!container) return;

    if (!nativeAdInjected || !container.querySelector(`script[src="${NATIVE_AD_SCRIPT_URL}"]`)) {
      nativeAdInjected = true;
      injectScriptSafely(NATIVE_AD_SCRIPT_URL, true, true, container);
    }
  } catch {
    // Fail silently
  }
}
