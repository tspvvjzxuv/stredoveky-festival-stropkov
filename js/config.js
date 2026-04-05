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
    lukostrelba: "",
    serm: "",
    deti: "",
    remeslo: "",
  },

  /** Priame Stripe Payment Links (keď platbyRezim === "stripe_links") */
  stripeVstupenky: "https://buy.stripe.com/test_REPLACE_ME",
  /** Žetóny sa v tomto ročníku predávajú len fyzicky na pokladnici (žiadny online odkaz). */
  stripeRezervacia: {
    lukostrelba: "https://buy.stripe.com/test_REPLACE_ME",
    serm: "https://buy.stripe.com/test_REPLACE_ME",
    deti: "https://buy.stripe.com/test_REPLACE_ME",
    remeslo: "https://buy.stripe.com/test_REPLACE_ME",
  },

  /**
   * Banner: fotka za textom (ak nepoužívate video alebo ako záloha).
   * Môže byť aj animovaný GIF: "images/hero.gif"
   */
  bannerObrazok: "",

  /**
   * Video na pozadí hero (stredoveká atmosféra). Prázdne = žiadne video.
   * Predvolené: stock „meče v tráve“ (Mixkit, zdarma na web).
   * Vlastné: nahrajte napr. videos/hero.mp4 do repa a dajte relatívnu cestu.
   * Pozn.: materiál z Netflix Witcher je autorsky chránený — nepoužívajte bez licencie.
   */
  /** Dynamickejší záber (rytieri v súboji); tichší variant: …/34697/34697-720.mp4 (meče v tráve). */
  bannerVideoUrl:
    "https://assets.mixkit.co/videos/13029/13029-720.mp4",

  /** Voliteľný náhľad pred spustením videa (cesta alebo URL obrázka). */
  bannerVideoPoster: "",

  /** Voliteľné: URL Cloudflare Workeru pre overenie kupónov (bez lomky na konci). */
  overenieApiUrl: "",

  /**
   * Prihlášky (prihlasky.js): 1 = Formspree (ID alebo URL), 2 = Web3Forms, 3 = Formspark.
   */
  /**
   * Formspree — ID pre https://formspree.io/f/…
   * Zvyčajne je to isté číslo ako Project ID v URL nastavení; ak odoslanie zlyhá,
   * otvorte v dashboarde konkrétny formulár → Integration a vložte sem presný úsek z „/f/…“
   * (môže byť aj kratší hash). Alternatíva: celá URL do formularPrihlaskyUrl nižšie.
   * Deploy Key v projekte je len pre CLI, nie pre túto HTML stránku.
   */
  formularPrihlaskyFormspreeFormId: "2973068715488181717",

  /** Prázdne = použiť ID vyššie. Inak celá adresa napr. https://formspree.io/f/abcdefgh */
  formularPrihlaskyUrl: "",

  /** Web3Forms access key — len ak Formspree nepoužívate (nechajte prázdne). */
  formularPrihlaskyWeb3AccessKey: "",

  /** Formspark submit-form.com/ID — voliteľná záloha. */
  formularPrihlaskyFormsparkId: "",
};
