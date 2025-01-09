app.controller("authController", function ($scope, $http, $location, authService) {
    $scope.user = {}; // Objeto para os dados do login
    $scope.errorMessage = ""; // Inicializa a mensagem de erro

    // Função de login
    $scope.login = function () {
        authService
            .login($scope.user) // Chama o método de login do authService
            .then(function (response) {
                // Salva o token retornado no authService
                const token = response.token;
                authService.saveToken(token);

                // Decodifica o token para obter as informações do usuário
                const currentUser = authService.getCurrentUser();
                if (currentUser.role === "admin") {
                    $location.path("/admin"); // Redireciona para a página de admin
                } else {
                    $location.path("/produtos"); // Redireciona para a página de produtos
                }
            })
            .catch(function (error) {
                console.error("Erro ao fazer login:", error);
                $scope.errorMessage = "Login inválido. Verifique suas credenciais."; // Define mensagem de erro
            });
    };
});
