'use strict';

describe('Controller: ViewController', function () {

  // load the controller's module
  beforeEach(module('swedicApp'));

  var ViewController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewController = $controller('ViewController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
