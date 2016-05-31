
angular.module('ngCountries', ['ngRoute', 'ngAnimate', 'viewsModule'])
	.run(function($rootScope, $timeout) {
	    $rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	      $timeout(function() {
	        $rootScope.isLoading = false;
	      }, 250);
	    });
	})
	.config(function($routeProvider) {
	    $routeProvider.when('/error', {
	    	template: '<p>Error – page not found</p>'
	    })
	    .otherwise('/error');		
	})
	.constant('GEONAMES_USERNAME', 'melaniebrgr')
	.constant('GEONAMES_TYPE', 'JSON')
	.constant('GEONAMES_URL', 'http://api.geonames.org')
	.factory('countriesList', function($http, $q, GEONAMES_USERNAME, GEONAMES_TYPE, GEONAMES_URL) {
		return $http({
			method: 'GET',
			url: `${GEONAMES_URL}/countryInfo`,
			cache: true,
			params: {
				username: GEONAMES_USERNAME,
				type: GEONAMES_TYPE
			}
		})
		.then(function(response) {
			return $q.when(response.data.geonames);
		});
	})
	.factory('countriesHash', function(countriesList, $q) {
		let countriesHash = {};
		return $q.when(countriesList.then(function(response) {
			response.forEach(function(el) {
				countriesHash[el.countryCode] = el;
			});
			return countriesHash;
		}));
	});
var viewsModule = angular.module('viewsModule', ['ngRoute']);
viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
	        templateUrl: './views/home/home.html',
	        controller: 'HomeCtrl'
	    });
	}])
	.controller('HomeCtrl', function() {
		// Nothing here.
    });
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
				window.location.href = `/ngCountries/#/countries/${countryCode}`;
			}
		};		
	});
viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/countries', {
			templateUrl: './views/list/list.html',
			controller: 'ListCtrl'
		});
	}])
	.controller('ListCtrl', function($scope, countriesList) {

        countriesList.then(function(response) {
        	$scope.data = response;
        });

		$scope.goToCountry = function(countryCode) {
			window.location.href = `/ngCountries/#/countries/${countryCode}`;
		}
	});
