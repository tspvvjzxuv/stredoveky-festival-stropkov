export function createWrongMoveOverlay(boardEl) {
  var host = boardEl.closest(".chessground-host") || boardEl.parentElement;
  if (!host) host = boardEl;
  if (getComputedStyle(host).position === "static") {
    host.style.position = "relative";
  }

  var overlay = host.querySelector(".sach-wrong-move-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "sach-wrong-move-overlay";
    overlay.hidden = true;
    overlay.setAttribute("role", "group");
    overlay.setAttribute("aria-label", "Možnosti po chybnom ťahu");

    var retryBtn = document.createElement("button");
    retryBtn.type = "button";
    retryBtn.className = "btn btn-primary sach-wrong-move-btn";
    retryBtn.textContent = "Skúsiť znova";

    var backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "btn btn-outline sach-wrong-move-btn";
    backBtn.textContent = "Krok späť";

    overlay.appendChild(retryBtn);
    overlay.appendChild(backBtn);
    host.appendChild(overlay);
  }

  var toast = host.querySelector(".sach-wrong-move-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "sach-wrong-move-toast";
    toast.hidden = true;
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    host.appendChild(toast);
  }

  var retryBtn = overlay.querySelector(".btn-primary");
  var backBtn = overlay.querySelector(".btn-outline");
  var onRetry = null;
  var onStepBack = null;
  var toastTimer = null;

  retryBtn.addEventListener("click", function () {
    if (onRetry) onRetry();
    overlay.hidden = true;
  });

  backBtn.addEventListener("click", function () {
    if (onStepBack) onStepBack();
    overlay.hidden = true;
  });

  return {
    show: function (options) {
      onRetry = options && options.onRetry ? options.onRetry : null;
      onStepBack = options && options.onStepBack ? options.onStepBack : null;
      var showBack = !(options && options.showStepBack === false);
      backBtn.hidden = !showBack;
      overlay.hidden = false;
    },
    hide: function () {
      overlay.hidden = true;
      overlay.classList.remove("is-game-over");
      onRetry = null;
      onStepBack = null;
    },
    showBriefFeedback: function (message, durationMs) {
      if (!message) return;
      toast.textContent = message;
      toast.hidden = false;
      toast.classList.add("is-visible");
      if (toastTimer) window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        toast.hidden = true;
        toast.classList.remove("is-visible");
        toastTimer = null;
      }, durationMs || 2800);
    },
    hideBriefFeedback: function () {
      if (toastTimer) {
        window.clearTimeout(toastTimer);
        toastTimer = null;
      }
      toast.hidden = true;
      toast.classList.remove("is-visible");
    },
    showGameOver: function (options) {
      var msg =
        (options && options.message) ||
        "Game over — prekročili ste limit ťahov.";
      onRetry = options && options.onReset ? options.onReset : null;
      onStepBack = null;
      backBtn.hidden = true;
      retryBtn.textContent = "Nová partia";
      overlay.classList.add("is-game-over");
      overlay.hidden = false;
      if (!overlay.querySelector(".sach-game-over-msg")) {
        var p = document.createElement("p");
        p.className = "sach-game-over-msg";
        overlay.insertBefore(p, overlay.firstChild);
      }
      overlay.querySelector(".sach-game-over-msg").textContent = msg;
    },
    hideGameOver: function () {
      overlay.classList.remove("is-game-over");
      retryBtn.textContent = "Skúsiť znova";
      var msgEl = overlay.querySelector(".sach-game-over-msg");
      if (msgEl) msgEl.remove();
    },
  };
}
