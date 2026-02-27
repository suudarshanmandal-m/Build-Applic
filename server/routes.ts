import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_cyber_corner";

// Setup multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage: storageEngine,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG, and PNG files are allowed!"));
    }
  }
});

// Auth Middleware
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const admin = await storage.getAdminById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    (req as any).user = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(cookieParser());
  
  // Expose uploads directory
  app.use('/uploads', express.static(uploadDir));

  // Seed DB with admin if it doesn't exist
  async function seedAdmin() {
    try {
      const existingAdmin = await storage.getAdminByEmail("admin@cybercorner.com");
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await storage.createAdmin({
          username: "admin",
          email: "admin@cybercorner.com",
          password: hashedPassword
        });
        console.log("Seeded default admin (admin@cybercorner.com / admin123)");
      }
      
      const existingNotices = await storage.getNotices();
      if (existingNotices.length === 0) {
        await storage.createNotice({
          title: "Welcome to CYBER CORNER",
          message: "Our digital service center is now online. Book your services easily!"
        });
      }
    } catch (err) {
      console.error("Failed to seed DB:", err);
    }
  }
  
  // Run seed
  seedAdmin();

  // Auth Routes
  app.post(api.auth.login.path, async (req, res) => {
    try {
      const { email, password } = api.auth.login.input.parse(req.body);
      const admin = await storage.getAdminByEmail(email);
      
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });

      const { password: _, ...adminWithoutPassword } = admin;
      res.status(200).json({ message: "Logged in successfully", user: adminWithoutPassword });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  });

  app.get(api.auth.me.path, authMiddleware, (req, res) => {
    const { password, ...user } = (req as any).user;
    res.status(200).json({ user });
  });

  // Service Requests Routes
  app.get(api.serviceRequests.list.path, authMiddleware, async (req, res) => {
    try {
      const requests = await storage.getServiceRequests();
      res.status(200).json(requests);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.serviceRequests.create.path, upload.single("documentFile"), async (req, res) => {
    try {
      const body = req.body;
      const file = req.file;

      const requestData = {
        name: body.name,
        phone: body.phone,
        serviceType: body.serviceType,
        message: body.message || null,
        documentFile: file ? file.filename : null,
      };

      const newRequest = await storage.createServiceRequest(requestData);
      res.status(201).json(newRequest);
    } catch (err) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid request" });
    }
  });

  app.patch(api.serviceRequests.updateStatus.path, authMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (status !== "Pending" && status !== "Completed") {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updated = await storage.updateServiceRequestStatus(id, status);
      if (!updated) return res.status(404).json({ message: "Request not found" });
      
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.serviceRequests.delete.path, authMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteServiceRequest(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Notices Routes
  app.get(api.notices.list.path, async (req, res) => {
    try {
      const notices = await storage.getNotices();
      res.status(200).json(notices);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.notices.create.path, authMiddleware, async (req, res) => {
    try {
      const notice = await storage.createNotice(req.body);
      res.status(201).json(notice);
    } catch (err) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.delete(api.notices.delete.path, authMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNotice(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
