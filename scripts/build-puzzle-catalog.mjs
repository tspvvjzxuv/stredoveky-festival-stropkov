/**
 * Generates js/puzzle-catalog.js from verified specs.
 * Run: node scripts/build-puzzle-catalog.mjs
 */
import { Chess } from "chess.js";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PUZZLE_SPECS } from "./puzzle-entries-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

function ratingFor(week, difficulty) {
  const w = week - 1;
  const easy = Math.round(1350 + ((1700 - 1350) * w) / 11);
  const medium = Math.round(1550 + ((2020 - 1550) * w) / 11);
  const hard = Math.round(1850 + ((2450 - 1850) * w) / 11);
  if (difficulty === "easy") return easy;
  if (difficulty === "medium") return medium;
  return hard;
}

const ENTRIES = PUZZLE_SPECS.map((spec) => ({
  ...spec,
  estimatedRating: ratingFor(spec.week, spec.difficulty),
  win: spec.win || "checkmate",
}));

const seenFen = new Set();
const seenLine = new Set();
for (const e of ENTRIES) {
  const board = e.fen.split(" ")[0];
  const lineKey = e.line.map((m) => m.join("")).join(",");
  if (seenFen.has(board)) console.warn("WARN duplicate FEN:", board, "week", e.week, e.difficulty);
  if (seenLine.has(lineKey)) console.warn("WARN duplicate line:", "week", e.week, e.difficulty);
  seenFen.add(board);
  seenLine.add(lineKey);
}


// --- Builder helpers ---

function blackQueenOnBoard(chess) {
  const board = chess.board();
  for (const row of board) {
    for (const p of row) {
      if (p && p.type === "q" && p.color === "b") return true;
    }
  }
  return false;
}

function materialScore(chess) {
  const v = { p: 1, n: 3, b: 3, r: 5, q: 9 };
  let s = 0;
  for (const row of chess.board()) {
    for (const p of row) {
      if (p) s += (p.color === "w" ? 1 : -1) * v[p.type];
    }
  }
  return s;
}

function isDecisiveForWhite(chess) {
  if (chess.isCheckmate() && chess.turn() === "b") return true;
  if (!blackQueenOnBoard(chess)) return true;
  return materialScore(chess) >= 5;
}

function whiteCanReachGoal(chess, win) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  if (win === "black_queen_captured") {
    if (!blackQueenOnBoard(chess)) return true;
  } else if (win === "decisive") {
    if (isDecisiveForWhite(chess)) return true;
  } else if (win === "decisive") {
    if (isDecisiveForWhite(chess)) return true;
  } else if (chess.isCheckmate() && chess.turn() === "b") return true;
  for (const m of chess.moves({ verbose: true })) {
    const c2 = new Chess(chess.fen());
    c2.move({ from: m.from, to: m.to, promotion: m.promotion });
    if (win === "black_queen_captured") {
      if (!blackQueenOnBoard(c2)) return true;
    } else if (win === "decisive") {
      if (isDecisiveForWhite(c2)) return true;
    } else if (c2.isCheckmate() && c2.turn() === "b") return true;
  }
  return false;
}

function isSoundBlackMove(fen, from, to, win) {
  const c = new Chess(fen);
  if (!c.move({ from, to })) return false;
  return whiteCanReachGoal(c, win);
}

function countWhiteMovesInLine(line, fen) {
  const c = new Chess(fen);
  let n = 0;
  for (const [f, t] of line) {
    if (c.turn() === "w") n++;
    moveFromPair(c, f, t);
  }
  return n;
}

/** Maximálny počet bielych ťahov (voľná hra — prehra len po prekročení). */
function maxMovesFor(spec) {
  const wm = countWhiteMovesInLine(spec.line, spec.fen);
  const slack =
    spec.difficulty === "easy" ? 4 : spec.difficulty === "medium" ? 6 : 10;
  return Math.max(
    spec.difficulty === "easy" ? 6 : spec.difficulty === "medium" ? 10 : 14,
    wm * 2 + slack
  );
}

function userAcceptForStep(wIdx, totalWhite, spec, win) {
  if (spec.userAccepts && spec.userAccepts[wIdx] !== undefined) {
    return spec.userAccepts[wIdx];
  }
  if (wIdx === 0 && spec.openingAccept) return spec.openingAccept;
  if (wIdx === totalWhite - 1) {
    if (win === "black_queen_captured") return "black_queen_captured";
    if (win === "decisive") return "decisive";
    return "checkmate";
  }
  return null;
}

function buildUserStep(move, accept, win, fenBefore) {
  const probe = new Chess(fenBefore);
  const piece = probe.get(move.from);
  const suggest = { from: move.from, to: move.to };
  if (piece && piece.type === "p" && (move.to[1] === "8" || move.to[1] === "1")) {
    suggest.promotion = "q";
  }
  const step = {
    who: "user",
    suggest,
    wrong:
      accept === "black_queen_captured"
        ? "Týmto ťahom nezoberiete čiernu dámu."
        : accept === "mate_in_2_opening"
          ? "Tento ťah nevedie k matu v dvoch — skúste iný úvod."
          : accept === "check"
            ? "Začnite šachom podľa plánu úlohy."
            : accept === "decisive"
            ? "Týmto ťahom nezískate rozhodujúcu výhodu — skúste taktický ťah z riešenia."
            : accept === "checkmate"
              ? "Týmto ťahom nedáte mat — skúste iný finiš."
              : "Týmto ťahom nepostupujete správne — skúste iný biely ťah.",
  };
  if (accept) step.accept = accept;
  return step;
}

function botMoveShape(fen, from, to) {
  const c = new Chess(fen);
  const piece = c.get(from);
  const move = { from, to };
  if (piece && piece.type === "p" && (to[1] === "8" || to[1] === "1")) move.promotion = "q";
  return move;
}

function buildBotChoices(fen, mainFrom, mainTo, thenSteps, win) {
  const choices = [
    {
      move: botMoveShape(fen, mainFrom, mainTo),
      main: true,
      hint: "Počítač odohral hlavnú obranu — pokračujte podľa plánu.",
      then: thenSteps,
    },
  ];

  // Len hlavná (a prípadné ďalšie zvukové) obrany — bot ich filtruje; mŕtve vetvy s fail:true
  // blokovali hráča pri alternatívnom správnom úvode (iná pozícia, iný mat).
  return choices;
}

function moveFromPair(chess, from, to) {
  const piece = chess.get(from);
  const opts = { from, to };
  if (piece && piece.type === "p" && (to[1] === "8" || to[1] === "1")) opts.promotion = "q";
  return chess.move(opts);
}

function buildPlay(spec) {
  const win = spec.win || "checkmate";
  const line = spec.line;
  const whiteIndices = [];
  for (let i = 0; i < line.length; i++) {
    const probe = new Chess(spec.fen);
    for (let j = 0; j < i; j++) moveFromPair(probe, line[j][0], line[j][1]);
    if (probe.turn() === "w") whiteIndices.push(i);
  }
  const totalWhite = whiteIndices.length;
  const chess = new Chess(spec.fen);

  function recurse(lineIdx) {
    if (lineIdx >= line.length) return [];

    const [from, to] = line[lineIdx];
    const fenBefore = chess.fen();

    if (chess.turn() === "w") {
      const wNum = whiteIndices.indexOf(lineIdx);
      const accept = userAcceptForStep(wNum, totalWhite, spec, win);
      moveFromPair(chess, from, to);
      const then = recurse(lineIdx + 1);
      return [buildUserStep({ from, to }, accept, win, fenBefore), ...then];
    }

    moveFromPair(chess, from, to);
    const then = recurse(lineIdx + 1);
    return [
      {
        who: "bot",
        pick: "main",
        choices: buildBotChoices(fenBefore, from, to, then, win),
      },
    ];
  }

  return recurse(0);
}

function verifyEntry(spec) {
  const chess = new Chess(spec.fen);
  const sans = [];
  for (const [from, to] of spec.line) {
    const m = moveFromPair(chess, from, to);
    if (!m) return { ok: false, err: `illegal ${from}-${to}` };
    sans.push(m.san);
  }
  const win = spec.win || "checkmate";
  if (win === "black_queen_captured") {
    if (blackQueenOnBoard(chess)) return { ok: false, err: "black queen remains" };
  } else if (win === "decisive") {
    if (!isDecisiveForWhite(chess)) return { ok: false, err: "not decisive" };
  } else if (!chess.isCheckmate() || chess.turn() !== "b") {
    return { ok: false, err: "not checkmate" };
  }
  return { ok: true, sans };
}

let failures = 0;
const built = [];

for (const entry of ENTRIES) {
  const v = verifyEntry(entry);
  if (!v.ok) {
    console.error("VERIFY FAIL", entry.week, entry.difficulty, v.err);
    failures++;
    continue;
  }
  const play = buildPlay(entry);
  const maxMoves = maxMovesFor(entry);
  built.push({
    weekIndex: entry.week,
    difficulty: entry.difficulty,
    estimatedRating: entry.estimatedRating,
    fen: entry.fen,
    win: entry.win || "checkmate",
    maxMoves,
    freePlay: true,
    play,
    subtitle: entry.subtitle,
    solution: entry.solution,
  });
  console.log("OK", `w${entry.week}`, entry.difficulty, v.sans.join(" "));
}

if (failures) {
  console.error(failures, "failures — not writing catalog");
  process.exit(1);
}

const outPath = join(__dirname, "../js/puzzle-catalog.js");
const body = `/** Auto-generated by scripts/build-puzzle-catalog.mjs — do not edit by hand */\n\nexport const PUZZLE_CATALOG_ENTRIES = ${JSON.stringify(built, null, 2)};\n`;
writeFileSync(outPath, body, "utf8");
console.log("\nWrote", outPath, "—", built.length, "puzzles");
