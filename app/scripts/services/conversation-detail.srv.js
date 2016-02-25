(function () {
    'use strict';

    // Conversation detail service
    function ConversationDetailSrv($q, FIREBASE_URL, $firebaseObject) {

        this.findAll = function (conversationId) {
            var ref = new Firebase(FIREBASE_URL + 'messages/' + conversationId);
            return $firebaseObject(ref);
        };
    }

    angular.module('whatsapp.services')
        .service('ConversationDetailSrv', ConversationDetailSrv);

    ConversationDetailSrv.$inject = ['$q', 'FIREBASE_URL', '$firebaseObject'];
})();
