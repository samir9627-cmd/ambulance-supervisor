/* ================================================================
   badges.js — نظام إسعاف عمان الذكي
   محرك الشارات الذكي
   الإصدار: 1.0
   ================================================================ */

import { db, COL, doc, getDoc, setDoc, serverTimestamp } from "./firebase-config.js";

/* ================================================================
   1) تعريف الشارات
   ================================================================ */
export const BADGES = {
  /* --- شارات البداية --- */
  first_report: {
    id: "first_report",
    name: "أول بلاغ",
    emoji: "🌱",
    desc: "سجّلت أول بلاغ إسعاف",
    color: "#16a34a",
    condition: (stats) => stats.totalReports >= 1,
    progress: (stats) => ({ current: Math.min(stats.totalReports, 1), target: 1 })
  },
  first_issue: {
    id: "first_issue",
    name: "أول إشكالية",
    emoji: "🎯",
    desc: "أضفت أول إشكالية إدارية",
    color: "#0ea5e9",
    condition: (stats) => stats.totalIssues >= 1,
    progress: (stats) => ({ current: Math.min(stats.totalIssues, 1), target: 1 })
  },

  /* --- شارات الكم --- */
  reports_10: {
    id: "reports_10",
    name: "دقيق",
    emoji: "🎖️",
    desc: "10 بلاغات مسجّلة",
    color: "#eab308",
    condition: (stats) => stats.totalReports >= 10,
    progress: (stats) => ({ current: Math.min(stats.totalReports, 10), target: 10 })
  },
  reports_50: {
    id: "reports_50",
    name: "محترف",
    emoji: "🏆",
    desc: "50 بلاغ مسجّل",
    color: "#dc2626",
    condition: (stats) => stats.totalReports >= 50,
    progress: (stats) => ({ current: Math.min(stats.totalReports, 50), target: 50 })
  },
  reports_100: {
    id: "reports_100",
    name: "أسطورة",
    emoji: "💎",
    desc: "100 بلاغ مسجّل",
    color: "#7c3aed",
    condition: (stats) => stats.totalReports >= 100,
    progress: (stats) => ({ current: Math.min(stats.totalReports, 100), target: 100 })
  },
  reports_500: {
    id: "reports_500",
    name: "بطل الميدان",
    emoji: "👑",
    desc: "500 بلاغ مسجّل",
    color: "#f59e0b",
    condition: (stats) => stats.totalReports >= 500,
    progress: (stats) => ({ current: Math.min(stats.totalReports, 500), target: 500 })
  },

  /* --- شارات السرعة --- */
  fast_response: {
    id: "fast_response",
    name: "سريع",
    emoji: "⚡",
    desc: "استجابة أقل من 5 دقائق",
    color: "#facc15",
    condition: (stats) => stats.fastResponses >= 1,
    progress: (stats) => ({ current: Math.min(stats.fastResponses, 1), target: 1 })
  },
  fast_10: {
    id: "fast_10",
    name: "برق",
    emoji: "🌩️",
    desc: "10 استجابات سريعة",
    color: "#0ea5e9",
    condition: (stats) => stats.fastResponses >= 10,
    progress: (stats) => ({ current: Math.min(stats.fastResponses, 10), target: 10 })
  },

  /* --- شارات النشاط اليومي --- */
  active_day: {
    id: "active_day",
    name: "نشيط",
    emoji: "🔥",
    desc: "5 بلاغات في يوم واحد",
    color: "#ea580c",
    condition: (stats) => stats.maxPerDay >= 5,
    progress: (stats) => ({ current: Math.min(stats.maxPerDay, 5), target: 5 })
  },
  very_active_day: {
    id: "very_active_day",
    name: "مندفع",
    emoji: "🚀",
    desc: "10 بلاغات في يوم واحد",
    color: "#dc2626",
    condition: (stats) => stats.maxPerDay >= 10,
    progress: (stats) => ({ current: Math.min(stats.maxPerDay, 10), target: 10 })
  },

  /* --- شارات الانتظام --- */
  streak_7: {
    id: "streak_7",
    name: "منتظم",
    emoji: "📅",
    desc: "7 أيام متتالية بعمل",
    color: "#10b981",
    condition: (stats) => stats.streak >= 7,
    progress: (stats) => ({ current: Math.min(stats.streak, 7), target: 7 })
  },
  streak_30: {
    id: "streak_30",
    name: "ملتزم",
    emoji: "🗓️",
    desc: "30 يوماً متتالياً",
    color: "#0891b2",
    condition: (stats) => stats.streak >= 30,
    progress: (stats) => ({ current: Math.min(stats.streak, 30), target: 30 })
  },

  /* --- شارات التخصص --- */
  night_owl: {
    id: "night_owl",
    name: "بومة الليل",
    emoji: "🦉",
    desc: "10 بلاغات بعد منتصف الليل",
    color: "#4c1d95",
    condition: (stats) => stats.nightReports >= 10,
    progress: (stats) => ({ current: Math.min(stats.nightReports, 10), target: 10 })
  },
  critical_master: {
    id: "critical_master",
    name: "منقذ الحياة",
    emoji: "❤️",
    desc: "20 حالة حرجة",
    color: "#dc2626",
    condition: (stats) => stats.criticalReports >= 20,
    progress: (stats) => ({ current: Math.min(stats.criticalReports, 20), target: 20 })
  },
  cpr_hero: {
    id: "cpr_hero",
    name: "بطل الإنعاش",
    emoji: "💓",
    desc: "10 عمليات إنعاش قلبي",
    color: "#e11d48",
    condition: (stats) => stats.cprCount >= 10,
    progress: (stats) => ({ current: Math.min(stats.cprCount, 10), target: 10 })
  },

  /* --- شارات المناسبات --- */
  weekend_warrior: {
    id: "weekend_warrior",
    name: "مجاهد الأسبوع",
    emoji: "🏋️",
    desc: "15 بلاغاً في نهاية الأسبوع",
    color: "#7c2d12",
    condition: (stats) => stats.weekendReports >= 15,
    progress: (stats) => ({ current: Math.min(stats.weekendReports, 15), target: 15 })
  },
  early_bird: {
    id: "early_bird",
    name: "طائر الصباح",
    emoji: "🐦",
    desc: "10 بلاغات قبل الساعة 6 صباحاً",
    color: "#0891b2",
    condition: (stats) => stats.earlyReports >= 10,
    progress: (stats) => ({ current: Math.min(stats.earlyReports, 10), target: 10 })
  }
};

/* ================================================================
   2) حساب إحصاءات المسعف
   ================================================================ */
export function computeStats(reports = [], issues = []) {
  const stats = {
    totalReports: 0,
    totalIssues: 0,
    criticalReports: 0,
    fastResponses: 0,
    nightReports: 0,
    earlyReports: 0,
    weekendReports: 0,
    cprCount: 0,
    maxPerDay: 0,
    streak: 0,
    byDay: {},
    byType: {},
    bySeverity: {}
  };

  stats.totalIssues = issues.length;

  const days = new Set();

  reports.forEach(r => {
    stats.totalReports++;

    // التاريخ
    const d = r.createdAt?.toDate ? r.createdAt.toDate() : new Date(r.createdAt || 0);
    const dayKey = d.toISOString().slice(0, 10);
    days.add(dayKey);
    stats.byDay[dayKey] = (stats.byDay[dayKey] || 0) + 1;

    // الخطورة
    if (r.severity === "حرج") stats.criticalReports++;
    if (r.severity) stats.bySeverity[r.severity] = (stats.bySeverity[r.severity] || 0) + 1;

    // نوع البلاغ
    if (r.reportType) stats.byType[r.reportType] = (stats.byType[r.reportType] || 0) + 1;

    // السرعة
    if (r.responseTime && r.responseTime <= 300) stats.fastResponses++;

    // الوقت
    const hour = d.getHours();
    if (hour >= 0 && hour < 5) stats.nightReports++;
    if (hour >= 5 && hour < 6) stats.earlyReports++;

    // نهاية الأسبوع (الجمعة=5، السبت=6)
    const dow = d.getDay();
    if (dow === 5 || dow === 6) stats.weekendReports++;

    // عمليات الإنعاش
    if (Array.isArray(r.actions) && r.actions.some(a => /CPR|إنعاش/i.test(a))) {
      stats.cprCount++;
    }
  });

  // أقصى عدد في يوم
  stats.maxPerDay = Object.values(stats.byDay).reduce((m, v) => Math.max(m, v), 0);

  // السلسلة (streak)
  const sortedDays = Array.from(days).sort();
  let streak = 0, maxStreak = 0, prevDate = null;
  sortedDays.forEach(dk => {
    const cur = new Date(dk + "T00:00:00");
    if (prevDate) {
      const diff = (cur - prevDate) / (1000 * 60 * 60 * 24);
      if (diff === 1) streak++;
      else streak = 1;
    } else {
      streak = 1;
    }
    maxStreak = Math.max(maxStreak, streak);
    prevDate = cur;
  });
  stats.streak = maxStreak;

  return stats;
}

/* ================================================================
   3) التحقق من الشارات المستحقة
   ================================================================ */
export function checkEarned(stats, alreadyEarned = []) {
  const earned = [];
  Object.values(BADGES).forEach(b => {
    if (alreadyEarned.includes(b.id)) return;
    try {
      if (b.condition(stats)) {
        earned.push(b);
      }
    } catch (e) {
      console.warn("Badge check error:", b.id, e);
    }
  });
  return earned;
}

/* ================================================================
   4) حفظ / قراءة شارات المسعف من Firestore
   ================================================================ */
export async function getEarnedBadges(paramedicId) {
  try {
    const ref = doc(db, COL.settings, `badges_${paramedicId}`);
    const snap = await getDoc(ref);
    if (!snap.exists()) return [];
    return snap.data().earned || [];
  } catch (e) {
    console.warn("getEarnedBadges:", e);
    return [];
  }
}

export async function saveEarnedBadges(paramedicId, earnedIds) {
  try {
    const ref = doc(db, COL.settings, `badges_${paramedicId}`);
    await setDoc(ref, {
      earned: earnedIds,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (e) {
    console.warn("saveEarnedBadges:", e);
  }
}

/* ================================================================
   5) المنح التلقائي
   ================================================================ */
export async function processBadges(paramedicId, reports, issues = [], onNewBadge = null) {
  if (!paramedicId) return { stats: null, newBadges: [], allEarned: [] };

  const stats = computeStats(reports, issues);
  const already = await getEarnedBadges(paramedicId);
  const newBadges = checkEarned(stats, already);

  if (newBadges.length) {
    const newIds = [...already, ...newBadges.map(b => b.id)];
    await saveEarnedBadges(paramedicId, newIds);
    if (onNewBadge) {
      newBadges.forEach(b => onNewBadge(b));
    }
  }

  return {
    stats,
    newBadges,
    allEarned: [...already, ...newBadges.map(b => b.id)]
  };
}

/* ================================================================
   6) عرض شبكة الشارات (HTML)
   ================================================================ */
export function renderBadgesGrid(earnedIds = [], options = {}) {
  const { showLocked = true, columns = 4 } = options;
  const html = [];

  Object.values(BADGES).forEach(b => {
    const earned = earnedIds.includes(b.id);
    if (!earned && !showLocked) return;

    html.push(`
      <div class="badge-award ${earned ? "earned" : "locked"}" 
           title="${b.desc}"
           style="--badge-color: ${b.color};">
        <div class="badge-award-emoji">${b.emoji}</div>
        <div class="badge-award-name">${b.name}</div>
        ${earned ? `<div class="badge badge-success" style="font-size:.65rem;">✓ تم</div>` : ""}
      </div>
    `);
  });

  return `
    <div class="grid grid-4" style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap:.5rem;">
      ${html.join("")}
    </div>
  `;
}

/* ================================================================
   7) شريط التقدم للشارة القادمة
   ================================================================ */
export function renderProgress(stats, earnedIds = []) {
  // ابحث عن أقرب شارة غير محققة
  const candidates = Object.values(BADGES)
    .filter(b => !earnedIds.includes(b.id))
    .map(b => {
      const p = b.progress(stats);
      return { badge: b, ...p, ratio: p.current / p.target };
    })
    .filter(c => c.ratio < 1)
    .sort((a, b) => b.ratio - a.ratio);

  if (!candidates.length) {
    return `<div class="alert alert-success">🎉 حصلت على كل الشارات!</div>`;
  }

  const next = candidates[0];
  const pct = Math.round(next.ratio * 100);

  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">🎯 الشارة القادمة</div>
        <span class="badge badge-info">${pct}%</span>
      </div>
      <div class="d-flex align-center gap-1 mb-2">
        <div style="font-size:2rem;">${next.badge.emoji}</div>
        <div class="flex-1">
          <div class="fw-bold">${next.badge.name}</div>
          <div class="text-light" style="font-size:.85rem;">${next.badge.desc}</div>
        </div>
      </div>
      <div style="background:var(--border);height:8px;border-radius:4px;overflow:hidden;">
        <div style="width:${pct}%;height:100%;background:${next.badge.color};transition:width .6s;"></div>
      </div>
      <div class="text-center text-light mt-1" style="font-size:.8rem;">
        ${next.current} / ${next.target}
      </div>
    </div>
  `;
}

/* ================================================================
   8) احتفال عند الحصول على شارة
   ================================================================ */
export function celebrate(badge) {
  // إنشاء طبقة الاحتفال
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 5000;
    background: rgba(0,0,0,.7); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn .3s ease;
  `;
  overlay.innerHTML = `
    <div style="
      background: white; padding: 2rem; border-radius: 24px;
      text-align: center; max-width: 340px;
      animation: slideUp .5s ease;
      box-shadow: 0 20px 60px rgba(0,0,0,.4);
    ">
      <div style="font-size:5rem;line-height:1;animation:pulse 1s ease infinite;">
        ${badge.emoji}
      </div>
      <h2 style="margin:1rem 0 .5rem;color:#dc2626;">🎉 شارة جديدة!</h2>
      <h3 style="margin-bottom:.5rem;">${badge.name}</h3>
      <p style="color:#64748b;margin-bottom:1.5rem;">${badge.desc}</p>
      <button class="btn btn-primary btn-block" onclick="this.closest('div[style*=fixed]').remove()">
        ✅ رائع!
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  // نجوم متطايرة
  for (let i = 0; i < 20; i++) {
    const star = document.createElement("div");
    star.textContent = ["⭐", "✨", "🌟", "💫"][i % 4];
    star.style.cssText = `
      position: absolute; left: 50%; top: 50%; font-size: 1.5rem;
      pointer-events: none; z-index: 5001;
      animation: starFly${i} 1.5s ease-out forwards;
    `;
    const angle = (Math.PI * 2 * i) / 20;
    const dist = 150 + Math.random() * 100;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    const style = document.createElement("style");
    style.textContent = `@keyframes starFly${i} {
      from { transform: translate(-50%,-50%) scale(0); opacity: 1; }
      to   { transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.5); opacity: 0; }
    }`;
    document.head.appendChild(style);
    overlay.appendChild(star);
    setTimeout(() => star.remove(), 1600);
  }
}

/* ================================================================
   9) ملخص الإنجازات
   ================================================================ */
export function renderAchievementsSummary(stats, earnedIds = []) {
  const total = Object.keys(BADGES).length;
  const earned = earnedIds.length;
  const pct = Math.round((earned / total) * 100);

  return `
    <div class="grid grid-3">
      <div class="stat-card">
        <div class="stat-value">${earned}</div>
        <div class="stat-label">شارة محققة</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${total - earned}</div>
        <div class="stat-label">شارة متبقية</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${pct}%</div>
        <div class="stat-label">نسبة الإنجاز</div>
      </div>
    </div>
  `;
}

/* ================================================================
   10) تصدير
   ================================================================ */
export const Badges = {
  BADGES,
  computeStats,
  checkEarned,
  getEarnedBadges,
  saveEarnedBadges,
  processBadges,
  renderBadgesGrid,
  renderProgress,
  renderAchievementsSummary,
  celebrate
};

window.Badges = Badges;
