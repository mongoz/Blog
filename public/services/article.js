angular.module('MyApp')
  .factory('Article', function($resource){
    return $resource('/api/articles/:id', {id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService', function($window){
    this.showPopup = function(message){
        return $window.confirm(message);
    }
});