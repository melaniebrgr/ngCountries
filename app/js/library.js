angular.module('libraryModule', ['$http', '$q'])
	.factory('countryData', ['$http', '$q', function($http, $q) {
		return function() {
			$http({
				method: 'GET',
				url: 'http://api.geonames.org/countryInfo',
				cache: true,
				params: {
					username: 'melaniebrgr',
					type: 'JSON'
				}
			})
			.then(function(data, status, headers, config) {
				return $q.when(data.data.geonames);
			},
			function(data, status, headers, config) {
				console.log('Failure :(');
			});
		}	
	}])
	.factory('getCountry', ['countryData', function(countryData) {
		return function(i) {
			countryData().then(function() {console.log(response)});
		}
		//set data object to passed in array
		//function returns whole data set
		// or returns country at index value
	}]);