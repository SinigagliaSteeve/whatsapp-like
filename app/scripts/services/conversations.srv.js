(function () {
    'use strict';

    // Conversations service
    function ConversationsSrv($q, Guid, FIREBASE_URL, $firebaseArray) {

        // Returns the first property of an object
        function first(obj) {
            for (var a in obj) {
                return obj[a];
            }
        }

        // Retrieves all contacts
        this.findAll = function () {
            var ref = new Firebase(FIREBASE_URL + 'conversations/');
            return $firebaseArray(ref);
        };

        this.findOne = function(id) {
            var deferred = $q.defer();
            new Firebase(FIREBASE_URL + 'conversations/')
                .orderByChild('_id')
                .equalTo(id)
                .once('value', function (snap) {
                    if (snap.exists()) {
                        deferred.resolve(first(snap.val()));
                    } else {
                        deferred.reject('Conversation with id ' + id + ' not found');
                    }
                });
            return deferred.promise;
        };

        this.save = function(nom, description) {
            var newConversation = {
                _id: Guid.newGuid(),
                name: nom,
                description: description,
                creationDate: new Date()
            };
            return newConversation;
        };
    }


    angular.module('whatsapp.services')
        .service('ConversationsSrv', ConversationsSrv);


    ConversationsSrv.$inject = ['$q', 'Guid', 'FIREBASE_URL', '$firebaseArray'];
})();
