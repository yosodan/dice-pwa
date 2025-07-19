const CACHE = "dice-pwa-v1";
const ASSETS = [
  "/",
  "/public/index.html",
  "/src/style.css",
  "/src/app.js",
  "/src/dice.js",
  "/public/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
