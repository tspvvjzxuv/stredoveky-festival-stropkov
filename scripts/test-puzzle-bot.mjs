import { chromium } from "playwright";

const BASE = process.env.PUZZLE_BASE || "http://127.0.0.1:5500";

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
  await page.waitForTimeout(800);
}

async function clearState(page) {
  await page.evaluate(() => {
    localStorage.removeItem("ptra-puzzle-rewards-v3");
    localStorage.removeItem("ptra-puzzle-access-v2");
  });
}

async function subtitle(page, id) {
  return page.locator(`#${id}-subtitle`).innerText();
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 2200 } });

await page.goto(`${BASE}/sach.html#sachove-hlavolamy`, { waitUntil: "networkidle" });
await clearState(page);
await page.reload({ waitUntil: "networkidle" });

const slider = page.locator("#sach-puzzle-timeline-range");
await slider.waitFor({ state: "visible" });
await slider.fill("0");
await page.waitForTimeout(400);

const visibleWeeks = await page.locator(".sach-puzzle-week.is-week-active").count();
console.log("Active week sections:", visibleWeeks, visibleWeeks === 1 ? "OK" : "FAIL");

console.log("\n=== Week 1 easy (mate in 1) ===");
await page.locator("#cg-w1-easy").scrollIntoViewIfNeeded();
let board = await page.locator("#cg-w1-easy cg-board").boundingBox();
await drag(page, board, 7, 2, 7, 7);
let sub = await subtitle(page, "cg-w1-easy");
console.log(sub.includes("Mat") || sub.includes("vyriešen") ? "OK solved" : sub.slice(-100));

console.log("\n=== Week 1 medium (bot) — retry until Kh8 line ===");
await page.locator("#cg-w1-medium").scrollIntoViewIfNeeded();
let solved = false;
for (let attempt = 0; attempt < 5 && !solved; attempt++) {
  await page.locator('[data-reset-puzzle="cg-w1-medium"]').click();
  await page.waitForTimeout(500);
  board = await page.locator("#cg-w1-medium cg-board").boundingBox();
  await drag(page, board, 6, 2, 5, 1);
  await page.waitForTimeout(1200);
  sub = await subtitle(page, "cg-w1-medium");
  if (/Správny|počítač|Dokončite|dokonč/i.test(sub)) {
    board = await page.locator("#cg-w1-medium cg-board").boundingBox();
    await drag(page, board, 5, 1, 5, 8);
    await page.waitForTimeout(500);
    sub = await subtitle(page, "cg-w1-medium");
    if (sub.includes("Mat") || sub.includes("vyriešen")) {
      solved = true;
      console.log("OK mate line on attempt", attempt + 1);
    }
  } else {
    console.log("attempt", attempt + 1, "bot line:", sub.slice(-60));
  }
}
if (!solved) console.log("WARN: medium puzzle not solved in 5 tries (random bot)");

console.log("\n=== Week 1 hard (tactic vs bot) ===");
await page.locator("#cg-w1-hard").scrollIntoViewIfNeeded();
let hardSolved = false;
for (let attempt = 0; attempt < 5; attempt++) {
  await page.locator('[data-reset-puzzle="cg-w1-hard"]').click();
  await page.waitForTimeout(500);
  board = await page.locator("#cg-w1-hard cg-board").boundingBox();
  await drag(page, board, 3, 1, 3, 8);
  await page.waitForTimeout(1200);
  sub = await subtitle(page, "cg-w1-hard");
  if (/Správny|materiál|Získajte|dokonč|počítač/i.test(sub)) {
    board = await page.locator("#cg-w1-hard cg-board").boundingBox();
    await drag(page, board, 3, 8, 6, 8);
    sub = await subtitle(page, "cg-w1-hard");
    const done = await page
      .locator('.sach-visual-item[data-puzzle-id="cg-w1-hard"].is-completed')
      .count();
    if (done > 0 || (!sub.includes("⚠️") && /splnen|vyriešen|Úspech/i.test(sub))) {
      hardSolved = true;
      console.log("OK tactic solved");
      break;
    }
  }
}
if (!hardSolved) console.log("WARN: hard puzzle not confirmed");

const weekSections = await page.locator(".sach-puzzle-week").count();
console.log("\nWeek sections rendered:", weekSections, weekSections === 12 ? "OK" : "FAIL");

await browser.close();
console.log("\nDone.");
