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
  var pad = 28;
  var cap = Math.floor(viewportWidth() - pad);
  if (!boardEl) return Math.max(200, Math.min(cap, 720));

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
    host.style.maxWidth = "100%";
    host.style.minHeight = px;
  }
  boardEl.style.width = px;
  boardEl.style.height = px;
  boardEl.style.maxWidth = "100%";
  boardEl.style.boxSizing = "border-box";
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
