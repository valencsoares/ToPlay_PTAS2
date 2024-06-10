require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario.js")
const handlebars = require("express-handlebars")
const express = require("express")
const app = express()

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")

app.use(express.urlencoded({urlencoded: true,}));
app.use(express.json())

app.get("/usuarios/novo", (req, res) => {
    res.render(`formUsuario`)
})
app.get("/", (req, res) => {
    res.render(`home`)
})
app.listen(8000, () => {
    console.log("Aplicação rodando!")
})

conn.sync().then(() => {
    console.log("Conectado e sincronizado ao banco de dados com sucesso! XD");
}).catch((err) => {
    console.log("Ocorreu um erro: " + err)
});