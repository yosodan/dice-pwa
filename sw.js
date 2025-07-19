const CACHE = "dice-pwa-v1";
const ASSETS = [
  "/",
  "/public/",
  "/public/manifest.json",
  "/src/style.css",
  "/src/app.js",
  "/src/dice.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .catch((err) => {
        console.error("Failed to cache assets:", err);
      })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
