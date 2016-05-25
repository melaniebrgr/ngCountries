viewsModule.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: './views/home/home.html',
		controller: 'HomeCtrl as home'
	});
});
viewsModule.controller('HomeCtrl', function() {
	this.test = 'TEST';
});