(function () {
    'use strict';

    // Controllers function
    function ContactsCtrl($scope, ContactsSrv) {
        ContactsSrv.findAll().then(function (contacts) {
            $scope.contacts = contacts;
        });
    }

    function ConversationsCtrl($scope, ConversationsSrv) {
        ConversationsSrv.findAll().then(function (conversations) {
            $scope.conversations = conversations;
        });
    }

    function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv) {
        $scope.conversation = ConversationsSrv.findOne($stateParams.conversation);
    }

    function ParametresCtrl($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }


    // Definition of angular module
    angular.module('whatsapp.controllers', ['whatsapp.services'])
        .controller('ContactsCtrl', ContactsCtrl)
        .controller('ConversationsCtrl', ConversationsCtrl)
        .controller('ConversationDetailCtrl', ConversationDetailCtrl)
        .controller('ParametresCtrl', ParametresCtrl);

    // Injection
    ContactsCtrl.$inject = ['$scope', 'ContactsSrv'];
    ConversationsCtrl.$inject = ['$scope', 'ConversationsSrv'];
    ConversationDetailCtrl.$inject = ['$scope', '$stateParams', 'ConversationsSrv'];
    ParametresCtrl.$inject = ['$scope'];

})();
