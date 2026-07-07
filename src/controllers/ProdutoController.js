const { Produto } = require("../models/Produto");

class ProdutoController {
    async pegarTodos(req, res) {
        const produtos = await new Produto().pegarTodos()

        return res.status(200).json({
            produtos
        })
        
    }
}

module.exports = {
    ProdutoController
}