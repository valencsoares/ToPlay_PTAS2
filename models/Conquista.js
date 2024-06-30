const db = require("../db/conn");
const { DataTypes } = require("sequelize");
const Jogo = require("./Jogo");

const Conquista = db.define(
  "Conquistas",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Conquistas", 
  }
);

Conquista.belongsTo(Jogo); 
Jogo.hasMany(Conquista);

module.exports = Conquista;