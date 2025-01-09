const bcrypt = require("bcrypt");

const senhaOriginal = "cliente"; // Certifique-se de que é exatamente a mesma senha do generateHash.js
const senhaCriptografada = "$2b$10$gmjp58Pf0.yQWHaw8.GJ6ujJGlseD5Q7iVSE2L4ywtTkbBg8cohda"; // Cole o hash gerado

bcrypt.compare(senhaOriginal, senhaCriptografada, (err, result) => {
    if (err) {
        console.error("Erro ao comparar senhas:", err);
    } else if (result) {
        console.log("Senha válida!");
    } else {
        console.log("Senha inválida.");
    }
});
