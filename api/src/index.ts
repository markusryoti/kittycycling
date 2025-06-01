import { Hono } from "hono";
import { logger } from "hono/logger";
import { config } from "dotenv";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";

config();

const app = new Hono();

app.use("*", logger());

app.use("/api/*", cors());
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get("/", (c) => c.text("Hono + BetterAuth!"));

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
