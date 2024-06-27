const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");

const Jogo = sequelize.define("Jogo", {
    titulo: {
        type: DataTypes.STRING,
        required: false,
    },
    descricao: {
        type: DataTypes.STRING,
        required: true,
    },
    preco: {
        type: DataTypes.DOUBLE,
        required: true,
    },
})

module.exports = Jogo;