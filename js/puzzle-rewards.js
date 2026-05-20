import { FESTIVAL_PUZZLES } from "./puzzles-data.js";

var STORAGE_KEY = "ptra-puzzle-rewards-v1";

var REWARD_BY_ID = {
  "cg-puzzle-1": {
    partLabel: "Pečať I",
    icon: "🪙",
    title: "Rytierska minca",
    text: "Máte prednosť pri registrácii na šachový turnaj — príďte skôr do fronty pri hlavolamoch.",
    clue: "P",
  },
  "cg-puzzle-2": {
    partLabel: "Pečať II",
    icon: "📜",
    title: "Listina rytiera",
    text: "Druhá časť hesla investície. Spojte ju s ostatnými po vyriešení všetkých úloh.",
    clue: "TRA",
  },
  "cg-puzzle-3": {
    partLabel: "Pečať III",
    icon: "⚔️",
    title: "Meč taktika",
    text: "Posledná časť tajomstva. Po troch úlohách sa odkryje celá investícia.",
    clue: "ŠACH",
  },
};

var FULL_REWARD = {
  title: "Investícia rytiera Andreasa je odkrytá!",
  text:
    "Ste pripravení na turnaj. Na festivale pri šachovej registrácii ukážte túto stránku alebo povedzte heslo:",
  code: "PTRA–RYTIER–ŠACH",
  note: "Organizátor vám pridelí pamätný rytiersky žetón naviac (podľa dostupnosti v deň podujatia).",
};

function readStored() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function writeStored(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {}
}

function getSolvedSet() {
  return new Set(readStored());
}

export function isPuzzleRewardUnlocked(puzzleId) {
  return getSolvedSet().has(puzzleId);
}

export function unlockPuzzleReward(puzzleId) {
  if (!REWARD_BY_ID[puzzleId]) return false;
  var set = getSolvedSet();
  if (set.has(puzzleId)) return false;
  set.add(puzzleId);
  writeStored(Array.from(set));
  updateInvesticiaUI();
  return true;
}

function allPuzzleIds() {
  return FESTIVAL_PUZZLES.map(function (p) {
    return p.id;
  });
}

function allUnlocked() {
  var set = getSolvedSet();
  var ids = allPuzzleIds();
  for (var i = 0; i < ids.length; i++) {
    if (!set.has(ids[i])) return false;
  }
  return ids.length > 0;
}

function updateInvesticiaUI() {
  var root = document.getElementById("sach-investicia");
  if (!root) return;

  var set = getSolvedSet();
  var parts = root.querySelectorAll("[data-reward-part]");
  for (var i = 0; i < parts.length; i++) {
    var id = parts[i].getAttribute("data-reward-part");
    var unlocked = set.has(id);
    parts[i].classList.toggle("is-unlocked", unlocked);
    var lock = parts[i].querySelector(".sach-investicia__lock");
    var body = parts[i].querySelector(".sach-investicia__body");
    if (lock) lock.hidden = unlocked;
    if (body) body.hidden = !unlocked;
  }

  var count = set.size;
  var total = allPuzzleIds().length;
  var progress = root.querySelector("[data-investicia-progress]");
  if (progress) {
    progress.textContent = count + " / " + total + " pečatí";
  }

  var vault = root.querySelector(".sach-investicia__vault");
  var complete = allUnlocked();
  if (vault) {
    vault.hidden = !complete;
  }
  root.classList.toggle("is-complete", complete);
}

export function initPuzzleRewards() {
  updateInvesticiaUI();
}

export function getRewardMeta(puzzleId) {
  return REWARD_BY_ID[puzzleId] || null;
}

export function getFullReward() {
  return FULL_REWARD;
}
