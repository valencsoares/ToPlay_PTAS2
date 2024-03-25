const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");

const Usuario = sequelize.define("Usuario", {
    nickname: {
        type: DataTypes.STRING,
        required: false,
    },
    nome: {
        type: DataTypes.STRING,
        required: true,
    },
})

module.exports = Usuario;