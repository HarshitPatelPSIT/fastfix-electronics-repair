import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRepairSchema, insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // USER ROUTES
  
  // Register user
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Login user - simplified auth for demo
  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Get user profile
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(Number(req.params.id));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // REPAIR ROUTES
  
  // Create new repair
  app.post("/api/repairs", async (req, res) => {
    try {
      const repairData = insertRepairSchema.parse(req.body);
      
      // Get user ID if provided
      const userId = req.body.userId ? Number(req.body.userId) : undefined;
      
      const repair = await storage.createRepair(repairData, userId);
      res.status(201).json(repair);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create repair request" });
    }
  });

  // Get all repairs (admin)
  app.get("/api/repairs", async (_req, res) => {
    try {
      const repairs = await storage.getAllRepairs();
      res.json(repairs);
    } catch (error) {
      res.status(500).json({ message: "Failed to get repairs" });
    }
  });

  // Get repair by ID
  app.get("/api/repairs/:id", async (req, res) => {
    try {
      const repair = await storage.getRepair(Number(req.params.id));
      
      if (!repair) {
        return res.status(404).json({ message: "Repair not found" });
      }
      
      res.json(repair);
    } catch (error) {
      res.status(500).json({ message: "Failed to get repair" });
    }
  });

  // Get repair by tracking code
  app.get("/api/repairs/track/:trackingCode", async (req, res) => {
    try {
      const repair = await storage.getRepairByTrackingCode(req.params.trackingCode);
      
      if (!repair) {
        return res.status(404).json({ message: "Repair not found" });
      }
      
      // Get progress history
      const progress = await storage.getRepairProgressByRepairId(repair.id);
      
      res.json({ repair, progress });
    } catch (error) {
      res.status(500).json({ message: "Failed to get repair" });
    }
  });

  // Get repairs by user ID
  app.get("/api/users/:userId/repairs", async (req, res) => {
    try {
      const repairs = await storage.getRepairsByUserId(Number(req.params.userId));
      res.json(repairs);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user repairs" });
    }
  });

  // Update repair status
  app.patch("/api/repairs/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const validStatuses = ["received", "diagnosed", "repairing", "ready", "completed", "cancelled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(", ")}` });
      }
      
      const updatedRepair = await storage.updateRepairStatus(Number(req.params.id), status);
      
      if (!updatedRepair) {
        return res.status(404).json({ message: "Repair not found" });
      }
      
      res.json(updatedRepair);
    } catch (error) {
      res.status(500).json({ message: "Failed to update repair status" });
    }
  });

  // REPAIR PROGRESS ROUTES
  
  // Get repair progress history
  app.get("/api/repairs/:repairId/progress", async (req, res) => {
    try {
      const progress = await storage.getRepairProgressByRepairId(Number(req.params.repairId));
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get repair progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
