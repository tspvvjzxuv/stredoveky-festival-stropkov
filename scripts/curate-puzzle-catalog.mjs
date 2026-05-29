/**
 * Zapíše 36 overených úloh s motívmi a témami týždňov.
 * Run: node scripts/curate-puzzle-catalog.mjs
 */
import { Chess } from "chess.js";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WEEK_THEMES = [
  { title: "Brána pod Vliekom", tagline: "Prvá stráž brány" },
  { title: "Rytier Andreas", tagline: "Pasovanie v areáli" },
  { title: "Stredoveký festival", tagline: "Hradné nádvorie" },
  { title: "Pasovanie rytierov", tagline: "Rytiersky ceremoniál" },
  { title: "Lukostreľba", tagline: "Terč na nádvorí" },
  { title: "Táborová opekačka", tagline: "Ohnisko pod hviezdami" },
  { title: "Drak pod Vliekom", tagline: "Strážca brány" },
  { title: "Sparta Stropkov", tagline: "Štít združenia" },
  { title: "Šachová bitka", tagline: "Turnajové políčko" },
  { title: "Kronika hlavolamu", tagline: "Zápisník mága" },
  { title: "Investícia rytiera", tagline: "Tajomná peňaženka" },
  { title: "Koruna festivalu", tagline: "Posledný týždeň pred festivalom" },
];

/** 36 overených úloh — legálne línie, rôzne motívy */
const SPECS = [
  // —— Týždeň 1: ľahké = Morphy, stredná = Anastázia, ťažké = zisk dámy ——
  {
    week: 1,
    difficulty: "easy",
    fen: "5qk1/5ppp/8/8/8/8/6Q1/6K1 w - - 0 1",
    line: [["g2", "f3"], ["f8", "a8"], ["f3", "a8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Motív Morphy",
    solution: "Qf3+ Qa8 Qxa8#",
  },
  {
    week: 1,
    difficulty: "medium",
    fen: "2r1k3/5ppp/8/8/8/1R6/5Q2/6K1 w - - 0 1",
    line: [["b3", "b4"], ["c8", "d8"], ["b4", "b7"], ["e8", "f8"], ["f2", "f7"]],
    motif: "Anastázin motív",
    solution: "Rb4 Rd8 Rb7+ Kf8 Qxf7#",
  },
  {
    week: 1,
    difficulty: "hard",
    fen: "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
    win: "black_queen_captured",
    line: [["c1", "c8"], ["f4", "f8"], ["c8", "f8"]],
    userAccepts: ["check", "black_queen_captured"],
    motif: "Zdvojený útok",
    solution: "Rc8+ Qf8 Rxf8",
  },
  // —— Týždeň 2: veža b-file, scholastický, lov kráľa ——
  {
    week: 2,
    difficulty: "easy",
    fen: "5k2/5ppp/8/8/8/8/6Q1/6K1 w - - 0 1",
    line: [["g2", "f3"], ["f8", "g8"], ["f3", "a8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mat s kráľom na f8",
    solution: "Qf3+ Kg8 Qa8#",
  },
  {
    week: 2,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
    line: [["f2", "e1"], ["g8", "h8"], ["e1", "e8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Scholastický mat",
    solution: "Qe1+ Kh8 Qe8#",
  },
  {
    week: 2,
    difficulty: "hard",
    fen: "6k1/8/8/8/8/4q3/8/2R3K1 w - - 0 1",
    win: "black_queen_captured",
    line: [["g1", "g2"], ["e3", "c5"], ["c1", "c5"]],
    userAccepts: [null, "black_queen_captured"],
    motif: "Kráľ pripraví vežu",
    solution: "Kg2 Qc5 Rxc5",
  },
  // —— Týždeň 3: Re8, diagonála, vidlička ——
  {
    week: 3,
    difficulty: "easy",
    fen: "7k/7p/6K1/8/8/8/8/7R w - - 0 1",
    line: [["g6", "f7"], ["h7", "h6"], ["h1", "h6"]],
    openingAccept: "mate_in_2_opening",
    motif: "Damiano — veža a kráľ",
    solution: "Kf7 h6 Rxh6#",
  },
  {
    week: 3,
    difficulty: "medium",
    fen: "6k1/5pp1/8/6p1/8/8/3Q4/6K1 w - - 0 1",
    line: [["d2", "a5"], ["g8", "f8"], ["a5", "d8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Útok na diagonále",
    solution: "Qa5+ Kf8 Qd8#",
  },
  {
    week: 3,
    difficulty: "hard",
    fen: "6k1/8/8/8/8/5q2/8/2R3K1 w - - 0 1",
    win: "black_queen_captured",
    line: [["c1", "c2"], ["f3", "c6"], ["c2", "c6"]],
    userAccepts: [null, "black_queen_captured"],
    motif: "Zisk dámy",
    solution: "Rc2 Qc6 Rxc6",
  },
  // —— Týždeň 4: Operný mat, b-file, výměna dámy ——
  {
    week: 4,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/R7/4K3 w - - 0 1",
    line: [["a2", "a8"]],
    motif: "Operný mat",
    solution: "Ra8#",
  },
  {
    week: 4,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
    line: [["c2", "b3"], ["g8", "h8"], ["b3", "b8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mat po b-file",
    solution: "Qb3+ Kh8 Qb8#",
  },
  {
    week: 4,
    difficulty: "hard",
    fen: "5qk1/5ppp/8/8/8/8/6R1/4K3 w - - 0 1",
    line: [["g2", "e2"], ["f8", "e8"], ["e2", "e8"]],
    motif: "Háčikový mat",
    solution: "Re2+ Qe8 Rxe8#",
  },
  // —— Týždeň 5–8: medium obtiažnosť ——
  {
    week: 5,
    difficulty: "easy",
    fen: "6k1/4pppp/8/8/8/8/6Q1/6K1 w - - 0 1",
    line: [["g2", "a8"]],
    motif: "Mat jedným ťahom",
    solution: "Qa8#",
  },
  {
    week: 5,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/8/4Q2R/6K1 w - - 0 1",
    line: [["e2", "a6"], ["g8", "h8"], ["a6", "a8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Anderssen",
    solution: "Qa6+ Kh8 Qa8#",
  },
  {
    week: 5,
    difficulty: "hard",
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
    motif: "Lawnmower",
    solution: "Qe3+ Re8 Qd4+ Rf8 Qc5+ Rc8 Qxc8#",
  },
  {
    week: 6,
    difficulty: "easy",
    fen: "6k1/4pppp/8/8/8/8/5Q2/6K1 w - - 0 1",
    line: [["f2", "d4"], ["g8", "h8"], ["d4", "d8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Koridorový mat",
    solution: "Qd4+ Kh8 Qd8#",
  },
  {
    week: 6,
    difficulty: "medium",
    fen: "5qk1/4pppp/8/8/8/8/6Q1/6K1 w - - 0 1",
    line: [["g2", "f3"], ["f8", "a8"], ["f3", "a8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Morphy s oslabenými pešiakmi",
    solution: "Qf3+ Qa8 Qxa8#",
  },
  {
    week: 6,
    difficulty: "hard",
    fen: "6k1/8/8/8/4q3/8/8/3R2K1 w - - 0 1",
    win: "black_queen_captured",
    line: [["d1", "d2"], ["e4", "d5"], ["d2", "d5"]],
    userAccepts: [null, "black_queen_captured"],
    motif: "Zisk dámy",
    solution: "Rd2 Qd5 Rxd5",
  },
  {
    week: 7,
    difficulty: "easy",
    fen: "6k1/5pp1/8/6p1/8/8/2Q5/6K1 w - - 0 1",
    line: [["c2", "c7"], ["g8", "f8"], ["c7", "d8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mayetov mat",
    solution: "Qc7+ Kf8 Qd8#",
  },
  {
    week: 7,
    difficulty: "medium",
    fen: "5qk1/5ppp/8/8/8/8/1R6/6K1 w - - 0 1",
    line: [["b2", "b3"], ["f8", "b8"], ["b3", "b8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mat po výmene",
    solution: "Rb3+ Qb8 Rxb8#",
  },
  {
    week: 7,
    difficulty: "hard",
    fen: "6k1/8/8/4N3/4q3/8/8/2R3K1 w - - 0 1",
    win: "black_queen_captured",
    line: [["e5", "c6"], ["e4", "e5"], ["c6", "e5"]],
    userAccepts: [null, "black_queen_captured"],
    motif: "Jazdecká vidlička",
    solution: "Nc6 Qe5 Nxe5",
  },
  {
    week: 8,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/6R1/4K3 w - - 0 1",
    line: [["g2", "e2"], ["g8", "h8"], ["e2", "e8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mat na e8 (aktívny kráľ)",
    solution: "Re2+ Kh8 Re8#",
  },
  {
    week: 8,
    difficulty: "medium",
    fen: "6k1/5pp1/8/6p1/8/8/6Q1/6K1 w - - 0 1",
    line: [["g2", "d5"], ["g8", "f8"], ["d5", "d8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Útok na d-file",
    solution: "Qd5+ Kf8 Qd8#",
  },
  {
    week: 8,
    difficulty: "hard",
    fen: "6k1/8/8/8/8/4q3/8/2R3K1 w - - 0 1",
    win: "black_queen_captured",
    line: [["g1", "g2"], ["e3", "c5"], ["c1", "c5"]],
    userAccepts: [null, "black_queen_captured"],
    motif: "Zisk dámy (dáma v strede)",
    solution: "Kg2 Qc5 Rxc5",
  },
  // —— Týždeň 9–12: ťažké kombinácie ——
  {
    week: 9,
    difficulty: "easy",
    fen: "3r1k2/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
    line: [["f2", "d4"], ["f8", "g8"], ["d4", "d8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mat s čiernou vežou na d8",
    solution: "Qd4+ Kg8 Qxd8#",
  },
  {
    week: 9,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/8/6Q1/5K2 w - - 0 1",
    line: [["g2", "f3"], ["g8", "h8"], ["f3", "a8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Vzdialený mat",
    solution: "Qf3+ Kh8 Qa8#",
  },
  {
    week: 9,
    difficulty: "hard",
    fen: "5qk1/5ppp/8/8/8/8/4Q3/6K1 w - - 0 1",
    line: [["e2", "d3"], ["f8", "d8"], ["d3", "d8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Výměna s dámou",
    solution: "Qd3+ Qd8 Qxd8#",
  },
  {
    week: 10,
    difficulty: "easy",
    fen: "2r3k1/5ppp/8/8/8/8/6R1/6K1 w - - 0 1",
    line: [["g2", "e2"], ["c8", "e8"], ["e2", "e8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Výměna s vežou",
    solution: "Re2 Re8 Rxe8#",
  },
  {
    week: 10,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/8/5Q2/4K3 w - - 0 1",
    line: [["f2", "f7"], ["g8", "h8"], ["f7", "e8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Aktívny biely kráľ",
    solution: "Qxf7+ Kh8 Qe8#",
  },
  {
    week: 10,
    difficulty: "hard",
    fen: "5rk1/5ppp/8/8/8/8/5N2/6K1 w - - 0 1",
    line: [["f2", "d3"], ["g8", "h8"], ["d3", "e5"], ["f8", "g8"], ["e5", "f7"]],
    motif: "Lov kráľa jazdcom",
    solution: "Nd3+ Kh8 Ne5 Rg8 Nxf7#",
  },
  {
    week: 11,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/3Q4/5K2 w - - 0 1",
    line: [["d2", "c3"], ["g8", "h8"], ["c3", "c8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mat po c-file",
    solution: "Qc3+ Kh8 Qc8#",
  },
  {
    week: 11,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/8/4Q2R/6K1 w - - 0 1",
    line: [["e2", "a6"], ["g8", "h8"], ["a6", "a8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Anderssen",
    solution: "Qa6+ Kh8 Qa8#",
  },
  {
    week: 11,
    difficulty: "hard",
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
    motif: "Šesťťahová kombinácia",
    solution: "Rb4 Rd8 Rb5 Rd7 Rb7 Rd8 Qxf7#",
  },
  {
    week: 12,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/1Q6/5K2 w - - 0 1",
    line: [["b2", "b7"], ["g8", "h8"], ["b7", "b8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Finále festivalu",
    solution: "Qb7+ Kh8 Qb8#",
  },
  {
    week: 12,
    difficulty: "medium",
    fen: "5qk1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
    line: [["c2", "b3"], ["f8", "b8"], ["b3", "b8"]],
    openingAccept: "mate_in_2_opening",
    motif: "Mat po výmene",
    solution: "Qb3+ Qb8 Qxb8#",
  },
  {
    week: 12,
    difficulty: "hard",
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
    motif: "Majstrovská kombinácia",
    solution: "Rb4 Rd8 Rb5 Re8 Rb7 Re6 Qxf7#",
  },
];

function verify(spec) {
  const c = new Chess(spec.fen);
  const win = spec.win || "checkmate";
  for (const [f, t] of spec.line) {
    if (!c.move({ from: f, to: t })) return { ok: false, err: `illegal ${f}-${t}` };
  }
  if (win === "black_queen_captured") {
    if (blackQueenOnBoard(c)) return { ok: false, err: "queen remains" };
  } else if (!c.isCheckmate()) return { ok: false, err: "not mate" };
  return { ok: true };
}

function blackQueenOnBoard(chess) {
  return chess.board().flat().some((p) => p && p.type === "q" && p.color === "b");
}

let fail = 0;
for (const s of SPECS) {
  const v = verify(s);
  if (!v.ok) {
    console.error("FAIL", s.week, s.difficulty, v.err);
    fail++;
  }
}
if (fail) process.exit(1);

const body = SPECS.map((s) => {
  const theme = WEEK_THEMES[s.week - 1];
  const subtitle = `${s.motif} — ${theme.title}: ${s.solution}.`;
  const lines = [
    "  {",
    `    week: ${s.week},`,
    `    difficulty: "${s.difficulty}",`,
    `    fen: "${s.fen}",`,
  ];
  if (s.win) lines.push(`    win: "${s.win}",`);
  lines.push(`    line: ${JSON.stringify(s.line)},`);
  if (s.openingAccept) lines.push(`    openingAccept: "${s.openingAccept}",`);
  if (s.userAccepts) lines.push(`    userAccepts: ${JSON.stringify(s.userAccepts)},`);
  lines.push(`    subtitle: ${JSON.stringify(subtitle)},`);
  lines.push(`    solution: ${JSON.stringify(s.solution)},`);
  lines.push("  },");
  return lines.join("\n");
}).join("\n");

const out = `/**
 * 36 úloh — kreatívny katalóg (pomenované motívy, rôzne pozície).
 * Generované: node scripts/curate-puzzle-catalog.mjs
 */
export const PUZZLE_SPECS = [
${body}
];
`;

writeFileSync(join(__dirname, "puzzle-entries-data.mjs"), out, "utf8");
console.log("Wrote puzzle-entries-data.mjs —", SPECS.length, "puzzles");

const fens = new Set(SPECS.map((s) => s.fen.split(" ")[0]));
console.log("Unique FENs:", fens.size);

console.log("\n| Týždeň | Úroveň | Ťahy | Motív |");
for (const s of SPECS) {
  const wm = s.line.filter((_, i) => {
    const c = new Chess(s.fen);
    for (let j = 0; j < i; j++) c.move({ from: s.line[j][0], to: s.line[j][1] });
    return c.turn() === "w";
  }).length;
  console.log(`| ${s.week} | ${s.difficulty} | ${wm} | ${s.motif} |`);
}
