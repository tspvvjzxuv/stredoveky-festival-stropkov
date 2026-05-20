import { Chessground } from "https://cdn.jsdelivr.net/npm/@lichess-org/chessground@10.1.1/dist/chessground.js";
import { Chess } from "https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm";
import { FESTIVAL_PUZZLES } from "./puzzles-data.js";
import { findStrongMove, movesMatch } from "./puzzle-engine.js";
import {
  unlockPuzzleReward,
  getRewardMeta,
  isPuzzleRewardUnlocked,
  initPuzzleRewards,
} from "./puzzle-rewards.js";

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

function buildDests(chess) {
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

function getStatusText(chess, lastMoveOk, extra) {
  if (chess.isCheckmate()) {
    return chess.turn() === "w"
      ? "✅ Úspech! Hlavolam je vyriešený matom (vyhral čierny)."
      : "✅ Úspech! Hlavolam je vyriešený matom (vyhral biely).";
  }
  if (chess.isStalemate()) return "ℹ️ Koniec: pat.";
  if (chess.isDraw()) return "ℹ️ Koniec: remíza.";
  if (chess.isCheck()) return chess.turn() === "w" ? "⚠️ Na ťahu biely (šach)." : "⚠️ Na ťahu čierny (šach).";
  if (lastMoveOk) return "✅ Ťah bol úspešne vykonaný.";
  if (extra) return extra;
  return chess.turn() === "w" ? "Na ťahu biely." : "Na ťahu čierny.";
}

function isPuzzleSolved(chess, solutionLine, solutionStep) {
  if (solutionLine.length && solutionStep >= solutionLine.length) return true;
  return chess.isCheckmate();
}

function setCompletionUI(puzzleId, solvedNow) {
  var boardEl = document.getElementById(puzzleId);
  if (!boardEl) return;
  var item = boardEl.closest(".sach-visual-item");
  if (!item) return;
  var hasReward = isPuzzleRewardUnlocked(puzzleId);
  item.classList.toggle("is-completed", solvedNow);
  item.classList.toggle("has-reward", hasReward);

  var banner = item.querySelector(".sach-success-banner");
  if (solvedNow) {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "sach-success-banner";
      item.appendChild(banner);
    }
    var meta = getRewardMeta(puzzleId);
    if (hasReward && meta) {
      banner.textContent =
        "🏆 Úloha splnená! Máte " + meta.partLabel + " — pozrite investíciu vyššie.";
    } else {
      banner.textContent = "🏆 Výborne! Úloha splnená.";
    }
  } else if (banner) {
    banner.remove();
  }

  var badge = item.querySelector(".sach-reward-badge");
  if (hasReward && !solvedNow) {
    if (!badge) {
      badge = document.createElement("p");
      badge.className = "sach-reward-badge";
      item.appendChild(badge);
    }
    badge.textContent = "✓ Pečať už získaná";
  } else if (badge) {
    badge.remove();
  }
}

function notifyPuzzleSolved(puzzleId) {
  var wasNew = unlockPuzzleReward(puzzleId);
  var meta = getRewardMeta(puzzleId);
  if (wasNew && meta) {
    var boardEl = document.getElementById(puzzleId);
    var item = boardEl && boardEl.closest(".sach-visual-item");
    if (item) {
      var banner = item.querySelector(".sach-success-banner");
      if (!banner) {
        banner = document.createElement("div");
        banner.className = "sach-success-banner";
        item.appendChild(banner);
      }
      banner.textContent =
        "🎁 Nová odmena! " + meta.icon + " " + meta.title + " — časť investície je odkrytá.";
    }
  }
}

function formatMoveHint(move) {
  if (!move) return "";
  return move.from + " → " + move.to;
}

function mountPuzzleBoard(puzzle) {
  var el = document.getElementById(puzzle.id);
  if (!el) return;

  var title = document.getElementById(puzzle.id + "-title");
  var subtitle = document.getElementById(puzzle.id + "-subtitle");
  if (title && puzzle.title) title.textContent = puzzle.title;
  var baseSubtitle = puzzle.subtitle || "";
  if (subtitle && baseSubtitle) subtitle.textContent = baseSubtitle;
  if (puzzle.ariaLabel) el.setAttribute("aria-label", puzzle.ariaLabel);

  var chess = new Chess(puzzle.fen);
  var solutionLine = puzzle.solutionLine || [];
  var solutionStep = 0;
  var startFen = puzzle.fen;
  var engineDepth = puzzle.engineDepth || 6;
  var busy = false;

  function expectedMove() {
    return solutionLine[solutionStep] || null;
  }

  function setSubtitle(status, extra) {
    if (!subtitle) return;
    var text = getStatusText(chess, !!status, extra);
    subtitle.textContent = baseSubtitle ? baseSubtitle + " | " + text : text;
  }

  function applyState(ground, lastMoveOk, extra) {
    var gameOver = chess.isGameOver();
    ground.set({
      fen: chess.fen(),
      turnColor: chess.turn() === "w" ? "white" : "black",
      movable: {
        free: false,
        color: gameOver || busy || chess.turn() !== "w" ? null : "white",
        showDests: true,
        dests: gameOver || busy ? new Map() : buildDests(chess),
      },
      drawable: { enabled: true },
    });
    setSubtitle(lastMoveOk, extra);
    var solved = isPuzzleSolved(chess, solutionLine, solutionStep);
    setCompletionUI(puzzle.id, solved);
    if (solved) notifyPuzzleSolved(puzzle.id);
    updateActionButtons();
  }

  function updateActionButtons() {
    var gameOver = chess.isGameOver();
    var hasExpected = !!expectedMove();
    var hintBtn = document.querySelector('[data-hint-puzzle="' + puzzle.id + '"]');
    var coachBtn = document.querySelector('[data-coach-puzzle="' + puzzle.id + '"]');
    var engineBtn = document.querySelector('[data-engine-puzzle="' + puzzle.id + '"]');
    if (hintBtn) hintBtn.disabled = busy || gameOver || !hasExpected;
    if (coachBtn) coachBtn.disabled = busy || gameOver || !hasExpected;
    if (engineBtn) engineBtn.disabled = busy || gameOver;
  }

  function clearHintShape(ground) {
    ground.setAutoShapes([]);
  }

  function showHintShape(ground) {
    var move = expectedMove();
    if (!move) return;
    ground.setAutoShapes([
      {
        orig: move.from,
        dest: move.to,
        brush: "green",
      },
    ]);
  }

  function playMoveOnBoard(ground, move, extra) {
    if (!move) return false;
    var result = chess.move({
      from: move.from,
      to: move.to,
      promotion: move.promotion || "q",
    });
    if (!result) return false;
    solutionStep += 1;
    applyState(ground, true, extra);
    return true;
  }

  function maybePlayOpponentReply(ground) {
    var next = expectedMove();
    if (!next) return;
    var side = chess.turn();
    var nextIsWhite = side === "w";
    if (solutionLine.length > solutionStep) {
      busy = true;
      updateActionButtons();
      window.setTimeout(function () {
        playMoveOnBoard(ground, next, "🤖 Protihráč odpovedá podľa vzorového riešenia.");
        busy = false;
        applyState(ground, true);
      }, 420);
    }
  }

  function onUserMove(ground, orig, dest) {
    if (busy || !orig || !dest) {
      applyState(ground, false);
      return;
    }

    var attempted = { from: orig, to: dest, promotion: "q" };
    var expected = expectedMove();

    if (expected && !movesMatch(attempted, expected)) {
      applyState(ground, false, "⚠️ Iný ťah — skúste nápovedu alebo trénera.");
      return;
    }

    var move = chess.move({ from: orig, to: dest, promotion: "q" });
    if (!move) {
      applyState(ground, false);
      return;
    }

    solutionStep += 1;
    clearHintShape(ground);
    applyState(ground, true, expected ? "✅ Správny ťah v riešení." : null);

    if (!chess.isGameOver() && expectedMove()) {
      maybePlayOpponentReply(ground);
    }
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
      color: chess.turn() === "w" ? "white" : null,
      showDests: true,
      dests: buildDests(chess),
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
    solutionStep = 0;
    chess.reset();
    chess.load(startFen);
    clearHintShape(ground);
    applyState(ground, false);
  }

  applyState(ground, false);
  updateActionButtons();

  var resetBtn = document.querySelector('[data-reset-puzzle="' + puzzle.id + '"]');
  if (resetBtn) resetBtn.addEventListener("click", resetBoard);

  var hintBtn = document.querySelector('[data-hint-puzzle="' + puzzle.id + '"]');
  if (hintBtn) {
    hintBtn.addEventListener("click", function () {
      var move = expectedMove();
      if (!move) return;
      showHintShape(ground);
      setSubtitle(false, "💡 Nápoveda: " + formatMoveHint(move));
    });
  }

  var coachBtn = document.querySelector('[data-coach-puzzle="' + puzzle.id + '"]');
  if (coachBtn) {
    coachBtn.addEventListener("click", function () {
      if (busy || chess.isGameOver()) return;
      var move = expectedMove();
      if (!move) return;
      clearHintShape(ground);
      if (playMoveOnBoard(ground, move, "🎓 Tréner zahral vzorový ťah.")) {
        if (!chess.isGameOver() && expectedMove()) {
          maybePlayOpponentReply(ground);
        }
      }
    });
  }

  var engineBtn = document.querySelector('[data-engine-puzzle="' + puzzle.id + '"]');
  if (engineBtn) {
    engineBtn.addEventListener("click", function () {
      if (busy || chess.isGameOver()) return;
      busy = true;
      updateActionButtons();
      engineBtn.disabled = true;
      if (subtitle) {
        subtitle.textContent =
          (baseSubtitle ? baseSubtitle + " | " : "") + "⏳ Silný motor počíta najlepší ťah…";
      }

      window.setTimeout(function () {
        var best = findStrongMove(chess, engineDepth);
        busy = false;
        if (!best) {
          applyState(ground, false, "Motor nenašiel ťah.");
          return;
        }
        clearHintShape(ground);
        var san = best.san;
        if (
          playMoveOnBoard(ground, best, "⚙️ Silný ťah (motor): " + san + ". Porovnajte s riešením.")
        ) {
          if (!chess.isGameOver() && expectedMove()) {
            maybePlayOpponentReply(ground);
          }
        }
      }, 40);
    });
  }
}

function initChessgroundPuzzles() {
  initPuzzleRewards();
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (p && p.id && p.fen) mountPuzzleBoard(p);
  }
  for (var j = 0; j < FESTIVAL_PUZZLES.length; j++) {
    var pid = FESTIVAL_PUZZLES[j].id;
    if (isPuzzleRewardUnlocked(pid)) {
      setCompletionUI(pid, false);
    }
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initChessgroundPuzzles);
else initChessgroundPuzzles();
