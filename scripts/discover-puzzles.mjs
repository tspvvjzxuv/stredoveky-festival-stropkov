/**
 * Rýchle hľadanie kandidátov (m1–m2). Výstup: puzzle-candidates.json
 */
import { Chess } from "chess.js";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function findMateInOne(fen) {
  const c = new Chess(fen);
  for (const m of c.moves({ verbose: true })) {
    const n = new Chess(c.fen());
    n.move({ from: m.from, to: m.to, promotion: m.promotion });
    if (n.isCheckmate()) return { line: [[m.from, m.to]], whiteMoves: 1 };
  }
  return null;
}

function findMateInTwo(fen) {
  const start = new Chess(fen);
  if (start.turn() !== "w") return null;
  for (const w1 of start.moves({ verbose: true })) {
    const afterW = new Chess(start.fen());
    afterW.move({ from: w1.from, to: w1.to, promotion: w1.promotion });
    for (const b of afterW.moves()) {
      const mid = new Chess(afterW.fen());
      mid.move(b);
      for (const w2 of mid.moves({ verbose: true })) {
        const end = new Chess(mid.fen());
        end.move({ from: w2.from, to: w2.to, promotion: w2.promotion });
        if (end.isCheckmate() && end.turn() === "b") {
          return { line: [[w1.from, w1.to], [mid.history().at(-1).slice(0, 2) ? null : null]], whiteMoves: 2 };
        }
      }
    }
  }
  return null;
}

/** BFS len pre presne 2 biele ťahy (rýchle) */
function findLine2(fen) {
  const start = new Chess(fen);
  if (start.turn() !== "w") return null;
  for (const m1 of start.moves({ verbose: true })) {
    const c1 = new Chess(start.fen());
    const s1 = c1.move({ from: m1.from, to: m1.to, promotion: m1.promotion });
    for (const b of c1.moves({ verbose: true })) {
      const c2 = new Chess(c1.fen());
      c2.move({ from: b.from, to: b.to, promotion: b.promotion });
      for (const m2 of c2.moves({ verbose: true })) {
        const c3 = new Chess(c2.fen());
        c3.move({ from: m2.from, to: m2.to, promotion: m2.promotion });
        if (c3.isCheckmate() && c3.turn() === "b") {
          return { line: [[m1.from, m1.to], [b.from, b.to], [m2.from, m2.to]], whiteMoves: 2 };
        }
      }
    }
  }
  return null;
}

const backRanks = [
  "6k1/5ppp/8/8/8/8",
  "6k1/4pppp/8/8/8/8",
  "6k1/5pp1/8/6p1/8/8",
  "5qk1/5ppp/8/8/8/8",
  "5rk1/5ppp/8/8/8/8",
  "6k1/5pp1/8/8/8/8",
];
const whiteBack = [
  "5Q2/6K1",
  "5R2/6K1",
  "6Q1/6K1",
  "6R1/6K1",
  "2Q5/6K1",
  "4Q3/6K1",
  "5Q2/5K2",
  "7R/6K1",
  "1R6/6K1",
  "5Q1R/6K1",
  "3Q4/6K1",
  "5N2/6K1",
  "1Q6/5K2",
  "R7/4K3",
  "4R3/6K1",
  "6Q1/5K2",
];
const generated = backRanks.flatMap((mid) =>
  whiteBack.map((back) => `${mid}/${back} w - - 0 1`)
);

const FENS = [
  ...generated,
  "6k1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/6Q1/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/1R6/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/6R1/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/R7/4K3 w - - 0 1",
  "5qk1/5ppp/8/8/8/8/6Q1/6K1 w - - 0 1",
  "6k1/5pp1/8/6p1/8/8/3Q4/6K1 w - - 0 1",
  "6k1/4pppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/4Q2R/6K1 w - - 0 1",
  "6k1/5pp1/8/6p1/8/8/6Q1/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/5Q2/5K2 w - - 0 1",
  "6k1/5ppp/8/8/8/8/1Q6/5K2 w - - 0 1",
  "6k1/5ppp/8/8/8/8/5Q2/4K3 w - - 0 1",
  "5qk1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
  "5qk1/5ppp/8/8/8/8/4Q3/6K1 w - - 0 1",
  "5rk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  "5rk1/5ppp/8/8/8/8/5N2/6K1 w - - 0 1",
  "2r1k3/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  "2r2k2/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
  "6k1/8/8/4N3/4q3/8/8/2R3K1 w - - 0 1",
  "6k1/8/8/8/8/5q2/8/2R3K1 w - - 0 1",
  "6k1/8/8/8/8/4q3/8/2R3K1 w - - 0 1",
  "6k1/5r2/8/8/8/8/5Q2/6K1 w - - 0 1",
  "5qk1/5ppp/8/8/8/8/6R1/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/5N2/5Q2/6K1 w - - 0 1",
  "6k1/8/8/8/4q3/8/8/3R2K1 w - - 0 1",
  "6k1/4pppp/8/8/8/8/6R1/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/6Q1/5K2 w - - 0 1",
];

const results = [];
const seen = new Set();

for (const fen of FENS) {
  try {
    new Chess(fen);
  } catch {
    continue;
  }
  const m1 = findMateInOne(fen);
  if (m1) {
    const key = fen + JSON.stringify(m1.line);
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ fen, ...m1, win: "checkmate", pool: "m1" });
    }
  }
  const m2 = findLine2(fen);
  if (m2) {
    const key = fen + JSON.stringify(m2.line);
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ fen, ...m2, win: "checkmate", pool: "m2", openingAccept: "mate_in_2_opening" });
    }
  }
}

writeFileSync(join(__dirname, "puzzle-candidates.json"), JSON.stringify(results, null, 2));
console.log("Wrote puzzle-candidates.json —", results.length, "candidates");
