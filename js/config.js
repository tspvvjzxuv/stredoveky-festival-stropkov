/**
 * Nahraďte odkazy vlastnými Stripe Payment Links
 * Vytvoríte ich v: Stripe Dashboard → Produktové katalógy → Platobné odkazy
 */
window.FESTIVAL_CONFIG = {
  stripeVstupenky: "https://buy.stripe.com/test_REPLACE_ME",
  stripeZetony: "https://buy.stripe.com/test_REPLACE_ME",
  rok: 2026,
  miesto: "Stropkov",
  /**
   * Banner: fotka za textom v hornom banneri. Pridajte súbor do images/ alebo URL.
   * Príklad: "images/banner.jpg" — kým je prázdne, zobrazí sa len gradient.
   */
  bannerObrazok: "",
  /** Voliteľné: URL Cloudflare Workeru (bez lomky na konci). */
  overenieApiUrl: "",
  /**
   * Stripe odkazy na rezervácie / platby za jednotlivé aktivity (Payment Links).
   */
  stripeRezervacia: {
    lukostrelba: "https://buy.stripe.com/test_REPLACE_ME",
    serm: "https://buy.stripe.com/test_REPLACE_ME",
    deti: "https://buy.stripe.com/test_REPLACE_ME",
    remeslo: "https://buy.stripe.com/test_REPLACE_ME",
  },
};
