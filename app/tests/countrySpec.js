describe('test route: /countries/:code', function() {
	beforeEach(module('ngCountries'));
	
	it('should load the countries template', inject( function($location, $rootScope, $route, $httpBackend) {
        $httpBackend.whenGET('./views/country/country.html').respond('...');
        $httpBackend.expectGET('/api/current-user').respond({});	

        $rootScope.$apply(function() {
            $location.path('/countries/AD');
        });
	    $httpBackend.flush();
	    expect($route.current.controller).toBe("countryCtrl");
	    expect($route.current.loadedTemplateUrl).toBe("country.html");

        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
	}));	
});