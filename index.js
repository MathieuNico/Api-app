const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

module.exports = sequelize;

dotenv.config();
const app = express();
app.use(express.json());

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

// Route publique
app.get("/", (req, res) => res.send("Bienvenue sur l'API"));

// Route protégée
app.get("/data", verifyToken, (req, res) => {
  res.json({ message: "Données protégées", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en écoute sur le port ${PORT}`));
