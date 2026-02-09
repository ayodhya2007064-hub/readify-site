const cacheName = 'readify-v2';
const assets = [
  './',
  './index.html',
  './books.html',
  './flow.html', 
  './tracker.html',
  './recommender.html',
  './feedback.html',
  './style.css',
  './Js/main.js',
  './Js/index.js',
  './Js/books.js',
  './Js/feedback.js',
  './Js/flow.js',
  './Js/recommender.js',
  './Js/tracker.js',
  './img/BN-Best-Books-of-the-Year.png',
  './img/0EfkvjCOb8HA-dKNR.jpg',
  './audio/JHAREE-Cane-Sugar.mp3',
  './audio/YTDowncom_YouTube_Cozy-2-Minute-Fall-Timer-with-Relaxing-L_Media__X-3QhAOQZk_004_360p.mp3',
  './audio/YTDowncom_YouTube_Lazy-Dolphin_Media_KFMvw7jSi6s_004_360p.mp3'
  
];

/// Install service worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets).catch(err => {
        console.log('Failed to cache:', err);
      });
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