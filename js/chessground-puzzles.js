import { initPuzzleRewards } from "./puzzle-rewards.js";
import { refreshScoreUI, syncScoresFromRewards } from "./puzzle-score.js";
import {
  renderInvesticiaGrid,
  renderPuzzleGrid,
  applyPuzzleAccessUI,
  presetGridBoardSizes,
  getActivePuzzleWeekIndex,
  puzzleGridHasContent,
  useSingleWeekDom,
} from "./puzzle-board-ui.js";
import { syncPermanentFromSchedule, isDevUnlockAll, bindPuzzleUnlockPrompts } from "./puzzle-unlock.js";
import { initPuzzleTimeline } from "./puzzle-timeline-ui.js";
import {
  initPuzzleMount,
  mountActiveWeekWithMarkers,
  syncActiveWeekBoards,
} from "./puzzle-mount.js";

function syncProgressUI() {
  applyPuzzleAccessUI();
  initPuzzleRewards();
  syncScoresFromRewards();
  refreshScoreUI();
}

function scrollToPuzzle(puzzleId) {
  var item = document.querySelector('.sach-visual-item[data-puzzle-id="' + puzzleId + '"]');
  if (item) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideLoadingIndicator() {
  var loading = document.getElementById("sach-loading");
  if (loading) loading.hidden = true;
}

function showPageInitError(err) {
  console.error("PTRA šach init:", err);
  var grid = document.getElementById("sach-puzzle-grid");
  if (grid) {
    grid.innerHTML =
      '<p class="note sach-module-fail" role="alert">' +
      "Šachové úlohy sa nepodarilo spustiť. Obnovte stránku alebo vypnite blokovanie skriptov pre ptra.sk." +
      "</p>";
  }
  hideLoadingIndicator();
}

function initSachPage() {
  try {
    syncPermanentFromSchedule();

    initPuzzleMount();

    renderInvesticiaGrid();
    renderPuzzleGrid();
    presetGridBoardSizes(document.getElementById("sach-puzzle-grid"));
    syncProgressUI();
    bindPuzzleUnlockPrompts();
    initPuzzleTimeline(scrollToPuzzle);
    mountActiveWeekWithMarkers(null);

    if (puzzleGridHasContent()) hideLoadingIndicator();

    window.addEventListener("ptra-puzzle-access-changed", function () {
      syncProgressUI();
      mountActiveWeekWithMarkers(null);
    });

    window.addEventListener("resize", function () {
      syncActiveWeekBoards();
    });

    window.addEventListener("load", function () {
      if (!puzzleGridHasContent()) renderPuzzleGrid();
      presetGridBoardSizes(document.getElementById("sach-puzzle-grid"));
      mountActiveWeekWithMarkers(getActivePuzzleWeekIndex());
      hideLoadingIndicator();
    });

    if (useSingleWeekDom()) {
      setTimeout(function () {
        mountActiveWeekWithMarkers(getActivePuzzleWeekIndex());
      }, 800);
    }
  } catch (err) {
    showPageInitError(err);
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initSachPage);
else initSachPage();

export { isDevUnlockAll };
