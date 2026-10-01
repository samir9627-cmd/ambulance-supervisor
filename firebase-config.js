/* ================================================================
   firebase-config.js — نظام إسعاف عمان الذكي
   الملف المركزي: تهيئة Firebase + كل الدوال المشتركة
   الإصدار: 2.0
   ================================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection, doc,
  addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc,
  query, where, orderBy, limit,
  onSnapshot, serverTimestamp, Timestamp,
  writeBatch,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================================================================
   1) إعدادات Firebase
   ================================================================ */
export const firebaseConfig = {
  apiKey:            "AIzaSyCQoRrx5qJ_vl9PO9qEBDC6lfHCrNScx2I",
  authDomain:        "ambulance-supervisor.firebaseapp.com",
  projectId:         "ambulance-supervisor",
  storageBucket:     "ambulance-supervisor.firebasestorage.app",
  messagingSenderId: "1018984853139",
  appId:             "1:1018984853139:web:28b1cbaf367832dd506766",
  measurementId:     "G-6YYRPCFJFD"
};

/* ================================================================
   2) التهيئة
   ================================================================ */
export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);

/* ================================================================
   3) إعادة تصدير أدوات Firebase
   ================================================================ */
export {
  collection, doc,
  addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc,
  query, where, orderBy, limit,
  onSnapshot, serverTimestamp, Timestamp,
  writeBatch,
  increment
};

/* ================================================================
   4) أسماء المجموعات (Collections)
   ================================================================ */
export const COL = {
  issues:      "issues",        // الإشكاليات الإدارية
  reports:     "reports",       // 🆕 بلاغات الإسعاف
  shifts:      "shifts",        // 🆕 المداومات اليومية
  notes:       "notes",         // الملاحظات
  paramedics:  "paramedics",    // المسعفون
  vehicles:    "vehicles",      // 🆕 المركبات
  centers:     "centers",       // 🆕 المراكز
  supervisors: "supervisors",   // المشرفون
  officers:    "officers",      // الضباط
  codes:       "access_codes",  // أكواد الدخول
  settings:    "settings",      // الإعدادات
  broadcasts:  "broadcasts",    // التعميمات
  chats:       "chats"          // المحادثات
};

/* ================================================================
   5) الثوابت (Enums)
   ================================================================ */
export const SEVERITY = {
  CRITICAL: "حرج",
  HIGH:     "خطير",
  MEDIUM:   "متوسط",
  LOW:      "بسيط"
};

export const SEVERITY_COLORS = {
  "حرج":   "critical",
  "خطير":  "high",
  "متوسط": "medium",
  "بسيط":  "low"
};

export const REPORT_STATUS = {
  OPEN:     "مفتوح",
  PROGRESS: "جاري",
  CLOSED:   "مغلق"
};

export const SHIFT_PERIODS = {
  MORNING: { key: "morning", label: "الصباحية",  time: "06:00 - 14:00", icon: "🌅" },
  EVENING: { key: "evening", label: "المسائية",  time: "14:00 - 22:00", icon: "🌇" },
  NIGHT:   { key: "night",   label: "الليلية",   time: "22:00 - 06:00", icon: "🌙" }
};

export const VEHICLE_STATUS = {
  AVAILABLE: "متاحة",
  BUSY:      "مشغولة",
  MAINT:     "صيانة",
  OUT:       "خارج الخدمة"
};

/* ================================================================
   6) دوال مساعدة عامة
   ================================================================ */

/* --- معرّف فريد --- */
export function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/* --- تنسيق التاريخ --- */
export function fmtDate(ts, withTime = true) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const opts = {
    year: "numeric", month: "2-digit", day: "2-digit"
  };
  if (withTime) {
    opts.hour = "2-digit";
    opts.minute = "2-digit";
  }
  return d.toLocaleString("ar-OM", opts);
}

/* --- تنسيق الوقت فقط --- */
export function fmtTime(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString("ar-OM", {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
}

/* --- تاريخ اليوم بصيغة YYYY-MM-DD --- */
export function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/* --- فرق بالثواني بين تاريخين --- */
export function diffSeconds(a, b = new Date()) {
  const t1 = a?.toDate ? a.toDate().getTime() : new Date(a).getTime();
  const t2 = b?.toDate ? b.toDate().getTime() : new Date(b).getTime();
  return Math.floor((t2 - t1) / 1000);
}

/* --- تنسيق مدة بالثواني --- */
export function fmtDuration(sec) {
  if (!sec && sec !== 0) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s} ثانية`;
  if (m < 60) return `${m} دقيقة ${s ? s + " ث" : ""}`.trim();
  const h = Math.floor(m / 60);
  return `${h} ساعة ${m % 60} دقيقة`;
}

/* --- تنظيف النص --- */
export function clean(str) {
  return String(str || "").trim().replace(/\s+/g, " ");
}

/* ================================================================
   7) الإعدادات العامة
   ================================================================ */
export async function loadSettings() {
  try {
    const snap = await getDoc(doc(db, COL.settings, "app"));
    return snap.exists() ? snap.data() : {};
  } catch (e) {
    console.warn("loadSettings:", e);
    return {};
  }
}

export async function saveSettings(data) {
  await setDoc(doc(db, COL.settings, "app"),
    { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

/* الإعدادات الافتراضية — تُنشأ إذا لم توجد */
export async function ensureDefaultSettings() {
  const ref = doc(db, COL.settings, "app");
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();

  const defaults = {
    reportTypes: [
      "حادث مروري", "حالة قلبية", "صعوبة تنفس", "إصابة عمل",
      "حالة ولادة", "تسمم", "حريق", "غرق",
      "سقوط من ارتفاع", "حالة نفسية", "نقل بين مستشفيات", "أخرى"
    ],
    severities: ["حرج", "خطير", "متوسط", "بسيط"],
    hospitals: [
      "مستشفى السلطاني", "مستشفى النهضة", "مستشفى خولة",
      "مستشفى الجامعة", "مستشفى صحار", "مستشفى نزوى",
      "صحي السيب", "صحي الخوض", "عيادة خاصة",
      "حالة ميدانية (لا نقل)", "رفض النقل"
    ],
    nationalities: ["عماني", "خليجي", "عربي", "آسيوي", "أفريقي", "أوروبي", "أخرى"],
    actions: [
      "إنعاش قلبي (CPR)", "أكسجين", "تثبيت عمود فقري",
      "ضمادة / إيقاف نزيف", "دعامة / جبيرة", "محلول وريدي (IV)",
      "أدوية إسعاف أولي", "توصيل جهاز مراقبة",
      "تدخل جراحي ميداني", "أخرى"
    ],
    sectors: [
      "السيب", "بوشر", "مطرح", "العامرات", "قريات",
      "بدبد", "نزوى", "صحار", "صلالة", "صور"
    ],
    centers: [
      "مركز مسقط", "مركز السيب", "مركز بوشر",
      "مركز صحار", "مركز نزوى", "مركز صلالة"
    ],
    createdAt: serverTimestamp()
  };
  await setDoc(ref, defaults);
  return defaults;
}

/* ================================================================
   8) أكواد الدخول
   ================================================================ */
export async function verifyCode(code) {
  try {
    const c = String(code || "").trim();
    if (!c) return null;
    const q = query(
      collection(db, COL.codes),
      where("code", "==", c),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    const data = d.data();
    if (data.active === false) return null;
    return { id: d.id, ...data };
  } catch (e) {
    console.error("verifyCode:", e);
    return null;
  }
}

export function saveSession(user) {
  try {
    sessionStorage.setItem("amb_user", JSON.stringify(user));
    sessionStorage.setItem("amb_login_time", Date.now().toString());
  } catch (e) { console.warn(e); }
}

export function getSession() {
  try {
    const raw = sessionStorage.getItem("amb_user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearSession() {
  sessionStorage.removeItem("amb_user");
  sessionStorage.removeItem("amb_login_time");
}

/* ================================================================
   9) الإشكاليات الإدارية (issues)
   ================================================================ */
export async function saveEntry(entry) {
  const payload = {
    ...entry,
    status: entry.status || REPORT_STATUS.OPEN,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  const ref = await addDoc(collection(db, COL.issues), payload);
  return ref.id;
}

export function watchIssues(cb, max = 200) {
  const q = query(
    collection(db, COL.issues),
    orderBy("createdAt", "desc"),
    limit(max)
  );
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    err => console.error("watchIssues:", err)
  );
}

/* ================================================================
   10) البلاغات (reports) 🆕
   ================================================================ */

/* --- توليد رقم بلاغ جديد --- */
export async function nextReportNumber(centerId = "global") {
  try {
    const counterRef = doc(db, COL.settings, `counter_${centerId}`);
    const snap = await getDoc(counterRef);
    const current = snap.exists() ? (snap.data().value || 1000) : 1000;
    const next = current + 1;
    await setDoc(counterRef, { value: next, updatedAt: serverTimestamp() }, { merge: true });
    return next;
  } catch (e) {
    console.error("nextReportNumber:", e);
    // fallback: طابع زمني
    return Math.floor(Date.now() / 1000);
  }
}

/* --- حفظ بلاغ جديد --- */
export async function saveReport(report) {
  const payload = {
    reportNumber:  report.reportNumber || await nextReportNumber(report.centerId),
    centerId:      report.centerId || "",
    centerName:    report.centerName || "",
    
    receivedAt:    report.receivedAt || serverTimestamp(),
    arrivedAt:     report.arrivedAt  || null,
    completedAt:   null,
    responseTime:  null,
    
    reportType:    report.reportType || "",
    severity:      report.severity || SEVERITY.MEDIUM,
    codeColor:     report.codeColor || "medium",
    
    patient: {
      name:        clean(report.patient?.name || ""),
      gender:      report.patient?.gender || "",
      nationality: report.patient?.nationality || "",
      age:         report.patient?.age || null,
      idNumber:    clean(report.patient?.idNumber || "")
    },
    
    destination:   report.destination || "",
    transferType:  report.transferType || "نقل طبي",
    actions:       Array.isArray(report.actions) ? report.actions : [],
    notes:         clean(report.notes || ""),
    
    vehicleId:     report.vehicleId || "",
    vehicleCode:   report.vehicleCode || "",
    paramedicId:   report.paramedicId || "",
    paramedicName: report.paramedicName || "",
    shiftId:       report.shiftId || "",
    
    location:      clean(report.location || ""),
    coordinates:   report.coordinates || null,
    
    status:        REPORT_STATUS.OPEN,
    createdAt:     serverTimestamp(),
    updatedAt:     serverTimestamp(),
    createdBy:     report.createdBy || ""
  };
  
  const ref = await addDoc(collection(db, COL.reports), payload);
  return ref.id;
}

/* --- تحديث بلاغ (تسجيل الوصول / الإغلاق) --- */
export async function updateReport(id, data) {
  const patch = { ...data, updatedAt: serverTimestamp() };
  if (data.arrivedAt && !data.responseTime) {
    // نحسب زمن الاستجابة إن أمكن
    const snap = await getDoc(doc(db, COL.reports, id));
    if (snap.exists()) {
      const rec = snap.data();
      if (rec.receivedAt) {
        patch.responseTime = diffSeconds(rec.receivedAt);
      }
    }
  }
  await updateDoc(doc(db, COL.reports, id), patch);
}

/* --- إغلاق بلاغ --- */
export async function closeReport(id) {
  await updateDoc(doc(db, COL.reports, id), {
    status:      REPORT_STATUS.CLOSED,
    completedAt: serverTimestamp(),
    updatedAt:   serverTimestamp()
  });
}

/* --- مراقبة بلاغات مركز معيّن (أو الكل) --- */
export function watchReports(cb, centerId = null, max = 100) {
  let q;
  if (centerId) {
    q = query(
      collection(db, COL.reports),
      where("centerId", "==", centerId),
      orderBy("createdAt", "desc"),
      limit(max)
    );
  } else {
    q = query(
      collection(db, COL.reports),
      orderBy("createdAt", "desc"),
      limit(max)
    );
  }
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    err => console.error("watchReports:", err)
  );
}

/* --- بلاغات اليوم لمركز --- */
export async function getTodayReports(centerId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const q = query(
    collection(db, COL.reports),
    where("centerId", "==", centerId),
    where("createdAt", ">=", Timestamp.fromDate(start)),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ================================================================
   11) المداومات (shifts) 🆕
   ================================================================ */

/* --- معرّف مداومة يوم --- */
export function shiftId(dateKey, centerId) {
  return `${dateKey}_${centerId}`;
}

/* --- جلب مداومة يوم --- */
export async function getShift(dateKey, centerId) {
  const id = shiftId(dateKey, centerId);
  const snap = await getDoc(doc(db, COL.shifts, id));
  return snap.exists() ? { id, ...snap.data() } : null;
}

/* --- حفظ / تحديث مداومة --- */
export async function saveShift(dateKey, centerId, centerName, data) {
  const id = shiftId(dateKey, centerId);
  const payload = {
    date:       dateKey,
    centerId,
    centerName,
    ...data,
    updatedAt:  serverTimestamp()
  };
  await setDoc(doc(db, COL.shifts, id), payload, { merge: true });
  return id;
}

/* --- مراقبة مداومة يوم --- */
export function watchShift(dateKey, centerId, cb) {
  const id = shiftId(dateKey, centerId);
  return onSnapshot(doc(db, COL.shifts, id),
    snap => cb(snap.exists() ? { id, ...snap.data() } : null),
    err => console.error("watchShift:", err)
  );
}

/* --- إضافة مسعف لمداومة --- */
export async function addParamedicToShift(dateKey, centerId, centerName, period, paramedic) {
  const shift = await getShift(dateKey, centerId) || {
    date: dateKey, centerId, centerName,
    morning: { paramedics: [], supervisor: "" },
    evening: { paramedics: [], supervisor: "" },
    night:   { paramedics: [], supervisor: "" }
  };
  
  if (!shift[period]) shift[period] = { paramedics: [], supervisor: "" };
  if (!Array.isArray(shift[period].paramedics)) shift[period].paramedics = [];
  
  const exists = shift[period].paramedics.some(p => p.id === paramedic.id);
  if (!exists) {
    shift[period].paramedics.push({
      id:          paramedic.id,
      name:        paramedic.name,
      vehicleCode: paramedic.vehicleCode || ""
    });
  }
  
  await saveShift(dateKey, centerId, centerName, shift);
}

/* --- إزالة مسعف من مداومة --- */
export async function removeParamedicFromShift(dateKey, centerId, centerName, period, paramedicId) {
  const shift = await getShift(dateKey, centerId);
  if (!shift || !shift[period]) return;
  shift[period].paramedics = (shift[period].paramedics || []).filter(p => p.id !== paramedicId);
  await saveShift(dateKey, centerId, centerName, shift);
}

/* ================================================================
   12) المسعفون (paramedics)
   ================================================================ */
export function watchParamedics(cb, centerId = null) {
  let q;
  if (centerId) {
    q = query(collection(db, COL.paramedics), where("centerId", "==", centerId));
  } else {
    q = query(collection(db, COL.paramedics));
  }
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    err => console.error("watchParamedics:", err)
  );
}

export async function getParamedics(centerId = null) {
  let q;
  if (centerId) {
    q = query(collection(db, COL.paramedics), where("centerId", "==", centerId));
  } else {
    q = collection(db, COL.paramedics);
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addParamedic(data) {
  const payload = {
    name:        clean(data.name || ""),
    code:        clean(data.code || ""),
    phone:       clean(data.phone || ""),
    centerId:    data.centerId || "",
    centerName:  data.centerName || "",
    rank:        data.rank || "",
    active:      data.active !== false,
    createdAt:   serverTimestamp()
  };
  return await addDoc(collection(db, COL.paramedics), payload);
}

export async function updateParamedic(id, data) {
  await updateDoc(doc(db, COL.paramedics, id), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

/* ================================================================
   13) المركبات (vehicles) 🆕
   ================================================================ */
export async function addVehicle(data) {
  const payload = {
    code:         clean(data.code || ""),
    plate:        clean(data.plate || ""),
    type:         data.type || "إسعاف",
    centerId:     data.centerId || "",
    centerName:   data.centerName || "",
    paramedicId:  data.paramedicId || "",
    paramedicName:clean(data.paramedicName || ""),
    officerId:    data.officerId || "",
    status:       data.status || VEHICLE_STATUS.AVAILABLE,
    sector:       data.sector || "",
    model:        clean(data.model || ""),
    notes:        clean(data.notes || ""),
    createdAt:    serverTimestamp(),
    updatedAt:    serverTimestamp()
  };
  return await addDoc(collection(db, COL.vehicles), payload);
}

export async function updateVehicle(id, data) {
  await updateDoc(doc(db, COL.vehicles, id), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export async function deleteVehicle(id) {
  await deleteDoc(doc(db, COL.vehicles, id));
}

export function watchVehicles(cb, centerId = null) {
  let q;
  if (centerId) {
    q = query(
      collection(db, COL.vehicles),
      where("centerId", "==", centerId),
      orderBy("code")
    );
  } else {
    q = query(collection(db, COL.vehicles), orderBy("code"));
  }
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    err => console.error("watchVehicles:", err)
  );
}

export async function getVehicles(centerId = null) {
  let q;
  if (centerId) {
    q = query(collection(db, COL.vehicles), where("centerId", "==", centerId));
  } else {
    q = collection(db, COL.vehicles);
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ================================================================
   14) المراكز (centers) 🆕
   ================================================================ */
export async function addCenter(data) {
  const payload = {
    name:      clean(data.name || ""),
    code:      clean(data.code || ""),
    region:    clean(data.region || ""),
    manager:   clean(data.manager || ""),
    phone:     clean(data.phone || ""),
    sector:    clean(data.sector || ""),
    active:    data.active !== false,
    createdAt: serverTimestamp()
  };
  return await addDoc(collection(db, COL.centers), payload);
}

export async function updateCenter(id, data) {
  await updateDoc(doc(db, COL.centers, id), {
    ...data,
    updatedAt: serverTimestamp()
  });
}

export function watchCenters(cb) {
  const q = query(collection(db, COL.centers), orderBy("name"));
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    err => console.error("watchCenters:", err)
  );
}

export async function getCenters() {
  const snap = await getDocs(collection(db, COL.centers));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ================================================================
   15) التعميمات (broadcasts)
   ================================================================ */
export async function sendBroadcast(data) {
  const payload = {
    title:     clean(data.title || ""),
    body:      clean(data.body || ""),
    priority:  data.priority || "normal",  // normal / high / urgent
    centerId:  data.centerId || "",        // فارغ = للجميع
    active:    true,
    createdAt: serverTimestamp(),
    createdBy: data.createdBy || ""
  };
  return await addDoc(collection(db, COL.broadcasts), payload);
}

export function watchActiveBroadcasts(cb, centerId = null) {
  let q;
  if (centerId) {
    q = query(
      collection(db, COL.broadcasts),
      where("active", "==", true),
      where("centerId", "in", ["", centerId]),
      orderBy("createdAt", "desc"),
      limit(5)
    );
  } else {
    q = query(
      collection(db, COL.broadcasts),
      where("active", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
  }
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    err => {
      console.warn("watchActiveBroadcasts:", err);
      // fallback بدون orderBy إذا فشل (يحتاج index)
      const q2 = query(collection(db, COL.broadcasts), where("active", "==", true), limit(5));
      onSnapshot(q2, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    }
  );
}

/* ================================================================
   16) الملاحظات (notes)
   ================================================================ */
export async function addNote(data) {
  const payload = {
    title:     clean(data.title || ""),
    body:      clean(data.body || ""),
    centerId:  data.centerId || "",
    tags:      Array.isArray(data.tags) ? data.tags : [],
    createdAt: serverTimestamp(),
    createdBy: data.createdBy || ""
  };
  return await addDoc(collection(db, COL.notes), payload);
}

export function watchNotes(cb, centerId = null) {
  let q;
  if (centerId) {
    q = query(
      collection(db, COL.notes),
      where("centerId", "==", centerId),
      orderBy("createdAt", "desc"),
      limit(50)
    );
  } else {
    q = query(collection(db, COL.notes), orderBy("createdAt", "desc"), limit(50));
  }
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    err => console.error("watchNotes:", err)
  );
}

/* ================================================================
   17) المحادثات (chats)
   ================================================================ */
export async function sendChatMessage(data) {
  const payload = {
    channel:   data.channel || "general",
    centerId:  data.centerId || "",
    from:      data.from || "",
    fromName:  data.fromName || "",
    text:      clean(data.text || ""),
    createdAt: serverTimestamp()
  };
  return await addDoc(collection(db, COL.chats), payload);
}

export function watchChatMessages(cb, channel = "general", max = 50) {
  const q = query(
    collection(db, COL.chats),
    where("channel", "==", channel),
    orderBy("createdAt", "desc"),
    limit(max)
  );
  return onSnapshot(q,
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() })).reverse()),
    err => console.error("watchChatMessages:", err)
  );
}

/* ================================================================
   18) الإحصاءات
   ================================================================ */
export async function getCenterStats(centerId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const q = query(
    collection(db, COL.reports),
    where("centerId", "==", centerId),
    where("createdAt", ">=", Timestamp.fromDate(today))
  );
  const snap = await getDocs(q);
  const reports = snap.docs.map(d => d.data());
  
  const stats = {
    total: 0, critical: 0, high: 0, medium: 0, low: 0,
    avgResponseTime: 0, topHospital: "", topParamedic: ""
  };
  
  if (!reports.length) return stats;
  
  stats.total = reports.length;
  const hospitals = {};
  const paramedics = {};
  let respSum = 0, respCount = 0;
  
  reports.forEach(r => {
    if (r.severity === "حرج")  stats.critical++;
    if (r.severity === "خطير") stats.high++;
    if (r.severity === "متوسط") stats.medium++;
    if (r.severity === "بسيط")  stats.low++;
    
    if (r.destination) hospitals[r.destination] = (hospitals[r.destination] || 0) + 1;
    if (r.paramedicName) paramedics[r.paramedicName] = (paramedics[r.paramedicName] || 0) + 1;
    
    if (r.responseTime) { respSum += r.responseTime; respCount++; }
  });
  
  if (respCount) stats.avgResponseTime = Math.round(respSum / respCount);
  
  stats.topHospital = Object.keys(hospitals).sort((a,b) => hospitals[b] - hospitals[a])[0] || "";
  stats.topParamedic = Object.keys(paramedics).sort((a,b) => paramedics[b] - paramedics[a])[0] || "";
  
  return stats;
}

/* ================================================================
   19) فحص الاتصال
   ================================================================ */
export async function pingFirestore() {
  try {
    await getDocs(query(collection(db, COL.settings), limit(1)));
    return true;
  } catch (e) {
    console.error("pingFirestore:", e);
    return false;
  }
}

/* ================================================================
   20) إشعار (Toast) بسيط
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
   رسالة تأكيد التحميل
   ================================================================ */
console.log("✅ firebase-config.js v2.0 — project:", firebaseConfig.projectId);
console.log("📦 Collections:", Object.values(COL).join(", "));
