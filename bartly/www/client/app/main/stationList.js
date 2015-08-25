// for the station list view that the user sees at the beginning 

var list = angular.module('stations', ['bartServices']);

list.controller('listController', function(Stations, States, $scope, $location) {

  $scope.stations = [];
 
  Stations.getAll().then(function(res) {
    $scope.stations = res.data;
  });

  $scope.setCurrentStation = function(station){
    States.setCurrentStation(station);
    $location.path('/details');
  };

});

list.directive('stationList', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/app/main/stationList.html',
    transclude: true
  };
});


