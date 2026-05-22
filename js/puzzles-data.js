export const FESTIVAL_PUZZLES = [
  {
    id: "cg-puzzle-1",
    title: "Úloha 1 (týždeň 1)",
    subtitle: "Zadanie: Biely na ťahu dá mat 1. ťahom.",
    ariaLabel: "Úloha 1, biely matuje v jednom",
    fen: "6k1/5ppp/8/8/8/8/6Q1/6RK w - - 0 1",
    solution: "Qg7#",
    solutionLine: [{ from: "g2", to: "g7" }],
    engineDepth: 4,
  },
  {
    id: "cg-puzzle-2",
    title: "Úloha 2 (týždeň 1)",
    subtitle:
      "Zadanie: Biely na ťahu dá mat 2. ťahmi. Po 1. ťahu bieleho ťaháte aj ako čierny — nie každá obrana vedie k matu.",
    ariaLabel: "Úloha 2, biely matuje v dvoch",
    fen: "6k1/5ppp/8/8/8/5N2/5QPP/6K1 w - - 0 1",
    solution: "Qe1+ a po Kh8 mat Qe8#",
    engineDepth: 5,
    branching: {
      opening: {
        move: { from: "f2", to: "e1" },
        wrongMessage: "⚠️ Iný biely ťah — skúste znova. Cieľ je mat v 2.",
      },
      blackResponses: [
        {
          move: { from: "g8", to: "h8" },
          correct: true,
          message: "✅ Kh8 — správna obrana. Dokončite mat bielym.",
          whiteFinish: {
            move: { from: "e1", to: "e8" },
            wrongMessage: "⚠️ Týmto ťahom nedáte mat. Skúste znova.",
          },
        },
        {
          move: { from: "g8", to: "f8" },
          correct: false,
          message:
            "⚠️ Kf8 — mat v 2 už nehrozí. Môžete skúsiť biely ťah, ale pečať len pri celom správnom riešení (Qe1+ Kh8 Qe8#).",
        },
        {
          move: { from: "h7", to: "h6" },
          correct: false,
          message:
            "⚠️ h6 — mat v 2 nehrozí. Skúste znova alebo resetnite dosku.",
        },
      ],
      unknownBlackMessage:
        "⚠️ Iná čierna obrana. Pokračujte bielym, ale plné riešenie je Qe1+ Kh8 Qe8#.",
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
    engineDepth: 4,
    branching: {
      opening: {
        move: { from: "c1", to: "c8" },
        wrongMessage: "⚠️ Iný biely ťah — skúste znova. Začnite šachom na veži.",
      },
      blackResponses: [
        {
          move: { from: "f4", to: "f8" },
          correct: true,
          message: "✅ Qf8 — dáma prekrýva šach. Teraz získajte materiál.",
          whiteFinish: {
            move: { from: "c8", to: "f8" },
            wrongMessage: "⚠️ Týmto ťahom nezískate vežu. Skúste znova.",
          },
        },
        {
          move: { from: "g8", to: "h7" },
          correct: false,
          message:
            "⚠️ Kh7 — kráľ ustúpil, dáma nemusí prekrývať šach. Hľadajte inú bielu reakciu alebo reset.",
        },
        {
          move: { from: "g8", to: "g7" },
          correct: false,
          message:
            "⚠️ Kg7 — iná obrana kráľom. Vzorové riešenie pokračuje Qf8 a Rxf8.",
        },
      ],
      unknownBlackMessage:
        "⚠️ Iná čierna obrana. Vzorová línia: Rc8+ Qf8 Rxf8 (zisk veže).",
      allowAnyBlack: true,
      winCheck: "black_queen_captured",
    },
  },
];
