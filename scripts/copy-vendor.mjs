import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nm = join(root, "node_modules");

function requirePath(rel) {
  const p = join(nm, rel);
  if (!existsSync(p)) {
    console.error("Missing:", p, "— run npm install");
    process.exit(1);
  }
  return p;
}

mkdirSync(join(root, "js/vendor/chessground"), { recursive: true });
mkdirSync(join(root, "css/vendor/chessground"), { recursive: true });

cpSync(join(nm, "@lichess-org/chessground/dist"), join(root, "js/vendor/chessground"), {
  recursive: true,
});
cpSync(join(nm, "chess.js/dist/esm/chess.js"), join(root, "js/vendor/chess.mjs"));
for (const name of ["chessground.base.css", "chessground.brown.css", "chessground.cburnett.css"]) {
  cpSync(join(nm, "@lichess-org/chessground/assets", name), join(root, "css/vendor/chessground", name));
}

console.log("Vendor copied: js/vendor/chessground, js/vendor/chess.mjs, css/vendor/chessground");
