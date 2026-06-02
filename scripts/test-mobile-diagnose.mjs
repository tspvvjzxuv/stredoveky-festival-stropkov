import { chromium, devices } from "playwright";

const BASE = process.env.PUZZLE_BASE || "https://ptra.sk";

async function diagnose(deviceName, device) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ ...device });
  const logs = [];
  page.on("console", (m) => logs.push(m.type() + ": " + m.text()));
  page.on("pageerror", (e) => logs.push("PAGEERROR: " + e.message));

  await page.goto(`${BASE}/sach.html#sachove-hlavolamy`, {
    waitUntil: "domcontentloaded",
    timeout: 90000,
  });
  await page.waitForTimeout(4000);

  const data = await page.evaluate(() => {
    const grid = document.getElementById("sach-puzzle-grid");
    const active = document.querySelector(".sach-puzzle-week.is-week-active");
    const items = active ? active.querySelectorAll(".sach-visual-item") : [];
    const boards = active ? active.querySelectorAll(".cg-board") : [];
    const pieces = active ? active.querySelectorAll("piece") : [];
    const loading = document.getElementById("sach-loading");
    const sample = items[0];
    const sampleBoard = boards[0];
    const sampleRect = sample ? sample.getBoundingClientRect() : null;
    const boardRect = sampleBoard ? sampleBoard.getBoundingClientRect() : null;
    const boardStyle = sampleBoard ? getComputedStyle(sampleBoard) : null;
    return {
      gridHtmlLen: grid ? grid.innerHTML.length : 0,
      gridText: grid ? grid.innerText.slice(0, 400) : "",
      weekSections: document.querySelectorAll(".sach-puzzle-week").length,
      activeWeek: active ? active.id : null,
      activeDisplay: active ? getComputedStyle(active).display : null,
      itemCount: items.length,
      boardCount: boards.length,
      pieceCount: pieces.length,
      loadingHidden: loading ? loading.hidden : null,
      sampleItemH: sampleRect ? sampleRect.height : 0,
      sampleBoardH: boardRect ? boardRect.height : 0,
      sampleBoardW: boardRect ? boardRect.width : 0,
      boardDisplay: boardStyle ? boardStyle.display : null,
      boardVisibility: boardStyle ? boardStyle.visibility : null,
      hasFail: grid ? grid.innerHTML.includes("sach-module-fail") : false,
      bundleLoaded: typeof window.PtraSach !== "undefined",
    };
  });

  console.log("\n=== " + deviceName + " ===");
  console.log(JSON.stringify(data, null, 2));
  if (logs.length) console.log("logs:", logs.slice(0, 8).join("\n"));

  await browser.close();
}

await diagnose("iPhone 13 prod", devices["iPhone 13"]);
await diagnose("iPhone SE prod", devices["iPhone SE"]);
await diagnose("Desktop prod", { viewport: { width: 1400, height: 900 } });
