import { PUZZLE_WEEKS, FESTIVAL_DATE, formatUnlockDateSk } from "./puzzle-schedule.js";
import { DIFFICULTY_LABELS } from "./puzzles-data.js";
import {
  isPuzzleAccessUnlocked,
  isDevUnlockAll,
  tryUnlockWithPassword,
  getDefaultWeekIndex,
} from "./puzzle-unlock.js";
import { isPuzzleRewardUnlocked } from "./puzzle-rewards.js";
import { setPuzzleWeekVisible } from "./puzzle-board-ui.js";

function formatFestivalLabel() {
  return formatUnlockDateSk(FESTIVAL_DATE);
}

function weekFullyUnlocked(week) {
  for (var i = 0; i < week.puzzleIds.length; i++) {
    if (!isPuzzleAccessUnlocked(week.puzzleIds[i])) return false;
  }
  return true;
}

export function initPuzzleTimeline(onSelectPuzzle) {
  var root = document.getElementById("sach-puzzle-timeline");
  if (!root || !PUZZLE_WEEKS.length) return;

  var slider = document.getElementById("sach-puzzle-timeline-range");
  var track = document.getElementById("sach-puzzle-timeline-track");
  var label = document.getElementById("sach-puzzle-timeline-label");
  var devNote = document.getElementById("sach-puzzle-timeline-dev");
  if (!slider || !track) return;

  slider.min = "0";
  slider.max = String(PUZZLE_WEEKS.length - 1);
  slider.step = "1";

  track.innerHTML = "";
  for (var i = 0; i < PUZZLE_WEEKS.length; i++) {
    var week = PUZZLE_WEEKS[i];
    var group = document.createElement("div");
    group.className = "sach-timeline__week-group";
    group.dataset.weekIndex = String(i);

    var head = document.createElement("button");
    head.type = "button";
    head.className = "sach-timeline__week-head";
    var unlocked = weekFullyUnlocked(week);
    head.classList.toggle("is-unlocked", unlocked);
    head.classList.toggle("is-locked", !unlocked);
    head.innerHTML =
      '<span class="sach-timeline__marker-week">T' +
      week.weekIndex +
      "</span>" +
      '<span class="sach-timeline__marker-date">' +
      formatUnlockDateSk(week.unlockDate) +
      "</span>";
    head.setAttribute(
      "aria-label",
      unlocked
        ? "Týždeň " + week.weekIndex + ", odomknuté"
        : "Týždeň " + week.weekIndex + ", odomkne sa " + formatUnlockDateSk(week.unlockDate)
    );
    head.addEventListener("click", function () {
      var idx = parseInt(this.closest(".sach-timeline__week-group").dataset.weekIndex, 10);
      slider.value = String(idx);
      updateFromIndex(idx, null);
    });
    group.appendChild(head);

    var slots = document.createElement("div");
    slots.className = "sach-timeline__slots";
    for (var s = 0; s < week.puzzleIds.length; s++) {
      var pid = week.puzzleIds[s];
      var diff = pid.split("-").pop();
      var slotBtn = document.createElement("button");
      slotBtn.type = "button";
      slotBtn.className = "sach-timeline__slot";
      slotBtn.dataset.puzzleId = pid;
      slotBtn.dataset.weekIndex = String(i);
      var slotOpen = isPuzzleAccessUnlocked(pid);
      var slotDone = isPuzzleRewardUnlocked(pid);
      slotBtn.classList.toggle("is-unlocked", slotOpen);
      slotBtn.classList.toggle("is-locked", !slotOpen);
      slotBtn.classList.toggle("is-solved", slotDone);
      var diffShort = diff === "easy" ? "Ľ" : diff === "medium" ? "S" : "T";
      slotBtn.textContent = diffShort;
      slotBtn.title = DIFFICULTY_LABELS[diff] || diff;
      slotBtn.setAttribute("aria-label", (DIFFICULTY_LABELS[diff] || diff) + ", týždeň " + week.weekIndex);
      slotBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var wIdx = parseInt(this.dataset.weekIndex, 10);
        var puzzleId = this.dataset.puzzleId;
        slider.value = String(wIdx);
        updateFromIndex(wIdx, puzzleId);
        if (typeof onSelectPuzzle === "function") onSelectPuzzle(puzzleId);
      });
      slots.appendChild(slotBtn);
    }
    group.appendChild(slots);
    track.appendChild(group);
  }

  var festivalEl = document.createElement("span");
  festivalEl.className = "sach-timeline__festival";
  festivalEl.textContent = "Festival " + formatFestivalLabel();
  track.appendChild(festivalEl);

  function syncTimelineUI(idx) {
    var week = PUZZLE_WEEKS[idx];
    if (!week) return;
    var unlocked = weekFullyUnlocked(week);
    var groups = track.querySelectorAll(".sach-timeline__week-group");
    for (var m = 0; m < groups.length; m++) {
      groups[m].classList.toggle("is-active", parseInt(groups[m].dataset.weekIndex, 10) === idx);
    }
    if (label) {
      label.textContent = unlocked
        ? "Týždeň " +
          week.weekIndex +
          " · " +
          week.theme.title +
          " (3 úlohy, " +
          formatUnlockDateSk(week.unlockDate) +
          ")"
        : "Týždeň " +
          week.weekIndex +
          " · odomkne sa " +
          formatUnlockDateSk(week.unlockDate) +
          " — " +
          week.theme.title;
    }
  }

  function updateFromIndex(idx, focusPuzzleId) {
    var week = PUZZLE_WEEKS[idx];
    if (!week) return;
    syncTimelineUI(idx);
    setPuzzleWeekVisible(week.weekIndex, { scroll: true });
    var targetId = focusPuzzleId || week.puzzleIds[0];
    if (typeof onSelectPuzzle === "function") onSelectPuzzle(targetId);
  }

  function refreshMarkers() {
    var groups = track.querySelectorAll(".sach-timeline__week-group");
    for (var g = 0; g < groups.length; g++) {
      var wIdx = parseInt(groups[g].dataset.weekIndex, 10);
      var week = PUZZLE_WEEKS[wIdx];
      var open = weekFullyUnlocked(week);
      var head = groups[g].querySelector(".sach-timeline__week-head");
      if (head) {
        head.classList.toggle("is-unlocked", open);
        head.classList.toggle("is-locked", !open);
      }
      var slots = groups[g].querySelectorAll(".sach-timeline__slot");
      for (var s = 0; s < slots.length; s++) {
        var pid = slots[s].dataset.puzzleId;
        slots[s].classList.toggle("is-unlocked", isPuzzleAccessUnlocked(pid));
        slots[s].classList.toggle("is-locked", !isPuzzleAccessUnlocked(pid));
        slots[s].classList.toggle("is-solved", isPuzzleRewardUnlocked(pid));
      }
    }
    syncTimelineUI(parseInt(slider.value, 10) || 0);
  }

  slider.addEventListener("input", function () {
    updateFromIndex(parseInt(slider.value, 10) || 0, null);
  });

  var currentIdx = getDefaultWeekIndex();
  slider.value = String(currentIdx);
  updateFromIndex(currentIdx, null);

  if (devNote) {
    devNote.hidden = !isDevUnlockAll();
    devNote.textContent = isDevUnlockAll()
      ? "Režim prehliadky: všetky úlohy odomknuté (FORCE_UNLOCK_ALL_FOR_REVIEW, ?unlockAll=1 alebo localStorage ptra_sach_unlock_all=true)."
      : "";
  }

  window.addEventListener("ptra-puzzle-access-changed", refreshMarkers);
  window.addEventListener("ptra-puzzle-solved", refreshMarkers);

  return { refresh: refreshMarkers };
}
