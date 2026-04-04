(function () {
  var cfg = window.FESTIVAL_CONFIG || {};
  var form = document.getElementById("verify-form");
  var resultEl = document.getElementById("verify-result");
  var apiInput = document.getElementById("api-base");
  var btn = document.getElementById("btn-verify");

  if (apiInput && cfg.overenieApiUrl) {
    apiInput.value = cfg.overenieApiUrl.replace(/\/$/, "");
  }

  function showResult(kind, text) {
    if (!resultEl) return;
    resultEl.className =
      "verify-result is-visible " +
      (kind === "ok" ? "ok" : kind === "warn" ? "warn" : "err");
    resultEl.textContent = text;
  }

  function hideResult() {
    if (!resultEl) return;
    resultEl.className = "verify-result";
    resultEl.textContent = "";
  }

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideResult();

    var base = (apiInput && apiInput.value.trim().replace(/\/$/, "")) || "";
    var secret =
      document.getElementById("gate-secret") &&
      document.getElementById("gate-secret").value;
    var code =
      document.getElementById("coupon-code") &&
      document.getElementById("coupon-code").value;
    var dry =
      document.getElementById("dry-run") &&
      document.getElementById("dry-run").checked;

    if (!base || !secret || !code) {
      showResult("err", "Vyplňte URL API, kľúč a kód.");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Overujem…";
    }

    try {
      var res = await fetch(base + "/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + secret,
        },
        body: JSON.stringify({
          code: code,
          consume: !dry,
        }),
      });

      var data = null;
      try {
        data = await res.json();
      } catch (_) {
        showResult(
          "err",
          "Neplatná odpoveď servera. Skontrolujte URL a CORS (ALLOWED_ORIGINS vo Workeri)."
        );
        return;
      }

      if (res.status === 401) {
        showResult("err", "Nesprávny kľúč pre vstup alebo API.");
        return;
      }

      if (!res.ok) {
        showResult(
          "err",
          (data && data.error) || "Chyba servera (" + res.status + ")."
        );
        return;
      }

      if (data.valid === false && data.reason === "not_found") {
        showResult("err", "Kód sa nenašiel — pravdepodobne neplatná vstupenka.");
        return;
      }

      if (data.valid === true && data.alreadyUsed) {
        showResult(
          "warn",
          "Kód je platný, ale už bol použitý" +
            (data.at ? " (" + new Date(data.at).toLocaleString("sk-SK") + ")" : "") +
            "."
        );
        return;
      }

      if (data.valid === true && data.consumed) {
        showResult("ok", "V poriadku — vstup povolený. Kód bol označený ako použitý.");
        var codeInput = document.getElementById("coupon-code");
        if (codeInput) codeInput.value = "";
        return;
      }

      if (data.valid === true && data.preview) {
        showResult("ok", "Kód je platný (skúšobný režim — nebolo označené ako použité).");
        return;
      }

      showResult("err", "Neočakávaná odpoveď. Skúste znova.");
    } catch (err) {
      showResult(
        "err",
        "Sieťová chyba alebo CORS. Je Worker nasadený a ALLOWED_ORIGINS obsahuje adresu tejto stránky?"
      );
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Overiť a označiť ako použité";
      }
    }
  });
})();
