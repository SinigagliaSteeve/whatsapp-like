(function () {
    'use strict';

    angular.module('whatsapp', ['ionic', 'ngGuid', 'angularMoment', 'firebase',
        'whatsapp.controllers', 'whatsapp.services', 'whatsapp.config'])

        .run(function($ionicPlatform, $rootScope, $location, $state) {
            $rootScope.user = null;
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }

                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                // Authentication verification
                $rootScope.$on('$ionicView.beforeEnter', function(e, view) {
                    // si on est sur la page d'inscription ou de connexion alors on ne fait rien
                    if(view.stateId === 'inscription' || view.stateId === 'connexion') {
                        return;
                    }
                    // now, redirect only not authenticated
                    if($rootScope.user === null) {
                        e.preventDefault();
                        $state.go('connexion');
                    }
                });
            });
        })

        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            .state('connexion', {
                url: '/connexion',
                templateUrl: 'templates/connexion.html',
                controller: 'ConnexionCtrl'
            })

            .state('inscription', {
                url: '/inscription',
                templateUrl: 'templates/inscription.html',
                controller: 'InscriptionCtrl'
            })

            .state('newConversation', {
                url: '/newConversation',
                templateUrl: 'templates/newConversation.html',
                controller: 'NewConversationCtrl'
            })

            // Each tab has its own nav history stack:
            .state('tab.contacts', {
                url: '/contacts',
                views: {
                    'tab-contacts': {
                        templateUrl: 'templates/tab-contacts.html',
                        controller: 'ContactsCtrl'
                    }
                }
            })

            .state('tab.conversations', {
                url: '/conversations',
                views: {
                    'tab-conversations': {
                        templateUrl: 'templates/tab-conversations.html',
                        controller: 'ConversationsCtrl'
                    }
                }
            })

            .state('tab.conversation-detail', {
                url: '/conversations/:conversationId',
                views: {
                    'tab-conversations': {
                        templateUrl: 'templates/conversation-detail.html',
                        controller: 'ConversationDetailCtrl'
                    }
                }
            })

            .state('tab.parametres', {
                url: '/parametres',
                views: {
                    'tab-parametres': {
                        templateUrl: 'templates/tab-parametres.html',
                        controller: 'ParametresCtrl'
                    }
                }
            });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/tab/conversations');
        });
})();
