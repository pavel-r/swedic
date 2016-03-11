'use strict';

describe('Controller: EditcardCtrl', function () {

  // load the controller's module
  beforeEach(module('swedicApp'));

  var EditcardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditcardCtrl = $controller('EditCardController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
