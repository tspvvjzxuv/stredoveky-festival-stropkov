var STORAGE_KEY = "ptra-solution-revealed-v1";

function readStore() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

function writeStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {}
}

export function isSolutionRevealed(puzzleId) {
  if (!puzzleId) return false;
  return !!readStore()[puzzleId];
}

export function revealSolution(puzzleId) {
  if (!puzzleId) return false;
  var store = readStore();
  if (store[puzzleId]) return false;
  store[puzzleId] = { revealedAt: new Date().toISOString() };
  writeStore(store);
  return true;
}

function applyRevealedUI(puzzleId) {
  var item = document.querySelector('.sach-visual-item[data-puzzle-id="' + puzzleId + '"]');
  if (!item) return;
  var panel = item.querySelector(".sach-puzzle-solution");
  var btn = item.querySelector('[data-reveal-solution="' + puzzleId + '"]');
  if (panel) panel.hidden = false;
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Riešenie zobrazené";
    btn.setAttribute("aria-pressed", "true");
  }
  item.classList.add("is-solution-revealed");
}

export function syncSolutionRevealUI(puzzleId) {
  if (isSolutionRevealed(puzzleId)) applyRevealedUI(puzzleId);
}

export function bindSolutionRevealButtons(root) {
  var scope = root || document;
  var buttons = scope.querySelectorAll("[data-reveal-solution]");
  for (var i = 0; i < buttons.length; i++) {
    var btn = buttons[i];
    if (btn.dataset.solutionBound === "1") continue;
    btn.dataset.solutionBound = "1";
    var puzzleId = btn.getAttribute("data-reveal-solution");
    if (!puzzleId) continue;
    if (isSolutionRevealed(puzzleId)) {
      applyRevealedUI(puzzleId);
      continue;
    }
    btn.addEventListener("click", function () {
      var id = this.getAttribute("data-reveal-solution");
      if (!id || isSolutionRevealed(id)) return;
      var ok = window.confirm(
        "Zobraziť riešenie tejto úlohy? Ak ho odkryjete pred vyriešením, nezískate žiadne body."
      );
      if (!ok) return;
      revealSolution(id);
      applyRevealedUI(id);
    });
  }
}
