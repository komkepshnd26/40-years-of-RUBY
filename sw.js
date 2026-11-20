/* Service worker: menyimpan berkas aplikasi supaya jalan tanpa internet.
   Naikkan VERSION setiap kali ada berkas yang diganti. */
const VERSION = 'undian-ruby-v6';
const XLSX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
const CORE = ['./', './index.html', './manifest.json', './sw.js', './logo.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      Promise.all([
        cache.addAll(CORE),
        // pembaca Excel dari CDN, dicoba disimpan juga (tidak wajib berhasil)
        fetch(new Request(XLSX_URL, { mode: 'no-cors' })).then((res) => cache.put(XLSX_URL, res)).catch(() => {})
      ])
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const isXlsx = req.url === XLSX_URL;
  if (!isXlsx && new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req, { ignoreSearch: !isXlsx, ignoreVary: true }).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || (isXlsx && res.type === 'opaque'))) {
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
