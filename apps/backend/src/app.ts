import express, { Request, Response } from "express";
import Parser from "rss-parser";

const app = express();
const PORT = 3000;

// Configurer Express
app.use(express.json());

// Récupérer le flux RSS
app.get("/rss", async (req: Request, res: Response) => {
  try {
    const parser = new Parser(); // Initialiser rss-parser
    const url = "https://api.blast-info.fr/rss_articles.xml"; // URL fixe
    const feed = await parser.parseURL(url); // Lire et analyser le flux RSS

    const articles = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      description: item.contentSnippet || item.description,
      pubDate: item.pubDate,
    }));

    res.json(articles); // Retourner les articles au frontend
  } catch (error) {
    console.error("Erreur lors de la récupération du flux RSS :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});

