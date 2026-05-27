/**
 * Search simple endgame FENs for mate-in-2 / mate-in-3 lines (white to move).
 */
import { Chess } from "chess.js";

function blackQueen(c) {
  return c.board().flat().some((x) => x && x.type === "q" && x.color === "b");
}

function isWin(c, win) {
  if (win === "capture") return !blackQueen(c);
  return c.isCheckmate() && c.turn() === "b";
}

function tryLine(fen, line, win = "mate") {
  const c = new Chess(fen);
  const sans = [];
  for (const [f, t] of line) {
    const m = c.move({ from: f, to: t });
    if (!m) return null;
    sans.push(m.san);
  }
  if (!isWin(c, win)) return null;
  return { fen, line, sans: sans.join(" ") };
}

function findMateInN(fen, depth, maxUnsoundDefenses = 3) {
  const start = new Chess(fen);
  if (start.turn() !== "w" || start.isGameOver()) return null;

  function search(chess, line, pliesLeft) {
    if (pliesLeft === 0) {
      if (chess.isCheckmate() && chess.turn() === "b") return line;
      return null;
    }
    if (chess.turn() === "w") {
      for (const m of chess.moves({ verbose: true })) {
        const n = new Chess(chess.fen());
        n.move({ from: m.from, to: m.to, promotion: m.promotion });
        const r = search(n, [...line, [m.from, m.to]], pliesLeft - 1);
        if (r) return r;
      }
      return null;
    }
    // black - need at least one sound defense for puzzle, prefer mix
    const replies = chess.moves({ verbose: true });
    let sound = 0;
    for (const b of replies) {
      const n = new Chess(chess.fen());
      n.move({ from: b.from, to: b.to, promotion: b.promotion });
      if (search(n, [...line, [b.from, b.to]], pliesLeft - 1)) sound++;
    }
    if (sound === 0) return null;
    if (sound < replies.length && sound <= maxUnsoundDefenses + sound) {
      for (const b of replies) {
        const n = new Chess(chess.fen());
        n.move({ from: b.from, to: b.to, promotion: b.promotion });
        const r = search(n, [...line, [b.from, b.to]], pliesLeft - 1);
        if (r) return r;
      }
    }
    return null;
  }

  // plies: white-black-white for mate in 2 = 3 white moves? 
  // mate in 2 = W B W (3 moves total, 2 white)
  const plies = depth * 2 - 1;
  return search(start, [], plies);
}

const templates = [];
for (const back of ["6k1", "5qk1", "6k1"]) {
  for (const pawns of ["5ppp", "4pppp", "5pp1", "6pp1"]) {
    for (const wPiece of ["5Q2", "5R2", "6Q1", "6R1", "2Q5", "4Q3", "5Q1R", "3Q4"]) {
      for (const wK of ["6K1", "5K2", "4K3"]) {
        templates.push(`${back}/${pawns}/8/8/8/8/${wPiece}/${wK} w - - 0 1`);
      }
    }
  }
}

const unique = new Set();
const mate2 = [];
const mate3 = [];

for (const fen of templates) {
  try {
    new Chess(fen);
  } catch {
    continue;
  }
  const line2 = findMateInN(fen, 2, 2);
  if (line2) {
    const key = line2.map((x) => x.join("")).join(",");
    if (!unique.has(key)) {
      unique.add(key);
      const t = tryLine(fen, line2);
      if (t) mate2.push(t);
    }
  }
  const line3 = findMateInN(fen, 3, 2);
  if (line3 && line3.length === 5) {
    const key = "3:" + line3.map((x) => x.join("")).join(",");
    if (!unique.has(key)) {
      unique.add(key);
      const t = tryLine(fen, line3);
      if (t) mate3.push(t);
    }
  }
}

console.log("mate2", mate2.length);
for (const p of mate2.slice(0, 20)) console.log("2", p.sans, p.fen);

console.log("\nmate3", mate3.length);
for (const p of mate3.slice(0, 15)) console.log("3", p.sans, p.fen);
