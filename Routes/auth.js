import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// Importer ton modèle User (ajuste le chemin en fonction de l'emplacement de ton fichier)
import User from "../models/User.js";

const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'inscription" });
  }
});

// Route de connexion
router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

// Exporter le routeur avec 'export default'
export default router;
