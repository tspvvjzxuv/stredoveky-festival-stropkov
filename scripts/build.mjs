import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

var vendorCopy = spawnSync("node", ["scripts/copy-vendor.mjs"], { stdio: "inherit" });
if (vendorCopy.status !== 0) process.exit(vendorCopy.status || 1);

var required = [
  "index.html",
  "sach.html",
  "prihlasky.html",
  "css/style.css",
  "css/design-language.css",
  "DESIGN.md",
  "js/main.js",
  "js/sach.bundle.js",
  "js/sach.bundle.js.map",
  "js/puzzle-bot.js",
  "js/puzzle-mount.js",
  "js/puzzle-schedule.js",
  "js/puzzle-unlock.js",
  "js/puzzle-board-ui.js",
  "js/puzzle-timeline-ui.js",
  "js/puzzle-wrong-move-ui.js",
  "js/puzzle-engine.js",
  "js/puzzle-rewards.js",
  "js/puzzles-data.js",
  "js/vendor/chess.mjs",
  "js/vendor/chessground/chessground.js",
  "css/vendor/chessground/chessground.base.css",
  "js/harmonogram-data.js",
  "js/harmonogram-live.js",
  "js/config.js",
  "js/vendor/bankovy-dar-qr.bundle.js",
  "js/vendor/bysquare/lib/pay/index.js",
  "images/festival-map.webp",
  "images/logo-andreasa-shield.png",
  "images/hero-poster.webp",
  "images/vy-frame.webp",
  "images/vy-frame-top.webp",
  "images/vy-frame-bottom.webp",
  "images/vy-dialog-bg.webp",
  "images/vy-panel-bg.webp",
  "images/vy-nav-frame.webp",
  "images/vy-navbar-bg.webp",
  "videos/hero.mp4",
];

var missing = required.filter(function (path) {
  return !existsSync(path);
});

if (missing.length) {
  console.error("Build failed — chýbajúce súbory:");
  for (var i = 0; i < missing.length; i++) {
    console.error("  - " + missing[i]);
  }
  process.exit(1);
}

console.log("Build OK — statický web pripravený na nasadenie (" + required.length + " súborov overených).");
