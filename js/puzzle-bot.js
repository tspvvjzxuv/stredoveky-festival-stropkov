import { Chessground } from "./vendor/chessground/chessground.js";
import { Chess } from "./vendor/chess.mjs";
import {
  moveFromBoard,
  evaluateUserStep,
  isPuzzleWinPosition,
  filterSoundBotChoices,
  pickFlexSoundBotMove,
  pickEngagedOpponentMove,
  pickMostEngagedBotChoice,
  detectTerminalOutcome,
  terminalOutcomeMessage,
  buildSolutionBotMap,
  pickCatalogOpponentMove,
  playerColorFromPuzzle,
  opponentColor,
  groundColor,
} from "./puzzle-engine.js";
import { createWrongMoveOverlay } from "./puzzle-wrong-move-ui.js";
import { syncChessBoardSize } from "./puzzle-board-size.js";

var DEFAULT_MAX_MISTAKES_OVERLAY = 8;

function isPuzzleWin(chess, winType, playerColor) {
  return isPuzzleWinPosition(chess, winType, playerColor);
}

function pickBotChoice(step, chess, puzzle) {
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

  if (step.pick === "flex") {
    return pickFlexSoundBotMove(chess, puzzle);
  }

  if (step.pick === "main" || step.pick === "preferred") {
    for (var m = 0; m < choices.length; m++) {
      if (choices[m].main || choices[m].preferred) return choices[m];
    }
    return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[0];
  }

  if (step.pick === "random") {
    return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[Math.floor(Math.random() * choices.length)];
  }

  return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[0];
}

function statusForTurn(chess, botThinking, playerColor) {
  var pc = playerColor || "w";
  var opp = opponentColor(pc);
  if (botThinking) return "Počítač premýšľa…";
  if (chess.isCheckmate()) {
    return chess.turn() === opp
      ? "Mat — hlavolam je vyriešený."
      : "Prehra — váš kráľ je v mat.";
  }
  if (chess.isDraw()) {
    if (chess.isInsufficientMaterial()) return "Remíza — nedostatočný materiál.";
    if (chess.isStalemate()) return "Remíza — pat.";
    return "Remíza.";
  }
  if (chess.isGameOver()) return "Koniec partie.";
  if (chess.isCheck()) return "Šach!";
  if (chess.turn() === pc) {
    return pc === "b" ? "Na ťahu ste ako čierny." : "Na ťahu ste ako biely.";
  }
  return "Ťah počítača…";
}

export function destroyPuzzleGround(boardEl) {
  if (!boardEl) return;
  var ground = boardEl._ptraChessground;
  if (ground && typeof ground.destroy === "function") {
    try {
      ground.destroy();
    } catch (e) {}
  }
  delete boardEl._ptraChessground;
  boardEl.classList.remove("cg-wrap", "orientation-white", "orientation-black", "manipulable");
  boardEl.innerHTML = "";
}

export function mountBotPuzzle(puzzle, helpers) {
  var el = document.getElementById(puzzle.id);
  if (!el) return;

  destroyPuzzleGround(el);
  syncChessBoardSize(el);

  var playerColor = playerColorFromPuzzle(puzzle);
  var opponent = opponentColor(playerColor);
  var boardOrientation = groundColor(playerColor);

  var subtitle = document.getElementById(puzzle.id + "-subtitle");
  var moveCounterEl = document.getElementById(puzzle.id + "-move-count");
  var attemptCounterEl = document.getElementById(puzzle.id + "-attempt-count");
  var baseSubtitle = puzzle.subtitle || "";
  if (puzzle.ariaLabel) el.setAttribute("aria-label", puzzle.ariaLabel);

  var maxMistakesOverlay =
    typeof puzzle.maxMistakesBeforeOverlay === "number"
      ? puzzle.maxMistakesBeforeOverlay
      : DEFAULT_MAX_MISTAKES_OVERLAY;

  var freePlay =
    puzzle.freePlay === true && typeof puzzle.maxMoves === "number" && puzzle.maxMoves > 0;
  var maxMoves = freePlay ? puzzle.maxMoves : null;
  var gameOver = false;

  var chess = new Chess(puzzle.fen);
  var startFen = puzzle.fen;
  var busy = false;
  /** Neúspešné pokusy (zlý ťah); krok späť / skúsiť znova ich nemení. */
  var attemptCount = 0;
  /** Platné bielé ťahy na doske v tejto partii; krok späť ich obnoví zo zásobníka. */
  var moveCount = 0;
  var activeSteps = puzzle.play || [];
  var stepIdx = 0;
  /** Po správnom „cieľovom“ ťahu (mat v 2, iný mat…) — bot a finiš podľa pozície, nie skriptu. */
  var flexPlay = false;
  /** Po odpovedi bota — „Skúsiť znova“ (iný finiš v tej istej obrane). */
  var retrySnapshot = {
    fen: puzzle.fen,
    stepIdx: 0,
    activeSteps: puzzle.play || [],
    moveCount: 0,
  };
  /** Zásobník po každom bielom/botom ťahu na doske — „Krok späť“. */
  var positionHistory = [];
  var solutionBotMap = buildSolutionBotMap(puzzle);
  var wrongMoveUi = createWrongMoveOverlay(el);

  function snapshotNow() {
    return {
      fen: chess.fen(),
      stepIdx: stepIdx,
      activeSteps: activeSteps,
      moveCount: moveCount,
    };
  }

  function applySnapshot(snap) {
    chess.load(snap.fen);
    stepIdx = snap.stepIdx;
    activeSteps = snap.activeSteps;
    moveCount = snap.moveCount;
  }

  function pushPositionHistory() {
    positionHistory.push(snapshotNow());
  }

  function saveRetrySnapshot() {
    retrySnapshot = snapshotNow();
  }

  /**
   * Krok späť: vrátiť pozíciu a počet bielych ťahov zo zásobníka (skutočný undo).
   * Počet pokusov (attemptCount) sa nemení.
   */
  function restoreStepBack(ground) {
    wrongMoveUi.hideBriefFeedback();
    wrongMoveUi.hideGameOver();
    gameOver = false;
    busy = false;

    if (!canRestoreStepBack()) {
      wrongMoveUi.hide();
      applyState(ground, "Krok späť nie je možný — ešte nebol odohraný ťah.");
      return;
    }

    var pops = chess.turn() === playerColor ? 2 : 1;
    while (pops > 0 && positionHistory.length > 1) {
      positionHistory.pop();
      pops -= 1;
    }
    applySnapshot(positionHistory[positionHistory.length - 1]);
    saveRetrySnapshot();
    wrongMoveUi.hide();
    applyState(ground, "Posledný ťah bol zrušený — pokračujte.");
  }

  function restoreRetryPosition(ground) {
    wrongMoveUi.hide();
    wrongMoveUi.hideBriefFeedback();
    applySnapshot(retrySnapshot);
    applyState(ground);
  }

  function flexUserStep() {
    var win = puzzle.win;
    return {
      who: "user",
      accept: win === "black_queen_captured" ? "black_queen_captured" : "checkmate",
      allowMaintainWin: true,
      wrong:
        win === "black_queen_captured"
          ? "Týmto ťahom nezoberiete dámu — skúste iný víťazný ťah."
          : "Týmto ťahom nedosiahnete cieľ — skúste iný ťah (mat alebo pokračovanie úlohy).",
    };
  }

  function flexBotStep() {
    return { who: "bot", pick: "flex" };
  }

  function enterFlexPlay() {
    flexPlay = true;
    syncFlexSteps();
  }

  function syncFlexSteps() {
    if (isPuzzleWin(chess, puzzle.win, playerColor)) {
      activeSteps = [];
      stepIdx = 0;
      return;
    }
    activeSteps = chess.turn() === opponent ? [flexBotStep()] : [flexUserStep()];
    stepIdx = 0;
  }

  function currentStep() {
    return activeSteps[stepIdx] || null;
  }

  function stepsDone() {
    return stepIdx >= activeSteps.length;
  }

  function updateCounters() {
    if (moveCounterEl) {
      moveCounterEl.classList.remove("sach-move-counter--warn", "sach-move-counter--danger");
      if (freePlay) {
        var remaining = Math.max(0, maxMoves - moveCount);
        moveCounterEl.textContent =
          "Ťahy: " + moveCount + " / " + maxMoves + " · zostáva " + remaining;
        moveCounterEl.setAttribute(
          "aria-label",
          "Vaše ťahy " +
            moveCount +
            " z " +
            maxMoves +
            ", zostáva " +
            remaining +
            ". Pri vyriešení platí bonus za menej ťahov."
        );
        if (remaining <= 1 || moveCount >= maxMoves) {
          moveCounterEl.classList.add("sach-move-counter--danger");
        } else if (remaining <= 3) {
          moveCounterEl.classList.add("sach-move-counter--warn");
        }
      } else {
        var turnHint =
          chess.turn() === playerColor && !busy && !checkSolved() && !gameOver
            ? " · váš ťah"
            : "";
        moveCounterEl.textContent = "Ťahy: " + moveCount + turnHint;
        moveCounterEl.setAttribute("aria-label", "Počet vašich ťahov v tejto partii: " + moveCount);
      }
    }
    if (attemptCounterEl) {
      if (freePlay) {
        attemptCounterEl.hidden = true;
      } else {
        attemptCounterEl.hidden = false;
        attemptCounterEl.textContent = "Pokusy: " + attemptCount;
        attemptCounterEl.setAttribute("aria-label", "Počet neúspešných pokusov: " + attemptCount);
      }
    }
  }

  function setSubtitle(extra) {
    if (!subtitle) return;
    var status = statusForTurn(chess, busy, playerColor);
    var parts = [baseSubtitle, status];
    if (extra) parts.push(extra);
    subtitle.textContent = parts.join(" | ");
  }

  function userMovableColor() {
    if (gameOver) return null;
    if (freePlay) {
      if (busy || chess.isGameOver() || checkSolved()) return null;
      if (chess.turn() !== playerColor) return null;
      if (moveCount >= maxMoves) return null;
      return boardOrientation;
    }
    if (busy || chess.isGameOver() || stepsDone()) return null;
    var step = currentStep();
    if (!step || step.who !== "user") return null;
    return boardOrientation;
  }

  function checkSolved() {
    if (isPuzzleWin(chess, puzzle.win, playerColor)) return true;
    if (!stepsDone()) return false;
    return isPuzzleWin(chess, puzzle.win, playerColor);
  }

  function finishSolved(ground, extra) {
    wrongMoveUi.hide();
    wrongMoveUi.hideBriefFeedback();
    stepIdx = activeSteps.length;
    applyState(ground, extra || "✅ Hlavolam je vyriešený!");
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
    updateCounters();
    setSubtitle(extra);
    var solved = checkSolved();
    helpers.setCompletionUI(puzzle.id, solved);
    if (solved) {
      wrongMoveUi.hide();
      wrongMoveUi.hideBriefFeedback();
      helpers.notifyPuzzleSolved(puzzle.id, {
        firstTry: attemptCount === 0,
        movesUsed: moveCount,
        maxMoves: freePlay ? maxMoves : puzzle.maxMoves,
      });
      return;
    }

    if (!gameOver && !solved && chess.isGameOver() && (freePlay || flexPlay)) {
      resolveTerminalPosition(ground);
    }
  }

  function afterMove(orig, dest) {
    onUserMove(ground, orig, dest);
  }

  function registerMistake() {
    attemptCount += 1;
  }

  function shouldBlockWithOverlay(step) {
    if (step && step.fail) return true;
    return attemptCount >= maxMistakesOverlay;
  }

  function showBlockingWrong(ground, step, opts) {
    var msg = step.wrong || step.wrongMessage || "⚠️ Nesprávny ťah.";
    applyState(ground, msg);
    var canStepBack = !(opts && opts.showStepBack === false);
    wrongMoveUi.show({
      showStepBack: canStepBack,
      onRetry: function () {
        restoreRetryPosition(ground);
      },
      onStepBack: canStepBack
        ? function () {
            restoreStepBack(ground);
          }
        : undefined,
    });
  }

  function showSoftWrong(ground, step) {
    var msg = step.wrong || step.wrongMessage || "⚠️ Nesprávny ťah — skúste iný.";
    wrongMoveUi.hide();
    applyState(ground, msg);
    wrongMoveUi.showBriefFeedback(msg);
  }

  function tryAlternateWinAfterMove(ground) {
    if (!isPuzzleWin(chess, puzzle.win, playerColor)) return false;
    finishSolved(ground, "Cieľ splnený — výborne!");
    return true;
  }

  function revertChessground(ground) {
    ground.set({ fen: chess.fen() });
  }

  function applyCorrectUserMove(ground, step, attempted, verdict) {
    if (!chess.move(attempted)) {
      revertChessground(ground);
      applyState(ground);
      return;
    }

    moveCount += 1;
    wrongMoveUi.hide();
    wrongMoveUi.hideBriefFeedback();

    if (verdict && verdict.mode === "goal" && verdict.goal !== "win") {
      enterFlexPlay();
      pushPositionHistory();
      applyState(ground, "Správny ťah — pokračujte podľa pozície na doske.");
      runBotTurns(ground);
      return;
    }

    if (flexPlay) {
      syncFlexSteps();
      pushPositionHistory();
      if (resolveTerminalPosition(ground)) return;
      applyState(ground, "Správny ťah.");
      if (!stepsDone()) runBotTurns(ground);
      else saveRetrySnapshot();
      return;
    }

    stepIdx += 1;
    applyState(ground, "Správny ťah.");

    pushPositionHistory();

    if (stepsDone()) {
      saveRetrySnapshot();
      applyState(ground);
      return;
    }

    runBotTurns(ground);
  }

  function handleWrongUserMove(ground, step, attempted) {
    registerMistake();

    var trial = chess.move(attempted);
    if (trial) {
      if (tryAlternateWinAfterMove(ground)) return;
      chess.undo();
    }

    applyState(ground);

    if (shouldBlockWithOverlay(step)) {
      showBlockingWrong(ground, step, { showStepBack: true });
      return;
    }

    showSoftWrong(ground, step);
  }

  function pickOpponentMoveForFreePlay() {
    var catalog = pickCatalogOpponentMove(chess, puzzle, solutionBotMap);
    if (catalog && catalog.move) {
      return { move: catalog.move, hint: catalog.hint };
    }
    var engaged = pickEngagedOpponentMove(chess, puzzle);
    if (engaged && engaged.move) {
      return { move: engaged.move, hint: engaged };
    }
    var flex = pickFlexSoundBotMove(chess, puzzle);
    if (flex && flex.move) return { move: flex.move, hint: flex };
    return null;
  }

  function runFlexBotTurn(ground) {
    if (chess.turn() !== opponent || chess.isGameOver()) {
      applyState(ground);
      return;
    }
    var picked = pickOpponentMoveForFreePlay();
    if (!picked || !picked.move) {
      applyState(ground);
      return;
    }
    var move = picked.move;
    var statusMsg = "Počítač útočí…";
    if (picked.hint) {
      if (typeof picked.hint === "string") statusMsg = picked.hint;
      else if (picked.hint.hint) statusMsg = picked.hint.hint;
      else if (picked.hint.isCheck && picked.hint.captured) statusMsg = "♟ Šach — počítač berie figúru…";
      else if (picked.hint.isCheck) statusMsg = "♟ Šach — počítač tlačí na kráľa…";
      else if (picked.hint.captured) statusMsg = "Počítač berie figúru…";
    }
    busy = true;
    applyState(ground, statusMsg);
    window.setTimeout(function () {
      var botMove = { from: move.from, to: move.to };
      if (move.promotion) botMove.promotion = move.promotion;
      if (!chess.move(botMove)) {
        busy = false;
        applyState(ground, "⚠️ Chyba pozície (bot).");
        return;
      }
      busy = false;
      pushPositionHistory();
      saveRetrySnapshot();
      if (resolveTerminalPosition(ground)) return;
      if (moveCount >= maxMoves && !checkSolved()) {
        triggerGameOver(ground);
        return;
      }
      applyState(
        ground,
        playerColor === "b"
          ? "Pokračujte čiernym — máte voľný ťah."
          : "Pokračujte bielym — máte voľný ťah."
      );
    }, 420);
  }

  function canRestoreStepBack() {
    return positionHistory.length > 1;
  }

  function showEndOverlay(ground, options) {
    var undo = canRestoreStepBack();
    wrongMoveUi.showGameOver({
      kind: options.kind || "limit",
      message: options.message,
      retryLabel: options.retryLabel || "Nová partia",
      showStepBack: options.showStepBack != null ? options.showStepBack : undo,
      onStepBack:
        options.onStepBack != null
          ? options.onStepBack
          : undo
            ? function () {
                restoreStepBack(ground);
              }
            : undefined,
      onReset: function () {
        wrongMoveUi.hideGameOver();
        resetBoard();
      },
    });
  }

  function resolveTerminalPosition(ground, extraHint) {
    if (gameOver || checkSolved()) return false;
    var outcome = detectTerminalOutcome(chess, puzzle);
    if (!outcome) return false;
    if (outcome.type === "win") {
      finishSolved(ground, extraHint || "✅ Hlavolam je vyriešený!");
      return true;
    }
    triggerTerminalEnd(ground, outcome);
    return true;
  }

  function triggerTerminalEnd(ground, outcome) {
    if (gameOver) return;
    gameOver = true;
    wrongMoveUi.hideBriefFeedback();
    var msg = terminalOutcomeMessage(outcome);
    var kind = outcome.type === "draw" ? "draw" : "loss";
    applyState(ground, msg);
    showEndOverlay(ground, {
      kind: kind,
      message: msg + (canRestoreStepBack() ? " Môžete vrátiť posledný ťah (Krok späť)." : ""),
      retryLabel: "Skúsiť znova",
    });
  }

  function triggerGameOver(ground) {
    gameOver = true;
    wrongMoveUi.hideBriefFeedback();
    var msg =
      "Prehra — prekročili ste limit " +
      maxMoves +
      " vašich ťahov. Cieľ úlohy ste nesplnili včas.";
    applyState(ground, msg);
    showEndOverlay(ground, {
      kind: "limit",
      message: msg + (canRestoreStepBack() ? " Môžete vrátiť posledný ťah (Krok späť)." : ""),
      retryLabel: "Nová partia",
    });
  }

  function onUserMoveFree(ground, orig, dest) {
    if (busy || gameOver || !orig || !dest) {
      applyState(ground);
      return;
    }
    if (chess.turn() !== playerColor) {
      revertChessground(ground);
      applyState(ground);
      return;
    }
    if (moveCount >= maxMoves) {
      triggerGameOver(ground);
      return;
    }

    var attempted = moveFromBoard(chess, orig, dest);
    if (!attempted) {
      revertChessground(ground);
      applyState(ground);
      return;
    }

    if (!chess.move(attempted)) {
      revertChessground(ground);
      applyState(ground);
      return;
    }

    moveCount += 1;
    wrongMoveUi.hide();
    wrongMoveUi.hideBriefFeedback();
    pushPositionHistory();

    if (tryAlternateWinAfterMove(ground)) return;

    if (resolveTerminalPosition(ground)) return;

    if (moveCount >= maxMoves) {
      triggerGameOver(ground);
      return;
    }

    applyState(ground, "Ťah prijatý — pokračujte.");

    if (chess.turn() === opponent) {
      runFlexBotTurn(ground);
    }
  }

  function runBotTurns(ground) {
    while (!stepsDone()) {
      var step = currentStep();
      if (!step || step.who !== "bot") break;

      var choice = pickBotChoice(step, chess, puzzle);
      if (!choice || !choice.move) {
        stepIdx += 1;
        continue;
      }

      busy = true;
      applyState(ground, choice.hint || "🤖 Počítač útočí…");

      var move = choice.move;
      var thenSteps = choice.then || [];
      var botHint = choice.hint;

      window.setTimeout(function () {
        var botMove = { from: move.from, to: move.to };
        if (move.promotion) botMove.promotion = move.promotion;
        var result = chess.move(botMove);
        if (!result) {
          busy = false;
          applyState(ground, "⚠️ Chyba pozície (bot).");
          return;
        }
        stepIdx += 1;
        activeSteps = thenSteps;
        stepIdx = 0;
        busy = false;
        pushPositionHistory();
        saveRetrySnapshot();
        if (resolveTerminalPosition(ground)) return;
        applyState(
          ground,
          botHint ||
            (playerColor === "b"
              ? "Počítač odohral ťah — pokračujte čiernym."
              : "Počítač odohral ťah — pokračujte bielym.")
        );
        runBotTurns(ground);
      }, 460);
      return;
    }
    applyState(ground);
  }

  function onUserMove(ground, orig, dest) {
    if (freePlay) {
      onUserMoveFree(ground, orig, dest);
      return;
    }

    if (busy || !orig || !dest) {
      applyState(ground);
      return;
    }

    var step = currentStep();
    if (!step || step.who !== "user") {
      revertChessground(ground);
      applyState(ground);
      return;
    }

    var attempted = moveFromBoard(chess, orig, dest);
    if (!attempted) {
      revertChessground(ground);
      applyState(ground);
      return;
    }

    if (step.fail) {
      revertChessground(ground);
      handleWrongUserMove(ground, step, attempted);
      return;
    }

    var verdict = evaluateUserStep(chess.fen(), step, attempted, puzzle);
    if (!verdict.ok) {
      revertChessground(ground);
      handleWrongUserMove(ground, step, attempted);
      return;
    }

    if (verdict.mode === "goal" && verdict.goal === "win") {
      if (!chess.move(attempted)) {
        revertChessground(ground);
        applyState(ground);
        return;
      }
      moveCount += 1;
      finishSolved(ground, "Cieľ splnený — výborne!");
      return;
    }

    applyCorrectUserMove(ground, step, attempted, verdict);
  }

  syncChessBoardSize(el);

  var ground = Chessground(el, {
    fen: chess.fen(),
    orientation: boardOrientation,
    coordinates: true,
    viewOnly: false,
    selectable: { enabled: true },
    draggable: { enabled: true, showGhost: true },
    movable: {
      free: false,
      color: boardOrientation,
      showDests: true,
      dests: helpers.buildDests(chess),
      events: { after: afterMove },
    },
    premovable: { enabled: false },
    drawable: { enabled: true, visible: true },
    highlight: { lastMove: true, check: true },
    animation: { enabled: true },
  });
  el._ptraChessground = ground;

  function resetBoard() {
    busy = false;
    gameOver = false;
    moveCount = 0;
    flexPlay = false;
    activeSteps = puzzle.play || [];
    stepIdx = 0;
    wrongMoveUi.hide();
    wrongMoveUi.hideGameOver();
    wrongMoveUi.hideBriefFeedback();
    chess.reset();
    chess.load(startFen);
    positionHistory = [snapshotNow()];
    saveRetrySnapshot();
    applyState(ground);
  }

  function ensureBoardLayout(attempt) {
    attempt = attempt == null ? 0 : attempt;
    syncChessBoardSize(el);
    var rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      if (attempt < 24) {
        requestAnimationFrame(function () {
          ensureBoardLayout(attempt + 1);
        });
      }
      return;
    }
    ground.set({ fen: chess.fen() });
    applyState(ground);
    if (typeof ground.redrawAll === "function") ground.redrawAll();
  }

  if (typeof ResizeObserver !== "undefined") {
    var resizeObserver = new ResizeObserver(function () {
      ensureBoardLayout(0);
    });
    resizeObserver.observe(el);
    var host = el.closest(".chessground-host");
    if (host && host !== el) resizeObserver.observe(host);
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      ensureBoardLayout(0);
    });
  });

  positionHistory = [snapshotNow()];
  saveRetrySnapshot();
  updateCounters();
  if (freePlay) {
    setSubtitle(
      playerColor === "b"
        ? "Voľná hra: pohybujte čiernymi figúrami. Prehra len po prekročení limitu ťahov."
        : "Voľná hra: pohybujte bielymi figúrami. Prehra len po prekročení limitu ťahov."
    );
  }
  applyState(ground);
  var step0 = (puzzle.play || [])[0];
  if (step0 && step0.who === "bot" && chess.turn() === opponent) {
    runBotTurns(ground);
  }
  helpers.wireControls(puzzle, { resetBoard: resetBoard });
}
