viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
	        templateUrl: './views/home/home.html',
	        controller: 'HomeCtrl'
	    });
	}])
	.controller('HomeCtrl', function(test, countriesList, countriesHash) {
        countriesList.then(function(response) {
        	console.log(response);
        });
        countriesHash.then(function(response) {
        	console.log(response);
        });
    });