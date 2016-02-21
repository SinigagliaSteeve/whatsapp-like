(function () {
    'use strict';

    function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv) {
        $scope.conversation = ConversationsSrv.findOne($stateParams.conversation);
    }

    angular.module('whatsapp.controllers')
        .controller('ConversationDetailCtrl', ConversationDetailCtrl);

    ConversationDetailCtrl.$inject = ['$scope', '$stateParams', 'ConversationsSrv'];

})();
