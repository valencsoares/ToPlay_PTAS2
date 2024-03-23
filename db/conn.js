const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_database,
    process.env.DB_username,
    process.env.DB_password,
    {
        host: process.env.DB_host,
        port: process.env.DB_port,
        dialect: process.env.DB_dialect,
    }
);

module.exports = sequelize;