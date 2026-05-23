/** Spoločná logika porovnávania ťahov pre hlavolamy. */

export function movesMatch(a, b) {
  if (!a || !b) return false;
  return a.from === b.from && a.to === b.to && (a.promotion || "q") === (b.promotion || "q");
}
