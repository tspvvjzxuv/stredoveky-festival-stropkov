/**
 * Nahraďte odkazy vlastnými Stripe Payment Links
 * Vytvoríte ich v: Stripe Dashboard → Produktové katalógy → Platobné odkazy
 */
window.FESTIVAL_CONFIG = {
  stripeVstupenky: "https://buy.stripe.com/test_REPLACE_ME",
  stripeZetony: "https://buy.stripe.com/test_REPLACE_ME",
  rok: 2026,
  miesto: "Stropkov",
  /** Voliteľné: URL Cloudflare Workeru (bez lomky na konci). Kľúč pre vstup NEDÁVAJTE sem — zadá sa na overenie.html */
  overenieApiUrl: "",
};
