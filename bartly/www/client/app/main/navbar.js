var navbar = angular.module('navbar', []);

navbar.directive('titleBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/app/main/navbar.html',
    transclude: true
  };
});
