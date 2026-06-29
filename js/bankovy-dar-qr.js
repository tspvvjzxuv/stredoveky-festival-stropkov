import { CurrencyCode, encode, PaymentOptions } from "./vendor/bysquare/lib/pay/index.js";
import { QRCode } from "@lostinbrittany/qr-esm";

function getBankCfg() {
  return (window.FESTIVAL_CONFIG && window.FESTIVAL_CONFIG.bankovyDar) || {};
}

function normalizeIban(iban) {
  return String(iban || "").replace(/\s+/g, "").trim().toUpperCase();
}

function buildPayBySquarePayload() {
  var bankCfg = getBankCfg();
  var iban = normalizeIban(bankCfg.iban);
  if (!iban) return null;

  var bankAccount = { iban: iban };
  var bic = String(bankCfg.bic || "").replace(/\s+/g, "").trim().toUpperCase();
  if (bic) bankAccount.bic = bic;

  var payment = {
    type: PaymentOptions.PaymentOrder,
    currencyCode: CurrencyCode.EUR,
    beneficiary: { name: String(bankCfg.prijemca || "Sofia Klebanova").trim() },
    bankAccounts: [bankAccount],
  };

  var sprava = String(bankCfg.sprava || "").trim();
  if (sprava) payment.paymentNote = sprava;

  var vs = String(bankCfg.variabilnySymbol || "").trim();
  if (vs) payment.variableSymbol = vs;

  var suma = Number(bankCfg.suma);
  if (Number.isFinite(suma) && suma > 0) {
    payment.amount = Math.round(suma * 100) / 100;
  }

  return encode({ payments: [payment] });
}

function showQrError(target, message) {
  if (!target) return;
  target.replaceChildren();
  var note = document.createElement("p");
  note.className = "bank-dar__qr-error";
  note.textContent = message;
  target.appendChild(note);
}

function renderQr(payload) {
  var target = document.getElementById("bank-dar-qr");
  if (!target) return;
  target.replaceChildren();

  var url = QRCode.generatePNG(payload, {
    ecclevel: "M",
    margin: 4,
    modulesize: 8,
  });

  var img = document.createElement("img");
  img.src = url;
  img.alt = "QR kód Pay by Square pre príspevok";
  img.width = 220;
  img.height = 220;
  img.decoding = "async";
  img.className = "bank-dar__qr-image";
  target.appendChild(img);
}

function updateQr() {
  var target = document.getElementById("bank-dar-qr");
  try {
    var payload = buildPayBySquarePayload();
    if (!payload) {
      showQrError(target, "Chýba IBAN v nastavení.");
      return;
    }
    renderQr(payload);
  } catch (err) {
    console.error("Pay by Square QR:", err);
    showQrError(target, "QR kód sa nepodarilo vygenerovať.");
  }
}

function initBankovyDarQr() {
  if (!normalizeIban(getBankCfg().iban)) return;

  var wrap = document.getElementById("bank-dar-qr-wrap");
  if (wrap) wrap.hidden = false;

  updateQr();
}

window.BankovyDarQr = { init: initBankovyDarQr };
