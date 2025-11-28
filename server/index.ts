import { app, httpServer, setup, log } from "./app";
import { serveStatic } from "./static";
import { fileURLToPath } from "url";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  setup().then(async () => {
    if (process.env.NODE_ENV === "production") {
      try {
        serveStatic(app);
      } catch (e) {
        console.warn("Failed to serve static files:", e);
      }
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      {
        port,
        host: "localhost",
      },
      () => {
        log(`serving on port ${port}`);
      },
    );
  });
}

export { app, setup };
