viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/countries/:code', {
			templateUrl: './views/country/country.html',
			controller: 'countryCtrl',
			resolve: {
				code: function($route, $location) {
					const countryCode = $route.current.params.code;
					if ( !/^[A-Z]{2}$/.test(countryCode)) {
		                window.location.href('/#/error');
		                return false;						
					} 
					return countryCode;
				}
			}
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
			$scope.neighbours = data.data.geonames;
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