import { initPuzzleRewards } from "./puzzle-rewards.js";
import { refreshScoreUI, syncScoresFromRewards } from "./puzzle-score.js";
import {
  renderInvesticiaGrid,
  renderPuzzleGrid,
  applyPuzzleAccessUI,
  presetGridBoardSizes,
  isMobilePuzzleLayout,
  puzzleGridHasContent,
  getActivePuzzleWeekIndex,
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

function showGridEmptyFallback() {
  var grid = document.getElementById("sach-puzzle-grid");
  if (!grid || puzzleGridHasContent()) return;
  grid.innerHTML =
    '<div class="sach-grid-retry" role="alert">' +
    '<p class="note">Úlohy sa nepodarilo zobraziť. Skúste obnoviť stránku alebo tlačidlo nižšie.</p>' +
    '<button type="button" class="btn btn-outline" id="sach-grid-retry">Načítať úlohy</button>' +
    "</div>";
  var retry = document.getElementById("sach-grid-retry");
  if (retry) {
    retry.addEventListener("click", function () {
      recoverPuzzleGrid();
    });
  }
}

function recoverPuzzleGrid() {
  try {
    if (!renderPuzzleGrid()) {
      showGridEmptyFallback();
      return false;
    }
    presetGridBoardSizes(document.getElementById("sach-puzzle-grid"));
    syncProgressUI();
    mountActiveWeekWithMarkers(getActivePuzzleWeekIndex());
    hideLoadingIndicator();
    return true;
  } catch (err) {
    showPageInitError(err);
    return false;
  }
}

function scheduleMobileGridRecovery() {
  if (!isMobilePuzzleLayout()) return;
  var delays = [400, 1200, 2800];
  for (var i = 0; i < delays.length; i++) {
    (function (ms) {
      setTimeout(function () {
        if (puzzleGridHasContent()) {
          mountActiveWeekWithMarkers(getActivePuzzleWeekIndex());
          return;
        }
        recoverPuzzleGrid();
      }, ms);
    })(delays[i]);
  }
}

function onBreakpointCross() {
  if (!renderPuzzleGrid()) {
    showGridEmptyFallback();
    return;
  }
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
    var gridOk = renderPuzzleGrid();
    if (gridOk) {
      presetGridBoardSizes(document.getElementById("sach-puzzle-grid"));
      syncProgressUI();
      mountActiveWeekWithMarkers(null);
      hideLoadingIndicator();
    } else {
      showGridEmptyFallback();
    }

    bindPuzzleUnlockPrompts();
    initPuzzleTimeline(scrollToPuzzle);

    window.addEventListener("ptra-puzzle-access-changed", function () {
      syncProgressUI();
      mountActiveWeekWithMarkers(null);
    });

    window.addEventListener("pageshow", function (ev) {
      if (!ev.persisted) return;
      recoverPuzzleGrid();
    });

    window.addEventListener("load", function () {
      if (!puzzleGridHasContent()) recoverPuzzleGrid();
      else mountActiveWeekWithMarkers(getActivePuzzleWeekIndex());
    });

    scheduleMobileGridRecovery();
  } catch (err) {
    showPageInitError(err);
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initSachPage);
else initSachPage();

export { isDevUnlockAll };
