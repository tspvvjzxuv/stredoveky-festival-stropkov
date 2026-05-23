export const FESTIVAL_PUZZLES = [
  {
    id: "cg-puzzle-1",
    title: "Úloha 1 (týždeň 1)",
    subtitle: "Zadanie: Biely na ťahu dá mat 1. ťahom.",
    ariaLabel: "Úloha 1, biely matuje v jednom",
    fen: "6k1/5ppp/8/8/8/8/6Q1/6RK w - - 0 1",
    solution: "Qg7#",
    solutionLine: [{ from: "g2", to: "g7" }],
  },
  {
    id: "cg-puzzle-2",
    title: "Úloha 2 (týždeň 1)",
    subtitle:
      "Zadanie: Biely na ťahu dá mat 2. ťahmi. Po 1. ťahu bieleho ťaháte aj ako čierny — nie každá obrana vedie k matu.",
    ariaLabel: "Úloha 2, biely matuje v dvoch",
    fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
    solution: "Qe1+ a po Kh8 mat Qe8#",
    branching: {
      white_open: {
        move: { from: "f2", to: "e1" },
        wrongMessage: "⚠️ Iný biely ťah. Cieľ je mat v 2.",
      },
      black_replies: [
        {
          move: { from: "g8", to: "h8" },
          winsOnFinish: true,
          message: "✅ Kh8 — správna obrana. Dokončite mat bielym.",
          white_finish: {
            move: { from: "e1", to: "e8" },
            wrongMessage: "⚠️ Týmto ťahom nedáte mat.",
          },
        },
        {
          move: { from: "g8", to: "f8" },
          winsOnFinish: false,
          message: "⚠️ Kf8 — mat v 2 už nehrozí. Skúste bielym dokončiť útok.",
          white_finish: {
            wrongMessage:
              "⚠️ Proti Kf8 už mat v 2 nejde. Vráťte sa a skúste inú čiernu obranu (napr. Kh8).",
          },
        },
        {
          move: { from: "h7", to: "h6" },
          winsOnFinish: false,
          message: "⚠️ h6 — mat v 2 nehrozí. Skúste bielym dokončiť útok.",
          white_finish: {
            wrongMessage:
              "⚠️ Proti h6 už mat v 2 nejde. Vráťte sa a skúste inú čiernu obranu (napr. Kh8).",
          },
        },
      ],
      default_reply: {
        message: "⚠️ Iná čierna obrana. Skúste bielym dokončiť.",
        white_finish: {
          wrongMessage:
            "⚠️ Táto vetva nevedie k matu v 2. Vzorové riešenie: Qe1+ Kh8 Qe8#.",
        },
      },
      allowAnyBlack: true,
    },
  },
  {
    id: "cg-puzzle-3",
    title: "Úloha 3 (týždeň 1)",
    subtitle:
      "Zadanie: Biely na ťahu získa figúru (taktika). Čierny nemusí prekrývať šach dámou — vyskúšajte obranu.",
    ariaLabel: "Úloha 3, biely získa materiál",
    fen: "6k1/8/8/4N3/5q2/8/8/2R3K1 w - - 0 1",
    solution: "Rc8+ a po Qf8 víťazný Rxf8",
    branching: {
      white_open: {
        move: { from: "c1", to: "c8" },
        wrongMessage: "⚠️ Iný biely ťah. Začnite šachom na veži.",
      },
      black_replies: [
        {
          move: { from: "f4", to: "f8" },
          winsOnFinish: true,
          message: "✅ Qf8 — dáma prekrýva šach. Teraz získajte materiál.",
          white_finish: {
            move: { from: "c8", to: "f8" },
            wrongMessage: "⚠️ Týmto ťahom nezískate vežu.",
          },
        },
        {
          move: { from: "g8", to: "h7" },
          winsOnFinish: false,
          message:
            "⚠️ Kh7 — kráľ ustúpil, dáma nemusí prekrývať šach. Skúste získať materiál bielym.",
          white_finish: {
            wrongMessage:
              "⚠️ Táto obrana nevedie k vzorovému zisku. Vzorová línia: Rc8+ Qf8 Rxf8.",
          },
        },
        {
          move: { from: "g8", to: "g7" },
          winsOnFinish: false,
          message:
            "⚠️ Kg7 — iná obrana kráľom. Skúste získať materiál bielym.",
          white_finish: {
            wrongMessage:
              "⚠️ Táto obrana nevedie k vzorovému zisku. Vzorová línia: Rc8+ Qf8 Rxf8.",
          },
        },
      ],
      default_reply: {
        message: "⚠️ Iná čierna obrana. Skúste bielym pokračovať.",
        white_finish: {
          wrongMessage:
            "⚠️ Táto vetva nezodpovedá vzorovému riešeniu. Rc8+ Qf8 Rxf8 (zisk veže).",
        },
      },
      allowAnyBlack: true,
      winCheck: "black_queen_captured",
    },
  },
];
