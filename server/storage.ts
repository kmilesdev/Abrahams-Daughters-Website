import { 
  type User, 
  type InsertUser,
  type ContactForm,
  type HelpRequest,
  type NewsletterSubscription,
  type Donation
} from "@shared/schema";
import { randomUUID } from "crypto";

// Stored types with IDs and timestamps
export interface StoredContactForm extends ContactForm {
  id: string;
  createdAt: Date;
}

export interface StoredHelpRequest extends HelpRequest {
  id: string;
  createdAt: Date;
}

export interface StoredNewsletterSubscription extends NewsletterSubscription {
  id: string;
  createdAt: Date;
}

export interface StoredDonation extends Donation {
  id: string;
  createdAt: Date;
}

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact forms
  createContactSubmission(data: ContactForm): Promise<StoredContactForm>;
  getContactSubmissions(): Promise<StoredContactForm[]>;
  
  // Help requests
  createHelpRequest(data: HelpRequest): Promise<StoredHelpRequest>;
  getHelpRequests(): Promise<StoredHelpRequest[]>;
  
  // Newsletter
  createNewsletterSubscription(data: NewsletterSubscription): Promise<StoredNewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<StoredNewsletterSubscription[]>;
  isEmailSubscribed(email: string): Promise<boolean>;
  
  // Donations
  createDonation(data: Donation): Promise<StoredDonation>;
  getDonations(): Promise<StoredDonation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, StoredContactForm>;
  private helpRequests: Map<string, StoredHelpRequest>;
  private newsletterSubscriptions: Map<string, StoredNewsletterSubscription>;
  private donations: Map<string, StoredDonation>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.helpRequests = new Map();
    this.newsletterSubscriptions = new Map();
    this.donations = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact forms
  async createContactSubmission(data: ContactForm): Promise<StoredContactForm> {
    const id = randomUUID();
    const submission: StoredContactForm = { 
      ...data, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<StoredContactForm[]> {
    return Array.from(this.contactSubmissions.values());
  }

  // Help requests
  async createHelpRequest(data: HelpRequest): Promise<StoredHelpRequest> {
    const id = randomUUID();
    const request: StoredHelpRequest = { 
      ...data, 
      id, 
      createdAt: new Date() 
    };
    this.helpRequests.set(id, request);
    return request;
  }

  async getHelpRequests(): Promise<StoredHelpRequest[]> {
    return Array.from(this.helpRequests.values());
  }

  // Newsletter
  async createNewsletterSubscription(data: NewsletterSubscription): Promise<StoredNewsletterSubscription> {
    const id = randomUUID();
    const subscription: StoredNewsletterSubscription = { 
      ...data, 
      id, 
      createdAt: new Date() 
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<StoredNewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.newsletterSubscriptions.values()).some(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );
  }

  // Donations
  async createDonation(data: Donation): Promise<StoredDonation> {
    const id = randomUUID();
    const donation: StoredDonation = { 
      ...data, 
      id, 
      createdAt: new Date() 
    };
    this.donations.set(id, donation);
    return donation;
  }

  async getDonations(): Promise<StoredDonation[]> {
    return Array.from(this.donations.values());
  }
}

export const storage = new MemStorage();
