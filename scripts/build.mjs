import { existsSync } from "node:fs";

var required = [
  "index.html",
  "sach.html",
  "prihlasky.html",
  "css/style.css",
  "js/main.js",
  "js/chessground-puzzles.js",
  "js/puzzle-rewards.js",
  "js/puzzles-data.js",
  "js/harmonogram-data.js",
  "js/harmonogram-live.js",
  "js/config.js",
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
