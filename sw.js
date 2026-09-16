// Gabby's — offline app shell service worker.
//
// Strategy: stale-while-revalidate for the app's own static shell files only
// (this app's HTML/JS/CSS/JSON/images/vendored scanner lib), so the UI opens
// even with no signal at all (the real-world "standing in a store with bad
// wifi" case). Product LOOKUPS go straight to Open Beauty Facts and are never
// touched here — they must keep failing honestly offline, never silently
// serve a stale cached product as if it were current data.
//
// Bump CACHE_NAME on any future shell-file change; activate() cleans up any
// previous gabbys-shell-* cache automatically.
const CACHE_VERSION = "v1";
const CACHE_NAME = "gabbys-shell-" + CACHE_VERSION;

const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./data/ingredient-rules.json",
  "./art/hair-types.svg",
  "./art/icon-512.png",
  "./vendor/zxing-0.21.3.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name.startsWith("gabbys-shell-") && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin GET requests for this app's own shell files.
  // Everything else (Open Beauty Facts lookups/search/recommendations, any
  // other cross-origin request, non-GET requests) passes through completely
  // untouched — no respondWith, no caching, so a failed lookup keeps failing
  // exactly as it does today instead of silently getting a stale answer.
  if (url.origin !== self.location.origin || req.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cached) => {
        // Always fetch fresh from the network to update the cache for next
        // time. This is the "revalidate" half of stale-while-revalidate; it
        // runs whether or not we already have something cached to serve.
        const revalidate = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => undefined);

        if (cached) {
          // Stale-while-revalidate: return the cached response immediately
          // (fast, works offline) without waiting on the network fetch above.
          return cached;
        }
        // Nothing cached yet — fall through to the network fetch. If that
        // also fails (first-ever visit, offline), there's no fallback: the
        // request just fails naturally, which is correct.
        return revalidate.then((res) => res || Promise.reject(new Error("offline and not cached")));
      })
    )
  );
});
