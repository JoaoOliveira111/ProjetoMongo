app.controller("produtosController", function ($scope, $http, authService) {
    const token = authService.getToken();
    $scope.produtos = [];
    $scope.editingProduto = null;

    // Carregar produtos
    $scope.getProdutos = function () {
        $http.get("/api/produtos", { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                $scope.produtos = response.data;
            })
            .catch((error) => {
                console.error("Erro ao carregar produtos:", error);
            });
    };

    // Adicionar produto
    $scope.addProduto = function () {
        const newProduto = {
            nomeProduto: $scope.novoProduto.nomeProduto,
            preco: $scope.novoProduto.preco,
            categoria: $scope.novoProduto.categoria,
            stock: $scope.novoProduto.stock,
            descricao: $scope.novoProduto.descricao,
        };

        $http.post("/api/produtos", newProduto, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                $scope.getProdutos(); // Atualiza a lista de produtos
                $scope.resetFormulario(); // Reseta o formulário
            })
            .catch((error) => {
                console.error("Erro ao adicionar produto:", error);
                // Melhorar o tratamento de erro
                if (error.data && error.data.message) {
                    alert(`Erro ao adicionar produto: ${error.data.message}`);
                }
            });
    };

    // Iniciar edição do produto
    $scope.editarProduto = function (produto) {
        $scope.editingProduto = angular.copy(produto); // Cria uma cópia do produto para edição
    };

    // Salvar alterações do produto
    $scope.salvarProduto = function () {
        const produto = $scope.editingProduto;

        $http.put(`/api/produtos/${produto._id}`, produto, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                $scope.getProdutos(); // Atualiza a lista de produtos
                $scope.editingProduto = null; // Cancela o estado de edição
            })
            .catch((error) => {
                console.error("Erro ao editar produto:", error);
            });
    };

    // Cancelar edição
    $scope.cancelarEdicao = function () {
        $scope.editingProduto = null; // Reseta o estado de edição
    };

    // Resetar o formulário
    $scope.resetFormulario = function () {
        $scope.novoProduto = {
            nomeProduto: "",
            preco: "",
            categoria: "",
            stock: "",
            descricao: ""
        };
    };

    // Deletar produto
    $scope.deleteProduto = function (id) {
        $http.delete(`/api/produtos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                $scope.getProdutos(); // Atualiza a lista de produtos
            })
            .catch((error) => {
                console.error("Erro ao apagar produto:", error);
            });
    };

    // Comprar produto
    $scope.comprarProduto = function (produto) {
        const compra = {
            produtoId: produto._id,
            quantidade: 1, // Quantidade padrão
        };

        $http.post("/api/compras", compra, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                alert(
                    `Produto "${produto.nomeProduto}" comprado com sucesso! Valor: ${produto.preco.toFixed(2)} €`
                );
                $scope.getProdutos(); // Atualiza a lista para refletir o estoque
            })
            .catch((error) => {
                if (error.data?.error) {
                    alert(`Erro: ${error.data.error}`);
                } else {
                    console.error("Erro ao comprar produto:", error);
                }
            });
    };

    // Inicializar lista de produtos
    $scope.getProdutos();
});
