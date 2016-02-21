(function () {
    'use strict';

    function ContactsCtrl($scope, ContactsSrv) {
        ContactsSrv.findAll().then(function (contacts) {
            $scope.contacts = contacts;
        });
    }

    angular.module('whatsapp.controllers')
        .controller('ContactsCtrl', ContactsCtrl);

    ContactsCtrl.$inject = ['$scope', 'ContactsSrv'];

})();
