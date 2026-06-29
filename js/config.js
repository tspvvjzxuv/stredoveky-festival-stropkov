/**
 * Platby: buď priamo Stripe Payment Links, alebo WooCommerce (WordPress) + Stripe v pokladni.
 * GitHub Pages = len táto prezentačná stránka. WooCommerce musí bežať na hostingu s WordPressom.
 */
window.FESTIVAL_CONFIG = {
  /** Zmeňte pri deployi — vynúti obnovu cache modulov šachu v prehliadači. */
  assetsVersion: "20260601k",
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

  /**
   * Bankový prevod na dobrovoľný dar (zobrazí sa v sekcii Podporte festival).
   * Vyplňte IBAN — zvyšok je voliteľný.
   */
  bankovyDar: {
    iban: "SK75 1100 0000 0029 3642 0693",
    banka: "Tatra banka",
    prijemca: "PTRA",
    variabilnySymbol: "",
    sprava: "Dar na festival PTRA",
    /** Suma zakódovaná v QR (EUR) — na stránke sa nezobrazuje. */
    suma: 35,
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
  bannerVideoUrl: "videos/hero.mp4",

  /** Náhľad pred načítaním videa (viditeľný aj keď autoplay zlyhá). */
  bannerVideoPoster: "images/hero-poster.webp",

  /** Voliteľné: URL Cloudflare Workeru pre overenie kupónov (bez lomky na konci). */
  overenieApiUrl: "",

  /**
   * Prevádzkové prepínače:
   * - registracieOtvorene: false = formuláre na prihlášky sa zamknú a zobrazí sa oznam.
   */
  registracieOtvorene: true,

  /**
   * Prihlášky (prihlasky.js): 1 = Web3Forms, 2 = Formspree, 3 = Formspark.
   */
  /**
   * Web3Forms — odporúčané pre GitHub Pages (web3forms.com).
   * Zadajte svoj e-mail na webe, príde vám Access Key; vložte ho sem (jedna hodnota stačí na všetky formuláre).
   */
  formularPrihlaskyWeb3AccessKey: "cf9cb7de-1c3e-4f9d-a8a6-53c19cb1e8b6",

  /** Formspree — voliteľná záloha: číslo/hash pre https://formspree.io/f/… alebo prázdne. */
  formularPrihlaskyFormspreeFormId: "",

  /** Formspree — celá URL formulára, ak nepoužívate ID vyššie. */
  formularPrihlaskyUrl: "",

  /** Formspark — ID z submit-form.com/… (záloha). */
  formularPrihlaskyFormsparkId: "",

  /**
   * Analytics + SEO
   * GA4 ID z tvaru G-XXXXXXXXXX. Prázdne = analytika sa nenačíta.
   */
  ga4MeasurementId: "",
  /** Verejná URL webu (bez koncovej lomky). Používa sa pri SEO súboroch a odkazoch. */
  siteUrl: "https://ptra.sk",
};
