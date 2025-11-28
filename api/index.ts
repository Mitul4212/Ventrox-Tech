```typescript
export default async function handler(req: any, res: any) {
  try {
    const { app, setup } = await import("../server/index");
    await setup();
    app(req, res);
  } catch (e: any) {
    console.error("Vercel Function Error:", e);
    res.status(500).json({ 
      error: "Internal Server Error", 
      message: "Failed to initialize application",
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
