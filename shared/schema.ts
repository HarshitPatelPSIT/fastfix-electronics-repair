import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  phone: true,
});

export const repairStatusEnum = pgEnum("repair_status", [
  "received", 
  "diagnosed", 
  "repairing", 
  "ready", 
  "completed", 
  "cancelled"
]);

export const deviceTypeEnum = pgEnum("device_type", [
  "smartphone", 
  "tablet", 
  "computer", 
  "game_console", 
  "other"
]);

export const repairs = pgTable("repairs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  trackingCode: text("tracking_code").notNull().unique(),
  deviceType: text("device_type").notNull(),
  deviceModel: text("device_model").notNull(),
  issueDescription: text("issue_description").notNull(),
  status: text("status").notNull().default("received"),
  estimatedCompletion: timestamp("estimated_completion"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  technicianNotes: text("technician_notes"),
  technicianId: text("technician_id"),
});

export const insertRepairSchema = createInsertSchema(repairs)
  .omit({ 
    id: true, 
    userId: true, 
    status: true, 
    trackingCode: true, 
    createdAt: true, 
    updatedAt: true,
    estimatedCompletion: true,
    technicianNotes: true,
    technicianId: true
  });

export const repairProgress = pgTable("repair_progress", {
  id: serial("id").primaryKey(),
  repairId: integer("repair_id").references(() => repairs.id, { onDelete: "cascade" }),
  status: text("status").notNull(),
  notes: text("notes"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertRepairProgressSchema = createInsertSchema(repairProgress)
  .omit({ 
    id: true, 
    timestamp: true
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertRepair = z.infer<typeof insertRepairSchema>;
export type Repair = typeof repairs.$inferSelect;

export type InsertRepairProgress = z.infer<typeof insertRepairProgressSchema>;
export type RepairProgress = typeof repairProgress.$inferSelect;
