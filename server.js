import express from "express";

const app = express();
app.use(express.json());

async function start() {
  // load .env if available before anything else
  try {
    // dynamic import so this works in ESM without adding a hard dependency
    const dot = await import("dotenv");
    if (dot && typeof dot.config === "function") dot.config();
  } catch (e) {
    // ignore if dotenv not installed
  }
  try {
    const mod = await import("./api/contact.js");
    const contactHandler = mod.default;

    app.post("/api/contact", (req, res) => contactHandler(req, res));
    app.options("/api/contact", (req, res) => res.sendStatus(204));

    const port = 3000;
    app.listen(port, () => {
      console.log(`API dev server listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to load ./api/contact.js:", err);
    process.exit(1);
  }
}

start();
