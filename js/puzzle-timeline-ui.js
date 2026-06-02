import { PUZZLE_WEEKS, FESTIVAL_DATE, formatUnlockDateSk } from "./puzzle-schedule.js";
import { DIFFICULTY_LABELS } from "./puzzles-data.js";
import {
  isPuzzleAccessUnlocked,
  isDevUnlockAll,
  getDefaultWeekIndex,
} from "./puzzle-unlock.js";
import { isPuzzleRewardUnlocked, getWeekSolveProgress } from "./puzzle-rewards.js";
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

function weekIndexToArrayIndex(weekIndex) {
  for (var i = 0; i < PUZZLE_WEEKS.length; i++) {
    if (PUZZLE_WEEKS[i].weekIndex === weekIndex) return i;
  }
  return 0;
}

export function initPuzzleTimeline(onSelectPuzzle) {
  var root = document.getElementById("sach-puzzle-timeline");
  if (!root || !PUZZLE_WEEKS.length) return null;

  var track = document.getElementById("sach-puzzle-timeline-track");
  var label = document.getElementById("sach-puzzle-timeline-label");
  var devNote = document.getElementById("sach-puzzle-timeline-dev");
  if (!track) return null;

  var activeIndex = getDefaultWeekIndex();

  track.innerHTML = "";
  track.removeAttribute("aria-hidden");

  for (var i = 0; i < PUZZLE_WEEKS.length; i++) {
    var week = PUZZLE_WEEKS[i];
    var group = document.createElement("div");
    group.className = "sach-timeline__week-group";
    group.dataset.weekIndex = String(i);

    var head = document.createElement("button");
    head.type = "button";
    head.className = "sach-timeline__week-head";
    head.setAttribute("role", "tab");
    head.setAttribute("aria-selected", "false");
    var unlocked = weekFullyUnlocked(week);
    head.classList.toggle("is-unlocked", unlocked);
    head.classList.toggle("is-locked", !unlocked);
    head.innerHTML =
      '<span class="sach-timeline__marker-week">T' +
      week.weekIndex +
      "</span>" +
      '<span class="sach-timeline__marker-progress" hidden></span>' +
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
      slotBtn.tabIndex = -1;
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

  function updateWeekHeadProgress(head, week) {
    if (!head || !week) return;
    var progEl = head.querySelector(".sach-timeline__marker-progress");
    if (!progEl) return;

    var prog = getWeekSolveProgress(week.weekIndex);
    var open = weekFullyUnlocked(week);

    if (prog.solved > 0 || open) {
      progEl.textContent = prog.solved + "/" + prog.total;
      progEl.hidden = false;
    } else {
      progEl.textContent = "";
      progEl.hidden = true;
    }

    head.classList.toggle("is-week-complete", prog.solved >= prog.total && prog.total > 0);
    head.classList.toggle("is-week-partial", prog.solved > 0 && prog.solved < prog.total);

    var ariaBits = ["Týždeň " + week.weekIndex];
    if (prog.solved > 0) ariaBits.push(prog.solved + " z " + prog.total + " úloh splnených");
    if (!open) ariaBits.push("odomkne sa " + formatUnlockDateSk(week.unlockDate));
    head.setAttribute("aria-label", ariaBits.join(", "));
  }

  function syncTimelineUI(idx) {
    var week = PUZZLE_WEEKS[idx];
    if (!week) return;
    var unlocked = weekFullyUnlocked(week);
    var groups = track.querySelectorAll(".sach-timeline__week-group");
    for (var m = 0; m < groups.length; m++) {
      var gIdx = parseInt(groups[m].dataset.weekIndex, 10);
      var isActive = gIdx === idx;
      groups[m].classList.toggle("is-active", isActive);
      var headEl = groups[m].querySelector(".sach-timeline__week-head");
      if (headEl) headEl.setAttribute("aria-selected", isActive ? "true" : "false");
      if (headEl && PUZZLE_WEEKS[gIdx]) updateWeekHeadProgress(headEl, PUZZLE_WEEKS[gIdx]);
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
    activeIndex = idx;
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
      if (!week) continue;
      var open = weekFullyUnlocked(week);
      var head = groups[g].querySelector(".sach-timeline__week-head");
      if (head) {
        head.classList.toggle("is-unlocked", open);
        head.classList.toggle("is-locked", !open);
        updateWeekHeadProgress(head, week);
      }
      var slots = groups[g].querySelectorAll(".sach-timeline__slot");
      for (var s = 0; s < slots.length; s++) {
        var pid = slots[s].dataset.puzzleId;
        slots[s].classList.toggle("is-unlocked", isPuzzleAccessUnlocked(pid));
        slots[s].classList.toggle("is-locked", !isPuzzleAccessUnlocked(pid));
        slots[s].classList.toggle("is-solved", isPuzzleRewardUnlocked(pid));
      }
    }
    syncTimelineUI(activeIndex);
  }

  function selectWeekNumber(weekIndex) {
    updateFromIndex(weekIndexToArrayIndex(weekIndex), null);
  }

  updateFromIndex(activeIndex, null);

  if (devNote) {
    devNote.hidden = !isDevUnlockAll();
    devNote.textContent = isDevUnlockAll()
      ? "Režim prehliadky: všetky úlohy odomknuté (FORCE_UNLOCK_ALL_FOR_REVIEW, ?unlockAll=1 alebo localStorage ptra_sach_unlock_all=true)."
      : "";
  }

  window.addEventListener("ptra-puzzle-access-changed", refreshMarkers);
  window.addEventListener("ptra-puzzle-solved", refreshMarkers);
  window.addEventListener("ptra-timeline-refresh", refreshMarkers);
  window.addEventListener("ptra-timeline-go-week", function (ev) {
    var weekIndex = ev.detail && ev.detail.weekIndex;
    if (typeof weekIndex === "number") selectWeekNumber(weekIndex);
  });

  return { refresh: refreshMarkers, selectWeekNumber: selectWeekNumber };
}
