import { 
  User, InsertUser, Service, InsertService, 
  Booking, InsertBooking, RepairStatus, InsertRepairStatus,
  BlogPost, InsertBlogPost, TeamMember, InsertTeamMember,
  ContactMessage, InsertContactMessage, FAQ, InsertFAQ
} from "@shared/schema";
import { nanoid } from "nanoid";

// Define storage interface
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service management
  getServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Booking management
  getBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBookingByTrackingId(trackingId: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(trackingId: string, status: string): Promise<Booking | undefined>;

  // Repair status management
  getRepairStatuses(bookingId: number): Promise<RepairStatus[]>;
  createRepairStatus(status: InsertRepairStatus): Promise<RepairStatus>;

  // Blog post management
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Team management
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Contact form
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // FAQ management
  getFAQs(): Promise<FAQ[]>;
  createFAQ(faq: InsertFAQ): Promise<FAQ>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private bookings: Map<number, Booking>;
  private repairStatuses: Map<number, RepairStatus>;
  private blogPosts: Map<number, BlogPost>;
  private teamMembers: Map<number, TeamMember>;
  private contactMessages: Map<number, ContactMessage>;
  private faqs: Map<number, FAQ>;
  
  private userId: number;
  private serviceId: number;
  private bookingId: number;
  private repairStatusId: number;
  private blogPostId: number;
  private teamMemberId: number;
  private contactMessageId: number;
  private faqId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.bookings = new Map();
    this.repairStatuses = new Map();
    this.blogPosts = new Map();
    this.teamMembers = new Map();
    this.contactMessages = new Map();
    this.faqs = new Map();
    
    this.userId = 1;
    this.serviceId = 1;
    this.bookingId = 1;
    this.repairStatusId = 1;
    this.blogPostId = 1;
    this.teamMemberId = 1;
    this.contactMessageId = 1;
    this.faqId = 1;

    // Initialize with some default data
    this.initializeDefaultData();
  }

  // User management
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
    const user = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Service management
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.category === category
    );
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Booking management
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }

  async getBookingByTrackingId(trackingId: string): Promise<Booking | undefined> {
    return Array.from(this.bookings.values()).find(
      (booking) => booking.trackingId === trackingId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const trackingId = `REP${nanoid(6).toUpperCase()}`;
    const booking = { 
      ...insertBooking, 
      id, 
      trackingId, 
      status: "received", 
      createdAt: new Date(),
      userId: null
    };
    this.bookings.set(id, booking);
    
    // Also create initial repair status
    await this.createRepairStatus({
      bookingId: id,
      status: "received",
      notes: "Your device has been received at our repair center."
    });
    
    return booking;
  }

  async updateBookingStatus(trackingId: string, status: string): Promise<Booking | undefined> {
    const booking = await this.getBookingByTrackingId(trackingId);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(booking.id, updatedBooking);
    
    // Also create a repair status entry
    await this.createRepairStatus({
      bookingId: booking.id,
      status,
      notes: `Your repair status has been updated to: ${status}`
    });
    
    return updatedBooking;
  }

  // Repair status management
  async getRepairStatuses(bookingId: number): Promise<RepairStatus[]> {
    return Array.from(this.repairStatuses.values())
      .filter((status) => status.bookingId === bookingId)
      .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
  }

  async createRepairStatus(insertStatus: InsertRepairStatus): Promise<RepairStatus> {
    const id = this.repairStatusId++;
    const status = { ...insertStatus, id, updatedAt: new Date() };
    this.repairStatuses.set(id, status);
    return status;
  }

  // Blog post management
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const post = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }

  // Team management
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.teamMemberId++;
    const member = { ...insertMember, id };
    this.teamMembers.set(id, member);
    return member;
  }

  // Contact form
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const message = { ...insertMessage, id, createdAt: new Date() };
    this.contactMessages.set(id, message);
    return message;
  }

  // FAQ management
  async getFAQs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values())
      .sort((a, b) => a.order - b.order);
  }

  async createFAQ(insertFAQ: InsertFAQ): Promise<FAQ> {
    const id = this.faqId++;
    const faq = { ...insertFAQ, id };
    this.faqs.set(id, faq);
    return faq;
  }

  // Initialize with default data
  private async initializeDefaultData() {
    // Add services
    const services = [
      {
        category: "smartphone",
        name: "Screen Replacement",
        description: "Professional screen replacement service for all major smartphone brands",
        price: "From $79",
        estimatedTime: "24-48 hours"
      },
      {
        category: "smartphone",
        name: "Battery Replacement",
        description: "Battery replacement service to restore your phone's battery life",
        price: "From $49",
        estimatedTime: "24-48 hours"
      },
      {
        category: "smartphone",
        name: "Water Damage Repair",
        description: "Advanced water damage recovery service for smartphones",
        price: "From $99",
        estimatedTime: "2-3 days"
      },
      {
        category: "tablet",
        name: "Screen Replacement",
        description: "Professional tablet screen replacement for all major brands",
        price: "From $99",
        estimatedTime: "24-72 hours"
      },
      {
        category: "tablet",
        name: "Battery Replacement",
        description: "Battery replacement service for all tablet models",
        price: "From $69",
        estimatedTime: "24-72 hours"
      },
      {
        category: "tablet",
        name: "Charging Port Repair",
        description: "Fix charging issues with professional port repair service",
        price: "From $59",
        estimatedTime: "24-48 hours"
      },
      {
        category: "computer",
        name: "Hardware Upgrade",
        description: "Upgrade your computer's hardware for better performance",
        price: "From $89",
        estimatedTime: "1-3 days"
      },
      {
        category: "computer",
        name: "Virus Removal",
        description: "Professional virus and malware removal service",
        price: "From $69",
        estimatedTime: "1-2 days"
      },
      {
        category: "computer",
        name: "Data Recovery",
        description: "Recover lost or deleted data from your computer",
        price: "From $129",
        estimatedTime: "2-5 days"
      },
      {
        category: "console",
        name: "HDMI Port Repair",
        description: "Fix HDMI port issues for all gaming consoles",
        price: "From $89",
        estimatedTime: "2-4 days"
      },
      {
        category: "console",
        name: "Disc Drive Repair",
        description: "Repair disc reading issues for gaming consoles",
        price: "From $79",
        estimatedTime: "2-4 days"
      },
      {
        category: "console",
        name: "Overheating Fix",
        description: "Resolve overheating problems in gaming consoles",
        price: "From $69",
        estimatedTime: "2-3 days"
      }
    ];

    for (const service of services) {
      await this.createService(service);
    }

    // Add team members
    const teamMembers = [
      {
        name: "David Wilson",
        position: "Founder & Lead Technician",
        bio: "With over 15 years of experience in electronics repair, David founded FastFix to provide high-quality repair services at affordable prices.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Emily Chen",
        position: "Senior Repair Specialist",
        bio: "Emily is certified in all major smartphone and tablet repairs with a specialty in microsoldering techniques for board-level repairs.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Michael Johnson",
        position: "Computer Systems Expert",
        bio: "Michael brings 10+ years of experience in computer hardware and software troubleshooting, specializing in data recovery services.",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Lisa Rodriguez",
        position: "Customer Service Manager",
        bio: "Lisa ensures every customer has a seamless experience from booking to pickup, managing all aspects of customer satisfaction.",
        imageUrl: "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      }
    ];

    for (const member of teamMembers) {
      await this.createTeamMember(member);
    }

    // Add FAQs
    const faqs = [
      {
        question: "How long do repairs typically take?",
        answer: "Most smartphone and tablet repairs are completed within 24-48 hours. Computer and game console repairs may take 1-3 business days depending on the complexity of the issue and parts availability.",
        order: 1
      },
      {
        question: "Do you provide warranty on repairs?",
        answer: "Yes, all our repairs come with a 90-day warranty covering both parts and labor. If you experience the same issue within this period, we'll fix it at no additional cost.",
        order: 2
      },
      {
        question: "Are my data and files safe during repair?",
        answer: "We take data privacy seriously. In most cases, your data remains untouched during repairs. However, we always recommend backing up your data before any repair service as a precaution.",
        order: 3
      },
      {
        question: "Do you use original replacement parts?",
        answer: "We use high-quality OEM (Original Equipment Manufacturer) or equivalent parts for all our repairs. For certain brands where we're authorized repair providers, we use official parts directly from the manufacturer.",
        order: 4
      },
      {
        question: "Can I check the status of my repair online?",
        answer: "Yes, you can track your repair status using the unique repair tracking ID provided to you at drop-off. Simply enter this ID on our tracking page to get real-time updates on your repair.",
        order: 5
      }
    ];

    for (const faq of faqs) {
      await this.createFAQ(faq);
    }

    // Add blog posts
    const blogPosts = [
      {
        title: "Top 5 DIY Smartphone Repairs You Can Do at Home",
        slug: "top-5-diy-smartphone-repairs",
        content: "Detailed content with step-by-step instructions for common smartphone repairs...",
        excerpt: "Learn how to fix common smartphone issues yourself with these easy-to-follow steps and save money on repairs.",
        category: "DIY Guides",
        imageUrl: "https://images.unsplash.com/photo-1551617489-25aa9b1053c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedAt: new Date("2023-01-10")
      },
      {
        title: "How to Speed Up Your Slow Laptop Without New Hardware",
        slug: "speed-up-slow-laptop",
        content: "Comprehensive guide on software optimizations to improve laptop performance...",
        excerpt: "Simple software optimizations and maintenance tips that can dramatically improve your laptop's performance.",
        category: "Tips & Tricks",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedAt: new Date("2022-12-18")
      },
      {
        title: "What to Do Immediately When Your Phone Gets Water Damage",
        slug: "phone-water-damage-immediate-steps",
        content: "Emergency guide for handling water-damaged phones...",
        excerpt: "Quick emergency steps to take when your phone gets wet that can save it from permanent damage.",
        category: "Troubleshooting",
        imageUrl: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedAt: new Date("2023-01-05")
      }
    ];

    for (const post of blogPosts) {
      await this.createBlogPost(post);
    }
  }
}

export const storage = new MemStorage();
