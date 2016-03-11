'use strict';

describe('Service: dictionarys', function () {

  // load the service's module
  beforeEach(module('swedicApp'));

  // instantiate service
  var dictionarys;
  beforeEach(inject(function (_dictionarys_) {
    dictionarys = _dictionarys_;
  }));

  it('should do something', function () {
    expect(!!dictionarys).toBe(true);
  });

});
