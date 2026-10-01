/* ================================================================
   shared-ui.js — نظام إسعاف عمان الذكي
   المكونات المشتركة لكل الصفحات
   الإصدار: 1.0
   ================================================================ */

/* ================================================================
   1) أيقونات SVG (بدون مكتبات خارجية)
   ================================================================ */
export const ICONS = {
  ambulance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10H6"/><path d="M8 8v4"/><path d="M9 18h6"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M8 8v4"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/><path d="M5 8h4"/><path d="M2 8h3"/><path d="M2 5h3"/><path d="M2 11h3"/></svg>`,
  plus:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  close:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
  check:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  edit:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  user:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  building:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/></svg>`,
  truck:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  phone:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  calendar:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  chart:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>`,
  bell:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  logout:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>`,
  sun:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
  moon:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  search:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  filter:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  print:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  download:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`,
  mapPin:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  alert:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>`,
  info:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
  heart:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  shield:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  crown:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zM2 20h20v-4H2v4z"/></svg>`,
  home:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>`,
  back:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
  refresh:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  star:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  award:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  clock:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  message:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  mega:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`
};

export function icon(name, size = 20) {
  const svg = ICONS[name] || ICONS.info;
  return `<span class="svg-icon" style="display:inline-flex;width:${size}px;height:${size}px;vertical-align:middle;">${svg}</span>`;
}

/* ================================================================
   2) الشريط العلوي (Navbar)
   ================================================================ */
export function renderNavbar(options = {}) {
  const {
    title = "نظام الإسعاف",
    user = null,
    showBack = false,
    backUrl = "javascript:history.back()",
    actions = [],
    showTheme = true,
    showLogout = true
  } = options;

  const el = document.getElementById("navbar");
  if (!el) return;

  const actionsHtml = actions.map(a =>
    `<button class="btn btn-ghost btn-sm" onclick="${a.onclick}">${a.icon ? icon(a.icon, 16) : ""} ${a.label || ""}</button>`
  ).join("");

  el.className = "navbar";
  el.innerHTML = `
    <div class="navbar-inner">
      <div class="d-flex align-center gap-1">
        ${showBack ? `<a href="${backUrl}" class="btn btn-ghost btn-icon" title="رجوع">${icon("back", 20)}</a>` : ""}
        <div class="navbar-brand">
          ${icon("ambulance", 26)}
          <span>${title}</span>
        </div>
      </div>
      <div class="navbar-actions">
        ${actionsHtml}
        ${showTheme ? `<button class="btn btn-ghost btn-icon" onclick="SharedUI.toggleTheme()" title="الوضع الليلي">${icon("moon", 18)}</button>` : ""}
        ${user ? `<span class="badge badge-primary d-none" style="display:inline-flex !important;">${icon("user", 14)} ${user.name || user.role || "مستخدم"}</span>` : ""}
        ${showLogout ? `<button class="btn btn-ghost btn-icon" onclick="SharedUI.logout()" title="خروج">${icon("logout", 18)}</button>` : ""}
      </div>
    </div>
  `;

  applyTheme();
}

/* ================================================================
   3) الوضع الليلي / النهاري
   ================================================================ */
export function applyTheme() {
  const saved = localStorage.getItem("amb_theme");
  const hour = new Date().getHours();
  const auto = (hour >= 19 || hour < 6) ? "dark" : "light";
  const theme = saved || auto;
  document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("amb_theme", next);
  toast(next === "dark" ? "🌙 الوضع الليلي" : "☀️ الوضع النهاري", "", "info", 1500);
}

/* ================================================================
   4) التوست (إشعار)
   ================================================================ */
export function toast(title, msg = "", type = "info", duration = 3500) {
  let cont = document.querySelector(".toast-container");
  if (!cont) {
    cont = document.createElement("div");
    cont.className = "toast-container";
    document.body.appendChild(cont);
  }
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<div class="toast-title">${title}</div>` +
                 (msg ? `<div class="toast-msg">${msg}</div>` : "");
  cont.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity .3s";
    setTimeout(() => el.remove(), 300);
  }, duration);
}

/* ================================================================
   5) التحميل (Loader)
   ================================================================ */
export function showLoader() {
  let el = document.querySelector(".loading-overlay");
  if (!el) {
    el = document.createElement("div");
    el.className = "loading-overlay";
    el.innerHTML = `<div class="loader"></div>`;
    document.body.appendChild(el);
  }
  el.classList.add("active");
}

export function hideLoader() {
  const el = document.querySelector(".loading-overlay");
  if (el) el.classList.remove("active");
}

/* ================================================================
   6) النوافذ المنبثقة (Modal)
   ================================================================ */
export function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

export function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("active");
}

/* إغلاق عند النقر خارج النافذة */
document.addEventListener("click", (e) => {
  if (e.target.classList?.contains("modal-overlay")) {
    e.target.classList.remove("active");
  }
});

/* إغلاق بمفتاح Escape */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
  }
});

/* ================================================================
   7) تأكيد (Confirm)
   ================================================================ */
export function confirmDialog(message, onConfirm, options = {}) {
  const {
    title = "تأكيد",
    confirmText = "نعم، تأكيد",
    cancelText = "إلغاء",
    danger = false
  } = options;

  let el = document.getElementById("_shared_confirm");
  if (el) el.remove();

  el = document.createElement("div");
  el.id = "_shared_confirm";
  el.className = "modal-overlay active";
  el.innerHTML = `
    <div class="modal modal-sm">
      <div class="modal-header">
        <div class="modal-title">${icon("alert", 20)} ${title}</div>
        <button class="btn btn-ghost btn-icon" onclick="SharedUI._closeConfirm()">${icon("close", 18)}</button>
      </div>
      <div class="modal-body">
        <p style="font-size:1rem;line-height:1.6;">${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="_shared_confirm_yes">${confirmText}</button>
        <button class="btn btn-ghost" onclick="SharedUI._closeConfirm()">${cancelText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(el);

  document.getElementById("_shared_confirm_yes").onclick = () => {
    closeConfirm();
    onConfirm && onConfirm();
  };
}

export function _closeConfirm() {
  const el = document.getElementById("_shared_confirm");
  if (el) el.remove();
}

function closeConfirm() { _closeConfirm(); }

/* ================================================================
   8) شريط التعميمات (Broadcast Bar)
   ================================================================ */
export function showBroadcastBar(broadcast, onClose) {
  let el = document.getElementById("_broadcast_bar");
  if (el) el.remove();

  if (!broadcast) return;

  el = document.createElement("div");
  el.id = "_broadcast_bar";
  el.className = "broadcast-bar";
  el.innerHTML = `
    ${icon("mega", 18)}
    <strong>${broadcast.title || "تعميم"}:</strong>
    <span>${broadcast.body || ""}</span>
    <button onclick="document.getElementById('_broadcast_bar').remove(); ${onClose ? onClose + '()' : ''}">
      ${icon("close", 14)}
    </button>
  `;
  document.body.insertBefore(el, document.body.firstChild);
}

/* ================================================================
   9) الجلسة (Session)
   ================================================================ */
export function logout() {
  confirmDialog("هل تريد تسجيل الخروج من النظام؟", () => {
    try {
      sessionStorage.removeItem("amb_user");
      sessionStorage.removeItem("amb_login_time");
    } catch (e) {}
    location.href = "index.html";
  }, { title: "خروج", confirmText: "نعم، خروج", danger: true });
}

/* ================================================================
   10) الطباعة
   ================================================================ */
export function printSection(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const w = window.open("", "", "width=900,height=650");
  w.document.write(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>طباعة</title>
      <link rel="stylesheet" href="./style.css">
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>body{padding:20px;background:#fff;} .no-print{display:none!important;}</style>
    </head>
    <body>${el.innerHTML}</body>
    </html>
  `);
  w.document.close();
  setTimeout(() => { w.focus(); w.print(); w.close(); }, 500);
}

/* ================================================================
   11) تنسيق الوقت النسبي
   ================================================================ */
export function timeAgo(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "الآن";
  if (diff < 3600) return `قبل ${Math.floor(diff / 60)} دقيقة`;
  if (diff < 86400) return `قبل ${Math.floor(diff / 3600)} ساعة`;
  if (diff < 604800) return `قبل ${Math.floor(diff / 86400)} يوم`;
  return d.toLocaleDateString("ar-OM");
}

/* ================================================================
   12) التنبيهات الصوتية
   ================================================================ */
export function beep(type = "info") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = type === "danger" ? 800 : type === "warning" ? 600 : 440;
    gain.gain.value = 0.1;
    osc.start();
    setTimeout(() => {
      osc.frequency.value = type === "danger" ? 600 : 440;
      setTimeout(() => { osc.stop(); ctx.close(); }, 150);
    }, 150);
  } catch (e) { /* ignore */ }
}

/* ================================================================
   13) الموقع الجغرافي
   ================================================================ */
export function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject("المتصفح لا يدعم تحديد الموقع");
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

/* ================================================================
   14) نسخ إلى الحافظة
   ================================================================ */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("✅ تم النسخ", "", "success", 1500);
    return true;
  } catch {
    toast("❌ فشل النسخ", "", "danger");
    return false;
  }
}

/* ================================================================
   15) التنقل السريع
   ================================================================ */
export function goto(page) {
  location.href = page;
}

/* ================================================================
   16) تحميل ملف JSON
   ================================================================ */
export function downloadJSON(data, filename = "data.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ================================================================
   17) تصدير CSV
   ================================================================ */
export function exportCSV(rows, filename = "data.csv") {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map(r => headers.map(h => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ================================================================
   18) تسجيل الدخول الموحّد — الصفحة توفّر onLogin
   ================================================================ */
export function renderLogin(onLogin, options = {}) {
  const {
    title = "نظام إسعاف عمان الذكي",
    subtitle = "أدخل كود الدخول للمتابعة",
    logo = "ambulance"
  } = options;

  document.body.innerHTML = `
    <div class="login-screen">
      <div class="login-box">
        <div class="login-logo">${icon(logo, 40)}</div>
        <h1 class="login-title">${title}</h1>
        <p class="login-sub">${subtitle}</p>
        <div id="_login_alert"></div>
        <div class="form-group">
          <input type="password" id="_login_code" class="form-control text-center fw-bold"
                 placeholder="• • • • • •" style="font-size:1.3rem;letter-spacing:.3rem;"
                 autocomplete="off" inputmode="numeric" maxlength="12">
        </div>
        <button class="btn btn-primary btn-lg btn-block" id="_login_btn">
          ${icon("check", 20)} دخول
        </button>
      </div>
    </div>
  `;

  const inp = document.getElementById("_login_code");
  const btn = document.getElementById("_login_btn");
  const alertBox = document.getElementById("_login_alert");

  inp.focus();
  inp.addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
  btn.onclick = doLogin;

  async function doLogin() {
    const code = inp.value.trim();
    if (!code) return;
    btn.disabled = true;
    btn.innerHTML = `<div class="loader" style="width:20px;height:20px;border-width:3px;"></div>`;
    alertBox.innerHTML = "";
    try {
      const user = await onLogin(code);
      if (!user) throw new Error("كود غير صالح أو معطّل");
      beep("success");
    } catch (e) {
      btn.disabled = false;
      btn.innerHTML = `${icon("check", 20)} دخول`;
      alertBox.innerHTML = `<div class="alert alert-danger">${icon("alert", 18)} ${e.message || e}</div>`;
      inp.select();
    }
  }
}

/* ================================================================
   19) كائن موحّد للاستخدام من onclick
   ================================================================ */
export const SharedUI = {
  toggleTheme,
  logout,
  toast,
  showLoader,
  hideLoader,
  openModal,
  closeModal,
  confirmDialog,
  _closeConfirm,
  printSection,
  timeAgo,
  beep,
  getLocation,
  copyToClipboard,
  goto,
  downloadJSON,
  exportCSV,
  icon,
  ICONS
};

window.SharedUI = SharedUI;
