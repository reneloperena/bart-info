var details = angular.module('details', ['bartServices']);

details.controller('detailsController', function($scope, States, Stations) {
  $scope.currentStation = {};
  $scope.destinations = [];

  $scope.getStationInfo = function() {
    $scope.currentStation = States.getCurrentStation();

    $scope.destinations = Stations.getSchedules($scope.currentStation.id).then(function(resp) {
      $scope.destinations = resp.data;
      console.log($scope.destinations);
    });
  };
});

details.directive('detailsView', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/app/details/details.html',
    transclude: true
  };
});
