const { Router } = require("express");
const { ProdutoController } = require("../controllers/ProdutoController");

const router = Router();

router.get("/produtos", new ProdutoController().pegarTodos)

module.exports = {
    router
}