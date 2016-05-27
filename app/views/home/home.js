viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
	        templateUrl: './views/home/home.html',
	        controller: 'HomeCtrl'
	    });
	}])
	.controller('HomeCtrl', function(test, countriesList) {
        console.log(test);
        console.log(countriesList);
    });