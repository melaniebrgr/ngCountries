viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
        templateUrl: './views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
    });
}])
	.controller('HomeCtrl', function() {
        // Nothing here yet.
    });