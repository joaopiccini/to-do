const express = require("express");
const rotas = require("./routes");
const { conectarBancoDeDados } = require("./db/connection");
const { middlewareDeAutenticacao } = require("./middlewares");

const app = express();

conectarBancoDeDados();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

app.use(middlewareDeAutenticacao);
app.use("/", rotas);

app.listen(3000, () => {
    console.log("Servidor rodando!");
});