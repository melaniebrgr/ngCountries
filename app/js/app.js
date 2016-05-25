angular.module('ngCountries', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : './views/home/home.html',
            controller : 'HomeCtrl',
            controllerAs: 'home'
        });
    }])
    .controller('HomeCtrl', function($scope) {
        this.test = "TEST1";
    });