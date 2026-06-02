import { initPuzzleRewards } from "./puzzle-rewards.js";
import { refreshScoreUI, syncScoresFromRewards } from "./puzzle-score.js";
import {
  renderInvesticiaGrid,
  renderPuzzleGrid,
  applyPuzzleAccessUI,
  presetGridBoardSizes,
  getActivePuzzleWeekIndex,
  puzzleGridHasContent,
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
  window.dispatchEvent(new CustomEvent("ptra-timeline-refresh"));
}

function scrollToPuzzle(puzzleId) {
  var item = document.querySelector('.sach-visual-item[data-puzzle-id="' + puzzleId + '"]');
  if (item) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideLoadingIndicator() {
  var loading = document.getElementById("sach-loading");
  if (loading) loading.hidden = true;
}

function showGridFail(message) {
  var grid = document.getElementById("sach-puzzle-grid");
  if (!grid) return;
  grid.innerHTML =
    '<p class="note sach-module-fail" role="alert">' +
    message +
    ' <button type="button" class="btn btn-outline" id="sach-grid-retry">Skúsiť znova</button></p>';
  var retry = document.getElementById("sach-grid-retry");
  if (retry) retry.addEventListener("click", function () { bootSachPage(true); });
  hideLoadingIndicator();
}

function showPageInitError(err) {
  console.error("PTRA šach init:", err);
  showGridFail(
    "Šachové úlohy sa nepodarilo spustiť. Obnovte stránku alebo vypnite blokovanie skriptov pre ptra.sk."
  );
}

function bootSachPage(force) {
  try {
    syncPermanentFromSchedule();
    renderInvesticiaGrid();

    if (force || !puzzleGridHasContent()) {
      if (!renderPuzzleGrid()) {
        showGridFail("Úlohy sa nepodarilo vykresliť. Skúste znova alebo obnovte stránku.");
        return;
      }
    }

    var grid = document.getElementById("sach-puzzle-grid");
    presetGridBoardSizes(grid);
    syncProgressUI();
    mountActiveWeekWithMarkers(getActivePuzzleWeekIndex());

    if (puzzleGridHasContent()) hideLoadingIndicator();
  } catch (err) {
    showPageInitError(err);
  }
}

var sachReady = false;

function initSachPage() {
  if (sachReady) return;
  sachReady = true;

  try {
    initPuzzleMount();
    bindPuzzleUnlockPrompts();
    bootSachPage(false);
    initPuzzleTimeline(scrollToPuzzle);

    window.addEventListener("ptra-puzzle-access-changed", function () {
      syncProgressUI();
      mountActiveWeekWithMarkers(null);
    });

    window.addEventListener("resize", function () {
      syncActiveWeekBoards();
    });

    window.addEventListener("pageshow", function (ev) {
      if (ev.persisted) bootSachPage(true);
    });

    var retries = [600, 1500, 3500];
    for (var i = 0; i < retries.length; i++) {
      (function (ms) {
        setTimeout(function () {
          if (!puzzleGridHasContent()) bootSachPage(true);
          else mountActiveWeekWithMarkers(getActivePuzzleWeekIndex());
        }, ms);
      })(retries[i]);
    }
  } catch (err) {
    showPageInitError(err);
  }
}

if (document.readyState === "complete") initSachPage();
else window.addEventListener("load", initSachPage);

export { isDevUnlockAll };
