(function () {
    'use strict';

    function NewConversationCtrl($scope, ConversationsSrv, $location) {
        $scope.creerClick = function(nom, description) {
            ConversationsSrv.save(nom, description);
            $location.path('/conversations');
        };
    }

    angular.module('whatsapp.controllers')
        .controller('NewConversationCtrl', NewConversationCtrl);

    NewConversationCtrl.$inject = ['$scope', 'ConversationsSrv', '$location'];

})();
