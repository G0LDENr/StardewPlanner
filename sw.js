const CACHE_NAME = 'stardew-planner-v1.3.7';
const ASSETS = [
  './',
  './index.html',
  './views/Cultivos.html',
  './views/Pesca.html',
  './views/Animal.html',
  './css/styles.css',
  './css/cultivos.css',
  './css/pesca.css',
  './css/animal.css',
  './app.js',
  './manifest.json',
  './images/Fondo.jpg',
  './images/icons/icon.png',
  './js/cultivos.js',
  './js/pesca.js',
  './js/animal.js',
  './database/cultivos.js',
  './database/pesca.js',
  './database/animal.js',
];

// Instalación
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activación
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch (estrategia cache-first)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});