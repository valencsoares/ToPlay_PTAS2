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
app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll({raw: true});
    res.render(`usuarios`, {usuarios})
})

app.post("/usuarios/novo", async (req, res) => {
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };
    const usuario = await Usuario.create(dadosUsuario)
    res.send("Usuário inserido sob id " + usuario.id)
});

app.get("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id; /* params pq é de um get */
    const usuario = await Usuario.findByPk(id, {raw: true});
    res.render(`formUsuario`, {usuario});
})

app.post("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id;
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome, /* body pq está pegando dentro de um post */
    };

    const registrosAfetados = await Usuario.update(dadosUsuario, {where: {id: id}}); /* se não houver o where, ele deleta todos */

    if (registrosAfetados > 0){
        res.redirect("/usuarios");
    } else {
        res.send("Erro ao atualizar usuário!")
    }
})

app.post("/usuarios/excluir", async (req, res) => {
    const id = req.body.id;
    const registrosAfetados = await Usuario.destroy({where: {id: id}});

    if (registrosAfetados > 0){
        res.redirect("/usuarios");
    } else {
        res.send("Erro ao deletar usuário!")
    }
});

app.listen(8000, () => {
    console.log("Aplicação rodando!")
})

conn.sync().then(() => {
    console.log("Conectado e sincronizado ao banco de dados com sucesso! XD");
}).catch((err) => {
    console.log("Ocorreu um erro: " + err)
});