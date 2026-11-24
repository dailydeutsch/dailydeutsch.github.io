const CACHE_NAME = 'taeglich-wort-v12';
const CORE_ASSETS = [
  './',
  './index.html',
  './404.html',
  './manifest.webmanifest',
  './robots.txt',
  './sitemap.xml',
  './og-image.png',
  './dailydeutsch-logo-192.png',
  './dailydeutsch-logo-512.png',
  './dailydeutsch-logo-1024.png',
  './apple-touch-icon.png',
  './favicon-64.png',
  './level3.js',
  './assets/pretzel-dark.svg',
  './assets/photos/photos.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
        return Promise.resolve();
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  const request = event.request;
  if (request.method !== 'GET') {
    return;
  }
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function (response) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put('./index.html', copy);
        });
        return response;
      }).catch(function () {
        return caches.match('./index.html');
      })
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) {
        return cached;
      }
      return fetch(request).then(function (response) {
        const url = new URL(request.url);
        const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
        const isSameOrigin = url.origin === self.location.origin;
        if (response && response.status === 200 && (isFont || isSameOrigin)) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      });
    })
  );
});
