viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/countries/:code', {
			templateUrl: './views/country/country.html',
			controller: 'countryCtrl',
			resolve: {
				code: function($route, $location) {
					const countryCode = $route.current.params.code;
					if ( !/^[A-Z]{2}$/.test(countryCode)) {
		                // window.location.href('/#/error');
		                console.log(countryCode)
		                return false;						
					} 
					return countryCode;
				}
			}
		});
	}])
	.controller('countryCtrl', function($scope, $routeParams, $http, countriesHash) {
		$scope.countryCode = $routeParams.code;

        countriesHash.then(function(response) {
        	$scope.selectedCountry = response[$scope.countryCode];
        	// console.log($scope.selectedCountry);
        });		

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
		.then(function(data) {
			$scope.neighbours = data.data.geonames || [{countryName: 'None'}];
		}, function() {
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
		.then(function(data) {
			// console.log('capital', data);
		}, function() {
			console.log('Capital failure :(');
		});
	});