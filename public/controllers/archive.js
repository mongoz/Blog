angular.module('MyApp')
  .controller('ArchiveCtrl', function($scope, $stateParams, Archives) {

  	$scope.articles = [];

	Archives.get({year: $stateParams.year, month: $stateParams.month}, function(data) {
      $scope.articles = data.articles;
    });
  });
