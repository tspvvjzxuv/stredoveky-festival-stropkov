/**
 * Týždenný harmonogram: každý pondelok 3 hlavolamy (ľahšia / stredná / najťažšia).
 */

import {
  FESTIVAL_PUZZLES,
  WEEK_COUNT,
  DIFFICULTIES,
  WEEK_THEMES,
  puzzleId,
} from "./puzzles-data.js";

export const FESTIVAL_DATE = "2026-08-16";
export const SCHEDULE_TIMEZONE = "Europe/Bratislava";

/** true len pri ladení — na webe nechajte false. */
export const FORCE_UNLOCK_ALL_FOR_REVIEW = true;

export const SCHEDULE_START = "2026-05-26";

/** Heslo na skorý prístup — jedno na celý týždeň (odomkne všetky 3 úlohy). */
export const WEEK_UNLOCK_PASSWORDS = [
  "BRANA-POD-VLEKOM",
  "RYTIER-ANDREAS",
  "STREDOVEKY-FESTIVAL",
  "PASOVANIE-RYTIEROV",
  "LUKOSTRELBA-2026",
  "TABOROVA-OPEKACKA",
  "DRAK-POD-VLEKOM",
  "SPARTA-STROPKOV",
  "SACHOVA-BITKA",
  "HLAVOLAM-TYZDNA",
  "INVESTICIA-RYTIERA",
  "SEDEMNASTEHO-AUGUSTA",
];

/** Per-puzzle heslo (voliteľné skoré odomknutie jednej úlohy). */
export const PUZZLE_UNLOCK_PASSWORDS = {
  easy: [
    "BRANA-LAHKA",
    "ANDREAS-LAHKA",
    "FESTIVAL-LAHKA",
    "PASOVANIE-LAHKA",
    "LUK-LAHKA",
    "OHE-LAHKA",
    "DRAK-LAHKA",
    "SPARTA-LAHKA",
    "BITKA-LAHKA",
    "KRONIKA-LAHKA",
    "INVEST-LAHKA",
    "KORUNA-LAHKA",
  ],
  medium: [
    "BRANA-STREDNA",
    "ANDREAS-STREDNA",
    "FESTIVAL-STREDNA",
    "PASOVANIE-STREDNA",
    "LUK-STREDNA",
    "OHE-STREDNA",
    "DRAK-STREDNA",
    "SPARTA-STREDNA",
    "BITKA-STREDNA",
    "KRONIKA-STREDNA",
    "INVEST-STREDNA",
    "KORUNA-STREDNA",
  ],
  hard: [
    "BRANA-TAZKA",
    "ANDREAS-TAZKA",
    "FESTIVAL-TAZKA",
    "PASOVANIE-TAZKA",
    "LUK-TAZKA",
    "OHE-TAZKA",
    "DRAK-TAZKA",
    "SPARTA-TAZKA",
    "BITKA-TAZKA",
    "KRONIKA-TAZKA",
    "INVEST-TAZKA",
    "KORUNA-TAZKA",
  ],
};

function addDays(isoDate, days) {
  var parts = isoDate.split("-");
  var dt = new Date(Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
  dt.setUTCDate(dt.getUTCDate() + days);
  var y = dt.getUTCFullYear();
  var m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  var d = String(dt.getUTCDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function weekUnlockDate(weekIndex) {
  return addDays(SCHEDULE_START, (weekIndex - 1) * 7);
}

export var PUZZLE_WEEKS = [];
for (var w = 1; w <= WEEK_COUNT; w++) {
  PUZZLE_WEEKS.push({
    weekIndex: w,
    unlockDate: weekUnlockDate(w),
    theme: WEEK_THEMES[w - 1],
    weekPassword: WEEK_UNLOCK_PASSWORDS[w - 1],
    puzzleIds: DIFFICULTIES.map(function (diff) {
      return puzzleId(w, diff);
    }),
  });
}

export var PUZZLE_SCHEDULE = [];
for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
  var p = FESTIVAL_PUZZLES[i];
  var week = p.weekIndex;
  var diffIdx = DIFFICULTIES.indexOf(p.difficulty);
  PUZZLE_SCHEDULE.push({
    id: p.id,
    weekIndex: week,
    difficulty: p.difficulty,
    unlockDate: weekUnlockDate(week),
    unlockPassword: PUZZLE_UNLOCK_PASSWORDS[p.difficulty][week - 1],
    weekPassword: WEEK_UNLOCK_PASSWORDS[week - 1],
  });
}

export const PUZZLE_REWARD_META = {
  "week-1": {
    partLabel: "Pečať I",
    icon: "🪙",
    title: "Rytierska minca",
    text: "Prvá pečať pokladu — symbol pre kód na festivale.",
    clue: "P",
    cluePartial: "P",
  },
  "week-2": {
    partLabel: "Pečať II",
    icon: "📜",
    title: "Listina rytiera",
    text: "Druhý symbol v rytierskom kóde.",
    clue: "T",
    cluePartial: "T",
  },
  "week-3": {
    partLabel: "Pečať III",
    icon: "⚔️",
    title: "Meč taktika",
    text: "Tretia časť tajomstva.",
    clue: "R",
    cluePartial: "R",
  },
  "week-4": {
    partLabel: "Pečať IV",
    icon: "🏰",
    title: "Veža strážca",
    text: "Štvrtá pečať pokladu.",
    clue: "A",
    cluePartial: "A",
  },
  "week-5": {
    partLabel: "Pečať V",
    icon: "🎯",
    title: "Terč lukostrelca",
    text: "Piata časť hesla.",
    clue: "–",
    cluePartial: "–",
  },
  "week-6": {
    partLabel: "Pečať VI",
    icon: "🔥",
    title: "Táborák pod hviezdami",
    text: "Šiesta pečať pokladu.",
    clue: "R",
    cluePartial: "R",
  },
  "week-7": {
    partLabel: "Pečať VII",
    icon: "🐉",
    title: "Dračia pečať",
    text: "Siedma časť tajomstva.",
    clue: "Y",
    cluePartial: "Y",
  },
  "week-8": {
    partLabel: "Pečať VIII",
    icon: "🛡️",
    title: "Štít Sparty",
    text: "Ôsma časť hesla.",
    clue: "T",
    cluePartial: "T",
  },
  "week-9": {
    partLabel: "Pečať IX",
    icon: "♟",
    title: "Šachová koruna",
    text: "Deviata pečať pokladu.",
    clue: "I",
    cluePartial: "I",
  },
  "week-10": {
    partLabel: "Pečať X",
    icon: "📖",
    title: "Kronika hlavolamu",
    text: "Desiata časť hesla.",
    clue: "E",
    cluePartial: "E",
  },
  "week-11": {
    partLabel: "Pečať XI",
    icon: "🔑",
    title: "Kľúč pokladu",
    text: "Jedenástá časť tajomstva.",
    clue: "R",
    cluePartial: "ER",
  },
  "week-12": {
    partLabel: "Pečať XII",
    icon: "👑",
    title: "Koruna festivalu",
    text: "Posledná pečať — dokončíte kód pre festival.",
    clue: "ŠACH",
    cluePartial: "ŠA",
  },
};

export function weekRewardId(weekIndex) {
  return "week-" + weekIndex;
}

export function getScheduleEntry(puzzleId) {
  for (var i = 0; i < PUZZLE_SCHEDULE.length; i++) {
    if (PUZZLE_SCHEDULE[i].id === puzzleId) return PUZZLE_SCHEDULE[i];
  }
  return null;
}

export function getWeekSchedule(weekIndex) {
  for (var i = 0; i < PUZZLE_WEEKS.length; i++) {
    if (PUZZLE_WEEKS[i].weekIndex === weekIndex) return PUZZLE_WEEKS[i];
  }
  return null;
}

export function formatUnlockDateSk(isoDate) {
  var parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  return parts[2] + "." + parts[1] + "." + parts[0];
}

/** Kompletný zoznam hesiel pre dokumentáciu / organizátorov. */
export function getFullPasswordList() {
  var list = [];
  for (var w = 0; w < PUZZLE_WEEKS.length; w++) {
    var week = PUZZLE_WEEKS[w];
    list.push({
      weekIndex: week.weekIndex,
      unlockDate: week.unlockDate,
      weekPassword: week.weekPassword,
      theme: week.theme.title,
      puzzles: week.puzzleIds.map(function (pid) {
        var entry = getScheduleEntry(pid);
        return {
          id: pid,
          difficulty: entry.difficulty,
          password: entry.unlockPassword,
        };
      }),
    });
  }
  return list;
}
