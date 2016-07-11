angular.module('MyApp')
.controller('AdminCtrl', function($scope,$state,$location, popupService, toastr, Article) {

    $scope.articles = Article.query();

    $scope.showArticle = function(article) {
      $location.path('/admin/' + article._id + '/edit');
    };

    $scope.deleteArticle = function(article){
      var id = article._id;
      if(popupService.showPopup('Really delete this?')){
          article.$delete(function(){
            $state.go($state.current, {}, {reload: true});
        });
      }
    }
  })
  .controller('ArticleEditCtrl', function($scope, $state, $stateParams, Article, Categories) {
     $scope.categories = Categories.query();
     
     $scope.updateArticle = function(){
        $scope.article.$update(function(){
            $state.go('admin');
        });
    };

    $scope.loadArticle = function(){
        $scope.article = Article.get({id:$stateParams.id});
    };

    $scope.loadArticle();
  })
  .controller('ArticleCreateCtrl', function($scope, $state, Upload, $timeout, Article, Categories){

    $scope.categories = Categories.query();
    $scope.article = new Article();

    $scope.addArticle = function(dataUrl, name){

        Upload.upload({
            url: 'http://localhost:3000/api/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
                $scope.article.image = response.data.filename;
                $scope.article.$save(function(){
                  $state.go('admin');
              });
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }
});