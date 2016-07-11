angular.module('MyApp')
  .controller('CategoryCtrl', function($scope, $stateParams, Categories) {

  	var categoryId = $stateParams.id;
  	$scope.articles = [];

  	if(categoryId != null) {
		Categories.get({id: categoryId}, function(data) {
	      $scope.articles = data.articles;
	    });
	}
  });
