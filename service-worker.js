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
const baseURL =  "https://athultony97.github.io/pwa-project/"

const cacheStores = [
    "https://athultony97.github.io/pwa-project/",
    "https://athultony97.github.io/pwa-project/index.html",
    "https://athultony97.github.io/pwa-project/index1.html",
    "https://athultony97.github.io/pwa-project/settings.html",
    "https://athultony97.github.io/pwa-project/script.js",
    "https://athultony97.github.io/pwa-project/manifest.json",
    "https://athultony97.github.io/pwa-project/service-worker.js",
    "https://athultony97.github.io/pwa-project/style.css",
    "https://athultony97.github.io/pwa-project/assets/output-onlinepngtools_512.png",
    "https://athultony97.github.io/pwa-project/assets/output-onlinepngtools_192.png"
  ]

// install event
self.addEventListener("install", function (event) {
    self.skipWaiting()
    caches
      .open(cacheName)
      .then(function (cache) {
        console.log("[Service Worker] Installing...")
        return cache.addAll(cacheStores)
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
  });