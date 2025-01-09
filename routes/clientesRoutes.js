const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// Criar cliente (POST)
router.post("/", async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obter todos os clientes (GET)
router.get("/", async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar cliente (PUT)
router.put("/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
        res.status(200).json(cliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar cliente (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
        res.status(204).send(); // Retorna sem corpo
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
