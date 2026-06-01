/**
 * 36 úloh — týždne 1–2, 7–9, 10–12 z knihy; ostatné podľa motívu.
 * Úprava: node scripts/shuffle-puzzles.mjs | dávky: scripts/puzzle-book-batch-1.mjs, puzzle-book-batch-2.mjs
 */
export const PUZZLE_SPECS = [
  {
    week: 1,
    difficulty: "easy",
    fen: "r2qk2r/2p1nB1p/p2p1p2/bp2N3/4P3/2PPB3/PP4PP/R1Bb1RK1 w - - 0 1",
    line: [
      [
        "e3",
        "h6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 79 — mat jedným ťahom: Bh6#.",
    solution: "Bh6#"
  },
  {
    week: 1,
    difficulty: "medium",
    fen: "r1b1k2r/p2p1pNp/n2B1n2/1p2N2P/6P1/3P4/P1P1K3/q2Q2B1 w - - 0 1",
    line: [
      [
        "e5",
        "c6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 81 — mat jedným ťahom: Nxc6#.",
    solution: "Nxc6#"
  },
  {
    week: 1,
    difficulty: "hard",
    fen: "r1b1k2r/p2p1pNp/n2B1n2/1p2N2P/6P1/3P4/P1P1K3/q2Q2B1 w - - 0 1",
    line: [
      [
        "g1",
        "b6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 81 — alternatívny mat: Bb6#.",
    solution: "Bb6#"
  },
  {
    week: 2,
    difficulty: "easy",
    fen: "r2qk2r/2p1nB1p/p2p1p2/bp2N3/4P3/2PPB3/PP4PP/R1Bb1RK1 w - - 0 1",
    line: [
      [
        "e3",
        "h6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 80 — rovnaký motív ako č. 79 (strelec na h6); diagram z knihy zodpovedá tejto pozícii.",
    solution: "Bh6#"
  },
  {
    week: 2,
    difficulty: "medium",
    fen: "r1b1k2r/p2p1pNp/n2B1n2/1p2N2P/6P1/3P4/P1P1K3/q2Q2B1 w - - 0 1",
    line: [
      [
        "e5",
        "c6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 83 — jazdec: Nxc6# (pozícia ako č. 81, overené riešenie).",
    solution: "Nxc6#"
  },
  {
    week: 2,
    difficulty: "hard",
    fen: "r1b1k2r/p2p1pNp/n2B1n2/1p2N2P/6P1/3P4/P1P1K3/q2Q2B1 w - - 0 1",
    line: [
      [
        "g1",
        "b6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 84 — Bb6# (druhý mat v tej istej pozícii).",
    solution: "Bb6#"
  },
  {
    week: 3,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/3Q4/6K1 w - - 0 1",
    line: [
      [
        "d2",
        "c3"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "c3",
        "c8"
      ]
    ],
    openingAccept: "mate_in_2_opening",
    subtitle: "Mat v dvoch: úvod dámou (Qc3+, Qd3+ …), finiš ľubovoľným matom.",
    solution: "Qc3+ Kh8 Qc8#"
  },
  {
    week: 3,
    difficulty: "medium",
    fen: "6k1/5pp1/8/6p1/8/8/3Q4/6K1 w - - 0 1",
    line: [
      [
        "d2",
        "a5"
      ],
      [
        "g8",
        "f8"
      ],
      [
        "a5",
        "d8"
      ]
    ],
    openingAccept: "mate_in_2_opening",
    subtitle: "Mat v dvoch: dáma na a5 a finiš Qd8# (kráľ na f8).",
    solution: "Qa5+ Kf8 Qd8#"
  },
  {
    week: 3,
    difficulty: "hard",
    fen: "6k1/8/8/8/8/5q2/8/2R3K1 w - - 0 1",
    win: "black_queen_captured",
    line: [
      [
        "c1",
        "c2"
      ],
      [
        "f3",
        "c6"
      ],
      [
        "c2",
        "c6"
      ]
    ],
    userAccepts: [
      null,
      "black_queen_captured"
    ],
    subtitle: "Získajte dámu: Rc2 a výměna po Qc6.",
    solution: "Rc2 Qc6 Rxc6"
  },
  {
    week: 4,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
    line: [
      [
        "f2",
        "f7"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "f7",
        "f8"
      ]
    ],
    openingAccept: "mate_in_2_opening",
    subtitle: "Úvodný mat v dvoch: útok dámou na f7.",
    solution: "Qxf7+ Kh8 Qf8#"
  },
  {
    week: 4,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/8/4Q2R/6K1 w - - 0 1",
    line: [
      [
        "e2",
        "a6"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "a6",
        "a8"
      ]
    ],
    openingAccept: "mate_in_2_opening",
    subtitle: "Mat v troch: Qa6+ a doraz na a8, veža na h2.",
    solution: "Qa6+ Kh8 Qa8#"
  },
  {
    week: 4,
    difficulty: "hard",
    fen: "5rk1/5ppp/8/8/8/8/5Q2/6K1 w - - 0 1",
    line: [
      [
        "f2",
        "e3"
      ],
      [
        "f8",
        "e8"
      ],
      [
        "e3",
        "d4"
      ],
      [
        "e8",
        "f8"
      ],
      [
        "d4",
        "c5"
      ],
      [
        "f8",
        "c8"
      ],
      [
        "c5",
        "c8"
      ]
    ],
    subtitle: "Štvorťahová dámska kombinácia proti veži na c8.",
    solution: "Qe3+ Re8 Qd4+ Rf8 Qc5+ Rc8 Qxc8#"
  },
  {
    week: 5,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/6R1/6K1 w - - 0 1",
    line: [
      [
        "g2",
        "e2"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "e2",
        "e8"
      ]
    ],
    openingAccept: "mate_in_2_opening",
    subtitle: "Mat v dvoch: veža na e2 a Re8#.",
    solution: "Re2+ Kh8 Re8#"
  },
  {
    week: 5,
    difficulty: "medium",
    fen: "6k1/5ppp/8/8/8/8/2Q5/6K1 w - - 0 1",
    line: [
      [
        "c2",
        "b3"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "b3",
        "b8"
      ]
    ],
    openingAccept: "mate_in_2_opening",
    subtitle: "Mat v dvoch po b-file: Qb3+ a Qb8#.",
    solution: "Qb3+ Kh8 Qb8#"
  },
  {
    week: 5,
    difficulty: "hard",
    fen: "5qk1/5ppp/8/8/8/8/6R1/6K1 w - - 0 1",
    line: [
      [
        "g2",
        "e2"
      ],
      [
        "f8",
        "e8"
      ],
      [
        "e2",
        "e8"
      ]
    ],
    subtitle: "Získajte čiernu dámu: Re2 a výměna na e8.",
    solution: "Re2+ Qe8 Rxe8#"
  },
  {
    week: 6,
    difficulty: "easy",
    fen: "6k1/5ppp/8/8/8/8/R7/4K3 w - - 0 1",
    line: [
      [
        "a2",
        "a3"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "a3",
        "a8"
      ]
    ],
    openingAccept: "mate_in_2_opening",
    subtitle: "Mat v dvoch po a-file: Ra3+ a Ra8#.",
    solution: "Ra3+ Kh8 Ra8#"
  },
  {
    week: 6,
    difficulty: "medium",
    fen: "6k1/4pppp/8/8/8/5N2/5Q2/6K1 w - - 0 1",
    line: [
      [
        "f3",
        "e5"
      ],
      [
        "g8",
        "f8"
      ],
      [
        "f2",
        "f7"
      ]
    ],
    subtitle: "Jazdec a dáma pri oslabených pešiakoch: Ne5+ a Qxf7#.",
    solution: "Ne5+ Kf8 Qxf7#"
  },
  {
    week: 6,
    difficulty: "hard",
    fen: "6k1/8/8/8/4q3/8/8/3R2K1 w - - 0 1",
    win: "black_queen_captured",
    line: [
      [
        "d1",
        "d2"
      ],
      [
        "e4",
        "d5"
      ],
      [
        "d2",
        "d5"
      ]
    ],
    userAccepts: [
      null,
      "black_queen_captured"
    ],
    subtitle: "Získajte dámu: Rd2 a výměna na d5.",
    solution: "Rd2 Qd5 Rxd5"
  },
  {
    week: 7,
    difficulty: "easy",
    fen: "1rn5/kp3ppp/p1q5/N1Q5/8/7P/PP3PP1/3R2K1 w - - 0 1",
    line: [
      [
        "a5",
        "c6"
      ],
      [
        "a7",
        "a8"
      ],
      [
        "c5",
        "b6"
      ],
      [
        "c8",
        "a7"
      ],
      [
        "b6",
        "a7"
      ]
    ],
    subtitle: "Kniha č. 381 — väzba: Nxc6+ a mat Qxa7#.",
    solution: "Nxc6+ Ka8 Qb6 Na7 Qxa7#"
  },
  {
    week: 7,
    difficulty: "medium",
    fen: "2rqkb1r/pp1npppp/2Q2n2/2pPN3/1p6/8/PP3PPP/R3KB1R w KQkq - 0 1",
    line: [
      [
        "e5",
        "d7"
      ],
      [
        "d8",
        "d7"
      ],
      [
        "f1",
        "b5"
      ],
      [
        "f6",
        "g8"
      ],
      [
        "c6",
        "d7"
      ]
    ],
    subtitle: "Kniha č. 383 — väzba: Nxd7, Bb5+ a mat Qxd7#.",
    solution: "Nxd7 Qxd7 Bb5+ Ng8 Qxd7#"
  },
  {
    week: 7,
    difficulty: "hard",
    fen: "r7/bp1n4/N1p3kr/q4ppp/3B1PPP/pPPQ2P1/P7/2KR3R w - - 0 1",
    line: [
      [
        "g4",
        "f5"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "d4",
        "c5"
      ],
      [
        "f7",
        "e8"
      ],
      [
        "d3",
        "d7"
      ]
    ],
    subtitle: "Kniha č. 384 — väzba: gxf5+ a mat Qxd7#.",
    solution: "gxf5+ Kf7 Bc5 Ke8 Qxd7#"
  },
  {
    week: 8,
    difficulty: "easy",
    fen: "n2q2k1/pr2b1B1/1p6/3pq3/P7/8/1P3RPP/5R1K w - - 0 1",
    line: [
      [
        "g7",
        "e5"
      ],
      [
        "d8",
        "b8"
      ],
      [
        "e5",
        "b8"
      ]
    ],
    win: "black_queen_captured",
    subtitle: "Kniha č. 382 — väzba: Bxe5 a Bxb8 (zisk dám).",
    solution: "Bxe5 Qb8 Bxb8"
  },
  {
    week: 8,
    difficulty: "medium",
    fen: "n2q2k1/pr2b1B1/1p6/3pq3/P7/8/1P3RPP/5R1K w - - 0 1",
    line: [
      [
        "g7",
        "e5"
      ],
      [
        "d8",
        "b8"
      ],
      [
        "e5",
        "b8"
      ],
      [
        "b7",
        "b8"
      ]
    ],
    win: "decisive",
    subtitle: "Kniha č. 382 — Bxe5, výmena na b8, biely má prevahu.",
    solution: "Bxe5 Qb8 Bxb8 Rxb8"
  },
  {
    week: 8,
    difficulty: "hard",
    fen: "r7/bp1n4/N1p3kr/q4ppp/3B1PPP/pPPQ2P1/P7/2KR3R w - - 0 1",
    line: [
      [
        "g4",
        "f5"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "d4",
        "c5"
      ],
      [
        "f7",
        "e8"
      ],
      [
        "d3",
        "d7"
      ]
    ],
    subtitle: "Kniha č. 384 — gxf5+ a Qxd7# (ťažšia varianta).",
    solution: "gxf5+ Kf7 Bc5 Ke8 Qxd7#"
  },
  {
    week: 9,
    difficulty: "easy",
    fen: "2r1k3/1p4pp/p3pP2/2n3N1/4P3/5PP1/PP4KP/2R5 w - - 0 1",
    line: [
      [
        "c1",
        "c5"
      ],
      [
        "c8",
        "c5"
      ],
      [
        "g5",
        "e6"
      ]
    ],
    win: "decisive",
    subtitle: "Kniha č. 410 — dvojitý úder: Rxc5 a Nxe6+ (pešiak f7).",
    solution: "Rxc5 Rxc5 Nxe6+"
  },
  {
    week: 9,
    difficulty: "medium",
    fen: "8/3P4/2P1k1p1/b3Bp2/6Pp/5K1P/p7/8 w - - 0 1",
    line: [
      [
        "c6",
        "c7"
      ],
      [
        "e6",
        "d7"
      ],
      [
        "c7",
        "c8"
      ],
      [
        "d7",
        "c8"
      ]
    ],
    win: "decisive",
    subtitle: "Kniha č. 411 — postup c7–c8 a zisk kvality.",
    solution: "c7 Kxd7 c8=Q Kxc8"
  },
  {
    week: 9,
    difficulty: "hard",
    fen: "8/8/3r3k/p5rp/3N1N1R/PP6/1KP5/8 w - - 0 1",
    line: [
      [
        "d4",
        "f5"
      ],
      [
        "h6",
        "h7"
      ],
      [
        "f4",
        "g6"
      ]
    ],
    win: "decisive",
    subtitle: "Kniha č. 412 — Nf5+ a vidlička Ng6.",
    solution: "Nf5+ Kh7 Ng6"
  },
  {
    week: 10,
    difficulty: "easy",
    fen: "5r2/ppR2Nkp/2n1pq2/1B5p/8/1B6/P2Q1PPP/3R2K1 w - - 0 1",
    line: [
      [
        "c7",
        "c6"
      ],
      [
        "a7",
        "a6"
      ],
      [
        "b3",
        "e6"
      ],
      [
        "g7",
        "g6"
      ],
      [
        "d2",
        "h6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 193 — Rxc6, Bxe6 a mat Qh6#.",
    solution: "Rxc6 a6 Bxe6 Kg6 Qh6#"
  },
  {
    week: 10,
    difficulty: "medium",
    fen: "6k1/5pp1/5b2/7Q/7N/1P1q4/P1P5/1K5R w - - 0 1",
    line: [
      [
        "h5",
        "g6"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "g7",
        "g6"
      ],
      [
        "h4",
        "g6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 198 — Qg6, Qxf7 a mat jazdcom Nxg6#.",
    solution: "Qg6+ Kh8 Qxf7 g6 Nxg6#"
  },
  {
    week: 10,
    difficulty: "hard",
    fen: "6k1/5pp1/5b2/7Q/7N/1P1q4/P1P5/1K5R w - - 0 1",
    line: [
      [
        "h5",
        "g6"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "f6",
        "e7"
      ],
      [
        "h4",
        "g6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 198 — ťažšia obrana Be7, finiš Nxg6#.",
    solution: "Qg6+ Kh8 Qxf7 Be7 Nxg6#"
  },
  {
    week: 11,
    difficulty: "easy",
    fen: "6k1/5pp1/5b2/7Q/7N/1P1q4/P1P5/1K5R w - - 0 1",
    line: [
      [
        "h5",
        "g6"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "g7",
        "g6"
      ],
      [
        "h4",
        "g6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 198 — Qg6, Qxf7 a mat jazdcom Nxg6#.",
    solution: "Qg6+ Kh8 Qxf7 g6 Nxg6#"
  },
  {
    week: 11,
    difficulty: "medium",
    fen: "6k1/5pp1/5b2/7Q/7N/1P1q4/P1P5/1K5R w - - 0 1",
    line: [
      [
        "h5",
        "g6"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "g7",
        "g5"
      ],
      [
        "h4",
        "g6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 198 — obrana g5, finiš Nxg6#.",
    solution: "Qg6+ Kh8 Qxf7 g5 Nxg6#"
  },
  {
    week: 11,
    difficulty: "hard",
    fen: "6k1/5pp1/5b2/7Q/7N/1P1q4/P1P5/1K5R w - - 0 1",
    line: [
      [
        "h5",
        "g6"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "d3",
        "c4"
      ],
      [
        "h4",
        "g6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 198 — čierna dáma na c4, mat Nxg6#.",
    solution: "Qg6+ Kh8 Qxf7 Qc4 Nxg6#"
  },
  {
    week: 12,
    difficulty: "easy",
    fen: "5r2/ppR2Nkp/2n1pq2/1B5p/8/1B6/P2Q1PPP/3R2K1 w - - 0 1",
    line: [
      [
        "c7",
        "c6"
      ],
      [
        "a7",
        "a5"
      ],
      [
        "b3",
        "e6"
      ],
      [
        "g7",
        "g6"
      ],
      [
        "d2",
        "h6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 193 — záverečný týždeň: Rxc6, Bxe6 a Qh6#.",
    solution: "Rxc6 a5 Bxe6 Kg6 Qh6#"
  },
  {
    week: 12,
    difficulty: "medium",
    fen: "5r2/ppR2Nkp/2n1pq2/1B5p/8/1B6/P2Q1PPP/3R2K1 w - - 0 1",
    line: [
      [
        "c7",
        "c6"
      ],
      [
        "b7",
        "b6"
      ],
      [
        "b3",
        "e6"
      ],
      [
        "g7",
        "g6"
      ],
      [
        "d2",
        "h6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 193 — varianta po b6.",
    solution: "Rxc6 b6 Bxe6 Kg6 Qh6#"
  },
  {
    week: 12,
    difficulty: "hard",
    fen: "6k1/5pp1/5b2/7Q/7N/1P1q4/P1P5/1K5R w - - 0 1",
    line: [
      [
        "h5",
        "g6"
      ],
      [
        "g8",
        "h8"
      ],
      [
        "g6",
        "f7"
      ],
      [
        "d3",
        "c4"
      ],
      [
        "h4",
        "g6"
      ]
    ],
    win: "checkmate",
    subtitle: "Kniha č. 198 — koruna festivalu: Qc4 a mat Nxg6#.",
    solution: "Qg6+ Kh8 Qxf7 Qc4 Nxg6#"
  }
];
