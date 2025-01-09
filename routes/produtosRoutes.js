const express = require("express");
const router = express.Router();
const Produto = require("../models/ProdutoModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Obter todos os produtos
router.get("/", authMiddleware(), async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Criar um produto
router.post("/", authMiddleware("admin"), async (req, res) => {
    try {
        const { nomeProduto, preco, categoria, stock, descricao } = req.body;

        const produto = new Produto({ nomeProduto, preco, categoria, stock, descricao });
        await produto.save();

        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Atualizar um produto
router.put("/:id", authMiddleware("admin"), async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Deletar um produto
router.delete("/:id", authMiddleware("admin"), async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
