(function () {
    'use strict';

    // Contacts service
    function ContactsSrv($http, $q, Guid) {
        var contacts;

        function loadContacts() {
            console.log(contacts);
            if(!contacts) {
                return $http.get('data/contacts.json').then(function (response) {
                    contacts = response.data;
                    return contacts;
                }, function (response) {
                    console.log('Erreur contacts.json : ' + response.status);
                });
            } else {
                var c = $q.defer();
                c.resolve(contacts);
                return c.promise;
            }
        }

        // Retrieves all contacts
        this.findAll = function() {
            return loadContacts();
        };

        // Retrieves a contact by the value of a property
        this.findBy = function(property, value) {
            for(var i=0; i < contacts.length; i++) {
                if(contacts[i][property] === value) {
                    return contacts[i];
                }
            }
            return null;
        };

        // Checks authentication of an user
        this.checkAuthentication = function(email, password) {
            for(var i=0; i < contacts.length; i++) {
                if(contacts[i].email === email && contacts[i].password === password) {
                    return contacts[i];
                }
            }
            return null;
        };

        this.save = function(prenom, nom, email, password) {
            var newContact = {
                _id: Guid.newGuid(),
                firstName: prenom,
                lastName: nom,
                email: email,
                password: password
            };

            contacts.push(newContact);

            // TODO push newContact (cf Firebase)

            return newContact;

        };
    }

    angular.module('whatsapp.services')
        .service('ContactsSrv', ContactsSrv);

    ContactsSrv.$inject = ['$http', '$q', 'Guid'];

})();
