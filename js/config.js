/**
 * Platby: buď priamo Stripe Payment Links, alebo WooCommerce (WordPress) + Stripe v pokladni.
 * GitHub Pages = len táto prezentačná stránka. WooCommerce musí bežať na hostingu s WordPressom.
 */
window.FESTIVAL_CONFIG = {
  rok: 2026,
  miesto: "Stropkov",

  /**
   * "stripe_links" = tlačidlá použijú nižšie uvedené buy.stripe.com odkazy.
   * "woocommerce"  = tlačidlá smerujú na produkty vo vašom WooCommerce (cesty relatívne k zakladnaUrl).
   */
  platbyRezim: "stripe_links",

  /** Základná adresa WordPress/Woo obchodu, bez koncovej lomky. Príklad: https://festivalvasadomena.sk */
  woocommerceZakladnaUrl: "",

  /**
   * Stránka katalógu alebo „Obchod“ vo WooCommerce (relatívna cesta alebo plné URL).
   * Príklady: /obchod/  /shop/  (závisí od trvalých odkazov vo WP)
   */
  woocommerceObchodStranka: "/obchod/",

  /**
   * Relatívne cesty k produktom (od zakladnaUrl) alebo plné https://… URL na konkrétny produkt.
   * Vytvorte produkty vo Woo → skopírujte odkaz „Zobraziť produkt“ a použite len cestu alebo celú URL.
   */
  woocommerceProdukty: {
    vstupenky: "",
    zetony: "",
    lukostrelba: "",
    serm: "",
    deti: "",
    remeslo: "",
  },

  /** Priame Stripe Payment Links (keď platbyRezim === "stripe_links") */
  stripeVstupenky: "https://buy.stripe.com/test_REPLACE_ME",
  stripeZetony: "https://buy.stripe.com/test_REPLACE_ME",
  stripeRezervacia: {
    lukostrelba: "https://buy.stripe.com/test_REPLACE_ME",
    serm: "https://buy.stripe.com/test_REPLACE_ME",
    deti: "https://buy.stripe.com/test_REPLACE_ME",
    remeslo: "https://buy.stripe.com/test_REPLACE_ME",
  },

  /**
   * Banner: fotka za textom v hornom banneri.
   * Príklad: "images/banner.jpg" — kým je prázdne, zobrazí sa len gradient.
   */
  bannerObrazok: "",

  /** Voliteľné: URL Cloudflare Workeru pre overenie kupónov (bez lomky na konci). */
  overenieApiUrl: "",
};
