var app = angular.module('bart',['ionic']);

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


app.factory('Stations', function($http){
  var getAll = function(){
    return $http({method:'GET', url:"http://localhost:8080/api/stations"});
  };

  var getSchedules = function(station){
    return $http({method:'GET', url:"http://localhost:8080/api/stations/"+station});
  };

  return { getAll:getAll, getSchedules:getSchedules};
});

app.controller('stationController', function(Stations,$scope){
  $scope.stations = [];
  $scope.currentStation = {};

  $scope.destinations = [];

  $scope.setCurrentStation = function(station){
    $scope.currentStation = station;

    $scope.destinations = Stations.getSchedules($scope.currentStation.id).then(function(resp){
      $scope.destinations = resp.data;
      console.log($scope.destinations);
    });
  }

  Stations.getAll().then(function(res){
    $scope.stations = res.data;
  });

});
