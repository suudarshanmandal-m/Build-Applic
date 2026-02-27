// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { serveStatic } from "./static"; // optional, your existing static handler

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// Body parsing with rawBody capture
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

// Logger
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const pathUrl = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (pathUrl.startsWith("/api")) {
      let logLine = `${req.method} ${pathUrl} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    await registerRoutes(httpServer, app); // include DB init if needed
    log("Routes and DB initialized successfully");
  } catch (err) {
    console.error("Failed to initialize routes or DB:", err);
    process.exit(1);
  }

  // Global error handler
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) return next(err);

    return res.status(status).json({ message });
  });

  // -------------------------------
  // Serve frontend files in production
  // -------------------------------
  if (process.env.NODE_ENV === "production") {
    // CommonJS-compatible __dirname
    const staticPath = path.join(__dirname, "../dist/public");
    const indexPath = path.join(staticPath, "index.html");

    // Check if index.html exists
    if (!fs.existsSync(indexPath)) {
      console.error("Error: index.html not found at", indexPath);
      process.exit(1);
    }

    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    // Development: Vite server
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // Start server on Render port
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`Server running on port ${port}`);
    }
  );

  // Server error listener
  httpServer.on("error", (err) => {
    console.error("Server failed to start:", err);
  });
})();
