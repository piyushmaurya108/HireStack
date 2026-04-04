import serverless from "serverless-http";
import app from "../src/app.js";
import { connectDB } from "../src/lib/db.js";

let server;

export default async function handler(req, res) {
  await connectDB();

  if (!server) {
    server = serverless(app);
  }

  return server(req, res);
}
