'use strict';

describe('Service: dictionarys', function () {

  // load the service's module
  beforeEach(module('swedicApp'));
  beforeEach(module('stateMock'));

  var dummyDictionary = {
    _id : '123',
    name: 'dictionary',
    cards : []
  };
  
  // instantiate service
  var dictionarys, 
      $httpBackend;
  beforeEach(inject(function (_dictionarys_, _$httpBackend_) {
    dictionarys = _dictionarys_;
    $httpBackend = _$httpBackend_;
  }));

  it('should get dictionarys from backend', function () {
    $httpBackend.expectGET('/api/dictionarys').respond([dummyDictionary]);
    dictionarys.getDictionarys().then((d) => {
      expect(d).toEqual([dummyDictionary]);
    });
    $httpBackend.flush();
  });
  
  it('should get dictionarys from cache for subsequent request', function () {
    $httpBackend.expectGET('/api/dictionarys').respond([dummyDictionary]);
    dictionarys.getDictionarys()
     .then(() => {
       return dictionarys.getDictionarys();
     })
     .then((d) => {
       expect(d).toEqual([dummyDictionary]);
     });
    $httpBackend.flush();
  });
  
  it('should get dictaionary by id from backend', function(){
    $httpBackend.expectGET('/api/dictionarys/123').respond(dummyDictionary);
    dictionarys.getDictionaryById('123')
      .then((d) => {
        expect(d).toEqual(dummyDictionary);
      });
    $httpBackend.flush();
  });

  it('should get dictaionary by id from cache if exists in cache', function(){
    $httpBackend.expectGET('/api/dictionarys').respond([dummyDictionary]);
    dictionarys.getDictionarys()
      .then(() => {
        return dictionarys.getDictionaryById('123');
      })
      .then((d) => {
        expect(d).toEqual(dummyDictionary);
      });
    $httpBackend.flush();
  });
  
});
