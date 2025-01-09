const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({
    produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quantidade: { type: Number, required: true, default: 1 },
    dataCompra: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Compra || mongoose.model("Compra", compraSchema);
