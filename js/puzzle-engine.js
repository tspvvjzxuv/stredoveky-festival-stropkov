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

/** Výsledok partie mimo skriptu (voľná hra / flex): výhra, remíza alebo prehra. */
export function detectTerminalOutcome(chess, puzzle) {
  if (!chess || !puzzle) return null;
  if (isPuzzleWinPosition(chess, puzzle.win)) {
    return { type: "win" };
  }
  if (!chess.isGameOver()) return null;

  if (chess.isCheckmate()) {
    if (chess.turn() === "w") {
      return { type: "loss", reason: "white_mated" };
    }
    return { type: "loss", reason: "unexpected_mate" };
  }

  if (chess.isDraw()) {
    var reason = "draw";
    if (chess.isStalemate()) reason = "stalemate";
    else if (chess.isInsufficientMaterial()) reason = "insufficient_material";
    else if (typeof chess.isThreefoldRepetition === "function" && chess.isThreefoldRepetition()) {
      reason = "threefold";
    } else if (typeof chess.isFiftyMove === "function" && chess.isFiftyMove()) {
      reason = "fifty_move";
    }
    return { type: "draw", reason: reason };
  }

  return { type: "draw", reason: "unknown" };
}

export function terminalOutcomeMessage(outcome) {
  if (!outcome) return "Koniec partie.";
  if (outcome.type === "win") return "Hlavolam je vyriešený.";
  if (outcome.type === "loss") {
    if (outcome.reason === "white_mated") {
      return "Prehra — váš kráľ je v mat. Cieľ úlohy ste nesplnili.";
    }
    return "Prehra — mat na doske, ale cieľ úlohy nie je splnený.";
  }
  if (outcome.reason === "insufficient_material") {
    return "Remíza — na doske zostal nedostatočný materiál na mat (napr. kráľ proti kráľovi). Cieľ úlohy nie je splnený.";
  }
  if (outcome.reason === "stalemate") {
    return "Remíza — pat. Cieľ úlohy nie je splnený.";
  }
  if (outcome.reason === "threefold") {
    return "Remíza — trojnásobné opakovanie pozície. Cieľ úlohy nie je splnený.";
  }
  if (outcome.reason === "fifty_move") {
    return "Remíza — pravidlo 50 ťahov. Cieľ úlohy nie je splnený.";
  }
  return "Remíza — partie skončila remízou. Cieľ úlohy nie je splnený.";
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

/** Kľúč pozície (figúry + na ťahu) — ignoruje počítadlo pol-ťahov. */
export function positionKey(fen) {
  var parts = String(fen || "").split(" ");
  return parts[0] + " " + (parts[1] || "w");
}

function mainBotChoice(step) {
  var choices = (step && step.choices) || [];
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].main) return choices[i];
  }
  return choices[0] || null;
}

/** Mapa pozícií (pred ťahom bota) → krok bota z hlavnej línie riešenia. */
export function buildSolutionBotMap(puzzle) {
  var map = Object.create(null);
  if (!puzzle || !puzzle.fen) return map;
  var sim = new Chess(puzzle.fen);

  function consume(steps) {
    if (!steps || !steps.length) return;
    for (var i = 0; i < steps.length; i++) {
      var step = steps[i];
      if (step.who === "bot") {
        map[positionKey(sim.fen())] = step;
        var main = mainBotChoice(step);
        if (!main || !main.move) return;
        var applied = sim.move({
          from: main.move.from,
          to: main.move.to,
          promotion: main.move.promotion,
        });
        if (!applied) return;
        if (main.then && main.then.length) consume(main.then);
        return;
      }
      var um = step.suggest || step.move;
      if (!um) return;
      if (
        !sim.move({
          from: um.from,
          to: um.to,
          promotion: um.promotion,
        })
      ) {
        return;
      }
    }
  }

  consume(puzzle.play || []);
  return map;
}

/** Na pozícii z hlavnej línie zahrá obranu zo skriptu (nie náhodný super-bot). */
export function pickCatalogBlackMove(chess, puzzle, botMap) {
  if (!chess || chess.turn() !== "b") return null;
  botMap = botMap || buildSolutionBotMap(puzzle);
  var step = botMap[positionKey(chess.fen())];
  if (!step) return null;

  var choices = filterSoundBotChoices(chess, step, puzzle);
  if (!choices.length) return null;

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].main) {
      return {
        move: choices[i].move,
        hint: choices[i].hint || "Počítač odohral hlavnú obranu — pokračujte podľa plánu.",
        fromScript: true,
      };
    }
  }

  var pick = choices[0];
  return {
    move: pick.move,
    hint: pick.hint || "Počítač odohral obranu — pokračujte.",
    fromScript: true,
  };
}

function probeBlackMove(chess, move) {
  var probe = new Chess(chess.fen());
  var applied = probe.move({
    from: move.from,
    to: move.to,
    promotion: move.promotion,
  });
  if (!applied) return null;
  return probe;
}

var CAPTURE_SCORE = { q: 90, r: 55, n: 35, b: 35, p: 12, k: 0 };

/** Bodovanie čierneho ťahu: super-bot — šach a útok majú absolútnu prioritu. */
export function scoreBlackMoveAggression(chess, move, winType) {
  var probe = probeBlackMove(chess, move);
  if (!probe) return -1000;

  var isCheck = probe.isCheck();
  var score = 0;
  if (isCheck) score += 520;
  if (move.captured) score += CAPTURE_SCORE[move.captured] || 8;
  if (isCheck && move.captured) score += 80;
  if (move.san && move.san.indexOf("+") >= 0) score += 25;
  if (move.san && move.san.indexOf("x") >= 0) score += 10;

  var fromPiece = chess.get(move.from);
  if (fromPiece && fromPiece.type === "k" && !move.captured && !isCheck) {
    score -= 120;
  }
  if (!isCheck && !move.captured) {
    score -= 35;
  }

  if (whiteCanReachGoal(probe, winType)) score += 60;
  else if (hasWhiteMateInOne(probe)) score += 25;
  else score -= 800;

  return score;
}

function moveGivesCheck(chess, move) {
  var probe = probeBlackMove(chess, move);
  return probe ? probe.isCheck() : false;
}

/** Najsilnejší legálny čierny ťah — vždy šach, ak existuje a biely môže stále vyhrať. */
export function pickEngagedBlackMove(chess, puzzle) {
  var win = puzzle.win;
  var moves = chess.moves({ verbose: true });
  if (!moves.length) return null;

  var ranked = moves
    .map(function (m) {
      return {
        move: m,
        score: scoreBlackMoveAggression(chess, m, win),
        isCheck: moveGivesCheck(chess, m),
      };
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

  var checks = pool.filter(function (r) {
    return r.isCheck;
  });
  if (checks.length) pool = checks;

  var pick = pool[0].move;
  var probe = probeBlackMove(chess, pick);
  var aggressive = (probe && probe.isCheck()) || !!pick.captured;

  return {
    move: { from: pick.from, to: pick.to, promotion: pick.promotion },
    aggressive: aggressive,
    isCheck: probe ? probe.isCheck() : false,
    captured: pick.captured || null,
  };
}

function engagedBotHint(result) {
  if (!result) return "Počítač odohral ťah — pokračujte bielym.";
  if (result.isCheck && result.captured) {
    return "♟ Šach! Počítač berie figúru — bráňte kráľa bielym.";
  }
  if (result.isCheck) return "♟ Šach! Počítač tlačí na vášho kráľa — pokračujte bielym.";
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

/** Z viacerých zvukových vetiev v dátach vyberie najagresívnejšiu (šach má prednosť). */
export function pickMostEngagedBotChoice(chess, choices, puzzle) {
  if (!choices || !choices.length) return null;
  if (choices.length === 1) return choices[0];

  var viable = [];
  for (var v = 0; v < choices.length; v++) {
    var ch0 = choices[v];
    if (!ch0 || !ch0.move || ch0.fail) continue;
    viable.push(ch0);
  }
  if (!viable.length) return choices[0];

  var checking = viable.filter(function (ch) {
    return moveGivesCheck(chess, ch.move);
  });
  var pool = checking.length ? checking : viable;

  var best = pool[0];
  var bestScore = -Infinity;
  for (var i = 0; i < pool.length; i++) {
    var ch = pool[i];
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
