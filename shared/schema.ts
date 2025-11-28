import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
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

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;

export const services = [
  {
    id: "app-development",
    title: "Application Development",
    shortDescription: "Custom mobile and desktop applications built with cutting-edge technologies.",
    fullDescription: "We craft powerful, scalable applications that transform your business ideas into reality. From native iOS and Android apps to cross-platform solutions, our expert team delivers exceptional user experiences.",
    icon: "Smartphone",
    features: [
      "Native iOS & Android Development",
      "Cross-Platform Solutions (React Native, Flutter)",
      "Progressive Web Applications",
      "Enterprise Application Development",
      "App Store Optimization",
      "Continuous Integration & Deployment"
    ],
    benefits: [
      "Increased user engagement",
      "Seamless cross-device experience",
      "Scalable architecture",
      "Enhanced security protocols"
    ],
    process: [
      { step: 1, title: "Discovery", description: "Understanding your vision and requirements" },
      { step: 2, title: "Planning", description: "Creating detailed roadmap and architecture" },
      { step: 3, title: "Design", description: "Crafting intuitive UI/UX experiences" },
      { step: 4, title: "Development", description: "Building with modern tech stack" },
      { step: 5, title: "Testing", description: "Rigorous QA and performance optimization" },
      { step: 6, title: "Launch", description: "Deployment and ongoing support" }
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Node.js", "PostgreSQL"]
  },
  {
    id: "web-development",
    title: "Website Development",
    shortDescription: "Modern, responsive websites that captivate and convert visitors.",
    fullDescription: "We build stunning websites that not only look amazing but perform exceptionally. Our web solutions are optimized for speed, SEO, and user engagement, ensuring your online presence stands out.",
    icon: "Globe",
    features: [
      "Custom Website Design",
      "E-commerce Solutions",
      "Content Management Systems",
      "API Development & Integration",
      "Performance Optimization",
      "SEO-Ready Architecture"
    ],
    benefits: [
      "Lightning-fast load times",
      "Mobile-first responsive design",
      "Enhanced search visibility",
      "Improved conversion rates"
    ],
    process: [
      { step: 1, title: "Research", description: "Analyzing market and competitors" },
      { step: 2, title: "Strategy", description: "Defining goals and user journeys" },
      { step: 3, title: "Wireframing", description: "Creating structural blueprints" },
      { step: 4, title: "Development", description: "Coding with best practices" },
      { step: 5, title: "Optimization", description: "Speed and SEO enhancement" },
      { step: 6, title: "Launch", description: "Go-live and maintenance" }
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"]
  },
  {
    id: "ai-automation",
    title: "AI Automation Solutions",
    shortDescription: "Intelligent automation that revolutionizes your business processes.",
    fullDescription: "Harness the power of artificial intelligence to automate workflows, gain insights, and make data-driven decisions. Our AI solutions are tailored to your specific business challenges.",
    icon: "Brain",
    features: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Predictive Analytics",
      "Intelligent Chatbots",
      "Process Automation",
      "Computer Vision Solutions"
    ],
    benefits: [
      "Reduced operational costs",
      "24/7 automated operations",
      "Data-driven insights",
      "Competitive advantage"
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluating automation opportunities" },
      { step: 2, title: "Data Analysis", description: "Understanding your data landscape" },
      { step: 3, title: "Model Design", description: "Architecting AI solutions" },
      { step: 4, title: "Training", description: "Building and training models" },
      { step: 5, title: "Integration", description: "Seamless system integration" },
      { step: 6, title: "Optimization", description: "Continuous improvement cycle" }
    ],
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "AWS"]
  }
] as const;

export type Service = typeof services[number];

export const portfolioProjects = [
  {
    id: "fintech-app",
    title: "NexaPay Financial Suite",
    industry: "FinTech",
    problem: "A leading financial institution needed a modern mobile banking solution to compete with digital-first banks.",
    solution: "We developed a comprehensive mobile banking app with biometric authentication, real-time transactions, and AI-powered financial insights.",
    outcome: "300% increase in mobile transactions, 4.8 app store rating, 1M+ downloads in first year.",
    techStack: ["React Native", "Node.js", "PostgreSQL", "AWS", "Plaid API"],
    image: "fintech"
  },
  {
    id: "healthcare-platform",
    title: "MediConnect Health Platform",
    industry: "Healthcare",
    problem: "A healthcare network struggled with patient engagement and appointment management across multiple facilities.",
    solution: "Built an integrated health platform with telemedicine, appointment scheduling, and secure patient portal.",
    outcome: "50% reduction in no-shows, 85% patient satisfaction score, seamless multi-facility coordination.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "WebRTC", "HIPAA Compliant"],
    image: "healthcare"
  },
  {
    id: "ecommerce-platform",
    title: "LuxeMarket Commerce",
    industry: "E-commerce",
    problem: "A luxury retail brand needed an online presence that matched their premium in-store experience.",
    solution: "Created a high-end e-commerce platform with 3D product visualization, AR try-on, and personalized recommendations.",
    outcome: "200% increase in online sales, 45% higher average order value, 60% return customer rate.",
    techStack: ["React", "Three.js", "Shopify Plus", "AI Recommendations", "CDN"],
    image: "ecommerce"
  },
  {
    id: "logistics-ai",
    title: "FleetIQ Logistics",
    industry: "Logistics",
    problem: "A logistics company faced inefficiencies in route planning and fleet management across 500+ vehicles.",
    solution: "Developed an AI-powered fleet management system with predictive maintenance and dynamic route optimization.",
    outcome: "30% fuel savings, 40% reduction in delivery times, 99.5% on-time delivery rate.",
    techStack: ["Python", "TensorFlow", "React", "IoT Sensors", "Google Maps API"],
    image: "logistics"
  },
  {
    id: "education-platform",
    title: "EduVerse Learning",
    industry: "EdTech",
    problem: "An educational institution needed to modernize their learning management and student engagement approach.",
    solution: "Built an immersive learning platform with gamification, adaptive learning paths, and real-time collaboration.",
    outcome: "40% improvement in course completion, 3x student engagement, adopted by 50+ institutions.",
    techStack: ["Vue.js", "Node.js", "PostgreSQL", "WebSocket", "ML Algorithms"],
    image: "education"
  }
] as const;

export type PortfolioProject = typeof portfolioProjects[number];
