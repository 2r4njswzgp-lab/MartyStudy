/* MartyStudy – service worker (offline + automatická aktualizace) */
const CACHE = "martystudy-v23";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/app.js",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-maskable.svg",
  "./img/lumi.png",
  "./video.mp4",
  "./pin.txt"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// velké/statické soubory držíme cache-first, kód a obsah bereme network-first
const MEDIA = /\.(png|jpe?g|gif|svg|webp|mp4|webm|woff2?)$/i;

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isMedia = MEDIA.test(url.pathname);

  if (isMedia) {
    // cache-first (rychlé, offline, mění se zřídka – při změně stačí bump verze)
    e.respondWith(
      caches.match(req).then((cached) =>
        cached ||
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
      )
    );
    return;
  }

  // network-first pro HTML/JS/CSS/JSON – online vždy nejnovější, offline z cache
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => cached || caches.match("./index.html"))
      )
  );
});
