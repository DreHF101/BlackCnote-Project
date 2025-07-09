/**
 * Service Worker for BlackCnote Investment Platform
 * Provides offline functionality and performance optimizations
 */

const CACHE_NAME = 'blackcnote-v1.0.0';
const STATIC_CACHE_NAME = 'blackcnote-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'blackcnote-dynamic-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/investments', 
  '/ai-assistant',
  '/calculator',
  '/analytics',
  '/transactions',
  '/referrals',
  '/manifest.json',
  // Add critical CSS and JS files
  '/src/index.css',
  '/src/main.tsx'
];

// API endpoints to cache with network-first strategy
const API_CACHE_PATTERNS = [
  '/api/investment-plans',
  '/api/users/',
  '/api/ai/recommendations',
  '/api/ai/dynamic-apy'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // API requests - Network first, cache fallback
  if (request.url.includes('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Static assets - Cache first, network fallback
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image') {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Navigation requests - Network first, cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Default strategy - Network first
  event.respondWith(networkFirstStrategy(request));
});

// Network-first strategy (for API calls and navigation)
async function networkFirstStrategy(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // If successful, cache the response (for eligible requests)
    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      
      // Cache API responses and pages
      if (request.url.includes('/api/') || request.mode === 'navigate') {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        cache.put(request, responseClone);
      }
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If it's a navigation request and no cache, return offline page
    if (request.mode === 'navigate') {
      return caches.match('/') || new Response(
        createOfflineHTML(),
        { 
          headers: { 'Content-Type': 'text/html' },
          status: 200
        }
      );
    }
    
    // For other requests, return network error
    throw error;
  }
}

// Cache-first strategy (for static assets)
async function cacheFirstStrategy(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Cache miss, try network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const responseClone = networkResponse.clone();
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Both cache and network failed for:', request.url);
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-investments') {
    event.waitUntil(syncInvestments());
  }
  
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New investment update available',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'blackcnote-notification',
    data: {
      url: '/dashboard'
    },
    actions: [
      {
        action: 'view',
        title: 'View Dashboard'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    requireInteraction: true,
    silent: false
  };
  
  event.waitUntil(
    self.registration.showNotification('BlackCnote Investment', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if there's already a window/tab open
        for (const client of clientList) {
          if (client.url.includes('/dashboard') && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window/tab
        if (clients.openWindow) {
          return clients.openWindow('/dashboard');
        }
      })
    );
  }
});

// Sync functions
async function syncInvestments() {
  try {
    // Get pending investment actions from IndexedDB
    // Send to server when online
    console.log('Syncing pending investments...');
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to sync investments:', error);
    throw error;
  }
}

async function syncTransactions() {
  try {
    // Get pending transaction data from IndexedDB
    // Send to server when online
    console.log('Syncing pending transactions...');
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to sync transactions:', error);
    throw error;
  }
}

// Create offline HTML page
function createOfflineHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BlackCnote - Offline</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #0f0f0f;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          text-align: center;
        }
        .container {
          max-width: 400px;
          padding: 2rem;
        }
        .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        h1 {
          color: #3b82f6;
          margin-bottom: 1rem;
        }
        p {
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .retry-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
        }
        .retry-btn:hover {
          background: #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">📱</div>
        <h1>You're Offline</h1>
        <p>
          BlackCnote Investment Platform is currently offline. 
          Check your internet connection and try again.
        </p>
        <button class="retry-btn" onclick="window.location.reload()">
          Retry Connection
        </button>
      </div>
    </body>
    </html>
  `;
}

// Message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE_NAME)
        .then((cache) => cache.addAll(event.data.payload))
    );
  }
});

console.log('BlackCnote Service Worker loaded successfully');