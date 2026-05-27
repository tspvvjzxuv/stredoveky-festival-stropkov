import { Chess } from "chess.js";

const fens = [
  "6k1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/5R2/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/6Q1/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/7R/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/4Q3/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/7R/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/1R6/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/3Q4/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/5Q2/5K2 w - - 0 1",
  "6k1/4pppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  "6k1/5pp1/8/6p1/8/8/5Q2/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/5Q1R/6K1 w - - 0 1",
  "5qk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  "6k1/5ppp/8/8/8/8/5Q2/4K3 w - - 0 1",
];

function hasMateIn2(fen) {
  const start = new Chess(fen);
  if (start.turn() !== "w") return null;
  for (const w1 of start.moves({ verbose: true })) {
    const afterW = new Chess(fen);
    afterW.move({ from: w1.from, to: w1.to, promotion: w1.promotion });
    if (afterW.isCheckmate()) continue; // mate in 1
    if (!afterW.isCheck()) continue;
    let anyDefenseAllowsMate = false;
    let allDefensesAllowMate = true;
    for (const b of afterW.moves()) {
      const afterB = new Chess(afterW.fen());
      afterB.move(b);
      let mate = false;
      for (const w2 of afterB.moves({ verbose: true })) {
        const fin = new Chess(afterB.fen());
        fin.move({ from: w2.from, to: w2.to, promotion: w2.promotion });
        if (fin.isCheckmate() && fin.turn() === "b") {
          mate = true;
          break;
        }
      }
      if (mate) anyDefenseAllowsMate = true;
      else allDefensesAllowMate = false;
    }
    if (anyDefenseAllowsMate && !allDefensesAllowMate) {
      // find main line Kh8 style
      for (const b of afterW.moves({ verbose: true })) {
        const afterB = new Chess(afterW.fen());
        afterB.move({ from: b.from, to: b.to, promotion: b.promotion });
        for (const w2 of afterB.moves({ verbose: true })) {
          const fin = new Chess(afterB.fen());
          fin.move({ from: w2.from, to: w2.to, promotion: w2.promotion });
          if (fin.isCheckmate() && fin.turn() === "b") {
            return {
              fen,
              line: [
                [w1.from, w1.to],
                [b.from, b.to],
                [w2.from, w2.to],
              ],
              sans: [w1.san, b.san, w2.san],
            };
          }
        }
      }
    }
  }
  return null;
}

const found = [];
for (const fen of fens) {
  const r = hasMateIn2(fen);
  if (r) found.push(r);
}
console.log("found", found.length);
for (const r of found) {
  console.log(r.fen);
  console.log(" ", r.sans.join(" "), r.line.map((x) => x.join("")).join(" "));
}
