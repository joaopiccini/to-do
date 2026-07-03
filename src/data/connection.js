const sqlite3 = require("sqlite3");
const { open } = require("sqlite")

async function conectarBancoDeDados() {
    const conexaoAbertaComOBanco = await open({
        filename: "./src/data/banco.db",
        driver: sqlite3.Database
    });

    return conexaoAbertaComOBanco;
}

module.exports = {
    conectarBancoDeDados
}