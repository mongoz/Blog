angular.module('MyApp')
    .filter('monthName',function() {
    return function(input) {
        if (input) {
            var name = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return name[input - 1];
        }
    }
});