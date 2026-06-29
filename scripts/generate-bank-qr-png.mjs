import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import QRCode from "qrcode";
import { CurrencyCode, encode, PaymentOptions } from "../js/vendor/bysquare/lib/pay/index.js";
import { Version } from "../js/vendor/bysquare/lib/types.js";

var root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadBankCfg() {
  var src = readFileSync(join(root, "js", "config.js"), "utf8");
  var script = src.replace("window.FESTIVAL_CONFIG =", "var FESTIVAL_CONFIG =");
  var sandbox = {};
  vm.runInContext(script + "\nthis.FESTIVAL_CONFIG = FESTIVAL_CONFIG;", vm.createContext(sandbox));
  return sandbox.FESTIVAL_CONFIG.bankovyDar || {};
}

function buildPayload(bankCfg) {
  var iban = String(bankCfg.iban || "").replace(/\s+/g, "").trim().toUpperCase();
  if (!iban) throw new Error("Chýba bankovyDar.iban v js/config.js");

  var payment = {
    type: PaymentOptions.PaymentOrder,
    currencyCode: CurrencyCode.EUR,
    beneficiary: { name: String(bankCfg.prijemca || "").trim() },
    bankAccounts: [{ iban: iban }],
  };

  var sprava = String(bankCfg.sprava || "").trim();
  if (sprava) payment.paymentNote = sprava;

  var vs = String(bankCfg.variabilnySymbol || "").trim();
  if (vs) payment.variableSymbol = vs;

  var suma = Number(bankCfg.suma);
  if (Number.isFinite(suma) && suma > 0) {
    payment.amount = Math.round(suma * 100) / 100;
  }

  var verKey = String(bankCfg.payBySquareVerzia || "1.0.0").trim();
  var version = Version[verKey] ?? Version["1.0.0"];

  return encode(
    { payments: [payment] },
    { version: version, validate: true, deburr: true }
  );
}

var bankCfg = loadBankCfg();
var payload = buildPayload(bankCfg);
var outDir = join(root, "images");
mkdirSync(outDir, { recursive: true });
var outFile = join(outDir, "bank-dar-qr.png");

await QRCode.toFile(outFile, payload, {
  errorCorrectionLevel: "M",
  margin: 2,
  width: 300,
  type: "png",
});

console.log("Pay by Square PNG OK → images/bank-dar-qr.png");
console.log("Verzia:", bankCfg.payBySquareVerzia || "1.0.0", "| začiatok:", payload.slice(0, 12));
