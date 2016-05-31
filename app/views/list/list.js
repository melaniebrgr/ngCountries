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
