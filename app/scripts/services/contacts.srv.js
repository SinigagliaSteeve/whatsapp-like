(function () {
    'use strict';

    // Contacts service
    function ContactsSrv($http, $q, Guid, FIREBASE_URL, $firebaseObject) {

        // Retrieves all contacts
        this.findAll = function () {
            var ref = new Firebase(FIREBASE_URL + 'contacts/');
            return $firebaseObject(ref);
        };

        // Returns the first property of an object
        function first(obj) {
            for (var a in obj) {
                return obj[a];
            }
        }

        // Checks authentication of an user
        this.checkAuthentication = function (email, password) {
            var deferred = $q.defer();
            new Firebase(FIREBASE_URL + 'contacts/')
                .orderByChild('email')
                .equalTo(email)
                .once('value', function (snap) {
                    var user = snap.val();
                    if(user && first(user).password === password) {
                        deferred.resolve(first(user));
                    } else {
                        deferred.reject('Authentication failed');
                    }
                });
            return deferred.promise;
        };

        this.save = function (prenom, nom, email, password) {
            var newContact = {
                _id: Guid.newGuid(),
                firstName: prenom,
                lastName: nom,
                email: email,
                password: password
            };

            return newContact;
        };
    }

    angular.module('whatsapp.services')
        .service('ContactsSrv', ContactsSrv);

    ContactsSrv.$inject = ['$http', '$q', 'Guid', 'FIREBASE_URL', '$firebaseObject'];

})();
