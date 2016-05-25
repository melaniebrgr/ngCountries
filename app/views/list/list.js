viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: './views/list/list.html',
		controller: 'listCtrl',
		controllerAs: 'list'
	});
}])
	.controller('listCtrl', function($http) {
		$http({
			method: 'GET',
			url: 'http://api.geonames.org/countryCode',
			params: {
				username: 'melaniebrgr',
				lat: 47.03,
				lng: 10.2,
				type: 'JSON'
			}
		})
		.then(function(data, status, headers, config) {
			console.log(data);
		},
		function(data, status, headers, config) {
			console.log('Failure :(');
		});		
	});
