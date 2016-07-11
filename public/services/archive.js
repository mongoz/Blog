angular.module('MyApp')
  .factory('Archives', function($resource){
    return $resource('/api/archives/:year/:month', {
    	year:'@year',
    	month: "@month"
    	}, {
        update: {
            method: 'PUT'
        }
    });
});