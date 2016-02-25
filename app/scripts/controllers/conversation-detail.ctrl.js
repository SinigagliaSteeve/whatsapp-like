(function () {
    'use strict';

    function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv, Guid, $rootScope) {

        var conversationId = $stateParams.conversationId;
        var syncMessages;

        function messagesWatcher() {
            var messages = $scope.messages;
            var messagesArray = [];
            for (var key in messages) {
                if(key !== '$id' && key !== '$priority') {
                    messagesArray.push(messages[key]);
                }
           }
           $scope.messagesArray = messagesArray;
        }

        $scope.init = function() {
            syncMessages = ConversationDetailSrv.findAll(conversationId);
            syncMessages.$bindTo($scope, 'messages');

            ConversationsSrv.findOne(conversationId).then(function (conversation) {
                $scope.conversation = conversation;
            });
        };

        $scope.sentDateOrder = function(message) {
            var date = new Date(message.sentDate);
            return date;
        };

        $scope.sendMessage = function(message) {
            var newMessage = {
                _id: Guid.newGuid(),
                sender: $rootScope.user.firstName,
                text: message,
                sentDate: new Date().toString()
            };

            // save a new message
            syncMessages[newMessage._id] = newMessage;
            syncMessages.$save();

            $scope.message = null; // clear the message on the UI
        };

        $scope.$watch($scope.messages, messagesWatcher);

    }

    angular.module('whatsapp.controllers')
        .controller('ConversationDetailCtrl', ConversationDetailCtrl);

    ConversationDetailCtrl.$inject = ['$scope', '$stateParams', 'ConversationsSrv', 'ConversationDetailSrv', 'Guid', '$rootScope'];

})();
