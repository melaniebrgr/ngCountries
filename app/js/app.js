
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