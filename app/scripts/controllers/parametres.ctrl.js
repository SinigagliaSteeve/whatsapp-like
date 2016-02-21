(function () {
    'use strict';

    function ParametresCtrl($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }

    angular.module('whatsapp.controllers')
        .controller('ParametresCtrl', ParametresCtrl);

    ParametresCtrl.$inject = ['$scope'];

})();
