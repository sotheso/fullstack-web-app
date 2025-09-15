import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/footer.css';
import TopBar from '../components/CompViewAsli/TopBar';
import AddToHomeScreen from '../components/AddToHomeScreen';
import '../styles/login.css';
import '../styles/signin.css';

export default function App({ Component, pageProps }: AppProps) {
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

  return (
    <>
      <TopBar />
      <Component {...pageProps} />
      <AddToHomeScreen />
    </>
  );
}