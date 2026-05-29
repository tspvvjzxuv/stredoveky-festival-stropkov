import { Chessground } from "https://cdn.jsdelivr.net/npm/@lichess-org/chessground@10.1.1/dist/chessground.js";
import { Chess } from "https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm";
import {
  moveFromBoard,
  evaluateUserStep,
  isPuzzleWinPosition,
  filterSoundBotChoices,
  pickFlexSoundBotMove,
  pickEngagedBlackMove,
  pickMostEngagedBotChoice,
} from "./puzzle-engine.js";
import { createWrongMoveOverlay } from "./puzzle-wrong-move-ui.js";

var DEFAULT_MAX_MISTAKES_OVERLAY = 8;

function isPuzzleWin(chess, winType) {
  return isPuzzleWinPosition(chess, winType);
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
    var preferred = [];
    for (var i = 0; i < choices.length; i++) {
      if (choices[i].main || choices[i].preferred) preferred.push(choices[i]);
    }
    if (preferred.length) return pickMostEngagedBotChoice(chess, preferred, puzzle) || preferred[0];
    return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[0];
  }

  if (step.pick === "random") {
    return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[Math.floor(Math.random() * choices.length)];
  }

  return pickMostEngagedBotChoice(chess, choices, puzzle) || choices[0];
}

function statusForTurn(chess, botThinking) {
  if (botThinking) return "Počítač premýšľa…";
  if (chess.isCheckmate()) {
    return chess.turn() === "b" ? "Mat — hlavolam je vyriešený." : "Mat — skúste iný ťah.";
  }
  if (chess.isGameOver()) return "Koniec partie.";
  if (chess.isCheck()) return "Šach!";
  return chess.turn() === "w" ? "Na ťahu ste ako biely." : "Ťah počítača…";
}

export function mountBotPuzzle(puzzle, helpers) {
  var el = document.getElementById(puzzle.id);
  if (!el) return;

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

  /** Krok späť: zrušíť odpoveď bota aj váš posledný biely ťah v tejto výmene. */
  function restoreStepBack(ground) {
    wrongMoveUi.hide();
    wrongMoveUi.hideBriefFeedback();
    var pops = positionHistory.length >= 3 ? 2 : 1;
    while (pops > 0 && positionHistory.length > 1) {
      positionHistory.pop();
      pops -= 1;
    }
    applySnapshot(positionHistory[positionHistory.length - 1]);
    applyState(ground);
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
          : "Týmto ťahom nedosiahnete cieľ — skúste iný biely ťah (mat alebo pokračovanie úlohy).",
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
    if (isPuzzleWin(chess, puzzle.win)) {
      activeSteps = [];
      stepIdx = 0;
      return;
    }
    activeSteps = chess.turn() === "b" ? [flexBotStep()] : [flexUserStep()];
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
      if (freePlay) {
        moveCounterEl.textContent = "Ťahy: " + moveCount + " / " + maxMoves;
        moveCounterEl.setAttribute(
          "aria-label",
          "Vaše ťahy " + moveCount + " z maximálne " + maxMoves
        );
      } else {
        moveCounterEl.textContent = "Ťahy: " + moveCount;
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
    var status = statusForTurn(chess, busy);
    var parts = [baseSubtitle, status];
    if (extra) parts.push(extra);
    subtitle.textContent = parts.join(" | ");
  }

  function userMovableColor() {
    if (gameOver) return null;
    if (freePlay) {
      if (busy || chess.isGameOver() || checkSolved()) return null;
      if (chess.turn() !== "w") return null;
      if (moveCount >= maxMoves) return null;
      return "white";
    }
    if (busy || chess.isGameOver() || stepsDone()) return null;
    var step = currentStep();
    if (!step || step.who !== "user") return null;
    return "white";
  }

  function checkSolved() {
    if (isPuzzleWin(chess, puzzle.win)) return true;
    if (!stepsDone()) return false;
    return isPuzzleWin(chess, puzzle.win);
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
    if (!isPuzzleWin(chess, puzzle.win)) return false;
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

  function pickBlackMoveForFreePlay() {
    var engaged = pickEngagedBlackMove(chess, puzzle);
    if (engaged && engaged.move) {
      return { move: engaged.move, hint: engaged };
    }
    var flex = pickFlexSoundBotMove(chess, puzzle);
    if (flex && flex.move) return { move: flex.move, hint: flex };
    return null;
  }

  function runFlexBotTurn(ground) {
    if (chess.turn() !== "b" || chess.isGameOver()) {
      applyState(ground);
      return;
    }
    var picked = pickBlackMoveForFreePlay();
    if (!picked || !picked.move) {
      applyState(ground);
      return;
    }
    var move = picked.move;
    var statusMsg = "Počítač útočí…";
    if (picked.hint) {
      if (typeof picked.hint === "string") statusMsg = picked.hint;
      else if (picked.hint.hint) statusMsg = picked.hint.hint;
      else if (picked.hint.isCheck && picked.hint.captured) statusMsg = "Počítač dal šach a berie figúru…";
      else if (picked.hint.isCheck) statusMsg = "Počítač dal šach…";
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
      applyState(ground, "Pokračujte bielym — máte voľný ťah.");
      if (moveCount >= maxMoves && !checkSolved()) {
        triggerGameOver(ground);
      }
    }, 420);
  }

  function triggerGameOver(ground) {
    gameOver = true;
    wrongMoveUi.hideBriefFeedback();
    applyState(ground, "Game over — prekročili ste limit ťahov.");
    wrongMoveUi.showGameOver({
      message:
        "Game over — prekročili ste limit " +
        maxMoves +
        " bielych ťahov. Cieľ úlohy ste nesplnili včas.",
      onReset: function () {
        wrongMoveUi.hideGameOver();
        resetBoard();
      },
    });
  }

  function onUserMoveFree(ground, orig, dest) {
    if (busy || gameOver || !orig || !dest) {
      applyState(ground);
      return;
    }
    if (chess.turn() !== "w") {
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

    if (moveCount >= maxMoves) {
      triggerGameOver(ground);
      return;
    }

    applyState(ground, "Ťah prijatý — pokračujte.");

    if (chess.turn() === "b") {
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
        applyState(ground, botHint || "Počítač odohral ťah — pokračujte bielym.");
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
    setSubtitle("Voľná hra: pohybujte bielymi figúrami. Prehra len po prekročení limitu ťahov.");
  }
  applyState(ground);
  helpers.wireControls(puzzle, { resetBoard: resetBoard });
}
