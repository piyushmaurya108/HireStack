import serverless from "serverless-http";
import app from "../src/app.js";
import { connectDB } from "../src/lib/db.js";
import { ENV } from "../src/lib/env.js";

let server;
const allowedOrigins = ENV.CLIENT_URLS;
const DB_CONNECT_TIMEOUT_MS = 8000;

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const normalizedOrigin = origin?.replace(/\/$/, "");

  if (normalizedOrigin && allowedOrigins.includes(normalizedOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", normalizedOrigin);
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
  const pathname = req.url?.split("?")[0];
  console.log(`[handler] ${req.method} ${pathname}`);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (pathname === "/" || pathname === "/api/health") {
    return res.status(200).json({
      ok: true,
      message: "HireStack backend is reachable",
    });
  }

  try {
    await connectDBWithTimeout();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(503).json({
      message: "Database connection failed",
      error: error.message,
    });
  }

  if (!server) {
    server = serverless(app);
  }

  return server(req, res);
}
