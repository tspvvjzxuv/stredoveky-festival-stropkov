/**
 * Jednoduchý minimax motor pre malé taktické pozície (hlavolamy).
 * Používa rovnakú logiku ťahov ako chess.js / Chessground.
 */

var PIECE_VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

function evaluatePosition(chess) {
  if (chess.isCheckmate()) {
    return chess.turn() === "w" ? -99999 : 99999;
  }
  if (chess.isStalemate() || chess.isDraw()) return 0;

  var board = chess.board();
  var score = 0;
  for (var r = 0; r < board.length; r++) {
    for (var c = 0; c < board[r].length; c++) {
      var piece = board[r][c];
      if (!piece) continue;
      var v = PIECE_VAL[piece.type] || 0;
      score += piece.color === "w" ? v : -v;
    }
  }
  if (chess.isCheck()) {
    score += chess.turn() === "w" ? -18 : 18;
  }
  return chess.turn() === "w" ? score : -score;
}

function negamax(chess, depth, alpha, beta) {
  if (depth === 0 || chess.isGameOver()) {
    return evaluatePosition(chess);
  }

  var moves = chess.moves({ verbose: true });
  var best = -Infinity;

  for (var i = 0; i < moves.length; i++) {
    chess.move(moves[i]);
    var score = -negamax(chess, depth - 1, -beta, -alpha);
    chess.undo();
    if (score > best) best = score;
    if (score > alpha) alpha = score;
    if (alpha >= beta) break;
  }

  return best;
}

export function findStrongMove(chess, depth) {
  if (!chess || chess.isGameOver()) return null;
  var moves = chess.moves({ verbose: true });
  if (!moves.length) return null;

  var i;
  for (i = 0; i < moves.length; i++) {
    chess.move(moves[i]);
    if (chess.isCheckmate()) {
      var mateMove = moves[i];
      chess.undo();
      return mateMove;
    }
    chess.undo();
  }

  var maxDepth = depth || 6;
  var bestMove = null;
  var bestScore = -Infinity;

  for (var j = 0; j < moves.length; j++) {
    chess.move(moves[j]);
    var score = -negamax(chess, maxDepth - 1, -Infinity, Infinity);
    chess.undo();
    if (score > bestScore) {
      bestScore = score;
      bestMove = moves[j];
    }
  }

  return bestMove;
}

export function movesMatch(a, b) {
  if (!a || !b) return false;
  return a.from === b.from && a.to === b.to && (a.promotion || "q") === (b.promotion || "q");
}
