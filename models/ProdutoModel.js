const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nomeProduto: { type: String, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    descricao: { type: String }
});

// Verifique se o modelo já foi registrado
module.exports = mongoose.models.Produto || mongoose.model("Produto", produtoSchema);
