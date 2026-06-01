/**
 * Export FEN databázy do JSON (kľúč-hodnota pre AI / nástroje).
 * node scripts/export-book-fens-json.mjs
 */
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { PUZZLE_BOOK_FENS } from "./puzzle-book-fen-database.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Plochý objekt úloha_ID → FEN (opravený) */
const flat = {};
/** Plný záznam */
const full = {};

for (const [id, entry] of Object.entries(PUZZLE_BOOK_FENS)) {
  flat[`uloha_${id}`] = entry.fen;
  full[id] = {
    fen: entry.fen,
    ...(entry.fenAsProvided ? { fenAsProvided: entry.fenAsProvided } : {}),
    sideToMove: entry.sideToMove,
    playerColor: entry.fen.split(" ")[1] === "b" ? "b" : "w",
    category: entry.category,
    ...(entry.note ? { note: entry.note } : {}),
  };
}

const out = {
  version: 1,
  description: "FEN prepis diagramov z knihy (PTRA šachové hlavolamy)",
  byId: flat,
  entries: full,
};

const path = join(__dirname, "puzzle-book-fens.json");
writeFileSync(path, JSON.stringify(out, null, 2), "utf8");
console.log("Wrote", path, "—", Object.keys(flat).length, "positions");
