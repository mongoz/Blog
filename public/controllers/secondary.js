angular.module('MyApp')
  .controller('SecondaryCtrl', function($scope, $http, Categories, Archives) {
  	$scope.categories = Categories.query();

  	$scope.archives = Archives.query();
  });
