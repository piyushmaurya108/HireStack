import serverless from "serverless-http";
import app from "../src/app.js";
import { connectDB } from "../src/lib/db.js";
import { ENV } from "../src/lib/env.js";

let server;
const allowedOrigins = ENV.CLIENT_URLS;
const DB_CONNECT_TIMEOUT_MS = 8000;

console.log("[startup] Allowed origins:", JSON.stringify(allowedOrigins));
console.log("[startup] DB_URL configured:", !!ENV.DB_URL);
console.log("[startup] NODE_ENV:", ENV.NODE_ENV);

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const normalizedOrigin = origin?.replace(/\/$/, "");

  console.log(`[CORS] Request origin: "${origin}" -> normalized: "${normalizedOrigin}"`);
  console.log(`[CORS] Allowed origins: ${JSON.stringify(allowedOrigins)}`);

  const isAllowed =
    allowedOrigins.length === 0 ||
    (normalizedOrigin && allowedOrigins.includes(normalizedOrigin));

  if (isAllowed && normalizedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", normalizedOrigin);
    console.log(`[CORS] ✓ Origin allowed, setting header`);
  } else if (allowedOrigins.length === 0) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`[CORS] No allowed origins configured; allowing all with *`);
  } else {
    console.log(`[CORS] ✗ Origin not in allowed list`);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

async function connectDBWithTimeout() {
  return Promise.race([
    connectDB(),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`Database connection timed out after ${DB_CONNECT_TIMEOUT_MS}ms`)),
        DB_CONNECT_TIMEOUT_MS
      )
    ),
  ]);
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);
  const requestUrl = req.originalUrl || req.url;
  const pathname = requestUrl?.split("?")[0];
  console.log(`[handler] ${req.method} ${pathname} (originalUrl=${req.originalUrl || 'N/A'})`);
  console.log(`[handler] Full URL: ${req.url}, Headers:`, JSON.stringify(req.headers, null, 2));

  if (req.method === "OPTIONS") {
    console.log(`[handler] Handling OPTIONS preflight for ${pathname}`);
    return res.status(204).end();
  }

  if (pathname === "/" || pathname === "/api/health") {
    console.log(`[handler] Handling health check`);
    return res.status(200).json({
      ok: true,
      message: "HireStack backend is reachable",
    });
  }

  try {
    console.log(`[handler] Connecting to database...`);
    await connectDBWithTimeout();
    console.log(`[handler] Database connected, proceeding to Express app`);
  } catch (error) {
    console.error("[handler] Database connection failed:", error);
    return res.status(503).json({
      message: "Database connection failed",
      error: error.message,
    });
  }

  if (!server) {
    console.log(`[handler] Creating serverless wrapper`);
    server = serverless(app);
  }

  console.log(`[handler] Passing request to Express app`);
  return server(req, res);
}
