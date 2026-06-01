/**
 * Explicitné rozmery pre Chessground (mobil / Safari bez spoľahlivého aspect-ratio).
 */

export function syncChessBoardSize(boardEl) {
  if (!boardEl) return 0;
  var host = boardEl.closest(".chessground-host");
  var measureEl = host || boardEl;
  var w = measureEl.clientWidth || measureEl.offsetWidth;
  if (!w || w < 16) {
    var vw =
      (typeof window !== "undefined" &&
        window.visualViewport &&
        window.visualViewport.width) ||
      (typeof window !== "undefined" && window.innerWidth) ||
      360;
    w = vw - 28;
  }
  w = Math.floor(Math.max(200, Math.min(w, 720)));
  var px = w + "px";
  if (host) {
    host.style.setProperty("--cg-board-size", px);
    host.style.width = "100%";
    host.style.maxWidth = "100%";
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
  return rect.width > 20 && rect.height > 20;
}
