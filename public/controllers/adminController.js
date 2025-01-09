app.controller("produtosController", function ($scope, $http, authService) {
    const token = authService.getToken();
    $scope.produtos = [];
    $scope.editingProduto = null;

    // Carregar produtos
    $scope.getProdutos = function () {
        $http.get("/api/produtos", { headers: { Authorization: `Bearer ${token}` } })
            .then(response => $scope.produtos = response.data)
            .catch(error => console.error("Erro ao carregar produtos:", error));
    };

    // Adicionar produto
    $scope.addProduto = function () {
        const newProduto = {
            nomeProduto: $scope.nomeProduto,
            preco: $scope.preco,
            categoria: $scope.categoria,
            stock: $scope.stock,
            descricao: $scope.descricao
        };
        $http.post("/api/produtos", newProduto, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                $scope.getProdutos();
                $scope.nomeProduto = $scope.preco = $scope.categoria = $scope.stock = $scope.descricao = "";
            })
            .catch(error => console.error("Erro ao adicionar produto:", error));
    };

    // Editar produto
    $scope.editarProduto = function (produto) {
        $scope.editingProduto = angular.copy(produto);
    };

    // Salvar edição do produto
    $scope.salvarProduto = function () {
        const produto = $scope.editingProduto;
        $http.put(`/api/produtos/${produto._id}`, produto, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                $scope.getProdutos();
                $scope.editingProduto = null;
            })
            .catch(error => console.error("Erro ao editar produto:", error));
    };

    // Deletar produto
    $scope.deleteProduto = function (id) {
        $http.delete(`/api/produtos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => $scope.getProdutos())
            .catch(error => console.error("Erro ao apagar produto:", error));
    };

    // Inicializar lista de produtos
    $scope.getProdutos();
});
