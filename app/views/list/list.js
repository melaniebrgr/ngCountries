viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: './views/list/list.html',
		controller: 'listCtrl',
		controllerAs: 'list'
	});
}])
	.controller('listCtrl', function($http, $scope) {
		this.test = 'TEST';
		// this.data;
		$scope.data
		$http({
			method: 'GET',
			url: 'http://api.geonames.org/countryInfo',
			params: {
				username: 'melaniebrgr',
				type: 'JSON'
			}
		})
		.then(function(data, status, headers, config) {
			// this.data = data.data.geonames;
			$scope.data = data.data.geonames;
			console.log($scope.data );

		},
		function(data, status, headers, config) {
			console.log('Failure :(');
		});		
	});
