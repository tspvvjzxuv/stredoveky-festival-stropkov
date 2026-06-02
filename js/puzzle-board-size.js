/**
 * Explicitné rozmery pre Chessground — stabilné na PC (bez zmenšovania po načítaní).
 */

var boardSizeCache = typeof WeakMap !== "undefined" ? new WeakMap() : null;

function viewportWidth() {
  if (typeof window === "undefined") return 360;
  if (document.documentElement && document.documentElement.clientWidth > 0) {
    return document.documentElement.clientWidth;
  }
  return window.innerWidth || 360;
}

function isMobileBoardLayout() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(max-width: 900px)").matches;
}

function desktopColumnCount() {
  if (typeof window === "undefined" || !window.matchMedia) return 3;
  if (window.matchMedia("(max-width: 1100px)").matches) return 1;
  return 3;
}

/** Najužší zmysluplný limit šírky dosky v px. */
export function getChessBoardMaxWidth(boardEl) {
  if (!boardEl) return 280;

  if (isMobileBoardLayout()) {
    var pad = 32;
    var cap = Math.floor(viewportWidth() - pad);
    var item = boardEl.closest(".sach-visual-item");
    var card = boardEl.closest(".sach-ulohy-card") || boardEl.closest(".card");
    var itemW = item && item.clientWidth > 20 ? item.clientWidth : 0;
    var cardW = card && card.clientWidth > 20 ? card.clientWidth : 0;
    var base = Math.max(itemW, cardW, 0);
    if (base > 20) return Math.max(200, Math.min(base - 16, cap, 420));
    return Math.max(200, Math.min(cap - 8, 360));
  }

  var item = boardEl.closest(".sach-visual-item");
  if (item && item.clientWidth > 48) {
    return Math.max(200, Math.min(item.clientWidth - 12, 300));
  }

  var row = boardEl.closest(".sach-week-puzzles");
  if (row && row.clientWidth > 48) {
    var cols = desktopColumnCount();
    var gap = cols === 3 ? 22 : 18;
    var colW = Math.floor((row.clientWidth - gap * (cols - 1)) / cols);
    return Math.max(200, Math.min(colW - 12, 300));
  }

  return 280;
}

export function syncChessBoardSize(boardEl, options) {
  if (!boardEl) return 0;
  options = options || {};

  var w = getChessBoardMaxWidth(boardEl);
  if (!options.force && boardSizeCache) {
    var prev = boardSizeCache.get(boardEl);
    if (prev === w) return w;
  }
  if (boardSizeCache) boardSizeCache.set(boardEl, w);

  var host = boardEl.closest(".chessground-host");
  var px = w + "px";

  if (host) {
    host.style.setProperty("--cg-board-size", px);
    if (isMobileBoardLayout()) {
      host.style.width = "100%";
      host.style.maxWidth = px;
      host.style.minHeight = px;
      host.style.display = "flex";
      host.style.justifyContent = "center";
      host.style.alignItems = "flex-start";
    } else {
      host.style.width = "";
      host.style.maxWidth = "100%";
      host.style.minHeight = px;
      host.style.display = "";
      host.style.justifyContent = "";
      host.style.alignItems = "";
    }
    host.style.height = "auto";
  }

  boardEl.style.setProperty("width", px, "important");
  boardEl.style.setProperty("height", px, "important");
  boardEl.style.setProperty("max-width", "100%", "important");
  boardEl.style.setProperty("min-width", px, "important");
  boardEl.style.setProperty("min-height", px, "important");
  boardEl.style.boxSizing = "border-box";
  boardEl.style.flexShrink = "0";

  if (!options.skipRedraw) {
    var ground = boardEl._ptraChessground;
    if (ground && typeof ground.redrawAll === "function") {
      try {
        ground.redrawAll();
      } catch (e) {}
    }
  }

  return w;
}

export function boardHasLayout(boardEl) {
  if (!boardEl) return false;
  syncChessBoardSize(boardEl, { skipRedraw: true });
  var rect = boardEl.getBoundingClientRect();
  if (rect.width <= 20 || rect.height <= 20) return false;
  if (isMobileBoardLayout()) return true;
  return true;
}

export function isMobileBoardLayoutExport() {
  return isMobileBoardLayout();
}

export function presetGridBoardSizes(grid) {
  if (!grid) return;
  var boards = grid.querySelectorAll(".cg-board");
  for (var i = 0; i < boards.length; i++) {
    syncChessBoardSize(boards[i], { skipRedraw: true });
  }
}
