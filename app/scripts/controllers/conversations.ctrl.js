(function () {
    'use strict';

    function ConversationsCtrl($scope, ConversationsSrv) {

        // Custom watcher to convert an object to an array
        function conversationsWatcher() {
            var conversations = $scope.conversations;
            var conversationsArray = [];
            for (var key in conversations) {
                if(key !== '$id' && key !== '$priority') {
                    conversationsArray.push(conversations[key]);
                }
           }
           $scope.conversationsArray = conversationsArray;
        }

        $scope.init = function () {
            var syncObject = ConversationsSrv.findAll();
            syncObject.$bindTo($scope, 'conversations');
        }

        $scope.$watch($scope.conversations, conversationsWatcher);
    }

    angular.module('whatsapp.controllers')
        .controller('ConversationsCtrl', ConversationsCtrl);

    ConversationsCtrl.$inject = ['$scope', 'ConversationsSrv'];


})();
