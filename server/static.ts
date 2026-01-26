import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  const publicPath = path.resolve(import.meta.dirname, "..", "public");
  
  // Serve static files from public folder
  app.use(express.static(publicPath));

  // Handle HTML page requests - serve specific files or fall through to index.html
  app.use("/{*path}", (req, res) => {
    const requestPath = req.path;
    
    // If path ends with .html or is root, try to serve that file
    if (requestPath === "/" || requestPath === "/index.html") {
      res.sendFile(path.resolve(publicPath, "index.html"));
    } else if (requestPath.endsWith(".html")) {
      res.sendFile(path.resolve(publicPath, requestPath.slice(1)));
    } else {
      // For clean URLs without .html, try to find matching HTML file
      const htmlPath = path.resolve(publicPath, requestPath.slice(1) + ".html");
      res.sendFile(htmlPath, (err) => {
        if (err) {
          // Fall back to index.html for SPA-style routing
          res.sendFile(path.resolve(publicPath, "index.html"));
        }
      });
    }
  });
}
