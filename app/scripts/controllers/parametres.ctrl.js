(function () {
    'use strict';

    function ParametresCtrl($scope, $rootScope, $location) {

        $scope.deconnexion = function() {
            $rootScope.user = null;
            $location.path('/connexion');
        };

    }

    angular.module('whatsapp.controllers')
        .controller('ParametresCtrl', ParametresCtrl);

    ParametresCtrl.$inject = ['$scope', '$rootScope', '$location'];

})();
