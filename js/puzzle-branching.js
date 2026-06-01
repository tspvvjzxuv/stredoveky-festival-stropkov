import { Chessground } from "./vendor/chessground/chessground.js";
import { Chess } from "./vendor/chess.mjs";
import { movesMatch } from "./puzzle-engine.js";
import { createWrongMoveOverlay } from "./puzzle-wrong-move-ui.js";
import { isPuzzleRewardUnlocked } from "./puzzle-rewards.js";

function normalizeBranching(raw) {
  if (!raw) return null;
  return {
    opening: raw.white_open || raw.opening,
    blackResponses: raw.black_replies || raw.blackResponses || [],
    defaultReply: raw.default_reply || raw.defaultReply || null,
    allowAnyBlack: raw.allowAnyBlack !== false,
    unknownBlackMessage: raw.unknownBlackMessage || null,
    winCheck: raw.winCheck || null,
  };
}

function branchWinsOnFinish(branch) {
  if (!branch) return false;
  if (branch.winsOnFinish === false) return false;
  if (branch.correct === false) return false;
  return branch.winsOnFinish === true || branch.correct === true;
}

function branchFinish(branch) {
  if (!branch) return null;
  return branch.white_finish || branch.whiteFinish || null;
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

  var branching = normalizeBranching(puzzle.branching);
  var title = document.getElementById(puzzle.id + "-title");
  var subtitle = document.getElementById(puzzle.id + "-subtitle");
  if (title && puzzle.title) title.textContent = puzzle.title;
  var baseSubtitle = puzzle.subtitle || "";
  if (subtitle && baseSubtitle) subtitle.textContent = baseSubtitle;
  if (puzzle.ariaLabel) el.setAttribute("aria-label", puzzle.ariaLabel);

  var chess = new Chess(puzzle.fen);
  var startFen = puzzle.fen;
  var busy = false;
  var phase = "white_open";
  var mistakes = 0;
  var activeBlack = null;
  var activeFinish = null;
  var wrongMoveUi = createWrongMoveOverlay(el);
  var branchSolveNotified = isPuzzleRewardUnlocked(puzzle.id);

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

  function afterMove(orig, dest) {
    onUserMove(ground, orig, dest);
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
        events: { after: afterMove },
      },
      drawable: { enabled: true },
    });
    setSubtitle(extra);
    var solved = isBranchingWin(chess, puzzle, phase);
    if (solved) phase = "done";
    helpers.setCompletionUI(puzzle.id, solved);
    if (solved) {
      wrongMoveUi.hide();
      if (!branchSolveNotified) {
        branchSolveNotified = true;
        helpers.notifyPuzzleSolved(puzzle.id, { firstTry: mistakes === 0 });
      }
    }
  }

  function registerMistake() {
    mistakes += 1;
  }

  function clearBlackBranch() {
    activeBlack = null;
    activeFinish = null;
  }

  function retryWrongMove(ground) {
    if (phase === "white_finish") {
      if (chess.history().length > 0) chess.undo();
      wrongMoveUi.hide();
      applyState(ground);
      return;
    }
    wrongMoveUi.hide();
    applyState(ground);
  }

  function stepBackPhase(ground) {
    wrongMoveUi.hide();
    if (phase === "white_finish") {
      if (chess.history().length > 0) chess.undo();
      clearBlackBranch();
      phase = "black_reply";
    } else if (phase === "black_reply") {
      if (chess.history().length > 0) chess.undo();
      phase = "white_open";
      clearBlackBranch();
    } else {
      resetBoard();
      return;
    }
    applyState(ground);
  }

  function showWrongMoveOptions(ground, options) {
    wrongMoveUi.show({
      showStepBack: options.showStepBack,
      onRetry: function () {
        retryWrongMove(ground);
      },
      onStepBack: function () {
        stepBackPhase(ground);
      },
    });
  }

  function activateBlackBranch(ground, branch, fallbackMessage) {
    activeBlack = branch;
    activeFinish = branchFinish(branch);
    phase = "white_finish";
    wrongMoveUi.hide();
    applyState(ground, branch.message || fallbackMessage);
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
        showWrongMoveOptions(ground, { showStepBack: false });
        return;
      }
      if (!chess.move(attempted)) {
        applyState(ground);
        return;
      }
      phase = "black_reply";
      wrongMoveUi.hide();
      applyState(ground, "✅ Správny úvodný ťah. Teraz zahrajte čiernu obranu.");
      return;
    }

    if (phase === "black_reply") {
      if (!chess.move(attempted)) {
        applyState(ground);
        return;
      }

      var known = findBlackResponse(branching, attempted);
      if (known) {
        activateBlackBranch(ground, known);
        return;
      }

      if (!branching.allowAnyBlack) {
        chess.undo();
        registerMistake();
        applyState(
          ground,
          branching.unknownBlackMessage || "⚠️ Tento čierny ťah nie je v riešení."
        );
        showWrongMoveOptions(ground, { showStepBack: true });
        return;
      }

      var fallback = branching.defaultReply || {};
      activateBlackBranch(ground, {
        move: attempted,
        winsOnFinish: false,
        message:
          fallback.message ||
          branching.unknownBlackMessage ||
          "⚠️ Iná čierna obrana. Skúste bielym dokončiť.",
        white_finish: fallback.white_finish || fallback.whiteFinish || {
          wrongMessage:
            branching.unknownBlackMessage ||
            "⚠️ Táto vetva nezodpovedá vzorovému riešeniu.",
        },
      });
      return;
    }

    if (phase === "white_finish") {
      if (!chess.move(attempted)) {
        applyState(ground);
        return;
      }

      var wins = branchWinsOnFinish(activeBlack);
      var finish = activeFinish;

      if (wins && finish && finish.move && movesMatch(attempted, finish.move)) {
        phase = "done";
        wrongMoveUi.hide();
        var winMsg = isBranchingWin(chess, puzzle, phase)
          ? "✅ Výborne! Hlavolam je vyriešený."
          : "✅ Ťah bol zahraný — skontrolujte pozíciu.";
        applyState(ground, winMsg);
        return;
      }

      registerMistake();
      var wrongMsg =
        (finish && finish.wrongMessage) ||
        (activeBlack && activeBlack.message) ||
        "⚠️ Týmto ťahom úlohu nedokončíte.";
      applyState(ground, wrongMsg);
      showWrongMoveOptions(ground, { showStepBack: true });
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
      events: { after: afterMove },
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
    clearBlackBranch();
    wrongMoveUi.hide();
    chess.reset();
    chess.load(startFen);
    applyState(ground);
  }

  applyState(ground);
  helpers.wireControls(puzzle, { resetBoard: resetBoard });
}
