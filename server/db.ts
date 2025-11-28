import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Sanitize the connection string to remove unsupported parameters for HTTP driver
const cleanUrl = process.env.DATABASE_URL.replace(/&channel_binding=require/, "").replace(/\?channel_binding=require&/, "?").replace(/\?channel_binding=require$/, "");

console.log("Initializing Neon HTTP driver...");
export const sql = neon(cleanUrl);
export const db = drizzle(sql, { schema });

