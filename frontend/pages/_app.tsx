import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import '../styles/footer.css';
import '../styles/profile.css';
import TopBar from '../components/CompViewAsli/TopBar';
import AddToHomeScreen from '../components/AddToHomeScreen';
import LoadingScreen from '../components/LoadingScreen';
import NetworkStatusBanner from '../components/NetworkStatusBanner';
import { EventsProvider } from '../contexts/EventsContext';
import { EventsPageProvider } from '../contexts/EventsPageContext';
import { EventDetailsProvider } from '../contexts/EventDetailsContext';
import { NetworkProvider } from '../contexts/NetworkContext';
import { RegisteredEventsProvider } from '../contexts/RegisteredEventsContext';
import '../styles/login.css';
import '../styles/signin.css';
import '../styles/settings.css';
import '../styles/home.css';
import '../styles/blogs.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Pages that require authentication
  const protectedPages = ['/home', '/profile', '/settings', '/bookmarks', '/events', '/blogs'];
  
  // Pages that should redirect if already authenticated
  const authPages = ['/', '/login', '/signin', '/complete-profile', '/forgot-password'];

  useEffect(() => {
    // Check initial online status
    setIsOffline(!navigator.onLine);

    // Set BASE_PATH on client side only
    (window as any).__BASE_PATH__ = process.env.NEXT_PUBLIC_BASE_PATH || '';
    
    // Authentication check
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      const currentPath = router.pathname;
      const hasUser = !!user;
      
      // If accessing protected page without authentication
      if (protectedPages.includes(currentPath) && !hasUser) {
        router.push('/login');
        return;
      }
      
      // If accessing auth pages while already authenticated
      if (authPages.includes(currentPath) && hasUser) {
        router.push('/home');
        return;
      }
      
      // Special handling for root path (/)
      if (currentPath === '/' && hasUser) {
        router.push('/home');
        return;
      }
    };

    // Check auth after router is ready
    if (router.isReady) {
      checkAuth();
    }
    
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
  }, [router.isReady, router.pathname]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <NetworkProvider>
      <EventsProvider>
        <EventsPageProvider>
          <EventDetailsProvider>
            <RegisteredEventsProvider>
              <NetworkStatusBanner />
              {isLoading && (
                <LoadingScreen 
                  onLoadingComplete={handleLoadingComplete}
                  duration={2000}
                  showOfflineError={isOffline}
                />
              )}
              {!authPages.includes(router.pathname) && <TopBar />}
              <Component {...pageProps} />
              <AddToHomeScreen />
            </RegisteredEventsProvider>
          </EventDetailsProvider>
        </EventsPageProvider>
      </EventsProvider>
    </NetworkProvider>
  );
}