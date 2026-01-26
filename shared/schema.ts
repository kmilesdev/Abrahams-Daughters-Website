import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Help request form
export const helpRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Service type is required"),
  preferredDate: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type HelpRequest = z.infer<typeof helpRequestSchema>;

// Newsletter subscription
export const newsletterSchema = z.object({
  email: z.string().email("Valid email is required"),
});

export type NewsletterSubscription = z.infer<typeof newsletterSchema>;

// Donation
export const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  frequency: z.enum(["one-time", "monthly"]),
  donor: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    anonymous: z.boolean().default(false),
  }),
});

export type Donation = z.infer<typeof donationSchema>;
