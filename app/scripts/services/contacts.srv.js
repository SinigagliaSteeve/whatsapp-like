(function () {
    'use strict';

    // Contacts service
    function ContactsSrv($http, $q) {
        var contacts;

        // Retrieves all contacts
        this.findAll = function() {
            if(!contacts) {
                return $http.get('data/contacts.json').then(function (response) {
                    contacts = response.data;
                    return contacts;
                }, function (response) {
                    console.log(`Erreur contacts.json : ${response.status}`);
                });
            } else {
                return $q.resolve(contacts);
            }
        };
    }

    angular.module('whatsapp.services')
        .service('ContactsSrv', ContactsSrv);

    ContactsSrv.$inject = ['$http', '$q'];

})();
