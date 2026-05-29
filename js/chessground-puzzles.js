import { FESTIVAL_PUZZLES } from "./puzzles-data.js";
import { mountBotPuzzle } from "./puzzle-bot.js";
import {
  unlockPuzzleReward,
  getRewardMeta,
  isPuzzleRewardUnlocked,
  initPuzzleRewards,
} from "./puzzle-rewards.js";
import { renderInvesticiaGrid, renderPuzzleGrid, applyPuzzleAccessUI } from "./puzzle-board-ui.js";
import { isPuzzleAccessUnlocked, syncPermanentFromSchedule, isDevUnlockAll } from "./puzzle-unlock.js";
import { initPuzzleTimeline, bindPuzzleUnlockPrompts } from "./puzzle-timeline-ui.js";

var ALL_SQUARES = [
  "a1","b1","c1","d1","e1","f1","g1","h1",
  "a2","b2","c2","d2","e2","f2","g2","h2",
  "a3","b3","c3","d3","e3","f3","g3","h3",
  "a4","b4","c4","d4","e4","f4","g4","h4",
  "a5","b5","c5","d5","e5","f5","g5","h5",
  "a6","b6","c6","d6","e6","f6","g6","h6",
  "a7","b7","c7","d7","e7","f7","g7","h7",
  "a8","b8","c8","d8","e8","f8","g8","h8",
];

var mountedIds = {};
var mountObservers = {};

/**
 * Legálne cieľové polia pre Chessground — z chess.js (FIDE pravidlá:
 * šach, mat, branie, promo pešiaka, rošáda, en passant podľa FEN).
 */
function buildDests(chess) {
  var dests = new Map();
  for (var i = 0; i < ALL_SQUARES.length; i++) {
    var sq = ALL_SQUARES[i];
    var moves = chess.moves({ square: sq, verbose: true });
    if (!moves || !moves.length) continue;
    var to = [];
    for (var j = 0; j < moves.length; j++) to.push(moves[j].to);
    dests.set(sq, to);
  }
  return dests;
}

function setCompletionUI(puzzleId, solvedNow) {
  var boardEl = document.getElementById(puzzleId);
  if (!boardEl) return;
  var item = boardEl.closest(".sach-visual-item");
  if (!item) return;
  var hasReward = isPuzzleRewardUnlocked(puzzleId);
  item.classList.toggle("is-completed", solvedNow);
  item.classList.toggle("has-reward", hasReward);

  var banner = item.querySelector(".sach-success-banner");
  if (solvedNow) {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "sach-success-banner";
      item.appendChild(banner);
    }
    var meta = getRewardMeta(puzzleId);
    if (hasReward && meta) {
      banner.textContent =
        "🏆 Úloha splnená! Prispeli ste k " + meta.partLabel + " — pozrite investíciu vyššie.";
    } else {
      banner.textContent = "🏆 Výborne! Úloha splnená proti počítaču.";
    }
  } else if (banner) {
    banner.remove();
  }

  var badge = item.querySelector(".sach-reward-badge");
  if (hasReward && !solvedNow) {
    if (!badge) {
      badge = document.createElement("p");
      badge.className = "sach-reward-badge";
      item.appendChild(badge);
    }
    badge.textContent = "✓ Úloha už splnená";
  } else if (badge) {
    badge.remove();
  }
}

function notifyPuzzleSolved(puzzleId, options) {
  var wasNew = unlockPuzzleReward(puzzleId, options);
  var meta = getRewardMeta(puzzleId);
  if (wasNew && meta) {
    var boardEl = document.getElementById(puzzleId);
    var item = boardEl && boardEl.closest(".sach-visual-item");
    if (item) {
      var banner = item.querySelector(".sach-success-banner");
      if (!banner) {
        banner = document.createElement("div");
        banner.className = "sach-success-banner";
        item.appendChild(banner);
      }
      var partial =
        options && options.firstTry === false ? " (čiastočný zápis — boli chyby v riešení)" : "";
      banner.textContent =
        "🎁 " + meta.icon + " " + meta.title + " — pokrok v investícii." + partial;
    }
  }
}

function wirePuzzleControls(puzzle, ctx) {
  var resetBtn = document.querySelector('[data-reset-puzzle="' + puzzle.id + '"]');
  if (resetBtn) resetBtn.addEventListener("click", ctx.resetBoard);
}

function createPuzzleHelpers() {
  return {
    buildDests: buildDests,
    setCompletionUI: setCompletionUI,
    notifyPuzzleSolved: notifyPuzzleSolved,
    wireControls: wirePuzzleControls,
  };
}

function mountPuzzleBoard(puzzle) {
  if (!isPuzzleAccessUnlocked(puzzle.id)) return;
  if (mountedIds[puzzle.id]) return;
  if (!puzzle.play || !puzzle.fen) return;
  var el = document.getElementById(puzzle.id);
  if (!el) return;
  mountedIds[puzzle.id] = true;
  mountBotPuzzle(puzzle, createPuzzleHelpers());
}

function clearPuzzleMountWatch(puzzleId) {
  if (mountObservers[puzzleId]) {
    mountObservers[puzzleId].disconnect();
    delete mountObservers[puzzleId];
  }
}

function schedulePuzzleMount(puzzle) {
  if (!isPuzzleAccessUnlocked(puzzle.id) || mountedIds[puzzle.id]) return;
  var el = document.getElementById(puzzle.id);
  if (!el) return;

  if (el.offsetWidth > 20) {
    mountPuzzleBoard(puzzle);
    return;
  }

  clearPuzzleMountWatch(puzzle.id);

  if (typeof IntersectionObserver === "undefined") {
    mountPuzzleBoard(puzzle);
    return;
  }

  mountObservers[puzzle.id] = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting && !mountedIds[puzzle.id]) {
          mountPuzzleBoard(puzzle);
        }
      }
    },
    { root: null, rootMargin: "80px", threshold: 0.12 }
  );
  mountObservers[puzzle.id].observe(el);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      var board = document.getElementById(puzzle.id);
      if (board && board.offsetWidth > 20 && !mountedIds[puzzle.id]) mountPuzzleBoard(puzzle);
    });
  });
}

function mountWeekPuzzles(weekIndex) {
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (!p || p.weekIndex !== weekIndex || !p.fen) continue;
    if (!isPuzzleAccessUnlocked(p.id) || mountedIds[p.id]) continue;
    clearPuzzleMountWatch(p.id);
    schedulePuzzleMount(p);
  }
}

function mountAllPlayablePuzzles() {
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (p && p.id && p.fen && isPuzzleAccessUnlocked(p.id)) schedulePuzzleMount(p);
  }
  for (var j = 0; j < FESTIVAL_PUZZLES.length; j++) {
    var pid = FESTIVAL_PUZZLES[j].id;
    if (isPuzzleRewardUnlocked(pid)) {
      setCompletionUI(pid, false);
    }
  }
}

function refreshAfterAccessChange() {
  applyPuzzleAccessUI();
  mountAllPlayablePuzzles();
  initPuzzleRewards();
}

function scrollToPuzzle(puzzleId) {
  var item = document.querySelector('.sach-visual-item[data-puzzle-id="' + puzzleId + '"]');
  if (item) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
  var weekSection = document.getElementById(
    "sach-week-" + (item && item.dataset.weekIndex ? item.dataset.weekIndex : "")
  );
  if (weekSection && !item) weekSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function initChessgroundPuzzles() {
  syncPermanentFromSchedule();
  renderInvesticiaGrid();
  renderPuzzleGrid();
  applyPuzzleAccessUI();
  initPuzzleRewards();
  bindPuzzleUnlockPrompts();
  initPuzzleTimeline(scrollToPuzzle);
  mountAllPlayablePuzzles();

  window.addEventListener("ptra-puzzle-access-changed", function () {
    refreshAfterAccessChange();
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initChessgroundPuzzles);
else initChessgroundPuzzles();

export { isDevUnlockAll };
