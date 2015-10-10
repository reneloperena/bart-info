var details = angular.module('details', ['bartServices']);

details.controller('detailsController', function($scope, States, Stations) {
  $scope.destinations = [];
  $scope.currentStation = States.getCurrentStation();
  
  var x2js = new X2JS();

  $scope.loadSchedules = function() {
    Stations.getSchedules($scope.currentStation.id).then(function(res) {
      var destinations = [];
      var result = x2js.xml_str2json(res.data);
      var xmlDestinations = result.root.station.etd;

      for (var i = 0; i < xmlDestinations.length; i++) {
        var destination = { station: {
          name: xmlDestinations[i].destination,
          id: xmlDestinations[i].abbreviation
        }, estimates : [] };

        for (var x = 0; x < xmlDestinations[i].estimate.length; x++) {
          //Creates estimates for following trains
          if(xmlDestinations[i].estimate[x]){
            var estimate = {
              minutes: xmlDestinations[i].estimate[x].minutes,
              platform: xmlDestinations[i].estimate[x].platform,
              length: xmlDestinations[i].estimate[x].length,
              color: xmlDestinations[i].estimate[x].color,
              hexcolor: xmlDestinations[i].estimate[x].hexcolor,
              bikeflag: xmlDestinations[i].estimate[x].bikeflag
            };
            destination.estimates.push(estimate);
          }
        };
        destinations.push(destination);
      };
      $scope.destinations = destinations;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.loadSchedules();
});

details.directive('detailsView', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/app/details/details.html',
    transclude: true
  };
});
