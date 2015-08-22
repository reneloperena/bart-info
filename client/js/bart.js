var app = angular.module('bart',[]);

app.factory('Stations', function($http){
  var getAll = function(){
    return $http({method:'GET', url:"/api/stations"});
  };

  var getSchedules = function(station){
    return $http({method:'GET', url:"/api/stations/"+station});
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