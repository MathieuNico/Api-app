import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement

// Créer une instance Sequelize avec les informations de la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données
  process.env.DB_USER, // Utilisateur de la base de données
  process.env.DB_PASSWORD, // Mot de passe de l'utilisateur
  {
    host: process.env.DB_HOST, // Hôte de la base de données (localhost ou une autre URL)
    dialect: "mysql", // Type de base de données
  }
);

// Vérifier la connexion
try {
  await sequelize.authenticate();
  console.log("Connexion à la base de données réussie !");
} catch (error) {
  console.error("Impossible de se connecter à la base de données :", error);
}

export default sequelize;
