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

function whiteQueenOnBoard(chess) {
  for (const row of chess.board()) {
    for (const p of row) {
      if (p && p.type === "q" && p.color === "w") return true;
    }
  }
  return false;
}

function opponentColor(pc) {
  return pc === "b" ? "w" : "b";
}

function playerColorFromSpec(spec) {
  if (spec.playerColor === "w" || spec.playerColor === "b") return spec.playerColor;
  const turn = String(spec.fen || "").split(" ")[1];
  return turn === "b" ? "b" : "w";
}

function isDecisiveForPlayer(chess, playerColor) {
  if (playerColor === "b") {
    if (chess.isCheckmate() && chess.turn() === "w") return true;
    if (!whiteQueenOnBoard(chess)) return true;
    return materialScore(chess) <= -5;
  }
  if (chess.isCheckmate() && chess.turn() === "b") return true;
  if (!blackQueenOnBoard(chess)) return true;
  return materialScore(chess) >= 5;
}

function playerCanReachGoal(chess, win, playerColor) {
  const pc = playerColor || "w";
  const opp = opponentColor(pc);
  if (chess.turn() !== pc || chess.isGameOver()) return false;
  if (win === "black_queen_captured") {
    if (!blackQueenOnBoard(chess)) return true;
  } else if (win === "decisive") {
    if (isDecisiveForPlayer(chess, pc)) return true;
  } else if (chess.isCheckmate() && chess.turn() === opp) return true;
  for (const m of chess.moves({ verbose: true })) {
    const c2 = new Chess(chess.fen());
    c2.move({ from: m.from, to: m.to, promotion: m.promotion });
    if (win === "black_queen_captured") {
      if (!blackQueenOnBoard(c2)) return true;
    } else if (win === "decisive") {
      if (isDecisiveForPlayer(c2, pc)) return true;
    } else if (c2.isCheckmate() && c2.turn() === opp) return true;
  }
  return false;
}

function countPlayerMovesInLine(line, fen, playerColor) {
  const c = new Chess(fen);
  let n = 0;
  for (const [f, t] of line) {
    if (c.turn() === playerColor) n++;
    moveFromPair(c, f, t);
  }
  return n;
}

/** Maximálny počet ťahov hráča (voľná hra — prehra len po prekročení). */
function maxMovesFor(spec) {
  const pc = playerColorFromSpec(spec);
  const wm = countPlayerMovesInLine(spec.line, spec.fen, pc);
  if (typeof spec.maxMoves === "number" && spec.maxMoves > 0) return spec.maxMoves;
  // Mat jedným ťahom — krátky limit, aby sedel s témou úlohy
  if (wm <= 1) {
    return spec.difficulty === "easy" ? 3 : spec.difficulty === "medium" ? 4 : 5;
  }
  if (wm <= 2) {
    const slack =
      spec.difficulty === "easy" ? 6 : spec.difficulty === "medium" ? 8 : 10;
    return Math.max(
      spec.difficulty === "easy" ? 8 : spec.difficulty === "medium" ? 12 : 16,
      wm * 3 + slack
    );
  }
  const slack =
    spec.difficulty === "easy" ? 10 : spec.difficulty === "medium" ? 14 : 18;
  return Math.max(
    spec.difficulty === "easy" ? 12 : spec.difficulty === "medium" ? 18 : 24,
    wm * 3 + slack
  );
}

function userAcceptForStep(wIdx, totalPlayer, spec, win) {
  if (spec.userAccepts && spec.userAccepts[wIdx] !== undefined) {
    return spec.userAccepts[wIdx];
  }
  if (wIdx === 0 && spec.openingAccept) return spec.openingAccept;
  if (wIdx === totalPlayer - 1) {
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
              : "Týmto ťahom nepostupujete správne — skúste iný ťah.",
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
  const pc = playerColorFromSpec(spec);
  const playerIndices = [];
  for (let i = 0; i < line.length; i++) {
    const probe = new Chess(spec.fen);
    for (let j = 0; j < i; j++) moveFromPair(probe, line[j][0], line[j][1]);
    if (probe.turn() === pc) playerIndices.push(i);
  }
  const totalPlayer = playerIndices.length;
  const chess = new Chess(spec.fen);

  function recurse(lineIdx) {
    if (lineIdx >= line.length) return [];

    const [from, to] = line[lineIdx];
    const fenBefore = chess.fen();

    if (chess.turn() === pc) {
      const pNum = playerIndices.indexOf(lineIdx);
      const accept = userAcceptForStep(pNum, totalPlayer, spec, win);
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

function countPieces(chess) {
  const w = {};
  const b = {};
  for (const row of chess.board()) {
    for (const p of row) {
      if (!p) continue;
      const bag = p.color === "w" ? w : b;
      bag[p.type] = (bag[p.type] || 0) + 1;
    }
  }
  return { w, b };
}

function validatePieceCounts(chess) {
  const { w, b } = countPieces(chess);
  for (const [color, bag, label] of [
    ["w", w, "white"],
    ["b", b, "black"],
  ]) {
    if (!bag.k) return `${label} missing king`;
    if ((bag.q || 0) > 1) return `${label} has ${bag.q} queens`;
    if ((bag.b || 0) > 2) return `${label} has ${bag.b} bishops`;
    if ((bag.n || 0) > 2) return `${label} has ${bag.n} knights`;
    if ((bag.r || 0) > 2) return `${label} has ${bag.r} rooks`;
    if ((bag.p || 0) > 8) return `${label} has ${bag.p} pawns`;
  }
  return null;
}

function lineHasOpponentMoves(spec) {
  const pc = playerColorFromSpec(spec);
  const chess = new Chess(spec.fen);
  for (const [from, to] of spec.line) {
    if (chess.turn() !== pc) return true;
    moveFromPair(chess, from, to);
  }
  return false;
}

/** Voľná hra len ak v riešení nie sú presné ťahy počítača (inak bot nehrá podľa skriptu). */
function resolveFreePlay(spec) {
  if (spec.freePlay === false) return false;
  if (lineHasOpponentMoves(spec)) return false;
  return spec.freePlay !== false;
}

function verifyEntry(spec) {
  const pc = playerColorFromSpec(spec);
  const opp = opponentColor(pc);
  const chess = new Chess(spec.fen);
  const pieceErr = validatePieceCounts(chess);
  if (pieceErr) return { ok: false, err: pieceErr };
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
    if (!isDecisiveForPlayer(chess, pc)) return { ok: false, err: "not decisive" };
  } else if (!chess.isCheckmate() || chess.turn() !== opp) {
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
    playerColor: playerColorFromSpec(entry),
    win: entry.win || "checkmate",
    maxMoves,
    freePlay: resolveFreePlay(entry),
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
