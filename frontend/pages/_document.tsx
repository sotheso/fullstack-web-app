import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fa">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/DavvatLogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/DavvatLogo.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/DavvatLogo.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/DavvatLogo.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta Tags */}
        <meta name="application-name" content="Davvvat" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Davvvat" />
        <meta name="description" content="بهترین رویدادها و برندها" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#F26430" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#F26430" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Davvvat" />
        <meta property="og:description" content="بهترین رویدادها و برندها" />
        <meta property="og:site_name" content="Davvvat" />
        <meta property="og:url" content="https://davvvat.ir" />
        <meta property="og:image" content="/DavvatLogo.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://davvvat.ir" />
        <meta name="twitter:title" content="Davvvat" />
        <meta name="twitter:description" content="بهترین رویدادها و برندها" />
        <meta name="twitter:image" content="/DavvatLogo.png" />
        <meta name="twitter:creator" content="@davvvat" />
        <meta name="twitter:site" content="@davvvat" />
        <meta name="twitter:image:alt" content="Davvvat Logo" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
