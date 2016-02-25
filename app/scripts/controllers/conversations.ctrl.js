(function () {
    'use strict';

    function ConversationsCtrl($rootScope, ConversationsSrv) {
        $rootScope.conversations = ConversationsSrv.findAll();
    }

    angular.module('whatsapp.controllers')
        .controller('ConversationsCtrl', ConversationsCtrl);

    ConversationsCtrl.$inject = ['$rootScope', 'ConversationsSrv'];

})();
