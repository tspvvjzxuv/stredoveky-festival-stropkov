/**
 * Generuje overené definície úloh (pomocný skript pre puzzle-catalog.js).
 * Spustenie: node scripts/gen-puzzle-catalog.mjs
 */
import { Chess } from "chess.js";
import { writeFileSync } from "fs";

const PUZZLES = [
  // week 1
  {
    week: 1,
    easy: {
      fen: "6k1/5ppp/8/8/8/8/5R2/6K1 w - - 0 1",
      line: [
        ["f2", "g1"],
        ["g8", "h8"],
        ["g1", "g8"],
      ],
      subtitle: "Mat v dvoch: veža na g1, potom dorazte na ôsmom rade.",
      rating: 1350,
    },
    medium: {
      fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
      line: [
        ["f2", "e1"],
        ["g8", "h8"],
        ["e1", "e8"],
      ],
      subtitle: "Mat v dvoch: dáma na e1, po Kh8 dokončite na e8.",
      rating: 1550,
    },
    hard: {
      fen: "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
      line: [
        ["c1", "c8"],
        ["f4", "f8"],
        ["c8", "f8"],
      ],
      win: "black_queen_captured",
      subtitle: "Taktika v troch ťahoch: šach vežou, zoberte dámu.",
      rating: 1850,
    },
  },
  {
    week: 2,
    easy: {
      fen: "6k1/6ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
      line: [
        ["f3", "e7"],
        ["g8", "f8"],
        ["e7", "e8"],
      ],
      subtitle: "Mat v dvoch: Qe7+ a finiš na e8.",
      rating: 1380,
    },
    medium: {
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
      line: [
        ["f3", "g5"],
        ["f6", "g5"],
        ["c4", "f7"],
        ["e8", "f7"],
        ["d1", "f7"],
      ],
      subtitle: "Kombinácia: jazdec na g5, potom bielopol na f7 (mat).",
      rating: 1620,
    },
    hard: {
      fen: "2r1k3/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
      line: [
        ["f3", "c6"],
        ["d8", "c6"],
        ["f1", "f8"],
        ["e8", "f8"],
        ["c6", "c8"],
      ],
      win: "checkmate",
      subtitle: "Výmena na c6, potom mat vežou na c8.",
      rating: 1920,
    },
  },
  {
    week: 3,
    easy: {
      fen: "6k1/5ppp/8/8/8/8/6R1/4K3 w - - 0 1",
      line: [
        ["g2", "g7"],
        ["h8", "g8"],
        ["g7", "g8"],
      ],
      subtitle: "Mat v dvoch: veža na g7, kráľ musí zabrať.",
      rating: 1400,
    },
    medium: {
      fen: "5rk2/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
      line: [
        ["f3", "c8"],
        ["f8", "c8"],
        ["f1", "f8"],
        ["e8", "f8"],
        ["c8", "c8"],
      ],
      subtitle: "Získajte vežu (Qxc8), potom mat na c8.",
      rating: 1650,
    },
    hard: {
      fen: "rnbqkb1r/pppp1ppp/4p2n/8/4P3/2N5/PPP1PPPP/R1BQKBNR w KQkq - 0 1",
      line: [
        ["c3", "d5"],
        ["e6", "d5"],
        ["c4", "d5"],
        ["d8", "d5"],
        ["d1", "h5"],
        ["g7", "h5"],
        ["d5", "f7"],
      ],
      subtitle: "Slovanská taktika: jazdec na d5, potom bielopol na f7.",
      rating: 1950,
    },
  },
];

function playFromLine(fen, line, win) {
  const chess = new Chess(fen);
  const play = [];
  let i = 0;
  while (i < line.length) {
    const [from, to] = line[i];
    const isWhite = chess.turn() === "w";
    if (isWhite) {
      const step = { who: "user", move: { from, to } };
      if (i === line.length - 1 && win === "checkmate") {
        step.accept = "checkmate";
        delete step.move;
        step.suggest = { from, to };
      }
      play.push(step);
      chess.move({ from, to });
      i++;
    } else {
      const botMove = { from, to };
      const then = [];
      chess.move({ from, to });
      i++;
      while (i < line.length && chess.turn() === "w") {
        const [wf, wt] = line[i];
        const userStep =
          i === line.length - 1 && win === "checkmate"
            ? { who: "user", accept: "checkmate", suggest: { from: wf, to: wt } }
            : { who: "user", move: { from: wf, to: wt } };
        then.push(userStep);
        chess.move({ from: wf, to: wt });
        i++;
        if (i < line.length && chess.turn() === "b") break;
      }
      play.push({
        who: "bot",
        pick: "main",
        choices: [{ move: botMove, main: true, then }],
      });
    }
  }
  return play;
}

function verify(p) {
  const chess = new Chess(p.fen);
  for (const [from, to] of p.line) {
    const m = chess.move({ from, to });
    if (!m) return false;
  }
  if (p.win === "black_queen_captured") {
    const b = chess.board();
    for (const row of b) for (const x of row) if (x && x.type === "q" && x.color === "b") return false;
    return true;
  }
  return chess.isCheckmate() && chess.turn() === "b";
}

for (const w of PUZZLES) {
  for (const d of ["easy", "medium", "hard"]) {
    const p = w[d];
    if (!verify(p)) console.log("FAIL", w.week, d, p.line);
    else console.log("OK", w.week, d, p.line.map((x) => x.join("")).join(" "));
  }
}
