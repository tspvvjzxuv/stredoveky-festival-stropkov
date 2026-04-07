(function () {
  if (document.body) {
    document.body.classList.add("js-ready");
  }

  var cfg = window.FESTIVAL_CONFIG || {};
  var y = cfg.rok || new Date().getFullYear();
  var heroYear = document.getElementById("hero-year");
  var footerYear = document.getElementById("footer-year");
  if (heroYear) heroYear.textContent = String(y);
  if (footerYear) footerYear.textContent = String(y);

  function initHeaderDynamics() {
    if (!document.body) return;
    var body = document.body;
    var header = document.querySelector(".site-header");
    var nav = document.querySelector(".site-header .nav");
    if (!header || !nav) return;
    var currentShift = 0;
    var targetShift = 0;
    var rafId = 0;

    function computeTargetShift() {
      var y = window.scrollY || 0;
      var maxShift = Math.max(0, nav.offsetTop || 0);
      targetShift = Math.min(y, maxShift);
      body.classList.toggle("header-compact", targetShift >= maxShift && maxShift > 0);
    }

    function animateShift() {
      var delta = targetShift - currentShift;
      if (Math.abs(delta) < 0.1) {
        currentShift = targetShift;
      } else {
        // Smooth follow (higher factor = snappier).
        currentShift += delta * 0.2;
      }
      body.style.setProperty("--header-shift", currentShift.toFixed(2) + "px");
      if (Math.abs(targetShift - currentShift) > 0.1) {
        rafId = window.requestAnimationFrame(animateShift);
      } else {
        rafId = 0;
      }
    }

    function requestAnimation() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(animateShift);
    }

    function onScrollOrResize() {
      computeTargetShift();
      requestAnimation();
    }

    computeTargetShift();
    body.style.setProperty("--header-shift", targetShift.toFixed(2) + "px");
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
  }

  function initEmblemIntro() {
    if (!document.body) return;
    var body = document.body;
    var intro = document.querySelector(".emblem-intro");
    body.classList.add("intro-done");
    if (intro) intro.remove();
  }

  initHeaderDynamics();
  initEmblemIntro();

  // Book-intro sound layer removed in unified design pass.

  function initSectionReveal() {
    var sections = document.querySelectorAll("main section");
    if (!sections.length) return;

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      for (var j = 0; j < sections.length; j++) {
        sections[j].classList.add("is-visible");
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("is-visible");
            observer.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    for (var k = 0; k < sections.length; k++) {
      observer.observe(sections[k]);
    }
  }

  initSectionReveal();

  // Book-style page transition effect removed in unified design pass.

  var hero = document.querySelector(".hero");
  var videoUrl = cfg.bannerVideoUrl && String(cfg.bannerVideoUrl).trim();
  var heroVideo = document.getElementById("hero-video");

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (hero && videoUrl && heroVideo && !reduceMotion) {
    hero.classList.add("hero--has-video");
    while (heroVideo.firstChild) {
      heroVideo.removeChild(heroVideo.firstChild);
    }
    var srcEl = document.createElement("source");
    srcEl.src = videoUrl.replace(/"/g, "");
    srcEl.type = "video/mp4";
    heroVideo.appendChild(srcEl);
    if (cfg.bannerVideoPoster && String(cfg.bannerVideoPoster).trim()) {
      heroVideo.poster = String(cfg.bannerVideoPoster).trim().replace(/"/g, "");
    }
    heroVideo.load();
    var playTry = heroVideo.play();
    if (playTry && typeof playTry.catch === "function") {
      playTry.catch(function () {});
    }
  } else if (hero && cfg.bannerObrazok && String(cfg.bannerObrazok).trim()) {
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
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-disabled-link");
      el.addEventListener("click", function (e) {
        e.preventDefault();
        // Non-blocking hint instead of alert popup.
        if (!document.body) return;
        var existing = document.querySelector(".site-inline-notice");
        if (existing) {
          existing.textContent = hint;
          return;
        }
        var note = document.createElement("div");
        note.className = "site-inline-notice";
        note.textContent = hint;
        document.body.appendChild(note);
        window.setTimeout(function () {
          if (note && note.parentNode) note.parentNode.removeChild(note);
        }, 5200);
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

  var payLinks = document.querySelectorAll(
    "#vstupenky-rezervacie a.stripe-btn"
  );
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

  var CONSENT_KEY = "festival_cookie_consent_v1";
  var analyticsLoaded = false;

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {}
  }

  function loadGaIfAllowed() {
    var gaId = cfg.ga4MeasurementId && String(cfg.ga4MeasurementId).trim();
    if (!gaId || analyticsLoaded || getConsent() !== "accepted") return false;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { anonymize_ip: true });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId);
    document.head.appendChild(script);
    return true;
  }

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  }

  function initCookieBanner() {
    if (!document.body) return;
    if (getConsent()) {
      loadGaIfAllowed();
      return;
    }
    var banner = document.createElement("aside");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML =
      '<p class="cookie-banner__text">Používame nevyhnutné cookies a (po súhlase) analytiku pre meranie návštevnosti.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn btn-outline cookie-banner__btn" data-cookie-action="decline">Len nevyhnutné</button>' +
      '<button type="button" class="btn btn-primary cookie-banner__btn" data-cookie-action="accept">Súhlasím</button>' +
      '<a class="cookie-banner__link" href="cookies.html">Viac info</a>' +
      "</div>";
    document.body.appendChild(banner);
    banner.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("[data-cookie-action]") : null;
      if (!btn) return;
      var action = btn.getAttribute("data-cookie-action");
      setConsent(action === "accept" ? "accepted" : "declined");
      if (action === "accept") loadGaIfAllowed();
      banner.remove();
    });
  }

  function initAnalyticsTracking() {
    loadGaIfAllowed();
    document.addEventListener("click", function (e) {
      var link = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!link) return;
      var href = link.getAttribute("href") || "";
      var txt = (link.textContent || "").trim();
      if (link.id === "link-vstupenky" || href.indexOf("#vstupenky-rezervacie") !== -1 || txt.indexOf("Vstupenky") !== -1) {
        trackEvent("select_content", { content_type: "cta", content_id: "vstupenky" });
      }
      if (href.indexOf("prihlasky.html") !== -1 || txt.indexOf("Prihlášky") !== -1) {
        trackEvent("select_content", { content_type: "cta", content_id: "prihlasky" });
      }
      if (href.indexOf("instagram.com") !== -1) {
        trackEvent("click_social", { platform: "instagram" });
      }
      if (href.indexOf("facebook.com") !== -1) {
        trackEvent("click_social", { platform: "facebook" });
      }
    });
  }

  initCookieBanner();
  initAnalyticsTracking();
})();
