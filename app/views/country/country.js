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
	.controller('countryCtrl', function($scope, $routeParams, $http, countriesHash, GEONAMES_USERNAME, GEONAMES_TYPE, GEONAMES_URL) {
		$scope.countryCode = $routeParams.code;

        countriesHash.then(function(response) {
        	$scope.selectedCountry = response[$scope.countryCode];
        });		

		// Get neighbouring countries
		$http({
			method: 'GET',
			url: `${GEONAMES_URL}/neighbours`,
			params: {
				country: $scope.countryCode,
				username: GEONAMES_USERNAME,
				type: GEONAMES_TYPE
			}
		})
		.then(function(data) {
			$scope.neighbours = data.data.geonames[0] ? data.data.geonames : [{countryName: 'None'}];
		}, function() {
			console.log('Neighbour failure :(');
		});

		//Get capital info
		$http({
			method: 'GET',
			url: `${GEONAMES_URL}/search`,
			params: {
				q: 'Ottawa',
				username: GEONAMES_USERNAME,
				type: GEONAMES_TYPE
			}
		})
		.then(function(data) {
			// console.log('capital', data);
		}, function() {
			console.log('Capital failure :(');
		});
	});