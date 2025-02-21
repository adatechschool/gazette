import { MikroORM } from "@mikro-orm/postgresql";
import express, { Request, Response } from "express";
import Parser from "rss-parser";
import { User } from "./modules/user.entity.js";
import { Media } from "./modules/media.entity.js";
import { Content } from "./modules/content.entity.js";

async function testConnection() {
  try {
    const orm = await MikroORM.init({
    dbName: process.env.DB_NAME || 'gazette_db',
	  host: process.env.DB_HOST,
	  port: parseInt(process.env.DB_PORT || '5432'),
	  user: process.env.DB_USER || 'postgres',
	  password: process.env.DB_PASSWORD,
    entities: [ User],
      debug: true
    });
    
    console.log('Connected successfully!');
    await orm.close();
  } catch (error) {
    console.error('Connection error:', error);
  }
}

testConnection();

//const app = express();
//const PORT = 3000;

// Configurer Express
//app.use(express.json());

// initialize the ORM, loading the config file dynamically
//const orm = await MikroORM.init();
// create new user entity instance
//const user = new User();
//user.email = 'foo@bar.com';
//user.pseudo = 'Foo Bar';
//user.password = '123456';

// first mark the entity with `persist()`, then `flush()`
//await orm.em.persist(user).flush();

// after the entity is flushed, it becomes managed, and has the PK available
//console.log('user id is:', user.id);

// Récupérer le flux RSS
//app.get("/rss", async (req: Request, res: Response) => {
  //try {
    //const parser = new Parser(); // Initialiser rss-parser
    //const url = "https://api.blast-info.fr/rss_articles.xml"; // URL fixe
    //const feed = await parser.parseURL(url); // Lire et analyser le flux RSS

    //const articles = feed.items.map((item) => ({
      //title: item.title,
      //link: item.link,
      //description: item.contentSnippet || item.description,
      //pubDate: item.pubDate,
    //}));

    //res.json(articles); // Retourner les articles au frontend
  //} catch (error) {
    //console.error("Erreur lors de la récupération du flux RSS :", error);
    //res.status(500).json({ message: "Erreur serveur" });
 // }
//});

// Lancer le serveur
//app.listen(PORT, () => {
  //console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
//});

