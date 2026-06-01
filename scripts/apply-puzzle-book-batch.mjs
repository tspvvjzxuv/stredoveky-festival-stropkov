/**
 * Nahradí úlohy v puzzle-entries-data.mjs podľa dávky z knihy.
 * node scripts/apply-puzzle-book-batch.mjs 2
 */
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PUZZLE_SPECS } from "./puzzle-entries-data.mjs";
import { PUZZLE_BOOK_BATCH_1 } from "./puzzle-book-batch-1.mjs";
import { PUZZLE_BOOK_BATCH_2 } from "./puzzle-book-batch-2.mjs";
import { PUZZLE_BOOK_BATCH_3 } from "./puzzle-book-batch-3.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const batchNum = parseInt(process.argv[2] || "3", 10);
const batch =
  batchNum === 1
    ? PUZZLE_BOOK_BATCH_1
    : batchNum === 2
      ? PUZZLE_BOOK_BATCH_2
      : batchNum === 3
        ? PUZZLE_BOOK_BATCH_3
        : null;

if (!batch) {
  console.error("Usage: node scripts/apply-puzzle-book-batch.mjs <1|2|3>");
  process.exit(1);
}

const specs = PUZZLE_SPECS.map((s) => ({ ...s }));

for (const entry of batch) {
  const idx = specs.findIndex(
    (s) => s.week === entry.week && s.difficulty === entry.difficulty
  );
  if (idx < 0) {
    console.error("No slot for week", entry.week, entry.difficulty);
    process.exit(1);
  }
  const { week, difficulty, bookId, theme, ...rest } = entry;
  specs[idx] = { week, difficulty, ...rest };
  console.log("Replaced w" + week, difficulty, bookId ? "#" + bookId : "");
}

function fmtPair(pair) {
  const from = typeof pair[0] === "string" ? pair[0] : pair[0].join("");
  const to = typeof pair[1] === "string" ? pair[1] : pair[1].join("");
  return `["${from}","${to}"]`;
}

function fmtSpec(s) {
  const lines = [];
  lines.push("  {");
  lines.push(`    week: ${s.week},`);
  lines.push(`    difficulty: "${s.difficulty}",`);
  lines.push(`    fen: "${s.fen}",`);
  if (s.win) lines.push(`    win: "${s.win}",`);
  lines.push(`    line: [${s.line.map((l) => fmtPair(l)).join(",")}],`);
  if (s.openingAccept)
    lines.push(`    openingAccept: "${s.openingAccept}",`);
  if (s.userAccepts)
    lines.push(
      `    userAccepts: ${JSON.stringify(s.userAccepts)},`
    );
  lines.push(`    subtitle: "${s.subtitle.replace(/"/g, '\\"')}",`);
  lines.push(`    solution: "${s.solution.replace(/"/g, '\\"')}",`);
  lines.push("  }");
  return lines.join("\n");
}

const batchesNote =
  batchNum >= 3
    ? "scripts/puzzle-book-batch-1.mjs, puzzle-book-batch-2.mjs, puzzle-book-batch-3.mjs"
    : batchNum >= 2
      ? "scripts/puzzle-book-batch-1.mjs, puzzle-book-batch-2.mjs"
      : "scripts/puzzle-book-batch-1.mjs";

const header = `/**
 * 36 úloh — týždne 1–2, 7–9, 10–12 z knihy; ostatné podľa motívu.
 * Úprava: node scripts/shuffle-puzzles.mjs | dávky: ${batchesNote}
 */
export const PUZZLE_SPECS = [
${specs.map(fmtSpec).join(",\n")},
];
`;

writeFileSync(join(__dirname, "puzzle-entries-data.mjs"), header, "utf8");
console.log("Wrote puzzle-entries-data.mjs");
