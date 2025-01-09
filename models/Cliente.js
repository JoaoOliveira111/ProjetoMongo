const mongoose = require("mongoose");

const EnderecoSchema = new mongoose.Schema({
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    cidade: { type: String, required: true }
});

const ClienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: EnderecoSchema, required: true }
});

module.exports = mongoose.model("Cliente", ClienteSchema);
