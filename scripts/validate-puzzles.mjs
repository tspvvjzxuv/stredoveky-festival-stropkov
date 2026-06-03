/**
 * Overí všetkých 36 hlavolamov: legálne ťahy (chess.js / FIDE pravidlá)
 * a vyriešenie hlavnej línie.
 */
import { Chess } from "chess.js";
import { FESTIVAL_PUZZLES } from "../js/puzzles-data.js";

function isLegalMove(chess, from, to, promotion) {
  const moves = chess.moves({ square: from, verbose: true });
  return moves.some((m) => {
    if (m.to !== to) return false;
    if (promotion) return m.promotion === promotion;
    return !m.promotion || m.promotion === "q";
  });
}

function applyMove(chess, move) {
  if (!isLegalMove(chess, move.from, move.to, move.promotion)) {
    return { ok: false, err: "nelégálny podľa chess.js: " + JSON.stringify(move) };
  }
  const piece = chess.get(move.from);
  const opts = { from: move.from, to: move.to };
  if (move.promotion) opts.promotion = move.promotion;
  else if (piece && piece.type === "p" && (move.to[1] === "8" || move.to[1] === "1")) opts.promotion = "q";
  const m = chess.move(opts);
  if (!m) return { ok: false, err: "chess.move zlyhal" };
  return { ok: true, san: m.san };
}

function applyUser(chess, step, fen) {
  if (step.fail) return null;
  if (step.accept === "checkmate") {
    const start = new Chess(fen);
    for (const m of start.moves({ verbose: true })) {
      const c2 = new Chess(fen);
      c2.move({ from: m.from, to: m.to, promotion: m.promotion });
      if (c2.isCheckmate()) {
        const r = applyMove(chess, { from: m.from, to: m.to, promotion: m.promotion });
        return r.ok ? null : r.err;
      }
    }
    if (step.suggest) {
      const r = applyMove(chess, step.suggest);
      return r.ok ? null : r.err;
    }
    return "žiadny mat v 1";
  }
  if (step.accept === "mate_in_2_opening") {
    const start = new Chess(fen);
    const tryMove = step.suggest || step.move;
    if (tryMove) {
      const r = applyMove(chess, tryMove);
      return r.ok ? null : r.err;
    }
    return "bez suggest";
  }
  if (step.accept === "check") {
    const start = new Chess(fen);
    for (const m of start.moves({ verbose: true })) {
      const c2 = new Chess(fen);
      c2.move({ from: m.from, to: m.to, promotion: m.promotion });
      if (c2.isCheck()) {
        const r = applyMove(chess, { from: m.from, to: m.to, promotion: m.promotion });
        return r.ok ? null : r.err;
      }
    }
    if (step.suggest) {
      const r = applyMove(chess, step.suggest);
      return r.ok ? null : r.err;
    }
    return "žiadny šach";
  }
  if (step.accept === "black_queen_captured") {
    if (step.suggest) {
      const r = applyMove(chess, step.suggest);
      return r.ok ? null : r.err;
    }
    return "bez suggest";
  }
  const move = step.move || step.suggest;
  if (!move) return "user step bez move";
  const r = applyMove(chess, move);
  if (!r.ok) return r.err;
  return null;
}

function walkSteps(chess, steps, path, fenAtStep) {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const label = path + "[" + i + "]";
    const fenHere = chess.fen();

    if (step.who === "user") {
      if (step.fail) continue;
      const err = applyUser(chess, step, fenHere);
      if (err) return label + ": " + err;
      continue;
    }

    if (step.who === "bot") {
      const choices = step.choices || [];
      if (!choices.length) return label + ": bot bez choices";
      for (let c = 0; c < choices.length; c++) {
        const clone = new Chess(chess.fen());
        const choice = choices[c];
        if (!choice.move) return label + ".choices[" + c + "]: bez move";
        const r = applyMove(clone, choice.move);
        if (!r.ok) return label + ".choices[" + c + "]: " + r.err;
        if (choice.then && choice.then.length) {
          const sub = walkSteps(clone, choice.then, label + ".choices[" + c + "].then", clone.fen());
          if (sub) return sub;
        }
      }
      return null;
    }

    return label + ": neznámy who";
  }
  return null;
}

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

function playerColorFromPuzzle(puzzle) {
  if (puzzle.playerColor === "w" || puzzle.playerColor === "b") return puzzle.playerColor;
  const turn = String(puzzle.fen || "").split(" ")[1];
  return turn === "b" ? "b" : "w";
}

function opponentColor(pc) {
  return pc === "b" ? "w" : "b";
}

function puzzleSolved(chess, winType, playerColor) {
  const pc = playerColor || "w";
  const opp = opponentColor(pc);
  if (winType === "black_queen_captured") {
    return !blackQueenOnBoard(chess);
  }
  if (winType === "decisive") {
    if (chess.isCheckmate() && chess.turn() === opp) return true;
    if (pc === "b") {
      if (!whiteQueenOnBoard(chess)) return true;
      return materialScore(chess) <= -5;
    }
    if (!blackQueenOnBoard(chess)) return true;
    return materialScore(chess) >= 5;
  }
  return chess.isCheckmate() && chess.turn() === opp;
}

function whiteQueenOnBoard(chess) {
  for (const row of chess.board()) {
    for (const p of row) {
      if (p && p.type === "q" && p.color === "w") return true;
    }
  }
  return false;
}

function solveMainLine(puzzle) {
  const chess = new Chess(puzzle.fen);
  let steps = puzzle.play || [];
  let idx = 0;
  const line = [];

  while (idx < steps.length) {
    const step = steps[idx];
    if (step.who === "user") {
      if (step.fail) return { ok: false, line, err: "fail step v hlavnej línii" };
      const fenHere = chess.fen();
      const err = applyUser(chess, step, fenHere);
      if (err) return { ok: false, line, err };
      line.push(chess.history().slice(-1)[0] || "?");
      idx++;
      continue;
    }
    if (step.who === "bot") {
      const main = (step.choices || []).find((c) => c.main) || step.choices[0];
      if (!main) return { ok: false, line, err: "žiadna bot voľba" };
      const r = applyMove(chess, main.move);
      if (!r.ok) return { ok: false, line, err: r.err };
      line.push(r.san);
      steps = main.then || [];
      idx = 0;
      continue;
    }
    return { ok: false, line, err: "neznámy krok" };
  }

  if (!puzzleSolved(chess, puzzle.win, playerColorFromPuzzle(puzzle))) {
    return { ok: false, line, err: "cieľ nie je splnený (win=" + puzzle.win + ")" };
  }
  return { ok: true, line };
}

let errors = 0;
const results = [];
const boardSeen = new Map();

function countUserStepsInPlay(play) {
  let n = 0;
  for (const s of play || []) if (s.who === "user") n++;
  return n;
}

for (const puzzle of FESTIVAL_PUZZLES) {
  const board = puzzle.fen.split(" ")[0];
  if (boardSeen.has(board)) {
    errors++;
    console.log("DUPLICATE FEN:", boardSeen.get(board), "a", puzzle.id, "→", board);
  } else {
    boardSeen.set(board, puzzle.id);
  }
  const userSteps = countUserStepsInPlay(puzzle.play);
  if (typeof puzzle.maxMoves === "number" && userSteps > puzzle.maxMoves) {
    errors++;
    console.log("FAIL maxMoves", puzzle.id, "riešenie potrebuje", userSteps, "ťahov, limit je", puzzle.maxMoves);
  }
}

for (const puzzle of FESTIVAL_PUZZLES) {
  const chess = new Chess(puzzle.fen);
  const treeErr = walkSteps(chess, puzzle.play || [], puzzle.id, puzzle.fen);
  const solve = solveMainLine(puzzle);

  if (treeErr || !solve.ok) {
    errors++;
    console.log("FAIL", puzzle.id, treeErr || solve.err);
    results.push({ id: puzzle.id, ok: false });
  } else {
    results.push({ id: puzzle.id, ok: true, line: solve.line.join(" ") });
  }
}

console.log("\n--- Súhrn (" + FESTIVAL_PUZZLES.length + " úloh) ---");
const ok = results.filter((r) => r.ok);
console.log("Vyriešených (hlavná línia, legálne podľa chess.js): " + ok.length + "/" + FESTIVAL_PUZZLES.length);
console.log("Jedinečných rozložení figúr (FEN): " + boardSeen.size + "/" + FESTIVAL_PUZZLES.length);

if (process.env.VERBOSE === "1") {
  for (const r of ok) {
    console.log("  OK", r.id, "→", r.line);
  }
}

if (errors) {
  console.log("\n" + errors + " chýb.");
  process.exit(1);
}

console.log("\nPravidlá: ťahy overené cez chess.js 1.4 (štandardné šachové pravidlá); UI používa Chessground s legálnymi destináciami z chess.moves().");
