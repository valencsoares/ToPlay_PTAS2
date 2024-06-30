const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const Jogo = require("./Jogo");

const aquisicao = sequelize.define("aquisicaos", {
    data: {
        type: DataTypes.STRING,
        required: false,
    },
    precoFinal: {
        type: DataTypes.DOUBLE,
        required: true,
    },
})

Jogo.belongsToMany(Usuario, { through: "aquisicaos" });
Usuario.belongsToMany(Jogo, { through: "aquisicaos" });

module.exports = aquisicao;