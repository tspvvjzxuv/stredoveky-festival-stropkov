import { chromium, devices } from "playwright";

const BASE = process.env.PUZZLE_BASE || "http://127.0.0.1:38705";

async function testDevice(deviceName, device) {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...device });
  const page = await context.newPage();

  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message)));

  await page.goto(`${BASE}/sach.html#sachove-hlavolamy`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  const loading = await page.locator("#sach-loading").isHidden();
  const gridHtml = await page.locator("#sach-puzzle-grid").innerHTML();
  const hasFail = gridHtml.includes("sach-module-fail");
  const weekCount = await page.locator(".sach-puzzle-week").count();
  const activeWeeks = await page.locator(".sach-puzzle-week.is-week-active").count();
  const boards = await page.locator(".sach-puzzle-week.is-week-active .cg-board").count();
  const pieces = await page.locator(".sach-puzzle-week.is-week-active piece").count();

  const sizes = await page.evaluate(() => {
    const el = document.querySelector(".sach-puzzle-week.is-week-active .cg-board");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: r.width, h: r.height, pieces: el.querySelectorAll("piece").length };
  });

  await page.locator("#sach-puzzle-timeline-range").fill("1");
  await page.waitForTimeout(800);

  const w2Pieces = await page.locator("#cg-w2-hard piece").count();
  const w2Box = await page.locator("#cg-w2-hard").boundingBox();

  // Simulate address bar resize (Safari)
  await page.evaluate(() => {
    if (window.visualViewport) {
      window.dispatchEvent(new Event("resize"));
    }
  });
  await page.waitForTimeout(400);
  const piecesAfterResize = await page.locator("#cg-w2-hard piece").count();

  console.log(
    JSON.stringify({
      device: deviceName,
      loadingHidden: loading,
      hasFail,
      weekCount,
      activeWeeks,
      boards,
      pieces,
      sizes,
      w2Pieces,
      w2Box,
      piecesAfterResize,
      errors: errors.slice(0, 3),
    })
  );

  await browser.close();
}

await testDevice("iPhone 13", devices["iPhone 13"]);
await testDevice("Pixel 7", devices["Pixel 7"]);
