import {
  PUZZLE_SCHEDULE,
  PUZZLE_WEEKS,
  FORCE_UNLOCK_ALL_FOR_REVIEW,
} from "./puzzle-schedule.js";

var ACCESS_STORAGE_KEY = "ptra-puzzle-access-v2";
var LEGACY_ACCESS_KEY = "ptra-puzzle-access-v1";
var DEV_UNLOCK_LS_KEY = "ptra_sach_unlock_all";

function readAccessStore() {
  try {
    var raw = localStorage.getItem(ACCESS_STORAGE_KEY);
    if (!raw) {
      var legacy = localStorage.getItem(LEGACY_ACCESS_KEY);
      if (legacy) {
        var parsed = JSON.parse(legacy);
        var migrated = {
          permanent: Array.isArray(parsed.permanent) ? parsed.permanent : [],
          password: Array.isArray(parsed.password) ? parsed.password : [],
          weeks: [],
        };
        writeAccessStore(migrated);
        return migrated;
      }
      return { permanent: [], password: [], weeks: [] };
    }
    var data = JSON.parse(raw);
    return {
      permanent: Array.isArray(data.permanent) ? data.permanent : [],
      password: Array.isArray(data.password) ? data.password : [],
      weeks: Array.isArray(data.weeks) ? data.weeks : [],
    };
  } catch (e) {
    return { permanent: [], password: [], weeks: [] };
  }
}

function writeAccessStore(store) {
  try {
    localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(store));
  } catch (e) {}
}

function normalizePassword(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "-")
    .replace(/[–—]/g, "-");
}

function scheduleUnlockInstant(isoDate) {
  var parts = isoDate.split("-");
  if (parts.length !== 3) return 0;
  var y = parseInt(parts[0], 10);
  var m = parseInt(parts[1], 10) - 1;
  var d = parseInt(parts[2], 10);
  return Date.UTC(y, m, d, 4, 0, 0);
}

export function isDevUnlockAll() {
  if (FORCE_UNLOCK_ALL_FOR_REVIEW) return true;
  try {
    if (localStorage.getItem(DEV_UNLOCK_LS_KEY) === "true") return true;
  } catch (e) {}
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("unlockAll") === "1" || params.get("unlockAll") === "true") return true;
  } catch (e2) {}
  return false;
}

export function setDevUnlockAll(enabled) {
  try {
    if (enabled) localStorage.setItem(DEV_UNLOCK_LS_KEY, "true");
    else localStorage.removeItem(DEV_UNLOCK_LS_KEY);
  } catch (e) {}
}

export function nowMs() {
  return Date.now();
}

export function isDateUnlocked(unlockDate, atMs) {
  atMs = atMs == null ? nowMs() : atMs;
  return atMs >= scheduleUnlockInstant(unlockDate);
}

function markPermanent(puzzleId) {
  var store = readAccessStore();
  if (store.permanent.indexOf(puzzleId) === -1) {
    store.permanent.push(puzzleId);
    writeAccessStore(store);
  }
}

function unlockWeekPuzzles(weekIndex) {
  var week = null;
  for (var i = 0; i < PUZZLE_WEEKS.length; i++) {
    if (PUZZLE_WEEKS[i].weekIndex === weekIndex) {
      week = PUZZLE_WEEKS[i];
      break;
    }
  }
  if (!week) return;
  var store = readAccessStore();
  for (var j = 0; j < week.puzzleIds.length; j++) {
    var pid = week.puzzleIds[j];
    if (store.permanent.indexOf(pid) === -1) store.permanent.push(pid);
  }
  if (store.weeks.indexOf(weekIndex) === -1) store.weeks.push(weekIndex);
  writeAccessStore(store);
}

export function syncPermanentFromSchedule(atMs) {
  atMs = atMs == null ? nowMs() : atMs;
  var store = readAccessStore();
  var changed = false;
  for (var w = 0; w < PUZZLE_WEEKS.length; w++) {
    var week = PUZZLE_WEEKS[w];
    if (!isDateUnlocked(week.unlockDate, atMs)) continue;
    for (var i = 0; i < week.puzzleIds.length; i++) {
      var pid = week.puzzleIds[i];
      if (store.permanent.indexOf(pid) === -1) {
        store.permanent.push(pid);
        changed = true;
      }
    }
  }
  if (changed) writeAccessStore(store);
  return store;
}

export function isPuzzleAccessUnlocked(puzzleId, atMs) {
  if (isDevUnlockAll()) return true;
  syncPermanentFromSchedule(atMs);
  var store = readAccessStore();
  if (store.permanent.indexOf(puzzleId) !== -1) return true;
  if (store.password.indexOf(puzzleId) !== -1) {
    markPermanent(puzzleId);
    return true;
  }
  var entry = null;
  for (var i = 0; i < PUZZLE_SCHEDULE.length; i++) {
    if (PUZZLE_SCHEDULE[i].id === puzzleId) {
      entry = PUZZLE_SCHEDULE[i];
      break;
    }
  }
  if (entry && isDateUnlocked(entry.unlockDate, atMs)) {
    markPermanent(puzzleId);
    return true;
  }
  return false;
}

export function tryUnlockWithPassword(puzzleId, password) {
  var entry = null;
  for (var i = 0; i < PUZZLE_SCHEDULE.length; i++) {
    if (PUZZLE_SCHEDULE[i].id === puzzleId) {
      entry = PUZZLE_SCHEDULE[i];
      break;
    }
  }
  if (!entry) return { ok: false, reason: "unknown" };
  var norm = normalizePassword(password);
  if (norm === normalizePassword(entry.unlockPassword)) {
    var store = readAccessStore();
    if (store.password.indexOf(puzzleId) === -1) store.password.push(puzzleId);
    markPermanent(puzzleId);
    writeAccessStore(store);
    return { ok: true, scope: "puzzle" };
  }
  if (norm === normalizePassword(entry.weekPassword)) {
    unlockWeekPuzzles(entry.weekIndex);
    return { ok: true, scope: "week" };
  }
  return { ok: false, reason: "wrong" };
}

/** Index in PUZZLE_WEEKS for the week to show on load (latest by schedule, else latest with any unlock). */
export function getDefaultWeekIndex(atMs) {
  syncPermanentFromSchedule(atMs);
  for (var j = PUZZLE_WEEKS.length - 1; j >= 0; j--) {
    if (isDateUnlocked(PUZZLE_WEEKS[j].unlockDate, atMs)) return j;
  }
  for (var k = PUZZLE_WEEKS.length - 1; k >= 0; k--) {
    var week = PUZZLE_WEEKS[k];
    for (var i = 0; i < week.puzzleIds.length; i++) {
      if (isPuzzleAccessUnlocked(week.puzzleIds[i], atMs)) return k;
    }
  }
  return 0;
}

export function bindPuzzleUnlockPrompts() {
  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-unlock-puzzle]");
    if (!btn) return;
    var puzzleId = btn.getAttribute("data-unlock-puzzle");
    if (!puzzleId) return;
    var pwd = window.prompt(
      "Zadajte heslo pre skorý prístup (heslo úlohy alebo celého týždňa):"
    );
    if (pwd == null) return;
    var result = tryUnlockWithPassword(puzzleId, pwd);
    if (result.ok) {
      window.dispatchEvent(
        new CustomEvent("ptra-puzzle-access-changed", { detail: { puzzleId: puzzleId } })
      );
      var item = document.querySelector('.sach-visual-item[data-puzzle-id="' + puzzleId + '"]');
      if (item) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      window.alert("Heslo nie je správne. Skúste znova alebo počkajte na dátum odomknutia.");
    }
  });
}
