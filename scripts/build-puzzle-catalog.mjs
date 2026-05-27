/**
 * Generates js/puzzle-catalog.js from verified specs.
 * Run: node scripts/build-puzzle-catalog.mjs
 */
import { Chess } from "chess.js";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function ratingFor(week, difficulty) {
  const w = week - 1;
  const easy = Math.round(1350 + ((1700 - 1350) * w) / 11);
  const medium = Math.round(1550 + ((2020 - 1550) * w) / 11);
  const hard = Math.round(1850 + ((2450 - 1850) * w) / 11);
  if (difficulty === "easy") return easy;
  if (difficulty === "medium") return medium;
  return hard;
}

/** @type {Array<{week:number,difficulty:string,fen:string,line:string[][],win?:string,openingAccept?:string,userAccepts?:Array<string|null>,subtitle:string,solution:string}>} */
const ENTRIES = [];

function add(week, difficulty, spec) {
  ENTRIES.push({
    week,
    difficulty,
    estimatedRating: ratingFor(week, difficulty),
    win: "checkmate",
    ...spec,
  });
}

// --- Week 1 ---
add(1, "easy", {
  fen: "6k1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  line: [
    ["f2", "f7"],
    ["g8", "h8"],
    ["f7", "f8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: dáma zoberie na f7, po Kh8 dorazte na f8.",
  solution: "Qxf7+ Kh8 Qf8#",
});
add(1, "medium", {
  fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
  line: [
    ["f2", "e1"],
    ["g8", "h8"],
    ["e1", "e8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qe1+ a po ustúpení kráľa mat na e8.",
  solution: "Qe1+ Kh8 Qe8#",
});
add(1, "hard", {
  fen: "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
  win: "black_queen_captured",
  line: [
    ["c1", "c8"],
    ["f4", "f8"],
    ["c8", "f8"],
  ],
  userAccepts: ["check", "black_queen_captured"],
  subtitle: "Taktika v troch ťahoch: šach vežou, zoberte prekrývajúcu dámu.",
  solution: "Rc8+ Qf8 Rxf8",
});

// --- Week 2 ---
add(2, "easy", {
  fen: "5qk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  line: [
    ["f2", "f7"],
    ["g8", "h8"],
    ["f7", "f8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: útok na f7 aj s čiernou dámou na diagonále.",
  solution: "Qxf7+ Kh8 Qxf8#",
});
add(2, "medium", {
  fen: "6k1/5ppp/8/8/8/8/4Q2R/6K1 w - - 0 1",
  line: [
    ["e2", "d3"],
    ["g8", "h8"],
    ["d3", "d8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qd3+ a mat na d8, veža na h2.",
  solution: "Qd3+ Kh8 Qd8#",
});
add(2, "hard", {
  fen: "2r1k3/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  line: [
    ["b3", "b7"],
    ["c8", "d8"],
    ["f2", "f7"],
  ],
  subtitle: "Dvojná útok vežou na b7, po Rd8 rozhodujúci mat dámou.",
  solution: "Rb7 Rd8 Qxf7#",
});

// --- Week 3 ---
add(3, "easy", {
  fen: "6k1/5ppp/8/8/8/8/6R1/6K1 w - - 0 1",
  line: [
    ["g2", "e2"],
    ["g8", "h8"],
    ["e2", "e8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: veža na e2, potom mat na e8.",
  solution: "Re2+ Kh8 Re8#",
});
add(3, "medium", {
  fen: "2r1k3/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  line: [
    ["b3", "b4"],
    ["c8", "d8"],
    ["b4", "b7"],
    ["e8", "f8"],
    ["f2", "f7"],
  ],
  subtitle: "Kombinácia veže na b4–b7, potom mat dámou na f7.",
  solution: "Rb4 Rd8 Rb7+ Kf8 Qxf7#",
});
add(3, "hard", {
  fen: "2r1k3/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  line: [
    ["b3", "b4"],
    ["c8", "d8"],
    ["b4", "b5"],
    ["d8", "d7"],
    ["b5", "b7"],
    ["d7", "d8"],
    ["f2", "f7"],
  ],
  subtitle: "Štvorťahová kombinácia: veža obchádza obranu na d7, finiš Qxf7#.",
  solution: "Rb4 Rd8 Rb5 Rd7 Rb7 Rd8 Qxf7#",
});

// --- Week 4 ---
add(4, "easy", {
  fen: "6k1/5ppp/8/8/8/8/R7/4K3 w - - 0 1",
  line: [
    ["a2", "a3"],
    ["g8", "h8"],
    ["a3", "a8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: veža cez a3 na a8.",
  solution: "Ra3+ Kh8 Ra8#",
});
add(4, "medium", {
  fen: "6k1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
  line: [
    ["c2", "b3"],
    ["g8", "h8"],
    ["b3", "b8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: dáma na b3 a finiš na b8.",
  solution: "Qb3+ Kh8 Qb8#",
});
add(4, "hard", {
  fen: "2r2k2/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  line: [
    ["b3", "b4"],
    ["c8", "d8"],
    ["b4", "b5"],
    ["d8", "e8"],
    ["b5", "b7"],
    ["e8", "e6"],
    ["f2", "f7"],
  ],
  subtitle: "Zložitejšia vežová kombinácia s finišom dámou na f7.",
  solution: "Rb4 Rd8 Rb5 Re8 Rb7 Re6 Qxf7#",
});

// --- Week 5 ---
add(5, "easy", {
  fen: "6k1/5ppp/8/8/8/8/1R6/6K1 w - - 0 1",
  line: [
    ["b2", "b3"],
    ["g8", "h8"],
    ["b3", "b8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: veža na b3, mat na b8.",
  solution: "Rb3+ Kh8 Rb8#",
});
add(5, "medium", {
  fen: "6k1/5ppp/8/8/8/8/4Q3/6K1 w - - 0 1",
  line: [
    ["e2", "d3"],
    ["g8", "h8"],
    ["d3", "d8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qd3+ a doraz na d8.",
  solution: "Qd3+ Kh8 Qd8#",
});
add(5, "hard", {
  fen: "5rk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  line: [
    ["f2", "e3"],
    ["f8", "e8"],
    ["e3", "d4"],
    ["e8", "f8"],
    ["d4", "c5"],
    ["f8", "c8"],
    ["c5", "c8"],
  ],
  subtitle: "Mat v štyroch bielych ťahoch: dáma obchádza vežu na c8.",
  solution: "Qe3+ Re8 Qd4+ Rf8 Qc5+ Rc8 Qxc8#",
});

// --- Week 6 ---
add(6, "easy", {
  fen: "6k1/5ppp/8/8/8/8/3Q4/6K1 w - - 0 1",
  line: [
    ["d2", "c3"],
    ["g8", "h8"],
    ["c3", "c8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle:
    "Mat v dvoch: úvod dámou (Qc3+, Qd3+ …) — po obrane čierneho dajte mat akýmkoľvek správnym ťahom.",
  solution: "Qc3+ Kh8 Qc8#",
});
add(6, "medium", {
  fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
  line: [
    ["f3", "e5"],
    ["g8", "f8"],
    ["f2", "f7"],
  ],
  subtitle: "Kombinácia jazdca a dámy: Ne5 a Qxf7#.",
  solution: "Ne5+ Kf8 Qxf7#",
});
add(6, "hard", {
  fen: "6k1/8/8/8/4q3/8/8/3R2K1 w - - 0 1",
  win: "black_queen_captured",
  line: [
    ["d1", "d2"],
    ["e4", "d5"],
    ["d2", "d5"],
  ],
  userAccepts: [null, "black_queen_captured"],
  subtitle: "Získajte dámu: Rd2 a po Qd5 výměna na d5.",
  solution: "Rd2 Qd5 Rxd5",
});

// --- Week 7 ---
add(7, "easy", {
  fen: "6k1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  line: [
    ["f2", "e3"],
    ["g8", "h8"],
    ["e3", "e8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qe3+ a mat na e8 (nie útok na f7).",
  solution: "Qe3+ Kh8 Qe8#",
});
add(7, "medium", {
  fen: "2r2k2/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  line: [
    ["b3", "b4"],
    ["c8", "d8"],
    ["b4", "b7"],
    ["d8", "e8"],
    ["f2", "f7"],
  ],
  subtitle: "Stredná kombinácia: Rb4–Rb7 a mat dámou.",
  solution: "Rb4 Rd8 Rb7+ Re8 Qxf7#",
});
add(7, "hard", {
  fen: "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
  win: "black_queen_captured",
  line: [
    ["e5", "c6"],
    ["f4", "e5"],
    ["c6", "e5"],
  ],
  userAccepts: [null, "black_queen_captured"],
  subtitle: "Jazdec na c6, po Qe5 zoberte dámu jazdcom.",
  solution: "Nc6 Qe5 Nxe5",
});

// --- Week 8 ---
add(8, "easy", {
  fen: "6k1/4pppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  line: [
    ["f2", "d4"],
    ["g8", "h8"],
    ["d4", "d8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qd4+ a mat na d8 (oslabené pešiaky f7–h7).",
  solution: "Qd4+ Kh8 Qd8#",
});
add(8, "medium", {
  fen: "6k1/8/8/8/8/4q3/8/2R3K1 w - - 0 1",
  win: "black_queen_captured",
  line: [
    ["g1", "g2"],
    ["e3", "c5"],
    ["c1", "c5"],
  ],
  userAccepts: [null, "black_queen_captured"],
  subtitle: "Kráľ na g2 pripraví Rxc5 po Qc5.",
  solution: "Kg2 Qc5 Rxc5",
});
add(8, "hard", {
  fen: "6k1/8/8/8/8/5q2/8/2R3K1 w - - 0 1",
  win: "black_queen_captured",
  line: [
    ["c1", "c2"],
    ["f3", "c6"],
    ["c2", "c6"],
  ],
  userAccepts: [null, "black_queen_captured"],
  subtitle: "Získajte dámu: Rc2 a výměna po Qc6.",
  solution: "Rc2 Qc6 Rxc6",
});

// --- Week 9 ---
add(9, "easy", {
  fen: "6k1/5ppp/8/8/8/8/7R/6K1 w - - 0 1",
  line: [
    ["h2", "e2"],
    ["g8", "h8"],
    ["e2", "e8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: veža z h2 na e2 a Re8#.",
  solution: "Re2+ Kh8 Re8#",
});
add(9, "medium", {
  fen: "6k1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
  line: [
    ["c2", "b3"],
    ["g8", "h8"],
    ["b3", "b8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qb3+ a mat na b8.",
  solution: "Qb3+ Kh8 Qb8#",
});
add(9, "hard", {
  fen: "5rk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
  line: [
    ["f2", "e3"],
    ["f8", "e8"],
    ["e3", "d4"],
    ["e8", "f8"],
    ["d4", "c5"],
    ["f8", "c8"],
    ["c5", "c8"],
  ],
  subtitle: "Štvorťahová dámska kombinácia proti čiernej veži.",
  solution: "Qe3+ Re8 Qd4+ Rf8 Qc5+ Rc8 Qxc8#",
});

// --- Week 10 ---
add(10, "easy", {
  fen: "6k1/5ppp/8/8/8/8/5Q2/4K3 w - - 0 1",
  line: [
    ["f2", "f7"],
    ["g8", "h8"],
    ["f7", "e8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qxf7+ a mat na e8 (kráľ na e4).",
  solution: "Qxf7+ Kh8 Qe8#",
});
add(10, "medium", {
  fen: "6k1/5ppp/8/8/8/8/1R6/6K1 w - - 0 1",
  line: [
    ["b2", "b3"],
    ["g8", "h8"],
    ["b3", "b8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Rb3+ a mat vežou na b8.",
  solution: "Rb3+ Kh8 Rb8#",
});
add(10, "hard", {
  fen: "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
  win: "black_queen_captured",
  line: [
    ["e5", "c6"],
    ["f4", "e5"],
    ["c6", "e5"],
  ],
  userAccepts: [null, "black_queen_captured"],
  subtitle: "Najťažšia: jazdec na c6 a zisk dámy po Qe5.",
  solution: "Nc6 Qe5 Nxe5",
});

// --- Week 11 ---
add(11, "easy", {
  fen: "6k1/5ppp/8/8/8/8/4Q3/5K2 w - - 0 1",
  line: [
    ["e2", "d3"],
    ["g8", "h8"],
    ["d3", "d8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Qd3+ a mat na d8 (kráľ na f5).",
  solution: "Qd3+ Kh8 Qd8#",
});
add(11, "medium", {
  fen: "6k1/5ppp/8/8/8/8/6R1/5K2 w - - 0 1",
  line: [
    ["g2", "e2"],
    ["g8", "h8"],
    ["e2", "e8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Mat v dvoch: Re2+ a Re8# pri kráľovi na f5.",
  solution: "Re2+ Kh8 Re8#",
});
add(11, "hard", {
  fen: "2r1k3/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  line: [
    ["b3", "b4"],
    ["c8", "d8"],
    ["b4", "b5"],
    ["d8", "d7"],
    ["b5", "b7"],
    ["d7", "d8"],
    ["f2", "f7"],
  ],
  subtitle: "Pred finále: veža obchádza Rd7, rozhoduje Qxf7#.",
  solution: "Rb4 Rd8 Rb5 Rd7 Rb7 Rd8 Qxf7#",
});

// --- Week 12 ---
add(12, "easy", {
  fen: "6k1/5ppp/8/8/8/8/6Q1/5K2 w - - 0 1",
  line: [
    ["g2", "f3"],
    ["g8", "h8"],
    ["f3", "a8"],
  ],
  openingAccept: "mate_in_2_opening",
  subtitle: "Záverečný týždeň: Qf3+ a vzdialený mat Qa8#.",
  solution: "Qf3+ Kh8 Qa8#",
});
add(12, "medium", {
  fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
  line: [
    ["f3", "e5"],
    ["g8", "f8"],
    ["f2", "f7"],
  ],
  subtitle: "Kombinácia jazdca a dámy — finále festivalu.",
  solution: "Ne5+ Kf8 Qxf7#",
});
add(12, "hard", {
  fen: "2r2k2/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
  line: [
    ["b3", "b4"],
    ["c8", "d8"],
    ["b4", "b5"],
    ["d8", "e8"],
    ["b5", "b7"],
    ["e8", "e6"],
    ["f2", "f7"],
  ],
  subtitle: "Majstrovská úloha: sedem ťahov na dvoch vežiach, finiš Qxf7#.",
  solution: "Rb4 Rd8 Rb5 Re8 Rb7 Re6 Qxf7#",
});

// --- Builder helpers ---

function blackQueenOnBoard(chess) {
  const board = chess.board();
  for (const row of board) {
    for (const p of row) {
      if (p && p.type === "q" && p.color === "b") return true;
    }
  }
  return false;
}

function whiteCanReachGoal(chess, win) {
  if (chess.turn() !== "w" || chess.isGameOver()) return false;
  if (win === "black_queen_captured") {
    if (!blackQueenOnBoard(chess)) return true;
  } else if (chess.isCheckmate() && chess.turn() === "b") return true;
  for (const m of chess.moves({ verbose: true })) {
    const c2 = new Chess(chess.fen());
    c2.move({ from: m.from, to: m.to, promotion: m.promotion });
    if (win === "black_queen_captured") {
      if (!blackQueenOnBoard(c2)) return true;
    } else if (c2.isCheckmate() && c2.turn() === "b") return true;
  }
  return false;
}

function isSoundBlackMove(fen, from, to, win) {
  const c = new Chess(fen);
  if (!c.move({ from, to })) return false;
  return whiteCanReachGoal(c, win);
}

function countWhiteMovesInLine(line, fen) {
  const c = new Chess(fen);
  let n = 0;
  for (const [f, t] of line) {
    if (c.turn() === "w") n++;
    c.move({ from: f, to: t });
  }
  return n;
}

function userAcceptForStep(wIdx, totalWhite, spec, win) {
  if (spec.userAccepts && spec.userAccepts[wIdx] !== undefined) {
    return spec.userAccepts[wIdx];
  }
  if (wIdx === 0 && spec.openingAccept) return spec.openingAccept;
  if (wIdx === totalWhite - 1) {
    return win === "black_queen_captured" ? "black_queen_captured" : "checkmate";
  }
  return null;
}

function buildUserStep(move, accept, win) {
  const step = {
    who: "user",
    suggest: { from: move.from, to: move.to },
    wrong:
      accept === "black_queen_captured"
        ? "Týmto ťahom nezoberiete čiernu dámu."
        : accept === "mate_in_2_opening"
          ? "Tento ťah nevedie k matu v dvoch — skúste iný úvod."
          : accept === "check"
            ? "Začnite šachom podľa plánu úlohy."
            : accept === "checkmate"
              ? "Týmto ťahom nedáte mat — skúste iný finiš."
              : "Týmto ťahom nepostupujete správne — skúste iný biely ťah.",
  };
  if (accept) step.accept = accept;
  return step;
}

function buildBotChoices(fen, mainFrom, mainTo, thenSteps, win) {
  const c = new Chess(fen);
  const choices = [
    {
      move: { from: mainFrom, to: mainTo },
      main: true,
      hint: "Počítač odohral hlavnú obranu — pokračujte podľa plánu.",
      then: thenSteps,
    },
  ];

  // Len hlavná (a prípadné ďalšie zvukové) obrany — bot ich filtruje; mŕtve vetvy s fail:true
  // blokovali hráča pri alternatívnom správnom úvode (iná pozícia, iný mat).
  return choices;
}

function buildPlay(spec) {
  const win = spec.win || "checkmate";
  const line = spec.line;
  const whiteIndices = [];
  for (let i = 0; i < line.length; i++) {
    const probe = new Chess(spec.fen);
    for (let j = 0; j < i; j++) probe.move({ from: line[j][0], to: line[j][1] });
    if (probe.turn() === "w") whiteIndices.push(i);
  }
  const totalWhite = whiteIndices.length;
  const chess = new Chess(spec.fen);

  function recurse(lineIdx) {
    if (lineIdx >= line.length) return [];

    const [from, to] = line[lineIdx];
    const fenBefore = chess.fen();

    if (chess.turn() === "w") {
      const wNum = whiteIndices.indexOf(lineIdx);
      const accept = userAcceptForStep(wNum, totalWhite, spec, win);
      chess.move({ from, to });
      const then = recurse(lineIdx + 1);
      return [buildUserStep({ from, to }, accept, win), ...then];
    }

    chess.move({ from, to });
    const then = recurse(lineIdx + 1);
    return [
      {
        who: "bot",
        pick: "main",
        choices: buildBotChoices(fenBefore, from, to, then, win),
      },
    ];
  }

  return recurse(0);
}

function verifyEntry(spec) {
  const chess = new Chess(spec.fen);
  const sans = [];
  for (const [from, to] of spec.line) {
    const m = chess.move({ from, to });
    if (!m) return { ok: false, err: `illegal ${from}-${to}` };
    sans.push(m.san);
  }
  const win = spec.win || "checkmate";
  if (win === "black_queen_captured") {
    if (blackQueenOnBoard(chess)) return { ok: false, err: "black queen remains" };
  } else if (!chess.isCheckmate() || chess.turn() !== "b") {
    return { ok: false, err: "not checkmate" };
  }
  return { ok: true, sans };
}

let failures = 0;
const built = [];

for (const entry of ENTRIES) {
  const v = verifyEntry(entry);
  if (!v.ok) {
    console.error("VERIFY FAIL", entry.week, entry.difficulty, v.err);
    failures++;
    continue;
  }
  const play = buildPlay(entry);
  built.push({
    weekIndex: entry.week,
    difficulty: entry.difficulty,
    estimatedRating: entry.estimatedRating,
    fen: entry.fen,
    win: entry.win || "checkmate",
    play,
    subtitle: entry.subtitle,
    solution: entry.solution,
  });
  console.log("OK", `w${entry.week}`, entry.difficulty, v.sans.join(" "));
}

if (failures) {
  console.error(failures, "failures — not writing catalog");
  process.exit(1);
}

const outPath = join(__dirname, "../js/puzzle-catalog.js");
const body = `/** Auto-generated by scripts/build-puzzle-catalog.mjs — do not edit by hand */\n\nexport const PUZZLE_CATALOG_ENTRIES = ${JSON.stringify(built, null, 2)};\n`;
writeFileSync(outPath, body, "utf8");
console.log("\nWrote", outPath, "—", built.length, "puzzles");
