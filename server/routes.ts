import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix with /api
  const apiRouter = express.Router();
  
  // Error handling middleware for API routes
  const handleApiErrors = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: fromZodError(err).message
      });
    }
    
    console.error("API Error:", err);
    res.status(500).json({ message: err.message || "Internal server error" });
  };

  // Get all services
  apiRouter.get("/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get services by category
  apiRouter.get("/services/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const services = await storage.getServicesByCategory(category);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get a specific service
  apiRouter.get("/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Create a booking
  apiRouter.post("/bookings", async (req, res, next) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  });

  // Track repair by tracking ID
  apiRouter.get("/track/:trackingId", async (req, res) => {
    try {
      const { trackingId } = req.params;
      const booking = await storage.getBookingByTrackingId(trackingId);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      const statuses = await storage.getRepairStatuses(booking.id);
      
      res.json({
        booking,
        statuses
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to track repair" });
    }
  });

  // Update booking status (admin functionality)
  apiRouter.put("/bookings/:trackingId/status", async (req, res) => {
    try {
      const { trackingId } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const validStatuses = ["received", "diagnosed", "in_progress", "testing", "completed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedBooking = await storage.updateBookingStatus(trackingId, status);
      
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  // Get team members
  apiRouter.get("/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Get blog posts
  apiRouter.get("/blog", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // Get a specific blog post
  apiRouter.get("/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Submit contact form
  apiRouter.post("/contact", async (req, res, next) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(contactData);
      res.status(201).json({ message: "Contact message sent successfully" });
    } catch (error) {
      next(error);
    }
  });

  // Get FAQs
  apiRouter.get("/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  // Register API router
  app.use("/api", apiRouter, handleApiErrors);

  const httpServer = createServer(app);
  return httpServer;
}
