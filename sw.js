const cacheName = 'readify-v2';
const assets = [
  'index.html',
  'book-explorer.html',
  'reading-flow.html',
  'tracker.html',
  'recommender.html',
  'about.html',

  'style.css',
  'Js/main.js'
];

/// Install service worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fetch from cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});