(function () {
    'use strict';

    function ConnexionCtrl($scope, $rootScope, $location, ContactsSrv) {

        // Initialize contacts
        ContactsSrv.findAll().then(function (contacts) {
            $scope.contacts = contacts;
        });

        $scope.connexionClick = function(email, password) {
            // TODO check authentication via password
            $rootScope.user = ContactsSrv.findBy('email', email);
            if($rootScope !== null) {
                $location.path('/conversations');
            } else {
                // TODO handle authentication error
            }
        };

    }

    angular.module('whatsapp.controllers')
        .controller('ConnexionCtrl', ConnexionCtrl);

    ConnexionCtrl.$inject = ['$scope', '$rootScope', '$location', 'ContactsSrv'];

})();
