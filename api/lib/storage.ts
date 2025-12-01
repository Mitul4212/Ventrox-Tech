import {
  users,
  contactInquiries,
  blogPosts,
  portfolioProjectsTable,
  pageViews,
  type User,
  type InsertUser,
  type ContactInquiry,
  type InsertContactInquiry,
  type BlogPost,
  type InsertBlogPost,
  type PortfolioProject,
  type InsertPortfolioProject,
  type PageView,
  type InsertPageView
} from "../../shared/schema.js";
import { db } from "./db.js";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
  getContactInquiry(id: string): Promise<ContactInquiry | undefined>;
  updateContactInquiryStatus(id: string, status: string): Promise<ContactInquiry | undefined>;

  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProject(id: string): Promise<PortfolioProject | undefined>;
  updatePortfolioProject(id: string, data: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined>;
  deletePortfolioProject(id: string): Promise<boolean>;

  trackPageView(view: InsertPageView): Promise<PageView>;
  getPageViewStats(): Promise<{ path: string; views: number }[]>;
  getTotalPageViews(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactInquiries: Map<string, ContactInquiry>;
  private blogPosts: Map<string, BlogPost>;
  private portfolioProjects: Map<string, PortfolioProject>;
  private pageViews: Map<number, PageView>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.contactInquiries = new Map();
    this.blogPosts = new Map();
    this.portfolioProjects = new Map();
    this.pageViews = new Map();
    this.currentId = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.id.toString() === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id.toString(), user);
    return user;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentId++;
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id,
      createdAt: new Date(),
      status: "new" // Default status
    };
    this.contactInquiries.set(id.toString(), newInquiry);
    return newInquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values()).sort((a, b) =>
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getContactInquiry(id: string): Promise<ContactInquiry | undefined> {
    return this.contactInquiries.get(id);
  }

  async updateContactInquiryStatus(id: string, status: string): Promise<ContactInquiry | undefined> {
    const inquiry = this.contactInquiries.get(id);
    if (!inquiry) return undefined;
    const updated = { ...inquiry, status };
    this.contactInquiries.set(id, updated);
    return updated;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentId++;
    const newPost: BlogPost = {
      ...post,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: post.published ?? false
    };
    this.blogPosts.set(id.toString(), newPost);
    return newPost;
  }

  async getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    if (publishedOnly) {
      posts = posts.filter(p => p.published);
    }
    return posts.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug);
  }

  async updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    const updated = { ...post, ...data, updatedAt: new Date() };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = this.currentId++;
    const newProject: PortfolioProject = { ...project, id, createdAt: new Date() };
    this.portfolioProjects.set(id.toString(), newProject);
    return newProject;
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values()).sort((a, b) => a.order - b.order);
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    return this.portfolioProjects.get(id);
  }

  async updatePortfolioProject(id: string, data: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const project = this.portfolioProjects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...data };
    this.portfolioProjects.set(id, updated);
    return updated;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    return this.portfolioProjects.delete(id);
  }

  async trackPageView(view: InsertPageView): Promise<PageView> {
    const id = this.currentId++;
    const newView: PageView = { ...view, id, timestamp: new Date() };
    this.pageViews.set(id, newView);
    return newView;
  }

  async getPageViewStats(): Promise<{ path: string; views: number }[]> {
    const stats = new Map<string, number>();
    for (const view of this.pageViews.values()) {
      stats.set(view.path, (stats.get(view.path) || 0) + 1);
    }
    return Array.from(stats.entries())
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views);
  }

  async getTotalPageViews(): Promise<number> {
    return this.pageViews.size;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [result] = await db.insert(contactInquiries).values(inquiry).returning();
    return result;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async getContactInquiry(id: string): Promise<ContactInquiry | undefined> {
    const [inquiry] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id));
    return inquiry || undefined;
  }

  async updateContactInquiryStatus(id: string, status: string): Promise<ContactInquiry | undefined> {
    const [updated] = await db
      .update(contactInquiries)
      .set({ status })
      .where(eq(contactInquiries.id, id))
      .returning();
    return updated || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [result] = await db.insert(blogPosts).values(post).returning();
    return result;
  }

  async getBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
    if (publishedOnly) {
      return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
    }
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const [result] = await db.insert(portfolioProjectsTable).values(project).returning();
    return result;
  }

  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return db.select().from(portfolioProjectsTable).orderBy(portfolioProjectsTable.order);
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    const [project] = await db.select().from(portfolioProjectsTable).where(eq(portfolioProjectsTable.id, id));
    return project || undefined;
  }

  async updatePortfolioProject(id: string, data: Partial<InsertPortfolioProject>): Promise<PortfolioProject | undefined> {
    const [updated] = await db
      .update(portfolioProjectsTable)
      .set(data)
      .where(eq(portfolioProjectsTable.id, id))
      .returning();
    return updated || undefined;
  }

  async deletePortfolioProject(id: string): Promise<boolean> {
    await db.delete(portfolioProjectsTable).where(eq(portfolioProjectsTable.id, id));
    return true;
  }

  async trackPageView(view: InsertPageView): Promise<PageView> {
    const [result] = await db.insert(pageViews).values(view).returning();
    return result;
  }

  async getPageViewStats(): Promise<{ path: string; views: number }[]> {
    const result = await db
      .select({
        path: pageViews.path,
        views: sql<number>`count(*)::int`,
      })
      .from(pageViews)
      .groupBy(pageViews.path)
      .orderBy(desc(sql`count(*)`));
    return result;
  }

  async getTotalPageViews(): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(pageViews);
    return result?.count || 0;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
