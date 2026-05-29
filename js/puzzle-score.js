import { FESTIVAL_PUZZLES, DIFFICULTY_LABELS, WEEK_THEMES } from "./puzzles-data.js";
import { isPuzzleRewardUnlocked } from "./puzzle-rewards.js";

var STORAGE_KEY = "ptra-puzzle-scores-v1";

var BASE_POINTS = { easy: 100, medium: 250, hard: 500 };

var RANKS = [
  { min: 0, title: "Začiatočník na dvore", icon: "♟" },
  { min: 400, title: "Šachový page", icon: "♞" },
  { min: 1200, title: "Rytier taktiky", icon: "♜" },
  { min: 2800, title: "Strážca Vlieku", icon: "♛" },
  { min: 5500, title: "Majster festivalu", icon: "👑" },
];

function readStore() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { displayName: "", puzzles: {} };
    var parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { displayName: "", puzzles: {} };
    if (!parsed.puzzles || typeof parsed.puzzles !== "object") parsed.puzzles = {};
    if (typeof parsed.displayName !== "string") parsed.displayName = "";
    return parsed;
  } catch (e) {
    return { displayName: "", puzzles: {} };
  }
}

function writeStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {}
}

function sumPoints(puzzles) {
  var total = 0;
  for (var id in puzzles) {
    if (Object.prototype.hasOwnProperty.call(puzzles, id)) {
      total += puzzles[id].points || 0;
    }
  }
  return total;
}

export function computePointsForSolve(puzzle, movesUsed, maxMoves) {
  var base = BASE_POINTS[puzzle.difficulty] || 100;
  if (typeof movesUsed !== "number" || typeof maxMoves !== "number" || maxMoves < 1) {
    return base;
  }
  var saved = Math.max(0, maxMoves - movesUsed);
  var bonus = Math.round((saved / maxMoves) * base * 0.6);
  return base + bonus;
}

export function getPuzzleScoreRecord(puzzleId) {
  return readStore().puzzles[puzzleId] || null;
}

export function recordPuzzleSolve(puzzle, options) {
  if (!puzzle || !puzzle.id) return null;
  options = options || {};
  var movesUsed = options.movesUsed;
  var maxMoves = options.maxMoves != null ? options.maxMoves : puzzle.maxMoves;
  var points = computePointsForSolve(puzzle, movesUsed, maxMoves);

  var store = readStore();
  var prev = store.puzzles[puzzle.id];
  if (prev && prev.points >= points) return prev.points;

  store.puzzles[puzzle.id] = {
    points: points,
    movesUsed: typeof movesUsed === "number" ? movesUsed : null,
    maxMoves: typeof maxMoves === "number" ? maxMoves : null,
    difficulty: puzzle.difficulty,
    weekIndex: puzzle.weekIndex,
    solvedAt: new Date().toISOString(),
  };
  store.totalPoints = sumPoints(store.puzzles);
  writeStore(store);
  return points;
}

export function setScoreDisplayName(name) {
  var store = readStore();
  store.displayName = String(name || "").trim().slice(0, 32);
  writeStore(store);
}

export function getScoreDisplayName() {
  return readStore().displayName || "";
}

export function getRankForPoints(total) {
  var rank = RANKS[0];
  for (var i = 0; i < RANKS.length; i++) {
    if (total >= RANKS[i].min) rank = RANKS[i];
  }
  return rank;
}

export function getScoreSummary() {
  var store = readStore();
  var solvedCount = 0;
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    if (store.puzzles[FESTIVAL_PUZZLES[i].id]) solvedCount += 1;
  }
  var total = store.totalPoints != null ? store.totalPoints : sumPoints(store.puzzles);
  var weeks = [];
  for (var w = 1; w <= 12; w++) {
    var weekPoints = 0;
    var weekSolved = 0;
    for (var j = 0; j < FESTIVAL_PUZZLES.length; j++) {
      var p = FESTIVAL_PUZZLES[j];
      if (p.weekIndex !== w) continue;
      var rec = store.puzzles[p.id];
      if (rec) {
        weekPoints += rec.points || 0;
        weekSolved += 1;
      }
    }
    weeks.push({
      weekIndex: w,
      title: WEEK_THEMES[w - 1] ? WEEK_THEMES[w - 1].title : "Týždeň " + w,
      points: weekPoints,
      solved: weekSolved,
      total: 3,
    });
  }

  var topPuzzles = FESTIVAL_PUZZLES.map(function (p) {
    var rec = store.puzzles[p.id];
    if (!rec) return null;
    return {
      id: p.id,
      title: DIFFICULTY_LABELS[p.difficulty] + " · týždeň " + p.weekIndex,
      points: rec.points,
      movesUsed: rec.movesUsed,
      maxMoves: rec.maxMoves,
    };
  })
    .filter(Boolean)
    .sort(function (a, b) {
      return b.points - a.points;
    })
    .slice(0, 5);

  return {
    displayName: store.displayName,
    totalPoints: total,
    solvedCount: solvedCount,
    totalPuzzles: FESTIVAL_PUZZLES.length,
    rank: getRankForPoints(total),
    weeks: weeks,
    topPuzzles: topPuzzles,
  };
}

/** Doplní body za už splnené úlohy (starý pokrok bez skóre). */
export function syncScoresFromRewards() {
  var store = readStore();
  var changed = false;
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (!isPuzzleRewardUnlocked(p.id)) continue;
    if (store.puzzles[p.id]) continue;
    var estMoves =
      typeof p.maxMoves === "number"
        ? Math.max(1, Math.ceil(p.maxMoves * 0.55))
        : null;
    var points = computePointsForSolve(p, estMoves, p.maxMoves);
    store.puzzles[p.id] = {
      points: points,
      movesUsed: estMoves,
      maxMoves: p.maxMoves,
      difficulty: p.difficulty,
      weekIndex: p.weekIndex,
      solvedAt: null,
      estimated: true,
    };
    changed = true;
  }
  if (changed) {
    store.totalPoints = sumPoints(store.puzzles);
    writeStore(store);
  }
}

export function renderScorePanel() {
  var root = document.getElementById("sach-score-panel");
  if (!root) return;

  var s = getScoreSummary();
  var name = s.displayName || "Hráč";

  var weeksHtml = s.weeks
    .map(function (w) {
      var pct = w.total ? Math.round((w.solved / w.total) * 100) : 0;
      return (
        '<tr><th scope="row">T' +
        w.weekIndex +
        " · " +
        escapeHtml(w.title) +
        '</th><td class="sach-score-num">' +
        w.points +
        '</td><td class="sach-score-num">' +
        w.solved +
        "/" +
        w.total +
        " (" +
        pct +
        "%)</td></tr>"
      );
    })
    .join("");

  var topHtml =
    s.topPuzzles.length === 0
      ? '<p class="note">Zatiaľ žiadne bodované úlohy — vyriešte hlavolam a body sa pripíšu.</p>'
      : "<ol class=\"sach-score-top\">" +
        s.topPuzzles
          .map(function (t) {
            var moves =
              t.movesUsed != null && t.maxMoves != null
                ? " · " + t.movesUsed + "/" + t.maxMoves + " ťahov"
                : "";
            return (
              "<li><span>" +
              escapeHtml(t.title) +
              '</span><strong class="sach-score-num">+' +
              t.points +
              "</strong>" +
              moves +
              "</li>"
            );
          })
          .join("") +
        "</ol>";

  root.innerHTML =
    '<div class="sach-score__head">' +
    '<p class="sach-score__rank" aria-label="Stupeň">' +
    s.rank.icon +
    " " +
    escapeHtml(s.rank.title) +
    "</p>" +
    '<p class="sach-score__total"><span class="sach-score__total-value">' +
    s.totalPoints +
    '</span> <span class="sach-score__total-label">bodov</span></p>' +
    '<p class="sach-score__meta">' +
    escapeHtml(name) +
    " · " +
    s.solvedCount +
    " / " +
    s.totalPuzzles +
    " úloh</p>" +
    "</div>" +
    '<label class="sach-score__name-label" for="sach-score-name">Prezývka (len pre vás, lokálne)</label>' +
    '<input type="text" id="sach-score-name" class="sach-score__name-input" maxlength="32" placeholder="napr. Andreas" value="' +
    escapeAttr(s.displayName) +
    '" />' +
    '<h3 class="sach-score__sub">Body podľa týždňa</h3>' +
    '<div class="sach-score__table-wrap">' +
    '<table class="sach-score__table"><thead><tr><th>Týždeň</th><th>Body</th><th>Úlohy</th></tr></thead><tbody>' +
    weeksHtml +
    "</tbody></table></div>" +
    '<h3 class="sach-score__sub">Najlepšie úlohy</h3>' +
    topHtml +
    '<p class="note sach-score__note">Body sa počítajú podľa obtiažnosti a počtu ťahov (bonus za menej ťahov). Ukladajú sa výhradne v localStorage tohto prehliadača — pri vymazaní dát alebo na inom zariadení začínate od nuly. Na festivale platí investícia a heslo z úloh, nie online porovnanie hráčov.</p>';

  var input = root.querySelector("#sach-score-name");
  if (input) {
    input.addEventListener("change", function () {
      setScoreDisplayName(input.value);
      renderScorePanel();
    });
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        setScoreDisplayName(input.value);
        renderScorePanel();
      }
    });
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, "&#39;");
}

export function refreshScoreUI() {
  renderScorePanel();
}
