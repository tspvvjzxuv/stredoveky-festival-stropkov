import { FESTIVAL_PUZZLES } from "./puzzles-data.js";

var STORAGE_KEY = "ptra-puzzle-rewards-v2";
var LEGACY_KEY = "ptra-puzzle-rewards-v1";

var REWARD_BY_ID = {
  "cg-puzzle-1": {
    partLabel: "Pečať I",
    icon: "🪙",
    title: "Rytierska minca",
    text: "Máte prednosť pri registrácii na šachový turnaj — príďte skôr do fronty pri hlavolamoch.",
    clue: "P",
    cluePartial: "P",
  },
  "cg-puzzle-2": {
    partLabel: "Pečať II",
    icon: "📜",
    title: "Listina rytiera",
    text: "Druhá časť hesla investície. Spojte ju s ostatnými po vyriešení všetkých úloh.",
    clue: "TRA",
    cluePartial: "TR",
  },
  "cg-puzzle-3": {
    partLabel: "Pečať III",
    icon: "⚔️",
    title: "Meč taktika",
    text: "Posledná časť tajomstva. Po troch úlohách sa odkryje celá investícia.",
    clue: "ŠACH",
    cluePartial: "ŠA",
  },
};

var FULL_REWARD = {
  title: "Investícia rytiera Andreasa je odkrytá!",
  text:
    "Ste pripravení na turnaj. Na festivale pri šachovej registrácii ukážte túto stránku alebo povedzte heslo:",
  code: "PTRA–RYTIER–ŠACH",
  note: "Organizátor vám pridelí pamätný rytiersky žetón naviac (podľa dostupnosti v deň podujatia).",
};

function migrateLegacy() {
  try {
    var raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    var out = {};
    for (var i = 0; i < parsed.length; i++) {
      out[parsed[i]] = { unlocked: true, firstTry: true, tier: "full" };
    }
    writeRecords(out);
    localStorage.removeItem(LEGACY_KEY);
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
  if (!REWARD_BY_ID[puzzleId]) return false;
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

function allUnlockedFull() {
  var ids = allPuzzleIds();
  for (var i = 0; i < ids.length; i++) {
    if (getPuzzleRewardTier(ids[i]) !== "full") return false;
  }
  return ids.length > 0;
}

function updateInvesticiaUI() {
  var root = document.getElementById("sach-investicia");
  if (!root) return;

  var parts = root.querySelectorAll("[data-reward-part]");
  for (var i = 0; i < parts.length; i++) {
    var id = parts[i].getAttribute("data-reward-part");
    var tier = getPuzzleRewardTier(id);
    var unlocked = !!tier;
    parts[i].classList.toggle("is-unlocked", unlocked);
    parts[i].classList.toggle("is-partial", tier === "partial");

    var lock = parts[i].querySelector(".sach-investicia__lock");
    var body = parts[i].querySelector(".sach-investicia__body");
    if (lock) lock.hidden = unlocked;
    if (body) body.hidden = !unlocked;

    var clueEl = parts[i].querySelector(".sach-investicia__clue strong");
    var meta = REWARD_BY_ID[id];
    if (clueEl && meta) {
      clueEl.textContent =
        tier === "partial" ? meta.cluePartial || meta.clue : meta.clue;
    }

    var note = parts[i].querySelector(".sach-investicia__partial-note");
    if (tier === "partial") {
      if (!note) {
        note = document.createElement("p");
        note.className = "sach-investicia__partial-note note";
        var bodyEl = parts[i].querySelector(".sach-investicia__body");
        if (bodyEl) bodyEl.appendChild(note);
      }
      note.textContent =
        "Čiastočná pečať — riešenie malo chybu. Vyriešte znova bez chyby pre plnú časť hesla.";
      note.hidden = false;
    } else if (note) {
      note.hidden = true;
    }
  }

  var count = 0;
  var ids = allPuzzleIds();
  for (var j = 0; j < ids.length; j++) {
    if (isPuzzleRewardUnlocked(ids[j])) count += 1;
  }
  var total = ids.length;
  var progress = root.querySelector("[data-investicia-progress]");
  if (progress) {
    progress.textContent = count + " / " + total + " pečatí";
  }

  var vault = root.querySelector(".sach-investicia__vault");
  var complete = allUnlockedFull();
  if (vault) {
    vault.hidden = !complete;
  }
  root.classList.toggle("is-complete", complete);
}

export function initPuzzleRewards() {
  migrateLegacy();
  updateInvesticiaUI();
}

export function getRewardMeta(puzzleId) {
  var meta = REWARD_BY_ID[puzzleId];
  if (!meta) return null;
  var tier = getPuzzleRewardTier(puzzleId);
  if (tier === "partial") {
    return {
      partLabel: meta.partLabel + " (čiastočná)",
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
