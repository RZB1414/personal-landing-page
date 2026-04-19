import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

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

export default app;
