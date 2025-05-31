import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all media content
  app.get("/api/media", async (req, res) => {
    try {
      const media = await storage.getAllMedia();
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  // Get media by ID
  app.get("/api/media/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid media ID" });
      }
      
      const media = await storage.getMediaById(id);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }
      
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  // Get featured media
  app.get("/api/media/featured", async (req, res) => {
    try {
      const featuredMedia = await storage.getFeaturedMedia();
      if (!featuredMedia) {
        return res.status(404).json({ message: "No featured media found" });
      }
      
      res.json(featuredMedia);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured media" });
    }
  });

  // Get media by category
  app.get("/api/media/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const media = await storage.getMediaByCategory(category);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media by category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
