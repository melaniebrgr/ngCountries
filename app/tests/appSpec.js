describe('test route: /error', function() {
	beforeEach(module('ngCountries'));

	it('should load the error template', inject( function($location, $rootScope, $route) {
        $rootScope.$apply(function() {
            $location.path('/error');
        });
        expect($route.current.template).toBe('<p>Error – page not found</p>');
	}));
});

describe('test service: countriesList', function() {
	beforeEach(module('ngCountries'));

	it('should make an HTTP request to geonames API', inject(function(countriesList, $httpBackend) {
        $httpBackend.expect('GET', 'http://api.geonames.org/countryInfo?type=JSON&username=melaniebrgr').respond(200, 'success');
        var request = false;
        countriesList.then(function() {
            request = true;
        });
        $httpBackend.flush();
        expect(request).toBeTruthy();
		$httpBackend.verifyNoOutstandingRequest();
	}));
	
});

// http://stackoverflow.com/questions/23705051/how-do-i-mock-a-service-that-returns-promise-in-angularjs-jasmine-unit-test
describe('test service: countriesHash', function() {
	beforeEach(module('ngCountries'));

	xit('should ...', function() {
        var list;
        module(function($provide) {
            $provide.value('countriesList', function() {
                // I think this should return a promise
                // return {"geonames":[{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"}]};
            });
        }); 
        inject(function(countriesHash, $httpBackend) {
            countriesHash.then(function() {
                list = 'test';
            });
            $httpBackend.flush();
            console.log(list);
        });

	});
});