import { setApiKey, send } from "@sendgrid/mail";

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

  if (
    !process.env.SENDGRID_API_KEY ||
    !process.env.SENDGRID_FROM ||
    !process.env.CONTACT_TO
  ) {
    return res.status(500).json({ ok: false });
  }

  setApiKey(process.env.SENDGRID_API_KEY);

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
    const msg = {
      to: process.env.CONTACT_TO,
      from: process.env.SENDGRID_FROM,
      subject: `Novo contato: ${cleanName}`,
      text: `Interesses: ${cleanInterest}\n\nMensagem:\n${cleanMessage}\n\nEmail: ${cleanEmail}`,
      html: `<p><strong>Interesses:</strong> ${escInterest}</p><p><strong>Mensagem:</strong><br/>${escMessage}</p><p><strong>Email:</strong> ${escEmail}</p>`,
    };

    await send(msg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send error", err);
    return res.status(500).json({ ok: false });
  }
}
