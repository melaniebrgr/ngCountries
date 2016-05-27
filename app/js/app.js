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
		.then(function(data) {
			return $q.when(data.data.geonames);
		});
	})


/*
To do:
- WTF country table
- service that gets all countries ... ^am I doing it right?
- service that looks up country info based on country code
- redo country controller logic to use routeParams country code to set view info
- set up AJAX request for capital info
- handle Antarctica and other anomolous "countries"
*/