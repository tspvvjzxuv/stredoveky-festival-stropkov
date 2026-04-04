/**
 * Jednoduchý server pre Render.com — statické súbory + miesto na budúce API.
 * Lokálne: npm start  →  http://localhost:3000
 */
const path = require("path");
const express = require("express");

const app = express();
const root = __dirname;

app.use(
  express.static(root, {
    extensions: ["html"],
    index: ["index.html"],
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      }
    },
  })
);

app.get("/api/health", function (req, res) {
  res.json({
    ok: true,
    service: "stredoveky-festival-stropkov",
    time: new Date().toISOString(),
  });
});

var port = parseInt(process.env.PORT || "3000", 10);
app.listen(port, function () {
  console.log("Festival web listening on port " + port);
});
