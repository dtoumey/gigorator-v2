'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router',
    'ngTagsInput'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('shows');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('bands', {
        url: '/bands',
        controller: 'BandsCtrl as bandsCtrl',
        templateUrl: 'bands/index.html',
        resolve: {
          bands: function ($state, Auth, Bands){
            return Auth.$requireAuth().then(function(auth){
              return Bands.all.$loaded();
            }, 
            function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('bandDetail', {
        url: '/bands/{bandId}/detail',
        templateUrl: 'bands/detail.html',
        controller: 'BandDetailCtrl as bandDetailCtrl',
        resolve: {
          band: function($state, $stateParams, Auth, Bands){
            return Auth.$requireAuth().then(function(auth){
              return Bands.byId($stateParams.bandId).$loaded();
            }, 
            function(error){
              $state.go('home');
            });
          },
          showsPlayed: function($stateParams, Auth, Shows){
            return Auth.$requireAuth().then(function(auth){
              return Shows.playedWithBand($stateParams.bandId);
            });
          }
        }
      })
      .state('shows', {
        url: '/shows',
        controller: 'ShowsCtrl as showsCtrl',
        templateUrl: 'shows/index.html',
        resolve: {
          shows: function ($state, Auth, Shows){
            return Auth.$requireAuth().then(function(auth){
              return Shows.all.$loaded();
            }, 
            function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('shows.create', {
        url: '/create',
        templateUrl: 'shows/create.html',
        controller: 'ShowsCtrl as showsCtrl'
      })
      .state('showDetail', {
        url: '/shows/{showId}/detail',
        templateUrl: 'shows/detail.html',
        controller: 'ShowDetailCtrl as showDetailCtrl',
        resolve: {
          showDetail: function($state, $stateParams, Auth, ShowDetail){
            return Auth.$requireAuth().then(function(auth){
              return ShowDetail.forShow($stateParams.showId).$loaded();
            }, 
            function(error){
              $state.go('home');
            });
          },
          otherBands: function($stateParams, ShowDetail, Auth){
            return Auth.$requireAuth().then(function(auth){
              return ShowDetail.bandsForShow($stateParams.showId).$loaded();
            });
          }
        }
      })
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as channelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: {
          channels: function (Channels){
            return Channels.$loaded();
          },
          profile: function($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if (profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'
      })
      .state('channels.messages', {
        url: '/{channelId}/messages',
        templateUrl: 'channels/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',
        resolve: {
          messages: function($stateParams, Messages){
            return Messages.forChannel($stateParams.channelId).$loaded();
          },
          channelName: function($stateParams, channels){
            return '#'+channels.$getRecord($stateParams.channelId).name;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://the-gigorator.firebaseio.com/');
