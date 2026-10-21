/* ═══════════════════════════════════════════════════════════
   Service Worker — نسخة الإنقاذ v4.0 (آمنة 100%)
   تستخدم Network-First: تجلب الجديد دائماً، والكاش احتياطي فقط
   ═══════════════════════════════════════════════════════════ */

const CACHE_NAME = "ambulance-v4-rescue";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          // مسح أي كاش قديم فوراً (إنقاذ)
          if (name !== CACHE_NAME) {
            console.log("🗑️ حذف كاش قديم:", name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 🚫 إصلاح حرج: طلبات Firebase و Firestore لا تعترض أبداً
  if (url.hostname.includes("firestore.googleapis.com") ||
      url.hostname.includes("firebase") ||
      url.hostname.includes("identitytoolkit") ||
      event.request.method !== "GET") {
    return; // المتصفح يذهب للشبكة مباشرة
  }

  // 🚫 لا تعترض Cross-Origin
  if (url.origin !== self.location.origin) {
    return;
  }

  // استراتيجية: شبكة أولاً، ثم الكاش (الأمان)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
