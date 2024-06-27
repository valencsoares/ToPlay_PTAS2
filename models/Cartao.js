const db = require("../db/conn");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario");

const Cartao = db.define(
  "Cartao",
  {
    numero: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    tableName: "Cartoes", 
  }
);

Cartao.belongsTo(Usuario); //cada cartão pertence ao usuario
Usuario.hasMany(Cartao); //usuário tem vários cartão
//N para 1

module.exports = Cartao;
