import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Sanitize the connection string to remove unsupported parameters for HTTP driver
const cleanUrl = process.env.DATABASE_URL
  ? process.env.DATABASE_URL.replace(/&channel_binding=require/, "").replace(/\?channel_binding=require&/, "?").replace(/\?channel_binding=require$/, "")
  : "";

console.log("Initializing Neon HTTP driver...");

let sql: any;
let db: any;

if (cleanUrl) {
  try {
    sql = neon(cleanUrl);
    db = drizzle(sql, { schema });
  } catch (e) {
    console.error("Failed to initialize database client:", e);
  }
} else {
  console.warn("DATABASE_URL is not set, db will be undefined");
}

export { sql, db };

