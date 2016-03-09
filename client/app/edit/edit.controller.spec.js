'use strict';

describe('Controller: EditController', function () {

  // load the controller's module
  beforeEach(module('swedicApp'));

  var EditController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditController = $controller('EditController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
