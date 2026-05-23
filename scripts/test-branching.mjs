import { chromium } from "playwright";

const BASE = process.env.PUZZLE_BASE || "http://127.0.0.1:8765";

async function drag(page, boardBox, fromFile, fromRank, toFile, toRank) {
  const sq = boardBox.width / 8;
  const start = {
    x: boardBox.x + (fromFile - 1) * sq + sq / 2,
    y: boardBox.y + (8 - fromRank) * sq + sq / 2,
  };
  const end = {
    x: boardBox.x + (toFile - 1) * sq + sq / 2,
    y: boardBox.y + (8 - toRank) * sq + sq / 2,
  };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(700);
}

async function clearRewards(page) {
  await page.evaluate(() => {
    localStorage.removeItem("ptra-puzzle-rewards-v2");
    localStorage.removeItem("ptra-puzzle-rewards-v1");
  });
}

async function rewardTier(page, id) {
  return page.evaluate((puzzleId) => {
    const raw = localStorage.getItem("ptra-puzzle-rewards-v2");
    if (!raw) return null;
    const rec = JSON.parse(raw)[puzzleId];
    return rec ? rec.tier : null;
  }, id);
}

async function subtitle(page, id) {
  return page.locator(`#${id}-subtitle`).innerText();
}

async function overlayVisible(page, id) {
  const host = page.locator(`#${id}`).locator("xpath=ancestor::*[contains(@class,'chessground-host')]");
  const overlay = host.locator(".sach-wrong-move-overlay");
  return overlay.isVisible().catch(() => false);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1400 } });

await page.goto(`${BASE}/sach.html#sachove-hlavolamy`, { waitUntil: "networkidle" });
await clearRewards(page);
await page.reload({ waitUntil: "networkidle" });

console.log("\n=== Puzzle 2: main line Kh8 ===");
await page.locator("#cg-puzzle-2").scrollIntoViewIfNeeded();
let board = await page.locator("#cg-puzzle-2 cg-board").boundingBox();
await drag(page, board, 6, 2, 5, 1);
let sub = await subtitle(page, "cg-puzzle-2");
console.log("after Qe1:", sub.includes("čierna obrana") ? "OK black phase" : sub.slice(-80));
await drag(page, board, 7, 8, 8, 8);
sub = await subtitle(page, "cg-puzzle-2");
console.log("after Kh8:", sub.includes("dokončovací") ? "OK white finish" : sub.slice(-80));
await drag(page, board, 5, 1, 5, 8);
sub = await subtitle(page, "cg-puzzle-2");
console.log("after Qe8:", sub.includes("Hotovo") ? "OK solved" : sub.slice(-80));
console.log("reward tier:", await rewardTier(page, "cg-puzzle-2"));

console.log("\n=== Puzzle 2: Kf8 branch then step back ===");
await page.locator('[data-reset-puzzle="cg-puzzle-2"]').click();
await page.waitForTimeout(400);
await clearRewards(page);
board = await page.locator("#cg-puzzle-2 cg-board").boundingBox();
await drag(page, board, 6, 2, 5, 1);
await drag(page, board, 7, 8, 6, 8);
sub = await subtitle(page, "cg-puzzle-2");
console.log("after Kf8:", sub.includes("dokončovací") ? "OK white can play" : sub.slice(-80));
await drag(page, board, 5, 1, 5, 8);
const ov = await overlayVisible(page, "cg-puzzle-2");
console.log("wrong finish overlay:", ov ? "OK shown" : "FAIL missing");
await page.locator("#cg-puzzle-2").locator("xpath=ancestor::*[contains(@class,'chessground-host')]").locator(".btn-outline").click();
await page.waitForTimeout(400);
sub = await subtitle(page, "cg-puzzle-2");
console.log("after step back:", sub.includes("čierna obrana") ? "OK black phase" : sub.slice(-80));

console.log("\n=== Puzzle 3: main line Qf8 ===");
await page.locator("#cg-puzzle-3").scrollIntoViewIfNeeded();
await clearRewards(page);
board = await page.locator("#cg-puzzle-3 cg-board").boundingBox();
await drag(page, board, 3, 1, 3, 8);
sub = await subtitle(page, "cg-puzzle-3");
console.log("after Rc8+:", sub.includes("čierna obrana") ? "OK" : sub.slice(-80));
await drag(page, board, 6, 4, 6, 8);
sub = await subtitle(page, "cg-puzzle-3");
console.log("after Qf8:", sub.includes("dokončovací") ? "OK" : sub.slice(-80));
await drag(page, board, 3, 8, 6, 8);
sub = await subtitle(page, "cg-puzzle-3");
console.log("after Rxf8:", sub.includes("Hotovo") ? "OK solved" : sub.slice(-80));
console.log("reward tier:", await rewardTier(page, "cg-puzzle-3"));

console.log("\n=== Puzzle 2: wrong finish then correct (partial reward) ===");
await page.locator('[data-reset-puzzle="cg-puzzle-2"]').click();
await page.waitForTimeout(400);
await clearRewards(page);
board = await page.locator("#cg-puzzle-2 cg-board").boundingBox();
await drag(page, board, 6, 2, 5, 1);
await drag(page, board, 7, 8, 8, 8);
await drag(page, board, 5, 1, 4, 1);
await page
  .locator("#cg-puzzle-2")
  .locator("xpath=ancestor::*[contains(@class,'chessground-host')]")
  .locator(".btn-primary")
  .click();
await page.waitForTimeout(400);
board = await page.locator("#cg-puzzle-2 cg-board").boundingBox();
await drag(page, board, 5, 1, 5, 8);
console.log("reward tier after mistake:", await rewardTier(page, "cg-puzzle-2"));

console.log("\n=== Puzzle 3: Kh7 branch ===");
await page.locator('[data-reset-puzzle="cg-puzzle-3"]').click();
await page.waitForTimeout(400);
board = await page.locator("#cg-puzzle-3 cg-board").boundingBox();
await drag(page, board, 3, 1, 3, 8);
await drag(page, board, 7, 8, 8, 7);
sub = await subtitle(page, "cg-puzzle-3");
console.log("after Kh7:", sub.includes("dokončovací") ? "OK white can play" : sub.slice(-80));

await browser.close();
console.log("\nDone.");
