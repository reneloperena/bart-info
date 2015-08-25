var services = angular.module( 'bartServices', []);

services.factory('Stations', function($http) {
  var getAll = function() {
    return $http({method:'GET', url:"http://localhost:8080/api/stations"});
  };

  var getSchedules = function(station) {
    return $http({method:'GET', url:"http://localhost:8080/api/stations/"+station});
  };

  return { getAll:getAll, getSchedules:getSchedules};
});

services.factory('States', function() {
  var currentStation = null;
  var setCurrentStation = function(station) {
    console.log(station);
    currentStation = station;
  };
  var getCurrentStation = function() {
    console.log(currentStation);
    return currentStation;
  };
  return { setCurrentStation: setCurrentStation, getCurrentStation: getCurrentStation };
});
