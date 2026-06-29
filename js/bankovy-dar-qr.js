import { CurrencyCode, encode, PaymentOptions } from "bysquare/pay";
import { QRCode } from "@lostinbrittany/qr-esm";
function getBankCfg() {
  return (window.FESTIVAL_CONFIG && window.FESTIVAL_CONFIG.bankovyDar) || {};
}

function normalizeIban(iban) {
  return String(iban || "").replace(/\s+/g, "").trim().toUpperCase();
}

function buildPayBySquarePayload(amount) {
  var bankCfg = getBankCfg();
  var iban = normalizeIban(bankCfg.iban);
  if (!iban) return null;

  var payment = {
    type: PaymentOptions.PaymentOrder,
    currencyCode: CurrencyCode.EUR,
    beneficiary: { name: String(bankCfg.prijemca || "PTRA").trim() },
    bankAccounts: [{ iban: iban }],
  };

  var sprava = String(bankCfg.sprava || "").trim();
  if (sprava) payment.paymentNote = sprava;

  var vs = String(bankCfg.variabilnySymbol || "").trim();
  if (vs) payment.variableSymbol = vs;

  if (typeof amount === "number" && amount > 0) {
    payment.amount = Math.round(amount * 100) / 100;
  }

  return encode({ payments: [payment] });
}

function renderQr(payload) {
  var target = document.getElementById("bank-dar-qr");
  if (!target) return;
  target.replaceChildren();
  target.appendChild(
    QRCode.generateSVG(payload, {
      ecclevel: "M",
      padding: 2,
    })
  );
}

function readAmountInput() {
  var input = document.getElementById("bank-dar-amount");
  if (!input || !input.value) return undefined;
  var raw = parseFloat(String(input.value).replace(",", "."));
  if (!Number.isFinite(raw) || raw <= 0) return undefined;
  return raw;
}

function updateQr() {
  try {
    var payload = buildPayBySquarePayload(readAmountInput());
    if (payload) renderQr(payload);
  } catch (err) {
    console.error("Pay by Square QR:", err);
  }
}

function initBankovyDarQr() {
  if (!normalizeIban(getBankCfg().iban)) return;

  var wrap = document.getElementById("bank-dar-qr-wrap");
  if (wrap) wrap.hidden = false;

  var amountInput = document.getElementById("bank-dar-amount");
  if (amountInput) {
    amountInput.addEventListener("input", updateQr);
    amountInput.addEventListener("change", updateQr);
  }

  updateQr();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBankovyDarQr);
} else {
  initBankovyDarQr();
}
