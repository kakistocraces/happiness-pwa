const CACHE='hp-v1';
const ASSETS=[
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(res=>res||fetch(e.request).then(r=>{
      const resp = r.clone();
      caches.open(CACHE).then(c=>c.put(e.request, resp));
      return r;
    }).catch(()=>caches.match('./index.html')))
  );
});
