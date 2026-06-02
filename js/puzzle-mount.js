/**
 * Mount lifecycle pre Chessground dosky — jedna cesta, bez duplicitných remountov.
 */
import { FESTIVAL_PUZZLES, getPuzzleById } from "./puzzles-data.js";
import { mountBotPuzzle, destroyPuzzleGround } from "./puzzle-bot.js";
import { createPuzzleBoardCallbacks, isPuzzleRewardUnlocked, syncCompletionUI } from "./puzzle-rewards.js";
import { isPuzzleAccessUnlocked } from "./puzzle-unlock.js";
import {
  getActivePuzzleWeekIndex,
  isPuzzleBoardInActiveView,
  isMobilePuzzleLayout,
  syncChessBoardSize,
  boardHasLayout,
} from "./puzzle-board-ui.js";

var mountedIds = {};
var viewportTimer = null;

function boardHasPieces(el) {
  return !!(el && el.querySelector("piece"));
}

function clearMountFlag(puzzle) {
  var el = document.getElementById(puzzle.id);
  if (!el || !mountedIds[puzzle.id]) return;
  if (boardHasPieces(el)) return;
  delete mountedIds[puzzle.id];
  el.classList.remove("cg-board--mounted");
}

function unmountBoard(puzzle) {
  if (!puzzle || !puzzle.id) return;
  var el = document.getElementById(puzzle.id);
  if (el) {
    destroyPuzzleGround(el);
    el.classList.remove("cg-board--mounted");
  }
  delete mountedIds[puzzle.id];
}

function unmountOtherWeeks(activeWeekIndex) {
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (!p || p.weekIndex === activeWeekIndex) continue;
    unmountBoard(p);
  }
}

function showBoardLoadError(el) {
  if (!el || el.querySelector(".sach-board-load-error")) return;
  var host = el.closest(".chessground-host") || el.parentElement;
  if (!host) return;
  var msg = document.createElement("p");
  msg.className = "sach-board-load-error note";
  msg.setAttribute("role", "alert");
  msg.textContent =
    "Šachovnicu sa nepodarilo načítať. Obnovte stránku (potiahnutie nadol v Safari) alebo vypnite blokovanie skriptov.";
  host.appendChild(msg);
}

function mountBoardNow(puzzle, force) {
  if (!isPuzzleAccessUnlocked(puzzle.id)) return;
  if (!puzzle.play || !puzzle.fen) return;
  if (mountedIds[puzzle.id] && !force) return;

  var el = document.getElementById(puzzle.id);
  if (!el || !isPuzzleBoardInActiveView(el)) return;

  if (force) unmountBoard(puzzle);

  syncChessBoardSize(el, { skipRedraw: true });
  if (!force && !isMobilePuzzleLayout() && !boardHasLayout(el)) return;

  try {
    mountedIds[puzzle.id] = true;
    el.classList.add("cg-board--mounted");
    mountBotPuzzle(puzzle, createPuzzleBoardCallbacks());
    requestAnimationFrame(function () {
      if (!boardHasPieces(el)) {
        clearMountFlag(puzzle);
        mountBoardNow(puzzle, true);
      }
    });
  } catch (err) {
    delete mountedIds[puzzle.id];
    el.classList.remove("cg-board--mounted");
    console.error("PTRA šach:", puzzle.id, err);
    showBoardLoadError(el);
  }
}

function waitThenMount(puzzle, attempt) {
  attempt = attempt == null ? 0 : attempt;
  if (!isPuzzleAccessUnlocked(puzzle.id)) return;
  clearMountFlag(puzzle);
  if (mountedIds[puzzle.id] && boardHasPieces(document.getElementById(puzzle.id))) return;

  var el = document.getElementById(puzzle.id);
  if (!el || !isPuzzleBoardInActiveView(el)) return;

  if (boardHasLayout(el) || isMobilePuzzleLayout()) {
    mountBoardNow(puzzle, false);
    return;
  }

  var maxAttempts = isMobilePuzzleLayout() ? 20 : 8;
  if (attempt < maxAttempts) {
    setTimeout(function () {
      waitThenMount(puzzle, attempt + 1);
    }, 50 + attempt * 35);
    return;
  }

  mountBoardNow(puzzle, true);
}

export function resetMountState() {
  mountedIds = {};
}

export function mountActiveWeek(weekIndex) {
  if (weekIndex == null) return;
  unmountOtherWeeks(weekIndex);

  var section = document.getElementById("sach-week-" + weekIndex);
  if (section) {
    var boards = section.querySelectorAll(".cg-board");
    for (var b = 0; b < boards.length; b++) {
      syncChessBoardSize(boards[b], { skipRedraw: true });
    }
  }

  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (!p || p.weekIndex !== weekIndex || !p.fen) continue;
    if (!isPuzzleAccessUnlocked(p.id)) continue;
    clearMountFlag(p);
    waitThenMount(p, 0);
  }

  if (isMobilePuzzleLayout()) {
    setTimeout(remountActiveWeekIfEmpty, 800);
  }
}

export function refreshSolvedBoardMarkers() {
  for (var j = 0; j < FESTIVAL_PUZZLES.length; j++) {
    var pid = FESTIVAL_PUZZLES[j].id;
    if (isPuzzleRewardUnlocked(pid)) syncCompletionUI(pid, false);
  }
}

export function mountActiveWeekWithMarkers(weekIndex) {
  if (weekIndex == null) weekIndex = getActivePuzzleWeekIndex();
  if (weekIndex == null) return;
  mountActiveWeek(weekIndex);
  refreshSolvedBoardMarkers();
}

function activeWeekHasPieces() {
  var weekIndex = getActivePuzzleWeekIndex();
  if (weekIndex == null) return false;
  var section = document.getElementById("sach-week-" + weekIndex);
  if (!section) return false;
  var boards = section.querySelectorAll(".cg-board");
  for (var i = 0; i < boards.length; i++) {
    if (boardHasPieces(boards[i])) return true;
  }
  return false;
}

function remountActiveWeekIfEmpty() {
  if (activeWeekHasPieces()) return;
  var weekIndex = getActivePuzzleWeekIndex();
  if (weekIndex != null) mountActiveWeek(weekIndex);
}

export function syncActiveWeekBoards() {
  var weekIndex = getActivePuzzleWeekIndex();
  if (weekIndex == null) return;

  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (!p || p.weekIndex !== weekIndex) continue;
    var el = document.getElementById(p.id);
    if (!el || !isPuzzleBoardInActiveView(el)) continue;
    syncChessBoardSize(el);
    var ground = el._ptraChessground;
    if (ground && typeof ground.redrawAll === "function") {
      try {
        ground.redrawAll();
      } catch (e) {}
    } else if (!boardHasPieces(el) && isPuzzleAccessUnlocked(p.id)) {
      clearMountFlag(p);
      waitThenMount(p, 0);
    }
  }
}

function scheduleViewportSync() {
  clearTimeout(viewportTimer);
  viewportTimer = setTimeout(syncActiveWeekBoards, 150);
}

function onWeekVisible(weekIndex) {
  unmountOtherWeeks(weekIndex);
  var run = function () {
    mountActiveWeekWithMarkers(weekIndex);
  };
  if (isMobilePuzzleLayout()) {
    requestAnimationFrame(function () {
      requestAnimationFrame(run);
    });
  } else {
    requestAnimationFrame(run);
  }
}

export function initPuzzleMount() {
  window.addEventListener("ptra-puzzle-grid-rebuilt", resetMountState);

  window.addEventListener("ptra-puzzle-week-visible", function (ev) {
    var weekIndex = ev.detail && ev.detail.weekIndex;
    if (weekIndex != null) onWeekVisible(weekIndex);
  });

  window.addEventListener("pageshow", function (ev) {
    if (ev.persisted) {
      var weekIndex = getActivePuzzleWeekIndex();
      if (weekIndex != null) mountActiveWeekWithMarkers(weekIndex);
    }
  });

  window.addEventListener("orientationchange", function () {
    setTimeout(syncActiveWeekBoards, 350);
  });

  window.addEventListener("resize", scheduleViewportSync);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleViewportSync);
  }

  if (isMobilePuzzleLayout()) {
    window.addEventListener("load", function () {
      setTimeout(remountActiveWeekIfEmpty, 500);
    });

    var ulohyCard = document.querySelector(".sach-ulohy-card");
    if (ulohyCard && typeof IntersectionObserver !== "undefined") {
      var ulohyTimer = null;
      new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            clearTimeout(ulohyTimer);
            ulohyTimer = setTimeout(remountActiveWeekIfEmpty, 120);
          }
        },
        { root: null, rootMargin: "48px", threshold: 0.05 }
      ).observe(ulohyCard);
    }

    var grid = document.getElementById("sach-puzzle-grid");
    if (grid) {
      grid.addEventListener(
        "touchstart",
        function (ev) {
          var board = ev.target && ev.target.closest && ev.target.closest(".cg-board");
          if (!board || !board.id || boardHasPieces(board)) return;
          var puzzle = getPuzzleById(board.id);
          if (puzzle && isPuzzleAccessUnlocked(puzzle.id)) waitThenMount(puzzle, 0);
        },
        { passive: true, capture: true }
      );
    }
  }
}
