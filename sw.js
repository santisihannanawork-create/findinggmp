const CACHE_NAME = 'gmp-v1';
// Daftar file yang harus disimpan agar bisa offline
const assets = [
  './index.html',
  './manifest.json',
  './exceljs.min.js',
  './FileSaver.min.js',
  './exif.js'
];

// Tahap Install: Simpan file ke cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Tahap Fetch: Ambil file dari cache jika offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
