(function () {
    'use strict';

    function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv, Guid, $rootScope) {
        var conversationId = $stateParams.conversationId;

        ConversationsSrv.findOne(conversationId).then(function (conversation) {
            $scope.conversation = conversation;

            $scope.messages = ConversationDetailSrv.findAll(conversationId);
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
