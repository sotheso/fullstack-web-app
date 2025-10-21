const CACHE_NAME = 'davvat-static-v3';

// فقط فایل‌های static - بدون API
const STATIC_ASSETS = [
  '/icon-192-dark.svg',
  '/icon-512-dark.svg',
  '/banner.png',
];

// Install - فقط فایل‌های static را cache کن
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - پاک کردن cache های قدیمی
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - استراتژی هوشمند
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ❌ هیچ‌وقت API calls را cache نکن
  if (url.pathname.startsWith('/api/') || 
      url.hostname.includes('localhost') && url.port === '5001' ||
      url.hostname !== self.location.hostname) {
    // Network only - بدون cache
    event.respondWith(fetch(request));
    return;
  }

  // ❌ HTML pages را cache نکن (برای جلوگیری از مشکلات hydration)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(fetch(request));
    return;
  }

  // ✅ فقط فایل‌های static (تصاویر، فونت‌ها، CSS، JS)
  if (request.destination === 'image' || 
      request.destination === 'font' ||
      request.destination === 'style' ||
      request.destination === 'script' ||
      url.pathname.includes('/_next/static/')) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((networkResponse) => {
            // فقط اگر response موفق بود، cache کن
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // برای بقیه، مستقیم از network بگیر
  event.respondWith(fetch(request));
});
