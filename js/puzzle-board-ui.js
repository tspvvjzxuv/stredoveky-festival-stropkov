import { FESTIVAL_PUZZLES, DIFFICULTY_LABELS } from "./puzzles-data.js";
import {
  PUZZLE_REWARD_META,
  PUZZLE_WEEKS,
  weekRewardId,
  getScheduleEntry,
  formatUnlockDateSk,
} from "./puzzle-schedule.js";
import { isPuzzleAccessUnlocked, getDefaultWeekIndex } from "./puzzle-unlock.js";

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
    '-move-count" class="sach-move-counter" aria-label="Počet vašich ťahov v tejto partii: 0">Ťahy: 0</span>' +
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
    lockHtml +
    '<div class="sach-puzzle-actions">' +
    '<button type="button" class="btn btn-outline sach-reset-btn" data-reset-puzzle="' +
    puzzle.id +
    '"' +
    (playable ? "" : " disabled") +
    ">Reset</button>" +
    "</div>";

  return article;
}

export function renderPuzzleGrid() {
  var grid = document.getElementById("sach-puzzle-grid");
  if (!grid) return;

  grid.innerHTML = "";
  for (var w = 0; w < PUZZLE_WEEKS.length; w++) {
    var week = PUZZLE_WEEKS[w];
    var section = document.createElement("section");
    section.className = "sach-puzzle-week";
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
    grid.appendChild(section);
  }
}

export function setPuzzleWeekVisible(weekIndex) {
  var grid = document.getElementById("sach-puzzle-grid");
  if (!grid) return;
  var sections = grid.querySelectorAll(".sach-puzzle-week");
  for (var s = 0; s < sections.length; s++) {
    var wIdx = parseInt(sections[s].dataset.weekIndex, 10);
    sections[s].classList.toggle("is-week-active", wIdx === weekIndex);
  }
  var target = document.getElementById("sach-week-" + weekIndex);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  grid.dataset.activeWeek = String(weekIndex);
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
  }
}
