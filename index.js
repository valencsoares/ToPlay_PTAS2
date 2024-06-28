require("dotenv").config();
const conn = require("./db/conn");

const handlebars = require("express-handlebars")
const express = require("express")

const Usuario = require("./models/Usuario.js")
const Cartao = require("./models/Cartao");
const Jogo = require("./models/Jogo");

Jogo.belongsToMany(Usuario, { through: "aquisicoes" });
Usuario.belongsToMany(Jogo, { through: "aquisicoes" });

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

//Ver cartões do usuário
app.get("/usuarios/:id/cartoes", async (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = await Usuario.findByPk(id, { include: ["Cartaos"] }); //buscar o usuario e traz todos os cartoes associado a ele
    
    let cartoes = usuario.Cartaos;
    cartoes = cartoes.map((cartao) => cartao.toJSON());

    res.render("cartoes", { 
        usuario: usuario.toJSON(), //converter p json
        cartoes,
     });
});
  
//Formulário de cadastro de cartão
app.get("/usuarios/:id/novoCartao", async (req, res) => {
    const id = parseInt(req.params.id);
  
    res.render("formCartao", { id });
});
  
//Cadastro de cartão
app.post("/usuarios/:id/novoCartao", async (req, res) => {
    const id = parseInt(req.params.id);
  
    const dadosCartao = {
      numero: req.body.numero,
      nome: req.body.nome,
      cvv: req.body.cvv,
      UsuarioId: id,
    };
  
    await Cartao.create(dadosCartao);
  
    res.redirect(`/usuarios/${id}/cartoes`);
});

//jogos
app.get("/jogos", async (req, res) => {
    const jogos = await Jogo.findAll({raw: true});
    res.render(`jogos`, {jogos})
})

app.get("/jogos/novo", (req, res) => {
    res.render(`formJogo`)
})

app.post("/jogos/novo", async (req, res) => {
    const dadosJogo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco,
    };
    const jogo = await Jogo.create(dadosJogo)
    res.send("Jogo inserido sob id " + jogo.id)
});

app.get("/jogos/:id/atualizar", async (req, res) => {
    const id = req.params.id;
    const jogo = await Jogo.findByPk(id, {raw: true});
    res.render(`formJogo`, {jogo});
}) 

app.post("/jogos/:id/atualizar", async (req, res) => {
    const id = req.params.id;

    const dadosJogo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco,
    };

    const registrosJogosAfetados = await Jogo.update(dadosJogo, {where: {id: id}}); 

    if (registrosJogosAfetados > 0){
        res.redirect("/jogos");
    } else {
        res.send("Erro ao atualizar o jogo!")
    }
}) 
app.post("/jogos/excluir", async (req, res) => {
    const id = req.body.id;
    const registrosJogosAfetados = await Jogo.destroy({where: {id: id}});

    if (registrosJogosAfetados > 0){
        res.redirect("/jogos");
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