(function () {
    'use strict';

    function InscriptionCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

        ContactsSrv.findAll().then(function (contacts) {
            $scope.contacts = contacts;
        });

        $scope.inscriptionClick = function(prenom, nom, email, password) {
            if(prenom && nom && email && password) {
                $rootScope.user = ContactsSrv.save(prenom, nom, email, password);
                $location.path('/conversations');
            } else {
                // Show popup if signin is not complete
                $ionicPopup.alert({
                    title: 'Erreur d\'inscription',
                    template: 'Un ou plusieurs champs ne sont pas renseignés.'
                });
            }
        };

    }

    angular.module('whatsapp.controllers')
        .controller('InscriptionCtrl', InscriptionCtrl);

    InscriptionCtrl.$inject = ['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];

})();