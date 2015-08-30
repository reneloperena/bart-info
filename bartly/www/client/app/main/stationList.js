var list = angular.module('stations', ['bartServices']);

list.controller('listController', function(Stations, States, $scope, $location) {
  var x2js = new X2JS();
  $scope.stations = [];
  $scope.loadStationList = function(){
    Stations.getAll().then(function(res) {
      var result = x2js.xml_str2json(res.data);
      var stations = [];

      xmlStations = result.root.stations.station;

      for (var i = 0; i < xmlStations.length; i++) {
        stations.push({
          name: xmlStations[i].name,
          id: xmlStations[i].abbr
        });
      };
      $scope.stations = stations;
      $scope.$broadcast('scroll.refreshComplete');
      
    });
  };
  $scope.loadStationList();

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


