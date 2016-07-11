angular.module('MyApp')
  .controller('HomeCtrl', function($scope, Article) {
  	$scope.articles = Article.query();

  	$scope.myInterval = 5000;
  	$scope.active = 0;
  	$scope.noWrapSlides = false;
	$scope.slides = [
	    {
	      image: 'header.png',
	      id: 0
	    },
	    {
	      image: 'header2.jpg',
	      id: 1
	    },
	    {
	      image: 'header1.jpg',
	      id: 2
	    }
	];
  });
