(function () {
    'use strict';

    function ConnexionCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

        // Handler when connexion button clicked
        $scope.connexionClick = function (email, password) {
            ContactsSrv.checkAuthentication(email, password).then(function (user) {
                $rootScope.user = user;
                $location.path('/conversations');
            }).catch(function () {
                $ionicPopup.alert({
                    title: 'Erreur d\'authentification',
                    template: 'L\'adresse email et le mot de passe ne correspondent pas.'
                });
            });
        };

    }

    angular.module('whatsapp.controllers')
        .controller('ConnexionCtrl', ConnexionCtrl);

    ConnexionCtrl.$inject = ['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];

})();
