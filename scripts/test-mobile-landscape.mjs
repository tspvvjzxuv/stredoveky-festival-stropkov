import { chromium, devices } from "playwright";

const BASE = process.env.PUZZLE_BASE || "https://ptra.sk";

/** iPhone 15 Pro Max landscape — šírka >900 px, dotykové zariadenie. */
const iPhoneLandscape = {
  ...devices["iPhone 15 Pro Max"],
  viewport: { width: 932, height: 430 },
  isMobile: true,
  hasTouch: true,
};

async function check(label, context) {
  const page = await context.newPage();
  await page.goto(`${BASE}/sach.html#sachove-hlavolamy`, {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });
  await page.waitForTimeout(3500);

  const data = await page.evaluate(() => ({
    isMobileLayout: typeof window.PtraSach !== "undefined",
    weekSections: document.querySelectorAll(".sach-puzzle-week").length,
    activeItems: document.querySelectorAll(".sach-puzzle-week.is-week-active .sach-visual-item").length,
    pieces: document.querySelectorAll(".sach-puzzle-week.is-week-active piece").length,
    gridTextLen: (document.getElementById("sach-puzzle-grid")?.innerText || "").trim().length,
    hasRetry: !!document.getElementById("sach-grid-retry"),
  }));

  console.log(label, JSON.stringify(data));
  await page.close();

  if (data.activeItems < 3 || data.pieces < 20) {
    throw new Error(label + " failed: expected 3 puzzles with pieces");
  }
}

const browser = await chromium.launch();
await check("iPhone landscape prod", await browser.newContext(iPhoneLandscape));
await check("iPhone portrait prod", await browser.newContext(devices["iPhone 15 Pro Max"]));
await browser.close();
console.log("OK");
