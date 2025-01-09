const app = angular.module("app", ["ngRoute"]); // Define o módulo principal

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "authController"
        })


        .when("/admin", {
            templateUrl: "views/admin.html",
            controller: "produtosController" // Alinhado com o HTML
        })

        .when("/adicionarCliente", {
            templateUrl: "/views/adicionarCliente.html",
            controller: "clientesController"
        })

        .when("/produtos", {
            templateUrl: "views/produtos.html",
            controller: "produtosController"
        })
        .otherwise({
            redirectTo: "/login"
        });




});
