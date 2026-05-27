/**
 * Náhodné / alternatívne línie (flex režim ako v puzzle-bot.js).
 * Spustenie: node scripts/test-puzzle-alternatives.mjs
 */
import { Chess } from "chess.js";
import { FESTIVAL_PUZZLES } from "../js/puzzles-data.js";

const RANDOM_TRIALS = 12;
const MAX_PLIES = 48;

function blackQueenOnBoard(chess) {
  for (const row of chess.board()) {
    for (const p of row) {
      if (p && p.type === "q" && p.color === "b") return true;
    }
  }
  return false;
}

function puzzleWin(chess, win) {
  if (win === "black_queen_captured") return !blackQueenOnBoard(chess);
  return chess.isCheckmate() && chess.turn() === "b";
}

function hasWhiteMateInOne(chess) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  for (const m of chess.moves({ verbose: true })) {
    const c2 = new Chess(chess.fen());
    c2.move(m);
    if (c2.isCheckmate()) return true;
  }
  return false;
}

function whiteCanReachGoal(chess, win) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  if (puzzleWin(chess, win)) return true;
  for (const m of chess.moves({ verbose: true })) {
    const c2 = new Chess(chess.fen());
    c2.move(m);
    if (puzzleWin(c2, win)) return true;
  }
  return false;
}

function isMateInTwoOpening(fen, from, to, promotion) {
  const s = new Chess(fen);
  const applied = s.move({ from, to, promotion });
  if (!applied) return false;
  for (const bm of s.moves()) {
    const a = new Chess(s.fen());
    a.move(bm);
    if (hasWhiteMateInOne(a)) return true;
  }
  return false;
}

function movesMatch(a, b) {
  return a.from === b.from && a.to === b.to;
}

function listedMoves(step) {
  if (step.moves?.length) return step.moves;
  if (step.move) return [step.move];
  if (step.suggest) return [step.suggest];
  return [];
}

function evaluateUserStep(fen, step, attempted, puzzle) {
  if (!step || step.who !== "user" || step.fail) return { ok: false };
  const trial = new Chess(fen);
  const applied = trial.move(attempted);
  if (!applied) return { ok: false };

  for (const m of listedMoves(step)) {
    if (movesMatch(attempted, m)) return { ok: true, mode: "script" };
  }
  if (puzzleWin(trial, puzzle.win)) return { ok: true, mode: "goal", goal: "win" };

  const accept = step.accept;
  if (accept === "checkmate" && trial.isCheckmate() && trial.turn() === "b") {
    return { ok: true, mode: "goal", goal: "checkmate" };
  }
  if (accept === "check" && trial.isCheck()) {
    return { ok: true, mode: "goal", goal: "check" };
  }
  if (accept === "mate_in_2_opening" && isMateInTwoOpening(fen, attempted.from, attempted.to, attempted.promotion)) {
    return { ok: true, mode: "goal", goal: "mate_in_2_opening" };
  }
  if (accept === "black_queen_captured" && !blackQueenOnBoard(trial)) {
    return { ok: true, mode: "goal", goal: "black_queen_captured" };
  }
  if (step.allowMaintainWin && whiteCanReachGoal(trial, puzzle.win)) {
    return { ok: true, mode: "goal", goal: "maintain_win" };
  }
  return { ok: false };
}

function flexUserStep(puzzle) {
  const win = puzzle.win || "checkmate";
  return {
    who: "user",
    accept: win === "black_queen_captured" ? "black_queen_captured" : "checkmate",
    allowMaintainWin: true,
  };
}

function walkScriptToWin(chess, steps, win) {
  if (!steps?.length) return puzzleWin(chess, win);
  for (const step of steps) {
    if (step.who === "user") {
      if (step.fail) return false;
      const m = step.suggest || step.move;
      if (!m || !chess.move(m)) return false;
      continue;
    }
    if (step.who === "bot") {
      const pick = (step.choices || []).find((c) => c.main) || step.choices?.[0];
      if (!pick?.move || !chess.move(pick.move)) return false;
      return walkScriptToWin(chess, pick.then || [], win);
    }
    return false;
  }
  return puzzleWin(chess, win);
}

function filterSoundBotChoices(chess, step, puzzle) {
  const fen = chess.fen();
  return (step.choices || []).filter((c) => {
    if (!c.move || c.fail) return false;
    const probe = new Chess(fen);
    if (!probe.move(c.move)) return false;
    if (c.then?.length) return walkScriptToWin(probe, c.then, puzzle.win);
    return whiteCanReachGoal(probe, puzzle.win);
  });
}

function pickFlexBotMove(chess, puzzle, rng) {
  const sound = [];
  for (const m of chess.moves({ verbose: true })) {
    const probe = new Chess(chess.fen());
    probe.move(m);
    if (whiteCanReachGoal(probe, puzzle.win)) sound.push(m);
  }
  if (!sound.length) return null;
  return sound[Math.floor(rng() * sound.length)];
}

function pickBotChoice(step, chess, puzzle, rng) {
  if (step.pick === "flex") {
    const m = pickFlexBotMove(chess, puzzle, rng);
    return m ? { move: { from: m.from, to: m.to, promotion: m.promotion } } : null;
  }
  let choices = filterSoundBotChoices(chess, step, puzzle);
  if (!choices.length) {
    const flex = pickFlexBotMove(chess, puzzle, rng);
    if (flex) {
      return { move: { from: flex.from, to: flex.to, promotion: flex.promotion }, then: [flexUserStep(puzzle)] };
    }
    if (step.pick === "main" || step.pick === "preferred") {
      const main = (step.choices || []).find((c) => c.main || c.preferred);
      if (main) return main;
    }
    return step.choices?.[0] || null;
  }
  if (step.pick === "main" || step.pick === "preferred") {
    const main = choices.find((c) => c.main || c.preferred) || choices[0];
    return main;
  }
  return choices[Math.floor(rng() * choices.length)];
}

function acceptedWhiteMoves(fen, step, puzzle) {
  const c = new Chess(fen);
  const out = [];
  for (const m of c.moves({ verbose: true })) {
    const attempted = { from: m.from, to: m.to, promotion: m.promotion };
    if (evaluateUserStep(fen, step, attempted, puzzle).ok) out.push(attempted);
  }
  return out;
}

function simulate(puzzle, rng, pickAltOpening) {
  const chess = new Chess(puzzle.fen);
  let flex = false;
  let steps = puzzle.play || [];
  let stepIdx = 0;
  let plies = 0;

  while (!puzzleWin(chess, puzzle.win) && plies < MAX_PLIES) {
    if (chess.turn() === "w") {
      const step = flex ? flexUserStep(puzzle) : steps[stepIdx];
      if (!step || step.who !== "user") return { ok: false, why: "missing user step" };

      let candidates = acceptedWhiteMoves(chess.fen(), step, puzzle);
      if (!candidates.length) return { ok: false, why: "no legal accepted white move" };

      if (pickAltOpening && step.accept === "mate_in_2_opening" && candidates.length > 1) {
        const alts = candidates.filter(
          (m) =>
            !step.suggest ||
            m.from !== step.suggest.from ||
            m.to !== step.suggest.to,
        );
        if (alts.length) candidates = alts;
      }

      const pick = candidates[Math.floor(rng() * candidates.length)];
      const verdict = evaluateUserStep(chess.fen(), step, pick, puzzle);
      if (!verdict.ok) return { ok: false, why: "evaluate rejected pick" };
      chess.move(pick);

      if (verdict.mode === "goal" && verdict.goal !== "win") {
        flex = true;
        plies++;
        continue;
      }
      if (puzzleWin(chess, puzzle.win)) return { ok: true };

      if (!flex) {
        stepIdx++;
        if (stepIdx >= steps.length) return { ok: false, why: "steps exhausted" };
      }
      plies++;
      continue;
    }

    const step = flex ? { who: "bot", pick: "flex" } : steps[stepIdx];
    if (!step || step.who !== "bot") return { ok: false, why: "missing bot step" };

    const choice = pickBotChoice(step, chess, puzzle, rng);
    if (!choice?.move) return { ok: false, why: "no bot move" };

    chess.move(choice.move);
    if (!flex) {
      steps = choice.then || [];
      stepIdx = 0;
      if (!steps.length && !puzzleWin(chess, puzzle.win)) {
        flex = true;
      }
    }
    plies++;
  }

  return puzzleWin(chess, puzzle.win) ? { ok: true } : { ok: false, why: "max plies" };
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let failures = 0;

for (const puzzle of FESTIVAL_PUZZLES) {
  const issues = [];

  for (let t = 0; t < RANDOM_TRIALS; t++) {
    const rng = mulberry32((puzzle.id.length * 997) ^ (t * 131));
    const res = simulate(puzzle, rng, false);
    if (!res.ok) issues.push("random trial " + t + ": " + res.why);
  }

  const alt = simulate(puzzle, mulberry32(42), true);
  if (!alt.ok) issues.push("alt opening: " + alt.why);

  if (issues.length) {
    failures++;
    console.log("FAIL", puzzle.id);
    for (const msg of issues.slice(0, 4)) console.log("  ", msg);
    if (issues.length > 4) console.log("   … +" + (issues.length - 4) + " ďalších");
  }
}

console.log("\n--- Alternatívne / náhodné línie ---");
console.log("Úlohy s chybou:", failures, "/", FESTIVAL_PUZZLES.length);

if (failures) process.exit(1);
console.log("OK — všetky úlohy prejdú hlavnou, náhodnou aj alternatívnou skúškou.");
