(function () {
  if (document.body) {
    document.body.classList.add("js-ready");
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  var reducedMotion = prefersReducedMotion();
  if (reducedMotion && document.body) {
    document.body.classList.add("reduced-motion");
  }

  var cfg = window.FESTIVAL_CONFIG || {};
  var y = cfg.rok || new Date().getFullYear();
  var heroYear = document.getElementById("hero-year");
  var footerYear = document.getElementById("footer-year");
  if (heroYear) heroYear.textContent = String(y);
  if (footerYear) footerYear.textContent = String(y);

  /** Plynulé skrytie erbu pri scrolli (--emblem-hide 0→1, ako na začiatku dňa) */
  function initHeaderDynamics() {
    if (!document.body) return;
    var body = document.body;
    var emblemHideStart = 0;
    var emblemHideEnd = 64;
    var scrollTicking = false;

    function applyEmblemScroll(scrollY) {
      if (reducedMotion) {
        var hidden = scrollY > emblemHideEnd;
        body.style.setProperty("--emblem-hide", hidden ? "1" : "0");
        body.classList.toggle("header-hide-emblem", hidden);
        body.classList.toggle("header-compact", hidden);
        return;
      }
      var range = emblemHideEnd - emblemHideStart;
      var progress =
        range > 0
          ? Math.min(1, Math.max(0, (scrollY - emblemHideStart) / range))
          : scrollY > emblemHideEnd
            ? 1
            : 0;
      body.style.setProperty("--emblem-hide", progress.toFixed(3));
      var hidden = progress >= 0.995;
      body.classList.toggle("header-hide-emblem", hidden);
      body.classList.toggle("header-compact", hidden);
    }

    function onScrollOrResize() {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(function () {
          scrollTicking = false;
          applyEmblemScroll(window.scrollY || 0);
        });
      }
    }

    applyEmblemScroll(window.scrollY || 0);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
  }

  initHeaderDynamics();

  function initNavTrackScroll() {
    var track = document.querySelector(".site-header .nav-track");
    if (!track) return;
    track.scrollLeft = 0;
    window.addEventListener(
      "resize",
      function () {
        if (window.matchMedia("(max-width: 860px)").matches) {
          track.scrollLeft = 0;
        }
      },
      { passive: true }
    );
  }

  initNavTrackScroll();

  function initMapZoom() {
    var dialog = document.getElementById("mapa-zoom-dialog");
    var openBtn = document.querySelector("[data-map-zoom-open]");
    var closeBtn = document.querySelector("[data-map-zoom-close]");
    if (!dialog || !openBtn) return;

    function openDialog() {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }

    function closeDialog() {
      if (dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }

    openBtn.addEventListener("click", openDialog);
    if (closeBtn) {
      closeBtn.addEventListener("click", closeDialog);
    }
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });
    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeDialog();
    });
  }

  initMapZoom();

  // Book-intro sound layer removed in unified design pass.

  function initSectionReveal() {
    var sections = document.querySelectorAll("main section");
    if (!sections.length) return;

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
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

  var heroVideoFallback =
    "https://assets.mixkit.co/videos/13029/13029-720.mp4";

  function tryPlayHeroVideo() {
    if (!heroVideo) return;
    var playTry = heroVideo.play();
    if (playTry && typeof playTry.catch === "function") {
      playTry.catch(function () {});
    }
  }

  var heroVideoReady = false;

  function markHeroVideoReady() {
    if (!hero || !heroVideo) return;
    hero.classList.add("hero--has-video", "is-video-ready", "is-video-playing");
    heroVideo.style.opacity = "1";
    if (!heroVideoReady) {
      heroVideoReady = true;
      tryPlayHeroVideo();
    }
  }

  function setHeroVideoSrc(url) {
    if (!heroVideo || !url) return;
    var clean = String(url).trim().replace(/"/g, "");
    if (heroVideo.getAttribute("src") !== clean) {
      heroVideo.src = clean;
    }
  }

  if (hero && videoUrl && heroVideo) {
    var videoSrc = videoUrl.replace(/"/g, "");
    var posterSrc =
      cfg.bannerVideoPoster && String(cfg.bannerVideoPoster).trim()
        ? String(cfg.bannerVideoPoster).trim().replace(/"/g, "")
        : "images/hero-poster.webp";
    var triedFallback = false;

    hero.classList.add("hero--has-video", "is-video-ready");
    heroVideo.style.opacity = "1";
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "");
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.setAttribute("autoplay", "");
    heroVideo.poster = posterSrc;
    setHeroVideoSrc(videoSrc);

    heroVideo.addEventListener("loadeddata", markHeroVideoReady);
    heroVideo.addEventListener("canplay", markHeroVideoReady);
    heroVideo.addEventListener("playing", markHeroVideoReady);
    heroVideo.addEventListener("error", function () {
      if (!triedFallback) {
        triedFallback = true;
        setHeroVideoSrc(heroVideoFallback);
        heroVideo.load();
        tryPlayHeroVideo();
        return;
      }
      markHeroVideoReady();
    });

    heroVideo.load();
    markHeroVideoReady();
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        tryPlayHeroVideo();
      }
    });
    window.addEventListener("pageshow", tryPlayHeroVideo);
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
  } else {
    bindPaymentLink(
      document.getElementById("link-vstupenky"),
      cfg.stripeVstupenky,
      "Nastavte platobný odkaz v js/config.js (stripeVstupenky) alebo zapnite platbyRezim: \"woocommerce\"."
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
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-labelledby", "cookie-banner-label");
    banner.innerHTML =
      '<p id="cookie-banner-label" class="cookie-banner__text">Používame nevyhnutné cookies a (po súhlase) analytiku pre meranie návštevnosti.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="btn btn-outline cookie-banner__btn" data-cookie-action="decline">Len nevyhnutné</button>' +
      '<button type="button" class="btn btn-primary cookie-banner__btn" data-cookie-action="accept">Súhlasím</button>' +
      '<a class="cookie-banner__link" href="cookies.html">Viac info</a>' +
      "</div>";
    document.body.appendChild(banner);
    var firstBtn = banner.querySelector("button");
    if (firstBtn) firstBtn.focus();
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
