import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import '../styles/footer.css';
import '../styles/profile.css';
import TopBar from '../components/CompViewAsli/TopBar';
import AddToHomeScreen from '../components/AddToHomeScreen';
import LoadingScreen from '../components/LoadingScreen';
import '../styles/login.css';
import '../styles/signin.css';
import '../styles/settings.css';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set BASE_PATH on client side only
    (window as any).__BASE_PATH__ = process.env.NEXT_PUBLIC_BASE_PATH || '';
    
    // Register Service Worker only in production; unregister in development to avoid HMR issues
    if ('serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      } else {
        navigator.serviceWorker.getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => registration.unregister());
          })
          .catch(() => {});
        if (typeof window !== 'undefined' && 'caches' in window) {
          // Clear caches to avoid serving stale assets during development
          caches.keys().then((keys) => keys.forEach((key) => caches.delete(key))).catch(() => {});
        }
      }
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete}
          duration={2000}
        />
      )}
      <TopBar />
      <Component {...pageProps} />
      <AddToHomeScreen />
    </>
  );
}