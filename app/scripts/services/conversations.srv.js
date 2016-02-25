(function () {
    'use strict';

    // Conversations service
    function ConversationsSrv($q, Guid, FIREBASE_URL, $firebaseObject) {

        // Retrieves all conversations
        this.findAll = function () {
            var ref = new Firebase(FIREBASE_URL + 'conversations/');
            return $firebaseObject(ref);
        };

        // Find one conversation
        this.findOne = function(id) {
            var deferred = $q.defer();
            new Firebase(FIREBASE_URL + 'conversations/' + id)
                .once('value', function (snap) {
                    if(snap.exists()) {
                        deferred.resolve(snap.val());
                    } else {
                        deferred.reject('Conversation with id ' + id + ' not found');
                    }
                });
            return deferred.promise;
        };

        // Saves a conversation
        this.save = function(nom, description) {
            var newConversation = {
                _id: Guid.newGuid(),
                name: nom,
                description: description,
                creationDate: new Date().toString()
            };
            return newConversation;
        };
    }


    angular.module('whatsapp.services')
        .service('ConversationsSrv', ConversationsSrv);


    ConversationsSrv.$inject = ['$q', 'Guid', 'FIREBASE_URL', '$firebaseObject'];
})();
