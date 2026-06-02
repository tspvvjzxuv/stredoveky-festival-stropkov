/**
 * 12 týždňov × 3 úlohy (ľahšia / stredná / najťažšia).
 * Hráč je biely alebo čierny podľa úlohy (playerColor / FEN).
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
  { title: "Mat jedným ťahom", tagline: "Plná doska — nájdite okamžitý mat medzi figurkami" },
  { title: "Mat dvoma ťahmi", tagline: "Veža, jazdec a strelec — taktické kombinácie z knihy" },
  { title: "Mat dvoma ťahmi II", tagline: "Bohaté pozície — jazdec, dáma a viac figúr na doske" },
  { title: "Taktika", tagline: "Mat, väzba a dvojitý úder — voľnejšia hra, viac ťahov" },
  { title: "Mat dvoma ťahmi", tagline: "Úlohy z knihy č. 175, 187–188" },
  { title: "Mat dvoma ťahmi II", tagline: "Veža, dáma a jazdec — legálne pozície, mat v 2" },
  { title: "Väzba", tagline: "Taktika z knihy — väzba" },
  { title: "Väzba II", tagline: "Pokračovanie motívu väzby" },
  { title: "Dvojitý úder", tagline: "Taktika z knihy" },
  { title: "Mat troma ťahmi", tagline: "Úlohy z knihy — mat v 3 ťahoch" },
  { title: "Mat troma ťahmi II", tagline: "Dámsko-jazdecké kombinácie" },
  { title: "Koruna festivalu", tagline: "Záverečné maty z knihy" },
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
    playerColor: entry.playerColor || "w",
    win: entry.win,
    play: entry.play,
    subtitle: entry.subtitle,
    solution: entry.solution,
    maxMoves: entry.maxMoves,
    freePlay: entry.freePlay !== false,
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
