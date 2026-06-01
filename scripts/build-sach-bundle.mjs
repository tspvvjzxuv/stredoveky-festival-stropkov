import * as esbuild from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "js/sach.bundle.js");

await esbuild.build({
  entryPoints: [join(root, "js/chessground-puzzles.js")],
  bundle: true,
  format: "iife",
  globalName: "PtraSach",
  outfile: out,
  target: ["ios15", "safari15", "chrome90", "firefox90"],
  minify: true,
  sourcemap: true,
  logLevel: "info",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

console.log("Wrote", out);
