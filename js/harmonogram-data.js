/**
 * Deň konania (Europe/Bratislava) — v tento deň sa zobrazí „čo práve prebieha“.
 * Upravte dátum podľa reálneho termínu festivalu.
 */
window.HARMONOGRAM_DATA = {
  festivalDate: "2026-08-16",
  slots: [
    {
      start: "09:00",
      end: "10:30",
      title: "Otvorenie areálu, rytierska cesta, jedlo a nápoje",
      activities: [
        "Začiatok rytierskej cesty (úlohy po areáli)",
        "Stánky s jedlom a nápojmi počas celého dňa",
        "Festivalový šach, remeslá, prvé predstavenie divadla podľa programu",
      ],
    },
    {
      start: "10:30",
      end: "11:00",
      title: "Úvodný ceremoniál, divadlo",
      activities: [
        "Privítanie hostí pri scéne",
        "Krátke divadelné vstupy alebo úvod k programu",
      ],
    },
    {
      start: "11:00",
      end: "13:00",
      title: "Šermiári, strelnica (aj detská), divadlo",
      activities: [
        "Šermiarske ukážky a školička pre odvážnych",
        "Strelnica — aj detské stanovisko s dohľadom",
        "Divadelné predstavenie (festivalové divadlo)",
        "Šach, remeslá, občerstvenie a nápoje v stánkoch",
      ],
    },
    {
      start: "13:00",
      end: "15:00",
      title: "Obed, guláš, hudba, pokračovanie programu",
      activities: [
        "Guláš a teplé jedlá, studené nápoje",
        "Živá stredoveká hudba, oddych pri táboráku (ak je rozžatý skôr)",
        "Rytierska cesta, divadlo a strelnica podľa rozvrhu staníc",
      ],
    },
    {
      start: "15:00",
      end: "15:30",
      title: "Prestávka pred lukostreleckým turnajom",
      activities: [
        "Registrácia súťažiacich, nápoje a jedlo v stánkoch",
        "Presun divákov k lukostreleckej dráhe",
      ],
    },
    {
      start: "15:30",
      end: "17:00",
      title: "Lukostrelecký turnaj",
      activities: [
        "Súťažné kolá (pravidlá oznámi rozhodca)",
        "Strelnica a detské aktivity môžu bežať paralelne mimo dráhy",
        "Divácky program, nápoje v dosahu",
      ],
    },
    {
      start: "17:00",
      end: "20:00",
      title: "Večerné divadlo, táborák, guláš, šermiári",
      activities: [
        "Večerné divadelné predstavenie na scéne",
        "Táborák, guláš, posedenie",
        "Šermiárske body alebo ukážky podľa svetla",
        "Jedlo a nápoje až do záveru",
      ],
    },
    {
      start: "20:00",
      end: "21:00",
      title: "Ukončenie festivalu",
      activities: [
        "Rozlúčka, posledné nápoje a nákupy žetónov pri pokladnici",
        "Postupný odchod z areálu Pod vlekom",
      ],
    },
  ],
};
