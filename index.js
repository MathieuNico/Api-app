import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import authRoutes from "./Routes/auth.js";

// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();

// Créer une instance Sequelize avec les informations de la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données
  process.env.DB_USER, // Utilisateur de la base de données
  process.env.DB_PASSWORD, // Mot de passe de l'utilisateur
  {
    host: process.env.DB_HOST, // Hôte de la base de données
    dialect: "mysql", // Type de base de données
  }
);

// Middleware de vérification JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token manquant" });

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide" });
    req.user = decoded;
    next();
  });
};

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes d'authentification
app.use("/auth", authRoutes);

// Route publique
app.get("/", (req, res) => res.send("Bienvenue sur l'API"));

// Route protégée
app.post("/data", verifyToken, (req, res) => {
  res.json({ message: "Données protégées", user: req.user });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API en écoute sur le port ${PORT}`));

// Exporter Sequelize
export { sequelize };
