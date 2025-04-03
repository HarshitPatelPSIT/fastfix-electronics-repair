import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});

// Repair services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  estimatedTime: text("estimated_time").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true
});

// Repair bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  deviceType: text("device_type").notNull(),
  deviceModel: text("device_model").notNull(),
  issue: text("issue").notNull(),
  serviceDate: text("service_date").notNull(),
  trackingId: text("tracking_id").notNull().unique(),
  status: text("status").notNull().default("received"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  userId: true,
  trackingId: true,
  status: true,
  createdAt: true
});

// Repair statuses table
export const repairStatuses = pgTable("repair_statuses", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  status: text("status").notNull(),
  notes: text("notes"),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertRepairStatusSchema = createInsertSchema(repairStatuses).omit({
  id: true,
  updatedAt: true
});

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow().notNull()
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true
});

// Team members table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio"),
  imageUrl: text("image_url")
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});

// FAQ table
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0)
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type RepairStatus = typeof repairStatuses.$inferSelect;
export type InsertRepairStatus = z.infer<typeof insertRepairStatusSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = z.infer<typeof insertFaqSchema>;
