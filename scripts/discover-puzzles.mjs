import { Chess } from "chess.js";
import { writeFileSync } from "fs";

const backRanks = [
  "6k1/5ppp/8/8/8/8",
  "6k1/4pppp/8/8/8/8",
  "6k1/5pp1/8/6p1/8/8",
  "5qk1/5ppp/8/8/8/8",
  "5rk1/5ppp/8/8/8/8",
  "6k1/6ppp/8/8/8/8",
];
const whiteBack = ["5Q2/6K1", "5R2/6K1", "6Q1/6K1", "6R1/6K1", "2Q5/6K1", "4Q3/6K1", "5Q2/5K2", "7R/6K1", "1R6/6K1", "5Q1R/6K1", "3Q4/6K1", "5N2/6K1", "4N3/6K1"];

function blackQueen(c) {
  return c.board().flat().some((x) => x && x.type === "q" && x.color === "b");
}

function findLine(fen, maxWhite, winMate = true) {
  const start = new Chess(fen);
  if (start.turn() !== "w") return null;

  function dfs(chess, line, whiteLeft) {
    if (winMate ? chess.isCheckmate() && chess.turn() === "b" : !blackQueen(chess)) {
      return line.length && whiteLeft === 0 ? line : null;
    }
    if (whiteLeft === 0) return null;

    if (chess.turn() === "w") {
      for (const m of chess.moves({ verbose: true })) {
        const n = new Chess(chess.fen());
        n.move({ from: m.from, to: m.to, promotion: m.promotion });
        if (winMate && n.isCheckmate() && n.turn() === "b" && whiteLeft === 1) {
          return [...line, [m.from, m.to]];
        }
        const r = dfs(n, [...line, [m.from, m.to]], whiteLeft - 1);
        if (r) return r;
      }
      return null;
    }

    const replies = chess.moves({ verbose: true });
    let found = null;
    let sound = 0;
    for (const b of replies) {
      const n = new Chess(chess.fen());
      n.move({ from: b.from, to: b.to, promotion: b.promotion });
      const r = dfs(n, [...line, [b.from, b.to]], whiteLeft);
      if (r) {
        sound++;
        if (!found) found = r;
      }
    }
    if (sound > 0 && sound < replies.length) return found;
    if (sound > 0) return found;
    return null;
  }

  for (let w = 2; w <= maxWhite; w++) {
    const line = dfs(start, [], w);
    if (line) return { line, whiteMoves: w };
  }
  return null;
}

const results = [];
const seen = new Set();

for (const mid of backRanks) {
  for (const back of whiteBack) {
    const fen = `${mid}/${back} w - - 0 1`;
    try {
      new Chess(fen);
    } catch {
      continue;
    }
    const m2 = findLine(fen, 2, true);
    if (m2) {
      const key = m2.line.map((x) => x.join("")).join(",");
      if (!seen.has(key)) {
        seen.add(key);
        const c = new Chess(fen);
        const sans = [];
        for (const [f, t] of m2.line) sans.push(c.move({ from: f, to: t }).san);
        results.push({ type: "m2", fen, line: m2.line, sans: sans.join(" "), key });
      }
    }
    const m3 = findLine(fen, 3, true);
    if (m3 && m3.whiteMoves === 3) {
      const key = "3:" + m3.line.map((x) => x.join("")).join(",");
      if (!seen.has(key)) {
        seen.add(key);
        const c = new Chess(fen);
        const sans = [];
        for (const [f, t] of m3.line) sans.push(c.move({ from: f, to: t }).san);
        results.push({ type: "m3", fen, line: m3.line, sans: sans.join(" "), key });
      }
    }
  }
}

// capture puzzles with queen on board
const capFens = [
  "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
  "6k1/8/8/8/4q3/8/8/3R2K1 w - - 0 1",
  "6k1/8/8/8/8/4q3/8/2R3K1 w - - 0 1",
  "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
];
for (const fen of capFens) {
  const m = findLine(fen, 2, false);
  if (m) {
    const c = new Chess(fen);
    const sans = [];
    for (const [f, t] of m.line) sans.push(c.move({ from: f, to: t }).san);
    results.push({ type: "cap", fen, line: m.line, sans: sans.join(" ") });
  }
}

results.sort((a, b) => a.type.localeCompare(b.type));
console.log("total", results.length);
console.log("m2", results.filter((r) => r.type === "m2").length);
console.log("m3", results.filter((r) => r.type === "m3").length);
console.log("cap", results.filter((r) => r.type === "cap").length);
for (const r of results) console.log(r.type, r.sans, "|", r.fen);

writeFileSync("scripts/discovered-puzzles.json", JSON.stringify(results, null, 2));
