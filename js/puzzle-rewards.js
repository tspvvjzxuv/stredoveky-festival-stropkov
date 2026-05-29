import { FESTIVAL_PUZZLES, DIFFICULTIES, puzzleId } from "./puzzles-data.js";
import { PUZZLE_REWARD_META, weekRewardId } from "./puzzle-schedule.js";

var STORAGE_KEY = "ptra-puzzle-rewards-v3";
var LEGACY_V2 = "ptra-puzzle-rewards-v2";
var LEGACY_V1 = "ptra-puzzle-rewards-v1";

var REWARD_BY_ID = PUZZLE_REWARD_META;

var FULL_REWARD = {
  title: "Investícia rytiera Andreasa je odkrytá!",
  text:
    "Ste pripravení na turnaj. Po všetkých týždenných úlohách na festivale pri šachovej registrácii ukážte túto stránku alebo povedzte heslo:",
  code: "PTRA–RYTIER–ŠACH",
  note: "Organizátor vám pridelí pamätný rytiersky žetón naviac (podľa dostupnosti v deň podujatia).",
};

function migrateLegacy() {
  try {
    var raw = localStorage.getItem(LEGACY_V2) || localStorage.getItem(LEGACY_V1);
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    var out = {};
    if (Array.isArray(parsed)) {
      for (var i = 0; i < parsed.length; i++) {
        out[parsed[i]] = { unlocked: true, firstTry: true, tier: "full" };
      }
    } else {
      out = parsed;
    }
    writeRecords(out);
    localStorage.removeItem(LEGACY_V2);
    localStorage.removeItem(LEGACY_V1);
    return out;
  } catch (e) {
    return null;
  }
}

function readRecords() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      var migrated = migrateLegacy();
      if (migrated) return migrated;
      return {};
    }
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

function writeRecords(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {}
}

function getRecord(puzzleId) {
  var records = readRecords();
  return records[puzzleId] || null;
}

function weekPuzzleIds(weekIndex) {
  return DIFFICULTIES.map(function (d) {
    return puzzleId(weekIndex, d);
  });
}

export function getWeekSolveProgress(weekIndex) {
  var ids = weekPuzzleIds(weekIndex);
  var solved = 0;
  var full = 0;
  for (var i = 0; i < ids.length; i++) {
    var rec = getRecord(ids[i]);
    if (rec && rec.unlocked) {
      solved += 1;
      if (rec.tier === "full") full += 1;
    }
  }
  return { solved: solved, full: full, total: ids.length };
}

export function getWeekRewardTier(weekIndex) {
  var p = getWeekSolveProgress(weekIndex);
  if (p.solved === 0) return null;
  if (p.full >= p.total) return "full";
  return "partial";
}

export function isPuzzleRewardUnlocked(puzzleId) {
  var rec = getRecord(puzzleId);
  return !!(rec && rec.unlocked);
}

export function isPuzzleFirstTry(puzzleId) {
  var rec = getRecord(puzzleId);
  return !!(rec && rec.unlocked && rec.firstTry !== false);
}

export function getPuzzleRewardTier(puzzleId) {
  var rec = getRecord(puzzleId);
  if (!rec || !rec.unlocked) return null;
  return rec.tier || (rec.firstTry === false ? "partial" : "full");
}

export function unlockPuzzleReward(puzzleId, options) {
  var known = false;
  for (var k = 0; k < FESTIVAL_PUZZLES.length; k++) {
    if (FESTIVAL_PUZZLES[k].id === puzzleId) {
      known = true;
      break;
    }
  }
  if (!known) return false;

  options = options || {};
  var records = readRecords();
  var prev = records[puzzleId];
  var firstTry = options.firstTry !== false;
  var tier = firstTry ? "full" : "partial";

  if (prev && prev.unlocked) {
    if (prev.tier === "full") return false;
    if (tier === "partial") return false;
    records[puzzleId] = { unlocked: true, firstTry: true, tier: "full" };
    writeRecords(records);
    updateInvesticiaUI();
    return true;
  }

  records[puzzleId] = { unlocked: true, firstTry: firstTry, tier: tier };
  writeRecords(records);
  updateInvesticiaUI();
  return true;
}

function allPuzzleIds() {
  return FESTIVAL_PUZZLES.map(function (p) {
    return p.id;
  });
}

function allWeeksCompleteFull() {
  for (var w = 1; w <= 12; w++) {
    if (getWeekRewardTier(w) !== "full") return false;
  }
  return true;
}

function updateInvesticiaUI() {
  var root = document.getElementById("sach-investicia");
  if (!root) return;

  var parts = root.querySelectorAll("[data-reward-part]");
  for (var i = 0; i < parts.length; i++) {
    var weekKey = parts[i].getAttribute("data-reward-part");
    var weekNum = parseInt(String(weekKey).replace("week-", ""), 10);
    var tier = getWeekRewardTier(weekNum);
    var unlocked = !!tier;
    parts[i].classList.toggle("is-unlocked", unlocked);
    parts[i].classList.toggle("is-partial", tier === "partial");

    var lock = parts[i].querySelector(".sach-investicia__lock");
    var body = parts[i].querySelector(".sach-investicia__body");
    if (lock) lock.hidden = unlocked;
    if (body) body.hidden = !unlocked;

    var clueEl = parts[i].querySelector(".sach-investicia__clue strong");
    var meta = REWARD_BY_ID[weekKey];
    if (clueEl && meta) {
      clueEl.textContent = tier === "partial" ? meta.cluePartial || meta.clue : meta.clue;
    }

    var progressNote = parts[i].querySelector(".sach-investicia__week-progress");
    var prog = getWeekSolveProgress(weekNum);
    if (unlocked && prog.solved < prog.total) {
      if (!progressNote) {
        progressNote = document.createElement("p");
        progressNote.className = "sach-investicia__week-progress note";
        var bodyEl = parts[i].querySelector(".sach-investicia__body");
        if (bodyEl) bodyEl.insertBefore(progressNote, bodyEl.firstChild);
      }
      progressNote.textContent = prog.solved + " / " + prog.total + " úloh týždňa splnených";
      progressNote.hidden = false;
    } else if (progressNote) {
      progressNote.hidden = true;
    }

    var note = parts[i].querySelector(".sach-investicia__partial-note");
    if (tier === "partial") {
      if (!note) {
        note = document.createElement("p");
        note.className = "sach-investicia__partial-note note";
        var bodyEl2 = parts[i].querySelector(".sach-investicia__body");
        if (bodyEl2) bodyEl2.appendChild(note);
      }
      note.textContent =
        "Čiastočná pečať — vyriešte všetky tri úlohy týždňa bez chyby pre plnú časť hesla.";
      note.hidden = false;
    } else if (note) {
      note.hidden = true;
    }
  }

  var weeksFull = 0;
  for (var w = 1; w <= 12; w++) {
    if (getWeekRewardTier(w) === "full") weeksFull += 1;
  }
  var progress = root.querySelector("[data-investicia-progress]");
  if (progress) {
    progress.textContent = weeksFull + " / 12 pečatí";
  }

  var vault = root.querySelector(".sach-investicia__vault");
  var complete = allWeeksCompleteFull();
  if (vault) vault.hidden = !complete;
  root.classList.toggle("is-complete", complete);
}

export function initPuzzleRewards() {
  migrateLegacy();
  updateInvesticiaUI();
}

export function getRewardMeta(puzzleId) {
  var puzzle = null;
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    if (FESTIVAL_PUZZLES[i].id === puzzleId) {
      puzzle = FESTIVAL_PUZZLES[i];
      break;
    }
  }
  if (!puzzle) return null;
  var meta = REWARD_BY_ID[weekRewardId(puzzle.weekIndex)];
  if (!meta) return null;
  var tier = getPuzzleRewardTier(puzzleId);
  if (tier === "partial") {
    return {
      partLabel: meta.partLabel + " (čiastočná úloha)",
      icon: meta.icon,
      title: meta.title,
      text: meta.text,
      clue: meta.cluePartial || meta.clue,
    };
  }
  return meta;
}

export function getFullReward() {
  return FULL_REWARD;
}
