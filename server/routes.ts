import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactFormSchema, 
  helpRequestSchema, 
  newsletterSchema, 
  donationSchema 
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contact submissions (admin endpoint)
  app.get("/api/contact", async (_req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact submissions" 
      });
    }
  });

  // Help request submission
  app.post("/api/help-request", async (req, res) => {
    try {
      const data = helpRequestSchema.parse(req.body);
      const request = await storage.createHelpRequest(data);
      res.status(201).json({ 
        success: true, 
        message: "Help request submitted successfully",
        id: request.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit help request" 
        });
      }
    }
  });

  // Get all help requests (admin endpoint)
  app.get("/api/help-request", async (_req, res) => {
    try {
      const requests = await storage.getHelpRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch help requests" 
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = newsletterSchema.parse(req.body);
      
      // Check if already subscribed
      const isSubscribed = await storage.isEmailSubscribed(data.email);
      if (isSubscribed) {
        res.status(200).json({ 
          success: true, 
          message: "Email is already subscribed" 
        });
        return;
      }
      
      const subscription = await storage.createNewsletterSubscription(data);
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        id: subscription.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to subscribe to newsletter" 
        });
      }
    }
  });

  // Get all newsletter subscriptions (admin endpoint)
  app.get("/api/newsletter", async (_req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch newsletter subscriptions" 
      });
    }
  });

  // Donation submission
  app.post("/api/donations", async (req, res) => {
    try {
      const data = donationSchema.parse(req.body);
      const donation = await storage.createDonation(data);
      
      // In a real app, this would process payment via Stripe
      // For now, we just store the donation intent
      res.status(201).json({ 
        success: true, 
        message: "Donation recorded successfully. Payment processing will be enabled soon.",
        id: donation.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to process donation" 
        });
      }
    }
  });

  // Get all donations (admin endpoint)
  app.get("/api/donations", async (_req, res) => {
    try {
      const donations = await storage.getDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch donations" 
      });
    }
  });

  return httpServer;
}
