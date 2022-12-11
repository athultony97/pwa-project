// cache name
const cacheName = "cacheAssets-v-alpha-1.0"

// network with cache fallback
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request)
    })
  )
})

// cache assets
const baseURL = "https://athultony97.github.io/pwa-project/"

const cacheAssets = [
  baseURL,
  `${baseURL}index.html`,
  `${baseURL}script.js`,
  `${baseURL}manifest.json`,
  `${baseURL}service-worker.js`,
  `${baseURL}style.css`,
  `${baseURL}assets/musical-note.png`,
  `${baseURL}assets/musical-note(192x192).png`
] // Add all the files that you want to cache

// install event
self.addEventListener("install", function (event) {
  self.skipWaiting()
  caches
    .open(cacheName)
    .then(function (cache) {
      console.log("[Service Worker] Installing...")
      return cache.addAll(cacheAssets)
    })
    .catch(err => {
      console.log("something went wrong", err)
    })
})

// activate event
self.addEventListener("activate", function (event) {
  console.log("[Service worker] activated", event)
  event.waitUntil(clients.claim())
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.filter(cache => cache !== cacheName).map(cacheName => caches.delete(cacheName)))
    })
  )
})

self.addEventListener("notificationclick", (event) => {
    const action = event.action;
    const notification = event.notification;
    const notificationData = notification.data;
    console.log("Data:", action);
    const options = {
      includeUncontrolled: true,
      type: "all",
    };

    switch (action) {
        case "agree":
          clients.matchAll(options).then((clients) => {
            clients.forEach((client) => {
              client.postMessage("So we both agree on that!");
            });
          });
          break;
    
        case "disagree":
          clients.matchAll(options).then((clients) => {
            clients.forEach((clients) => {
              clients.postMessage("Let's agree to disagree.");
            });
          });
          break;
    
        case "":
          console.log("Clicked on the notification.");
          const openPromise = clients.openWindow("/index.html");
          event.waitUntil(openPromise);
          break;
      }
})