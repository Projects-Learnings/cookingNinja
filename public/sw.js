const CACHE_NAME = 'cooking-ninja-cache-v1';

// Customize this with the files you want to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    // Add other static assets here, like images or fonts
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});