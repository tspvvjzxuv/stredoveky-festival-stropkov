import { movesMatch, toMoveShape } from "../js/puzzle-engine.js";

function assert(label, cond) {
  if (!cond) {
    console.error("FAIL:", label);
    process.exitCode = 1;
  } else {
    console.log("OK:", label);
  }
}

assert("from/to", movesMatch({ from: "g2", to: "g7" }, { from: "g2", to: "g7" }));
assert("case", movesMatch({ from: "G2", to: "G7" }, { from: "g2", to: "g7" }));
assert("orig/dest", movesMatch({ orig: "f2", dest: "e1" }, { from: "f2", to: "e1" }));
assert("uci", movesMatch("g2g7", { from: "g2", to: "g7" }));
assert("uci dash", movesMatch("f2-e1", { from: "f2", to: "e1" }));
assert("reject", !movesMatch({ from: "g2", to: "g6" }, { from: "g2", to: "g7" }));

const shaped = toMoveShape({ orig: "C1", dest: "C8" });
assert("shape", shaped && shaped.from === "c1" && shaped.to === "c8");
