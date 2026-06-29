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

  /** Erb + header — RAF synced to display (60/120/144 Hz), frame-rate independent smoothing */
  function initHeaderDynamics() {
    if (!document.body) return;
    var body = document.body;
    var header = document.querySelector(".site-header");
    var nav = document.querySelector(".site-header .nav");
    if (!header || !nav) return;
    var isHome = body.classList.contains("home-page");
    var emblemSlot = document.querySelector(".site-header .header-brand-slot");
    var emblemIcon = document.querySelector(
      ".site-header .header-brand-slot__icon"
    );
    var cachedMaxShift = 0;

    var emblemHideStart = 0;
    var emblemHideEnd = 120;
    var targetShift = 0;
    var currentShift = 0;
    var rafId = 0;
    var lastFrameTime = 0;
    /** 0 = 1:1 so scroll; RAF keeps updates on every display frame (60/120/144 Hz) */
    var shiftSmoothingSec = 0;

    function measureLayout() {
      body.style.setProperty("--emblem-hide", "0");
      body.style.setProperty("--emblem-scale", "1");
      body.style.setProperty("--header-progress", "0");
      body.classList.remove("header-hide-emblem");
      cachedMaxShift = Math.max(0, nav.offsetTop || 0);
    }

    function smoothstep(t) {
      return t * t * (3 - 2 * t);
    }

    function paintEmblemMotion(eased) {
      if (!emblemSlot) return;
      var hide = Math.min(1, Math.max(0, eased));
      var scale = 1 - hide * 0.88;
      var y = -36 * hide;
      var blur = 6 * hide;
      var bright = 1 - hide * 0.28;
      body.style.setProperty("--emblem-hide", hide.toFixed(4));
      body.style.setProperty("--emblem-scale", scale.toFixed(4));
      emblemSlot.style.setProperty("opacity", (1 - hide).toFixed(4), "important");
      emblemSlot.style.setProperty(
        "transform",
        "translate3d(0," +
          y.toFixed(2) +
          "px,0) scale3d(" +
          scale.toFixed(4) +
          "," +
          scale.toFixed(4) +
          ",1)",
        "important"
      );
      emblemSlot.style.setProperty(
        "filter",
        "blur(" + blur.toFixed(2) + "px) brightness(" + bright.toFixed(3) + ")",
        "important"
      );
      body.classList.toggle("header-hide-emblem", hide >= 0.995);
    }

    function setEmblemHide(scrollY) {
      if (reducedMotion) {
        var hidden = scrollY > emblemHideEnd;
        paintEmblemMotion(hidden ? 1 : 0);
        return;
      }
      var range = emblemHideEnd - emblemHideStart;
      var progress =
        range > 0
          ? Math.min(1, Math.max(0, (scrollY - emblemHideStart) / range))
          : scrollY > emblemHideEnd
            ? 1
            : 0;
      paintEmblemMotion(smoothstep(progress));
    }

    function updateTargets(scrollY) {
      setEmblemHide(scrollY);
      targetShift = Math.min(scrollY, cachedMaxShift);
      var headerProgress =
        cachedMaxShift > 0 ? Math.min(1, targetShift / cachedMaxShift) : 0;
      body.style.setProperty("--header-progress", headerProgress.toFixed(4));
      body.classList.toggle(
        "header-compact",
        cachedMaxShift > 0 && headerProgress >= 0.995
      );
    }

    function paintShift() {
      body.style.setProperty("--header-shift", currentShift.toFixed(3) + "px");
    }

    function tick(now) {
      if (!lastFrameTime) lastFrameTime = now;
      var dt = Math.min(32, now - lastFrameTime) / 1000;
      lastFrameTime = now;

      var scrollY = window.scrollY || 0;
      updateTargets(scrollY);

      if (!shiftSmoothingSec) {
        currentShift = targetShift;
      } else {
        var alpha = 1 - Math.exp(-dt / shiftSmoothingSec);
        currentShift += (targetShift - currentShift) * alpha;
        if (Math.abs(targetShift - currentShift) < 0.02) {
          currentShift = targetShift;
        }
      }
      paintShift();

      if (isHome) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      if (Math.abs(targetShift - currentShift) > 0.02) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    }

    function startLoop() {
      if (rafId) return;
      lastFrameTime = 0;
      rafId = window.requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = 0;
      lastFrameTime = 0;
    }

    function syncImmediate() {
      var scrollY = window.scrollY || 0;
      updateTargets(scrollY);
      currentShift = targetShift;
      paintShift();
    }

    function onScrollOrResize() {
      if (isHome) {
        if (!rafId) startLoop();
        return;
      }
      syncImmediate();
      if (Math.abs(targetShift - currentShift) > 0.02) startLoop();
    }

    function finishEmblemIntro() {
      if (body.classList.contains("emblem-intro-done")) return;
      body.classList.remove("emblem-intro-active");
      if (emblemIcon) emblemIcon.classList.remove("emblem-intro-run");
      body.classList.add("emblem-intro-done");
    }

    function startEmblemIntro() {
      if (!isHome || !emblemIcon || reducedMotion) {
        finishEmblemIntro();
        return;
      }
      body.classList.add("emblem-intro-active");
      emblemIcon.addEventListener(
        "animationend",
        function (e) {
          if (e.animationName === "emblemLogoIntro") finishEmblemIntro();
        },
        { once: true }
      );
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          emblemIcon.classList.add("emblem-intro-run");
        });
      });
      window.setTimeout(finishEmblemIntro, 2200);
    }

    if (isHome && emblemSlot) {
      body.classList.add("emblem-motion-js");
    }

    measureLayout();
    syncImmediate();
    if (isHome) {
      startEmblemIntro();
      startLoop();
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener(
      "resize",
      function () {
        measureLayout();
        syncImmediate();
        if (isHome && !rafId) startLoop();
      },
      { passive: true }
    );
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopLoop();
        return;
      }
      syncImmediate();
      if (isHome) startLoop();
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        measureLayout();
        syncImmediate();
        if (isHome && !rafId) startLoop();
      });
    }
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

    var sachSection = document.getElementById("sachove-hlavolamy");
    if (sachSection) sachSection.classList.add("is-visible");

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var isDesktop =
      window.matchMedia &&
      window.matchMedia("(min-width: 769px) and (hover: hover) and (pointer: fine)")
        .matches;

    // Desktop: celá stránka naraz (bez postupného „domaľovania“ pri scrolli).
    if (reducedMotion || !("IntersectionObserver" in window) || isDesktop) {
      for (var j = 0; j < sections.length; j++) {
        sections[j].classList.add("is-visible");
      }
      return;
    }

    // Mobile / dotyk: väčšie okno pred renderom, aby pri rýchlom scrolli neostávali sekcie skryté.
    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("is-visible");
            observer.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.01, rootMargin: "160px 0px 55% 0px" }
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

  var prod = cfg.woocommerceProdukty || {};

  function formatIbanDisplay(iban) {
    return String(iban || "")
      .replace(/\s+/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function initBankovyDar() {
    var bankCfg = cfg.bankovyDar || {};
    var iban = String(bankCfg.iban || "").replace(/\s+/g, "").trim();
    if (!iban) return;

    var block = document.getElementById("bankovy-dar");
    if (!block) return;

    var prijemca = String(bankCfg.prijemca || "").trim();
    var banka = String(bankCfg.banka || "").trim();
    var vs = String(bankCfg.variabilnySymbol || "").trim();
    var sprava = String(bankCfg.sprava || "").trim();

    var prijemcaEl = document.getElementById("bank-dar-prijemca");
    var ibanEl = document.getElementById("bank-dar-iban");
    if (prijemcaEl) prijemcaEl.textContent = prijemca || "Sofia Klebanova";
    if (ibanEl) ibanEl.textContent = formatIbanDisplay(iban);

    if (banka) {
      var bankaRow = document.getElementById("bank-dar-banka-row");
      var bankaEl = document.getElementById("bank-dar-banka");
      if (bankaRow) bankaRow.hidden = false;
      if (bankaEl) bankaEl.textContent = banka;
    }

    if (vs) {
      var vsRow = document.getElementById("bank-dar-vs-row");
      var vsEl = document.getElementById("bank-dar-vs");
      if (vsRow) vsRow.hidden = false;
      if (vsEl) vsEl.textContent = vs;
    }

    if (sprava) {
      var spravaRow = document.getElementById("bank-dar-sprava-row");
      var spravaEl = document.getElementById("bank-dar-sprava");
      if (spravaRow) spravaRow.hidden = false;
      if (spravaEl) spravaEl.textContent = sprava;
    }

    block.hidden = false;

    if (window.BankovyDarQr && typeof window.BankovyDarQr.init === "function") {
      window.BankovyDarQr.init();
    }

    var copyBtn = document.getElementById("bank-dar-copy-iban");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var plainIban = iban;
        function showCopied() {
          copyBtn.textContent = "Skopírované";
          window.setTimeout(function () {
            copyBtn.textContent = "Kopírovať IBAN";
          }, 2200);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(plainIban).then(showCopied).catch(function () {
            window.prompt("Skopírujte IBAN:", plainIban);
          });
          return;
        }
        window.prompt("Skopírujte IBAN:", plainIban);
      });
    }
  }

  initBankovyDar();

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
