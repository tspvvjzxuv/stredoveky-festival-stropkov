/**
 * 12 týždňov × 3 úlohy (ľahšia / stredná / najťažšia).
 * Hráč je vždy biely proti počítaču (čierny).
 */
import { PUZZLE_CATALOG_ENTRIES } from "./puzzle-catalog.js";

export const PUZZLES_PER_WEEK = 3;
export const WEEK_COUNT = 12;
export const DIFFICULTIES = ["easy", "medium", "hard"];

export const DIFFICULTY_LABELS = {
  easy: "Ľahšia",
  medium: "Stredná",
  hard: "Najťažšia",
};

export const WEEK_THEMES = [
  { title: "Brána pod Vliekom", tagline: "Prvá stráž brány" },
  { title: "Rytier Andreas", tagline: "Pasovanie v areáli" },
  { title: "Stredoveký festival", tagline: "Hradné nádvorie" },
  { title: "Pasovanie rytierov", tagline: "Rytiersky ceremoniál" },
  { title: "Lukostreľba", tagline: "Terč na nádvorí" },
  { title: "Táborová opekačka", tagline: "Ohnisko pod hviezdami" },
  { title: "Drak pod Vliekom", tagline: "Strážca brány" },
  { title: "Sparta Stropkov", tagline: "Štít združenia" },
  { title: "Šachová bitka", tagline: "Turnajové políčko" },
  { title: "Kronika hlavolamu", tagline: "Zápisník mága" },
  { title: "Investícia rytiera", tagline: "Tajomná peňaženka" },
  { title: "Koruna festivalu", tagline: "Posledný týždeň pred festivalom" },
];

export function puzzleId(weekIndex, difficulty) {
  return "cg-w" + weekIndex + "-" + difficulty;
}

function buildFestivalPuzzle(entry) {
  var theme = WEEK_THEMES[entry.weekIndex - 1];
  var diffLabel = DIFFICULTY_LABELS[entry.difficulty];
  return {
    id: puzzleId(entry.weekIndex, entry.difficulty),
    weekIndex: entry.weekIndex,
    difficulty: entry.difficulty,
    estimatedRating: entry.estimatedRating,
    title: "Týždeň " + entry.weekIndex + " · " + diffLabel + " — " + theme.title,
    ariaLabel: "Týždeň " + entry.weekIndex + ", " + diffLabel + ", " + theme.title,
    fen: entry.fen,
    win: entry.win,
    play: entry.play,
    subtitle: entry.subtitle,
    solution: entry.solution,
  };
}

export var FESTIVAL_PUZZLES = PUZZLE_CATALOG_ENTRIES.map(buildFestivalPuzzle);

export function getPuzzlesForWeek(weekIndex) {
  return FESTIVAL_PUZZLES.filter(function (p) {
    return p.weekIndex === weekIndex;
  });
}

export function getPuzzleById(id) {
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    if (FESTIVAL_PUZZLES[i].id === id) return FESTIVAL_PUZZLES[i];
  }
  return null;
}
