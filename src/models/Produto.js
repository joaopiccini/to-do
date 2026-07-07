const { conectarBancoDeDados } = require("../db/connection");

class Produto {
    async pegarTodos() {
        const bancoDeDados = await conectarBancoDeDados();
        const produtos = await bancoDeDados.all("SELECT * FROM produtos");
        return produtos;
    }
}

module.exports = {
    Produto
}