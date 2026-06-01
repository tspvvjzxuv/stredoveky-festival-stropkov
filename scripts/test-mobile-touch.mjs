import { chromium, devices } from "playwright";

const BASE = process.env.PUZZLE_BASE || "http://127.0.0.1:38705";

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();

  await page.goto(`${BASE}/sach.html#sachove-hlavolamy`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(2000);

  await page.locator("#cg-w1-easy").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const board = page.locator("#cg-w1-easy");
  const box = await board.boundingBox();
  const piecesBefore = await board.locator("piece").count();

  const diagnostics = await page.evaluate(() => {
    const el = document.getElementById("cg-w1-easy");
    const host = el?.closest(".chessground-host");
    const piece = el?.querySelector("piece");
    const ground = el?._ptraChessground;
    return {
      hasGround: !!ground,
      pieceCount: el?.querySelectorAll("piece").length ?? 0,
      hostPointerEvents: host ? getComputedStyle(host).pointerEvents : null,
      boardPointerEvents: el ? getComputedStyle(el).pointerEvents : null,
      overlayHidden: !host?.querySelector(".sach-wrong-move-overlay") ||
        host.querySelector(".sach-wrong-move-overlay")?.hidden,
      boardRect: el?.getBoundingClientRect(),
      mounted: el?.classList.contains("cg-board--mounted"),
    };
  });

  let moved = false;
  if (box && piecesBefore > 0) {
    const sq = box.width / 8;
    const from = { x: box.x + 6 * sq + sq / 2, y: box.y + 2 * sq + sq / 2 };
    const to = { x: box.x + 5 * sq + sq / 2, y: box.y + 3 * sq + sq / 2 };
    await page.touchscreen.tap(from.x, from.y);
    await page.waitForTimeout(200);
    await page.touchscreen.tap(to.x, to.y);
    await page.waitForTimeout(800);
    const sub = await page.locator("#cg-w1-easy-subtitle").innerText();
    moved = /Správny|šach|chyb|⚠️|mat/i.test(sub);
  }

  console.log(
    JSON.stringify(
      {
        piecesBefore,
        box,
        diagnostics,
        movedAfterTouch: moved,
        subtitle: await page.locator("#cg-w1-easy-subtitle").innerText().catch(() => ""),
      },
      null,
      2
    )
  );

  await browser.close();
}

await run();
