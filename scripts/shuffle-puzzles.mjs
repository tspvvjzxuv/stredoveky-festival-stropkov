/** Prepíše týždne tak, aby prvé úlohy mali rôzne FEN; overí a zapíše puzzle-entries-data.mjs */
import { Chess } from "chess.js";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mod = await import(pathToFileURL(join(__dirname, "puzzle-entries-data.mjs")).href + "?t=" + Date.now());
const all = mod.PUZZLE_SPECS;

const byDiff = { easy: [], medium: [], hard: [] };
for (const s of all) byDiff[s.difficulty].push({ ...s });

// Poradie „easy“: striedanie dáma/veža/jazdec/iná pozícia
const easyOrder = [1, 4, 5, 0, 2, 3, 6, 8, 9, 7, 10, 11].map((i) => byDiff.easy[i % byDiff.easy.length]);
const medOrder = [2, 0, 4, 1, 3, 5, 6, 7, 8, 9, 10, 11].map((i) => byDiff.medium[i % byDiff.medium.length]);
const hardOrder = [0, 2, 1, 4, 3, 5, 6, 7, 8, 9, 10, 11].map((i) => byDiff.hard[i % byDiff.hard.length]);

const out = [];
for (let w = 1; w <= 12; w++) {
  const i = w - 1;
  for (const [diff, arr] of [
    ["easy", easyOrder],
    ["medium", medOrder],
    ["hard", hardOrder],
  ]) {
    out.push({ ...arr[i], week: w, difficulty: diff });
  }
}

function verify(spec) {
  const c = new Chess(spec.fen);
  const win = spec.win || "checkmate";
  for (const [f, t] of spec.line) {
    if (!c.move({ from: f, to: t })) return false;
  }
  if (win === "black_queen_captured") {
    for (const row of c.board())
      for (const p of row) if (p?.type === "q" && p.color === "b") return false;
    return true;
  }
  return c.isCheckmate();
}

let bad = 0;
for (const s of out) if (!verify(s)) {
  console.log("bad", s.week, s.difficulty);
  bad++;
}
if (bad) process.exit(1);

const body = out
  .map((s) => {
    const lines = [
      "  {",
      `    week: ${s.week},`,
      `    difficulty: "${s.difficulty}",`,
      `    fen: "${s.fen}",`,
    ];
    if (s.win) lines.push(`    win: "${s.win}",`);
    lines.push(`    line: ${JSON.stringify(s.line)},`);
    if (s.openingAccept) lines.push(`    openingAccept: "${s.openingAccept}",`);
    if (s.userAccepts) lines.push(`    userAccepts: ${JSON.stringify(s.userAccepts)},`);
    lines.push(`    subtitle: ${JSON.stringify(s.subtitle)},`);
    lines.push(`    solution: ${JSON.stringify(s.solution)},`);
    lines.push("  },");
    return lines.join("\n");
  })
  .join("\n");

writeFileSync(
  join(__dirname, "puzzle-entries-data.mjs"),
  `/**\n * 36 úloh — rôzne FEN a pomenované matové motívy (shuffle-puzzles.mjs).\n */\nexport const PUZZLE_SPECS = [\n${body}\n];\n`,
  "utf8"
);
const fens = new Set(out.map((s) => s.fen.split(" ")[0]));
console.log("wrote", out.length, "unique fens", fens.size);
