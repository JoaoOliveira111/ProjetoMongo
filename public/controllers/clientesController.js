app.controller("clientesController", function ($scope, $http) {
    $scope.clientes = []; // Lista de clientes
    $scope.novoCliente = { endereco: { rua: "", numero: "", cidade: "" } }; // Inicializa endereço vazio
    $scope.editingCliente = null; // Cliente em edição

    // Obter todos os clientes

    $scope.getClientes = function () {
        $http.get("/api/clientes")
            .then(function (response) {
                $scope.clientes = response.data; // Popula a lista de clientes
                console.log("Clientes carregados com sucesso.");
            })
            .catch(function (error) {
                console.error("Erro ao buscar clientes:", error);
                alert("Erro ao carregar clientes. Tente novamente mais tarde.");
            });
    };

    // Adicionar cliente
    $scope.adicionarCliente = function () {
        // Validação de campos obrigatórios no front-end
        if (!$scope.novoCliente.nome || !$scope.novoCliente.email || !$scope.novoCliente.telefone ||
            !$scope.novoCliente.endereco.rua || !$scope.novoCliente.endereco.numero || !$scope.novoCliente.endereco.cidade) {
            alert("Todos os campos obrigatórios devem ser preenchidos!");
            return;
        }

        // Enviar dados para o servidor
        $http.post("/api/clientes", $scope.novoCliente)
            .then(function (response) {
                $scope.clientes.push(response.data); // Atualiza a lista de clientes
                $scope.novoCliente = { endereco: { rua: "", numero: "", cidade: "" } }; // Limpa o formulário
                alert("Cliente adicionado com sucesso!");
            })
            .catch(function (error) {
                console.error("Erro ao adicionar cliente:", error);
                if (error.data && error.data.error) {
                    alert(`Erro ao adicionar cliente: ${error.data.error}`);
                } else {
                    alert("Erro ao adicionar cliente. Verifique os dados e tente novamente.");
                }
            });
    };

    // Iniciar edição do cliente
    $scope.editarCliente = function (cliente) {
        $scope.editingCliente = angular.copy(cliente); // Cria uma cópia do cliente para edição
    };

    // Salvar cliente editado
    $scope.salvarCliente = function () {
        if (!$scope.editingCliente.nome || !$scope.editingCliente.email || !$scope.editingCliente.telefone ||
            !$scope.editingCliente.endereco.rua || !$scope.editingCliente.endereco.numero || !$scope.editingCliente.endereco.cidade) {
            alert("Todos os campos obrigatórios devem ser preenchidos!");
            return;
        }

        $http.put(`/api/clientes/${$scope.editingCliente._id}`, $scope.editingCliente)
            .then(function (response) {
                const index = $scope.clientes.findIndex(c => c._id === $scope.editingCliente._id);
                $scope.clientes[index] = response.data; // Atualiza a lista de clientes
                $scope.editingCliente = null; // Reseta o formulário de edição
                alert("Cliente atualizado com sucesso!");
            })
            .catch(function (error) {
                console.error("Erro ao salvar cliente:", error);
                alert("Erro ao salvar cliente. Tente novamente.");
            });
    };

    // Cancelar edição
    $scope.cancelarEdicao = function () {
        $scope.editingCliente = null; // Cancela a edição
    };

    // Remover cliente
    $scope.removerCliente = function (id) {
        if (confirm("Tem certeza que deseja remover este cliente?")) {
            $http.delete(`/api/clientes/${id}`)
                .then(function () {
                    $scope.clientes = $scope.clientes.filter(c => c._id !== id); // Remove o cliente da lista
                    alert("Cliente removido com sucesso!");
                })
                .catch(function (error) {
                    console.error("Erro ao remover cliente:", error);
                    alert("Erro ao remover cliente. Tente novamente.");
                });
        }
    };

    // Inicializa a lista de clientes ao carregar o controlador
    $scope.getClientes();
});
