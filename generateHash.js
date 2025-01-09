const bcrypt = require("bcrypt");

const novaSenha = "cliente"; // Altere para a nova senha
bcrypt.hash(novaSenha, 10, (err, hash) => {
    if (err) {
        console.error("Erro ao gerar hash:", err);
    } else {
        console.log("Novo hash gerado:", hash);
    }
});
