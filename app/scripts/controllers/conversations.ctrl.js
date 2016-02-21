(function () {
    'use strict';

    function ConversationsCtrl($scope, ConversationsSrv) {
        ConversationsSrv.findAll().then(function (conversations) {
            $scope.conversations = conversations;
        });
    }

    angular.module('whatsapp.controllers')
        .controller('ConversationsCtrl', ConversationsCtrl);

    ConversationsCtrl.$inject = ['$scope', 'ConversationsSrv'];

})();
