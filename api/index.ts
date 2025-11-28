```typescript
import { app, setup } from "../server/index";

export default async function handler(req: any, res: any) {
  try {
    await setup();
    app(req, res);
  } catch (e: any) {
    console.error("Vercel Function Error:", e);
    res.status(500).json({ 
      error: "Internal Server Error", 
      details: e.message, 
      stack: e.stack,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });
  }
}
```
