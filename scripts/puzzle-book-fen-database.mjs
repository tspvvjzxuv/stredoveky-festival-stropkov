/**
 * Prepis diagramov z knihy do FEN (Forsyth-Edwards Notation).
 * Veľké písmená = biele figúry, malé = čierne; w/b = na ťahu.
 * playerColor sa v build skripte odvodí z FEN (w → biely, b → čierny), alebo explicitne.
 *
 * Použitie: import { PUZZLE_BOOK_FENS, getBookFen } from "./puzzle-book-fen-database.mjs"
 *
 * Overenie: node scripts/verify-book-fens.mjs
 * Export JSON: node scripts/export-book-fens-json.mjs → puzzle-book-fens.json
 */

/** @typedef {{ fen: string, sideToMove: "w"|"b", category: string, source?: string }} BookFenEntry */

export const PUZZLE_BOOK_FENS = {
  // —— Mat 1. ťahom (85–90) ——
  85: {
    fen: "r1n1qrk1/pppbNp1p/2p2npb/6q1/4P3/3B4/PPP2PPP/R2Q1RK1 b - - 0 1",
    sideToMove: "b",
    category: "mate_in_1",
    note: "Diagram 1…?; v texte hrozba bieleho Dxh7# — overiť stranu na ťahu.",
  },
  86: {
    fen: "r1bq1r1k/pppppNpp/2n2n2/6N1/4P2P/2B1P3/PPP2PP1/R2BK2R w KQ - 0 1",
    sideToMove: "w",
    category: "mate_in_1",
  },
  87: {
    fen: "r1b4k/ppp1N2p/6pb/4p1N1/4P3/2qP2P1/PP4P1/6K1 w - - 0 1",
    sideToMove: "w",
    category: "mate_in_1",
  },
  88: {
    fen: "r1bknq1r/pp4pp/2p5/4p1B1/2B5/3B4/P4PPP/3R2K1 w - - 0 1",
    sideToMove: "w",
    category: "mate_in_1",
  },
  89: {
    fen: "r1bq4/pp1ppppp/2n5/4P3/2P3k1/6R1/P4PPP/3K1B1R w - - 0 1",
    sideToMove: "w",
    category: "mate_in_1",
  },
  90: {
    fen: "r1bq1r1k/1p1n2b1/p2p2pB/4pN2/PPPPP3/3B4/2P3P1/1n1K2NR w - - 0 1",
    sideToMove: "w",
    category: "mate_in_1",
  },

  // —— Mat 2. ťahmi (175–180) ——
  175: {
    fen: "2r1r1k1/ppp2Npp/2p1Pq2/2b3N1/2p5/7Q/PPP3P1/2KR1R2 w - - 0 1",
    fenAsProvided:
      "r3rk1k/ppp2Npp/2p1Pq2/2b3N1/2p5/7Q/PPP3P1/2KR1R2 w - - 0 1",
    sideToMove: "w",
    category: "mate_in_2",
    note: "Oprava: jeden čierny kráľ (r3rk1k → 2r1r1k1).",
  },
  176: {
    fen: "3b2k1/ppp3pp/p7/1p6/3B2PP/PPP1PQQK/1N1r4/8 b - - 0 1",
    sideToMove: "b",
    category: "mate_in_2",
  },
  177: {
    fen: "1kr1r3/pp1R2p1/pBbp3p/4N2P/6B1/2PPK2P/PP3P2/3R1Q2 b - - 0 1",
    sideToMove: "b",
    category: "mate_in_2",
  },
  178: {
    fen: "r1b1k2r/ppp5/5pp1/3Bpp1N/3P2P1/3P4/PPP1n2P/RN4K1 b kq - 0 1",
    fenAsProvided:
      "r1b1k2r/ppp5/5pp1/3Bpp1N/3P2P1/3P4/PPPKn2P/RN4K1 b kq - 0 1",
    sideToMove: "b",
    category: "mate_in_2",
    note: "Oprava: jeden biely kráľ (PPPKn2P → PPP1n2P).",
  },
  179: {
    fen: "4r1k1/ppp5/8/1P5p/2BP4/2N1q1PP/2QN2P1/R3K2R b KQ - 0 1",
    sideToMove: "b",
    category: "mate_in_2",
  },
  180: {
    fen: "7r/p1R3k1/6p1/4N3/2nQP2P/2P1n3/6PP/K2R1B1R b - - 0 1",
    sideToMove: "b",
    category: "mate_in_2",
  },

  // —— Slabý posledný rad (451–456) ——
  451: {
    fen: "3r2k1/pR4pp/1p3q2/2P5/1PP2P2/5p2/5PP1/2Q3K1 b - - 0 1",
    sideToMove: "b",
    category: "last_rank",
  },
  452: {
    fen: "3r2k1/p1q3pp/2p3p1/P3n3/6B1/5P2/1P3P1P/1R1NQRK1 b - - 0 1",
    sideToMove: "b",
    category: "last_rank",
  },
  453: {
    fen: "8/3Q4/pb2r1kp/1p3qpp/4N3/2nP4/PP3PPP/1B1R2K1 b - - 0 1",
    fenAsProvided:
      "3Q4/pb2r1kp/1p3qpp/4N3/2nP4/PP3PPP/1B1R2K1 b - - 0 1",
    sideToMove: "b",
    category: "last_rank",
    note: "Oprava: doplnený 8. rad (8/) a 8 polí na rade s dámou (3Q4).",
  },
  454: {
    fen: "7r/6p1/5p2/1P1pP1k1/nR1P1pP1/3R2P1/4R2K/rN6 b - - 0 1",
    sideToMove: "b",
    category: "last_rank",
  },
  455: {
    fen: "4r1k1/2R2p1p/3pN1p1/3P4/pr4P1/3R1QP1/4PPP1/3Q1K2 w - - 0 1",
    fenAsProvided:
      "4r1k1/2R2p1p/3pN1p1/3P4/pr4P1/3R1QP1/4PPP1/3q4 w - - 0 1",
    sideToMove: "w",
    category: "last_rank",
    note: "Oprava: biely kráľ na 1. rade (3Q1K2 namiesto 3q4).",
  },
  456: {
    fen: "7R/k1p3r1/1pp3r1/3n2P1/4R2P/3N4/2PP4/3K4 w - - 0 1",
    sideToMove: "w",
    category: "last_rank",
    note: "Bez strelcov g6/g4 podľa textu prílohy.",
  },

  // —— Väzba (382) ——
  382: {
    fen: "n2q2k1/pr2b1B1/1p6/3pp3/P7/8/1P3RPP/5R1K w - - 0 1",
    sideToMove: "w",
    category: "pin",
    note: "Čierna dáma d8, pešiak e5 (nie dáma); biely strelec g7.",
  },

  // —— Dvojitý úder (409–412) ——
  409: {
    fen: "8/8/2k5/7R/r7/3K3p/8/8 b - - 0 1",
    sideToMove: "b",
    category: "double_attack",
  },
  410: {
    fen: "2rR2k1/p5pp/1p3pp1/2n3N1/4P3/6P1/PP3PKP/2R5 w - - 0 1",
    sideToMove: "w",
    category: "double_attack",
    note: "Pešiak f7 podľa textu (nie f6).",
  },
  411: {
    fen: "8/3P2p1/2P1k1p1/b3b1p1/5PPP/1p3K1P/8/8 w - - 0 1",
    sideToMove: "w",
    category: "double_attack",
  },
  412: {
    fen: "8/6r1/6pk/p5rP/1p1N1N1R/PP6/1KP1P3/8 w - - 0 1",
    sideToMove: "w",
    category: "double_attack",
  },
};

/** Kategórie pre filtrovanie */
export const FEN_CATEGORIES = {
  mate_in_1: [85, 86, 87, 88, 89, 90],
  mate_in_2: [175, 176, 177, 178, 179, 180],
  last_rank: [451, 452, 453, 454, 455, 456],
  double_attack: [409, 410, 411, 412],
};

/**
 * @param {number|string} bookId
 * @returns {BookFenEntry|undefined}
 */
export function getBookFen(bookId) {
  return PUZZLE_BOOK_FENS[String(bookId)] ?? PUZZLE_BOOK_FENS[Number(bookId)];
}

/** Len FEN reťazec alebo null ak chýba / neplatný */
export function getBookFenString(bookId) {
  const e = getBookFen(bookId);
  return e ? e.fen : null;
}

/** Odvodí playerColor pre festival (zhodné s build-puzzle-catalog) */
export function playerColorForBookId(bookId) {
  const e = getBookFen(bookId);
  if (!e) return "w";
  const turn = e.fen.split(" ")[1];
  return turn === "b" ? "b" : "w";
}
