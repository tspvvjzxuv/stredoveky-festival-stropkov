/**
 * Overí všetky FEN v puzzle-book-fen-database.mjs (chess.js + mat 1/2).
 * node scripts/verify-book-fens.mjs
 */
import { Chess } from "chess.js";
import { PUZZLE_BOOK_FENS, FEN_CATEGORIES } from "./puzzle-book-fen-database.mjs";

function hasKing(c, color) {
  return c.board().flat().some((p) => p && p.type === "k" && p.color === color);
}

function positionOk(c) {
  return hasKing(c, "w") && hasKing(c, "b");
}

function mateInOne(fen, playerColor) {
  const c = new Chess(fen);
  if (c.turn() !== playerColor) return [];
  const out = [];
  for (const m of c.moves({ verbose: true })) {
    const n = new Chess(c.fen());
    n.move(m);
    if (n.isCheckmate()) out.push([m.from, m.to, n.history().at(-1)]);
  }
  return out;
}

function mateInTwo(fen, playerColor) {
  const opp = playerColor === "b" ? "w" : "b";
  const start = new Chess(fen);
  if (start.turn() !== playerColor) return [];
  const out = [];
  for (const m1 of start.moves({ verbose: true })) {
    const c1 = new Chess(start.fen());
    c1.move(m1);
    if (!positionOk(c1)) continue;
    for (const m2 of c1.moves({ verbose: true })) {
      const c2 = new Chess(c1.fen());
      c2.move(m2);
      if (!positionOk(c2)) continue;
      for (const m3 of c2.moves({ verbose: true })) {
        const c3 = new Chess(c2.fen());
        c3.move(m3);
        if (c3.isCheckmate() && c3.turn() === opp) {
          out.push({
            line: [[m1.from, m1.to], [m2.from, m2.to], [m3.from, m3.to]],
            san: `${c1.history().at(-1)} ${c2.history().at(-1)} ${c3.history().at(-1)}`,
          });
          if (out.length >= 3) return out;
        }
      }
    }
  }
  return out;
}

let invalid = 0;
const results = [];

for (const [id, entry] of Object.entries(PUZZLE_BOOK_FENS)) {
  const pc = entry.fen.split(" ")[1] === "b" ? "b" : "w";
  let status = "OK";
  let extra = "";
  try {
    new Chess(entry.fen);
  } catch (e) {
    status = "INVALID";
    extra = e.message;
    invalid++;
  }
  if (status === "OK") {
    if (entry.category === "mate_in_1") {
      const m1 = mateInOne(entry.fen, pc);
      extra = m1.length ? `m1: ${m1[0][2]}` : "no mate in 1";
      if (!m1.length) status = "WARN";
    } else if (entry.category === "mate_in_2") {
      try {
        const m2 = mateInTwo(entry.fen, pc);
        extra = m2.length ? `m2: ${m2[0].san}` : "no mate in 2";
        if (!m2.length) status = "WARN";
      } catch (e) {
        status = "WARN";
        extra = `search err: ${e.message}`;
      }
    }
  }
  results.push({ id, status, pc, category: entry.category, extra, note: entry.note });
}

console.log("=== FEN databáza knihy ===\n");
for (const r of results) {
  const flag = r.status === "OK" ? "✓" : r.status === "WARN" ? "?" : "✗";
  console.log(`${flag} #${r.id} [${r.category}] ${r.pc} — ${r.extra}${r.note ? ` (${r.note})` : ""}`);
}

console.log("\n=== Podľa kategórie ===");
for (const [cat, ids] of Object.entries(FEN_CATEGORIES)) {
  console.log(`${cat}: ${ids.join(", ")}`);
}

console.log(`\nCelkom: ${results.length}, neplatných: ${invalid}`);
if (invalid) process.exit(1);
