/* نظام الإسعاف الذكي — Service Worker v1.0 */
const CACHE_NAME = "ambulance-v1.0";
const URLS_TO_CACHE = [
  "/center.html",
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/shared-ui.js",
  "/firebase-config.js",
  "/badges.js",
  "https://i.postimg.cc/q72nZ5HT/IMG-2018.jpg",
  "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;700;900&display=swap"
];

/* عند التثبيت — تخزين الملفات */
self.addEventListener("install", (event) => {
  console.log("🔧 SW: تثبيت...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE).catch((err) => {
        console.warn("SW: بعض الملفات لم تُخزَّن:", err);
      });
    })
  );
  self.skipWaiting();
});

/* عند التنشيط — حذف الإصدارات القديمة */
self.addEventListener("activate", (event) => {
  console.log("✅ SW: تنشيط...");
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      );
    })
  );
  self.clients.claim();
});

/* عند الطلب — جرّب الشبكة أولاً، ثم الكاش */
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  /* تجاهل طلبات Firestore — يجب أن تكون مباشرة */
  if (url.hostname.includes("firestore.googleapis.com") ||
      url.hostname.includes("firebase") ||
      event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        /* خزّن نسخة في الكاش */
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        /* فشل الاتصال — استخدم الكاش */
        return caches.match(event.request).then((cached) => {
          return cached || caches.match("/center.html");
        });
      })
  );
});
