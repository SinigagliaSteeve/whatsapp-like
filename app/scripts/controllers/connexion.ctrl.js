(function () {
    'use strict';

    function ConnexionCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

        // Initialize contacts
        ContactsSrv.findAll().then(function (contacts) {
            $scope.contacts = contacts;
        });

        $scope.connexionClick = function(email, password) {
            $rootScope.user = ContactsSrv.checkAuthentication(email, password);
            if($rootScope.user !== null) {
                $location.path('/conversations');
            } else {
                // Show popup if authentication failed
                $ionicPopup.alert({
                    title: 'Erreur d\'authentification',
                    template: 'L\'adresse email et le mot de passe ne correspondent pas.'
                });
            }
        };

    }

    angular.module('whatsapp.controllers')
        .controller('ConnexionCtrl', ConnexionCtrl);

    ConnexionCtrl.$inject = ['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];

})();
