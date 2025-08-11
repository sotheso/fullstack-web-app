import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    (window as any).__BASE_PATH__ = process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  return <Component {...pageProps} />;
}