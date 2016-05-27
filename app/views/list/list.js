viewsModule
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/countries', {
			templateUrl: './views/list/list.html',
			controller: 'listCtrl',
			controllerAs: 'list'
		});
	}])
	.controller('listCtrl', function($http, $scope, $rootScope) {
		$rootScope.data;
		$rootScope.selectedCountry;
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
			$rootScope.data = data.data.geonames;
			console.log('country', $rootScope.data);

		},
		function(data, status, headers, config) {
			console.log('List countries failure :(');
		});

		$scope.goToCountry = function(country) {
			$rootScope.selectedCountry = country;
			window.location.href = `/#/countries/${country.countryCode}`;
		}
	});
