import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["js/bankovy-dar-qr.js"],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  outfile: "js/vendor/bankovy-dar-qr.bundle.mjs",
  logLevel: "info",
});

console.log("Pay by Square QR bundle OK → js/vendor/bankovy-dar-qr.bundle.mjs");
