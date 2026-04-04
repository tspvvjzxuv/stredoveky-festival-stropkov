(function () {
  var cfg = window.FESTIVAL_CONFIG || {};
  var y = cfg.rok || new Date().getFullYear();
  var heroYear = document.getElementById("hero-year");
  var footerYear = document.getElementById("footer-year");
  if (heroYear) heroYear.textContent = String(y);
  if (footerYear) footerYear.textContent = String(y);

  var hero = document.querySelector(".hero");
  if (hero && cfg.bannerObrazok && String(cfg.bannerObrazok).trim()) {
    var src = String(cfg.bannerObrazok).trim().replace(/"/g, "");
    hero.style.setProperty("--hero-photo", 'url("' + src + '")');
  }

  var wcMode =
    cfg.platbyRezim === "woocommerce" &&
    cfg.woocommerceZakladnaUrl &&
    String(cfg.woocommerceZakladnaUrl).trim();

  function resolveShopUrl(path, base) {
    var p = (path || "").trim();
    var b = (base || "").trim().replace(/\/$/, "");
    if (!p || p === "#") return "#";
    if (/^https?:\/\//i.test(p)) return p;
    if (!b) return "#";
    var rel = p.charAt(0) === "/" ? p : "/" + p;
    return b + rel;
  }

  function isBadPaymentUrl(url) {
    if (!url || url === "#") return true;
    var s = String(url);
    if (s.indexOf("REPLACE_ME") !== -1) return true;
    return false;
  }

  function bindPaymentLink(el, url, hint) {
    if (!el) return;
    var u = url || "#";
    el.href = u;
    if (isBadPaymentUrl(u)) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        alert(hint);
      });
    }
  }

  var navObchod = document.getElementById("nav-obchod");
  if (navObchod) {
    if (wcMode) {
      var shopPath = (cfg.woocommerceObchodStranka || "/").trim();
      navObchod.href = resolveShopUrl(
        shopPath || "/",
        cfg.woocommerceZakladnaUrl.trim()
      );
      navObchod.setAttribute("target", "_blank");
      navObchod.setAttribute("rel", "noopener noreferrer");
    } else {
      navObchod.href = "#vstupenky-rezervacie";
      navObchod.removeAttribute("target");
      navObchod.removeAttribute("rel");
    }
  }

  var payLinks = document.querySelectorAll("a.stripe-btn");
  if (wcMode) {
    for (var i = 0; i < payLinks.length; i++) {
      payLinks[i].classList.add("woo-pay-btn");
    }
  }

  var prod = cfg.woocommerceProdukty || {};
  var rezStripe = cfg.stripeRezervacia || {};

  if (wcMode) {
    var base = cfg.woocommerceZakladnaUrl.trim();
    bindPaymentLink(
      document.getElementById("link-vstupenky"),
      resolveShopUrl(prod.vstupenky, base),
      "WooCommerce: doplňte woocommerceZakladnaUrl a woocommerceProdukty.vstupenky v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-zetony"),
      resolveShopUrl(prod.zetony, base),
      "WooCommerce: doplňte woocommerceProdukty.zetony v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-rez-lukostrelba"),
      resolveShopUrl(prod.lukostrelba, base),
      "WooCommerce: doplňte woocommerceProdukty.lukostrelba v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-rez-serm"),
      resolveShopUrl(prod.serm, base),
      "WooCommerce: doplňte woocommerceProdukty.serm v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-rez-deti"),
      resolveShopUrl(prod.deti, base),
      "WooCommerce: doplňte woocommerceProdukty.deti v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-rez-remeslo"),
      resolveShopUrl(prod.remeslo, base),
      "WooCommerce: doplňte woocommerceProdukty.remeslo v js/config.js."
    );
  } else {
    bindPaymentLink(
      document.getElementById("link-vstupenky"),
      cfg.stripeVstupenky,
      "Nastavte platobný odkaz v js/config.js (stripeVstupenky) alebo zapnite platbyRezim: \"woocommerce\"."
    );
    bindPaymentLink(
      document.getElementById("link-zetony"),
      cfg.stripeZetony,
      "Nastavte stripeZetony v js/config.js alebo použite WooCommerce."
    );
    bindPaymentLink(
      document.getElementById("link-rez-lukostrelba"),
      rezStripe.lukostrelba,
      "Nastavte stripeRezervacia.lukostrelba v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-rez-serm"),
      rezStripe.serm,
      "Nastavte stripeRezervacia.serm v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-rez-deti"),
      rezStripe.deti,
      "Nastavte stripeRezervacia.deti v js/config.js."
    );
    bindPaymentLink(
      document.getElementById("link-rez-remeslo"),
      rezStripe.remeslo,
      "Nastavte stripeRezervacia.remeslo v js/config.js."
    );
  }
})();
