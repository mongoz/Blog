angular.module('MyApp')
  .controller('BlogPostCtrl', function($scope, $stateParams, Article, Comment) {

  	$scope.article = [];

  	$scope.comment = new Comment();

  	Article.get({id: $stateParams.id}, function(data) {
      $scope.article = data;
    });

    $scope.addComment = function(){
    	$scope.comment._id = $stateParams.id;
    	 $scope.comment.$update(function() {
    	 	console.log("done"); 
       });
	};

  });
