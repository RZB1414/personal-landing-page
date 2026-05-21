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
  const botToken = c.env.TELEGRAM_BOT_TOKEN;
  const chatId = c.env.TELEGRAM_CHAT_ID;

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
    "Novo contato - Red Coast Labs",
    "",
    `Nome: ${name || "Nao informado"}`,
    `Email: ${email}`,
    `Telefone: ${phone}`,
    "",
    "Mensagem:",
    message,
  ].join("\n");

  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage,
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    return c.json({ ok: false, error: "Telegram delivery failed." }, 502);
  }

  return c.json({ ok: true });
});

export default app;
