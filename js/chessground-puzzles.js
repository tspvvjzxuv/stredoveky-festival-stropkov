import { initPuzzleRewards } from "./puzzle-rewards.js";
import { refreshScoreUI, syncScoresFromRewards } from "./puzzle-score.js";
import {
  renderInvesticiaGrid,
  renderPuzzleGrid,
  applyPuzzleAccessUI,
  presetGridBoardSizes,
  isMobilePuzzleLayout,
} from "./puzzle-board-ui.js";
import { syncPermanentFromSchedule, isDevUnlockAll, bindPuzzleUnlockPrompts } from "./puzzle-unlock.js";
import { initPuzzleTimeline } from "./puzzle-timeline-ui.js";
import {
  initPuzzleMount,
  mountActiveWeekWithMarkers,
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

function showPageInitError(err) {
  console.error("PTRA šach init:", err);
  var grid = document.getElementById("sach-puzzle-grid");
  if (grid) {
    grid.innerHTML =
      '<p class="note sach-module-fail" role="alert">' +
      "Šachové úlohy sa nepodarilo spustiť. Obnovte stránku alebo vypnite blokovanie skriptov pre ptra.sk." +
      "</p>";
  }
  var loading = document.getElementById("sach-loading");
  if (loading) loading.hidden = true;
}

function onBreakpointCross() {
  renderPuzzleGrid();
  presetGridBoardSizes(document.getElementById("sach-puzzle-grid"));
  syncProgressUI();
  mountActiveWeekWithMarkers(null);
}

function initSachPage() {
  try {
    syncPermanentFromSchedule();

    var layoutIsMobile = isMobilePuzzleLayout();
    window.addEventListener("resize", function () {
      var nowMobile = isMobilePuzzleLayout();
      if (nowMobile === layoutIsMobile) return;
      layoutIsMobile = nowMobile;
      onBreakpointCross();
    });

    initPuzzleMount();

    renderInvesticiaGrid();
    renderPuzzleGrid();
    presetGridBoardSizes(document.getElementById("sach-puzzle-grid"));
    syncProgressUI();
    bindPuzzleUnlockPrompts();
    initPuzzleTimeline(scrollToPuzzle);
    mountActiveWeekWithMarkers(null);

    window.addEventListener("ptra-puzzle-access-changed", function () {
      syncProgressUI();
      mountActiveWeekWithMarkers(null);
    });

    var loading = document.getElementById("sach-loading");
    if (loading) loading.hidden = true;
  } catch (err) {
    showPageInitError(err);
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initSachPage);
else initSachPage();

export { isDevUnlockAll };
