viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/countries/:code', {
			templateUrl: './views/country/country.html',
			controller: 'countryCtrl',
			resolve: {
				code: function($route, $location, $q, countriesHash) {
					const countryCode = $route.current.params.code;
					let countryInList = false;

					countriesHash.then( response => {
						countryInList = response.hasOwnProperty(countryCode);
						if ( !/^[A-Z]{2}$/.test(countryCode) || !countryInList ) {
			                window.location.href = '/';
			                return false;						
						} 
						return countryCode;						
					});
				}
			}
		});
	}])
	.controller('countryCtrl', function($scope, $routeParams, $http, countriesHash, GEONAMES_USERNAME, GEONAMES_TYPE, GEONAMES_URL) {
		
		$scope.countryCode = $routeParams.code;
        countriesHash.then( response => {
        	$scope.selectedCountry = response[$scope.countryCode]

			//Get capital info
			$http({
				method: 'GET',
				url: `${GEONAMES_URL}/search`,
				params: {
					q: $scope.selectedCountry.capital,
					name: $scope.selectedCountry.capital,
					name_equals: $scope.selectedCountry.capital,
					isNameRequired: true,
					username: GEONAMES_USERNAME,
					type: GEONAMES_TYPE
				}
			})
			.then( response => $scope.capital = response.data.geonames[0], () => console.log('Capital failure :('));     	
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
		.then( data => {
			$scope.neighbours = data.data.hasOwnProperty('geonames') && data.data.geonames.length ? data.data.geonames : [{countryName: 'None'}];
		}, () => console.log('Neighbour failure :('));

		$scope.goToNeighbour = countryCode => {
			if ($scope.neighbours[0].countryName !== 'None') {
				window.location.href = `#/countries/${countryCode}`;
			}
		};		
	});