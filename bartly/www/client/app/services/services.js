var services = angular.module( 'bartServices', []);

services.factory('Stations', function($http) {
  var getAll = function() {
    return $http({method:'GET', url:'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V'});
  };

  var getSchedules = function(station) {
    return $http({method:'GET', url:'http://api.bart.gov/api/etd.aspx?cmd=etd&orig='+station+'&key=MW9S-E7SL-26DU-VV8V'});
  };

  return { getAll:getAll, getSchedules:getSchedules};
});

services.factory('States', function() {
  var currentStation = null;
  var setCurrentStation = function(station) {
    currentStation = station;
  };
  var getCurrentStation = function() {
    return currentStation;
  };
  return { setCurrentStation: setCurrentStation, getCurrentStation: getCurrentStation };
});
