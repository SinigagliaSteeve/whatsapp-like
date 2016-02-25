(function () {
    'use strict';

    function ContactsCtrl($scope, ContactsSrv) {

        // Custom watcher to convert an object to an array
        function contactsWatcher() {
            var contacts = $scope.contacts;
            var contactsArray = [];
            for (var key in contacts) {
                if(key !== '$id' && key !== '$priority') {
                    contactsArray.push(contacts[key]);
                }
           }
           $scope.contactsArray = contactsArray;
        }

        $scope.model = {};

        // Init the model
        $scope.init = function () {
            var syncObject = ContactsSrv.findAll();
            syncObject.$bindTo($scope, 'contacts');
        }

        // Custom filter which matches firstName and lastName based on the query provided
        $scope.searchContact = function (contact) {
            if($scope.model.queryContact !== undefined) {
                var query = $scope.model.queryContact.toLowerCase();
                return contact.firstName.toLowerCase().indexOf(query) > -1 || contact.lastName.toLowerCase().indexOf(query) > -1;
            } else {
                return true;
            }
        };

        $scope.$watch($scope.contacts, contactsWatcher);
    }

    angular.module('whatsapp.controllers')
        .controller('ContactsCtrl', ContactsCtrl);

    ContactsCtrl.$inject = ['$scope', 'ContactsSrv'];

})();
