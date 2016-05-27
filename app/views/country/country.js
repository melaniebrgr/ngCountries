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

		// Get neighbouring countries
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
			$scope.neighbours = data.data.geonames || 'no neighbours :(';
			console.log('neighbours', $scope.neighbours);
		}, function(data, status, headers, config) {
			console.log('Neighbour failure :(');
		});

		//Get capital info
		$http({
			method: 'GET',
			url: 'http://api.geonames.org/search',
			params: {
				q: 'Ottawa',
				username: 'melaniebrgr',
				type: 'JSON'
			}
		})
		.then(function(data, status, headers, config) {
			console.log('capital', data);
		}, function(data, status, headers, config) {
			console.log('Capital failure :(');
		});
	});