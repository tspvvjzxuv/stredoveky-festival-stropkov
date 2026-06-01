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
    fen: "2r4k/2qb1qb1/p3pN1p/1p2PpN1/5P1P/8/PPP5/2K3RR w - - 0 1",
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
    bookId: 189,
    theme: "Mat dvoma ťahmi",
    fen: "7k/1n4Bp/7R/8/8/8/B7/B6K w - - 0 1",
    line: [
      ["h6", "e6"],
      ["h8", "g8"],
      ["e6", "e7"],
    ],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Kniha č. 189 — Re6+ a mat Re7#.",
    solution: "Re6+ Kg8 Re7#",
  },
  {
    week: 6,
    difficulty: "medium",
    bookId: 190,
    theme: "Mat dvoma ťahmi",
    fen: "1r5r/pbn1n1k1/3p1ppp/3B1B2/2P2P2/1R2B3/PQ4PP/1R4K1 w - - 0 1",
    line: [
      ["f5", "d7"],
      ["g7", "f8"],
      ["b2", "f6"],
    ],
    openingAccept: "mate_in_2_opening",
    win: "checkmate",
    subtitle: "Kniha č. 190 — Bd7 a mat Qxf6#.",
    solution: "Bd7 Kf8 Qxf6#",
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
