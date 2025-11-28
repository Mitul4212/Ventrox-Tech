import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactInquirySchema,
  insertBlogPostSchema,
  insertPortfolioProjectSchema,
  insertPageViewSchema,
  defaultPortfolioProjects
} from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import MemoryStore from "memorystore";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const buf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(Buffer.from(hashed, "hex"), buf);
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const MemoryStoreSession = MemoryStore(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "ventrox-admin-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      store: new MemoryStoreSession({
        checkPeriod: 86400000,
      }),
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || null);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/admin/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, user: { id: (req.user as any).id, username: (req.user as any).username } });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.logout(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    if (req.isAuthenticated() && req.user) {
      res.json({ success: true, user: { id: (req.user as any).id, username: (req.user as any).username } });
    } else {
      res.status(401).json({ success: false, message: "Not authenticated" });
    }
  });

  app.post("/api/admin/setup", async (req, res) => {
    try {
      const existingAdmin = await storage.getUserByUsername("admin");
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: "Admin already exists" });
      }

      const hashedPassword = await hashPassword("admin123");
      await storage.createUser({ username: "admin", password: hashedPassword });

      const existingProjects = await storage.getPortfolioProjects();
      if (existingProjects.length === 0) {
        for (const project of defaultPortfolioProjects) {
          await storage.createPortfolioProject(project);
        }
      }

      res.json({ success: true, message: "Admin setup complete. Default credentials: admin / admin123" });
    } catch (error) {
      console.error("Setup error:", error);
      res.status(500).json({ success: false, message: "Setup failed" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);

      res.status(201).json({
        success: true,
        message: "Thank you for your inquiry. We will get back to you soon!",
        data: {
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request.",
        });
      }
    }
  });

  app.get("/api/admin/inquiries", requireAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json({ success: true, data: inquiries });
    } catch (error) {
      console.error("Get inquiries error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch inquiries" });
    }
  });

  app.patch("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await storage.updateContactInquiryStatus(req.params.id, status);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Inquiry not found" });
      }
      res.json({ success: true, data: updated });
    } catch (error) {
      console.error("Update inquiry error:", error);
      res.status(500).json({ success: false, message: "Failed to update inquiry" });
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json({ success: true, data: posts });
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post || (!post.published && !req.isAuthenticated())) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
      res.json({ success: true, data: post });
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/admin/blog", requireAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(false);
      res.json({ success: true, data: posts });
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
        });
      } else {
        console.error("Create blog post error:", error);
        res.status(500).json({ success: false, message: "Failed to create blog post" });
      }
    }
  });

  app.patch("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    try {
      const updated = await storage.updateBlogPost(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
      res.json({ success: true, data: updated });
    } catch (error) {
      console.error("Update blog post error:", error);
      res.status(500).json({ success: false, message: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete blog post error:", error);
      res.status(500).json({ success: false, message: "Failed to delete blog post" });
    }
  });

  app.get("/api/portfolio", async (req, res) => {
    try {
      const projects = await storage.getPortfolioProjects();
      res.json({ success: true, data: projects });
    } catch (error: any) {
      console.error("Get portfolio error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch portfolio",
        error_details: error.message,
        stack: error.stack
      });
    }
  });

  app.post("/api/admin/portfolio", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPortfolioProjectSchema.parse(req.body);
      const project = await storage.createPortfolioProject(validatedData);
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
        });
      } else {
        console.error("Create portfolio error:", error);
        res.status(500).json({ success: false, message: "Failed to create project" });
      }
    }
  });

  app.patch("/api/admin/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const updated = await storage.updatePortfolioProject(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.json({ success: true, data: updated });
    } catch (error) {
      console.error("Update portfolio error:", error);
      res.status(500).json({ success: false, message: "Failed to update project" });
    }
  });

  app.delete("/api/admin/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePortfolioProject(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete portfolio error:", error);
      res.status(500).json({ success: false, message: "Failed to delete project" });
    }
  });

  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const validatedData = insertPageViewSchema.parse({
        path: req.body.path,
        referrer: req.body.referrer || null,
        userAgent: req.headers["user-agent"] || null,
      });
      await storage.trackPageView(validatedData);
      res.json({ success: true });
    } catch (error) {
      res.status(200).json({ success: true });
    }
  });

  app.get("/api/admin/analytics", requireAdmin, async (req, res) => {
    try {
      const [stats, total, inquiries] = await Promise.all([
        storage.getPageViewStats(),
        storage.getTotalPageViews(),
        storage.getContactInquiries(),
      ]);

      res.json({
        success: true,
        data: {
          pageViews: stats,
          totalViews: total,
          totalInquiries: inquiries.length,
          newInquiries: inquiries.filter(i => i.status === "new").length,
        },
      });
    } catch (error) {
      console.error("Get analytics error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch analytics" });
    }
  });

  return httpServer;
}
