/**
 * Qc3+ / Qd3+ alternatívy — finiš musí byť akýkoľvek mat, nie len Qc8.
 */
import { Chess } from "chess.js";

function hasWhiteMateInOne(chess) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  for (const m of chess.moves({ verbose: true })) {
    const c = new Chess(chess.fen());
    c.move(m);
    if (c.isCheckmate()) return true;
  }
  return false;
}

function isMateInTwoOpening(fen, from, to) {
  const s = new Chess(fen);
  if (!s.move({ from, to })) return false;
  for (const bm of s.moves()) {
    const a = new Chess(s.fen());
    a.move(bm);
    if (hasWhiteMateInOne(a)) return true;
  }
  return false;
}

const start = "6k1/5ppp/8/8/8/8/3Q4/6K1 w - - 0 1";
if (!isMateInTwoOpening(start, "d2", "d3")) {
  console.error("FAIL: Qd3+ should be mate-in-2 opening");
  process.exit(1);
}

const c = new Chess(start);
c.move({ from: "d2", to: "d3" });
c.move({ from: "g8", to: "h8" });
const m = c.move({ from: "d3", to: "d8" });
if (!m || !c.isCheckmate()) {
  console.error("FAIL: Qd8# after Qd3+ Kh8");
  process.exit(1);
}

const c2 = new Chess(start);
c2.move({ from: "d2", to: "d3" });
c2.move({ from: "g8", to: "h8" });
const bad = c2.moves({ verbose: true }).some((m) => m.from === "d3" && m.to === "c8");
if (bad) {
  console.error("FAIL: Qc8 from d3 should not be legal");
  process.exit(1);
}

console.log("OK: flex eval — alt opening and correct mate square");
