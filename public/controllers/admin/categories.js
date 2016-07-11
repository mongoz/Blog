angular.module('MyApp')
.controller('AdminCategoryCtrl', function($scope, $state, popupService, Categories) {

    $scope.categories = Categories.query();
    $scope.category = new Categories();

    $scope.addCategory = function(){

       $scope.category.$save(function(){
           $state.go($state.current, {}, {reload: true});
       });
    }

    $scope.deleteCategory = function(category){
      var id = category._id;
      if(popupService.showPopup('Really delete this?')){
          category.$delete(function(){
            $state.go($state.current, {}, {reload: true});
        });
      }
    }
  });