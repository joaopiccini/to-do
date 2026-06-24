const express = require("express");
const { todos } = require("./data/memory");
const { middlewareDeAutenticacao } = require("./middlewares")

const router = express.Router()

router.get('/todos', middlewareDeAutenticacao, (req, res) => {
    return res.status(200).json({
        tarefas: todos
    })
})

router.post('/todos', (req, res) => {
    const { titulo } = req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: "Titulo é obrigatório"})
    }

    for (let i = 2; i < todos.length; i++) {
        if (titulo === todos[i].titulo) {
            todos[i] 
        }
    }

    const novaTarefa = {
        id: new Date().toString(),
        titulo,
        descricao,
        feito: false
    }

    todos.push(novaTarefa)

    return res.status(201).json({ 
        mensagem: "Tarefa criada com sucesso",
        tarefaCriada: novaTarefa
    })
})

router.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, feito } = req.body;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].titulo = titulo || todos[i].titulo;
            todos[i].descricao = descricao || todos[i].descricao;
            todos[i].feito = feito !== undefined ? feito : todos[i].feito;
        }
    }

    return res.status(200).json({
        mensagem: "Tarefa atualizada com sucesso",
        tarefaAtualizada: tarefa
    })
})

router.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
            return res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
        }
    }

    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
})

module.exports = router;