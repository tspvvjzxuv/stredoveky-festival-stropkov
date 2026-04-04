/**
 * Cloudflare Worker: overenie kupónov (KV) + CORS pre GitHub Pages
 *
 * NASADENIE (stručne):
 * 1. Cloudflare Dashboard → Workers & Pages → Create → Worker, vložte tento kód.
 * 2. Vytvorte KV namespace (Storage → KV), pripojte binding menom COUPONS.
 * 3. Settings → Variables:
 *    - GATE_SECRET     = dlhý náhodný reťazec (rovnaký zadáte na overenie.html)
 *    - ADMIN_SECRET    = iný náhodný reťazec (iba na import kódov)
 *    - ALLOWED_ORIGINS = https://mircoft.github.io,https://vlastna-domena.sk
 *      (presná adresa, kde beží overenie.html — bez lomky na konci)
 *
 * IMPORT KÓDOV (curl), po nasadení nahraďte HOST a ADMIN_SECRET:
 *
 *   curl -s -X POST "https://HOST/admin/import" \
 *     -H "Content-Type: application/json" \
 *     -H "X-Admin-Secret: ADMIN_SECRET" \
 *     -d '{"codes":["ABC123","DEF456"]}'
 *
 * Kódy môžete vygenerovať po platbe (manuálne z exportu) alebo neskôr napojiť
 * Stripe webhook na tento Worker (vtedy už potrebujete logiku v tomto súbore).
 */

function normalizeCode(raw) {
  if (!raw || typeof raw !== "string") return "";
  return raw
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9-]/g, "");
}

function parseAllowedOrigins(env) {
  var raw = env.ALLOWED_ORIGINS || "";
  return raw
    .split(",")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
}

function corsHeaders(request, env) {
  var origin = request.headers.get("Origin") || "";
  var allowed = parseAllowedOrigins(env);
  var headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Secret",
    "Access-Control-Max-Age": "86400",
  };
  if (allowed.length === 0) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowed.indexOf(origin) !== -1) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(data, status, extra) {
  var h = Object.assign({ "Content-Type": "application/json" }, extra || {});
  return new Response(JSON.stringify(data), { status: status || 200, headers: h });
}

async function handleVerify(request, env) {
  var auth = request.headers.get("Authorization") || "";
  var token = auth.indexOf("Bearer ") === 0 ? auth.slice(7) : "";
  if (!token || token !== env.GATE_SECRET) {
    return json({ error: "unauthorized" }, 401);
  }

  var body;
  try {
    body = await request.json();
  } catch (_) {
    return json({ error: "invalid_json" }, 400);
  }

  var code = normalizeCode(body.code);
  if (!code || code.length < 4) {
    return json({ error: "bad_code" }, 400);
  }

  var consume = body.consume !== false;

  var raw = await env.COUPONS.get(code);
  if (!raw) {
    return json({ valid: false, reason: "not_found" });
  }

  var row;
  try {
    row = JSON.parse(raw);
  } catch (_) {
    return json({ error: "corrupt_kv" }, 500);
  }

  if (row.s === "used") {
    return json({ valid: true, alreadyUsed: true, at: row.at || null });
  }

  if (row.s !== "active") {
    return json({ valid: false, reason: "invalid_state" });
  }

  if (!consume) {
    return json({ valid: true, preview: true, consumed: false });
  }

  await env.COUPONS.put(
    code,
    JSON.stringify({ s: "used", at: Date.now() })
  );
  return json({ valid: true, consumed: true });
}

async function handleImport(request, env) {
  if (request.headers.get("X-Admin-Secret") !== env.ADMIN_SECRET) {
    return json({ error: "unauthorized" }, 401);
  }

  var body;
  try {
    body = await request.json();
  } catch (_) {
    return json({ error: "invalid_json" }, 400);
  }

  var codes = body.codes;
  if (!Array.isArray(codes)) {
    return json({ error: "codes_array_required" }, 400);
  }

  var n = 0;
  for (var i = 0; i < codes.length; i++) {
    var c = normalizeCode(String(codes[i]));
    if (c.length >= 4) {
      await env.COUPONS.put(c, JSON.stringify({ s: "active" }));
      n++;
    }
  }
  return json({ imported: n });
}

export default {
  async fetch(request, env) {
    var c = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: c });
    }

    var url = new URL(request.url);
    var path = url.pathname;

    if (path === "/verify" && request.method === "POST") {
      var out = await handleVerify(request, env);
      var h = new Headers(out.headers);
      Object.keys(c).forEach(function (k) {
        h.set(k, c[k]);
      });
      return new Response(out.body, { status: out.status, headers: h });
    }

    if (path === "/admin/import" && request.method === "POST") {
      var outI = await handleImport(request, env);
      var hi = new Headers(outI.headers);
      Object.keys(c).forEach(function (k) {
        hi.set(k, c[k]);
      });
      return new Response(outI.body, { status: outI.status, headers: hi });
    }

    if (path === "/" || path === "") {
      return json(
        { ok: true, service: "festival-coupon-verify" },
        200,
        c
      );
    }

    return json({ error: "not_found" }, 404, c);
  },
};
