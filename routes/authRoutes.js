const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // Carregar variáveis de ambiente do arquivo .env

// Middleware para validar o corpo da requisição
const validateRequest = (fields) => (req, res, next) => {
    const missingFields = fields.filter((field) => !req.body[field]);
    if (missingFields.length) {
        return res.status(400).json({ error: `Campos obrigatórios: ${missingFields.join(", ")}` });
    }
    next();
};

// Rota para registrar usuário
router.post("/register", validateRequest(["username", "password", "role"]), async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Usuário já existe." });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "Usuário registrado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário: " + error.message });
    }
});

// Rota para login
router.post("/login", validateRequest(["username", "password"]), async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Usuário não encontrado." });
        }

        // Comparar a senha fornecida com a senha armazenada
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Senha inválida." });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "default_secret", // Usar valor padrão se JWT_SECRET não estiver definido
            { expiresIn: "1h" }
        );

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Erro ao realizar login: " + error.message });
    }
});

module.exports = router;
