import serverless from "serverless-http";
import app from "../src/app.js";
import { connectDB } from "../src/lib/db.js";
import { ENV } from "../src/lib/env.js";

let server;
const allowedOrigins = ENV.CLIENT_URLS;

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

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  await connectDB();

  if (!server) {
    server = serverless(app);
  }

  return server(req, res);
}
