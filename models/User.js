import { Sequelize, DataTypes } from "sequelize"; // Utilisation correcte de DataTypes
import sequelize from "../database/connection.js"; // Assure-toi que le chemin est correct

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
