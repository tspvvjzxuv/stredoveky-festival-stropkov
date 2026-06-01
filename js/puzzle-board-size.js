/**
 * Explicitné rozmery pre Chessground (mobil / Safari).
 * Meria sa z úzkeho rodiča (karta úlohy), nie z hosta rozšíreného doskou.
 */

function viewportWidth() {
  if (typeof window === "undefined") return 360;
  if (window.visualViewport && window.visualViewport.width > 0) {
    return window.visualViewport.width;
  }
  if (document.documentElement && document.documentElement.clientWidth > 0) {
    return document.documentElement.clientWidth;
  }
  return window.innerWidth || 360;
}

/** Najužší zmysluplný limit šírky dosky v px. */
export function getChessBoardMaxWidth(boardEl) {
  var pad = 32;
  var cap = Math.floor(viewportWidth() - pad);
  if (!boardEl) return Math.max(200, Math.min(cap, 720));

  if (isMobileBoardLayout()) {
    var item = boardEl.closest(".sach-visual-item");
    var card = boardEl.closest(".sach-ulohy-card") || boardEl.closest(".card");
    var itemW = item && item.clientWidth > 20 ? item.clientWidth : 0;
    var cardW = card && card.clientWidth > 20 ? card.clientWidth : 0;
    var base = Math.max(itemW, cardW, 0);
    if (base > 20) return Math.max(200, Math.min(base - 16, cap, 420));
    return Math.max(200, Math.min(cap - 8, 360));
  }

  var item = boardEl.closest(".sach-visual-item");
  var week = boardEl.closest(".sach-puzzle-week");
  var card = boardEl.closest(".card");
  var grid = document.getElementById("sach-puzzle-grid");
  var candidates = [item, week, card, grid, boardEl.parentElement];
  var best = cap;

  for (var i = 0; i < candidates.length; i++) {
    var el = candidates[i];
    if (!el) continue;
    var cw = el.clientWidth;
    if (cw > 16 && cw < best) best = cw;
  }

  return Math.max(200, Math.min(best - 8, cap, 720));
}

function isMobileBoardLayout() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(max-width: 900px)").matches;
}

export function syncChessBoardSize(boardEl) {
  if (!boardEl) return 0;
  var host = boardEl.closest(".chessground-host");
  var w = getChessBoardMaxWidth(boardEl);
  var px = w + "px";

  if (host) {
    host.style.setProperty("--cg-board-size", px);
    host.style.width = "100%";
    host.style.maxWidth = px;
    host.style.minHeight = px;
    host.style.height = "auto";
    host.style.display = "flex";
    host.style.justifyContent = "center";
    host.style.alignItems = "flex-start";
  }

  boardEl.style.setProperty("width", px, "important");
  boardEl.style.setProperty("height", px, "important");
  boardEl.style.setProperty("max-width", "100%", "important");
  boardEl.style.setProperty("min-width", px, "important");
  boardEl.style.setProperty("min-height", px, "important");
  boardEl.style.boxSizing = "border-box";
  boardEl.style.flexShrink = "0";

  var ground = boardEl._ptraChessground;
  if (ground && typeof ground.redrawAll === "function") {
    requestAnimationFrame(function () {
      try {
        ground.redrawAll();
      } catch (e) {}
    });
  }

  return w;
}

export function boardHasLayout(boardEl) {
  if (!boardEl) return false;
  syncChessBoardSize(boardEl);
  var rect = boardEl.getBoundingClientRect();
  if (rect.width <= 20 || rect.height <= 20) return false;
  if (isMobileBoardLayout()) return true;
  var maxW = getChessBoardMaxWidth(boardEl) + 4;
  return rect.width <= maxW;
}
