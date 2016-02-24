(function () {
    'use strict';

    function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv, Guid, $rootScope) {
        var conversationId = $stateParams.conversationId;
        $scope.conversation = ConversationsSrv.findOne(conversationId);

        // FIXME load all conversations and messages here
        // TODO filter and get only messages of interest in the global array containing all conv and messages
        ConversationDetailSrv.findAll(conversationId).then(function(messages) {
            $scope.messages = messages;
        });

        $scope.sendMessage = function(message) {
            var newMessage = {
                _id: Guid.newGuid(),
                sender: $rootScope.user.email,
                text: message,
                sentDate: new Date()
            };

            $scope.messages.push(newMessage);
        };
    }

    angular.module('whatsapp.controllers')
        .controller('ConversationDetailCtrl', ConversationDetailCtrl);

    ConversationDetailCtrl.$inject = ['$scope', '$stateParams', 'ConversationsSrv', 'ConversationDetailSrv', 'Guid', '$rootScope'];

})();
