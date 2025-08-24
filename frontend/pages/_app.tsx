import type { AppProps } from 'next/app';
import '../styles/globals.css';
import TopBar from '../components/CompViewAsli/TopBar';
import AddToHomeScreen from '../components/AddToHomeScreen';

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
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
  }
  return (
    <>
      <TopBar />
      <Component {...pageProps} />
      <AddToHomeScreen />
    </>
  );
}