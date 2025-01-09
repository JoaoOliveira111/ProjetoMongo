const express = require("express");
const router = express.Router();
const Produto = require("../models/produtoModel");

// Rota para realizar uma compra
router.post("/", async (req, res) => {
    try {
        const { produtoId, quantidade } = req.body;

        // Validar quantidade
        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({ error: "Quantidade inválida." });
        }

        // Verificar se o produto existe e tem estoque suficiente
        const produto = await Produto.findById(produtoId);
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        if (produto.stock < quantidade) {
            return res.status(400).json({ error: "Estoque insuficiente para a compra." });
        }

        // Atualizar o estoque do produto
        produto.stock -= quantidade;
        await produto.save();

        res.status(200).json({ message: "Compra realizada com sucesso!", produto });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
