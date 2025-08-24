import { useState, useEffect } from 'react';

interface PWAState {
  deferredPrompt: any;
  showInstallPrompt: boolean;
  showIOSPrompt: boolean;
  isIOS: boolean;
  isStandalone: boolean;
  installApp: () => Promise<boolean>;
  dismissPrompt: () => void;
}

export const usePWA = (): PWAState => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Check if user has dismissed the prompt before
  const hasUserDismissed = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pwa-prompt-dismissed') === 'true';
    }
    return false;
  };

  useEffect(() => {
    // Check if it's iOS
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIOSDevice);
      // Show iOS prompt after a delay only if user hasn't dismissed before
      if (isIOSDevice && !isStandalone && !hasUserDismissed()) {
        setTimeout(() => {
          setShowIOSPrompt(true);
        }, 2000); // Show after 2 seconds
      }
    };

    // Check if app is running in standalone mode
    const checkStandalone = () => {
      const isStandaloneMode = 
        (window.navigator as any).standalone === true || 
        window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(isStandaloneMode);
    };

    checkIOS();
    checkStandalone();

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // Only show if user hasn't dismissed before
      if (!hasUserDismissed()) {
        setDeferredPrompt(e);
        setShowInstallPrompt(true);
      }
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    // Only add listeners if not in standalone mode
    if (!isStandalone) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isStandalone]);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        // Save to localStorage that user has installed the app
        if (typeof window !== 'undefined') {
          localStorage.setItem('pwa-prompt-dismissed', 'true');
          // Restore body overflow
          document.body.style.overflow = 'unset';
        }
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    }
    return false;
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    setShowIOSPrompt(false);
    // Save to localStorage that user has dismissed the prompt
    if (typeof window !== 'undefined') {
      localStorage.setItem('pwa-prompt-dismissed', 'true');
      // Restore body overflow
      document.body.style.overflow = 'unset';
    }
  };

  return {
    deferredPrompt,
    showInstallPrompt,
    showIOSPrompt,
    isIOS,
    isStandalone,
    installApp,
    dismissPrompt,
  };
};
