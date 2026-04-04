import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import chatRoutes from "./routes/chatRoutes.js";
import executeRoute from "./routes/execute.js";
import sessionRoutes from "./routes/sessionRoute.js";
import protectRoute from "./middleware/protectRoute.js";

const app = express();
const allowedOrigins = ENV.CLIENT_URLS;
const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, "");
    const isAllowed = allowedOrigins.some(
      (allowedOrigin) => allowedOrigin === normalizedOrigin
    );

    if (isAllowed) return callback(null, true);

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));

app.use(
  clerkMiddleware({
    authorizedParties: allowedOrigins.length ? allowedOrigins : undefined,
  })
);

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api", executeRoute);

app.get("/video-calls", protectRoute, (req, res) => {
  res.status(200).json({ msg: "video call endpoints" });
});

app.get("/", (req, res) => {
  res.json({ msg: "success api is running" });
});

app.use((req, res) => {
  console.error(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ message: `Route ${req.path} not found` });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
