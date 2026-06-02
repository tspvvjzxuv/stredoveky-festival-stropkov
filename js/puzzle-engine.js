/** Spoločná logika porovnávania ťahov a cieľov pre hlavolamy. */
import { Chess } from "./vendor/chess.mjs";

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

function materialScore(chess) {
  var v = { p: 1, n: 3, b: 3, r: 5, q: 9 };
  var s = 0;
  var board = chess.board();
  for (var r = 0; r < board.length; r++) {
    for (var c = 0; c < board[r].length; c++) {
      var piece = board[r][c];
      if (piece) s += (piece.color === "w" ? 1 : -1) * v[piece.type];
    }
  }
  return s;
}

export function opponentColor(playerColor) {
  return playerColor === "b" ? "w" : "b";
}

export function playerColorFromPuzzle(puzzle) {
  if (puzzle && (puzzle.playerColor === "w" || puzzle.playerColor === "b")) {
    return puzzle.playerColor;
  }
  var parts = String((puzzle && puzzle.fen) || "").split(" ");
  return parts[1] === "b" ? "b" : "w";
}

export function groundColor(chessColor) {
  return chessColor === "b" ? "black" : "white";
}

function whiteQueenOnBoard(chess) {
  var board = chess.board();
  for (var r = 0; r < board.length; r++) {
    for (var c = 0; c < board[r].length; c++) {
      var piece = board[r][c];
      if (piece && piece.type === "q" && piece.color === "w") return true;
    }
  }
  return false;
}

function isDecisiveForWhite(chess) {
  if (chess.isCheckmate() && chess.turn() === "b") return true;
  if (!blackQueenOnBoard(chess)) return true;
  return materialScore(chess) >= 5;
}

function isDecisiveForBlack(chess) {
  if (chess.isCheckmate() && chess.turn() === "w") return true;
  if (!whiteQueenOnBoard(chess)) return true;
  return materialScore(chess) <= -5;
}

export function isDecisiveForPlayer(chess, playerColor) {
  return playerColor === "b" ? isDecisiveForBlack(chess) : isDecisiveForWhite(chess);
}

export function isPuzzleWinPosition(chess, winType, playerColor) {
  var pc = playerColor || "w";
  if (winType === "black_queen_captured") return !blackQueenOnBoard(chess);
  if (winType === "decisive") return isDecisiveForPlayer(chess, pc);
  return chess.isCheckmate() && chess.turn() === opponentColor(pc);
}

/** Výsledok partie mimo skriptu (voľná hra / flex): výhra, remíza alebo prehra. */
export function detectTerminalOutcome(chess, puzzle) {
  if (!chess || !puzzle) return null;
  var pc = playerColorFromPuzzle(puzzle);
  if (isPuzzleWinPosition(chess, puzzle.win, pc)) {
    return { type: "win" };
  }
  if (!chess.isGameOver()) return null;

  if (chess.isCheckmate()) {
    if (chess.turn() === pc) {
      return { type: "loss", reason: "player_mated" };
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
    if (outcome.reason === "player_mated" || outcome.reason === "white_mated") {
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

export function hasPlayerMateInOne(chess, playerColor) {
  var pc = playerColor || "w";
  if (chess.turn() !== pc || chess.isGameOver()) return false;
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

export function hasWhiteMateInOne(chess) {
  return hasPlayerMateInOne(chess, "w");
}

/** Môže hráč jedným ťahom splniť cieľ úlohy z aktuálnej pozície? */
export function playerCanReachGoal(chess, winType, playerColor) {
  var pc = playerColor || "w";
  if (chess.turn() !== pc || chess.isGameOver()) return false;
  if (isPuzzleWinPosition(chess, winType, pc)) return true;
  var moves = chess.moves({ verbose: true });
  for (var i = 0; i < moves.length; i++) {
    var clone = new Chess(chess.fen());
    clone.move({
      from: moves[i].from,
      to: moves[i].to,
      promotion: moves[i].promotion,
    });
    if (isPuzzleWinPosition(clone, winType, pc)) return true;
  }
  return false;
}

/** @deprecated Použite playerCanReachGoal — zachované pre skripty. */
export function whiteCanReachGoal(chess, winType) {
  return playerCanReachGoal(chess, winType, "w");
}

function applyChoiceMove(chess, choice) {
  if (!choice || !choice.move) return false;
  var bm = { from: choice.move.from, to: choice.move.to };
  if (choice.move.promotion) bm.promotion = choice.move.promotion;
  return !!chess.move(bm);
}

function applyScriptUserStep(chess, step, winType, playerColor) {
  if (!step || step.fail) return false;
  if (
    step.accept === "checkmate" ||
    step.accept === "black_queen_captured" ||
    step.accept === "decisive"
  ) {
    var moves = chess.moves({ verbose: true });
    for (var i = 0; i < moves.length; i++) {
      var clone = new Chess(chess.fen());
      clone.move({
        from: moves[i].from,
        to: moves[i].to,
        promotion: moves[i].promotion,
      });
      if (isPuzzleWinPosition(clone, winType, playerColor)) {
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
export function walkScriptToWin(chess, steps, winType, playerColor) {
  var pc = playerColor || "w";
  if (!steps || !steps.length) return isPuzzleWinPosition(chess, winType, pc);
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    if (step.who === "user") {
      if (!applyScriptUserStep(chess, step, winType, pc)) return false;
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
      return walkScriptToWin(chess, pick.then || [], winType, pc);
    }
    return false;
  }
  return isPuzzleWinPosition(chess, winType, pc);
}

/** Po ťahu súpera môže hráč dosiahnuť cieľ (hned alebo podľa skriptu v `then`). */
export function isSoundBotChoice(chess, choice, puzzle) {
  if (!choice || choice.fail) return false;
  var pc = playerColorFromPuzzle(puzzle);
  var probe = new Chess(chess.fen());
  if (!applyChoiceMove(probe, choice)) return false;
  if (choice.then && choice.then.length) {
    return walkScriptToWin(probe, choice.then, puzzle.win, pc);
  }
  return playerCanReachGoal(probe, puzzle.win, pc);
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

/** Na pozícii z hlavnej línie zahrá ťah súpera zo skriptu (nie náhodný super-bot). */
export function pickCatalogOpponentMove(chess, puzzle, botMap) {
  var pc = playerColorFromPuzzle(puzzle);
  if (!chess || chess.turn() !== opponentColor(pc)) return null;
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

/** @deprecated alias */
export function pickCatalogBlackMove(chess, puzzle, botMap) {
  return pickCatalogOpponentMove(chess, puzzle, botMap);
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

/** Bodovanie ťahu súpera: šach a útok majú prioritu, ak hráč stále vyhráva. */
export function scoreOpponentMoveAggression(chess, move, winType, playerColor) {
  var pc = playerColor || "w";
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

  if (playerCanReachGoal(probe, winType, pc)) score += 60;
  else if (hasPlayerMateInOne(probe, pc)) score += 25;
  else score -= 800;

  return score;
}

export function scoreBlackMoveAggression(chess, move, winType) {
  return scoreOpponentMoveAggression(chess, move, winType, "w");
}

function moveGivesCheck(chess, move) {
  var probe = probeBlackMove(chess, move);
  return probe ? probe.isCheck() : false;
}

/** Najsilnejší legálny ťah súpera — šach má prednosť, ak hráč stále dosiahne cieľ. */
export function pickEngagedOpponentMove(chess, puzzle) {
  var win = puzzle.win;
  var pc = playerColorFromPuzzle(puzzle);
  if (chess.turn() !== opponentColor(pc)) return null;
  var moves = chess.moves({ verbose: true });
  if (!moves.length) return null;

  var ranked = moves
    .map(function (m) {
      return {
        move: m,
        score: scoreOpponentMoveAggression(chess, m, win, pc),
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

function engagedBotHint(result, playerColor) {
  var side = playerColor === "b" ? "čiernym" : "bielym";
  if (!result) return "Počítač odohral ťah — pokračujte " + side + ".";
  if (result.isCheck && result.captured) {
    return "♟ Šach! Počítač berie figúru — bráňte kráľa (" + side + ").";
  }
  if (result.isCheck) return "♟ Šach! Počítač tlačí na kráľa — pokračujte " + side + ".";
  if (result.captured) return "Počítač zobral figúru — pokračujte " + side + ".";
  if (result.aggressive) return "Počítač útočí — pokračujte " + side + ".";
  return "Počítač odohral ťah — pokračujte " + side + ".";
}

/** Záloha / flex: aktívna odpoveď súpera, po ktorej hráč stále dosiahne cieľ. */
export function pickFlexSoundBotMove(chess, puzzle) {
  var pc = playerColorFromPuzzle(puzzle);
  var engaged = pickEngagedOpponentMove(chess, puzzle);
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
    hint: engagedBotHint(engaged, pc),
  };
}

export function pickEngagedBlackMove(chess, puzzle) {
  return pickEngagedOpponentMove(chess, puzzle);
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
    var score = scoreOpponentMoveAggression(
      chess,
      fakeMove,
      puzzle.win,
      playerColorFromPuzzle(puzzle)
    );
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
export function isMateInTwoOpening(fen, moveShape, playerColor) {
  var pc = playerColor || "w";
  var opp = opponentColor(pc);
  var start = new Chess(fen);
  if (start.turn() !== pc) return false;
  var applied = start.move({
    from: moveShape.from,
    to: moveShape.to,
    promotion: moveShape.promotion,
  });
  if (!applied) return false;
  var oppMoves = start.moves();
  for (var i = 0; i < oppMoves.length; i++) {
    var afterOpp = new Chess(start.fen());
    afterOpp.move(oppMoves[i]);
    if (hasPlayerMateInOne(afterOpp, pc)) return true;
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
  var pc = playerColorFromPuzzle(puzzle);
  var opp = opponentColor(pc);

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

  if (isPuzzleWinPosition(trial, puzzle.win, pc)) {
    return { ok: true, mode: "goal", goal: "win" };
  }

  var accept = step.accept;
  if (accept === "checkmate" && trial.isCheckmate() && trial.turn() === opp) {
    return { ok: true, mode: "goal", goal: "checkmate" };
  }
  if (accept === "check" && trial.isCheck()) {
    return { ok: true, mode: "goal", goal: "check" };
  }
  if (accept === "mate_in_2_opening" && isMateInTwoOpening(fen, attempted, pc)) {
    return { ok: true, mode: "goal", goal: "mate_in_2_opening" };
  }
  if (accept === "black_queen_captured" && !blackQueenOnBoard(trial)) {
    return { ok: true, mode: "goal", goal: "black_queen_captured" };
  }
  if (accept === "decisive" && isDecisiveForPlayer(trial, pc)) {
    return { ok: true, mode: "goal", goal: "decisive" };
  }

  if (step.allowMaintainWin && playerCanReachGoal(trial, puzzle.win, pc)) {
    return { ok: true, mode: "goal", goal: "maintain_win" };
  }

  if (!accept && !step.move && puzzle.win === "checkmate") {
    if (trial.isCheckmate() && trial.turn() === opp) {
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

var ALL_SQUARES = [
  "a1","b1","c1","d1","e1","f1","g1","h1",
  "a2","b2","c2","d2","e2","f2","g2","h2",
  "a3","b3","c3","d3","e3","f3","g3","h3",
  "a4","b4","c4","d4","e4","f4","g4","h4",
  "a5","b5","c5","d5","e5","f5","g5","h5",
  "a6","b6","c6","d6","e6","f6","g6","h6",
  "a7","b7","c7","d7","e7","f7","g7","h7",
  "a8","b8","c8","d8","e8","f8","g8","h8",
];

export function buildChessgroundDests(chess) {
  var dests = new Map();
  for (var i = 0; i < ALL_SQUARES.length; i++) {
    var sq = ALL_SQUARES[i];
    var moves = chess.moves({ square: sq, verbose: true });
    if (!moves || !moves.length) continue;
    var to = [];
    for (var j = 0; j < moves.length; j++) to.push(moves[j].to);
    dests.set(sq, to);
  }
  return dests;
}

export function pickBotStepChoice(step, chess, puzzle) {
  var choices = filterSoundBotChoices(chess, step, puzzle);
  if (!choices.length) {
    var flex = pickFlexSoundBotMove(chess, puzzle);
    if (flex) return flex;
    if (step.pick === "main" || step.pick === "preferred") {
      for (var j = 0; j < (step.choices || []).length; j++) {
        if (step.choices[j].main || step.choices[j].preferred) return step.choices[j];
      }
    }
    return (step.choices && step.choices[0]) || null;
  }

  if (step.pick === "flex") return pickFlexSoundBotMove(chess, puzzle);

  if (step.pick === "main" || step.pick === "preferred") {
    for (var m = 0; m < choices.length; m++) {
      if (choices[m].main || choices[m].preferred) return choices[m];
    }
    return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[0];
  }

  if (step.pick === "random") {
    return (
      pickMostEngagedBotChoice(chess, choices, puzzle) ||
      choices[Math.floor(Math.random() * choices.length)]
    );
  }

  return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[0];
}
