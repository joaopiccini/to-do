const express = require("express");
const app = express();
const rotas = require("./routes");
const { conectarBancoDeDados } = require("./data/connection");
const { middlewareDeAutenticacao } = require("./middlewares");

conectarBancoDeDados()

app.use(express.json())

app.use(middlewareDeAutenticacao)

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

app.use("/", rotas)

app.listen(3000, () => {
    console.log("Servidor rodando!")
});