require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario.js")

conn.sync().then(() => {
    console.log("Conectado e sincronizado ao bando de dados! :)");
}).catch((err) => {
    console.log("Ocorreu um erro: " + err)
});