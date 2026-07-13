/*
 * Yakeline Contadora — conservative service worker.
 * Strategy chosen to be SAFE on a live site:
 *   - Navigations: network-first, falling back to cache then an offline page.
 *     (Never serves a stale app shell while online.)
 *   - Static assets (script/style/image/font): stale-while-revalidate.
 *   - Everything else (Next data, APIs, POST, cross-origin): untouched.
 * Bump CACHE to invalidate old caches on the next deploy.
 */
const CACHE = "yc-static-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;

  // App navigations: always try the network first so content stays fresh.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() =>
        caches
          .match(req)
          .then((cached) => cached || caches.match(OFFLINE_URL))
      )
    );
    return;
  }

  // Static assets: serve from cache instantly, refresh in the background.
  const dest = req.destination;
  if (dest === "style" || dest === "script" || dest === "image" || dest === "font") {
    event.respondWith(
      caches.open(CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const network = fetch(req)
            .then((res) => {
              if (res && res.status === 200 && res.type === "basic") {
                cache.put(req, res.clone());
              }
              return res;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});
