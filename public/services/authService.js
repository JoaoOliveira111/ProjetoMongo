app.factory("authService", function ($http, $window) {
    const TOKEN_KEY = "auth-token"; // Nome da chave para armazenar o token

    // Salvar o token no localStorage
    const saveToken = (token) => {
        $window.localStorage.setItem(TOKEN_KEY, token);
    };

    // Obter o token do localStorage
    const getToken = () => {
        return $window.localStorage.getItem(TOKEN_KEY);
    };

    // Decodificar o token JWT
    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload;
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            return null;
        }
    };

    return {
        // Realizar login
        login: (credentials) => {
            return $http.post("/api/auth/login", credentials).then((response) => {
                const token = response.data.token;
                saveToken(token); // Salva o token no localStorage
                return response.data;
            });
        },
        // Logout
        logout: () => {
            $window.localStorage.removeItem(TOKEN_KEY);
        },
        // Obter o usuário atual a partir do token
        getCurrentUser: () => {
            const token = getToken();
            return token ? decodeToken(token) : null;
        },
        saveToken, // Disponibiliza o método para salvar o token
        getToken,  // Disponibiliza o método para obter o token
    };
});
