import { Chessground } from "../node_modules/@lichess-org/chessground/dist/chessground.js";
import { Chess } from "../node_modules/chess.js/dist/esm/chess.js";
import { FESTIVAL_PUZZLES } from "./puzzles-data.js";

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

function getStatusText(chess, lastMoveOk) {
  if (chess.isCheckmate()) {
    return chess.turn() === "w"
      ? "✅ Úspech! Hlavolam je vyriešený matom (vyhral čierny)."
      : "✅ Úspech! Hlavolam je vyriešený matom (vyhral biely).";
  }
  if (chess.isStalemate()) return "ℹ️ Koniec: pat.";
  if (chess.isDraw()) return "ℹ️ Koniec: remíza.";
  if (chess.isCheck()) return chess.turn() === "w" ? "⚠️ Na ťahu biely (šach)." : "⚠️ Na ťahu čierny (šach).";
  if (lastMoveOk) return "✅ Ťah bol úspešne vykonaný.";
  return chess.turn() === "w" ? "Na ťahu biely." : "Na ťahu čierny.";
}

function setCompletionUI(puzzleId, completed) {
  var boardEl = document.getElementById(puzzleId);
  if (!boardEl) return;
  var item = boardEl.closest(".sach-visual-item");
  if (!item) return;
  item.classList.toggle("is-completed", completed);

  var banner = item.querySelector(".sach-success-banner");
  if (completed) {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "sach-success-banner";
      item.appendChild(banner);
    }
    banner.textContent = "🏆 Výborne! Úloha splnená. Skús ďalšiu šachovú výzvu.";
  } else if (banner) {
    banner.remove();
  }
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

  function applyState(ground, lastMoveOk) {
    var gameOver = chess.isGameOver();
    ground.set({
      fen: chess.fen(),
      turnColor: chess.turn() === "w" ? "white" : "black",
      movable: {
        free: false,
        color: gameOver ? null : (chess.turn() === "w" ? "white" : "black"),
        showDests: true,
        dests: gameOver ? new Map() : buildDests(chess),
      },
    });
    if (subtitle) {
      var status = getStatusText(chess, !!lastMoveOk);
      subtitle.textContent = baseSubtitle ? baseSubtitle + " | " + status : status;
    }
    setCompletionUI(puzzle.id, chess.isCheckmate());
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
      color: chess.turn() === "w" ? "white" : "black",
      showDests: true,
      dests: buildDests(chess),
      events: {
        after: function (orig, dest) {
          if (!orig || !dest) {
            applyState(ground, false);
            return;
          }
          var move = chess.move({ from: orig, to: dest, promotion: "q" });
          if (!move) {
            applyState(ground, false);
            return;
          }
          applyState(ground, true);
        },
      },
    },
    premovable: { enabled: false },
    drawable: { enabled: false },
    highlight: { lastMove: true, check: true },
    animation: { enabled: true },
  });

  applyState(ground, false);

  var resetBtn = document.querySelector('[data-reset-puzzle="' + puzzle.id + '"]');
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      chess.reset();
      chess.load(puzzle.fen);
      applyState(ground, false);
    });
  }
}

function initChessgroundPuzzles() {
  for (var i = 0; i < FESTIVAL_PUZZLES.length; i++) {
    var p = FESTIVAL_PUZZLES[i];
    if (p && p.id && p.fen) mountPuzzleBoard(p);
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initChessgroundPuzzles);
else initChessgroundPuzzles();

