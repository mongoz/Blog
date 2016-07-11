angular.module('MyApp')
  .controller('sidebarCtrl', function($scope, $location, $auth, toastr, Account) {

  	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

  	Account.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
   
  });