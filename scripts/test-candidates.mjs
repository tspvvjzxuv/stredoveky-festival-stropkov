import { Chess } from "chess.js";

const candidates = [
  { id: "m2a", fen: "6k1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1", line: [["f2", "f7"], ["g8", "h8"], ["f7", "f8"]] },
  { id: "m2b", fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1", line: [["f2", "e1"], ["g8", "h8"], ["e1", "e8"]] },
  { id: "m2c", fen: "6k1/5ppp/8/8/8/8/6R1/5Q1K w - - 0 1", line: [["g2", "g7"], ["g8", "g7"], ["f2", "g8"]] },
  { id: "m2c2", fen: "6k1/5ppp/8/8/8/8/6R1/6K1 w - - 0 1", line: [["g2", "g1"], ["g8", "h8"], ["g1", "g8"]] },
  { id: "m2d", fen: "6k1/5ppp/8/8/8/8/5R2/6K1 w - - 0 1", line: [["f2", "f8"], ["g8", "h8"], ["f8", "f7"]] },
  { id: "m2e", fen: "5qk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1", line: [["f3", "c7"], ["g8", "h8"], ["c7", "c8"]] },
  { id: "m3a", fen: "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1", line: [["c1", "c8"], ["f4", "f8"], ["c8", "f8"]], win: "capture" },
  { id: "m3b", fen: "2r1k3/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1", line: [["f3", "c6"], ["d8", "c6"], ["a1", "a8"], ["e8", "e8"]] },
  { id: "m4a", fen: "rnbqkb1r/pppp1ppp/4p2n/8/4P3/2N5/PPP1PPPP/R1BQKBNR w KQkq - 0 1", line: [["c3", "d5"], ["e6", "d5"], ["c4", "d5"], ["d8", "d5"], ["d1", "h5"], ["g7", "h5"], ["d5", "f7"]] },
  { id: "m4b", fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1", line: [["f3", "g5"], ["f6", "d5"], ["g5", "f7"], ["e8", "f7"], ["d1", "f3"]] },
  { id: "m4c", fen: "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1", line: [["f8", "f7"], ["e8", "f7"], ["c4", "f7"]] },
];

function blackQueen(c) {
  return c.board().flat().some((x) => x && x.type === "q" && x.color === "b");
}

for (const p of candidates) {
  const c = new Chess(p.fen);
  let ok = true;
  for (const [f, t] of p.line) {
    if (!c.move({ from: f, to: t })) {
      ok = false;
      break;
    }
  }
  const win =
    p.win === "capture" ? !blackQueen(c) : c.isCheckmate() && c.turn() === "b";
  console.log(p.id, ok ? "legal" : "ILLEGAL", win ? "WIN" : "no", ok ? c.history().join(" ") : "");
}
