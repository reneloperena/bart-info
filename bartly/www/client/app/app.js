var app = angular.module('bart', ['ionic', 'stations', 'navbar', 'details']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config( function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/stationList');

  $stateProvider
    .state('stationList', {
      url : '/stationList',
      controller: 'listController',
      templateUrl: 'client/app/main/stationList.html'
    })
    .state('details', {
      url : '/details',
      controller: 'detailsController',
      templateUrl: 'client/app/details/details.html'
    });
});

app.controller( 'mainController', function($scope) {
  screen.unlockOrientation();
});

