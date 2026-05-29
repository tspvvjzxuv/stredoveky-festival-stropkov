/** Spoločná logika porovnávania ťahov a cieľov pre hlavolamy. */
import { Chess } from "https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm";

function squareKey(value) {
  if (!value) return "";
  return String(value).trim().toLowerCase();
}

/** Normalizuje ťah z {from,to}, {orig,dest}, UCI (g2g7) alebo SAN reťazca. */
export function toMoveShape(input) {
  if (!input) return null;
  if (typeof input === "string") {
    var compact = input.replace(/[-\s]/g, "").toLowerCase();
    if (compact.length >= 4) {
      return {
        from: compact.slice(0, 2),
        to: compact.slice(2, 4),
        promotion: compact.length > 4 ? compact.slice(4, 5) : "q",
      };
    }
    return null;
  }
  var from = squareKey(input.from || input.orig);
  var to = squareKey(input.to || input.dest);
  if (!from || !to) return null;
  return {
    from: from,
    to: to,
    promotion: input.promotion ? String(input.promotion).toLowerCase() : "q",
  };
}

export function movesMatch(a, b) {
  var ma = toMoveShape(a);
  var mb = toMoveShape(b);
  if (!ma || !mb) return false;
  if (ma.from !== mb.from || ma.to !== mb.to) return false;
  var promoA = ma.promotion || "";
  var promoB = mb.promotion || "";
  if (!promoA && !promoB) return true;
  return (promoA || "q") === (promoB || "q");
}

/** Ťah z Chessground (orig/dest) — promo len pri pešiakovi na poslednom rade. */
function blackQueenOnBoard(chess) {
  var board = chess.board();
  for (var r = 0; r < board.length; r++) {
    for (var c = 0; c < board[r].length; c++) {
      var piece = board[r][c];
      if (piece && piece.type === "q" && piece.color === "b") return true;
    }
  }
  return false;
}

export function isPuzzleWinPosition(chess, winType) {
  if (winType === "black_queen_captured") return !blackQueenOnBoard(chess);
  return chess.isCheckmate() && chess.turn() === "b";
}

export function hasWhiteMateInOne(chess) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  var moves = chess.moves({ verbose: true });
  for (var i = 0; i < moves.length; i++) {
    var clone = new Chess(chess.fen());
    clone.move({
      from: moves[i].from,
      to: moves[i].to,
      promotion: moves[i].promotion,
    });
    if (clone.isCheckmate()) return true;
  }
  return false;
}

/** Môže biely jedným ťahom splniť cieľ úlohy z aktuálnej pozície? */
export function whiteCanReachGoal(chess, winType) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  if (isPuzzleWinPosition(chess, winType)) return true;
  var moves = chess.moves({ verbose: true });
  for (var i = 0; i < moves.length; i++) {
    var clone = new Chess(chess.fen());
    clone.move({
      from: moves[i].from,
      to: moves[i].to,
      promotion: moves[i].promotion,
    });
    if (isPuzzleWinPosition(clone, winType)) return true;
  }
  return false;
}

function applyChoiceMove(chess, choice) {
  if (!choice || !choice.move) return false;
  var bm = { from: choice.move.from, to: choice.move.to };
  if (choice.move.promotion) bm.promotion = choice.move.promotion;
  return !!chess.move(bm);
}

function applyScriptUserStep(chess, step, winType) {
  if (!step || step.fail) return false;
  if (step.accept === "checkmate" || step.accept === "black_queen_captured") {
    var moves = chess.moves({ verbose: true });
    for (var i = 0; i < moves.length; i++) {
      var clone = new Chess(chess.fen());
      clone.move({
        from: moves[i].from,
        to: moves[i].to,
        promotion: moves[i].promotion,
      });
      if (isPuzzleWinPosition(clone, winType)) {
        return !!chess.move({
          from: moves[i].from,
          to: moves[i].to,
          promotion: moves[i].promotion,
        });
      }
    }
  }
  var m = step.move || step.suggest;
  if (!m) return false;
  return !!chess.move({
    from: m.from,
    to: m.to,
    promotion: m.promotion,
  });
}

/** Preverí, či vetva `then` po obrane bota vedie k cieľu (viacťahové kombinácie). */
export function walkScriptToWin(chess, steps, winType) {
  if (!steps || !steps.length) return isPuzzleWinPosition(chess, winType);
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    if (step.who === "user") {
      if (!applyScriptUserStep(chess, step, winType)) return false;
      continue;
    }
    if (step.who === "bot") {
      var pick = null;
      var choices = step.choices || [];
      for (var c = 0; c < choices.length; c++) {
        if (choices[c].main || choices[c].preferred) {
          pick = choices[c];
          break;
        }
      }
      if (!pick) pick = choices[0];
      if (!pick || !applyChoiceMove(chess, pick)) return false;
      return walkScriptToWin(chess, pick.then || [], winType);
    }
    return false;
  }
  return isPuzzleWinPosition(chess, winType);
}

/** Po tomto čiernom ťahu môže biely dosiahnuť cieľ (hned alebo podľa skriptu v `then`). */
export function isSoundBotChoice(chess, choice, puzzle) {
  if (!choice || choice.fail) return false;
  var probe = new Chess(chess.fen());
  if (!applyChoiceMove(probe, choice)) return false;
  if (choice.then && choice.then.length) {
    return walkScriptToWin(probe, choice.then, puzzle.win);
  }
  return whiteCanReachGoal(probe, puzzle.win);
}

/** Legálne obrany z dát, po ktorých biely stále vyhráva (nie Kf8 / h6 pri Qe1). */
export function filterSoundBotChoices(chess, step, puzzle) {
  var out = [];
  var choices = step.choices || [];
  for (var i = 0; i < choices.length; i++) {
    if (isSoundBotChoice(chess, choices[i], puzzle)) out.push(choices[i]);
  }
  return out;
}

var CAPTURE_SCORE = { q: 90, r: 55, n: 35, b: 35, p: 12, k: 0 };

/** Bodovanie čierneho ťahu: uprednostní šach, brania a aktívnu hru pred pasívnym ustúpením kráľa. */
export function scoreBlackMoveAggression(chess, move, winType) {
  var probe = new Chess(chess.fen());
  var applied = probe.move({
    from: move.from,
    to: move.to,
    promotion: move.promotion,
  });
  if (!applied) return -1000;

  var score = 0;
  if (probe.isCheck()) score += 120;
  if (move.captured) score += CAPTURE_SCORE[move.captured] || 8;
  if (move.san && move.san.indexOf("+") >= 0) score += 15;
  if (move.san && move.san.indexOf("x") >= 0) score += 8;

  var fromPiece = chess.get(move.from);
  if (fromPiece && fromPiece.type === "k" && !move.captured && !probe.isCheck()) {
    score -= 40;
  }

  if (whiteCanReachGoal(probe, winType)) score += 60;
  else if (hasWhiteMateInOne(probe)) score += 25;
  else score -= 800;

  return score;
}

/** Najaktívnejší z legálnych ťahov, pri ktorých biely stále môže vyhrať. */
export function pickEngagedBlackMove(chess, puzzle) {
  var win = puzzle.win;
  var moves = chess.moves({ verbose: true });
  if (!moves.length) return null;

  var ranked = moves
    .map(function (m) {
      return { move: m, score: scoreBlackMoveAggression(chess, m, win) };
    })
    .sort(function (a, b) {
      return b.score - a.score;
    });

  var pool = ranked.filter(function (r) {
    return r.score > 0;
  });
  if (!pool.length) {
    pool = ranked.filter(function (r) {
      return r.score > -400;
    });
  }
  if (!pool.length) pool = ranked;

  var topCount = Math.min(4, pool.length);
  var pick = pool[Math.floor(Math.random() * topCount)].move;
  var probe = new Chess(chess.fen());
  probe.move({ from: pick.from, to: pick.to, promotion: pick.promotion });
  var aggressive = probe.isCheck() || !!pick.captured;

  return {
    move: { from: pick.from, to: pick.to, promotion: pick.promotion },
    aggressive: aggressive,
    isCheck: probe.isCheck(),
    captured: pick.captured || null,
  };
}

function engagedBotHint(result) {
  if (!result) return "Počítač odohral ťah — pokračujte bielym.";
  if (result.isCheck && result.captured) {
    return "Počítač dal šach a zobral figúru — pokračujte bielym.";
  }
  if (result.isCheck) return "Počítač dal šach — pokračujte bielym.";
  if (result.captured) return "Počítač zobral figúru — pokračujte bielym.";
  if (result.aggressive) return "Počítač útočí — pokračujte bielym.";
  return "Počítač odohral ťah — pokračujte bielym.";
}

/** Záloha / flex: aktívna čierna odpoveď, po ktorej biely stále dosiahne cieľ. */
export function pickFlexSoundBotMove(chess, puzzle) {
  var engaged = pickEngagedBlackMove(chess, puzzle);
  if (!engaged) return null;

  var thenStep = {
    who: "user",
    accept: puzzle.win === "black_queen_captured" ? "black_queen_captured" : "checkmate",
    allowMaintainWin: true,
    wrong: "Týmto ťahom cieľ nesplníte.",
  };
  return {
    move: engaged.move,
    then: [thenStep],
    hint: engagedBotHint(engaged),
  };
}

/** Z viacerých zvukových vetiev v dátach vyberie najaktívnejšiu. */
export function pickMostEngagedBotChoice(chess, choices, puzzle) {
  if (!choices || !choices.length) return null;
  if (choices.length === 1) return choices[0];

  var best = choices[0];
  var bestScore = -Infinity;
  for (var i = 0; i < choices.length; i++) {
    var ch = choices[i];
    if (!ch || !ch.move || ch.fail) continue;
    var fakeMove = {
      from: ch.move.from,
      to: ch.move.to,
      promotion: ch.move.promotion,
      captured: ch.move.captured,
      san: ch.move.san || "",
    };
    var score = scoreBlackMoveAggression(chess, fakeMove, puzzle.win);
    if (ch.main) score += 5;
    if (score > bestScore) {
      bestScore = score;
      best = ch;
    }
  }
  return best;
}

/**
 * Úvod k matu v 2: aspoň jedna čierna odpoveď ponechá bielemu mat na najbližší ťah
 * (nie je to plný „vynútený mat v 2“, ale vylúči beznádejné úvody).
 */
export function isMateInTwoOpening(fen, moveShape) {
  var start = new Chess(fen);
  var applied = start.move({
    from: moveShape.from,
    to: moveShape.to,
    promotion: moveShape.promotion,
  });
  if (!applied) return false;
  var blackMoves = start.moves();
  for (var i = 0; i < blackMoves.length; i++) {
    var afterBlack = new Chess(start.fen());
    afterBlack.move(blackMoves[i]);
    if (hasWhiteMateInOne(afterBlack)) return true;
  }
  return false;
}

function listedMoves(step) {
  if (step.moves && step.moves.length) return step.moves;
  if (step.move) return [step.move];
  if (step.suggest) return [step.suggest];
  return [];
}

function matchesListedMove(step, attempted) {
  var list = listedMoves(step);
  for (var i = 0; i < list.length; i++) {
    if (movesMatch(attempted, list[i])) return true;
  }
  return false;
}

/**
 * Vyhodnotí biely ťah: presná línia, alebo accept (checkmate, mat v 2, šach…).
 * Vráti { ok, mode: "script"|"goal", goal? } alebo { ok: false }.
 */
export function evaluateUserStep(fen, step, attempted, puzzle) {
  if (!step || step.who !== "user" || step.fail) return { ok: false };

  var trial = new Chess(fen);
  var applied = trial.move({
    from: attempted.from,
    to: attempted.to,
    promotion: attempted.promotion,
  });
  if (!applied) return { ok: false };

  if (matchesListedMove(step, attempted)) {
    return { ok: true, mode: "script" };
  }

  if (isPuzzleWinPosition(trial, puzzle.win)) {
    return { ok: true, mode: "goal", goal: "win" };
  }

  var accept = step.accept;
  if (accept === "checkmate" && trial.isCheckmate() && trial.turn() === "b") {
    return { ok: true, mode: "goal", goal: "checkmate" };
  }
  if (accept === "check" && trial.isCheck()) {
    return { ok: true, mode: "goal", goal: "check" };
  }
  if (accept === "mate_in_2_opening" && isMateInTwoOpening(fen, attempted)) {
    return { ok: true, mode: "goal", goal: "mate_in_2_opening" };
  }
  if (accept === "black_queen_captured" && !blackQueenOnBoard(trial)) {
    return { ok: true, mode: "goal", goal: "black_queen_captured" };
  }

  if (step.allowMaintainWin && whiteCanReachGoal(trial, puzzle.win)) {
    return { ok: true, mode: "goal", goal: "maintain_win" };
  }

  if (!accept && !step.move && puzzle.win === "checkmate") {
    if (trial.isCheckmate() && trial.turn() === "b") {
      return { ok: true, mode: "goal", goal: "checkmate" };
    }
  }

  return { ok: false };
}

export function moveFromBoard(chess, orig, dest) {
  var from = squareKey(orig);
  var to = squareKey(dest);
  if (!from || !to || !chess) return null;
  var piece = chess.get(from);
  if (!piece) return null;
  var move = { from: from, to: to };
  if (piece.type === "p") {
    var rank = to.charAt(1);
    if ((piece.color === "w" && rank === "8") || (piece.color === "b" && rank === "1")) {
      move.promotion = "q";
    }
  }
  return move;
}
