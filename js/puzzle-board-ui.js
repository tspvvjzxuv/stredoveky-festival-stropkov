import { FESTIVAL_PUZZLES, DIFFICULTY_LABELS } from "./puzzles-data.js";
import {
  PUZZLE_REWARD_META,
  PUZZLE_WEEKS,
  weekRewardId,
  getScheduleEntry,
  getWeekSchedule,
  formatUnlockDateSk,
} from "./puzzle-schedule.js";
import { isPuzzleAccessUnlocked, getDefaultWeekIndex } from "./puzzle-unlock.js";
import { bindSolutionRevealButtons } from "./puzzle-solution-ui.js";

export function puzzleGridHasContent() {
  var grid = document.getElementById("sach-puzzle-grid");
  return !!(grid && grid.querySelector(".sach-visual-item"));
}

export function renderInvesticiaGrid() {
  var grid = document.getElementById("sach-investicia-grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (var w = 1; w <= 12; w++) {
    var key = weekRewardId(w);
    var meta = PUZZLE_REWARD_META[key];
    if (!meta) continue;
    var article = document.createElement("article");
    article.className = "sach-investicia__part";
    article.setAttribute("data-reward-part", key);
    article.innerHTML =
      '<p class="sach-investicia__lock" aria-hidden="false">🔒</p>' +
      '<div class="sach-investicia__body" hidden>' +
      '<span class="sach-investicia__icon" aria-hidden="true">' +
      meta.icon +
      "</span>" +
      "<h3>" +
      meta.partLabel +
      " — " +
      meta.title +
      "</h3>" +
      "<p>" +
      meta.text +
      "</p>" +
      '<p class="sach-investicia__clue"><span>Časť hesla:</span> <strong>' +
      meta.clue +
      "</strong></p>" +
      "</div>";
    grid.appendChild(article);
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function difficultyBadge(difficulty) {
  var label = DIFFICULTY_LABELS[difficulty] || difficulty;
  var cls = "sach-difficulty sach-difficulty--" + difficulty;
  return '<span class="' + cls + '">' + label + "</span>";
}

function renderPuzzleCard(puzzle) {
  var schedule = getScheduleEntry(puzzle.id);
  var playable = isPuzzleAccessUnlocked(puzzle.id);
  var article = document.createElement("article");
  article.className = "sach-visual-item";
  article.dataset.puzzleId = puzzle.id;
  article.dataset.weekIndex = String(puzzle.weekIndex);
  article.dataset.difficulty = puzzle.difficulty;
  if (!playable) article.classList.add("is-schedule-locked");

  var lockHtml = "";
  if (!playable && schedule) {
    lockHtml =
      '<div class="sach-puzzle-lock" role="status">' +
      "<p><strong>🔒 Úloha je zamknutá</strong></p>" +
      "<p>Odomkne sa s týždňom <time datetime=\"" +
      schedule.unlockDate +
      "\">" +
      formatUnlockDateSk(schedule.unlockDate) +
      "</time>.</p>" +
      '<button type="button" class="btn btn-outline" data-unlock-puzzle="' +
      puzzle.id +
      '">Mám heslo</button>' +
      "</div>";
  }

  article.innerHTML =
    "<h4 id=\"" +
    puzzle.id +
    '-title" class="sach-puzzle-heading">' +
    '<span class="sach-puzzle-heading__main">' +
    difficultyBadge(puzzle.difficulty) +
    " " +
    (puzzle.title || "Úloha") +
    "</span>" +
    '<span class="sach-puzzle-stats">' +
    '<span id="' +
    puzzle.id +
    '-attempt-count" class="sach-move-counter sach-attempt-counter" aria-label="Počet neúspešných pokusov: 0">Pokusy: 0</span>' +
    '<span id="' +
    puzzle.id +
    '-move-count" class="sach-move-counter" aria-label="Vaše ťahy: 0">Ťahy: 0</span>' +
    "</span>" +
    "</h4>" +
    '<div class="chessground-host">' +
    '<div id="' +
    puzzle.id +
    '" class="cg-board" aria-label="' +
    (puzzle.ariaLabel || puzzle.title || "Šachový hlavolam") +
    '"></div>' +
    "</div>" +
    '<p id="' +
    puzzle.id +
    '-subtitle">' +
    (puzzle.subtitle || "") +
    "</p>" +
    '<div id="' +
    puzzle.id +
    '-solution" class="sach-puzzle-solution" hidden>' +
    '<p class="sach-puzzle-solution__text"><strong>Riešenie:</strong> ' +
    escapeHtml(puzzle.solution || "—") +
    "</p>" +
    '<p class="note sach-puzzle-solution__warn">Riešenie bolo zobrazené — za túto úlohu nezískate body.</p>' +
    "</div>" +
    lockHtml +
    '<div class="sach-puzzle-actions">' +
    '<button type="button" class="btn btn-outline sach-solution-btn" data-reveal-solution="' +
    puzzle.id +
    '"' +
    (playable ? "" : " disabled") +
    ">Zobraziť riešenie</button>" +
    '<button type="button" class="btn btn-outline sach-reset-btn" data-reset-puzzle="' +
    puzzle.id +
    '"' +
    (playable ? "" : " disabled") +
    ">Reset</button>" +
    "</div>";

  return article;
}

function buildWeekSection(week) {
  var section = document.createElement("section");
  section.className = "sach-puzzle-week is-week-active";
  section.dataset.weekIndex = String(week.weekIndex);
  section.id = "sach-week-" + week.weekIndex;

  var weekPlayable = isPuzzleAccessUnlocked(week.puzzleIds[0]);
  section.innerHTML =
    "<h3 class=\"sach-puzzle-week__title\">Týždeň " +
    week.weekIndex +
    " — " +
    week.theme.title +
    "</h3>" +
    '<p class="sach-puzzle-week__meta note">' +
    (weekPlayable
      ? "Odomknuté · " + week.theme.tagline
      : "Odomkne sa " + formatUnlockDateSk(week.unlockDate) + " · " + week.theme.tagline) +
    "</p>";

  var row = document.createElement("div");
  row.className = "sach-week-puzzles";

  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    if (FESTIVAL_PUZZLES[i].weekIndex !== week.weekIndex) continue;
    row.appendChild(renderPuzzleCard(FESTIVAL_PUZZLES[i]));
  }

  section.appendChild(row);
  return section;
}

function notifyGridRebuilt() {
  window.dispatchEvent(new CustomEvent("ptra-puzzle-grid-rebuilt"));
}

function findWeekMeta(weekIndex) {
  return getWeekSchedule(weekIndex) || PUZZLE_WEEKS[0] || null;
}

function renderActiveWeek(grid, weekIndex) {
  var week = findWeekMeta(weekIndex);
  if (!week) return false;
  var section = buildWeekSection(week);
  notifyGridRebuilt();
  grid.innerHTML = "";
  grid.appendChild(section);
  bindSolutionRevealButtons(section);
  return true;
}

function emitPuzzleWeekVisible(weekIndex) {
  window.dispatchEvent(
    new CustomEvent("ptra-puzzle-week-visible", { detail: { weekIndex: weekIndex } })
  );
}

function syncTimelineSliderToWeek(weekIndex) {
  window.dispatchEvent(
    new CustomEvent("ptra-timeline-go-week", { detail: { weekIndex: weekIndex } })
  );
}

export function renderPuzzleGrid() {
  var grid = document.getElementById("sach-puzzle-grid");
  if (!grid) return false;

  var initialWeek = PUZZLE_WEEKS[getDefaultWeekIndex()];
  var weekNum = initialWeek ? initialWeek.weekIndex : 1;

  if (!renderActiveWeek(grid, weekNum)) return false;
  grid.dataset.activeWeek = String(weekNum);
  syncTimelineSliderToWeek(weekNum);
  emitPuzzleWeekVisible(weekNum);
  return puzzleGridHasContent();
}

export function setPuzzleWeekVisible(weekIndex, options) {
  var grid = document.getElementById("sach-puzzle-grid");
  if (!grid) return;

  weekIndex = parseInt(weekIndex, 10);
  if (isNaN(weekIndex) || weekIndex < 1) weekIndex = 1;

  if (!renderActiveWeek(grid, weekIndex)) return;

  grid.dataset.activeWeek = String(weekIndex);
  syncTimelineSliderToWeek(weekIndex);
  emitPuzzleWeekVisible(weekIndex);

  var scroll = options && options.scroll === true;
  if (scroll) {
    var target = document.getElementById("sach-week-" + weekIndex);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

export function getActivePuzzleWeekIndex() {
  var grid = document.getElementById("sach-puzzle-grid");
  if (!grid || !grid.dataset.activeWeek) return null;
  var n = parseInt(grid.dataset.activeWeek, 10);
  return isNaN(n) ? null : n;
}

export function isPuzzleBoardInActiveView(boardEl) {
  return !!boardEl;
}

export function applyPuzzleAccessUI() {
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var puzzle = FESTIVAL_PUZZLES[i];
    var playable = isPuzzleAccessUnlocked(puzzle.id);
    var item = document.querySelector('.sach-visual-item[data-puzzle-id="' + puzzle.id + '"]');
    var board = document.getElementById(puzzle.id);
    if (!item) continue;
    item.classList.toggle("is-schedule-locked", !playable);
    var lock = item.querySelector(".sach-puzzle-lock");
    if (playable && lock) lock.remove();
    if (board) {
      board.classList.toggle("cg-board--locked", !playable);
      board.setAttribute("aria-hidden", playable ? "false" : "true");
    }
    var resetBtn = item.querySelector('[data-reset-puzzle="' + puzzle.id + '"]');
    if (resetBtn) resetBtn.disabled = !playable;
    var solutionBtn = item.querySelector('[data-reveal-solution="' + puzzle.id + '"]');
    if (solutionBtn) solutionBtn.disabled = !playable;
  }
}

var boardSizeCache = typeof WeakMap !== "undefined" ? new WeakMap() : null;

function viewportWidth() {
  if (typeof window === "undefined") return 360;
  if (document.documentElement && document.documentElement.clientWidth > 0) {
    return document.documentElement.clientWidth;
  }
  return window.innerWidth || 360;
}

function desktopColumnCount() {
  if (typeof window === "undefined" || !window.matchMedia) return 3;
  if (window.matchMedia("(max-width: 1100px)").matches) return 1;
  return 3;
}

function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
}

function isMobilePuzzleLayout() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 1100px)").matches
  );
}

export function getChessBoardMaxWidth(boardEl) {
  if (!boardEl) return 280;

  var cap = Math.max(200, Math.floor(viewportWidth() - 32));
  var item = boardEl.closest(".sach-visual-item");
  if (item && item.clientWidth > 48) {
    var styles = typeof getComputedStyle !== "undefined" ? getComputedStyle(item) : null;
    var pad =
      (styles ? parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight) : 0) || 24;
    var border =
      (styles ? parseFloat(styles.borderLeftWidth) + parseFloat(styles.borderRightWidth) : 0) || 2;
    var inset = isMobilePuzzleLayout() ? pad + border : 12;
    return Math.max(200, Math.min(Math.floor(item.clientWidth - inset), cap, 300));
  }

  var row = boardEl.closest(".sach-week-puzzles");
  if (row && row.clientWidth > 48) {
    var cols = desktopColumnCount();
    var gap = cols === 3 ? 22 : 18;
    var colW = Math.floor((row.clientWidth - gap * (cols - 1)) / cols);
    return Math.max(200, Math.min(colW - 12, cap, 300));
  }

  return Math.max(200, Math.min(cap, 280));
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

  var mobileLayout = isMobilePuzzleLayout();

  if (host) {
    host.style.setProperty("--cg-board-size", px);
    host.style.maxWidth = "100%";
    host.style.marginLeft = "0";
    host.style.marginRight = "0";

    if (mobileLayout) {
      host.style.width = "100%";
      host.style.minHeight = "0";
      host.style.height = "auto";
      host.style.padding = "0";
      host.style.border = "none";
      host.style.background = "none";
      host.style.display = "block";
      host.style.removeProperty("place-items");
      host.style.removeProperty("justify-content");
      host.style.removeProperty("align-items");
    } else {
      host.style.width = "fit-content";
      host.style.minHeight = px;
      host.style.height = "auto";
      host.style.display = "flex";
      host.style.justifyContent = "center";
      host.style.alignItems = "flex-start";
      host.style.removeProperty("padding");
      host.style.removeProperty("border");
      host.style.removeProperty("background");
    }
  }

  boardEl.style.setProperty("width", mobileLayout ? "100%" : px, "important");
  boardEl.style.setProperty("height", px, "important");
  boardEl.style.setProperty("max-width", "100%", "important");
  boardEl.style.setProperty("min-height", px, "important");
  boardEl.style.setProperty("min-width", "0", "important");
  boardEl.style.setProperty("margin-left", "0", "important");
  boardEl.style.setProperty("margin-right", "0", "important");
  boardEl.style.boxSizing = mobileLayout ? "border-box" : "content-box";
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
  if (boardEl.offsetWidth > 20 && boardEl.offsetHeight > 20) return true;
  var rect = boardEl.getBoundingClientRect();
  return rect.width > 20 && rect.height > 20;
}

export function presetGridBoardSizes(grid) {
  if (!grid) return;
  var boards = grid.querySelectorAll(".cg-board");
  for (var i = 0; i < boards.length; i++) {
    syncChessBoardSize(boards[i], { skipRedraw: true });
  }
}
