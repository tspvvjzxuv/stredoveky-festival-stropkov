/**
 * Weeks 1–4: restore pre–book (multi-move) specs; weeks 5–12: keep current book specs.
 */
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const oldPath = join(__dirname, "puzzle-entries-old-w1-4.mjs");

execSync(`git show 72d8306:scripts/puzzle-entries-data.mjs > ${oldPath}`, { encoding: "utf8" });

const { PUZZLE_SPECS: oldSpecs } = await import(`./puzzle-entries-old-w1-4.mjs`);
const { PUZZLE_SPECS: curSpecs } = await import("./puzzle-entries-data.mjs");

const oldW14 = oldSpecs.filter((s) => s.week >= 1 && s.week <= 4);
const curW512 = curSpecs.filter((s) => s.week >= 5);

const merged = [...oldW14, ...curW512].sort((a, b) => {
  if (a.week !== b.week) return a.week - b.week;
  const o = { easy: 0, medium: 1, hard: 2 };
  return o[a.difficulty] - o[b.difficulty];
});

function specToJs(s, indent) {
  const pad = "  ".repeat(indent);
  const inner = "  ".repeat(indent + 1);
  let out = `${pad}{\n`;
  out += `${inner}week: ${s.week},\n`;
  out += `${inner}difficulty: ${JSON.stringify(s.difficulty)},\n`;
  out += `${inner}fen: ${JSON.stringify(s.fen)},\n`;
  if (s.win) out += `${inner}win: ${JSON.stringify(s.win)},\n`;
  if (s.playerColor) out += `${inner}playerColor: ${JSON.stringify(s.playerColor)},\n`;
  out += `${inner}line: ${JSON.stringify(s.line)},\n`;
  if (s.openingAccept) out += `${inner}openingAccept: ${JSON.stringify(s.openingAccept)},\n`;
  if (s.userAccepts) out += `${inner}userAccepts: ${JSON.stringify(s.userAccepts)},\n`;
  out += `${inner}subtitle: ${JSON.stringify(s.subtitle)},\n`;
  out += `${inner}solution: ${JSON.stringify(s.solution)},\n`;
  out += `${pad}},\n`;
  return out;
}

let body = `/**
 * 36 úloh — týždne 1–4: mat v 2+ (overené kombinácie); 5–12: úlohy z knihy.
 * Generovanie katalógu: node scripts/build-puzzle-catalog.mjs
 */
export const PUZZLE_SPECS = [\n`;
for (const s of merged) body += specToJs(s, 1);
body += `];\n`;

writeFileSync(join(__dirname, "puzzle-entries-data.mjs"), body, "utf8");
console.log("Merged", merged.length, "specs (w1-4:", oldW14.length, "w5-12:", curW512.length, ")");