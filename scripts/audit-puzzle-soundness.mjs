/**
 * Audit: po každom ťahu bota musí existovať zdravá obrana (bielemu zostane
 * mat v 1 / zisk). Runtime: puzzle-bot.js → filterSoundBotChoices.
 */
import { Chess } from "chess.js";
import { FESTIVAL_PUZZLES } from "../js/puzzles-data.js";

function blackQueenOnBoard(chess) {
  const board = chess.board();
  for (const row of board) {
    for (const p of row) {
      if (p && p.type === "q" && p.color === "b") return true;
    }
  }
  return false;
}

function hasWhiteMateInOne(chess) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  for (const m of chess.moves({ verbose: true })) {
    const c2 = new Chess(chess.fen());
    c2.move({ from: m.from, to: m.to, promotion: m.promotion });
    if (c2.isCheckmate()) return true;
  }
  return false;
}

function whiteCanReachGoal(chess, win) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  if (win === "black_queen_captured") {
    if (!blackQueenOnBoard(chess)) return true;
  } else if (chess.isCheckmate() && chess.turn() === "b") {
    return true;
  }
  for (const m of chess.moves({ verbose: true })) {
    const c2 = new Chess(chess.fen());
    c2.move({ from: m.from, to: m.to, promotion: m.promotion });
    if (win === "black_queen_captured") {
      if (!blackQueenOnBoard(c2)) return true;
    } else if (c2.isCheckmate() && c2.turn() === "b") return true;
  }
  return false;
}

function isWinAfterBlack(chess, win) {
  return whiteCanReachGoal(chess, win);
}

function puzzleWin(chess, win) {
  if (win === "black_queen_captured") return !blackQueenOnBoard(chess);
  return chess.isCheckmate() && chess.turn() === "b";
}

/** Prejde vetvu `then` (hlavná línia) a overí, či vedie k cieľu úlohy. */
function walkScriptToWin(chess, steps, win) {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (step.who === "user") {
      if (step.fail) return false;
      const m = step.suggest || step.move;
      if (!m) return false;
      const applied = chess.move({
        from: m.from,
        to: m.to,
        ...(m.promotion ? { promotion: m.promotion } : {}),
      });
      if (!applied) return false;
      continue;
    }
    if (step.who === "bot") {
      const pick = (step.choices || []).find((c) => c.main) || step.choices?.[0];
      if (!pick?.move) return false;
      const applied = chess.move({
        from: pick.move.from,
        to: pick.move.to,
        ...(pick.move.promotion ? { promotion: pick.move.promotion } : {}),
      });
      if (!applied) return false;
      return walkScriptToWin(chess, pick.then || [], win);
    }
    return false;
  }
  return puzzleWin(chess, win);
}

function isSoundBotChoice(fen, choice, win, thenSteps) {
  if (!choice?.move || choice.fail) return false;
  const probe = new Chess(fen);
  const bm = {
    from: choice.move.from,
    to: choice.move.to,
    ...(choice.move.promotion ? { promotion: choice.move.promotion } : {}),
  };
  if (!probe.move(bm)) return false;
  if (thenSteps?.length) {
    return walkScriptToWin(probe, thenSteps, win);
  }
  return isWinAfterBlack(probe, win);
}

function filterSoundBotChoices(fen, step, win) {
  return (step.choices || []).filter((c) => isSoundBotChoice(fen, c, win, c.then));
}

function classifyBlackReplies(fen, win) {
  const c = new Chess(fen);
  if (c.turn() !== "b") return { sound: [], unsound: [] };
  const sound = [];
  const unsound = [];
  for (const san of c.moves()) {
    const c2 = new Chess(fen);
    c2.move(san);
    if (isWinAfterBlack(c2, win)) sound.push(san);
    else unsound.push(san);
  }
  return { sound, unsound };
}

function walkBotSteps(chess, steps, path, puzzle, issues) {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (step.who === "user") {
      if (step.fail) continue;
      const move = step.suggest || step.move;
      if (!move) continue;
      const r = chess.move({
        from: move.from,
        to: move.to,
        ...(move.promotion ? { promotion: move.promotion } : {}),
      });
      if (!r) {
        issues.push({ id: puzzle.id, level: "error", msg: path + " user: neplatný ťah" });
      }
      continue;
    }
    if (step.who === "bot") {
      const fenBefore = chess.fen();
      const soundFromData = filterSoundBotChoices(fenBefore, step, puzzle.win);

      if (soundFromData.length === 0) {
        issues.push({
          id: puzzle.id,
          level: "critical",
          msg: path + " bot: žiadna zdravá obrana v dátach — filter by vrátil 0",
        });
      }

      for (const c of step.choices || []) {
        if (!c.move) continue;
        const ok = isSoundBotChoice(fenBefore, c, puzzle.win, c.then);
        const p = new Chess(fenBefore);
        const legal = p.move({
          from: c.move.from,
          to: c.move.to,
          ...(c.move.promotion ? { promotion: c.move.promotion } : {}),
        });
        if (legal && !ok && !c.fail) {
          issues.push({
            id: puzzle.id,
            level: "warn",
            msg: path + " " + c.move.from + c.move.to + " legálna ale nie zdravá, chýba fail:true",
          });
        }
      }

      const pick = soundFromData.find((c) => c.main) || soundFromData[0];
      if (!pick) continue;
      chess.move({
        from: pick.move.from,
        to: pick.move.to,
        ...(pick.move.promotion ? { promotion: pick.move.promotion } : {}),
      });
      if (pick.then?.length) walkBotSteps(chess, pick.then, path + "→main", puzzle, issues);
    }
  }
}

const issues = [];
const mate2Medium = [];

for (const puzzle of FESTIVAL_PUZZLES) {
  const chess = new Chess(puzzle.fen);
  walkBotSteps(chess, puzzle.play || [], puzzle.id, puzzle, issues);

  const open = puzzle.play?.[0];
  if (open?.accept === "mate_in_2_opening" && open.suggest) {
    mate2Medium.push(puzzle.id);
    const c = new Chess(puzzle.fen);
    c.move({
      from: open.suggest.from,
      to: open.suggest.to,
      promotion: open.suggest.promotion,
    });
    const { sound, unsound } = classifyBlackReplies(c.fen(), puzzle.win);
    if (sound.length === 0) {
      issues.push({ id: puzzle.id, level: "critical", msg: "po úvode žiadna zdravá čierna odpoveď" });
    }
  }
}

const critical = issues.filter((i) => i.level === "critical");
const warn = issues.filter((i) => i.level === "warn");

console.log("=== Audit zdravých obrán bota ===\n");
console.log("Ochrana v hre: filterSoundBotChoices() pred každým ťahom bota (všetky úlohy).\n");
console.log("Stredné (mat v 2, rovnaká pozícia):", mate2Medium.length, "úloh\n");

if (critical.length) {
  console.log("KRITICKÉ:");
  for (const i of critical) console.log(" ", i.id, "—", i.msg);
  console.log("");
} else {
  console.log("OK — pri každom kroku bota je v dátach aspoň 1 zdravá obrana.\n");
}

if (warn.length) {
  console.log("Upozornenia:");
  for (const i of warn) console.log(" ", i.id, "—", i.msg);
  console.log("");
}

console.log("Spustenie: npm run test:puzzles:soundness");
console.log("Spolu s riešiteľnosťou: npm run test:puzzles && npm run test:puzzles:soundness\n");

process.exit(critical.length ? 1 : 0);
