(function () {
  var WEB3_URL = "https://api.web3forms.com/submit";
  var FORMSPREE_BASE = "https://formspree.io/f/";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function showFeedback(el, message, ok) {
    if (!el) return;
    el.hidden = false;
    el.textContent = message;
    el.classList.remove("workshop-form__feedback--ok", "workshop-form__feedback--err");
    el.classList.add(ok ? "workshop-form__feedback--ok" : "workshop-form__feedback--err");
  }

  function formDataToObject(fd) {
    var o = {};
    fd.forEach(function (v, k) {
      if (k === "botcheck" || k === "_gotcha") return;
      if (o[k] !== undefined) {
        o[k] = Array.isArray(o[k]) ? o[k].concat([v]) : [o[k], v];
      } else {
        o[k] = v;
      }
    });
    return o;
  }

  function isSpamHoneypot(fd) {
    var g = fd.get("_gotcha");
    return g != null && String(g).trim() !== "";
  }

  /** Formspree: Project / form ID z dashboardu → https://formspree.io/f/ID */
  function bindFormspree(forms, endpoint, banner) {
    if (banner) banner.hidden = true;
    for (var i = 0; i < forms.length; i++) {
      (function (form) {
        var feedback = form.querySelector(".workshop-form__feedback");
        var submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          if (feedback) {
            feedback.hidden = true;
            feedback.textContent = "";
          }

          var fd = new FormData(form);
          if (isSpamHoneypot(fd)) {
            showFeedback(feedback, "Odoslanie bolo zamietnuté.", false);
            return;
          }

          var origText = submitBtn ? submitBtn.textContent : "";
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Odosielam…";
          }

          fetch(endpoint, {
            method: "POST",
            body: fd,
            headers: { Accept: "application/json" },
          })
            .then(function (res) {
              return res.json().then(
                function (data) {
                  return { res: res, data: data };
                },
                function () {
                  return { res: res, data: {} };
                }
              );
            })
            .then(function (_ref) {
              var res = _ref.res;
              var data = _ref.data || {};
              if (res.ok) {
                showFeedback(feedback, "Ďakujeme — prihláška bola odoslaná.", true);
                form.reset();
              } else {
                var msg =
                  (data && data.error) ||
                  (data.errors && data.errors[0] && data.errors[0].message) ||
                  "Formulár sa nepodarilo odoslať. Skontrolujte doménu (Formspree → Restrict to Domain), endpoint (Integration → form ID) alebo údaje.";
                showFeedback(feedback, msg, false);
              }
            })
            .catch(function () {
              showFeedback(
                feedback,
                "Chyba siete alebo doména nie je povolená. Skúste z GitHub Pages (nie z localhost).",
                false
              );
            })
            .finally(function () {
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
              }
            });
        });
      })(forms[i]);
    }
  }

  function bindWeb3(forms, accessKey, banner) {
    if (banner) banner.hidden = true;
    for (var i = 0; i < forms.length; i++) {
      (function (form) {
        var feedback = form.querySelector(".workshop-form__feedback");
        var submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener("submit", function (e) {
          e.preventDefault();
          if (feedback) {
            feedback.hidden = true;
            feedback.textContent = "";
          }

          var fd = new FormData(form);
          if (isSpamHoneypot(fd)) {
            showFeedback(feedback, "Odoslanie bolo zamietnuté.", false);
            return;
          }

          var payload = formDataToObject(fd);
          payload.access_key = accessKey;
          if (payload._subject && !payload.subject) {
            payload.subject = payload._subject;
            delete payload._subject;
          }
          if (payload.meno && !payload.from_name) {
            payload.from_name = payload.meno;
          }

          var origText = submitBtn ? submitBtn.textContent : "";
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Odosielam…";
          }

          fetch(WEB3_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then(function (res) {
              return res.json().then(function (data) {
                return { res: res, data: data };
              });
            })
            .then(function (_ref) {
              var res = _ref.res;
              var data = _ref.data || {};
              if (res.ok && data.success !== false) {
                showFeedback(
                  feedback,
                  data.message || "Ďakujeme — správa bola odoslaná.",
                  true
                );
                form.reset();
              } else {
                showFeedback(
                  feedback,
                  data.message || "Nepodarilo sa odoslať. Skúste neskôr.",
                  false
                );
              }
            })
            .catch(function () {
              showFeedback(feedback, "Chyba siete. Skúste znova.", false);
            })
            .finally(function () {
              if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
              }
            });
        });
      })(forms[i]);
    }
  }

  function bindClassicAction(forms, actionUrl, banner) {
    if (banner) banner.hidden = true;
    for (var j = 0; j < forms.length; j++) {
      forms[j].setAttribute("action", actionUrl);
      forms[j].setAttribute("method", "post");
    }
  }

  function bindBlocked(forms, banner) {
    if (banner) banner.hidden = false;
    for (var k = 0; k < forms.length; k++) {
      forms[k].addEventListener("submit", function (e) {
        e.preventDefault();
        alert(
          "Formulár nie je pripojený. V js/config.js doplňte formularPrihlaskyWeb3AccessKey (web3forms.com) alebo záložne Formspree / Formspark — pozri žltý návod na stránke."
        );
      });
    }
  }

  ready(function () {
    var cfg = window.FESTIVAL_CONFIG || {};
    var formspreeId = (cfg.formularPrihlaskyFormspreeFormId || "").trim();
    var formspreeUrl = (cfg.formularPrihlaskyUrl || "").trim();
    var web3 = (cfg.formularPrihlaskyWeb3AccessKey || "").trim();
    var formsparkId = (cfg.formularPrihlaskyFormsparkId || "").trim();
    var banner = document.getElementById("prihlasky-config-banner");
    var forms = document.querySelectorAll("form[data-prihlaska-form]");

    if (web3) {
      bindWeb3(forms, web3, banner);
      return;
    }

    if (formspreeId) {
      bindFormspree(forms, FORMSPREE_BASE + encodeURIComponent(formspreeId), banner);
      return;
    }

    if (formspreeUrl && /^https?:\/\//i.test(formspreeUrl)) {
      bindFormspree(forms, formspreeUrl, banner);
      return;
    }

    if (formsparkId) {
      bindClassicAction(
        forms,
        "https://submit-form.com/" + encodeURIComponent(formsparkId),
        banner
      );
      return;
    }

    bindBlocked(forms, banner);
  });
})();
