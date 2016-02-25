(function () {
    'use strict';

    function InscriptionCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

        var syncObject = ContactsSrv.findAll();
        syncObject.$bindTo($scope, 'contacts');

        // Handler when inscription button clicked
        $scope.inscriptionClick = function (prenom, nom, email, password) {
            if(prenom && nom && email && password) {
                $rootScope.user = ContactsSrv.save(prenom, nom, email, password);

                // save a new contact
                syncObject[$rootScope.user._id] = $rootScope.user;
                syncObject.$save();

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
