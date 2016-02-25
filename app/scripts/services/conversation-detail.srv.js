(function () {
    'use strict';

    // Conversation detail service
    function ConversationDetailSrv($q, FIREBASE_URL, $firebaseArray) {

        // Returns the first property of an object
        function first(obj) {
            for (var a in obj) {
                return obj[a];
            }
        }

        this.findAll = function(conversationId) {
            var ref = new Firebase(FIREBASE_URL + 'messages/')
                .orderByChild('conversationId')
                .equalTo(conversationId);
            return $firebaseArray(ref);
        };
    }

    angular.module('whatsapp.services')
        .service('ConversationDetailSrv', ConversationDetailSrv);

    ConversationDetailSrv.$inject = ['$q', 'FIREBASE_URL', '$firebaseArray'];
})();
