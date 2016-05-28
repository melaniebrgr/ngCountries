angular.module('ngCountries', ['ngRoute', 'viewsModule'])
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

/*
to do:
-|- WTF country <table>
-|- write service that gets all countries ... ^am I doing it right?
-|- write service that looks up country info based on country code (retructure array into hash table?)
-|- redo country controller logic to use country code from routeParams to set rest of view info
-|- clicking on neighbiuring countries brings to neighbours page
-- set up AJAX request for capital info
-|- handle Antarctica and other anomolous "countries"
-|- resolve country code to make sure valid before loading page using hasOwnProperty
-|- flag image
-|- map image
-- add error route
-- animate between views
*/