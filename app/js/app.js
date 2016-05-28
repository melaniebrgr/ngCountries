angular.module('ngCountries', ['ngRoute', 'viewsModule'])
	.factory('test', function() {
		console.log('testing service injection');
		return 'did it work?';
	})
	.factory('countriesList', function($http, $q) {
		return $http({
			method: 'GET',
			url: 'http://api.geonames.org/countryInfo',
			cache: true,
			params: {
				username: 'melaniebrgr',
				type: 'JSON'
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
-- redo country controller logic to use country code from routeParams to set rest of view info
-- set up AJAX request for capital info
-- handle Antarctica and other anomolous "countries"
-- resolve country code to make sure valid before loading page using hasOwnProperty
-- flag image
-- map image
-- add error route
-- animate between views
*/