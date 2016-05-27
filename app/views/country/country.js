viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/countries/:code', {
			templateUrl: './views/country/country.html',
			controller: 'countryCtrl'
		});
	}])
	.controller('countryCtrl', function($scope, $routeParams) {
		$scope.countryCode = $routeParams.code;
	});