(function () {
    'use strict';

    // Conversation detail service
    function ConversationDetailSrv($http) {

        function loadMessages(conversationId) {
            return $http.get('data/messages.json').then(function (response) {
                var conversationsDetail = response.data;
                for(var i=0; i<conversationsDetail.length; i++) {
                    if(conversationsDetail[i].conversationId === conversationId) {
                        return conversationsDetail[i].messages;
                    }
                    return null;
                }
            }, function (response) {
                console.log('Erreur messages.json : ' + response.status);
            });
        }

        this.findAll = function(conversationId) {
            return loadMessages(conversationId);
        };
    }

    angular.module('whatsapp.services')
        .service('ConversationDetailSrv', ConversationDetailSrv);

    ConversationDetailSrv.$inject = ['$http'];
})();
