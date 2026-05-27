import { Chess } from "chess.js";
import { writeFileSync } from "fs";

function hasMixedDefenses(fen, line) {
  const c = new Chess(fen);
  for (let i = 0; i < line.length - 2; i++) {
    const [f, t] = line[i];
    c.move({ from: f, to: t });
    if (c.turn() !== "b") continue;
    const fenB = c.fen();
    const afterW = new Chess(fen);
    for (let j = 0; j < i; j++) afterW.move({ from: line[j][0], to: line[j][1] });
    // position before black move i
  }
  return true;
}

function findFirst(fen, maxWhite, requireMixed = false) {
  const start = new Chess(fen);
  if (start.turn() !== "w") return null;
  let found = null;

  function dfs(chess, line, whiteLeft) {
    if (found) return;
    if (chess.isCheckmate() && chess.turn() === "b") {
      if (line.filter((_, i) => i % 2 === 0).length >= 2) {
        found = [...line];
      }
      return;
    }
    if (whiteLeft === 0) return;

    if (chess.turn() === "w") {
      const moves = chess.moves({ verbose: true });
      for (const m of moves) {
        const n = new Chess(chess.fen());
        n.move({ from: m.from, to: m.to, promotion: m.promotion });
        if (n.isCheckmate() && whiteLeft === 1) {
          found = [...line, [m.from, m.to]];
          return;
        }
        dfs(n, [...line, [m.from, m.to]], whiteLeft - 1);
        if (found) return;
      }
      return;
    }

    const replies = chess.moves({ verbose: true });
    let sound = 0;
    const branches = [];
    for (const b of replies) {
      const n = new Chess(chess.fen());
      n.move({ from: b.from, to: b.to, promotion: b.promotion });
      const before = found;
      dfs(n, [...line, [b.from, b.to]], whiteLeft);
      if (found && found !== before) sound++;
      else if (!found) branches.push(null);
    }
    if (!found && replies.length) {
      // take first reply
      const b = replies[0];
      const n = new Chess(chess.fen());
      n.move({ from: b.from, to: b.to, promotion: b.promotion });
      dfs(n, [...line, [b.from, b.to]], whiteLeft);
    }
  }

  for (let w = 2; w <= maxWhite; w++) {
    found = null;
    dfs(start, [], w);
    if (found) {
      const c = new Chess(fen);
      const sans = [];
      for (const [f, t] of found) sans.push(c.move({ from: f, to: t }).san);
      return { fen, line: found, sans: sans.join(" "), whiteMoves: w };
    }
  }
  return null;
}

function countMixed(fen, line) {
  const start = new Chess(fen);
  for (let i = 0; i < line.length; i++) {
    const [f, t] = line[i];
    if (start.turn() === "b" && i < line.length - 1) {
      const fenB = start.fen();
      const replies = start.moves({ verbose: true });
      let sound = 0;
      for (const b of replies) {
        const n = new Chess(fenB);
        n.move({ from: b.from, to: b.to, promotion: b.promotion });
        const rest = line.slice(i + 1);
        const trial = new Chess(n.fen());
        let ok = true;
        for (const [wf, wt] of rest) {
          if (!trial.move({ from: wf, to: wt })) {
            ok = false;
            break;
          }
        }
        if (ok && trial.isCheckmate() && trial.turn() === "b") sound++;
      }
      if (sound > 0 && sound < replies.length) return true;
    }
    start.move({ from: f, to: t });
  }
  return false;
}

const templates = [];
const backs = ["6k1/5ppp", "6k1/4pppp", "5qk1/5ppp", "5rk1/5ppp", "2r1k3/5ppp", "6k1/5pp1"];
const pieces = [
  "5Q2/6K1",
  "5Q2/5K2",
  "5Q1R/6K1",
  "1R6/5Q2/6K1",
  "6k1/8/8/4N3/5q2/8/8/2R3K1",
  "6k1/8/8/8/4q3/8/8/3R2K1",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqkb1r/pppp1ppp/4p2n/8/4P3/2N5/PPP1PPPP/R1BQKBNR",
];

for (const b of backs) {
  for (const p of [
    "8/8/8/5Q2/6K1",
    "8/8/8/5R2/6K1",
    "8/8/8/6R1/6K1",
    "8/8/8/7R/6K1",
    "8/8/8/1R6/5Q2/6K1",
    "8/8/8/5N2/6K1",
  ]) {
    templates.push(`${b}/${p} w - - 0 1`);
  }
}
templates.push(
  "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
  "6k1/8/8/8/4q3/8/8/3R2K1 w - - 0 1",
  "2r1k3/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
  "rnbqkb1r/pppp1ppp/4p2n/8/4P3/2N5/PPP1PPPP/R1BQKBNR w KQkq - 0 1"
);

const out = [];
const seen = new Set();

for (const fen of templates) {
  try {
    new Chess(fen);
  } catch {
    continue;
  }
  for (const w of [2, 3, 4]) {
    const r = findFirst(fen, w);
    if (!r) continue;
    const key = r.line.map((x) => x.join("")).join(",");
    if (seen.has(key)) continue;
    seen.add(key);
    const mixed = countMixed(fen, r.line);
    out.push({ ...r, mixed, len: r.line.length });
    break;
  }
}

out.sort((a, b) => a.whiteMoves - b.whiteMoves || a.len - b.len);
console.log("found", out.length);
for (const r of out) {
  console.log(`w${r.whiteMoves}${r.mixed ? "*" : ""}`, r.sans, "|", r.fen.slice(0, 45));
}
writeFileSync("scripts/discovered-fast.json", JSON.stringify(out, null, 2));
