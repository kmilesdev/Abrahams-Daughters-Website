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
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { amount, name, email, message, recurring } = req.body;

      const amountNum = parseFloat(amount);
      if (!amountNum || amountNum < 1) {
        res.status(400).json({ success: false, message: "Amount must be at least $1" });
        return;
      }

      const replitDomain = process.env.REPLIT_DEV_DOMAIN || process.env.REPLIT_DOMAINS?.split(",")[0];
      const baseUrl = replitDomain
        ? `https://${replitDomain}`
        : `${req.protocol}://${req.headers.host}`;

      const metadata: Record<string, string> = {};
      if (name) metadata.donor_name = name;
      if (email) metadata.donor_email = email;
      if (message) metadata.donor_message = message;

      const stripe = getStripe();

      if (recurring) {
        const product = await stripe.products.create({
          name: "Abraham's Daughters Monthly Donation",
        });
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: Math.round(amountNum * 100),
          currency: "usd",
          recurring: { interval: "month" },
        });

        const session = await stripe.checkout.sessions.create({
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [{ price: price.id, quantity: 1 }],
          success_url: `${baseUrl}/donate-success.html`,
          cancel_url: `${baseUrl}/donate-cancel.html`,
          customer_email: email || undefined,
          metadata,
        });

        res.json({ success: true, url: session.url });
      } else {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Donation to Abraham's Daughters",
                  description: "Thank you for supporting our mission",
                },
                unit_amount: Math.round(amountNum * 100),
              },
              quantity: 1,
            },
          ],
          success_url: `${baseUrl}/donate-success.html`,
          cancel_url: `${baseUrl}/donate-cancel.html`,
          customer_email: email || undefined,
          metadata,
        });

        res.json({ success: true, url: session.url });
      }
    } catch (error: any) {
      console.error("Stripe checkout error:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to create checkout session. Please try again.",
      });
    }
  });
  
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
