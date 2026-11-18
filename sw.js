/* Service worker Undian HUT 40 Tahun Ruby.
   Semua berkas aplikasi disimpan di cache saat pertama dibuka, jadi sesudah itu
   aplikasi jalan tanpa internet. Ubah VERSION setiap kali ada berkas yang diganti
   supaya perangkat mengambil versi baru. */
const VERSION = 'undian-ruby-v1';

const CORE = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './xlsx.full.min.js',
  './marcellus-latin-400-normal.woff2',
  './figtree-latin-wght-normal.woff2',
  './ruby-40-logo-cropped.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache dulu, lalu perbarui di latar belakang kalau ada internet. */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached || (req.mode === 'navigate' ? caches.match('./index.html') : undefined));
      return cached || network;
    })
  );
});
