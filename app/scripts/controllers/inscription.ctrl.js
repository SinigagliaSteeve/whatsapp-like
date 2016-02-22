(function () {
    'use strict';

    function InscriptionCtrl($scope, $rootScope, $location, ContactsSrv) {

        ContactsSrv.findAll().then(function (contacts) {
            $scope.contacts = contacts;
        });

        $scope.inscriptionClick = function(prenom, nom, email, password) {
            $rootScope.user = ContactsSrv.save(prenom, nom, email, password);
            $location.path('/conversations');
        };

    }

    angular.module('whatsapp.controllers')
        .controller('InscriptionCtrl', InscriptionCtrl);

    InscriptionCtrl.$inject = ['$scope', '$rootScope', '$location', 'ContactsSrv'];

})();
