/**
 * Hľadá jednoduché matové pozície (mat 1 ťahom) pre doplnenie knihy.
 * node scripts/find-mate-in-one.mjs
 */
import { Chess } from "chess.js";

const seeds = [
  "r2qk2r/2p1nB1p/p2p1p2/bp2N3/4P3/2PPB3/PP4PP/R1Bb1RK1 w - - 0 1",
  "r1b1k2r/p2p1pNp/n2B1n2/1p2N2P/6P1/3P4/P1P1K3/q2Q2B1 w - - 0 1",
];

function mates(fen) {
  const c = new Chess(fen);
  return c.moves({ verbose: true }).filter((m) => {
    const c2 = new Chess(fen);
    c2.move(m);
    return c2.isCheckmate();
  });
}

for (const fen of seeds) {
  const m = mates(fen);
  console.log(fen.split(" ")[0], "->", m.map((x) => `${x.san} ${x.from}${x.to}`).join(", "));
}
