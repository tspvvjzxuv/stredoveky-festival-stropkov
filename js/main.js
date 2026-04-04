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

  function bindStripeLink(el, url, hint) {
    if (!el) return;
    var u = url || "#";
    el.href = u;
    if (u === "#" || String(u).indexOf("REPLACE_ME") !== -1) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        alert(hint);
      });
    }
  }

  bindStripeLink(
    document.getElementById("link-vstupenky"),
    cfg.stripeVstupenky,
    "Nastavte platobný odkaz Stripe v js/config.js (stripeVstupenky)."
  );
  bindStripeLink(
    document.getElementById("link-zetony"),
    cfg.stripeZetony,
    "Nastavte platobný odkaz Stripe v js/config.js (stripeZetony)."
  );

  var rez = cfg.stripeRezervacia || {};
  var rezBindings = [
    { id: "link-rez-lukostrelba", key: "lukostrelba" },
    { id: "link-rez-serm", key: "serm" },
    { id: "link-rez-deti", key: "deti" },
    { id: "link-rez-remeslo", key: "remeslo" },
  ];
  for (var i = 0; i < rezBindings.length; i++) {
    var b = rezBindings[i];
    bindStripeLink(
      document.getElementById(b.id),
      rez[b.key],
      "Nastavte Stripe odkaz v js/config.js → stripeRezervacia." + b.key
    );
  }
})();
