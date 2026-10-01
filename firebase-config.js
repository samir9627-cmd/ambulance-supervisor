/* ================================================================
   firebase-config.js — ملف التهيئة المشترك
   مشروع: ambulance-supervisor
   الاستخدام: <script type="module" src="./firebase-config.js"></script>
   ================================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ---------- إعدادات Firebase ---------- */
export const firebaseConfig = {
  apiKey: "AIzaSyCQoRrx5qJ_vl9PO9qEBDC6lfHCrNScx2I",
  authDomain: "ambulance-supervisor.firebaseapp.com",
  projectId: "ambulance-supervisor",
  storageBucket: "ambulance-supervisor.firebasestorage.app",
  messagingSenderId: "1018984853139",
  appId: "1:1018984853139:web:28b1cbaf367832dd506766",
  measurementId: "G-6YYRPCFJFD"
};

/* ---------- التهيئة ---------- */
export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);

/* ---------- تصدير كل ما تحتاجه الصفحات ---------- */
export {
  collection, doc, addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc, query, where, orderBy, limit,
  onSnapshot, serverTimestamp, Timestamp, writeBatch
};

/* ================================================================
   أسماء المجموعات (Collections) — مصدر واحد للحقيقة
   عدّل هنا فقط إذا أردت تغيير الأسماء
   ================================================================ */
export const COL = {
  issues:      "issues",        // الإشكاليات
  notes:       "notes",         // الملاحظات
  paramedics:  "paramedics",    // المسعفون
  vehicles:    "vehicles",      // المركبات
  supervisors: "supervisors",   // المشرفون
  officers:    "officers",      // الضباط / الصف ضباط
  codes:       "access_codes",  // أكواد الدخول
  settings:    "settings"       // الإعدادات العامة
};

/* ================================================================
   دوال مساعدة مشتركة
   ================================================================ */

/* --- توليد معرّف فريد بسيط --- */
export function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/* --- تنسيق التاريخ --- */
export function fmtDate(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString("ar-OM", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  });
}

/* --- قراءة إعدادات عامة من settings/app --- */
export async function loadSettings() {
  try {
    const snap = await getDoc(doc(db, COL.settings, "app"));
    return snap.exists() ? snap.data() : {};
  } catch (e) {
    console.warn("loadSettings failed:", e);
    return {};
  }
}

/* --- حفظ إعدادات عامة --- */
export async function saveSettings(data) {
  await setDoc(doc(db, COL.settings, "app"), data, { merge: true });
}

/* --- التحقق من كود دخول --- */
export async function verifyCode(code) {
  try {
    const q = query(
      collection(db, COL.codes),
      where("code", "==", code),
      where("active", "==", true),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
  } catch (e) {
    console.error("verifyCode failed:", e);
    return null;
  }
}

/* --- كتابة إشكالية جديدة --- */
export async function saveEntry(entry) {
  const payload = {
    ...entry,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: entry.status || "مفتوحة"
  };
  const ref = await addDoc(collection(db, COL.issues), payload);
  return ref.id;
}

/* --- مراقبة الإشكاليات الحيّة --- */
export function watchIssues(cb, max = 200) {
  const q = query(
    collection(db, COL.issues),
    orderBy("createdAt", "desc"),
    limit(max)
  );
  return onSnapshot(q, snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    cb(list);
  }, err => console.error("watchIssues error:", err));
}

/* --- فحص الاتصال --- */
export async function pingFirestore() {
  try {
    await getDocs(query(collection(db, COL.settings), limit(1)));
    return true;
  } catch (e) {
    console.error("pingFirestore failed:", e);
    return false;
  }
}

console.log("✅ firebase-config.js محمّل — project:", firebaseConfig.projectId);
