const CACHE_NAME = 'stardew-planner-v1.2.4';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './app.js',
  './manifest.json',
  './images/Fondo.jpg',          // 👈 Ruta y mayúscula exacta
  './images/icons/icon.png'      // 👈 Ruta del ícono
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