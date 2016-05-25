viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries/:code', {
		templateUrl: './views/country/country.html',
		controller: 'countryCtrl',
		controllerAs: 'country'
	});
}])
	.controller('countryCtrl', function() {
		this.countryCode = 'test';
		// this.countryCode = $routeParams.code;
	});