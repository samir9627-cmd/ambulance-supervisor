/* ═══════════════════════════════════════════════════════════
   Service Worker — نظام الإسعاف الذكي v3.0
   يدعم كل الصفحات: index, admin, app, ops, center, officer
   ═══════════════════════════════════════════════════════════ */

const CACHE_NAME = "ambulance-v3.0";

const URLS_TO_CACHE = [
  /* 🏠 الصفحة الرئيسية */
  "/",
  "/index.html",

  /* 🏛️ لوحة الإدارة */
  "/admin.html",

  /* 👨‍💼 لوحة المشرف (الجديدة) */
  "/app.html",

  /* 📡 لوحة العمليات */
  "/ops.html",

  /* 🏥 لوحة المركز */
  "/center.html",

  /* 🎖️ لوحة الضابط */
  "/officer.html",

  /* 📊 صفحة إحصائية */
  "/infographic.html",

  /* 📦 ملفات مساعدة */
  "/manifest.json",
  "/style.css",
  "/shared-ui.js",
  "/firebase-config.js",
  "/badges.js",

  /* 🖼️ أصول خارجية */
  "https://i.postimg.cc/q72nZ5HT/IMG-2018.jpg",
  "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;700;900&display=swap"
];

/* ─── التثبيت ─── */
self.addEventListener("install", (event) => {
  console.log("🔧 SW v3.0: تثبيت...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE).catch((err) => {
          console.warn("SW: بعض الملفات لم تُخزَّن:", err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

/* ─── التنشيط ─── */
self.addEventListener("activate", (event) => {
  console.log("✅ SW v3.0: تنشيط...");
  event.waitUntil(
    caches.keys()
      .then((names) => {
        return Promise.all(
          names.filter((n) => n !== CACHE_NAME).map((n) => {
            console.log("🗑️ حذف كاش قديم:", n);
            return caches.delete(n);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

/* ─── الجلب ─── */
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  /* 🚫 لا تعترض طلبات Firestore / Firebase */
  if (url.hostname.includes("firestore.googleapis.com") ||
      url.hostname.includes("firebase") ||
      url.hostname.includes("identitytoolkit")) {
    return;
  }

  /* 🚫 لا تعترض غير GET */
  if (event.request.method !== "GET") {
    return;
  }

  /* 🚫 لا تعترض cross-origin إلا ما نعرفه */
  if (url.origin !== self.location.origin &&
      !url.hostname.includes("postimg.cc") &&
      !url.hostname.includes("fonts.googleapis.com") &&
      !url.hostname.includes("fonts.gstatic.com")) {
    return;
  }

  /* استراتيجية: Network First */
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200 && response.type !== "opaque") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone).catch(() => {});
          });
        }
        return response;
      })
      .catch(() => {
        /* فشل الشبكة — رجوع للكاش */
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;

          /* 🔄 رجوع ذكي حسب المسار */
          if (event.request.headers.get("accept")?.includes("text/html")) {
            const path = url.pathname;

            if (path.includes("admin"))   return caches.match("/admin.html");
            if (path.includes("app"))     return caches.match("/app.html");
            if (path.includes("ops"))     return caches.match("/ops.html");
            if (path.includes("center"))  return caches.match("/center.html");
            if (path.includes("officer")) return caches.match("/officer.html");
            if (path.includes("infographic")) return caches.match("/infographic.html");

            return caches.match("/index.html");
          }

          return new Response("Offline", { status: 503 });
        });
      })
  );
});

/* ─── رسائل من التطبيق ─── */
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
