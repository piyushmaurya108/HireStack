import express from "express"
import { createServer } from "http"
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import { Server } from "socket.io"
import { inngest, functions } from "./lib/inngest.js"  
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express"

// Import environment and database
import { ENV } from './lib/env.js'
import { connectDB } from "./lib/db.js"

// Import routes
import chatRoutes from "./routes/chatRoutes.js"
import executeRoute from "./routes/execute.js"
import sessionRoutes from "./routes/sessionRoute.js"
import  protectRoute from './middleware/protectRoute.js'

// Check environment variables
console.log("=== ENVIRONMENT CHECK ===")
console.log("PORT:", ENV.PORT)
console.log("DB_URL:", ENV.DB_URL ? "✓ Set" : "✗ Missing")
console.log("CLIENT_URL:", ENV.CLIENT_URL)
console.log("========================\n")

const app = express()
const httpServer = createServer(app)
const __dirname = path.resolve()
const sessionCodeStore = new Map()
const allowedOrigin = ENV.CLIENT_URL?.replace(/\/+$/, "")
const corsOptions = {
  origin(origin, callback) {
    if (!origin || origin.replace(/\/+$/, "") === allowedOrigin) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
}

// ==========================================
// MIDDLEWARE ORDER (IMPORTANT)
// ==========================================

// 1. JSON Parser
app.use(express.json())

// 2. Request logging (for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// 3. Clerk Middleware (Authentication)
app.use(clerkMiddleware())

// 4. CORS Middleware
app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))

const io = new Server(httpServer, {
  cors: corsOptions,
  path: "/socket.io",
})

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  socket.on("join-session", ({ sessionId }) => {
    if (!sessionId) return

    socket.join(sessionId)

    const currentCode = sessionCodeStore.get(sessionId)
    if (typeof currentCode === "string") {
      socket.emit("code-update", { code: currentCode })
    }
  })

  socket.on("code-change", ({ sessionId, code }) => {
    if (!sessionId || typeof code !== "string") return

    sessionCodeStore.set(sessionId, code)
    socket.to(sessionId).emit("code-update", { code })
  })

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id} (${reason})`)
  })
})

// ==========================================
// ROUTES REGISTRATION
// ==========================================

// Inngest endpoint (must be before other routes)
app.use("/api/inngest", serve({ client: inngest, functions }))

// API Routes
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoutes)

// Code execution (Piston API)
app.use("/api", executeRoute)

// Protected route example
app.get("/video-calls", protectRoute, (req, res) => {
  res.status(200).json({ msg: "video call endpoints" })
})

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ msg: "success api is running" })
})

// ==========================================
// ERROR HANDLING (Optional but recommended)
// ==========================================

// 404 handler
app.use((req, res) => {
  console.error(`404 Not Found: ${req.method} ${req.path}`)
  res.status(404).json({ message: `Route ${req.path} not found` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err)
  res.status(err.status || 500).json({ 
    message: err.message || "Internal Server Error" 
  })
})

// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {
  try {
    await connectDB()

    httpServer.listen(ENV.PORT, () => {
      console.log(`\n✓ Server running on http://localhost:${ENV.PORT}`)
      console.log(`✓ Database connected`)
      console.log(`✓ CORS enabled for: ${ENV.CLIENT_URL}\n`)
    })
  } catch (error) {
    console.error("Error starting the server:", error.message)
    process.exit(1)
  }
}

startServer()

// export default serverless(app)  // Uncomment if deploying serverless
