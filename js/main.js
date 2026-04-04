(function () {
  var cfg = window.FESTIVAL_CONFIG || {};
  var y = cfg.rok || new Date().getFullYear();
  var heroYear = document.getElementById("hero-year");
  var footerYear = document.getElementById("footer-year");
  if (heroYear) heroYear.textContent = String(y);
  if (footerYear) footerYear.textContent = String(y);

  var tickets = document.getElementById("link-vstupenky");
  var tokens = document.getElementById("link-zetony");
  var stripeTickets = cfg.stripeVstupenky || "#";
  var stripeTokens = cfg.stripeZetony || "#";

  if (tickets) {
    tickets.href = stripeTickets;
    if (stripeTickets === "#" || stripeTickets.indexOf("REPLACE_ME") !== -1) {
      tickets.setAttribute("aria-disabled", "true");
      tickets.addEventListener("click", function (e) {
        e.preventDefault();
        alert(
          "Nastavte platobný odkaz Stripe v súbore js/config.js (stripeVstupenky)."
        );
      });
    }
  }
  if (tokens) {
    tokens.href = stripeTokens;
    if (stripeTokens === "#" || stripeTokens.indexOf("REPLACE_ME") !== -1) {
      tokens.setAttribute("aria-disabled", "true");
      tokens.addEventListener("click", function (e) {
        e.preventDefault();
        alert(
          "Nastavte platobný odkaz Stripe v súbore js/config.js (stripeZetony)."
        );
      });
    }
  }
})();
