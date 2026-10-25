// Screen Wake Lock API helper for mobile browsers (iOS 16.4+ and Android)
let wakeLockSentinel: any = null;

export async function requestWakeLock(): Promise<boolean> {
  if ('wakeLock' in navigator) {
    try {
      wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
      return true;
    } catch (err) {
      console.warn('Wake Lock request failed:', err);
      return false;
    }
  }
  return false;
}

export async function releaseWakeLock(): Promise<void> {
  if (wakeLockSentinel) {
    try {
      await wakeLockSentinel.release();
    } catch (err) {
      console.warn('Wake Lock release failed:', err);
    }
    wakeLockSentinel = null;
  }
}

export function isWakeLockSupported(): boolean {
  return typeof navigator !== 'undefined' && 'wakeLock' in navigator;
}

// Re-acquire lock if tab becomes visible again
export function handleVisibilityChange(shouldBeActive: boolean, onStateChange?: (active: boolean) => void) {
  const handler = async () => {
    if (document.visibilityState === 'visible' && shouldBeActive && !wakeLockSentinel) {
      const success = await requestWakeLock();
      if (onStateChange) onStateChange(success);
    }
  };

  document.addEventListener('visibilitychange', handler);
  return () => document.removeEventListener('visibilitychange', handler);
}
