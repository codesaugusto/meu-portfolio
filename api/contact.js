// switched from SendGrid to Mailjet (using Mailjet v3.1 send API)

// Simple in-memory rate limiter (works best for single-instance deployments).
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 5;
const ipMap = new Map();

function sanitize(str = "") {
  return String(str)
    .replace(/[\r\n]/g, " ")
    .trim()
    .slice(0, 2000);
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function (req, res) {
  // Allow CORS for dev; in production set ALLOWED_ORIGIN
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("application/json")) {
    return res.status(415).json({ ok: false, error: "Invalid content type" });
  }

  // Resolve credentials from environment first
  const query = req.query || {};
  // allow query fallback for local testing only when host is localhost or when explicitly allowed
  const allowQuery =
    process.env.ALLOW_QUERY_CREDS === "true" ||
    (req.headers &&
      req.headers.host &&
      String(req.headers.host).includes("localhost"));

  let resolvedApiKey =
    process.env.MJ_APIKEY_PUBLIC || process.env.MAILJET_API_KEY;
  let resolvedApiSecret =
    process.env.MJ_APIKEY_PRIVATE || process.env.MAILJET_API_SECRET;
  let resolvedFrom = process.env.MAILJET_FROM || process.env.MJ_SENDER_EMAIL;
  let resolvedTo = process.env.CONTACT_TO;

  if (allowQuery) {
    if (!resolvedApiKey && (query.MAILJET_API_KEY || query.MJ_APIKEY_PUBLIC)) {
      resolvedApiKey = query.MAILJET_API_KEY || query.MJ_APIKEY_PUBLIC;
      console.warn("Using MAILJET API KEY from query string for local testing");
    }
    if (
      !resolvedApiSecret &&
      (query.MAILJET_API_SECRET || query.MJ_APIKEY_PRIVATE)
    ) {
      resolvedApiSecret = query.MAILJET_API_SECRET || query.MJ_APIKEY_PRIVATE;
      console.warn(
        "Using MAILJET API SECRET from query string for local testing",
      );
    }
    if (!resolvedFrom && query.MAILJET_FROM) {
      resolvedFrom = query.MAILJET_FROM;
      console.warn("Using MAILJET_FROM from query string for local testing");
    }
    if (!resolvedTo && query.CONTACT_TO) {
      resolvedTo = query.CONTACT_TO;
      console.warn("Using CONTACT_TO from query string for local testing");
    }
  }

  const missing = [];
  if (!resolvedApiKey) missing.push("MAILJET_API_KEY or MJ_APIKEY_PUBLIC");
  if (!resolvedApiSecret)
    missing.push("MAILJET_API_SECRET or MJ_APIKEY_PRIVATE");
  if (!resolvedFrom) missing.push("MAILJET_FROM or MJ_SENDER_EMAIL");
  if (!resolvedTo) missing.push("CONTACT_TO");

  if (missing.length) {
    console.error("Missing env vars:", missing);
    return res
      .status(500)
      .json({ ok: false, error: "Missing environment variables", missing });
  }

  const ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "unknown";
  const now = Date.now();
  const entry = ipMap.get(ip) || { count: 0, first: now };
  if (now - entry.first > RATE_WINDOW_MS) {
    entry.count = 0;
    entry.first = now;
  }
  entry.count += 1;
  ipMap.set(ip, entry);
  if (entry.count > RATE_MAX) {
    return res.status(429).json({ ok: false, error: "Rate limit" });
  }

  let body = req.body;
  // If body is string, try parse
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ ok: false });
    }
  }

  const { name, email, message, interest, website } = body || {};

  // honeypot
  if (website) return res.status(400).json({ ok: false });

  if (!name || !email || !message) return res.status(400).json({ ok: false });

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email);
  const cleanMessage = sanitize(message);
  const cleanInterest = sanitize(
    Array.isArray(interest) ? interest.join(", ") : String(interest || ""),
  );

  const escName = escapeHtml(cleanName);
  const escEmail = escapeHtml(cleanEmail);
  const escMessage = escapeHtml(cleanMessage);
  const escInterest = escapeHtml(cleanInterest);

  // basic email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({ ok: false });
  }

  try {
    // Use resolved credentials (may have come from query fallback in dev)
    const apiKey = resolvedApiKey;
    const apiSecret = resolvedApiSecret;
    const fromEmail = resolvedFrom;
    const fromName =
      process.env.MAILJET_FROM_NAME || process.env.MJ_SENDER_NAME || "Site";
    const toEmail = resolvedTo;
    const toName = process.env.CONTACT_TO_NAME || "Contato";

    // Build the message recipients and payload
    const recipients = [{ Email: toEmail, Name: toName }];

    const payload = {
      Messages: [
        {
          From: { Email: fromEmail, Name: fromName },
          To: recipients,
          ReplyTo: { Email: cleanEmail, Name: cleanName },
          Subject: `Novo contato: ${escName}`,
          TextPart: `Interesses: ${cleanInterest}\n\nMensagem:\n${cleanMessage}\n\nEmail: ${cleanEmail}`,
          HTMLPart: `<p><strong>Interesses:</strong> ${escInterest}</p><p><strong>Mensagem:</strong><br/>${escMessage}</p><p><strong>Email:</strong> ${escEmail}</p>`,
        },
      ],
    };

    // Use node-mailjet SDK (support both CJS and ESM shapes)
    const mailjetMod = await import("node-mailjet");
    const mailjetLib = mailjetMod.default ?? mailjetMod;
    const mailjet = mailjetLib.connect(apiKey, apiSecret);

    const request = mailjet.post("send", { version: "v3.1" }).request(payload);
    const result = await request;

    // Mailjet returns 200/201 on success; include body in log for debugging
    console.log("mailjet result status:", result.status, "body:", result.body);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("mailjet send error", err);
    // Attach error details to help debugging (always for local testing)
    const payload = {
      ok: false,
      error: err && err.message ? err.message : String(err),
    };
    if (err && err.response) {
      payload.details = err.response.body || err.response;
    }
    // If Mailjet responded with a statusCode, use it
    const statusCode = (err && err.statusCode) || 500;
    return res.status(statusCode).json(payload);
  }
}
