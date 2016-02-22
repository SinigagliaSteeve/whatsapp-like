(function () {
    'use strict';

    function ContactsCtrl($scope, ContactsSrv) {
        $scope.model = {};

        ContactsSrv.findAll().then(function (contacts) {
            $scope.contacts = contacts;
        });

        // Custom filter which matches firstName and lastName based on the query
        $scope.searchContact = function(contact) {
            if($scope.model.queryContact !== undefined) {
                var query = $scope.model.queryContact.toLowerCase();
                return contact.firstName.toLowerCase().indexOf(query) > -1 || contact.lastName.toLowerCase().indexOf(query) > -1;
            } else {
                return true;
            }
        };
    }

    angular.module('whatsapp.controllers')
        .controller('ContactsCtrl', ContactsCtrl);

    ContactsCtrl.$inject = ['$scope', 'ContactsSrv'];

})();
