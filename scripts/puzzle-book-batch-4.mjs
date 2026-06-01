/**
 * Úlohy z knihy — dávka 4 (mat 2: č. 175, 187–190, 192; str. 37 a 39).
 * 176–180 — čierny na ťahu → vynechané.
 * 191 — diagram nedáva vynútený mat 2 (Bxh6 „berie“ kráľa v chess.js) → vynechané.
 * 192 — FEN opravený (kráľ čierny na g7: r3Bpkp).
 * 188 — h5 pred Nxf7# (inak mat už v 1. ťahu).
 * 189 — Re6+ (inak Bf8# v 1. ťahu).
 */

export const PUZZLE_BOOK_BATCH_4 = [
  {
    week: 5,
    difficulty: "easy",
    bookId: 175,
    theme: "Mat dvoma ťahmi",
    fen: "2r1r1k1/ppp2Npp/2p1Pq2/2b3N1/2p5/7Q/PPP3P1/2KR1R2 w - - 0 1",
    line: [
      ["f7", "d8"],
      ["e8", "f8"],
      ["h3", "h7"],
    ],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Kniha č. 175 — Nd8 a mat Qxh7# (FEN z databázy, opravený diagram).",
    solution: "Nd8 Rf8 Qxh7#",
  },
  {
    week: 5,
    difficulty: "medium",
    bookId: 187,
    theme: "Mat dvoma ťahmi",
    fen: "1r6/7p/2R3p1/pp2p3/k3B2r/P7/1PP3P1/6K1 w - - 0 1",
    line: [
      ["c6", "b6"],
      ["b5", "b4"],
      ["e4", "c6"],
    ],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Kniha č. 187 — Rb6 a mat strelcom Bc6#.",
    solution: "Rb6 b4 Bc6#",
  },
  {
    week: 5,
    difficulty: "hard",
    bookId: 188,
    theme: "Mat dvoma ťahmi",
    fen: "2r4k/2qb1rb1/p3pN1p/1p2PpN1/5P1P/8/PPP5/2K3RR w - - 0 1",
    line: [
      ["h4", "h5"],
      ["c8", "d8"],
      ["g5", "f7"],
    ],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Kniha č. 188 — h5, Rd8 a Nxf7#.",
    solution: "h5 Rd8 Nxf7#",
  },
  {
    week: 6,
    difficulty: "easy",
    theme: "Mat dvoma ťahmi",
    fen: "6k1/5ppp/8/8/8/8/R7/4K3 w - - 0 1",
    line: [["a2", "a3"], ["g8", "h8"], ["a3", "a8"]],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Mat v dvoch: Ra3+ a Ra8#.",
    solution: "Ra3+ Kh8 Ra8#",
  },
  {
    week: 6,
    difficulty: "medium",
    theme: "Mat dvoma ťahmi",
    fen: "6k1/4pppp/8/8/8/5N2/5Q2/6K1 w - - 0 1",
    line: [["f3", "e5"], ["g8", "f8"], ["f2", "f7"]],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Ne5+ a Qxf7#.",
    solution: "Ne5+ Kf8 Qxf7#",
  },
  {
    week: 6,
    difficulty: "hard",
    bookId: 192,
    theme: "Mat dvoma ťahmi",
    fen: "8/r3Bpkp/4q1p1/8/5Q1K/8/8/8 w - - 0 1",
    line: [
      ["f4", "e5"],
      ["g7", "h6"],
      ["e7", "f8"],
    ],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Kniha č. 192 — Qe5+ Kh6 a Bf8# (FEN s kráľom na g7).",
    solution: "Qe5+ Kh6 Bf8#",
  },
];
