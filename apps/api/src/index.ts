import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({
    name: "RB Systems API",
    version: "1.0.0",
    status: "online",
  });
});

app.get("/health", (c) => {
  return c.json({ ok: true, timestamp: new Date().toISOString() });
});

app.post("/contact", async (c) => {
  const botToken = c.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = c.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return c.json({ ok: false, error: "Telegram is not configured." }, 500);
  }

  let body: unknown;

  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid JSON body." }, 400);
  }

  const data = body as Partial<Record<"name" | "email" | "phone" | "message", unknown>>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!email || !phone || !message) {
    return c.json({ ok: false, error: "Email, phone and message are required." }, 400);
  }

  const telegramMessage = [
    "Novo contato - Buiatti.com",
    "",
    `Nome: ${name || "Nao informado"}`,
    `Email: ${email}`,
    `Telefone: ${phone}`,
    "",
    "Mensagem:",
    message,
  ].join("\n");

  let telegramResponse: Response;
  try {
    telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("Telegram request error:", err);
    return c.json({ ok: false, error: "Telegram delivery failed." }, 502);
  }

  if (!telegramResponse.ok) {
    const detail = await telegramResponse.text().catch(() => "");
    // Surfaced for debugging — Telegram error bodies (e.g. "chat not found") don't leak the token.
    console.error("Telegram delivery failed:", telegramResponse.status, detail);
    return c.json({ ok: false, error: "Telegram delivery failed.", status: telegramResponse.status, detail }, 502);
  }

  return c.json({ ok: true });
});

export default app;
