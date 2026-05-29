import { Chess } from "chess.js";

const batch = [
  ["w2e", "5qk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1", [["f2", "f7"], ["g8", "h8"], ["f7", "f8"]], "mate"],
  ["w2m", "6k1/8/5p2/8/8/8/5Q2/4K3 w - - 0 1", [["f2", "f6"], ["g8", "h8"], ["f6", "f8"]], "mate"],
  ["w2h", "2r1k3/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1", [["f3", "c6"], ["d8", "c6"], ["a1", "a8"], ["e8", "f8"], ["a8", "f8"]], "mate"],
  ["w3e", "6k1/5ppp/8/8/8/8/7R/6K1 w - - 0 1", [["h2", "h8"], ["g8", "h8"], ["h8", "h8"]], "mate"],
  ["w3m", "6k1/5ppp/8/8/8/8/6Q1/6K1 w - - 0 1", [["f2", "f7"], ["g8", "h8"], ["f7", "g8"]], "mate"],
  ["w4e", "6k1/5ppp/8/8/8/8/4R3/6K1 w - - 0 1", [["e2", "e8"], ["g8", "f8"], ["e8", "f8"]], "mate"],
  ["w4m", "6k1/5ppp/8/8/8/8/3Q4/6K1 w - - 0 1", [["d2", "h6"], ["g8", "h8"], ["h6", "h8"]], "mate"],
  ["w5e", "6k1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1", [["c2", "c8"], ["g8", "h8"], ["c8", "c8"]], "mate"],
  ["w5m", "6k1/8/8/8/8/4N3/5Q2/6K1 w - - 0 1", [["e3", "f5"], ["g8", "h8"], ["f5", "g7"]], "mate"],
  ["w6e", "6k1/5ppp/8/8/8/8/6Q1/5K2 w - - 0 1", [["f2", "f7"], ["g8", "h8"], ["f7", "f8"]], "mate"],
  ["pin", "6k1/5ppp/8/8/8/8/5R1Q/6K1 w - - 0 1", [["h2", "h7"], ["g8", "h8"], ["h7", "h8"]], "mate"],
  ["fork", "6k1/8/8/8/8/8/5N2/6K1 w - - 0 1", [["f3", "e5"], ["g8", "h8"], ["e5", "f7"]], "mate"],
  ["cap1", "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1", [["c1", "c8"], ["f4", "f8"], ["c8", "f8"]], "capture"],
  ["cap2", "6k1/8/8/8/4q3/8/8/3R2K1 w - - 0 1", [["d1", "d8"], ["f4", "d8"], ["d8", "d8"]], "capture"],
  ["sch", "r1bqkb1r/pppp1ppp/2n5/4p2q/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1", [["b1", "c3"], ["h5", "e5"], ["c3", "e4"]], "mate"],
  ["itl", "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1", [["f3", "g5"], ["f6", "d5"], ["g5", "f7"], ["e8", "f7"], ["d1", "f3"]], "mate"],
];

function bq(c) {
  return c.board().flat().some((x) => x && x.type === "q" && x.color === "b");
}

for (const [id, fen, line, win] of batch) {
  try {
    const c = new Chess(fen);
    for (const [f, t] of line) {
      if (!c.move({ from: f, to: t })) {
        console.log(id, "FAIL", f + t, "after", c.history().slice(-1)[0] || "start");
        break;
      }
    }
    const ok = win === "capture" ? !bq(c) : c.isCheckmate() && c.turn() === "b";
    console.log(id, ok ? "OK" : "NO_WIN", c.history().join(" "));
  } catch (e) {
    console.log(id, "ERR", e.message);
  }
}
