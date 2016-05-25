viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: './views/list/list.html',
		controller: 'listCtrl',
		controllerAs: 'list'
	});
}])
	.controller('listCtrl', function() {
		//Nothing here yet
	});