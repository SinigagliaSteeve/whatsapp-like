(function () {
    'use strict';

    function NewConversationCtrl($scope, ConversationsSrv, $location) {
        $scope.creerClick = function(nom, description) {
            var conversation = ConversationsSrv.save(nom, description);
            $scope.conversations.$add(conversation);
            $location.path('/conversations');
        };
    }

    angular.module('whatsapp.controllers')
        .controller('NewConversationCtrl', NewConversationCtrl);

    NewConversationCtrl.$inject = ['$scope', 'ConversationsSrv', '$location'];

})();
