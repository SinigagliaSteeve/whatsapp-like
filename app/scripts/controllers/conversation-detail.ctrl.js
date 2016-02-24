(function () {
    'use strict';

    function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv, Guid, $rootScope) {
        var conversationId = $stateParams.conversationId;
        $scope.conversation = ConversationsSrv.findOne(conversationId);

        ConversationDetailSrv.findAll(conversationId).then(function(messages) {
            $scope.messages = messages;
        });

        $scope.sendMessage = function(message) {
            var newMessage = {
                _id: Guid.newGuid(),
                sender: $rootScope.user.firstName,
                text: message,
                sentDate: new Date()
            };

            $scope.messages.push(newMessage);
            $scope.message = null; // clear the message on the UI
        };
    }

    angular.module('whatsapp.controllers')
        .controller('ConversationDetailCtrl', ConversationDetailCtrl);

    ConversationDetailCtrl.$inject = ['$scope', '$stateParams', 'ConversationsSrv', 'ConversationDetailSrv', 'Guid', '$rootScope'];

})();
