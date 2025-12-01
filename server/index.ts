import "dotenv/config";
import { app, httpServer, setup, log } from "../api/lib/app.js";
import { serveStatic } from "./static.js";
setup().then(async () => {
  if (process.env.NODE_ENV === "production") {
    try {
      serveStatic(app);
    } catch (e) {
      console.warn("Failed to serve static files:", e);
    }
  } else {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
});

export { app, setup };
