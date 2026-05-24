// public/sw.js - Service Worker básico para BarberFlow PWA
// Caché simple para modo offline básico (app shell)

const CACHE_NAME = 'barberflow-v1';
const urlsToCache = [
  '/',
  '/manifest.webmanifest',
  // Agregar más rutas estáticas según crezcan las features
];

// Install event - precache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching app shell');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - limpiar caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache first, fallback network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo GET
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          // Cachear dinámicamente assets y páginas
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback offline simple (puede mejorarse con página offline.html)
          if (request.destination === 'document') {
            return caches.match('/');
          }
        });
    })
  );
});
