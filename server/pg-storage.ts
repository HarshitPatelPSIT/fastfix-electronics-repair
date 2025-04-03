import { eq, and } from 'drizzle-orm';
import { db } from './db';
import { 
  users, type User, type InsertUser,
  repairs, type Repair, type InsertRepair,
  repairProgress, type RepairProgress, type InsertRepairProgress 
} from "@shared/schema";
import { IStorage } from './storage';

export class PgStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Repair methods
  async getRepair(id: number): Promise<Repair | undefined> {
    const result = await db.select().from(repairs).where(eq(repairs.id, id));
    return result[0];
  }

  async getRepairByTrackingCode(trackingCode: string): Promise<Repair | undefined> {
    const result = await db.select().from(repairs).where(eq(repairs.trackingCode, trackingCode));
    return result[0];
  }

  async getRepairsByUserId(userId: number): Promise<Repair[]> {
    return await db.select().from(repairs).where(eq(repairs.userId, userId));
  }

  async getAllRepairs(): Promise<Repair[]> {
    return await db.select().from(repairs);
  }

  async createRepair(repair: InsertRepair, userId?: number): Promise<Repair> {
    const trackingCode = `FF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const estimatedCompletion = new Date();
    estimatedCompletion.setDate(estimatedCompletion.getDate() + 2);
    
    const newRepair = {
      ...repair,
      userId: userId || null,
      trackingCode,
      status: "received",
      estimatedCompletion,
      createdAt: new Date(),
      updatedAt: new Date(),
      technicianNotes: "",
      technicianId: ""
    };
    
    const result = await db.insert(repairs).values(newRepair).returning();
    const createdRepair = result[0];
    
    // Add initial progress
    await this.addRepairProgress({
      repairId: createdRepair.id,
      status: "received",
      notes: "Device received for repair"
    });
    
    return createdRepair;
  }

  async updateRepairStatus(id: number, status: string): Promise<Repair | undefined> {
    const result = await db
      .update(repairs)
      .set({ 
        status, 
        updatedAt: new Date() 
      })
      .where(eq(repairs.id, id))
      .returning();
    
    if (result.length === 0) return undefined;
    
    // Add progress update
    await this.addRepairProgress({
      repairId: id,
      status,
      notes: `Status updated to ${status}`
    });
    
    return result[0];
  }

  // Repair Progress methods
  async getRepairProgressByRepairId(repairId: number): Promise<RepairProgress[]> {
    return await db
      .select()
      .from(repairProgress)
      .where(eq(repairProgress.repairId, repairId))
      .orderBy(repairProgress.timestamp);
  }

  async addRepairProgress(progress: InsertRepairProgress): Promise<RepairProgress> {
    const result = await db
      .insert(repairProgress)
      .values({
        ...progress,
        timestamp: new Date()
      })
      .returning();
    
    return result[0];
  }
}

// Create and export an instance of the PostgreSQL storage
export const pgStorage = new PgStorage();