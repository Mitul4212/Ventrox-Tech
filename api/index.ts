```typescript
export default async function handler(req: any, res: any) {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is missing in Vercel Environment Variables");
    }

    const { app, setup } = await import("../server/index");
    await setup();
    app(req, res);
  } catch (e: any) {
    console.error("Vercel Function Error:", e);
    // Return 200 so we can see the error in the browser
    res.status(200).json({ 
      status: "error",
      message: "Application failed to start",
      error_message: e.message, 
      stack: e.stack,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    });
  }
}
```
