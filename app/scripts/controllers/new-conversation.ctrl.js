(function () {
    'use strict';

    function NewConversationCtrl($scope, ConversationsSrv, $location) {

        var syncObject = ConversationsSrv.findAll();
        syncObject.$bindTo($scope, 'conversations');

        $scope.creerClick = function(nom, description) {
            var conversation = ConversationsSrv.save(nom, description);

            // save a new conversation
            syncObject[conversation._id] = conversation;
            syncObject.$save();

            $location.path('/conversations');
        };
    }

    angular.module('whatsapp.controllers')
        .controller('NewConversationCtrl', NewConversationCtrl);

    NewConversationCtrl.$inject = ['$scope', 'ConversationsSrv', '$location'];

})();
