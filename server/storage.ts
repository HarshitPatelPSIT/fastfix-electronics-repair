import { 
  users, type User, type InsertUser,
  repairs, type Repair, type InsertRepair,
  repairProgress, type RepairProgress, type InsertRepairProgress 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Repair methods
  getRepair(id: number): Promise<Repair | undefined>;
  getRepairByTrackingCode(trackingCode: string): Promise<Repair | undefined>;
  getRepairsByUserId(userId: number): Promise<Repair[]>;
  getAllRepairs(): Promise<Repair[]>;
  createRepair(repair: InsertRepair, userId?: number): Promise<Repair>;
  updateRepairStatus(id: number, status: string): Promise<Repair | undefined>;
  
  // Repair Progress methods
  getRepairProgressByRepairId(repairId: number): Promise<RepairProgress[]>;
  addRepairProgress(progress: InsertRepairProgress): Promise<RepairProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private repairs: Map<number, Repair>;
  private repairProgress: Map<number, RepairProgress>;
  private userId: number;
  private repairId: number;
  private progressId: number;

  constructor() {
    this.users = new Map();
    this.repairs = new Map();
    this.repairProgress = new Map();
    this.userId = 1;
    this.repairId = 1;
    this.progressId = 1;
    
    // Add default user
    this.createUser({
      username: "demo",
      password: "password",
      name: "Demo User",
      email: "demo@example.com",
      phone: "123-456-7890"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Repair methods
  async getRepair(id: number): Promise<Repair | undefined> {
    return this.repairs.get(id);
  }

  async getRepairByTrackingCode(trackingCode: string): Promise<Repair | undefined> {
    return Array.from(this.repairs.values()).find(
      (repair) => repair.trackingCode === trackingCode
    );
  }

  async getRepairsByUserId(userId: number): Promise<Repair[]> {
    return Array.from(this.repairs.values()).filter(
      (repair) => repair.userId === userId
    );
  }

  async getAllRepairs(): Promise<Repair[]> {
    return Array.from(this.repairs.values());
  }

  async createRepair(insertRepair: InsertRepair, userId?: number): Promise<Repair> {
    const id = this.repairId++;
    const trackingCode = `FF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const estimatedCompletion = new Date();
    estimatedCompletion.setDate(estimatedCompletion.getDate() + 2);
    
    const repair: Repair = { 
      ...insertRepair, 
      id, 
      userId: userId || null, 
      trackingCode,
      status: "received",
      estimatedCompletion: estimatedCompletion,
      createdAt: new Date(),
      updatedAt: new Date(),
      technicianNotes: "",
      technicianId: ""
    };
    
    this.repairs.set(id, repair);
    
    // Add initial progress
    this.addRepairProgress({
      repairId: id,
      status: "received",
      notes: "Device received for repair"
    });
    
    return repair;
  }

  async updateRepairStatus(id: number, status: string): Promise<Repair | undefined> {
    const repair = await this.getRepair(id);
    if (!repair) return undefined;
    
    const updatedRepair = { 
      ...repair, 
      status, 
      updatedAt: new Date() 
    };
    
    this.repairs.set(id, updatedRepair);
    
    // Add progress update
    this.addRepairProgress({
      repairId: id,
      status,
      notes: `Status updated to ${status}`
    });
    
    return updatedRepair;
  }

  // Repair Progress methods
  async getRepairProgressByRepairId(repairId: number): Promise<RepairProgress[]> {
    return Array.from(this.repairProgress.values())
      .filter(progress => progress.repairId === repairId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async addRepairProgress(insertProgress: InsertRepairProgress): Promise<RepairProgress> {
    const id = this.progressId++;
    const progress: RepairProgress = { 
      ...insertProgress, 
      id, 
      timestamp: new Date() 
    };
    
    this.repairProgress.set(id, progress);
    return progress;
  }
}

// Import the PgStorage implementation
import { pgStorage } from './pg-storage';

// Use PgStorage instead of MemStorage
export const storage = pgStorage;
