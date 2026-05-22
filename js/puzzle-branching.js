import { Chessground } from "https://cdn.jsdelivr.net/npm/@lichess-org/chessground@10.1.1/dist/chessground.js";
import { Chess } from "https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm";
import { findStrongMove, movesMatch } from "./puzzle-engine.js";

function moveKey(move) {
  if (!move) return "";
  return move.from + "-" + move.to;
}

function findBlackResponse(branching, move) {
  var list = branching.blackResponses || [];
  for (var i = 0; i < list.length; i++) {
    if (movesMatch(move, list[i].move)) return list[i];
  }
  return null;
}

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

function isBranchingWin(chess, puzzle, phase) {
  if (phase !== "white_finish" && phase !== "done") return false;
  var winCheck = puzzle.branching && puzzle.branching.winCheck;
  if (winCheck === "black_queen_captured") {
    return !blackQueenOnBoard(chess);
  }
  return chess.isCheckmate() && chess.turn() === "b";
}

export function mountBranchingPuzzle(puzzle, helpers) {
  var el = document.getElementById(puzzle.id);
  if (!el) return;

  var branching = puzzle.branching;
  var title = document.getElementById(puzzle.id + "-title");
  var subtitle = document.getElementById(puzzle.id + "-subtitle");
  if (title && puzzle.title) title.textContent = puzzle.title;
  var baseSubtitle = puzzle.subtitle || "";
  if (subtitle && baseSubtitle) subtitle.textContent = baseSubtitle;
  if (puzzle.ariaLabel) el.setAttribute("aria-label", puzzle.ariaLabel);

  var chess = new Chess(puzzle.fen);
  var startFen = puzzle.fen;
  var engineDepth = puzzle.engineDepth || 6;
  var busy = false;
  var phase = "white_open";
  var mistakes = 0;
  var activeBlack = null;
  var activeFinish = null;

  function setSubtitle(extra) {
    if (!subtitle) return;
    var turn = chess.turn() === "w" ? "Na ťahu biely." : "Na ťahu čierny (vy).";
    var phaseHint =
      phase === "white_open"
        ? "1. biely ťah"
        : phase === "black_reply"
          ? "2. čierna obrana"
          : phase === "white_finish"
            ? "3. biely dokončovací ťah"
            : "Hotovo";
    subtitle.textContent =
      baseSubtitle + " | " + phaseHint + " | " + turn + (extra ? " " + extra : "");
  }

  function userMovableColor() {
    if (busy || chess.isGameOver()) return null;
    if (phase === "black_reply") return "black";
    if (phase === "white_open" || phase === "white_finish") return "white";
    return null;
  }

  function applyState(ground, extra) {
    var color = userMovableColor();
    ground.set({
      fen: chess.fen(),
      turnColor: chess.turn() === "w" ? "white" : "black",
      movable: {
        free: false,
        color: color,
        showDests: true,
        dests: color ? helpers.buildDests(chess) : new Map(),
      },
      drawable: { enabled: true },
    });
    setSubtitle(extra);
    var solved = isBranchingWin(chess, puzzle, phase);
    if (solved) phase = "done";
    helpers.setCompletionUI(puzzle.id, solved);
    if (solved) {
      helpers.notifyPuzzleSolved(puzzle.id, { firstTry: mistakes === 0 });
    }
    helpers.updateActionButtons(puzzle.id, busy, chess.isGameOver(), expectedMove());
  }

  function expectedMove() {
    if (phase === "white_open") return branching.opening.move;
    if (phase === "black_reply") {
      var list = branching.blackResponses || [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].correct) return list[i].move;
      }
      return null;
    }
    if (phase === "white_finish" && activeFinish) return activeFinish.move;
    return null;
  }

  function registerMistake() {
    mistakes += 1;
  }

  function onUserMove(ground, orig, dest) {
    if (busy || !orig || !dest) {
      applyState(ground);
      return;
    }

    var attempted = { from: orig, to: dest, promotion: "q" };

    if (phase === "white_open") {
      if (!movesMatch(attempted, branching.opening.move)) {
        registerMistake();
        applyState(ground, branching.opening.wrongMessage);
        return;
      }
      if (!chess.move(attempted)) {
        applyState(ground);
        return;
      }
      phase = "black_reply";
      helpers.clearHintShape(ground);
      applyState(ground, "✅ Správny úvodný ťah. Teraz zahrajte čiernu obranu.");
      return;
    }

    if (phase === "black_reply") {
      if (!chess.move(attempted)) {
        applyState(ground);
        return;
      }

      var known = findBlackResponse(branching, attempted);
      if (!known && !branching.allowAnyBlack) {
        chess.undo();
        registerMistake();
        applyState(ground, branching.unknownBlackMessage);
        return;
      }

      if (known && known.correct) {
        activeBlack = known;
        activeFinish = known.whiteFinish;
        phase = "white_finish";
        applyState(ground, known.message);
        return;
      }

      registerMistake();
      activeBlack = known || null;
      activeFinish = null;
      phase = "white_finish";
      var msg = known
        ? known.message
        : branching.unknownBlackMessage || "⚠️ Iná čierna obrana.";
      applyState(ground, msg);
      return;
    }

    if (phase === "white_finish") {
      if (!activeFinish || !activeFinish.move) {
        registerMistake();
        applyState(
          ground,
          "⚠️ Táto vetva nemá jednoznačné dokončenie — resetnite a skúste Qe1+ Kh8 Qe8# (úloha 2) alebo Rc8+ Qf8 Rxf8 (úloha 3)."
        );
        return;
      }
      if (!movesMatch(attempted, activeFinish.move)) {
        registerMistake();
        applyState(ground, activeFinish.wrongMessage);
        return;
      }
      if (!chess.move(attempted)) {
        applyState(ground);
        return;
      }
      phase = "done";
      helpers.clearHintShape(ground);
      var winMsg = isBranchingWin(chess, puzzle, phase)
        ? "✅ Výborne! Hlavolam je vyriešený."
        : "✅ Ťah bol zahraný — skontrolujte pozíciu.";
      applyState(ground, winMsg);
      return;
    }

    applyState(ground);
  }

  var ground = Chessground(el, {
    fen: chess.fen(),
    orientation: "white",
    coordinates: true,
    viewOnly: false,
    selectable: { enabled: true },
    draggable: { enabled: true, showGhost: true },
    movable: {
      free: false,
      color: "white",
      showDests: true,
      dests: helpers.buildDests(chess),
      events: {
        after: function (orig, dest) {
          onUserMove(ground, orig, dest);
        },
      },
    },
    premovable: { enabled: false },
    drawable: { enabled: true, visible: true },
    highlight: { lastMove: true, check: true },
    animation: { enabled: true },
  });

  function resetBoard() {
    busy = false;
    phase = "white_open";
    mistakes = 0;
    activeBlack = null;
    activeFinish = null;
    chess.reset();
    chess.load(startFen);
    helpers.clearHintShape(ground);
    applyState(ground);
  }

  applyState(ground);

  helpers.wireControls(puzzle, {
    resetBoard: resetBoard,
    expectedMove: expectedMove,
    isBusy: function () {
      return busy;
    },
    isGameOver: function () {
      return chess.isGameOver();
    },
    clearHintShape: function () {
      helpers.clearHintShape(ground);
    },
    showHintShape: function (move) {
      helpers.showHintShape(ground, move);
    },
    onHint: function (move) {
      setSubtitle("💡 Nápoveda: " + helpers.formatMoveHint(move));
    },
    onCoach: function (move) {
      if (busy || chess.isGameOver()) return;
      helpers.clearHintShape(ground);
      if (phase === "white_open" && movesMatch(move, branching.opening.move)) {
        chess.move(move);
        phase = "black_reply";
        applyState(ground, "🎓 Tréner: úvodný ťah.");
        return;
      }
      if (phase === "black_reply") {
        var known = findBlackResponse(branching, move);
        if (!known || !known.correct) return;
        chess.move(move);
        activeBlack = known;
        activeFinish = known.whiteFinish;
        phase = "white_finish";
        applyState(ground, "🎓 Tréner: vzorová čierna obrana.");
        return;
      }
      if (phase === "white_finish" && activeFinish && movesMatch(move, activeFinish.move)) {
        chess.move(move);
        phase = "done";
        applyState(ground, "🎓 Tréner: dokončovací ťah.");
      }
    },
    onEngine: function (engineBtn) {
      if (busy || chess.isGameOver()) return;
      busy = true;
      helpers.updateActionButtons(puzzle.id, busy, chess.isGameOver(), !!expectedMove());
      engineBtn.disabled = true;
      setSubtitle("⏳ Silný motor počíta najlepší ťah…");
      window.setTimeout(function () {
        var best = findStrongMove(chess, engineDepth);
        busy = false;
        if (!best) {
          applyState(ground, "Motor nenašiel ťah.");
          return;
        }
        helpers.clearHintShape(ground);
        chess.move(best);
        if (phase === "white_open") {
          phase = "black_reply";
        } else if (phase === "black_reply") {
          var resp = findBlackResponse(branching, best);
          if (resp && resp.correct) {
            activeBlack = resp;
            activeFinish = resp.whiteFinish;
            phase = "white_finish";
          } else {
            registerMistake();
            phase = "white_finish";
          }
        } else if (phase === "white_finish" && activeFinish && movesMatch(best, activeFinish.move)) {
          phase = "done";
        }
        applyState(ground, "⚙️ Silný ťah (motor): " + best.san);
      }, 40);
    },
  });
}
