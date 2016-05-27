viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: './views/list/list.html',
		controller: 'listCtrl',
		controllerAs: 'list'
	});
}])
	.controller('listCtrl', function($http, $scope) {
		$scope.data
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
			$scope.data = data.data.geonames;
			console.log($scope.data );

		},
		function(data, status, headers, config) {
			console.log('Failure :(');
		});

		$scope.goToCountry = function(countryCode) {
			window.location = '/#/countries/' + countryCode;
		}
	});
