// describe('homePage', function() {
// 	xit('should contain clickable button', function() {
// 		browser().navigateTo('#'); //Google it
// 	});
// });

describe('/error route', function() {
	beforeEach(module('ngCountries'));

	it('should load the error template', inject( function($location, $rootScope, $route) {
        $rootScope.$apply(function() {
            $location.path('/error');
        });
        expect($route.current.template).toBe('<p>Error – page not found</p>');
	}));
});

// describe('countriesList service', inject( function(countriesList) {
// 	beforeEach( module('ngCountries'));

// 	it('should make an HTTP request', inject( function($httpBackend) {
// 		$httpBackend
// 			.expect('GET', 'http://api.geonames.org/countryInfo?type=JSON&username=melaniebrgr')
// 			.respond(200);
// 		$httpBackend.flush();
// 		$httpBackend.verifyNoOutstandingRequest();
// 	}));
	
// 	it('should list the countries', inject( function($httpBackend) {
// 		// will still need to inject HTTP
// 		// wait for HTTP request, 
// 		// grab first row and verify that it is 'Angola' or whatever
// 	}));
// }));

describe('countriesHash service', function() {
	beforeEach(module('ngCountries'));

	it('should list the countries', inject( function($location, $rootScope, $route) {
        $rootScope.$apply(function() {
            $location.path('#/countries');
        });
        // console.log( $('.list tbody tr:nth-child(1)'));
        console.log($);
	}));
});