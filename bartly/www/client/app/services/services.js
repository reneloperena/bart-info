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

services.factory('StateFactory', function() {
  var currentStation = null;
  var setCurrentStation = function(station) {
    currentStation = station;
  };
  var getCurrentStation = function() {
    return currentStation;
  };
  return { setCurrentStation: setCurrentStation, getCurrentStation: getCurrentStation };
});
