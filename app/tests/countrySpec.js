describe('test service: countriesList', function() {
    beforeEach(module('ngCountries'));

    it('should make an HTTP request to geonames API', inject(function(countriesList, $httpBackend, $http) {
       $httpBackend.when('GET', 'http://api.geonames.org/countryInfo?type=JSON&username=melaniebrgr').respond(200,{testKey:'testVal'});
			 //$http.get('http://api.geonames.org/countryInfo?type=JSON&username=melaniebrgr').then(function (response) {console.log(response);});

       var request = false;
			 
       countriesList.then(function(tst) {
				 	console.log('tst');
					console.log(tst);

           request = true;
       });

       $httpBackend.flush();
       expect(request).toBeTruthy();
        $httpBackend.verifyNoOutstandingRequest();
    }));

});
