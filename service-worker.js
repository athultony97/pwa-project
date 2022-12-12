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

const cacheAssets = [
  baseURL,
  `${baseURL}index.html`,
  `${baseURL}index1.html`,
  `${baseURL}main.js`,
  `${baseURL}manifest.json`,
  `${baseURL}service-worker.js`,
  `${baseURL}style.css`,
  `${baseURL}assets/output-onlinepngtools_192.png`,
  `${baseURL}assetsoutput-onlinepngtools_512.png`
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
