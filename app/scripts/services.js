(function () {
    'use strict';

    // Contacts service
    function ContactsSrv($http, $q) {
        var contacts;

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

    // Conversations service
    function ConversationsSrv($http, $q) {
        var conversations;

        /**
         * Get an entity by its id
         * @return the id if the entity exists, otherwise -1
         */
        function getConversationIndexFromId(conversations, id) {
            for (let i = 0; i < conversations.length; i++) {
                if(conversations[i]._id === id) {
                    return i;
                }
            }
            return -1;
        }

        this.findAll = function() {
            if(!conversations) {
                return $http.get('data/conversations.json').then(function (response) {
                    conversations = response.data;
                    return conversations;
                }, function (response) {
                    console.log(`Erreur conversations.json : ${response.status}`);
                });
            } else {
                return $q.resolve(conversations);
            }
        };

        this.findOne = function(id) {
            console.log(id);
            $http.get('data/conversations.json').then(function (response) {
                var conversations = response.data;
                return conversations[getConversationIndexFromId(conversations, id)];

            }, function (response) {
                console.log(`Erreur conversations.json : ${response.status}`);
            });
        };

        // FIXME move this to MessagesSrv
        // this.findOne = function(id) {
        //     $http.get('data/messages.json').then(function (response) {
        //         var messages = response.data;
        //         console.log(id);
        //         console.log(getConversationIndexFromId(messages, id));
        //         return messages[getConversationIndexFromId(messages, id)];
        //
        //     }, function (response) {
        //         console.log(`Erreur messages.json : ${response.status}`);
        //     });
        // };
    }

    // Define angular module
    angular.module('whatsapp.services', [])
    .service('ConversationsSrv', ConversationsSrv)
    .service('ContactsSrv', ContactsSrv);

    // Injection
    ContactsSrv.$inject = ['$http', '$q'];
    ConversationsSrv.$inject = ['$http', '$q'];
})();
