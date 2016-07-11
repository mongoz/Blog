angular.module('MyApp')
  .factory('Comment', function($resource){
    return $resource('/api/articles/:id/comments', {id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
});