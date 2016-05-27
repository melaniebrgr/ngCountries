viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/countries/:code', {
			templateUrl: './views/country/country.html',
			controller: 'countryCtrl'
		});
	}])
	.controller('countryCtrl', function($scope, $routeParams, $http) {
		$scope.countryCode = $routeParams.code;
		$scope.neighbours;

		$http({
			method: 'GET',
			url: 'http://api.geonames.org/neighbours',
			params: {
				country: $scope.countryCode,
				username: 'melaniebrgr',
				type: 'JSON'
			}
		})
		.then(function(data, status, headers, config) {
			$scope.neighbours = data.data.geonames;
			console.log('neighbours', $scope.neighbours);
		}, function(data, status, headers, config) {
			console.log('Failure :(');
		});
	});