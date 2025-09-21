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
    
    // Register Service Worker for PWA functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
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